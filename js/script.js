// menu icon mobile navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// evento click no menu mobile para aparecer o X
  menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');

  //alternando a classe active para fazer o botão X funcionar
  navbar.classList.toggle('active');
}

//fechando menu com esq
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
  }
});

//fechando ao clicar fora
navbar.addEventListener('click', () => {
  // Remove as classes para fechar o menu
  navbar.classList.remove('active');
  menuIcon.classList.remove('bx-x');
});

// Destacar o link ativo na barra de navegação (navbar) conforme o usuário rola a página
let sections = document.querySelectorAll('section'); // sections armazena todos os elementos <section> na página.
let navLinks = document.querySelectorAll('header nav a'); // navLinks armazena todos os links dentro da barra de navegação (<header nav>).


window.onscroll = () => { //evento acionado sempre que o usuário rola a página.
  // Calculando onde cada seção começa e termina
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      // Remove active de todos os links apenas uma vez
      navLinks.forEach(link => link.classList.remove('active'));

      // Adiciona active somente no link referente à seção visível
      const activeLink = document.querySelector('header nav a[href*="' + id + '"]');
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });

  // barra de navegação fixa
  let header = document.querySelector('.header'); //seleciona o elemento com a classe header

  //se o usuário rolou mais de 100px, adiciona a classe sticky
  //caso contrário, remove a classe sticky
  header.classList.toggle('sticky', window.scrollY > 10); 
};

// ========== SLIDE PORTFOLIO DUPLICAR SLIDES NO DOM ==========
const swiperWrapper = document.querySelector('.mySwiper3D .swiper-wrapper');
const originalSlides = swiperWrapper.querySelectorAll('.swiper-slide');

// Define o total mínimo necessário no DOM
const totalNeeded = 20;

if (originalSlides.length > 0) {
  while (swiperWrapper.children.length < totalNeeded) {
    originalSlides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      swiperWrapper.appendChild(clone);
    });
  }
}

// ==========  INICIALIZAR O SWIPER ==========
var swiper3D = new Swiper(".mySwiper3D", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  spaceBetween: -196,
  speed: 600,
  loopedSlides: 15, // Aumentado para refletir os clones
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
    clickable: true,
    renderBullet: function (index, className) {
      if (index < 5) { // 👈 mostra só até o 5º bullet
        return '<span class="' + className + '"></span>';
      }
      return ''; // esconde os outros
    },
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

    // === AUTOPLAY ===
  autoplay: {
    delay: 2000, // tempo em ms entre cada slide (3s)
    disableOnInteraction: true, // não continua mesmo após o usuário interagir
  }
});



// ==========  ATUALIZAÇÃO DE CLASSES DE SLIDE ATIVO ==========
swiper3D.on('slideChangeTransitionStart', () => {
  swiper3D.slides.forEach((slide) => {
    const realIndex = slide.getAttribute('data-swiper-slide-index');
    slide.classList.remove('active-slide');
    if (parseInt(realIndex) === swiper3D.realIndex) {
      slide.classList.add('active-slide');
    }
  });
});

// Pega todos os slides dentro do container portfolio-box
const slides = document.querySelectorAll('.portfolio-box .swiper-slide');

slides.forEach(slide => {
  const slideContent = slide.querySelector('.slide-content');
  if(!slideContent) return; // se não existir, pula

  slideContent.addEventListener('mouseenter', () => {
    slide.classList.add('content-hover');
  });

  slideContent.addEventListener('mouseleave', () => {
    slide.classList.remove('content-hover');
  });
});

// slide depoimento
const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,           // 1 slide por vez
    spaceBetween: 30,           // espaço entre slides
    loop: true,                 // loop infinito
    pagination: {
      el: '.swiper-pagination', // habilita paginação (bolinhas)
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',  // seta próximo
      prevEl: '.swiper-button-prev',  // seta anterior
    },
    autoplay: {
      delay: 7000,               // troca automática a cada 5s (opcional)
      disableOnInteraction: false,
    },
  });


// Modo noturno
let darkModeIcon = document.querySelector('#darkmode-icon'); // Seleciona o elemento HTML que tem o id="darkmode-icon" e o armazena na variável darkModeIcon

darkModeIcon.onclick = () => { // Define uma função anônima que será executada quando o usuário clicar no darkModeIcon 
  darkModeIcon.classList.toggle('bx-sun');   // Se a classe bx-sun não estiver presente, ela será adicionada.Se a classe já estiver presente, ela será removida.
  document.body.classList.toggle ('dark-mode');
};

ScrollReveal({ 
  reset: true,
  distance: '80px',
  duration: 1500,
  delay: 100
});

// headings - cada um dispara ao atingir 60% de visibilidade
ScrollReveal().reveal('.heading', { 
  origin: 'top',
  viewFactor: 0.8 // dispara quando 60% do heading estiver visível
});

// outros elementos
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


// Inicializa o EmailJS com chave pública
(function () {
   emailjs.init("SLBG4DxbUFpryfPm2");
})();

// Escuta o evento de envio do formulário
document.getElementById("formContato").addEventListener("submit", function (e) {
  e.preventDefault(); // Impede o comportamento padrão de recarregar a página
  const form = this;   //  valor fixo
  emailjs.sendForm("gmail008", "template_5esxfbm", form) // envia o formulário para o serviço EmailJS.
  .then(() => {   //  quando o email foi enviado com sucesso
    exibirMensagem("Sua mensagem foi enviada com sucesso! Em breve entrarei em contato. Obrigada!");
    form.reset(); // limpa o formulário
  }, (error) => {
    exibirMensagem("Ops! Algo deu errado ao enviar sua mensagem. Por favor, tente novamente mais tarde.");
    console.error("Erro:", error); //  Imprime o erro no console para ajudar no debug.
  });
});

// Feedback form 
function exibirMensagem(texto, tipo = "sucesso") {
  const msg = document.getElementById("mensagemFeedback");  // buscando o elemento html mensagemFeedback, onde será mostrado a mensagem e guardando no const msg
  msg.textContent = texto;
  msg.className = "mensagem-feedback mostrar";

  if (tipo === "erro") {
    msg.classList.add("erro");
  }

  msg.classList.remove("escondido");

  // Esconde após 4 segundos
  setTimeout(() => {
    msg.classList.remove("mostrar");
    setTimeout(() => {
      msg.classList.add("escondido");
    }, 500);
  }, 5000);
}

// bloqueia letras no input telefone
 const telefoneInput = document.querySelector('input[name="telefone"]');
  telefoneInput.addEventListener('input', () => {
    telefoneInput.value = telefoneInput.value.replace(/[^0-9+\-\s()]/g, '');
  });