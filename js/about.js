/* About page interactions. Edit the SKILLS object below to change the skills section. */
(function () {
  var SKILLS = {
    offsec: {
      label: '🗡️ Offensive security',
      items: [
        { n: 'Web exploitation', e: '🌐', d: 'Finding and chaining bugs in web apps, from file uploads to injection and auth flaws.', seen: ['Hack The Box', 'Securinets ENIT WebCTF'] },
        { n: 'Active Directory', e: '🏰', d: 'Building AD labs and attacking them the way a real adversary would.', seen: ['AEV internship', 'HTB machines'] },
        { n: 'Recon & OSINT', e: '🛰️', d: 'Mapping an attack surface: subdomains, live hosts, DNS and threat-intel enrichment.', seen: ['LLM OSINT Recon Agent'] },
        { n: 'CTF', e: '🚩', d: 'Playing regularly and designing challenges for other players.', seen: ['Securinets ENIT', 'HTB-style AI challenge'] },
        { n: 'CVE analysis', e: '🔍', d: 'Reproducing a known vulnerability end to end and writing up what actually happens.', seen: ['CVE-2023-43208 write-up'] }
      ]
    },
    ai: {
      label: '🤖 AI red teaming',
      items: [
        { n: 'Adversarial ML', e: '⚔️', d: 'Attacking and evaluating models: evasion, poisoning and how systems fail under pressure.', seen: ['Blog research', 'AI Infosec Applications'] },
        { n: 'Prompt injection', e: '💉', d: 'Getting LLMs to break their own rules, and designing targets that teach the technique.', seen: ['Detective 2089', 'HTB Prometheon write-up'] },
        { n: 'Membership inference', e: '🧬', d: 'Testing whether a model leaks its training data, and turning that into a CTF challenge.', seen: ['AI CTF challenge'] },
        { n: 'Privacy-preserving ML', e: '🛡️', d: 'Comparing DP-SGD and PATE runs to see what privacy costs in accuracy.', seen: ['Blog series'] },
        { n: 'LLM agents', e: '🕹️', d: 'Wiring LLMs to real security tools so they can plan, act and report.', seen: ['AEV internship', 'OSINT Recon Agent'] }
      ]
    },
    build: {
      label: '🛠️ Build',
      items: [
        { n: 'Python', e: '🐍', d: 'My main language for security tooling, ML experiments and agents.', seen: ['OSINT Recon Agent', 'AI Infosec Applications'] },
        { n: 'LangChain', e: '🔗', d: 'Agent loops with tool calling and structured JSON output.', seen: ['OSINT Recon Agent'] },
        { n: 'Flutter', e: '📱', d: 'Cross-platform mobile apps with Riverpod state and Firebase backends.', seen: ['Detective 2089'] },
        { n: 'Flask & PHP', e: '🧩', d: 'Small, deliberately vulnerable web apps for teaching and CTFs.', seen: ['Securinets ENIT WebCTF'] }
      ]
    },
    tools: {
      label: '🧰 Tools',
      items: [
        { n: 'Kali Linux', e: '🐉', d: 'My day-to-day offensive environment.', seen: ['Recon agent', 'HTB'] },
        { n: 'Hack The Box', e: '📦', d: 'Machines, Academy modules and certifications.', seen: ['CAPT', 'CWSE'] },
        { n: 'Git & GitHub', e: '🐙', d: 'Version control and open-source contributions.', seen: ['HuggingFace course PR'] },
        { n: 'Hexo & Obsidian', e: '✍️', d: 'Writing in Obsidian and publishing with Hexo and the Meow theme.', seen: ['This blog'] },
        { n: 'LaTeX', e: '📄', d: 'Résumé, reports and study books.', seen: ['Résumé', 'Internship report'] }
      ]
    }
  };

  /* ---------- skills ---------- */
  var tabsEl = document.getElementById('abt-skill-tabs');
  var gridEl = document.getElementById('abt-skill-grid');
  var detEl = document.getElementById('abt-skill-detail');
  if (tabsEl && gridEl && detEl) {
    var keys = Object.keys(SKILLS);
    var current = keys[0];

    function showSkill(item, btn) {
      Array.prototype.forEach.call(gridEl.children, function (b) { b.classList.remove('is-on'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-on'); btn.setAttribute('aria-pressed', 'true');
      detEl.innerHTML = '';
      var h = document.createElement('h3'); h.textContent = item.e + ' ' + item.n;
      var p = document.createElement('p'); p.textContent = item.d;
      var seen = document.createElement('div'); seen.className = 'abt-seen';
      item.seen.forEach(function (s) { var t = document.createElement('span'); t.textContent = s; seen.appendChild(t); });
      detEl.appendChild(h); detEl.appendChild(p); detEl.appendChild(seen);
      detEl.classList.remove('abt-pop'); void detEl.offsetWidth; detEl.classList.add('abt-pop');
    }

    function renderGrid(key) {
      current = key;
      Array.prototype.forEach.call(tabsEl.children, function (t) {
        var on = t.getAttribute('data-k') === key;
        t.classList.toggle('is-on', on); t.setAttribute('aria-selected', on);
      });
      gridEl.innerHTML = '';
      SKILLS[key].items.forEach(function (item, i) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'abt-skill'; b.textContent = item.e + ' ' + item.n;
        b.addEventListener('click', function () { showSkill(item, b); });
        gridEl.appendChild(b);
        if (i === 0) showSkill(item, b);
      });
    }

    keys.forEach(function (k) {
      var t = document.createElement('button');
      t.type = 'button'; t.className = 'abt-tab'; t.setAttribute('role', 'tab');
      t.setAttribute('data-k', k); t.textContent = SKILLS[k].label;
      t.addEventListener('click', function () { renderGrid(k); });
      tabsEl.appendChild(t);
    });
    renderGrid(current);
  }

  /* ---------- project filter ---------- */
  var pTabs = document.getElementById('abt-proj-tabs');
  if (pTabs) {
    var cards = document.querySelectorAll('.abt-proj');
    pTabs.addEventListener('click', function (e) {
      var btn = e.target.closest('.abt-tab');
      if (!btn) return;
      var f = btn.getAttribute('data-f');
      Array.prototype.forEach.call(pTabs.children, function (t) { t.classList.toggle('is-on', t === btn); });
      Array.prototype.forEach.call(cards, function (c) {
        var match = f === 'all' || c.getAttribute('data-cat').split(' ').indexOf(f) !== -1;
        c.hidden = !match;
      });
    });
  }

  /* ---------- project image fallback: keep the emoji if the image is missing ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.abt-thumb img'), function (img) {
    function fail() { img.parentNode.classList.add('noimg'); }
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });
})();
