/* Household Solutions — shared behaviour */

const WHATSAPP_NUMBER = '264812385723'; // no +, no spaces (used for wa.me links)
const PHONE_NUMBER = '+264 81 238 5723';
const PHONE_TEL = '+264812385723';
const OWNER_EMAIL = 'householdsolutions97@gmail.com';

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

    /* ---- selector panel's own WhatsApp button: carry ticked boxes into the message ---- */
    const selectorWaLink = selectorForm.querySelector('[data-wa-href]');
    if (selectorWaLink) {
      selectorWaLink.addEventListener('click', (e) => {
        e.preventDefault();
        const checked = [...selectorForm.querySelectorAll('input[type="checkbox"]:checked')]
          .map(c => c.value);
        const type = selectorForm.dataset.type || '';
        let msg = `Hi Household Solutions, I'd like to book a job.%0A`;
        if (type) msg += `Type: ${type}%0A`;
        msg += checked.length ? `Services: ${checked.join(', ')}` : `Services: (none ticked yet)`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
      });
    }
  }

  /* ---- Pricing panels (Indoor/Outdoor size sections + garage tiers) ---- */
  function buildExtrasSummary(panel, checkSelector) {
    const checks = panel.querySelectorAll(checkSelector + ':checked');
    const lines = [];
    checks.forEach(chk => {
      const row = chk.closest('.extra-row') || chk.closest('.garage-tier');
      const qtyEl = row ? row.querySelector('.qty-val') : null;
      const qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
      const label = chk.dataset.label || chk.value;
      lines.push(qty > 1 ? `${label} x${qty}` : label);
    });
    return lines;
  }

  document.querySelectorAll('.pricing-section[data-panel]').forEach(panel => {
    const basePrice = parseFloat(panel.dataset.basePrice) || 0;
    const baseLabel = panel.dataset.baseLabel || '';
    const type = panel.dataset.type || '';
    const size = panel.dataset.size || '';
    const totalEl = panel.querySelector('.total-amount');
    const noteEl = panel.querySelector('.selected-note');
    const checks = panel.querySelectorAll('.extra-check');

    function currentTotal() {
      if (panel.dataset.packageMode === 'true') {
        return parseFloat(panel.dataset.packagePrice) || 0;
      }
      let total = basePrice;
      checks.forEach(chk => {
        if (chk.checked) {
          const row = chk.closest('.extra-row');
          const qtyEl = row ? row.querySelector('.qty-val') : null;
          const qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
          total += (parseFloat(chk.dataset.price) || 0) * qty;
        }
      });
      return total;
    }

    function recalc() {
      const total = currentTotal();
      if (totalEl) totalEl.textContent = `N$${total}`;
      if (panel.dataset.packageMode === 'true') {
        if (noteEl) noteEl.textContent = `${panel.dataset.packageLabel} selected — tap "Choose extras instead" to switch back`;
        return;
      }
      const count = panel.querySelectorAll('.extra-check:checked').length;
      if (noteEl) noteEl.textContent = count ? `${count} extra${count > 1 ? 's' : ''} selected` : 'No extras selected — base clean only';
    }

    const packageBtn = panel.querySelector('.pp-package');
    if (packageBtn) {
      let undoBtn = document.createElement('button');
      undoBtn.type = 'button';
      undoBtn.className = 'btn btn-outline-blue';
      undoBtn.style.cssText = 'display:none;margin-top:10px;font-size:0.8rem;padding:8px 14px;';
      undoBtn.textContent = 'Choose extras instead';
      packageBtn.closest('.package-card').after(undoBtn);

      packageBtn.addEventListener('click', () => {
        panel.dataset.packageMode = 'true';
        panel.dataset.packagePrice = packageBtn.dataset.price;
        panel.dataset.packageLabel = packageBtn.dataset.label;
        checks.forEach(chk => { chk.checked = false; chk.disabled = true; });
        panel.querySelectorAll('.qty-btn').forEach(b => b.disabled = true);
        packageBtn.textContent = 'Package Selected ✓';
        packageBtn.disabled = true;
        undoBtn.style.display = 'inline-flex';
        recalc();
      });
      undoBtn.addEventListener('click', () => {
        panel.dataset.packageMode = 'false';
        checks.forEach(chk => { chk.disabled = false; });
        panel.querySelectorAll('.qty-btn').forEach(b => b.disabled = false);
        packageBtn.textContent = 'Select Package';
        packageBtn.disabled = false;
        undoBtn.style.display = 'none';
        recalc();
      });
    }

    checks.forEach(chk => chk.addEventListener('change', recalc));
    panel.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('.extra-row');
        const valEl = row.querySelector('.qty-val');
        const chk = row.querySelector('.extra-check');
        let val = parseInt(valEl.textContent, 10);
        val = btn.classList.contains('qty-plus') ? Math.min(val + 1, 20) : Math.max(val - 1, 1);
        valEl.textContent = val;
        if (chk && !chk.checked) chk.checked = true;
        recalc();
      });
    });
    recalc();

    function summary() {
      if (panel.dataset.packageMode === 'true') {
        return { type, size, baseLabel: panel.dataset.packageLabel, extras: [], total: currentTotal() };
      }
      const extras = buildExtrasSummary(panel, '.extra-check');
      return { type, size, baseLabel, extras, total: currentTotal() };
    }

    const submitBtn = panel.querySelector('.pp-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const s = summary();
        const params = new URLSearchParams();
        params.set('type', s.type);
        params.set('size', s.size);
        params.set('services', [s.baseLabel, ...s.extras].join(', '));
        params.set('total', `N$${s.total}`);
        window.location.href = 'booking.html?' + params.toString();
      });
    }

    const waBtn = panel.querySelector('.pp-whatsapp');
    if (waBtn) {
      waBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const s = summary();
        let msg = `Hi Household Solutions, I'd like to book a job.%0A`;
        msg += `Type: ${s.type} — ${s.size}%0A`;
        msg += `Base: ${s.baseLabel}%0A`;
        if (s.extras.length) msg += `Extras: ${s.extras.join(', ')}%0A`;
        msg += `Estimated Total: N$${s.total}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
      });
    }

    const emailBtn = panel.querySelector('.pp-email');
    if (emailBtn) {
      emailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const s = summary();
        const subject = `Booking Request — ${s.type} (${s.size})`;
        let body = `Hi Household Solutions,\n\nI'd like to book the following:\n\n`;
        body += `Type: ${s.type} — ${s.size}\n`;
        body += `Base: ${s.baseLabel}\n`;
        if (s.extras.length) body += `Extras: ${s.extras.join(', ')}\n`;
        body += `\nEstimated Total: N$${s.total}\n\nPlease confirm availability. Thank you!`;
        window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      });
    }
  });

  /* ---- Garage tier panel (Outdoor page) ---- */
  const garagePanel = document.querySelector('.pricing-section[data-garage-panel]');
  if (garagePanel) {
    const type = garagePanel.dataset.type || 'Garage Cleaning';
    const totalEl = garagePanel.querySelector('.total-amount');
    const noteEl = garagePanel.querySelector('.selected-note');
    const tierRadios = garagePanel.querySelectorAll('input[name="garage-tier"]');
    const addonChecks = garagePanel.querySelectorAll('.extra-check');

    function garageTotal() {
      let total = 0;
      const checkedTier = garagePanel.querySelector('input[name="garage-tier"]:checked');
      if (checkedTier) total += parseFloat(checkedTier.dataset.price) || 0;
      addonChecks.forEach(chk => { if (chk.checked) total += parseFloat(chk.dataset.price) || 0; });
      return total;
    }

    function garageRecalc() {
      const checkedTier = garagePanel.querySelector('input[name="garage-tier"]:checked');
      const total = garageTotal();
      if (totalEl) totalEl.textContent = checkedTier ? `N$${total}` : '—';
      if (noteEl) noteEl.textContent = checkedTier ? checkedTier.dataset.label : 'Choose a tier above';
    }

    tierRadios.forEach(r => r.addEventListener('change', garageRecalc));
    addonChecks.forEach(c => c.addEventListener('change', garageRecalc));
    garageRecalc();

    function garageSummary() {
      const checkedTier = garagePanel.querySelector('input[name="garage-tier"]:checked');
      const extras = buildExtrasSummary(garagePanel, '.extra-check');
      return {
        type,
        tier: checkedTier ? checkedTier.dataset.label : 'Not selected',
        extras,
        total: garageTotal()
      };
    }

    function garageTierSelected() {
      const ok = !!garagePanel.querySelector('input[name="garage-tier"]:checked');
      if (!ok) alert('Please choose a garage tier above first.');
      return ok;
    }

    const submitBtn = garagePanel.querySelector('.pp-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (!garageTierSelected()) return;
        const s = garageSummary();
        const params = new URLSearchParams();
        params.set('type', s.type);
        params.set('services', [s.tier, ...s.extras].join(', '));
        params.set('total', `N$${s.total}`);
        window.location.href = 'booking.html?' + params.toString();
      });
    }

    const waBtn = garagePanel.querySelector('.pp-whatsapp');
    if (waBtn) {
      waBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!garageTierSelected()) return;
        const s = garageSummary();
        let msg = `Hi Household Solutions, I'd like to book a job.%0A`;
        msg += `Type: ${s.type}%0A`;
        msg += `Tier: ${s.tier}%0A`;
        if (s.extras.length) msg += `Extras: ${s.extras.join(', ')}%0A`;
        msg += `Estimated Total: N$${s.total}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
      });
    }

    const emailBtn = garagePanel.querySelector('.pp-email');
    if (emailBtn) {
      emailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!garageTierSelected()) return;
        const s = garageSummary();
        const subject = `Booking Request — ${s.type}`;
        let body = `Hi Household Solutions,\n\nI'd like to book the following:\n\n`;
        body += `Type: ${s.type}\n`;
        body += `Tier: ${s.tier}\n`;
        if (s.extras.length) body += `Extras: ${s.extras.join(', ')}\n`;
        body += `\nEstimated Total: N$${s.total}\n\nPlease confirm availability. Thank you!`;
        window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      });
    }
  }

  /* ---- prefill booking form from URL params ---- */
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    const params = new URLSearchParams(window.location.search);
    const services = params.get('services');
    const type = params.get('type');
    const size = params.get('size');
    const total = params.get('total');
    if (services) {
      const field = bookingForm.querySelector('[name="services"]');
      if (field) field.value = services;
    }
    if (total) {
      const field = bookingForm.querySelector('[name="total"]');
      if (field) field.value = total;
    }
    if (type) {
      const radio = bookingForm.querySelector(`input[name="job_type"][value="${type}"]`);
      if (radio) radio.checked = true;
    }
    if (size) {
      const select = bookingForm.querySelector('[name="area_size"]');
      if (select) {
        const opt = [...select.options].find(o => o.textContent.trim() === size.trim());
        if (opt) select.value = opt.value;
      }
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
        const total = form.querySelector('[name="total"]')?.value;
        const details = form.querySelector('[name="details"]')?.value;
        const date = form.querySelector('[name="date"]')?.value;
        msg = `Hi Household Solutions, I'd like to book a job.%0A` +
          (name ? `Name: ${name}%0A` : '') +
          (address ? `Address: ${address}%0A` : '') +
          (services ? `Services: ${services}%0A` : '') +
          (total ? `Estimated Total: ${total}%0A` : '') +
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
