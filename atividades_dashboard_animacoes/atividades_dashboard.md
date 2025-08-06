# Atividades Práticas - Dashboard de Animações com Anime.js

Baseado no projeto Mini Dashboard de Animações, aqui estão 3 atividades práticas para você desenvolver e aprimorar suas habilidades com JavaScript, jQuery e Anime.js.

## Atividade 1: Expansão da Galeria de Templates

### Objetivo
Adicionar 5 novos templates de animação à galeria existente, explorando diferentes tipos de efeitos visuais.

### Descrição
O projeto atual possui 19 templates de animação. Sua tarefa é criar 5 novos templates únicos que não existem na galeria atual.

### Requisitos
1. **Adicionar os seguintes templates:**
   - **Zoom In**: Elemento começa pequeno (scale: 0.1) e cresce até o tamanho normal (scale: 1)
   - **Slide Diagonal**: Movimento combinado em X e Y (translateX: [-100, 0], translateY: [-100, 0])
   - **Glow Effect**: Mudança de cor com sombra brilhante (backgroundColor + boxShadow)
   - **Typewriter**: Simulação de texto sendo digitado (width: [0, '100%'] com overflow hidden)
   - **Heartbeat**: Pulsação rápida simulando batimento cardíaco (scale: [1, 1.3, 1, 1.3, 1])

2. **Implementar no código:**
   - Adicionar os novos templates no array `templates` do arquivo `script.js`
   - Cada template deve ter: name, config, label e preview funcional
   - Configurar durações, easings e loops apropriados para cada animação

3. **Testar funcionalidade:**
   - Verificar se os novos templates aparecem na galeria
   - Confirmar que ao clicar, a animação é aplicada corretamente
   - Validar se o código gerado está correto

### Entregáveis
- Arquivo `script.js` modificado com os 5 novos templates
- Screenshot da galeria mostrando os novos templates
- Teste de cada animação funcionando

---

## Atividade 2: Sistema de Favoritos e Histórico

### Objetivo
Implementar um sistema que permita ao usuário salvar animações favoritas e visualizar um histórico das últimas animações executadas.

### Descrição
Criar funcionalidades para melhorar a experiência do usuário, permitindo que ele salve suas animações preferidas e acesse rapidamente animações recentes.

### Requisitos
1. **Sistema de Favoritos:**
   - Adicionar botão "⭐ Favoritar" na área de preview
   - Salvar animações favoritas no localStorage do navegador
   - Criar nova aba "Favoritos" no menu principal
   - Exibir lista de animações favoritas com preview e opção de remover

2. **Histórico de Animações:**
   - Registrar automaticamente cada animação executada
   - Criar nova aba "Histórico" no menu principal
   - Mostrar últimas 10 animações com timestamp
   - Permitir re-executar animações do histórico

3. **Interface:**
   - Modificar o HTML para incluir as novas abas
   - Atualizar o CSS para estilizar as novas seções
   - Implementar JavaScript para gerenciar localStorage

4. **Funcionalidades extras:**
   - Botão "Limpar Histórico"
   - Contador de quantas vezes cada animação foi executada
   - Exportar favoritos como arquivo JSON

### Entregáveis
- Arquivos HTML, CSS e JS modificados
- Sistema de favoritos funcionando
- Histórico de animações operacional
- Persistência de dados no localStorage

---

## Atividade 3: Editor Avançado com Múltiplos Elementos

### Objetivo
Expandir o dashboard para permitir animação simultânea de múltiplos elementos com configurações independentes e sequenciamento.

### Descrição
Transformar o editor simples em um editor avançado que suporte múltiplos elementos, timeline de animações e efeitos de sequenciamento (stagger).

### Requisitos
1. **Múltiplos Elementos:**
   - Adicionar botão "Adicionar Elemento" na área de preview
   - Permitir até 5 elementos simultâneos na tela
   - Cada elemento deve ter ID único e configuração independente
   - Seletor para escolher qual elemento está sendo editado

2. **Timeline de Animações:**
   - Interface para definir ordem de execução das animações
   - Configuração de delays relativos entre elementos
   - Botão "Animar Sequência" para executar timeline completa
   - Visualização gráfica da timeline (opcional)

3. **Efeitos de Stagger:**
   - Implementar animações em cascata
   - Configuração de intervalo entre elementos (stagger delay)
   - Templates específicos para efeitos stagger
   - Preview em tempo real do efeito stagger

4. **Controles Avançados:**
   - Play/Pause/Stop para controlar animações
   - Velocidade de reprodução (0.5x, 1x, 2x)
   - Loop infinito para toda a sequência
   - Reset individual ou geral

5. **Geração de Código:**
   - Código completo para múltiplos elementos
   - Função JavaScript pronta para usar
   - Opção de exportar como arquivo .js

### Entregáveis
- Sistema completo de múltiplos elementos
- Timeline funcional de animações
- Efeitos stagger implementados
- Controles de reprodução operacionais
- Gerador de código para múltiplos elementos

---

## Critérios de Avaliação

### Para todas as atividades:
- **Funcionalidade (40%)**: O código funciona conforme especificado
- **Qualidade do Código (25%)**: Código limpo, comentado e bem estruturado
- **Interface (20%)**: Design consistente e usabilidade
- **Criatividade (15%)**: Soluções inovadoras e melhorias extras

### Dicas para Desenvolvimento:
1. **Teste constantemente**: Execute o projeto no navegador após cada modificação
2. **Use o console**: Utilize console.log() para debugar problemas
3. **Valide o HTML**: Certifique-se de que a estrutura HTML está correta
4. **Organize o CSS**: Mantenha estilos organizados e reutilizáveis
5. **Comente o código**: Explique lógicas complexas com comentários

### Recursos Úteis:
- [Documentação Anime.js](https://animejs.com/documentation/)
- [jQuery API](https://api.jquery.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Easing Functions](https://easings.net/)

Boa sorte com suas atividades! Lembre-se de testar cada funcionalidade antes de considerar a atividade concluída.

