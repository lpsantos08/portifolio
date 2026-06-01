
// ================= MENU MOBILE =================
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
  }
});

// fechar clicando fora (✅ corrigido)
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
  }
});


// ================= SCROLL OTIMIZADO =================
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('.header');

let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {

      let top = window.scrollY;

      sections.forEach(sec => {
        let offset = sec.offsetTop - 120;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {

          // só altera se ainda não estiver ativo (✅ evita processamento repetido)
          const currentActive = document.querySelector('header nav a.active');
          const newActive = document.querySelector(`header nav a[href*="${id}"]`);

          if (newActive && currentActive !== newActive) {
            navLinks.forEach(link => link.classList.remove('active'));
            newActive.classList.add('active');
          }
        }
      });

      header.classList.toggle('sticky', top > 10);

      ticking = false;
    });

    ticking = true;
  }
});


// ================= SUA PARTE DO SWIPER (INTOCADA) =================
// (mantive exatamente como você enviou)

const swiperWrapper = document.querySelector('.mySwiper3D .swiper-wrapper');
const originalSlides = swiperWrapper.querySelectorAll('.swiper-slide');

const totalNeeded = 20;

if (originalSlides.length > 0) {
  while (swiperWrapper.children.length < totalNeeded) {
    originalSlides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      swiperWrapper.appendChild(clone);
    });
  }
}

var swiper3D = new Swiper(".mySwiper3D", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  spaceBetween: -196,
  speed: 600,
  loopedSlides: 15,
  loopAdditionalSlides: 5,
  allowTouchMove: true,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  slideToClickedSlide: true,

  coverflowEffect: {
    rotate: 5,
    stretch: -0.35,
    depth: 120,
    modifier: 5,
    slideShadows: true,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      if (index < 5) {
        return '<span class="' + className + '"></span>';
      }
      return '';
    },
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  }
});

swiper3D.on('slideChangeTransitionStart', () => {
  swiper3D.slides.forEach((slide) => {
    const realIndex = slide.getAttribute('data-swiper-slide-index');
    slide.classList.remove('active-slide');
    if (parseInt(realIndex) === swiper3D.realIndex) {
      slide.classList.add('active-slide');
    }
  });
});


// ================= HOVER (AJUSTADO MOBILE) =================
const slides = document.querySelectorAll('.portfolio-box .swiper-slide');

slides.forEach(slide => {
  const slideContent = slide.querySelector('.slide-content');
  if(!slideContent) return;

  // desktop
  slideContent.addEventListener('mouseenter', () => {
    slide.classList.add('content-hover');
  });

  slideContent.addEventListener('mouseleave', () => {
    slide.classList.remove('content-hover');
  });

  // ✅ mobile (evita bug de hover travando)
  slideContent.addEventListener('touchstart', () => {
    slide.classList.toggle('content-hover');
  });
});


// ================= SWIPER DEPOIMENTO =================
const swiper = new Swiper('.mySwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
});


// ================= DARK MODE =================
let darkModeIcon = document.querySelector('#darkmode-icon');

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle('bx-sun');
  document.body.classList.toggle ('dark-mode');
};


// ================= SCROLL REVEAL (✅ AJUSTE CRÍTICO) =================
ScrollReveal({ 
  reset: false, // 🔥 PRINCIPAL CORREÇÃO DO LAG
  distance: '80px',
  duration: 1200,
  delay: 100
});

ScrollReveal().reveal('.heading', { origin: 'top' });
ScrollReveal().reveal('.home-content', { origin: 'top' });
ScrollReveal().reveal('.services-container, .mySwiper3D, .testimonial-wrapper, .contact form', { 
  origin: 'bottom' 
});
ScrollReveal().reveal('.home-content h1, .profession-container, .about-img img ', { 
  origin: 'left' 
});
ScrollReveal().reveal('.home-img img, .home-content h3, .home-content p, .about-content', { 
  origin: 'right' 
});


// ================= EMAILJS =================
(function () {
   emailjs.init("SLBG4DxbUFpryfPm2");
})();

document.getElementById("formContato").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = this;

  emailjs.sendForm("gmail008", "template_5esxfbm", form)
  .then(() => {
    exibirMensagem("Sua mensagem foi enviada com sucesso! Em breve entrarei em contato.");
    form.reset();
  }, (error) => {
    exibirMensagem("Erro ao enviar. Tente novamente.", "erro");
    console.error(error);
  });
});


// ================= FEEDBACK =================
function exibirMensagem(texto, tipo = "sucesso") {
  const msg = document.getElementById("mensagemFeedback");
  msg.textContent = texto;
  msg.className = "mensagem-feedback mostrar";

  if (tipo === "erro") {
    msg.classList.add("erro");
  }

  setTimeout(() => {
    msg.classList.remove("mostrar");
    setTimeout(() => {
      msg.classList.add("escondido");
    }, 400);
  }, 4000);
}


// ================= INPUT TELEFONE =================
const telefoneInput = document.querySelector('input[name="telefone"]');

if (telefoneInput) {
  telefoneInput.addEventListener('input', () => {
    telefoneInput.value = telefoneInput.value.replace(/[^0-9+\-\s()]/g, '');
  });
}
