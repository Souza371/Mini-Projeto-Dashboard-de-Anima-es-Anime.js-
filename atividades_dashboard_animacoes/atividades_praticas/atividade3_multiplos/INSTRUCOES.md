# Atividade 3: Editor Avançado com Múltiplos Elementos

## Objetivo
Criar sistema para animar múltiplos elementos simultaneamente com timeline e controles avançados.

## O que você precisa fazer:

### 1. Modificar o HTML (`index.html`)

Substitua a seção de preview por uma versão expandida:

```html
<!-- Substitua div.preview-area por: -->
<div class="preview-area">
  <div class="preview-container">
    <div id="previewBox1" class="preview-box active-element">Elemento 1</div>
    <div id="previewBox2" class="preview-box">Elemento 2</div>
    <div id="previewBox3" class="preview-box">Elemento 3</div>
  </div>
  <div class="element-controls">
    <button id="addElement" class="control-btn">+ Adicionar Elemento</button>
    <select id="elementSelector">
      <option value="previewBox1">Elemento 1</option>
      <option value="previewBox2">Elemento 2</option>
      <option value="previewBox3">Elemento 3</option>
    </select>
  </div>
</div>

<!-- Adicione controles de timeline após form -->
<div class="timeline-controls">
  <h3>Timeline de Animações</h3>
  <div class="timeline-list" id="timelineList">
    <!-- Timeline será inserida via JS -->
  </div>
  <div class="playback-controls">
    <button id="playTimeline" class="control-btn">▶ Reproduzir Timeline</button>
    <button id="pauseTimeline" class="control-btn">⏸ Pausar</button>
    <button id="stopTimeline" class="control-btn">⏹ Parar</button>
    <button id="resetAll" class="control-btn">🔄 Reset Tudo</button>
  </div>
  <div class="stagger-controls">
    <label>Stagger Delay (ms):</label>
    <input type="number" id="staggerDelay" value="200">
    <button id="applyStagger" class="control-btn">Aplicar Stagger</button>
  </div>
</div>
```

### 2. Atualizar o CSS (`style.css`)

Adicione estilos para múltiplos elementos:

```css
/* Adicione ao final do arquivo */
.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 20px 0;
  min-height: 200px;
  padding: 20px;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
}

.preview-box {
  width: 80px;
  height: 80px;
  background: #94a3b8;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.preview-box.active-element {
  background: #fbbf24;
  color: #222;
  box-shadow: 0 0 0 3px #fbbf24aa;
}

.preview-box:hover {
  transform: scale(1.05);
}

.element-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
}

.timeline-controls {
  margin-top: 32px;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
}

.timeline-controls h3 {
  margin: 0 0 16px 0;
  color: #1e293b;
}

.timeline-list {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  min-height: 100px;
}

.timeline-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  margin: 4px 0;
  background: #f1f5f9;
  border-radius: 6px;
  border-left: 4px solid #6366f1;
}

.timeline-item-info {
  flex: 1;
}

.timeline-item-controls {
  display: flex;
  gap: 8px;
}

.playback-controls {
  display: flex;
  gap: 12px;
  margin: 16px 0;
  justify-content: center;
}

.stagger-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.control-btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.control-btn:hover {
  background: #4f46e5;
}

.control-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

#elementSelector {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
}

#staggerDelay {
  width: 80px;
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}
```

### 3. Implementar JavaScript (`script.js`)

Adicione as funcionalidades avançadas:

```javascript
// Sistema de Múltiplos Elementos
let currentElement = 'previewBox1';
let timeline = [];
let isPlaying = false;
let currentAnimation = null;

// Seleção de elementos
$('#elementSelector').on('change', function() {
  currentElement = $(this).val();
  $('.preview-box').removeClass('active-element');
  $(`#${currentElement}`).addClass('active-element');
});

// Clique nos elementos para seleção
$(document).on('click', '.preview-box', function() {
  currentElement = $(this).attr('id');
  $('#elementSelector').val(currentElement);
  $('.preview-box').removeClass('active-element');
  $(this).addClass('active-element');
});

// Adicionar novo elemento
$('#addElement').on('click', function() {
  const elementCount = $('.preview-box').length;
  if (elementCount >= 5) {
    alert('Máximo de 5 elementos permitidos');
    return;
  }
  
  const newId = `previewBox${elementCount + 1}`;
  const $newElement = $(`<div id="${newId}" class="preview-box">Elemento ${elementCount + 1}</div>`);
  $('.preview-container').append($newElement);
  
  // Adicionar ao seletor
  $('#elementSelector').append(`<option value="${newId}">Elemento ${elementCount + 1}</option>`);
});

// Modificar função getAnimConfig para elemento específico
function getAnimConfigForElement() {
  const config = getAnimConfig();
  config.targets = `#${currentElement}`;
  return config;
}

// Adicionar animação à timeline
function addToTimeline() {
  const config = getAnimConfigForElement();
  const timelineItem = {
    id: Date.now(),
    element: currentElement,
    config: config,
    delay: timeline.length * 500 // Delay automático
  };
  
  timeline.push(timelineItem);
  renderTimeline();
}

// Renderizar timeline
function renderTimeline() {
  const $list = $('#timelineList');
  $list.empty();
  
  if (timeline.length === 0) {
    $list.append('<p style="text-align: center; color: #64748b;">Nenhuma animação na timeline</p>');
    return;
  }
  
  timeline.forEach((item, index) => {
    const $item = $(`
      <div class="timeline-item">
        <div class="timeline-item-info">
          <strong>${item.element}</strong> - ${Object.keys(item.config)[1]} 
          <small>(${item.config.duration}ms)</small>
        </div>
        <div class="timeline-item-controls">
          <button onclick="moveTimelineItem(${index}, -1)" class="control-btn" style="padding: 4px 8px;">↑</button>
          <button onclick="moveTimelineItem(${index}, 1)" class="control-btn" style="padding: 4px 8px;">↓</button>
          <button onclick="removeTimelineItem(${index})" class="control-btn" style="padding: 4px 8px; background: #ef4444;">×</button>
        </div>
      </div>
    `);
    $list.append($item);
  });
}

// Mover item na timeline
function moveTimelineItem(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= timeline.length) return;
  
  [timeline[index], timeline[newIndex]] = [timeline[newIndex], timeline[index]];
  renderTimeline();
}

// Remover item da timeline
function removeTimelineItem(index) {
  timeline.splice(index, 1);
  renderTimeline();
}

// Reproduzir timeline
$('#playTimeline').on('click', function() {
  if (timeline.length === 0) {
    alert('Adicione animações à timeline primeiro');
    return;
  }
  
  isPlaying = true;
  $('#playTimeline').prop('disabled', true);
  
  timeline.forEach((item, index) => {
    setTimeout(() => {
      anime({
        targets: item.config.targets,
        ...item.config,
        complete: function() {
          if (index === timeline.length - 1) {
            isPlaying = false;
            $('#playTimeline').prop('disabled', false);
          }
        }
      });
    }, index * 300);
  });
});

// Aplicar efeito stagger
$('#applyStagger').on('click', function() {
  const delay = parseInt($('#staggerDelay').val()) || 200;
  const config = getAnimConfigForElement();
  
  anime({
    targets: '.preview-box',
    ...config,
    delay: anime.stagger(delay)
  });
});

// Reset todos os elementos
$('#resetAll').on('click', function() {
  $('.preview-box').removeAttr('style').css({
    width: '80px',
    height: '80px',
    background: '#94a3b8',
    color: 'white',
    opacity: 1,
    transform: 'none'
  });
  $('#previewBox1').css('background', '#fbbf24').css('color', '#222');
});

// Modificar botão animar para adicionar à timeline
$('#btnAnimate').off('click').on('click', function() {
  const config = getAnimConfigForElement();
  
  // Animar elemento atual
  anime({
    targets: config.targets,
    ...config
  });
  
  // Adicionar à timeline
  addToTimeline();
  
  // Gerar código
  renderCode(config);
});

// Inicializar
resetAll();
renderTimeline();
```

### 4. Funcionalidades extras para implementar:

1. **Exportar Timeline**: Botão para gerar código completo da timeline
2. **Salvar/Carregar Projetos**: Sistema para salvar projetos complexos
3. **Preview da Timeline**: Visualização gráfica da sequência
4. **Controles de Velocidade**: Botões para 0.5x, 1x, 2x

### 5. Testar o resultado:
1. Abra `index.html` no navegador
2. Teste adicionar múltiplos elementos
3. Configure animações diferentes para cada elemento
4. Teste a timeline e controles de reprodução
5. Experimente o efeito stagger

## Como testar:
1. Execute: `python3 -m http.server 8000`
2. Abra: `http://localhost:8000`
3. Teste todas as funcionalidades avançadas

Esta é a atividade mais complexa - tome seu tempo para implementar cada parte!

Boa sorte!

