# Atividade 1: Expansão da Galeria de Templates

## Objetivo
Adicionar 5 novos templates de animação à galeria existente.

## O que você precisa fazer:

### 1. Abrir o arquivo `script.js`
Localize o array `templates` (linha aproximadamente 3-20) que contém todos os templates atuais.

### 2. Adicionar os 5 novos templates:

```javascript
// Adicione estes templates ao final do array templates:

{ name: 'Zoom In', config: { scale: [0.1, 1], duration: 800, easing: 'easeOutBack' }, label: 'Zoom In' },

{ name: 'Slide Diagonal', config: { translateX: [-100, 0], translateY: [-100, 0], duration: 1000, easing: 'easeOutQuart' }, label: 'Slide Diagonal' },

{ name: 'Glow Effect', config: { backgroundColor: ['#fbbf24', '#ef4444'], boxShadow: ['0 0 0px #ef4444', '0 0 20px #ef4444'], duration: 1200, direction: 'alternate', loop: 2, easing: 'easeInOutSine' }, label: 'Glow Effect' },

{ name: 'Typewriter', config: { width: ['0%', '100%'], duration: 2000, easing: 'linear' }, label: 'Typewriter' },

{ name: 'Heartbeat', config: { scale: [1, 1.3, 1, 1.3, 1], duration: 1000, easing: 'easeInOutSine' }, label: 'Heartbeat' }
```

### 3. Testar o resultado:
1. Abra o arquivo `index.html` no navegador
2. Verifique se os 5 novos templates aparecem na galeria
3. Clique em cada um para testar se funcionam corretamente
4. Verifique se o código gerado está correto

### 4. Dicas importantes:
- Certifique-se de adicionar uma vírgula após o último template existente
- Mantenha a formatação consistente
- Teste cada template individualmente

### 5. Resultado esperado:
- Galeria com 24 templates (19 originais + 5 novos)
- Todos os templates funcionando corretamente
- Código Anime.js sendo gerado corretamente para cada template

## Como testar:
1. Abra o terminal na pasta desta atividade
2. Execute: `python3 -m http.server 8000`
3. Abra o navegador em: `http://localhost:8000`
4. Teste cada novo template na galeria

Boa sorte!

