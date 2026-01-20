const axios = require("axios");

const SEMANTIC_API_URL = "http://127.0.0.1:8000/semantic-score";

async function getSemanticScore(resumeText, jobDescription) {
  try {
    const response = await axios.post(SEMANTIC_API_URL, {
      resume: resumeText,
      jd: jobDescription
    });

    return response.data.semantic_score;
  } catch (error) {
    console.error("Semantic service error:", error.message);
    return null; // do not break Phase-1
  }
}

module.exports = {
  getSemanticScore
};
