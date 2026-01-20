function extractSentences(text) {
  if (!text) return [];

  return text
    .replace(/\r\n/g, "\n")
    .split(/[.\n]/)
    .map(s => s.trim())
    .filter(s => s.length > 20); // ignore very short noise
}

module.exports = extractSentences;
