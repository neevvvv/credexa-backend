const axios = require("axios");

const GENAI_API_URL = process.env.GENAI_API_URL;
const GENAI_API_KEY = process.env.GENAI_API_KEY;

function generateFallbackReview(payload) {
  return {
    overall_review: `Based on the resume and job description, the candidate shows a reasonable alignment with the ${payload.role} role. While some relevant skills and experience are present, there are areas where deeper exposure or stronger evidence would improve overall fit.`,
    strengths:
      payload.matchingSkills.length > 0
        ? payload.matchingSkills.map(
            (s) => `Demonstrates familiarity with ${s}`
          )
        : ["Shows willingness to learn and adapt to role requirements"],
    areas_to_improve:
      payload.missingSkills.length > 0
        ? payload.missingSkills.map(
            (s) => `Consider gaining more hands-on experience with ${s}`
          )
        : ["Strengthen project descriptions to better highlight impact"],
    role_fit_summary: `The candidate has foundational capabilities suitable for a ${payload.role}, with scope for growth through focused skill development.`,
  };
}

async function generateNarrativeReview(payload) {
  // Safety check — if env missing, fallback silently
  if (!GENAI_API_KEY || !GENAI_API_URL) {
    return generateFallbackReview(payload);
  }

  try {
    const prompt = `
You are an ATS resume reviewer.

Context:
- Job Role: ${payload.role}
- Level: ${payload.level}

Job Description:
${payload.jobDescription}

Resume Summary:
- Matching skills: ${payload.matchingSkills.join(", ") || "None"}
- Missing skills: ${payload.missingSkills.join(", ") || "None"}

Write a professional resume review.

Output STRICT JSON only with keys:
overall_review, strengths, areas_to_improve, role_fit_summary
`;

    const response = await axios.post(
      GENAI_API_URL,
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${GENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 20000, // REQUIRED for Render
      }
    );

    let content = response.data.choices[0].message.content.trim();

    // Clean markdown if present
    if (content.startsWith("```")) {
      content = content.replace(/^```json\s*/i, "");
      content = content.replace(/^```\s*/i, "");
      content = content.replace(/```$/i, "");
    }

    const parsed = JSON.parse(content);

    // Extra safety: validate keys
    if (
      !parsed.overall_review ||
      !parsed.strengths ||
      !parsed.areas_to_improve ||
      !parsed.role_fit_summary
    ) {
      return generateFallbackReview(payload);
    }

    return parsed;
  } catch {
    // SILENT fallback (as you want)
    return generateFallbackReview(payload);
  }
}

module.exports = { generateNarrativeReview };
