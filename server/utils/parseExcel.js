import XLSX from 'xlsx';
export const parseExcel = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]]; // First sheet
  return XLSX.utils.sheet_to_json(sheet); // Convert to JSON
};

