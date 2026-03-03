/* ============================================================
   TRIMBOLI FINANCE — main.js
   ============================================================ */
(function () {
  'use strict';

  /* ── Australian phone validation ──
     Accepts:
       Mobile:   04xx xxx xxx  (10 digits starting with 04)
       Landline: 0x xxxx xxxx  (10 digits starting with 02/03/07/08)
       Intl:     +61 x xxxx xxxx
     Strips spaces, hyphens, parentheses before testing.
  ── */
  function isValidAUPhone(raw) {
    var stripped = raw.replace(/[\s\-().]/g, '');
    // International +61 prefix → normalise to 0x
    if (/^\+61/.test(stripped)) stripped = '0' + stripped.slice(3);
    // Must be exactly 10 digits starting with 0
    if (!/^0\d{9}$/.test(stripped)) return false;
    // Valid AU area/mobile prefixes
    return /^0(4|2|3|7|8)/.test(stripped);
  }

  function showError(input, msg) {
    clearError(input);
    input.classList.add('input-error');
    var err = document.createElement('span');
    err.className = 'field-error';
    err.setAttribute('role', 'alert');
    err.textContent = msg;
    input.parentNode.appendChild(err);
  }

  function clearError(input) {
    input.classList.remove('input-error');
    var existing = input.parentNode.querySelector('.field-error');
    if (existing) existing.remove();
  }

  function attachPhoneValidation(input) {
    if (!input) return;
    input.addEventListener('blur', function () {
      if (input.value.trim() === '') {
        if (input.required) showError(input, 'Phone number is required.');
        else clearError(input);
        return;
      }
      if (!isValidAUPhone(input.value)) {
        showError(input, 'Please enter a valid Australian phone number.');
      } else {
        clearError(input);
      }
    });
    input.addEventListener('input', function () {
      if (input.classList.contains('input-error')) {
        if (isValidAUPhone(input.value)) clearError(input);
      }
    });
  }

  /* ── Callback modal ── */
  var overlay   = document.getElementById('callbackModal');
  var openBtns  = document.querySelectorAll('[data-open-callback]');
  var closeBtn  = document.getElementById('modalClose');
  var form      = document.getElementById('callbackForm');
  var formWrap  = document.getElementById('modalFormWrap');
  var success   = document.getElementById('modalSuccess');
  var submitBtn = document.getElementById('formSubmit');

  var cbPhone = document.getElementById('cb-phone');
  attachPhoneValidation(cbPhone);

  function openModal() {
    if (!overlay) return;
    overlay.classList.add('is-open');
    document.body.classList.add('modal-open');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    setTimeout(function () {
      if (formWrap) formWrap.style.display = '';
      if (success)  success.style.display  = 'none';
      if (form) {
        form.reset();
        // Clear any lingering error states
        form.querySelectorAll('.input-error').forEach(function(el) { el.classList.remove('input-error'); });
        form.querySelectorAll('.field-error').forEach(function(el) { el.remove(); });
      }
      if (submitBtn) {
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Send enquiry →';
      }
    }, 260);
  }

  openBtns.forEach(function (btn) { btn.addEventListener('click', openModal); });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) closeModal();
  });

  /* ── Async Formspree submit (modal) ── */
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Validate phone before submitting
      if (cbPhone && cbPhone.value.trim() !== '' && !isValidAUPhone(cbPhone.value)) {
        showError(cbPhone, 'Please enter a valid Australian phone number.');
        cbPhone.focus();
        return;
      }
      if (cbPhone && cbPhone.required && cbPhone.value.trim() === '') {
        showError(cbPhone, 'Phone number is required.');
        cbPhone.focus();
        return;
      }

      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sending…';
      try {
        var res = await fetch(form.action, {
          method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          formWrap.style.display = 'none';
          success.style.display  = 'block';
        } else {
          submitBtn.disabled    = false;
          submitBtn.textContent = 'Try again';
        }
      } catch (_) {
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Try again';
      }
    });
  }

  /* ── Async Formspree submit (contact section form) ── */
  var contactForm    = document.getElementById('contactSectionForm');
  var contactSubmit  = document.getElementById('contactFormSubmit');
  var contactSuccess = document.getElementById('contactFormSuccess');
  var cPhone         = document.getElementById('c-phone');

  attachPhoneValidation(cPhone);

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Validate phone before submitting
      if (cPhone && cPhone.value.trim() !== '' && !isValidAUPhone(cPhone.value)) {
        showError(cPhone, 'Please enter a valid Australian phone number.');
        cPhone.focus();
        return;
      }

      contactSubmit.disabled    = true;
      contactSubmit.textContent = 'Sending…';
      try {
        var res = await fetch(contactForm.action, {
          method: 'POST', body: new FormData(contactForm), headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          contactForm.style.display    = 'none';
          contactSuccess.style.display = 'block';
        } else {
          contactSubmit.disabled    = false;
          contactSubmit.textContent = 'Send enquiry →';
        }
      } catch (_) {
        contactSubmit.disabled    = false;
        contactSubmit.textContent = 'Send enquiry →';
      }
    });
  }

})();
