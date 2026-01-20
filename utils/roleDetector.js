function detectSeniorityLevel(jdText) {
  const jd = jdText.toLowerCase();

  // INTERN / FRESHER — strongest override
  const internSignals = [
    "intern",
    "internship",
    "fresher",
    "entry level",
    "entry-level",
    "no experience",
    "student",
    "graduate trainee"
  ];

  if (internSignals.some(k => jd.includes(k))) {
    return "Intern";
  }

  // JUNIOR
  const juniorSignals = [
    "junior",
    "0-1 years",
    "0-2 years",
    "1-2 years",
    "early career"
  ];

  if (juniorSignals.some(k => jd.includes(k))) {
    return "Junior";
  }

  // MID
  const midSignals = [
    "2+ years",
    "3+ years",
    "3-5 years",
    "mid level",
    "mid-level",
    "intermediate"
  ];

  if (midSignals.some(k => jd.includes(k))) {
    return "Mid";
  }

  // SENIOR — only if explicitly stated
  const seniorSignals = [
    "senior",
    "lead",
    "staff engineer",
    "principal",
    "architect",
    "5+ years",
    "7+ years",
    "8+ years"
  ];

  if (seniorSignals.some(k => jd.includes(k))) {
    return "Senior";
  }

  // Default fallback (industry-safe)
  return "Junior";
}

function detectRole(jdText) {
  const jd = jdText.toLowerCase();

  let role = "General Software Engineer";

  if (jd.includes("backend") || jd.includes("back-end")) {
    role = "Backend Developer";
  } else if (jd.includes("frontend") || jd.includes("front-end")) {
    role = "Frontend Developer";
  } else if (jd.includes("full stack") || jd.includes("fullstack")) {
    role = "Full Stack Developer";
  } else if (jd.includes("data engineer")) {
    role = "Data Engineer";
  } else if (jd.includes("machine learning") || jd.includes("ml")) {
    role = "Machine Learning Engineer";
  } else if (jd.includes("software engineer") || jd.includes("software developer")) {
    role = "Software Engineer";
  }

  const level = detectSeniorityLevel(jdText);

  return {
    role,
    level
  };
}

module.exports = detectRole;
