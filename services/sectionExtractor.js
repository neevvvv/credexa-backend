module.exports = function extractSections(text) {
  return {
    skills: extractBetween(text, "skills", "experience"),
    experience: extractBetween(text, "experience", "education"),
    education: extractBetween(text, "education", "projects"),
    certificates: extractBetween(text, "certification", "projects"),
    fullText: text
  };
};

function extractBetween(text, start, end) {
  const startIndex = text.indexOf(start);
  const endIndex = text.indexOf(end);

  if (startIndex === -1) return "";
  if (endIndex === -1) return text.slice(startIndex);

  return text.slice(startIndex, endIndex);
}
