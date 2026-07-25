// ambient bokeh 
const ambient = document.getElementById('ambient');
const bokehCount = window.innerWidth < 500 ? 8 : 14;
for (let i = 0; i < bokehCount; i++) 
{
  const b = document.createElement('div');
  b.className = 'bokeh';
  const size = 20 + Math.random() * 60;
  b.style.width = size + 'px';
  b.style.height = size + 'px';
  b.style.left = Math.random() * 100 + 'vw';
  b.style.top = 100 + Math.random() * 20 + 'vh';
  b.style.animationDuration = (14 + Math.random() * 16) + 's';
  b.style.animationDelay = (Math.random() * 12) + 's';
  ambient.appendChild(b);
}

// the "no" button that never gets caught 
const noBtn = document.getElementById('noBtn');
const btnRow = document.querySelector('.btn-row');
const captions = ["No", "Are you sure?", "Really?", "Take your time", "Try Again", "Hmm, no.", "Last Chance", "Nope", "You can't catch me", "Ohh, kumbe.", "It's Yes, always", "Sawa tuh", "I'm recording", "now i know", "Kumbe ume niweka hapo"];
let dodgeCount = 0;

function fleeButton() 
{
  dodgeCount++;
  noBtn.textContent = captions[Math.min(dodgeCount, captions.length - 1)];
  noBtn.classList.add('fleeing');

  const w = noBtn.offsetWidth || 100;
  const h = noBtn.offsetHeight || 44;
  const margin = 12;
  const maxX = window.innerWidth - w - margin;
  const maxY = window.innerHeight - h - margin;
  const x = margin + Math.random() * Math.max(1, maxX - margin);
  const y = margin + Math.random() * Math.max(1, maxY - margin);

  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
}

noBtn.addEventListener('mouseenter', fleeButton);
noBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); fleeButton(); });
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); fleeButton(); }, { passive: false });
noBtn.addEventListener('click', (e) => { e.preventDefault(); fleeButton(); });

// yes 
const yesBtn = document.getElementById('yesBtn');
const celebration = document.getElementById('celebration');
const heartsLayer = document.getElementById('heartsLayer');

function spawnHearts() 
{
  const symbols = ['❤', '💗', '🌙', '☀️', '✦'];
  for (let i = 0; i < 40; i++) {
    setTimeout(() => 
    {
      const h = document.createElement('span');
      h.className = 'float-heart';
      h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      h.style.left = Math.random() * 100 + 'vw';
      h.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
      h.style.animationDuration = (4 + Math.random() * 4) + 's';
      h.style.fontSize = (1 + Math.random() * 1.4) + 'rem';
      heartsLayer.appendChild(h);
      setTimeout(() => h.remove(), 9000);
    }, i * 120);
  }
}

// real time notification
const FORM_ENDPOINT = "https://formspree.io/f/mbdnpgvy";

function notify(message) {
  fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ message })
  }).catch(() => {}); // fail silently, don't break the page if offline
}

yesBtn.addEventListener('click', () => 
{
  notify("Elizabeth said YES 💗");
  btnRow.style.display = 'none';
  celebration.hidden = false;
  spawnHearts();
  const interval = setInterval(spawnHearts, 3000);

  // keep a gentle rain of hearts going without letting it run forever
  setTimeout(() => clearInterval(interval), 15000);
});