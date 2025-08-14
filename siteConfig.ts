export default {
  currentStanding: () => {
    switch (new Date().getFullYear() - 2022) {
      case 0:
        return "Freshman";
      case 1:
        return "Sophomore";
      case 2:
        return "Junior";
      case 3:
        return "Senior";
      default:
        return "Graduate";
    }
  },
  links: {
    github: "https://github.com/chess10kp",
    linkedin: "https://www.linkedin.com/in/nitin-shankar-madhu",
    email: "mailto:nmadhu@umich.edu",
    chess: "https://chess.com/member/N_S_M",
    leetcode: "https://leetcode.com/u/chess10kp",
  },
  personal: {
    name: "Nitin Madhu",
    university: "UofM Dearborn",
    university_link: "https://umdearborn.edu",
    graduationYear: 2026,
    major: "CS",
  },
  skills: {
    software: [
      "Next.js",
      "React",
      "ASP.NET",
      "HTML/CSS",
      "Typescript",
      "Javascript",
    ],
    ml: ["Python", "Pytorch", "Tensorflow", "NumPy", "Pandas", "Tailwind"],
    llm: ["LangChain", "Hugging Face", "Vector Databases"],
  },
};