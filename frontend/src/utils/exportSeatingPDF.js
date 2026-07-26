import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportSeatingPDF = (seating) => {

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "Exam Seating Arrangement",
    14,
    18
  );

  doc.setFontSize(11);

  doc.text(
    `Generated : ${new Date().toLocaleString()}`,
    14,
    28
  );

  const tableColumn = [

    "Seat No",

    "Roll No",

    "Student",

    "Room",

    "Exam",

    "Invigilator",

  ];

  const tableRows = [];

    // ==========================
  // Prepare Table Data
  // ==========================

  seating.forEach((item, index) => {

    tableRows.push([

      item.seatNumber || index + 1,

      item.student?.roll || "-",

      item.student?.name || "-",

      item.room?.roomNo || "-",

      item.exam?.subject || "-",

      item.invigilator?.name || "-",

    ]);

  });

  // ==========================
  // Generate PDF Table
  // ==========================

  autoTable(doc, {

    head: [tableColumn],

    body: tableRows,

    startY: 35,

    theme: "grid",

    headStyles: {

      fillColor: [30, 64, 175],

      textColor: [255, 255, 255],

      fontStyle: "bold",

      halign: "center",

    },

    bodyStyles: {

      halign: "center",

      valign: "middle",

    },

    alternateRowStyles: {

      fillColor: [245, 245, 245],

    },

    styles: {

      fontSize: 10,

      cellPadding: 3,

    },

  });
    // ==========================
  // Footer
  // ==========================

  const finalY =
    doc.lastAutoTable.finalY + 15;

  doc.setFontSize(11);

  doc.text(

    `Total Students : ${seating.length}`,

    14,

    finalY

  );

  doc.text(

    "Exam Seating Arrangement System",

    14,

    finalY + 10

  );

  // ==========================
  // Page Number
  // ==========================

  const pageCount =
    doc.internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {

    doc.setPage(i);

    doc.setFontSize(10);

    doc.text(

      `Page ${i} of ${pageCount}`,

      170,

      290

    );

  }
    // ==========================
  // Save PDF
  // ==========================

  doc.save("Exam_Seating_Arrangement.pdf");

};

export default exportSeatingPDF;