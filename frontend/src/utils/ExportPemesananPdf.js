import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPemesananPDF = (data) => {
  const doc = new jsPDF({ orientation: "landscape" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 16;

  // ── Header Bar ───────────────────────────────────────────
  doc.setFillColor(37, 99, 235); // biru
  doc.rect(0, 0, pageW, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("ALPHA SOLUTION", margin, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(219, 234, 254); // biru muda
  doc.text("Laporan Data Pemesanan Pelatihan", margin, 21);

  const tanggalExport = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(`Export: ${tanggalExport}`, pageW - margin, 12, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(219, 234, 254);
  doc.text(`Total Data: ${data.length} pesanan`, pageW - margin, 21, {
    align: "right",
  });

  // ── Tabel ────────────────────────────────────────────────
  autoTable(doc, {
    startY: 36,
    margin: { left: margin, right: margin },
    head: [
      ["No", "Nama Pemesan", "Email", "Paket", "Harga", "Status", "Tanggal"],
    ],
    body: data.map((item, index) => [
      index + 1,
      item.namaPemesan,
      item.email,
      item.paket,
      `Rp ${Number(item.harga).toLocaleString("id-ID")}`,
      item.status,
      new Date(item.tanggal).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    ]),
    styles: {
      fontSize: 8.5,
      cellPadding: { top: 4, bottom: 4, left: 5, right: 5 },
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.3,
    },
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontSize: 8.5,
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { halign: "center", valign: "middle", cellWidth: 14 },
      4: { halign: "right" },
      5: { halign: "center" },
      6: { halign: "center" },
    },
    alternateRowStyles: {
      fillColor: [239, 246, 255], // biru sangat muda
    },
  });

  // ── Footer ───────────────────────────────────────────────
  const finalY = doc.lastAutoTable.finalY + 8;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, finalY, pageW - margin, finalY);

  doc.setTextColor(148, 163, 184);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(
    "Dokumen ini digenerate otomatis oleh sistem Alpha Solution.",
    pageW / 2,
    finalY + 7,
    { align: "center" },
  );

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(8);
    doc.text(`Hal ${i} / ${totalPages}`, pageW - margin, pageH - 6, {
      align: "right",
    });
  }

  doc.save(`laporan-pemesanan-${Date.now()}.pdf`);
};