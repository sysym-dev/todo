export function generateGithubLoginUrl() {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

  return `https://github.com/login/oauth/authorize?client_id=${clientId}`;
}
