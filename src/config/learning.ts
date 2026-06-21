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
      "Learning the Microsoft ecosystem through ASP.NET Core, Entity Framework, dependency injection, and modern backend architecture.",
    status: "Learning",
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    description:
      "Learning containerisation, Dockerfiles, Docker Compose, and reproducible development environments for modern applications.",
    status: "Exploring",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "DevOps",
    description:
      "Exploring container orchestration, scaling strategies, service discovery, and production deployment workflows.",
    status: "Exploring",
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud",
    description:
      "Learning cloud fundamentals, deployment workflows, and managed services to understand how applications operate in production.",
    status: "Learning",
  },
  {
    id: "system-design",
    name: "System Design",
    category: "System Design",
    description:
      "Studying scalable architectures, caching, load balancing, distributed systems, and database design trade-offs.",
    status: "Practicing",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "Backend",
    description:
      "Expanding beyond MongoDB to understand relational modeling, query optimisation, indexing strategies, and advanced SQL concepts.",
    status: "Practicing",
  },
];
