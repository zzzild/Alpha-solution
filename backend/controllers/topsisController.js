import paketModel from "../models/paketModel.js";
import kriteriaModel from "../models/kriteriaModel.js";

export const getRecommendation = async (req, res) => {
  try {
    const {
      budget,
      minimalModul,
      minimalAkses,
      duration,
      tingkatKesulitan,
      sertifikat,
      metode,
    } = req.body;

    const paket = await paketModel.find();

    if (!paket.length) {
      return res.json({
        success: false,
        message: "No package found",
      });
    }

    // =========================================
    // FILTER AWAL
    // =========================================

    const filteredPaket = paket.filter((item) => {
      if (
        budget &&
        item.price > Number(budget)
      ) {
        return false;
      }

      if (
        minimalModul &&
        item.jumlahModul <
          Number(minimalModul)
      ) {
        return false;
      }

      if (
        minimalAkses &&
        item.masaAkses <
          Number(minimalAkses)
      ) {
        return false;
      }

      return true;
    });

    if (!filteredPaket.length) {
      return res.json({
        success: false,
        message:
          "Tidak ada paket yang sesuai",
      });
    }

    // =========================================
    // KRITERIA & BOBOT
    // =========================================

    const kriteria =
      await kriteriaModel.find();

    const getWeight = (name) => {
      return (
        kriteria.find(
          (k) =>
            k.nameKriteria
              .toLowerCase()
              .trim() ===
            name.toLowerCase().trim()
        )?.bobot || 0
      );
    };

    const hargaWeight =
      getWeight("Harga");

    const modulWeight =
      getWeight("Jumlah Modul");

    const aksesWeight =
      getWeight("Masa Akses");

    const durasiWeight =
      getWeight("Durasi");

    const kesulitanWeight =
      getWeight(
        "Tingkat Kesulitan"
      );

    const sertifikatWeight =
      getWeight("Sertifikat");

    const metodeWeight =
      getWeight("Metode");

    // =========================================
    // HELPER
    // =========================================

    const difficultyToNumber = (
      level
    ) => {
      switch (
        level?.toLowerCase()
      ) {
        case "beginner":
          return 1;

        case "intermediate":
          return 2;

        case "advanced":
          return 3;

        default:
          return 0;
      }
    };

    const metodeScore = (
      paketMetode,
      userMetode
    ) => {
      if (!userMetode)
        return 1;

      paketMetode =
        paketMetode.toLowerCase();

      userMetode =
        userMetode.toLowerCase();

      if (
        paketMetode ===
        userMetode
      ) {
        return 1;
      }

      if (
        userMetode === "hybrid"
      ) {
        return 0.2;
      }

      return 0;
    };

    // =========================================
    // DECISION MATRIX
    // =========================================

    const matrix =
      filteredPaket.map((item) => {
        const durasiGap =
          duration
            ? Math.abs(
                item.duration -
                  Number(
                    duration
                  )
              )
            : 0;

        const difficultyScore =
          tingkatKesulitan
            ? 1 /
              (1 +
                Math.abs(
                  difficultyToNumber(
                    item.tingkatKesulitan
                  ) -
                    difficultyToNumber(
                      tingkatKesulitan
                    )
                ))
            : 1;

        let sertifikatScore = 1;

        // hanya dihitung jika user memang menginginkan sertifikat
        if (
          sertifikat &&
          sertifikat.toLowerCase() ===
            "ada"
        ) {
          sertifikatScore =
            item.sertifikat.toLowerCase() ===
            "ada"
              ? 1
              : 0;
        }

        return {
          paket: item,

          // COST
          harga: item.price,
          durasi: durasiGap,

          // BENEFIT
          modul:
            item.jumlahModul,

          akses:
            item.masaAkses,

          kesulitan:
            difficultyScore,

          sertifikat:
            sertifikatScore,

          metode:
            metodeScore(
              item.metode,
              metode
            ),
        };
      });

    // =========================================
    // NORMALISASI VECTOR
    // =========================================

    const safeDivider = (
      key
    ) => {
      const total =
        Math.sqrt(
          matrix.reduce(
            (
              sum,
              item
            ) =>
              sum +
              Math.pow(
                item[key],
                2
              ),
            0
          )
        );

      return total || 1;
    };

    const hargaDivider =
      safeDivider("harga");

    const modulDivider =
      safeDivider("modul");

    const aksesDivider =
      safeDivider("akses");

    const durasiDivider =
      safeDivider("durasi");

    const kesulitanDivider =
      safeDivider(
        "kesulitan"
      );

    const sertifikatDivider =
      safeDivider(
        "sertifikat"
      );

    const metodeDivider =
      safeDivider("metode");

    const weighted =
      matrix.map((item) => ({
        paket: item.paket,

        harga:
          (item.harga /
            hargaDivider) *
          hargaWeight,

        modul:
          (item.modul /
            modulDivider) *
          modulWeight,

        akses:
          (item.akses /
            aksesDivider) *
          aksesWeight,

        durasi:
          (item.durasi /
            durasiDivider) *
          durasiWeight,

        kesulitan:
          (item.kesulitan /
            kesulitanDivider) *
          kesulitanWeight,

        sertifikat:
          (item.sertifikat /
            sertifikatDivider) *
          sertifikatWeight,

        metode:
          (item.metode /
            metodeDivider) *
          metodeWeight,
      }));

    // =========================================
    // TOPSIS
    // =========================================

    const keys = [
      "harga",
      "modul",
      "akses",
      "durasi",
      "kesulitan",
      "sertifikat",
      "metode",
    ];

    const costKeys = [
      "harga",
      "durasi",
    ];

    const Aplus = {};
    const Aminus = {};

    keys.forEach((key) => {
      const values =
        weighted.map(
          (item) =>
            item[key]
        );

      if (
        costKeys.includes(key)
      ) {
        Aplus[key] =
          Math.min(
            ...values
          );

        Aminus[key] =
          Math.max(
            ...values
          );
      } else {
        Aplus[key] =
          Math.max(
            ...values
          );

        Aminus[key] =
          Math.min(
            ...values
          );
      }
    });

    const ranking =
      weighted.map((item) => {
        const dPlus =
          Math.sqrt(
            keys.reduce(
              (
                sum,
                key
              ) =>
                sum +
                Math.pow(
                  item[key] -
                    Aplus[
                      key
                    ],
                  2
                ),
              0
            )
          );

        const dMinus =
          Math.sqrt(
            keys.reduce(
              (
                sum,
                key
              ) =>
                sum +
                Math.pow(
                  item[key] -
                    Aminus[
                      key
                    ],
                  2
                ),
              0
            )
          );

        const score =
          dMinus /
          (dPlus +
            dMinus);

        return {
          ...item.paket._doc,
          score: Number(
            score.toFixed(4)
          ),
        };
      });

    ranking.sort(
      (a, b) =>
        b.score - a.score
    );

    return res.json({
      success: true,
      totalRecommendation:
        ranking.length,
      bestRecommendation:
        ranking[0],
      ranking,
    });
  } catch (error) {
    console.error(error);

    return res.json({
      success: false,
      message:
        error.message,
    });
  }
};