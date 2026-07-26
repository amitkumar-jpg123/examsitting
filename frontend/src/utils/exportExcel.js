import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportExcel = (fileName, data) => {

  // ==========================
  // Create Workbook
  // ==========================

  const workbook = XLSX.utils.book_new();

  // ==========================
  // Create Worksheet
  // ==========================

  const worksheet = XLSX.utils.json_to_sheet(data);

  // ==========================
  // Auto Column Width
  // ==========================

  worksheet["!cols"] = [

    { wch: 30 },

    { wch: 15 },

  ];

  // ==========================
  // Add Worksheet
  // ==========================

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Reports"
  );

  // ==========================
  // Generate Excel Buffer
  // ==========================

  const excelBuffer = XLSX.write(workbook, {

    bookType: "xlsx",

    type: "array",

  });

  // ==========================
  // Save File
  // ==========================

  const fileData = new Blob(

    [excelBuffer],

    {

      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",

    }

  );

  saveAs(fileData, `${fileName}.xlsx`);

};

export default exportExcel;