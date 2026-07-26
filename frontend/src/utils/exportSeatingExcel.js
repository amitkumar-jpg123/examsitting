import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportSeatingExcel = (seating) => {

  const excelData = seating.map((item, index) => ({

    "Seat No": item.seatNumber || index + 1,

    "Roll No": item.student?.roll || "",

    "Student Name": item.student?.name || "",

    "Room": item.room?.roomNo || "",

    "Exam": item.exam?.subject || "",

    "Invigilator": item.invigilator?.name || "",

  }));

  const worksheet =
    XLSX.utils.json_to_sheet(excelData);
      // ==========================
  // Workbook Create
  // ==========================

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Seating Arrangement"

  );

  // ==========================
  // Column Width
  // ==========================

  worksheet["!cols"] = [

    { wch: 10 }, // Seat No

    { wch: 15 }, // Roll No

    { wch: 30 }, // Student Name

    { wch: 15 }, // Room

    { wch: 25 }, // Exam

    { wch: 25 }, // Invigilator

  ];

  // ==========================
  // Workbook Buffer
  // ==========================

  const excelBuffer = XLSX.write(

    workbook,

    {

      bookType: "xlsx",

      type: "array",

    }

  );

    // ==========================
  // Create Excel File
  // ==========================

  const excelFile = new Blob(

    [excelBuffer],

    {

      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",

    }

  );

  // ==========================
  // File Name
  // ==========================

  const fileName =

    `Exam_Seating_Arrangement_${new Date()

      .toISOString()

      .split("T")[0]}.xlsx`;

  // ==========================
  // Download Excel
  // ==========================

  saveAs(

    excelFile,

    fileName

  );

  };

export default exportSeatingExcel;