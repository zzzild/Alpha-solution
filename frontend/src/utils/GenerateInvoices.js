import jsPDF from "jspdf";

export const generateInvoice = (order) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("ALPHA SOLUTION", 105, 20, { align: "center" });

  doc.setFontSize(16);
  doc.text("INVOICE", 105, 30, { align: "center" });

  doc.line(20, 36, 190, 36);

  let y = 50;

  doc.setFontSize(12);

  doc.text(`Invoice No`, 20, y);
  doc.text(`: INV-${order.pemesananId.slice(-6)}`, 70, y);

  y += 10;

  doc.text(`Tanggal`, 20, y);
  doc.text(
    `: ${new Date(order.createdAt).toLocaleDateString("id-ID")}`,
    70,
    y
  );

  y += 10;

  doc.text(`Nama`, 20, y);
  doc.text(`: ${order.userData.nameUser}`, 70, y);

  y += 10;

  doc.text(`Email`, 20, y);
  doc.text(`: ${order.userData.email}`, 70, y);

  y += 10;

  doc.text(`Paket`, 20, y);
  doc.text(`: ${order.paketData.namePaket}`, 70, y);

  y += 10;

  doc.text(`Metode`, 20, y);
  doc.text(`: ${order.paketData.metode}`, 70, y);

  y += 10;

  doc.text(`Harga`, 20, y);
  doc.text(
    `: Rp ${order.paketData.price.toLocaleString("id-ID")}`,
    70,
    y
  );

  y += 20;

  doc.setDrawColor(180);
  doc.line(20, y, 190, y);

  y += 15;

  doc.setFontSize(16);

  doc.text("TOTAL", 20, y);

  doc.text(
    `Rp ${order.paketData.price.toLocaleString("id-ID")}`,
    190,
    y,
    {
      align: "right",
    }
  );

  y += 20;

  doc.setTextColor(0, 150, 0);

  doc.setFontSize(14);

  doc.text("STATUS : LUNAS", 20, y);

  y += 25;

  doc.setTextColor(0);

  doc.setFontSize(11);

  doc.text(
    "Terima kasih telah melakukan pembelian pelatihan.",
    105,
    y,
    {
      align: "center",
    }
  );

  doc.save(`Invoice-${order.pemesananId}.pdf`);
};