const username = "GouthamSER";
const repoList = document.getElementById("repo-list");

// Fetch GitHub profile picture
fetch(`https://api.github.com/users/${username}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("profile-pic").src = data.avatar_url;
  });

// Fetch repositories
fetch(`https://api.github.com/users/${username}/repos`)
  .then(res => res.json())
  .then(repos => {
    repoList.innerHTML = '';
    repos.forEach(repo => {
      const card = document.createElement("div");
      card.className = "repo";
      card.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description || "No description available."}</p>
        <p><strong>Language:</strong> ${repo.language || "N/A"}</p>
      `;
      repoList.appendChild(card);
    });
  })
  .catch(err => {
    repoList.innerHTML = "<p>Failed to load repositories.</p>";
    console.error(err);
  });

// Typewriter Effect
const typewriterText = "Goutham Josh";
const typeEl = document.getElementById("typewriter");
let i = 0;

function type() {
  if (i < typewriterText.length) {
    typeEl.textContent += typewriterText.charAt(i);
    i++;
    setTimeout(type, 150);
  }
}
type();

// Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggleBtn.textContent = document.body.classList.contains("light")
    ? "🌙 Dark Mode"
    : "☀️ Light Mode";
});
