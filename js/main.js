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
  // i18n (ES/EN)
  // ============================================
  const translations = {
    es: {
      'hero.location': 'Málaga, España · Atención Colombia & España',
      'hero.title1': 'Asesoría Jurídica',
      'hero.title2': 'Clara y Estratégica',
      'hero.desc': 'Abogado colombiano con formación de posgrado en España. Te acompaño en temas de extranjería, empresa, y derecho en Colombia — todo desde una consulta online.',
      'hero.cta1': 'Reservar Consulta (30-50€)',
      'hero.cta2': 'Ver Servicios',
      'about.label': 'Sobre Mí',
      'about.title': 'Formación internacional,\nenfoque práctico',
      'about.desc1': 'Soy abogado colombiano con Tarjeta Profesional activa y dos maestrías cursadas en la Universidad de Málaga, España. Esta combinación me permite entender las necesidades jurídicas tanto del contexto colombiano como del europeo.',
      'about.desc2': 'Mi modelo de trabajo es simple: consultorías online donde evalúo tu caso, te doy un diagnóstico claro y te acompaño en la solución — ya sea directamente o a través de mi red de abogados aliados en Colombia para procesos que requieran presencia física.',
      'spain.label': 'Servicios en España',
      'spain.title': 'Orientación y Consultoría en España',
      'spain.desc': 'Asesoramiento para quienes viven, estudian o emprenden en territorio español.',
      'colombia.label': 'Servicios en Colombia',
      'colombia.title': 'Asesoría Jurídica para Colombia',
      'colombia.desc': 'Consultoría online, diagnóstico jurídico y representación a través de red de abogados aliados.',
      'process.label': 'Cómo Funciona',
      'process.title': 'Tu consulta en 3 pasos',
      'process.desc': 'Proceso simple, claro y profesional. Sin sorpresas.',
      'testimonials.label': 'Testimonios',
      'testimonials.title': 'Lo que dicen mis clientes',
      'faq.title': 'Preguntas Frecuentes',
      'booking.label': 'Agendar',
      'booking.title': 'Reserva tu Consulta',
      'booking.desc': 'Elige el día y horario que mejor te convenga. Confirmación inmediata por email.',
      'cta.title': '¿Tienes una duda rápida?',
      'cta.desc': 'Si no estás seguro de si puedo ayudarte, escríbeme por WhatsApp y te confirmo en minutos si tu caso es algo que manejo.',
      'contact.title': 'Contáctanos'
    },
    en: {
      'hero.location': 'Málaga, Spain · Serving Colombia & Spain',
      'hero.title1': 'Legal Advisory',
      'hero.title2': 'Clear and Strategic',
      'hero.desc': 'Colombian lawyer with postgraduate training in Spain. I assist with immigration, business, and Colombian law — all through online consultations.',
      'hero.cta1': 'Book Consultation (€30-50)',
      'hero.cta2': 'View Services',
      'about.label': 'About Me',
      'about.title': 'International training,\npractical approach',
      'about.desc1': 'I am a Colombian lawyer with an active Professional License and two master\'s degrees from the University of Málaga, Spain. This combination allows me to understand legal needs in both Colombian and European contexts.',
      'about.desc2': 'My working model is simple: online consultations where I evaluate your case, give you a clear diagnosis, and accompany you to the solution — either directly or through my network of allied lawyers in Colombia for proceedings requiring physical presence.',
      'spain.label': 'Services in Spain',
      'spain.title': 'Guidance & Consulting in Spain',
      'spain.desc': 'Advice for those living, studying, or starting a business in Spain.',
      'colombia.label': 'Services in Colombia',
      'colombia.title': 'Legal Advisory for Colombia',
      'colombia.desc': 'Online consulting, legal diagnosis, and representation through a network of allied attorneys.',
      'process.label': 'How It Works',
      'process.title': 'Your consultation in 3 steps',
      'process.desc': 'Simple, clear, and professional process. No surprises.',
      'testimonials.label': 'Testimonials',
      'testimonials.title': 'What my clients say',
      'faq.title': 'Frequently Asked Questions',
      'booking.label': 'Book',
      'booking.title': 'Book Your Consultation',
      'booking.desc': 'Choose the day and time that works best for you. Instant email confirmation.',
      'cta.title': 'Have a quick question?',
      'cta.desc': 'If you\'re not sure whether I can help, message me on WhatsApp and I\'ll confirm in minutes if your case is something I handle.',
      'contact.title': 'Contact Us'
    }
  };

  let currentLang = localStorage.getItem('fs-lang') || 'es';
  const langToggle = document.getElementById('langToggle');
  const langText = langToggle.querySelector('.lang-text');

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('fs-lang', lang);
    langText.textContent = lang === 'es' ? 'EN' : 'ES';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
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

  const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
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

    calMonth.textContent = `${monthNames[month]} ${year}`;
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
    const dayStr = `${selectedDay.getDate()} de ${monthNames[selectedDay.getMonth()]}`;
    selectedDateLabel.textContent = `Horarios — ${dayStr}`;

    const slots = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];
    const taken = [2, 6, 9, 13]; // simulate taken slots

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
      alert('Por favor completa todos los campos.');
      return;
    }

    const dayStr = `${selectedDay.getDate()} de ${monthNames[selectedDay.getMonth()]} ${selectedDay.getFullYear()}`;
    alert(`✓ Reserva confirmada\n\n📅 ${dayStr} a las ${selectedTime} (hora española)\n👤 ${name}\n📧 ${email}\n📋 ${topic}\n\nRecibirás un email con los detalles del pago y el enlace de videollamada.`);

    bookingConfirm.style.display = 'none';
    selectedDay = null;
    selectedTime = null;
    renderCalendar();
    timeSlots.innerHTML = '<p class="slot-placeholder">Elige un día laborable en el calendario.</p>';
    selectedDateLabel.textContent = 'Selecciona una fecha';
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
