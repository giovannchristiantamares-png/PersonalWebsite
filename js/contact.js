// ===== CONTACT PAGE: basic client-side validation + confirmation =====
// This is a static site with no backend, so "sending" just validates the
// form and shows a confirmation message. Swap this out for a real
// endpoint (e.g. Formspree, EmailJS) if you want messages to actually arrive.

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const message = document.getElementById("contactMessage");
    const status = document.getElementById("contactStatus");

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      status.style.display = "block";
      status.className = "mt-3 fw-semibold text-danger";
      status.textContent = "Please fill in all fields with a valid email before sending.";
      return;
    }

    // No backend wired up yet — show a confirmation instead of silently reloading.
    status.style.display = "block";
    status.className = "mt-3 fw-semibold text-success";
    status.textContent = `Thanks, ${name.value.trim()}! Your message has been noted (this form isn't connected to a backend yet).`;

    contactForm.reset();
    contactForm.classList.remove("was-validated");
  });
}
