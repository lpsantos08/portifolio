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
  sections.forEach(sec =>
  {
    let top = window.scrollY;    // Verifica onde a página foi rolada.
    let offset = sec.offsetTop - 150;     // Pega a posição do topo de cada seção e subtrai 150 pixels (para "antecipar" a ativação do link um pouco antes de chegar ao topo).
    let height = sec.offsetHeight;     // Pega a altura da seção.
    let id = sec.getAttribute('id');    // Pega o id da seção para poder ligar ao link correto.

    // Verificando se a seção está visível
    if(top >= offset && top < offset + height) // Aqui ele verifica se a posição da página (top) está dentro da seção visível. Ou seja, se você está vendo aquela parte da página.
    {
      navLinks.forEach(links =>
      {
        links.classList.remove('active'); // remove a classe active de todos os links da barra de navegação.
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active'); // adiciona a classe active ao link que corresponde à seção visível.
      });
    };
  });

  // barra de navegação fixa
  let header = document.querySelector('.header'); //seleciona o elemento com a classe header

  //se o usuário rolou mais de 100px, adiciona a classe sticky
  //caso contrário, remove a classe sticky
  header.classList.toggle('sticky', window.scrollY > 10); 

  // Remove navbar quando selecionado algum link do menu mobile
  // menuIcon.classList.remove ('bx-x');
  // navbar.classList.remove('active');
};

// swiper | slide 
var swiper = new Swiper(".mySwiper", { // criando uma nova instância do Swiper e associando-a a um container HTML que tenha a classe .mySwiper.
  slidesPerView: 1,     // Define quantos slides são exibidos por vez.
  spaceBetween: 50,     // Define um espaçamento de 30 pixels entre os slides.
  loop: true,     // Faz com que o carrossel rode em loop infinito, ou seja, quando chegar ao último slide, ele volta automaticamente para o primeiro.
  grabCursor: true,

  autoplay: {
    delay: 3000,               // muda de slide a cada 3 segundos
    disableOnInteraction: false, // continua mesmo se o usuário interagir
  },
  pagination: {
    el: ".swiper-pagination",    //   Indica o elemento HTML onde a paginação será exibida.
    clickable: true,    //   Permite que o usuário clique nas bolinhas para navegar pelos slides.
  },
  navigation: { 
    nextEl: ".swiper-button-next",        // Define o botão para avançar para o próximo slide.
    prevEl: ".swiper-button-prev",    //   Define o botão para voltar para o slide anterior. 
  },
});

// Modo noturno
let darkModeIcon = document.querySelector('#darkmode-icon'); // Seleciona o elemento HTML que tem o id="darkmode-icon" e o armazena na variável darkModeIcon

darkModeIcon.onclick = () => { // Define uma função anônima que será executada quando o usuário clicar no darkModeIcon 
  darkModeIcon.classList.toggle('bx-sun');   // Se a classe bx-sun não estiver presente, ela será adicionada.Se a classe já estiver presente, ela será removida.
  document.body.classList.toggle ('dark-mode');
};

// scroll revelação
ScrollReveal({ 
  reset: true,
  distance: '80px',
  duration: 1500,
  delay: 100
});

 // biblioteca ScrollReveal.js, que serve para aplicar animações quando os elementos entram na tela ao rolar a página.
 ScrollReveal().reveal('.home-content, .heading', { origin: 'top' }); //  Quando o usuário rola a página e os elementos .home-content ou .heading entram na área visível da tela, eles aparecem deslizando de cima para sua posição original, criando um efeito suave de entrada.
 ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
 ScrollReveal().reveal('.home-content h1, .about-img img ', { origin: 'left' });
 ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });



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