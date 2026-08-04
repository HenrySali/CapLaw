// Felipe Salinas - Legal Consultant Website
// Theme Toggle, i18n, FAQ, Booking Calendar, Smooth interactions

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // THEME TOGGLE
  // ============================================
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('fs-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('fs-theme', next);
  });

  // ============================================
  // i18n (ES/EN) - Uses translations from i18n.js
  // ============================================
  let currentLang = localStorage.getItem('fs-lang') || 'es';
  const langToggle = document.getElementById('langToggle');
  const langText = langToggle.querySelector('.lang-text');

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('fs-lang', lang);
    langText.textContent = lang === 'es' ? 'EN' : 'ES';

    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });

    // Set lang attribute on html
    document.documentElement.lang = lang;
  }

  langToggle.addEventListener('click', () => {
    setLanguage(currentLang === 'es' ? 'en' : 'es');
  });

  setLanguage(currentLang);

  // ============================================
  // NAVBAR
  // ============================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  // Mobile toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .step-card, .testimonial-card, .faq-item, .credential, .about-stat, .especialidad-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
  });

  // ============================================
  // ESPECIALIDAD CTA → PRE-SELECT TOPIC
  // ============================================
  document.querySelectorAll('.especialidad-cta').forEach(link => {
    link.addEventListener('click', (e) => {
      const topic = link.getAttribute('data-topic');
      if (topic) {
        const bookTopic = document.getElementById('bookTopic');
        if (bookTopic) {
          bookTopic.value = topic;
        }
      }
    });
  });

  // ============================================
  // CASOS REALES ACCORDION
  // ============================================
  document.querySelectorAll('.caso-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const jurisdiccion = btn.parentElement;
      const isOpen = jurisdiccion.classList.contains('open');
      // Close other jurisdicciones within the same card
      const card = jurisdiccion.closest('.especialidad-card');
      card.querySelectorAll('.casos-jurisdiccion').forEach(j => j.classList.remove('open'));
      if (!isOpen) {
        jurisdiccion.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ============================================
  // FAQ ACCORDION
  // ============================================
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ============================================
  // BOOKING CALENDAR
  // ============================================
  const calDays = document.getElementById('calDays');
  const calMonth = document.getElementById('calMonth');
  const calPrev = document.getElementById('calPrev');
  const calNext = document.getElementById('calNext');
  const timeSlots = document.getElementById('timeSlots');
  const selectedDateLabel = document.getElementById('selectedDateLabel');
  const bookingConfirm = document.getElementById('bookingConfirm');
  const confirmBooking = document.getElementById('confirmBooking');

  const monthNames = {
    es: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December']
  };
  let calDate = new Date(2026, 6, 1); // July 2026
  let selectedDay = null;
  let selectedTime = null;

  function renderCalendar() {
    const year = calDate.getFullYear();
    const month = calDate.getMonth();
    const today = new Date();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay === 0 ? 6 : firstDay - 1;

    const names = monthNames[currentLang] || monthNames['es'];
    calMonth.textContent = `${names[month]} ${year}`;
    calDays.innerHTML = '';

    for (let i = 0; i < startDay; i++) {
      const empty = document.createElement('button');
      empty.classList.add('day', 'empty');
      empty.disabled = true;
      calDays.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dayBtn = document.createElement('button');
      dayBtn.classList.add('day');
      dayBtn.textContent = d;
      const thisDate = new Date(year, month, d);
      const dayOfWeek = thisDate.getDay();

      if (thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || dayOfWeek === 0 || dayOfWeek === 6) {
        dayBtn.classList.add('disabled');
        dayBtn.disabled = true;
      }

      if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayBtn.classList.add('today');
      }

      if (selectedDay && d === selectedDay.getDate() && month === selectedDay.getMonth() && year === selectedDay.getFullYear()) {
        dayBtn.classList.add('selected');
      }

      dayBtn.addEventListener('click', () => {
        selectedDay = new Date(year, month, d);
        selectedTime = null;
        renderCalendar();
        renderTimeSlots();
      });

      calDays.appendChild(dayBtn);
    }
  }

  function renderTimeSlots() {
    if (!selectedDay) return;
    const names = monthNames[currentLang] || monthNames['es'];
    const dayStr = currentLang === 'en'
      ? `${names[selectedDay.getMonth()]} ${selectedDay.getDate()}`
      : `${selectedDay.getDate()} de ${names[selectedDay.getMonth()]}`;
    const prefix = currentLang === 'en' ? 'Available times — ' : 'Horarios — ';
    selectedDateLabel.textContent = `${prefix}${dayStr}`;

    const slots = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];
    const taken = [2, 6, 9, 13];

    timeSlots.innerHTML = '';
    slots.forEach((slot, i) => {
      if (taken.includes(i)) return;
      const btn = document.createElement('button');
      btn.classList.add('time-slot');
      btn.textContent = slot;
      btn.addEventListener('click', () => {
        selectedTime = slot;
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        btn.classList.add('selected');
        bookingConfirm.style.display = 'block';
      });
      timeSlots.appendChild(btn);
    });
  }

  calPrev.addEventListener('click', () => {
    calDate.setMonth(calDate.getMonth() - 1);
    renderCalendar();
  });

  calNext.addEventListener('click', () => {
    calDate.setMonth(calDate.getMonth() + 1);
    renderCalendar();
  });

  confirmBooking.addEventListener('click', () => {
    const name = document.getElementById('bookName').value;
    const email = document.getElementById('bookEmail').value;
    const topic = document.getElementById('bookTopic').value;

    if (!name || !email || !topic) {
      const msg = currentLang === 'en' ? 'Please complete all fields.' : 'Por favor completa todos los campos.';
      alert(msg);
      return;
    }

    const names = monthNames[currentLang] || monthNames['es'];
    const dayStr = currentLang === 'en'
      ? `${names[selectedDay.getMonth()]} ${selectedDay.getDate()}, ${selectedDay.getFullYear()}`
      : `${selectedDay.getDate()} de ${names[selectedDay.getMonth()]} ${selectedDay.getFullYear()}`;
    const timeLabel = currentLang === 'en' ? 'Spanish time' : 'hora española';

    alert(currentLang === 'en'
      ? `✓ Booking confirmed\n\n📅 ${dayStr} at ${selectedTime} (${timeLabel})\n👤 ${name}\n📧 ${email}\n📋 ${topic}\n\nYou will receive an email with payment details and the video call link.`
      : `✓ Reserva confirmada\n\n📅 ${dayStr} a las ${selectedTime} (${timeLabel})\n👤 ${name}\n📧 ${email}\n📋 ${topic}\n\nRecibirás un email con los detalles del pago y el enlace de videollamada.`
    );

    bookingConfirm.style.display = 'none';
    selectedDay = null;
    selectedTime = null;
    renderCalendar();
    const placeholder = translations[currentLang]['booking.placeholder'] || 'Elige un día laborable en el calendario.';
    timeSlots.innerHTML = `<p class="slot-placeholder">${placeholder}</p>`;
    selectedDateLabel.textContent = translations[currentLang]['booking.selectdate'] || 'Selecciona una fecha';
    document.getElementById('bookName').value = '';
    document.getElementById('bookEmail').value = '';
    document.getElementById('bookTopic').value = '';
  });

  renderCalendar();

  // ============================================
  // SERVICE WORKER (PWA)
  // ============================================
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

});
