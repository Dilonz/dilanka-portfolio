const roles = [
  'Shopify Developer',
  'Front-End Developer',
  'E-Commerce Specialist',
  'WordPress Developer'
];

document.body.classList.add('loading');

window.addEventListener('load', () => {
  document.body.classList.remove('loading');
  document.body.classList.add('loaded');
});

const typedRole = document.getElementById('typed-role');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  if (!typedRole) return;

  const current = roles[roleIndex];
  typedRole.textContent = deleting
    ? current.slice(0, charIndex - 1)
    : current.slice(0, charIndex + 1);

  charIndex += deleting ? -1 : 1;

  if (!deleting && charIndex === current.length) {
    deleting = true;
    window.setTimeout(typeRole, 900);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  window.setTimeout(typeRole, deleting ? 42 : 82);
}

typeRole();

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector('.site-header');
const backToTop = document.querySelector('.back-to-top');

function updateChrome() {
  const scrolled = window.scrollY > 20;
  header?.classList.toggle('scrolled', scrolled);
  backToTop?.classList.toggle('visible', window.scrollY > 520);
}

updateChrome();
window.addEventListener('scroll', updateChrome, { passive: true });

const menuButton = document.querySelector('.menu-toggle');
const menuLinks = document.querySelectorAll('.menu-panel a');

function closeMenu() {
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll('[data-section]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    menuLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-40% 0px -52% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const element = entry.target;
    const target = Number(element.dataset.count);
    const duration = 1200;
    const start = performance.now();

    function updateCounter(time) {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
    counterObserver.unobserve(element);
  });
}, { threshold: 0.6 });

counters.forEach((counter) => counterObserver.observe(counter));

const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const name = data.get('name') || '';
  const email = data.get('email') || '';
  const phone = data.get('phone') || 'Not provided';
  const message = data.get('message') || '';

  const subject = encodeURIComponent('Portfolio inquiry from website');
  const body = encodeURIComponent(
    `Hi Dilanka,\n\nMy name is ${name}.\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
  );

  if (formNote) formNote.textContent = 'Opening your email app...';
  window.location.href = `mailto:dilankalakshitha333@gmail.com?subject=${subject}&body=${body}`;
});
