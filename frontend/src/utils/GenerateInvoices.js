import jsPDF from "jspdf";

export const generateInvoice = (order) => {
  if (!order?.paketData) {
    alert("Data paket tidak tersedia untuk pesanan ini.");
    return;
  }

  const doc = new jsPDF();
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 20;
  const colLabel = margin;
  const colValue = 80;

  // ── Header ──────────────────────────────────────────────
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageW, 45, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("ALPHA SOLUTION", pageW / 2, 20, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Indonesia | info@alphasolution.id",
    pageW / 2,
    30,
    {
      align: "center",
    },
  );

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE PEMBAYARAN", pageW / 2, 40, { align: "center" });

  // ── Info Invoice ─────────────────────────────────────────
  doc.setTextColor(0);
  let y = 60;

  const invoiceNo = `INV-${order.pemesananId.slice(-6).toUpperCase()}`;
  const tanggal = new Date(order.createdAt).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const tanggalCetak = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Kotak info kiri
  doc.setFillColor(243, 244, 246);
  doc.roundedRect(margin, y - 6, 80, 34, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("No. Invoice", margin + 4, y);
  doc.setFont("helvetica", "normal");
  doc.text(invoiceNo, margin + 4, y + 8);

  doc.setFont("helvetica", "bold");
  doc.text("Tanggal", margin + 4, y + 18);
  doc.setFont("helvetica", "normal");
  doc.text(tanggal, margin + 4, y + 26);

  // Kotak status kanan
  doc.setFillColor(220, 252, 231);
  doc.roundedRect(pageW - margin - 55, y - 6, 55, 28, 3, 3, "F");
  doc.setTextColor(22, 101, 52);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("LUNAS", pageW - margin - 27.5, y + 7, { align: "center" });

  // Tanggal cetak
  doc.setTextColor(80, 120, 80);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`Dicetak: ${tanggalCetak}`, pageW - margin - 27.5, y + 18, {
    align: "center",
  });
  doc.setTextColor(0);

  // ── Garis pemisah ────────────────────────────────────────
  y += 44;
  doc.setDrawColor(209, 213, 219);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);

  // ── Data Pelanggan ───────────────────────────────────────
  y += 12;
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("DATA PELANGGAN", margin, y);

  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const customerRows = [
    ["Nama", order.userData?.nameUser ?? "-"],
    ["Email", order.userData?.email ?? "-"],
  ];

  customerRows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, colLabel, y);
    doc.setFont("helvetica", "normal");
    doc.text(`: ${value}`, colValue, y);
    y += 8;
  });

  // ── Garis pemisah ────────────────────────────────────────
  y += 4;
  doc.line(margin, y, pageW - margin, y);

  // ── Detail Paket ─────────────────────────────────────────
  y += 12;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("DETAIL PAKET", margin, y);

  y += 8;
  doc.setFontSize(10);

  const paketRows = [
    ["Nama Paket", order.paketData.namePaket ?? "-"],
    ["Metode", order.paketData.metode ?? "-"],
    ["Harga", `Rp ${(order.paketData.price ?? 0).toLocaleString("id-ID")}`],
  ];

  paketRows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, colLabel, y);
    doc.setFont("helvetica", "normal");
    doc.text(`: ${value}`, colValue, y);
    y += 8;
  });

  // ── Kotak Total ──────────────────────────────────────────
  y += 10;
  doc.setFillColor(30, 64, 175);
  doc.roundedRect(margin, y, pageW - margin * 2, 20, 3, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("TOTAL PEMBAYARAN", margin + 6, y + 13);
  doc.text(
    `Rp ${(order.paketData.price ?? 0).toLocaleString("id-ID")}`,
    pageW - margin - 6,
    y + 13,
    { align: "right" },
  );

  // ── Footer ───────────────────────────────────────────────
  y += 36;
  doc.setTextColor(107, 114, 128);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text(
    "Terima kasih telah melakukan pembelian pelatihan di Alpha Solution.",
    pageW / 2,
    y,
    { align: "center" },
  );

  doc.setLineWidth(0.3);
  doc.setDrawColor(209, 213, 219);
  doc.line(margin, y + 6, pageW - margin, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "© Alpha Solution – Dokumen ini digenerate otomatis",
    pageW / 2,
    y + 13,
    {
      align: "center",
    },
  );

  doc.save(`Invoice-${invoiceNo}.pdf`);
};
