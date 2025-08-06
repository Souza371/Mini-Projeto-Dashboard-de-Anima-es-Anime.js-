// Animação simples no botão com Anime.js
anime({
  targets: '.botao-animado',
  scale: [1, 1.2],
  duration: 1000,
  easing: 'easeInOutSine',
  direction: 'alternate',
  loop: true
});
