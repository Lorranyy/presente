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
/// Data inicial (substitua pela data de início do relacionamento)
const dataInicio = new Date("2024-07-14T00:00:00"); // Exemplo: 15 de junho de 2022, meia-noite

function atualizarContador() {
  const agora = new Date();
  
  // Diferença total em milissegundos
  let diferencaMs = agora - dataInicio;

  // Cálculos de meses, dias, horas, minutos e segundos
  let meses = agora.getMonth() - dataInicio.getMonth() + (12 * (agora.getFullYear() - dataInicio.getFullYear()));
  let dias = agora.getDate() - dataInicio.getDate();
  let horas = agora.getHours() - dataInicio.getHours();
  let minutos = agora.getMinutes() - dataInicio.getMinutes();
  let segundos = agora.getSeconds() - dataInicio.getSeconds();

  // Ajuste se o dia atual for menor que o inicial
  if (dias < 0) {
    meses--;
    const ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
    dias += ultimoDiaMesAnterior;
  }

  // Ajustar horas, minutos e segundos se forem negativos
  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }
  if (minutos < 0) {
    minutos += 60;
    horas--;
  }
  if (horas < 0) {
    horas += 24;
    dias--;
  }

  // Atualizar o texto do contador
  const tempoElemento = document.getElementById("tempo");
  tempoElemento.textContent = 
    `${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}

// Atualiza o contador continuamente
setInterval(atualizarContador, 1000); // Atualiza a cada segundo

const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const muteButton = document.getElementById("mute");
const seekBar = document.getElementById("seek-bar");
const volumeBar = document.getElementById("volume-bar");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

// Formata tempo em minutos:segundos
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

// Play/Pause
playPauseButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseButton.textContent = "▶️";
  }
});

// Atualiza barra de progresso
audio.addEventListener("timeupdate", () => {
  seekBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Altera posição da música
seekBar.addEventListener("input", () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});

// Atualiza duração da música
audio.addEventListener("loadedmetadata", () => {
  durationDisplay.textContent = formatTime(audio.duration);
});

// Mudo/Desmudo
muteButton.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteButton.textContent = audio.muted ? "🔇" : "🔊";
});

// Ajusta volume
volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value / 100;
});