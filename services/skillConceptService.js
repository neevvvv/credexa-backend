const axios = require("axios");

const ML_BASE_URL = "https://NeevSahu-credexa-ml.hf.space";

async function getSkillConceptScores(jdSkills, resumeSentences) {
  try {
    const response = await axios.post(
      `${ML_BASE_URL}/skill-concept-match`,
      {
        jd_skills: jdSkills,
        resume_sentences: resumeSentences
      }
    );

    return response.data; // { skill: similarity }
  } catch (error) {
    console.error("ML Skill Concept Error:", error.message);
    return {};
  }
}

module.exports = {
  getSkillConceptScores
};
