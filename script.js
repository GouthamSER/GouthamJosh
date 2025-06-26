const username = "GouthamSER";
const repoList = document.getElementById("repo-list");
const profilePic = document.getElementById("profile-pic");

// Fetch GitHub profile picture
fetch(`https://api.github.com/users/${username}`)
  .then(res => res.json())
  .then(data => {
    if (profilePic && data.avatar_url) {
      profilePic.src = data.avatar_url;
    }
  });

// Fetch repositories
fetch(`https://api.github.com/users/${username}/repos`)
  .then(res => res.json())
  .then(repos => {
    if (repoList) {
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
    }
  })
  .catch(err => {
    if (repoList) {
      repoList.innerHTML = "<p>⚠️ Failed to load repositories.</p>";
    }
    console.error(err);
  });

// Typewriter Effect
const typewriterText = "Goutham Josh";
const typeEl = document.getElementById("typewriter");

let i = 0;
function type() {
  if (typeEl && i < typewriterText.length) {
    typeEl.textContent += typewriterText.charAt(i);
    i++;
    setTimeout(type, 150);
  }
}
type();

// Theme Toggle Button
const toggleBtn = document.getElementById("theme-toggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggleBtn.textContent = document.body.classList.contains("light")
      ? "🌙 Dark Mode"
      : "☀️ Light Mode";
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  });

  // Restore saved theme on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    toggleBtn.textContent = "🌙 Dark Mode";
  }
}
