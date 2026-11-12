'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Abrir menú' : 'Cerrar menú');
  navLinks.classList.toggle('open', !expanded);
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
}));
const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, {threshold: 0.08}) : null;
document.querySelectorAll('.reveal').forEach(element => observer ? observer.observe(element) : element.classList.add('visible'));
document.querySelector('#year').textContent = new Date().getFullYear();
const modal = document.querySelector('#image-modal');
const modalImg = modal.querySelector('img');
const modalCaption = modal.querySelector('p');
document.querySelectorAll('.project-card').forEach(card => card.addEventListener('click', () => {
  modalImg.src = card.dataset.image;
  modalImg.alt = card.querySelector('img').alt;
  modalCaption.textContent = card.dataset.title;
  modal.showModal();
}));
modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {if(event.target === modal) modal.close();});
// Número oficial de Apoyo Creativo, Arequipa, Perú.
const WHATSAPP_NUMBER = '51958744709';
document.querySelector('#quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = form.elements.name.value.trim();
  const type = form.elements.event.value;
  const details = form.elements.details.value.trim();
  if (!name || !details) return;
  const message = `Hola, Apoyo Creativo. Quiero solicitar una cotización para un evento en Arequipa.\n\nNombre: ${name}\nTipo de evento: ${type}\nDetalles: ${details}`;
  const number = WHATSAPP_NUMBER.replace(/\D/g, '');
  if (!number) {
    navigator.clipboard?.writeText(message).then(() => alert('El mensaje se copió. Configura tu número de WhatsApp en script.js para habilitar el envío directo.')).catch(() => window.prompt('Copia este mensaje para WhatsApp:', message));
    if (!navigator.clipboard) window.prompt('Copia este mensaje para WhatsApp:', message);
    return;
  }
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});


// Barra de progreso y botón para volver al inicio.
const progressBar = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');
let scrollQueued = false;
function updateScrollUI(){
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const percent = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 0;
  progressBar.style.width = `${percent}%`;
  backToTop.classList.toggle('show', window.scrollY > 520);
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) {scrollQueued = true; requestAnimationFrame(updateScrollUI);}
}, {passive:true});
updateScrollUI();
// Movimiento sutil en escritorio; desactivado si el usuario prefiere menos animación.
const visual = document.querySelector('.hero-visual');
const visualPhoto = document.querySelector('.hero-image-wrap');
if (window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
  visual.addEventListener('pointermove', e => {
    const r = visual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    visualPhoto.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) rotate(-2deg)`;
  });
  visual.addEventListener('pointerleave', () => {visualPhoto.style.transform = '';});
}
