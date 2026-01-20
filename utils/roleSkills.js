const ROLE_SKILLS = {
  "Backend Developer": {
    core: ["node", "express", "api", "database", "sql", "mongodb"],
    secondary: ["docker", "aws", "microservices"]
  },

  "Frontend Developer": {
    core: ["react", "javascript", "html", "css", "ui"],
    secondary: ["redux", "tailwind", "webpack"]
  },

  "Full Stack Developer": {
    core: ["react", "node", "express", "javascript"],
    secondary: ["docker", "mongodb", "sql"]
  },

  "Data / ML Engineer": {
    core: ["python", "pandas", "numpy", "machine learning"],
    secondary: ["sql", "tensorflow", "scikit"]
  },

  "General Software Engineer": {
    core: ["javascript", "python"],
    secondary: []
  }
};

module.exports = ROLE_SKILLS;
