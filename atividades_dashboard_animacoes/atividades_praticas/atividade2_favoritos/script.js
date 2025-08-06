
$(function() {
  // Templates de animação
  const templates = [
    { name: 'Fade In', config: { opacity: [0, 1], duration: 900, easing: 'easeInOutQuad' }, label: 'Fade In' },
    { name: 'Fade Out', config: { opacity: [1, 0], duration: 900, easing: 'easeInOutQuad' }, label: 'Fade Out' },
    { name: 'Slide Right', config: { translateX: [0, 120], duration: 900, easing: 'easeOutBack' }, label: 'Slide Right' },
    { name: 'Slide Left', config: { translateX: [0, -120], duration: 900, easing: 'easeOutBack' }, label: 'Slide Left' },
    { name: 'Slide Up', config: { translateY: [0, -120], duration: 900, easing: 'easeOutBack' }, label: 'Slide Up' },
    { name: 'Slide Down', config: { translateY: [0, 120], duration: 900, easing: 'easeOutBack' }, label: 'Slide Down' },
    { name: 'Scale Up', config: { scale: [0.5, 1.2], duration: 1000, easing: 'easeOutElastic' }, label: 'Scale Up' },
    { name: 'Scale Down', config: { scale: [1.2, 0.5], duration: 1000, easing: 'easeInBack' }, label: 'Scale Down' },
    { name: 'Rotate', config: { rotate: [0, 360], duration: 1200, easing: 'easeInOutSine' }, label: 'Rotate' },
    { name: 'Flip X', config: { rotateY: [0, 180], duration: 1000, easing: 'easeInOutSine' }, label: 'Flip X' },
    { name: 'Flip Y', config: { rotateX: [0, 180], duration: 1000, easing: 'easeInOutSine' }, label: 'Flip Y' },
    { name: 'Color Pulse', config: { backgroundColor: ['#fbbf24', '#6366f1'], duration: 900, direction: 'alternate', loop: 2, easing: 'linear' }, label: 'Color Pulse' },
    { name: 'Bounce', config: { translateY: [0, -60, 0], duration: 900, easing: 'easeOutElastic' }, label: 'Bounce' },
    { name: 'Pulse', config: { scale: [1, 1.2, 1], duration: 800, easing: 'easeInOutSine', loop: 2 }, label: 'Pulse' },
    { name: 'Swing', config: { rotate: [-15, 15, -10, 10, 0], duration: 900, easing: 'easeInOutSine' }, label: 'Swing' },
    { name: 'RubberBand', config: { scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1], scaleY: [1, 0.75, 1.25, 0.85, 1.05, 1], duration: 1200, easing: 'easeInOutSine' }, label: 'RubberBand' },
    { name: 'Wobble', config: { translateX: [0, -20, 15, -10, 5, 0], duration: 1000, easing: 'easeInOutSine' }, label: 'Wobble' },
    { name: 'Shake', config: { translateX: [0, -10, 10, -10, 10, 0], duration: 700, easing: 'easeInOutSine' }, label: 'Shake' },
    { name: 'Stagger', config: { translateY: [0, -40, 0], delay: anime.stagger(100), duration: 900, easing: 'easeOutBack' }, label: 'Stagger', isStagger: true }
  ];

  // Abas
  $('.tab-btn').on('click', function() {
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');
    const tab = $(this).data('tab');
    $('.tab-content').removeClass('active');
    $('#tab-' + tab).addClass('active');
  });

  // Galeria de templates
  function renderTemplates() {
    const $gallery = $('.template-gallery');
    $gallery.empty();
    templates.forEach((tpl, i) => {
      const $card = $('<div class="template-card"></div>');
      $card.append(`<div class="template-preview" id="tpl-prev-${i}">A</div>`);
      $card.append(`<div class="template-label">${tpl.label}</div>`);
      $card.on('click', function() {
        $('.tab-btn[data-tab="custom"]').click();
        applyTemplateToForm(tpl.config);
        animatePreview(tpl.config);
        renderCode(tpl.config);
      });
      $gallery.append($card);
      // Preview animado
      setTimeout(() => animateTemplatePreview(`#tpl-prev-${i}`, tpl.config), 100);
    });
  }

  function animateTemplatePreview(selector, config) {
    $(selector).removeAttr('style');
    anime({
      targets: selector,
      ...config,
      loop: false,
      direction: config.direction || 'normal',
      complete: function() {
        setTimeout(() => $(selector).removeAttr('style'), 400);
      }
    });
  }

  function applyTemplateToForm(config) {
    if(config.translateX) {
      $('#animType').val('translateX');
      $('#startValue').val(config.translateX[0]);
      $('#endValue').val(config.translateX[1]);
    } else if(config.translateY) {
      $('#animType').val('translateY');
      $('#startValue').val(config.translateY[0]);
      $('#endValue').val(config.translateY[1]);
    } else if(config.scale) {
      $('#animType').val('scale');
      $('#startValue').val(config.scale[0]);
      $('#endValue').val(config.scale[1]);
    } else if(config.rotate) {
      $('#animType').val('rotate');
      $('#startValue').val(config.rotate[0]);
      $('#endValue').val(config.rotate[1]);
    } else if(config.opacity) {
      $('#animType').val('opacity');
      $('#startValue').val(config.opacity[0]);
      $('#endValue').val(config.opacity[1]);
    } else if(config.backgroundColor) {
      $('#animType').val('backgroundColor');
      $('#startValue').val(config.backgroundColor[0]);
      $('#endValue').val(config.backgroundColor[1]);
    }
    $('#duration').val(config.duration || 1000);
    $('#delay').val(config.delay || 0);
    $('#easing').val(config.easing || 'easeInOutQuad');
    $('#loop').prop('checked', !!config.loop);
    $('#alternate').prop('checked', config.direction === 'alternate');
  }

  function getAnimConfig() {
    const type = $('#animType').val();
    const start = $('#startValue').val();
    const end = $('#endValue').val();
    const duration = parseInt($('#duration').val(), 10) || 1000;
    const delay = parseInt($('#delay').val(), 10) || 0;
    const easing = $('#easing').val();
    const loop = $('#loop').is(':checked') ? true : false;
    const alternate = $('#alternate').is(':checked');
    let prop = {};
    if(type === 'backgroundColor') {
      prop.backgroundColor = [start, end];
    } else {
      prop[type] = [isNaN(Number(start)) ? start : Number(start), isNaN(Number(end)) ? end : Number(end)];
    }
    return {
      targets: '#previewBox',
      ...prop,
      duration,
      delay,
      easing,
      loop,
      direction: alternate ? 'alternate' : 'normal'
    };
  }

  function renderCode(config) {
    let code = `anime({\n`;
    code += `  targets: '#previewBox',\n`;
    Object.entries(config).forEach(([k, v]) => {
      if(k === 'targets') return;
      if(Array.isArray(v)) {
        code += `  ${k}: [${typeof v[0]==='string'?`'${v[0]}'`:v[0]}, ${typeof v[1]==='string'?`'${v[1]}'`:v[1]}],\n`;
      } else if(typeof v === 'string') {
        code += `  ${k}: '${v}',\n`;
      } else {
        code += `  ${k}: ${v},\n`;
      }
    });
    code += `});`;
    $('#codeOutput').text(code);
  }

  function resetBox() {
    $('#previewBox').removeAttr('style').css({
      width: '160px', height: '160px', background: '#fbbf24', color: '#222', opacity: 1, transform: 'none'
    });
  }

  function animatePreview(config) {
    resetBox();
    anime({
      targets: '#previewBox',
      ...config
    });
  }

  $('#btnAnimate').on('click', function() {
    const config = getAnimConfig();
    animatePreview(config);
    renderCode(config);
  });

  $('#btnReset').on('click', function() {
    resetBox();
    $('#codeOutput').text('');
  });

  // Inicializa preview e templates
  resetBox();
  renderTemplates();
});
