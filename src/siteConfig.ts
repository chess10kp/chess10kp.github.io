// Site configuration — things that aren't content (links, personal info, skill badges)
// Content lives in src/content/ as markdown files.

const siteConfig = {
  links: {
    github: "https://github.com/chess10kp",
    twitter: "https://x.com/3M4C5",
    linkedin: "https://www.linkedin.com/in/nitin-shankar-madhu",
    email: "mailto:nmadhu@umich.edu",
    chess: "https://chess.com/member/N_S_M",
    leetcode: "https://leetcode.com/u/chess10kp",
  },
  personal: {
    name: "Nitin Madhu",
    firstName: "Nitin",
    lastName: "Madhu",
    university: "UofM Dearborn",
    university_link: "https://umdearborn.edu",
    graduationYear: 2026,
    major: "CS",
  },
  skills: {
    software: ["Next.js", "React", "Typescript", "C#", "ASP.NET"],
    ml: ["Pytorch", "Tensorflow", "NumPy", "Pandas"],
    llm: ["LangChain"],
  },
  // Map tech names to icon filenames in /public/icons/
  techIcons: {
    "python": "Python.svg",
    "typescript": "Typescript.svg",
    "javascript": "Javascript.svg",
    "react": "React.svg",
    "react native": "React.svg",
    "next.js": "nextjs.svg",
    "nextjs": "nextjs.svg",
    "gemini": "gemini.svg",
    "fastapi": "fastapi.svg",
    "java": "Java.svg",
    "langchain": "langchain.svg",
    "c#": "CS.svg",
    "haskell": "Haskell.svg",
    "rust": "rust.svg",
    "node": "Node.svg",
    "aws": "AWS.svg",
    "mongodb": "MongoDB.svg",
    "rag": "AI.svg",
    "jac": "Python.svg",
    "llm": "AI.svg",
    "pytorch": "Pytorch.svg",
    "numpy": "Numpy.svg",
    "tensorflow": "Tensorflow.svg",
    "matplotlib": "Python.svg",
  },
} as const;

export default siteConfig;
