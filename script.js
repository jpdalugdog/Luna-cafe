// Luna Café — vanilla JavaScript

// ----- 1. Mobile navigation -----
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

function setMenu(open) {
  navbar.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
navToggle.addEventListener('click', () => setMenu(!navbar.classList.contains('open')));
navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// ----- 2. Navbar background on scroll -----
function onScroll() { navbar.classList.toggle('scrolled', window.scrollY > 50); }
window.addEventListener('scroll', onScroll);
onScroll();
// (Smooth scrolling is handled in CSS: html { scroll-behavior: smooth; })

// ----- 3. Reveal elements when they enter the viewport -----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ----- 4. "View Full Menu" message -----
const menuNotice = document.getElementById('menuNotice');
document.getElementById('fullMenuBtn').addEventListener('click', () => {
  menuNotice.textContent = 'Our full menu is coming soon!';
});

// ----- 5. Contact form validation (front-end only) -----
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(input, message) {
  document.getElementById(input.id + 'Error').textContent = message;
  input.classList.toggle('invalid', Boolean(message));
  input.setAttribute('aria-invalid', Boolean(message));
}

function validate() {
  const name = form.name, email = form.email, message = form.message;
  let valid = true;
  showError(name, name.value.trim() ? '' : 'Please enter your name.');
  if (!name.value.trim()) valid = false;

  const emailValue = email.value.trim();
  let emailMsg = '';
  if (!emailValue) emailMsg = 'Please enter your email.';
  else if (!emailPattern.test(emailValue)) emailMsg = 'Please enter a valid email, like name@example.com.';
  showError(email, emailMsg);
  if (emailMsg) valid = false;

  showError(message, message.value.trim() ? '' : 'Please enter a message.');
  if (!message.value.trim()) valid = false;
  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();               // no page reload, no server
  success.hidden = true;
  if (validate()) {
    form.reset();
    success.hidden = false;         // success message
  }
});
