# Atividade 2: Sistema de Favoritos e Histórico

## Objetivo
Implementar sistema de favoritos e histórico de animações usando localStorage.

## O que você precisa fazer:

### 1. Modificar o HTML (`index.html`)

Adicione duas novas abas no menu de navegação:

```html
<!-- Substitua a seção nav por: -->
<nav>
  <button class="tab-btn active" data-tab="templates">Templates</button>
  <button class="tab-btn" data-tab="custom">Personalizar</button>
  <button class="tab-btn" data-tab="favorites">Favoritos</button>
  <button class="tab-btn" data-tab="history">Histórico</button>
</nav>
```

Adicione as novas seções de conteúdo após `tab-custom`:

```html
<!-- Adicione após div#tab-custom -->
<div class="tab-content" id="tab-favorites">
  <h2>Animações Favoritas</h2>
  <div class="favorites-list">
    <!-- Favoritos serão inseridos via JS -->
  </div>
  <button id="clearFavorites" class="clear-btn">Limpar Favoritos</button>
</div>

<div class="tab-content" id="tab-history">
  <h2>Histórico de Animações</h2>
  <div class="history-list">
    <!-- Histórico será inserido via JS -->
  </div>
  <button id="clearHistory" class="clear-btn">Limpar Histórico</button>
</div>
```

Adicione botão de favoritar na área de preview:

```html
<!-- Adicione após o div.preview-area -->
<div class="favorite-controls">
  <button id="btnFavorite" class="favorite-btn">⭐ Favoritar</button>
</div>
```

### 2. Atualizar o CSS (`style.css`)

Adicione os estilos para as novas funcionalidades:

```css
/* Adicione ao final do arquivo */
.favorites-list, .history-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.favorite-item, .history-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  position: relative;
}

.favorite-item h4, .history-item h4 {
  margin: 0 0 8px 0;
  color: #1e293b;
  font-size: 1rem;
}

.favorite-item p, .history-item p {
  margin: 4px 0;
  font-size: 0.9rem;
  color: #64748b;
}

.favorite-controls {
  text-align: center;
  margin: 16px 0;
}

.favorite-btn, .clear-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.favorite-btn:hover, .clear-btn:hover {
  background: #059669;
}

.clear-btn {
  background: #ef4444;
  margin-top: 16px;
}

.clear-btn:hover {
  background: #dc2626;
}

.remove-btn, .replay-btn {
  background: #6b7280;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  margin: 2px;
}

.remove-btn:hover {
  background: #ef4444;
}

.replay-btn:hover {
  background: #3b82f6;
}
```

### 3. Implementar JavaScript (`script.js`)

Adicione as seguintes funcionalidades ao final do arquivo:

```javascript
// Sistema de Favoritos e Histórico
let favorites = JSON.parse(localStorage.getItem('animationFavorites')) || [];
let history = JSON.parse(localStorage.getItem('animationHistory')) || [];

function saveFavorite() {
  const config = getAnimConfig();
  const favorite = {
    id: Date.now(),
    name: `Animação ${favorites.length + 1}`,
    config: config,
    timestamp: new Date().toLocaleString()
  };
  favorites.push(favorite);
  localStorage.setItem('animationFavorites', JSON.stringify(favorites));
  renderFavorites();
  alert('Animação adicionada aos favoritos!');
}

function saveToHistory(config) {
  const historyItem = {
    id: Date.now(),
    config: config,
    timestamp: new Date().toLocaleString()
  };
  history.unshift(historyItem); // Adiciona no início
  if (history.length > 10) history.pop(); // Mantém apenas 10 itens
  localStorage.setItem('animationHistory', JSON.stringify(history));
  renderHistory();
}

function renderFavorites() {
  const $list = $('.favorites-list');
  $list.empty();
  favorites.forEach(fav => {
    const $item = $(`
      <div class="favorite-item">
        <h4>${fav.name}</h4>
        <p>Criado: ${fav.timestamp}</p>
        <button class="replay-btn" onclick="replayFavorite(${fav.id})">▶ Reproduzir</button>
        <button class="remove-btn" onclick="removeFavorite(${fav.id})">🗑 Remover</button>
      </div>
    `);
    $list.append($item);
  });
}

function renderHistory() {
  const $list = $('.history-list');
  $list.empty();
  history.forEach(item => {
    const $item = $(`
      <div class="history-item">
        <h4>Animação</h4>
        <p>Executada: ${item.timestamp}</p>
        <button class="replay-btn" onclick="replayHistory(${item.id})">▶ Reproduzir</button>
      </div>
    `);
    $list.append($item);
  });
}

function replayFavorite(id) {
  const fav = favorites.find(f => f.id === id);
  if (fav) {
    $('.tab-btn[data-tab="custom"]').click();
    applyTemplateToForm(fav.config);
    animatePreview(fav.config);
    renderCode(fav.config);
  }
}

function replayHistory(id) {
  const item = history.find(h => h.id === id);
  if (item) {
    $('.tab-btn[data-tab="custom"]').click();
    applyTemplateToForm(item.config);
    animatePreview(item.config);
    renderCode(item.config);
  }
}

function removeFavorite(id) {
  favorites = favorites.filter(f => f.id !== id);
  localStorage.setItem('animationFavorites', JSON.stringify(favorites));
  renderFavorites();
}

// Event Listeners
$('#btnFavorite').on('click', saveFavorite);

$('#clearFavorites').on('click', function() {
  if (confirm('Tem certeza que deseja limpar todos os favoritos?')) {
    favorites = [];
    localStorage.removeItem('animationFavorites');
    renderFavorites();
  }
});

$('#clearHistory').on('click', function() {
  if (confirm('Tem certeza que deseja limpar o histórico?')) {
    history = [];
    localStorage.removeItem('animationHistory');
    renderHistory();
  }
});

// Modificar função btnAnimate para salvar no histórico
$('#btnAnimate').off('click').on('click', function() {
  const config = getAnimConfig();
  animatePreview(config);
  renderCode(config);
  saveToHistory(config); // Adiciona esta linha
});

// Inicializar favoritos e histórico
renderFavorites();
renderHistory();
```

### 4. Testar o resultado:
1. Abra `index.html` no navegador
2. Teste criar uma animação personalizada
3. Clique em "⭐ Favoritar" para salvar
4. Verifique se aparece na aba "Favoritos"
5. Execute algumas animações e verifique o "Histórico"
6. Teste os botões de reproduzir e remover

## Como testar:
1. Execute: `python3 -m http.server 8000`
2. Abra: `http://localhost:8000`
3. Teste todas as funcionalidades

Boa sorte!

