// ===== PROJECTS PAGE =====
// Static by default. Click "Edit" (top right) to toggle edit mode and
// change names, descriptions, icons, and links -- including the GitHub
// link on each card.
//
// IMPORTANT: this is a static site with no backend, so edits save to
// YOUR browser's localStorage only. They'll show up for you on this
// device/browser, but not for other visitors. To make a change
// permanent for everyone, edit the `defaultProjects` array below and
// redeploy the site.

const STORAGE_KEY = "myPortfolioProjects";

const defaultProjects = [
  {
    icon: "bi-camera-fill",
    name: "ID Photo Batch Editing Automation",
    desc: "A Photoshop batch-processing workflow built with Smart Objects and Actions to produce 2x2 and 1x1 ID photo layouts at scale, used for a photo package editing business.",
    link: "#",
    github: "#"
  },
  {
    icon: "bi-bar-chart-fill",
    name: "Data Mining: Order Data Preprocessing",
    desc: "Cleaned and prepped a 100-row orders dataset with Python and Pandas -- missing values, duplicates, normalization, and categorical encoding.",
    link: "#",
    github: "#"
  },
  {
    icon: "bi-clipboard-data-fill",
    name: "Faculty Satisfaction Statistical Analysis",
    desc: "Group statistics project analyzing faculty satisfaction survey data with a corrected Z-test.",
    link: "#",
    github: "#"
  },
  {
    icon: "bi-bank",
    name: "PeraLink ATM Simulation",
    desc: "A self-contained JavaScript ATM app with full transaction logic, PIN lockout, and an admin console.",
    link: "#",
    github: "#"
  },
  {
    icon: "bi-globe",
    name: "This Portfolio Site",
    desc: "A personal portfolio built from scratch with Bootstrap 5, HTML, CSS, and JavaScript.",
    link: "#",
    github: "#"
  }
];

let editMode = false;

function loadProjects() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultProjects;
  const parsed = JSON.parse(saved);
  // An empty saved list almost always means everything got removed by
  // accident while testing edit mode -- fall back to defaults instead
  // of showing a blank page forever.
  if (!Array.isArray(parsed) || parsed.length === 0) return defaultProjects;
  // Backfill github field for anyone with older saved data.
  return parsed.map(p => ({ github: "#", ...p }));
}

function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function renderProjects() {
  const projects = loadProjects();
  const container = document.getElementById("projectsContainer");
  if (!container) return;
  container.innerHTML = "";

  projects.forEach((project, index) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    if (!editMode) {
      // ----- READ-ONLY VIEW -----
      col.innerHTML = `
        <div class="brown-card h-100">
          <div class="icon-square"><i class="bi ${project.icon}"></i></div>
          <h5 class="fw-bold">${project.name}</h5>
          <p class="text-muted small">${project.desc}</p>
          <div class="d-flex align-items-center gap-3">
            <a href="${project.link}" class="btn btn-brown-outline btn-sm">View Project</a>
            <a href="${project.github}" class="text-dark fs-5" target="_blank" rel="noopener"><i class="bi bi-github"></i></a>
          </div>
        </div>
      `;
    } else {
      // ----- EDIT VIEW -----
      col.innerHTML = `
        <div class="brown-card h-100 position-relative">
          <button class="btn-remove-project" title="Remove project" data-index="${index}">
            <i class="bi bi-x-lg"></i>
          </button>

          <div class="icon-square"><i class="bi ${project.icon}"></i></div>

          <label class="form-label small fw-semibold mb-1">Icon class</label>
          <input type="text" class="form-control form-control-brown form-control-sm mb-2 project-field"
                 data-index="${index}" data-field="icon" value="${project.icon}">

          <label class="form-label small fw-semibold mb-1">Name</label>
          <input type="text" class="form-control form-control-brown form-control-sm mb-2 project-field"
                 data-index="${index}" data-field="name" value="${project.name.replace(/"/g, '&quot;')}">

          <label class="form-label small fw-semibold mb-1">Description</label>
          <textarea class="form-control form-control-brown form-control-sm mb-2 project-field"
                    data-index="${index}" data-field="desc" rows="3">${project.desc}</textarea>

          <label class="form-label small fw-semibold mb-1">Project link</label>
          <input type="text" class="form-control form-control-brown form-control-sm mb-2 project-field"
                 data-index="${index}" data-field="link" value="${project.link.replace(/"/g, '&quot;')}">

          <label class="form-label small fw-semibold mb-1">GitHub link</label>
          <input type="text" class="form-control form-control-brown form-control-sm project-field"
                 data-index="${index}" data-field="github" value="${project.github.replace(/"/g, '&quot;')}">
        </div>
      `;
    }

    container.appendChild(col);
  });

  if (editMode) attachEditEvents();
}

function attachEditEvents() {
  document.querySelectorAll(".btn-remove-project").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      const projects = loadProjects();
      const confirmed = confirm(`Remove "${projects[index].name}"? This can't be undone.`);
      if (!confirmed) return;
      projects.splice(index, 1);
      saveProjects(projects);
      renderProjects();
    });
  });

  document.querySelectorAll(".project-field").forEach(el => {
    el.addEventListener("blur", () => {
      const index = parseInt(el.dataset.index);
      const field = el.dataset.field;
      const projects = loadProjects();
      projects[index][field] = el.value.trim();
      saveProjects(projects);
    });
  });
}

function setEditMode(on) {
  editMode = on;
  const toggleBtn = document.getElementById("toggleEditBtn");
  const addBtn = document.getElementById("addProjectBtn");
  const resetBtn = document.getElementById("resetProjectsBtn");

  toggleBtn.innerHTML = on
    ? '<i class="bi bi-check-lg"></i> Done'
    : '<i class="bi bi-pencil-fill"></i> Edit';
  addBtn.classList.toggle("d-none", !on);
  resetBtn.classList.toggle("d-none", !on);

  renderProjects();
}

document.getElementById("resetProjectsBtn").addEventListener("click", () => {
  const confirmed = confirm("Reset all projects back to the defaults? Any edits you've made will be lost.");
  if (!confirmed) return;
  localStorage.removeItem(STORAGE_KEY);
  renderProjects();
});

document.getElementById("toggleEditBtn").addEventListener("click", () => {
  setEditMode(!editMode);
});

document.getElementById("addProjectBtn").addEventListener("click", () => {
  const projects = loadProjects();
  projects.push({
    icon: "bi-folder-fill",
    name: "New Project",
    desc: "Click to edit this description.",
    link: "#",
    github: "#"
  });
  saveProjects(projects);
  renderProjects();
});

renderProjects();
