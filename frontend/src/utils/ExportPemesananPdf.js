import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPemesananPDF = (data) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Laporan Pemesanan Pelatihan", 14, 18);

  doc.setFontSize(11);
  doc.text(
    `Tanggal Export : ${new Date().toLocaleDateString("id-ID")}`,
    14,
    27
  );

  autoTable(doc, {
    startY: 35,
    head: [[
      "No",
      "Nama",
      "Email",
      "Paket",
      "Harga",
      "Status",
      "Tanggal"
    ]],

    body: data.map((item, index) => [
      index + 1,
      item.namaPemesan,
      item.email,
      item.paket,
      `Rp ${Number(item.harga).toLocaleString("id-ID")}`,
      item.status,
      new Date(item.tanggal).toLocaleDateString("id-ID")
    ]),

    styles: {
      fontSize: 9,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [37, 99, 235],
      textColor: 255,
    },
  });

  doc.save("laporan-pemesanan.pdf");
};