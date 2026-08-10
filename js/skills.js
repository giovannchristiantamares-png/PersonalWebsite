// ===== SKILLS PAGE =====
// Default view is read-only. Click "Edit" to reveal a slider per skill --
// drag it and the bar + percent label update live as you move it.
//
// Same caveat as the Projects page: this is a static site with no
// backend, so edits save to YOUR browser's localStorage only. They'll
// show up for you on this device/browser, not for other visitors. To
// make a change permanent for everyone, edit `defaultSkills` below and
// redeploy.

const SKILLS_STORAGE_KEY = "myPortfolioSkills";

const defaultSkills = [
  { icon: "bi-filetype-py", name: "Python", percent: 5 },
  { icon: "bi-filetype-html", name: "HTML / CSS", percent: 20 },
  { icon: "bi-filetype-js", name: "JavaScript", percent: 10 },
  { icon: "bi-filetype-java", name: "Java", percent: 30 },
  { icon: "bi-database", name: "MySQL", percent: 30 },
  { icon: "bi-github", name: "Git & GitHub", percent: 20 },
  { icon: "bi-shield-lock-fill", name: "Cybersecurity Fundamentals", percent: 35 },
  { icon: "bi-image-fill", name: "Photoshop Automation", percent: 80 }
  	
];

let skillsEditMode = false;

function loadSkills() {
  const saved = localStorage.getItem(SKILLS_STORAGE_KEY);
  if (!saved) return defaultSkills;
  const parsed = JSON.parse(saved);
  if (!Array.isArray(parsed) || parsed.length === 0) return defaultSkills;
  return parsed;
}

function saveSkills(skills) {
  localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(skills));
}

function renderSkills() {
  const skills = loadSkills();
  const container = document.getElementById("skillsContainer");
  if (!container) return;
  container.innerHTML = "";

  skills.forEach((skill, index) => {
    const row = document.createElement("div");
    row.className = "skill-row";

    if (!skillsEditMode) {
      row.innerHTML = `
        <div class="skill-icon"><i class="bi ${skill.icon}"></i></div>
        <div class="skill-name">${skill.name}</div>
        <div class="skill-bar-track"><div class="skill-bar-fill" style="width: ${skill.percent}%;"></div></div>
        <div class="skill-percent">${skill.percent}%</div>
      `;
    } else {
      row.innerHTML = `
        <div class="skill-icon"><i class="bi ${skill.icon}"></i></div>
        <div class="skill-name">${skill.name}</div>
        <div class="skill-bar-track"><div class="skill-bar-fill" style="width: ${skill.percent}%;"></div></div>
        <input type="range" min="0" max="100" step="1" value="${skill.percent}"
               class="form-range skill-slider" data-index="${index}" style="width: 140px;">
        <div class="skill-percent skill-percent-live" data-index="${index}">${skill.percent}%</div>
      `;
    }

    container.appendChild(row);
  });

  if (skillsEditMode) attachSkillEditEvents();
}

function attachSkillEditEvents() {
  document.querySelectorAll(".skill-slider").forEach(slider => {
    slider.addEventListener("input", () => {
      const index = parseInt(slider.dataset.index, 10);
      const value = parseInt(slider.value, 10);

      // Live update: bar width and label move as the slider is dragged,
      // no click-away or save step needed.
      const row = slider.closest(".skill-row");
      row.querySelector(".skill-bar-fill").style.width = value + "%";
      row.querySelector(".skill-percent-live").textContent = value + "%";

      const skills = loadSkills();
      skills[index].percent = value;
      saveSkills(skills);
    });
  });
}

function setSkillsEditMode(on) {
  skillsEditMode = on;
  const toggleBtn = document.getElementById("toggleSkillsEditBtn");
  const resetBtn = document.getElementById("resetSkillsBtn");

  toggleBtn.innerHTML = on
    ? '<i class="bi bi-check-lg"></i> Done'
    : '<i class="bi bi-pencil-fill"></i> Edit';
  resetBtn.classList.toggle("d-none", !on);

  renderSkills();
}

document.getElementById("toggleSkillsEditBtn").addEventListener("click", () => {
  setSkillsEditMode(!skillsEditMode);
});

document.getElementById("resetSkillsBtn").addEventListener("click", () => {
  const confirmed = confirm("Reset all skill levels back to the defaults? Any edits you've made will be lost.");
  if (!confirmed) return;
  localStorage.removeItem(SKILLS_STORAGE_KEY);
  renderSkills();
});

renderSkills();
