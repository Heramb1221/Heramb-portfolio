export type LearningStatus =
  | "Learning"
  | "Exploring"
  | "Practicing"
  | "Completed"
  | "Future Ready";

export type LearningCategory =
  | "Backend"
  | "DevOps"
  | "Cloud"
  | "Frontend"
  | "System Design"
  | "Language";

export interface LearningItem {
  id: string;
  name: string;
  category: LearningCategory;
  description: string;
  status: LearningStatus;
}

export const learningItems: LearningItem[] = [
  {
    id: "dotnet",
    name: ".NET / ASP.NET Core",
    category: "Backend",
    description:
      "Building REST APIs and web applications using ASP.NET Core, exploring the C# ecosystem and Entity Framework.",
    status: "Learning",
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    description:
      "Containerising applications, writing Dockerfiles, and managing multi-container apps with Docker Compose.",
    status: "Exploring",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    category: "Cloud",
    description:
      "Learning cloud fundamentals — compute, storage, and deployment pipelines — through the Azure Fundamentals path.",
    status: "Exploring",
  },
  {
    id: "system-design",
    name: "System Design",
    category: "System Design",
    description:
      "Studying scalable system architecture — load balancing, caching, databases at scale, and distributed systems.",
    status: "Practicing",
  },
  {
    id: "csharp",
    name: "C#",
    category: "Language",
    description:
      "Learning C# as the primary language for .NET development — OOP patterns, LINQ, and async programming.",
    status: "Learning",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "Backend",
    description:
      "Expanding beyond MongoDB to understand relational database design, SQL optimisation, and Prisma ORM.",
    status: "Practicing",
  },
];
