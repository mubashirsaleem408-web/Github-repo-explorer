const BASE_URL = "https://api.github.com";

async function handleResponse(response, notFoundMessage) {
  if (response.status === 403) {
    const rateLimitRemaining = response.headers.get("X-RateLimit-Remaining");
    if (rateLimitRemaining === "0") {
      throw new Error(
        "GitHub API rate limit exceeded. Please try again in a few minutes."
      );
    }
    throw new Error("Access forbidden. Please try again later.");
  }

  if (response.status === 404) {
    throw new Error(notFoundMessage);
  }

  if (!response.ok) {
    throw new Error("Something went wrong. Please try again.");
  }

  return response.json();
}

export async function searchUsers(query) {
  const response = await fetch(`${BASE_URL}/search/users?q=${query}&per_page=5`);
  const data = await handleResponse(response, "No users found.");
  return data.items;
}

export async function getUserProfile(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  return handleResponse(response, "User not found. Check the username and try again.");
}

export async function getUserRepos(username) {
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=updated&per_page=10`
  );
  return handleResponse(response, "Repositories not found.");
}

// For User page
export async function searchUsersPaginated(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/users?q=${query}&per_page=12&page=${page}`
  );
  const data = await handleResponse(response, "No users found.");
  return data; // { total_count, items } - poora object return kiya, sirf items nahi
}


// For repo page

export async function searchRepos({ query = "", language = "", sort = "stars", page = 1 }) {
  let q = query.trim() || "stars:>1"; // agar khaali ho, kam az kam 1 star wali repos dhoondo (kuch to milna chahiye)

  if (language) {
    q += ` language:${language}`;
  }

  const response = await fetch(
    `${BASE_URL}/search/repositories?q=${encodeURIComponent(q)}&sort=${sort}&order=desc&per_page=12&page=${page}`
  );

  const data = await handleResponse(response, "No repositories found.");
  return data;
}

// For explore page

export async function getTrendingRepos(timeRange = 30) {
  const date = new Date();
  date.setDate(date.getDate() - timeRange);
  const formattedDate = date.toISOString().split("T")[0]; // "YYYY-MM-DD"

  const q = `created:>${formattedDate}`;

  const response = await fetch(
    `${BASE_URL}/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=12`
  );

  const data = await handleResponse(response, "No trending repositories found.");
  return data.items;
}

// For Topic page

export async function getReposByTopic(topic, page = 1) {
  const q = `topic:${topic}`;

  const response = await fetch(
    `${BASE_URL}/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=12&page=${page}`
  );

  const data = await handleResponse(response, "No repositories found for this topic.");
  return data;
}