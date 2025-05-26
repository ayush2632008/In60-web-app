const sheetURL = 'https://opensheet.elk.sh/1k-9f5rX-GOM3NGJLFl6jVWQ5tohFdR6HeABNvOvuHhE/news';
const sarcasmToggle = document.getElementById('sarcasmToggle');
let sarcasmMode = false;
let xp = 0, level = 1, streak = 0;

function updateXP(amount) {
  xp += amount;
  if (xp >= level * 100) {
    xp = 0;
    level++;
    streak++;
  }
  document.getElementById('xp').textContent = xp;
  document.getElementById('level').textContent = level;
  document.getElementById('streak').textContent = streak;
}

sarcasmToggle.onclick = () => {
  sarcasmMode = !sarcasmMode;
  sarcasmToggle.textContent = 'Sarcasm: ' + (sarcasmMode ? 'On' : 'Off');
  loadNews();
};

async function loadNews() {
  const res = await fetch(sheetURL);
  const news = await res.json();
  const container = document.getElementById('newsContainer');
  container.innerHTML = '';
  news.forEach(item => {
    const isSensitive = /(crime|politics|religion)/i.test(item.category);
    const useSarcasm = sarcasmMode && !isSensitive;
    const div = document.createElement('div');
    div.className = 'newsItem';
    div.innerHTML = \`
      <h3>\${item.title}</h3>
      <p>\${useSarcasm ? item.sarcastic_summary : item.summary}</p>
      <div class="reactions">
        <button onclick="updateXP(10)">😂</button>
        <button onclick="updateXP(5)">👍</button>
        <button onclick="updateXP(2)">😡</button>
      </div>
    \`;
    container.appendChild(div);
  });
}

loadNews();
