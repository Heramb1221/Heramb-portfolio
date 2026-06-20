export interface GitHubUser {
  login: string;
  name: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

export interface GitHubData {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  totalStars: number;
}

const GITHUB_USERNAME = "Heramb1221";
const GITHUB_API      = "https://api.github.com";

function buildHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
      headers: buildHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as GitHubUser;
  } catch {
    return null;
  }
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6&type=public`,
      {
        headers: buildHeaders(),
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    const repos = (await res.json()) as GitHubRepo[];
    return repos.filter((r) => r.description?.trim()).slice(0, 4);
  } catch {
    return [];
  }
}

export async function getGitHubData(): Promise<GitHubData> {
  const [user, repos] = await Promise.all([
    fetchGitHubUser(),
    fetchGitHubRepos(),
  ]);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  return { user, repos, totalStars };
}

export const languageColours: Record<string, string> = {
  TypeScript:  "#3178c6",
  JavaScript:  "#f1e05a",
  Python:      "#3572a5",
  Java:        "#b07219",
  "C#":        "#178600",
  Go:          "#00add8",
  Rust:        "#dea584",
  HTML:        "#e34c26",
  CSS:         "#563d7c",
  Shell:       "#89e051",
};
