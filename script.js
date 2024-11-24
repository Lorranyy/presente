const swiper = new Swiper(".swiper", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  keyboard: true,
});

// Contador Progressivo
const dataInicial = new Date('2024-07-14'); // Substitua pela data do relacionamento
const tempoSpan = document.getElementById('tempo');

function atualizarTempo() {
  const agora = new Date();
  const diferenca = agora - dataInicial;

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
  const segundos = Math.floor((diferenca / 1000) % 60);

  tempoSpan.innerText = `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos 💖`;
}

setInterval(atualizarTempo, 1000);
atualizarTempo();

