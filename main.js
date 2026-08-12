/* Household Solutions — shared behaviour */

const WHATSAPP_NUMBER = '264812385723'; // no +, no spaces (used for wa.me links)
const PHONE_NUMBER = '+264 81 238 5723';
const PHONE_TEL = '+264812385723';

document.addEventListener('DOMContentLoaded', () => {
  /* ---- mobile nav ---- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  /* ---- mark active nav link ---- */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });

  /* ---- service selector -> carries checked boxes to booking.html via URL ---- */
  const selectorForm = document.querySelector('.selector-panel');
  if (selectorForm) {
    const submitBtn = selectorForm.querySelector('.selector-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const checked = [...selectorForm.querySelectorAll('input[type="checkbox"]:checked')]
          .map(c => c.value);
        const type = selectorForm.dataset.type || '';
        const params = new URLSearchParams();
        if (checked.length) params.set('services', checked.join(', '));
        if (type) params.set('type', type);
        window.location.href = 'booking.html' + (params.toString() ? '?' + params.toString() : '');
      });
    }
  }

  /* ---- prefill booking form from URL params ---- */
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    const params = new URLSearchParams(window.location.search);
    const services = params.get('services');
    const type = params.get('type');
    if (services) {
      const field = bookingForm.querySelector('[name="services"]');
      if (field) field.value = services;
    }
    if (type) {
      const radio = bookingForm.querySelector(`input[name="job_type"][value="${type}"]`);
      if (radio) radio.checked = true;
    }
  }

  /* ---- Formspree AJAX submit ---- */
  const forms = document.querySelectorAll('form[data-formspree]');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-success');
      const submitBtn = form.querySelector('[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (response.ok) {
          if (status) { status.classList.add('show'); status.textContent = "Thanks — we've got your request and will contact you shortly."; }
          form.reset();
        } else {
          if (status) { status.classList.add('show'); status.style.background = 'rgba(231,76,60,0.1)'; status.style.borderColor = 'rgba(231,76,60,0.4)'; status.style.color = '#c0392b'; status.textContent = "Something went wrong sending the form — please call or WhatsApp us instead."; }
        }
      } catch (err) {
        if (status) { status.classList.add('show'); status.textContent = "Couldn't send right now — please call or WhatsApp us instead."; }
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
      }
    });
  });

  /* ---- WhatsApp quick-book buttons: prefill a message from the current form ---- */
  document.querySelectorAll('.wa-prefill').forEach(btn => {
    btn.addEventListener('click', () => {
      const form = document.getElementById('booking-form');
      let msg = 'Hi Household Solutions, I would like to book a job.';
      if (form) {
        const name = form.querySelector('[name="name"]')?.value;
        const address = form.querySelector('[name="address"]')?.value;
        const services = form.querySelector('[name="services"]')?.value;
        const details = form.querySelector('[name="details"]')?.value;
        const date = form.querySelector('[name="date"]')?.value;
        msg = `Hi Household Solutions, I'd like to book a job.%0A` +
          (name ? `Name: ${name}%0A` : '') +
          (address ? `Address: ${address}%0A` : '') +
          (services ? `Services: ${services}%0A` : '') +
          (date ? `Preferred date: ${date}%0A` : '') +
          (details ? `Details: ${details}` : '');
      }
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    });
  });

  /* ---- fill any [data-phone] / [data-whatsapp] / [data-tel] placeholders ---- */
  document.querySelectorAll('[data-phone-text]').forEach(el => el.textContent = PHONE_NUMBER);
  document.querySelectorAll('[data-tel-href]').forEach(el => el.setAttribute('href', `tel:${PHONE_TEL}`));
  document.querySelectorAll('[data-wa-href]').forEach(el => el.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}`));
});
