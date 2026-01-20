const fs = require("fs");
const pdfParse = require("pdf-parse");

const parseResume = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text.toLowerCase();
};

module.exports = parseResume;
