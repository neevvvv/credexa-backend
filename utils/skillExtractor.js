const ALL_SKILLS = [
  "javascript",
  "typescript",
  "react",
  "node",
  "express",
  "mongodb",
  "mysql",
  "postgresql",
  "python",
  "java",
  "c++",
  "docker",
  "kubernetes",
  "aws",
  "git",
  "html",
  "css",
  "rest",
  "api",
  "machine learning",
  "data science",
  "pandas",
  "numpy",
  "sql"
];

function extractSkills(text = "") {
  const lowerText = text.toLowerCase();

  return ALL_SKILLS.filter(skill =>
    lowerText.includes(skill)
  );
}

module.exports = extractSkills;
