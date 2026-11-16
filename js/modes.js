/* Cảng Thập Nhất — bốn cơ chế chơi: quiz (tình huống), sort (phân loại), route (dựng tuyến), price (tính giá).
   Mỗi cơ chế nhận (level, root, done) và gọi done({score, max, mistakes}) khi xong. */
window.IG = window.IG || {};
(function () {
  'use strict';
  var A = IG.art, esc = IG.esc, $ = IG.$, $$ = IG.$$;
  var M = IG.modes = { onKey: null, _timers: [], _raf: 0 };

  M.stop = function () {
    M._timers.forEach(clearTimeout); M._timers = [];
    if (M._raf) cancelAnimationFrame(M._raf);
    M._raf = 0; M.onKey = null;
  };
  function later(fn, ms) { var t = setTimeout(fn, ms); M._timers.push(t); return t; }
  /* trên màn hình hẹp, khung hành trình cuộn ngang: đưa vị trí x (thang 0..1000) vào giữa */
  function centerOn(journey, x) {
    if (!journey || journey.scrollWidth <= journey.clientWidth) return;
    journey.scrollLeft = journey.scrollWidth * x / 1000 - journey.clientWidth / 2;
  }

  var EXCEPTION = {
    'c-fca-late': 'Ngoại lệ: người chuyên chở của người mua không tới, nên rủi ro chuyển sớm hơn vạch thông thường.',
    'c-fob-late': 'Ngoại lệ: tàu của người mua tới trễ, nên rủi ro chuyển sớm hơn vạch thông thường.',
    'c-dap-customs': 'Ngoại lệ: người mua không thông quan nhập khẩu được, nên phần hậu quả đó thuộc người mua dù hàng chưa tới nơi đến.'
  };

  function pips(n, i, results) {
    var s = '<div class="pips" aria-label="Câu ' + (i + 1) + ' trên ' + n + '">';
    for (var k = 0; k < n; k++) s += '<i class="' + (k < i ? (results[k] ? 'ok' : 'bad') : k === i ? 'cur' : '') + '"></i>';
    return s + '</div>';
  }

  /* =====================================================================
     QUIZ: tf, party, choice, rules, clause
     ===================================================================== */
  function drawExam(n) {
    var by = { party: [], rules: [], choice: [], clause: [], tf: [] };
    Object.keys(IG.ITEMS).forEach(function (id) { by[IG.ITEMS[id].kind].push(id); });
    var plan = { party: 6, rules: 5, choice: 4, clause: 3, tf: 2 };
    var out = [];
    Object.keys(plan).forEach(function (k) { out = out.concat(IG.pick(by[k], plan[k])); });
    return IG.shuffle(out).slice(0, n);
  }

  M.quiz = function (level, root, done, opts) {
    opts = opts || {};
    var ids = opts.items || (level.exam ? drawExam(level.exam) : level.items.slice());
    var replay = (IG.state.levels[level.id] || {}).plays > 0;
    if (level.timed || replay || opts.review) ids = IG.shuffle(ids);
    var items = ids.map(function (id) { return IG.ITEMS[id]; });
    var hand = level.hand || IG.RULES.map(function (r) { return r.code; });
    var i = 0, score = 0, results = [], mistakes = [], timer = null;

    function finish() { done({ score: score, max: items.length, mistakes: mistakes }); }

    function show() {
      M.onKey = null;
      var it = items[i];
      root.innerHTML = '<div class="play quiz"><div class="q-top">' + pips(items.length, i, results) +
        '<div class="q-score">Đúng ' + results.filter(Boolean).length + ' trên ' + i + '</div></div>' +
        (level.timed ? '<div class="timebar"><i style="animation-duration:' + level.timed + 's"></i></div>' : '') +
        '<div class="q-body"></div><div class="q-fb" aria-live="polite"></div></div>';
      var body = $('.q-body', root);
      ({ tf: tf, party: party, choice: choice, rules: rules, clause: clause })[it.kind](it, body);
      if (level.timed) timer = later(function () { resolve(it, 0, 'Hết giờ.'); }, level.timed * 1000);
    }

    /* part: phần điểm 0..1 */
    function resolve(it, part, lead, extraHtml) {
      if (timer) { clearTimeout(timer); timer = null; }
      var bar = $('.timebar i', root); if (bar) bar.style.animationPlayState = 'paused';
      var ok = part >= 1;
      score += part; results[i] = ok;
      IG.srs.record(it.id, ok);
      if (ok) IG.sfx.ok(); else { IG.sfx.bad(); mistakes.push({ q: shortQ(it), why: it.why || (it.clues || []).join('. ') + '.' }); }
      $$('.q-body button', root).forEach(function (b) { b.disabled = true; });
      var fb = $('.q-fb', root);
      var last = i === items.length - 1;
      fb.innerHTML = '<div class="fb ' + (ok ? 'ok' : 'bad') + '"><h3>' + (ok ? 'Chính xác' : (lead || 'Chưa đúng')) + '</h3>' +
        (it.why ? '<p>' + esc(it.why) + '</p>' : '') + (extraHtml || '') +
        (it.extra ? '<p class="extra-tag">Kiến thức bổ sung ngoài ghi chép bài giảng (Institute Cargo Clauses 2009).</p>' : '') +
        '<button class="btn next">' + (last ? 'Xem kết quả' : 'Câu tiếp theo') + '</button></div>';
      var nb = $('.next', fb);
      nb.onclick = function () { IG.sfx.click(); i++; if (i >= items.length) finish(); else show(); };
      nb.focus({ preventScroll: true });
      fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      M.onKey = function (e) { if (e.key === 'Enter') { e.preventDefault(); nb.click(); } };
    }

    function shortQ(it) {
      if (it.kind === 'tf') return it.text;
      if (it.kind === 'rules') return it.brief;
      if (it.kind === 'clause') return it.tokens.filter(function (t) { return t.charAt(0) !== '('; }).join(', ');
      return (it.clause ? it.clause + ': ' : '') + it.ask;
    }

    function keysFor(buttons) {
      M.onKey = function (e) {
        var n = parseInt(e.key, 10);
        if (n >= 1 && n <= buttons.length && !buttons[n - 1].disabled) buttons[n - 1].click();
      };
    }

    function tf(it, body) {
      body.innerHTML = '<p class="q-kind">Nhận định này đúng hay sai?</p><blockquote class="stmt">' + esc(it.text) + '</blockquote>' +
        '<div class="opts two"><button class="btn big yes" data-v="1"><kbd>1</kbd>Đúng</button><button class="btn big no" data-v="0"><kbd>2</kbd>Sai</button></div>';
      var bs = $$('.opts button', body);
      bs.forEach(function (b) {
        b.onclick = function () {
          var pick = b.dataset.v === '1';
          b.classList.add(pick === it.answer ? 'right' : 'wrong');
          resolve(it, pick === it.answer ? 1 : 0, 'Chưa đúng. Nhận định này ' + (it.answer ? 'đúng' : 'sai') + '.');
        };
      });
      keysFor(bs);
    }

    function caseHead(it) {
      return (it.clause ? '<div class="clause">' + esc(it.clause) + '</div>' : '') + '<p class="story">' + esc(it.story) + '</p>';
    }

    function party(it, body) {
      var rule = IG.rule(it.rule);
      body.innerHTML = caseHead(it) + '<div class="j-slot">' + A.journey({ marker: it.at, noCost: true }) + '</div>' +
        '<p class="ask">' + esc(it.ask) + '</p>' +
        '<div class="opts two"><button class="btn big seller" data-v="S"><kbd>1</kbd>Người bán chịu</button><button class="btn big buyer" data-v="B"><kbd>2</kbd>Người mua chịu</button></div>';
      centerOn($('.journey', body), it.at);
      var bs = $$('.opts button', body);
      bs.forEach(function (b) {
        b.onclick = function () {
          var ok = b.dataset.v === it.answer;
          b.classList.add(ok ? 'right' : 'wrong');
          $('.j-slot', body).innerHTML = A.journey({ marker: it.at, risk: A.riskIdx(rule, it.variant), noCost: true }) + A.legend() +
            (EXCEPTION[it.id] ? '<p class="exception">' + EXCEPTION[it.id] + '</p>' : '');
          centerOn($('.journey', body), it.at);
          resolve(it, ok ? 1 : 0, 'Chưa đúng. ' + IG.party(it.answer) + ' chịu.');
        };
      });
      keysFor(bs);
    }

    function choice(it, body) {
      var order = IG.shuffle(it.options.map(function (_, k) { return k; }));
      body.innerHTML = caseHead(it) + '<p class="ask">' + esc(it.ask) + '</p><div class="opts col">' +
        order.map(function (k, n) { return '<button class="btn opt" data-k="' + k + '"><kbd>' + (n + 1) + '</kbd>' + esc(it.options[k]) + '</button>'; }).join('') + '</div>';
      var bs = $$('.opts button', body);
      bs.forEach(function (b) {
        b.onclick = function () {
          var ok = +b.dataset.k === it.answer;
          b.classList.add(ok ? 'right' : 'wrong');
          if (!ok) bs.forEach(function (x) { if (+x.dataset.k === it.answer) x.classList.add('right'); });
          resolve(it, ok ? 1 : 0);
        };
      });
      keysFor(bs);
    }

    function rules(it, body) {
      var f = { mode: null, carriage: null, ins: null, where: null };
      var groups = [
        { k: 'mode', q: 'Hàng đi bằng gì?', o: [['sea', 'Tàu biển, giao tại tàu'], ['multi', 'Container, hàng không, nhiều chặng']] },
        { k: 'carriage', q: 'Ai thuê chặng chính?', o: [['S', 'Người bán'], ['B', 'Người mua']] },
        { k: 'ins', q: 'Người bán buộc mua bảo hiểm?', o: [['S', 'Có'], ['none', 'Không']] },
        { k: 'where', q: 'Rủi ro chuyển ở đâu?', o: [['origin', 'Nước xuất khẩu'], ['dest', 'Nơi đến']] }
      ];
      body.innerHTML = '<div class="client"><div class="avatar">' + A.portrait(it.client) + '</div>' +
        '<div class="bubble"><b>' + esc(A.whoName(it.client)) + '</b><p>' + esc(it.brief) + '</p></div></div>' +
        '<details class="compass" open><summary>La bàn bốn câu hỏi: đánh dấu điều bạn đọc được, các quy tắc không khớp sẽ mờ đi</summary><div class="compass-grid">' +
        groups.map(function (g) {
          return '<div class="cg"><span>' + g.q + '</span><div class="seg">' + g.o.map(function (o) {
            return '<button type="button" data-k="' + g.k + '" data-v="' + o[0] + '" aria-pressed="false">' + o[1] + '</button>';
          }).join('') + '</div></div>';
        }).join('') + '</div></details>' +
        '<p class="ask">Bạn giới thiệu hoa tiêu nào?</p><div class="hand">' +
        hand.map(function (c) { var r = IG.rule(c); return '<button class="card-rule" data-c="' + c + '">' + A.badge(c) + '<small>' + esc(r.vn) + '</small></button>'; }).join('') + '</div>';
      function fits(r) {
        if (f.mode === 'multi' && r.mode === 'sea') return false;
        if (f.carriage && r.carriage !== f.carriage) return false;
        if (f.ins && r.insurance !== f.ins) return false;
        if (f.where === 'origin' && r.risk > 4) return false;
        if (f.where === 'dest' && r.risk < 6) return false;
        return true;
      }
      $$('.compass button', body).forEach(function (b) {
        b.onclick = function () {
          var k = b.dataset.k, v = b.dataset.v;
          f[k] = f[k] === v ? null : v;
          IG.sfx.click();
          $$('.compass button', body).forEach(function (x) { x.setAttribute('aria-pressed', String(f[x.dataset.k] === x.dataset.v)); });
          $$('.card-rule', body).forEach(function (c) { c.classList.toggle('dim', !fits(IG.rule(c.dataset.c))); });
        };
      });
      $$('.card-rule', body).forEach(function (c) {
        c.onclick = function () {
          var ok = c.dataset.c === it.answer;
          c.classList.add(ok ? 'right' : 'wrong');
          $$('.card-rule', body).forEach(function (x) { x.classList.remove('dim'); if (x.dataset.c === it.answer) x.classList.add('right'); });
          $$('.compass button', body).forEach(function (x) { x.disabled = true; });
          var html = '<ol class="clues">' + it.clues.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol>';
          if (!ok) {
            var d = IG.diff(IG.rule(c.dataset.c), IG.rule(it.answer)).slice(0, 3);
            html += '<table class="difft"><tr><th></th><th>' + c.dataset.c + ' (bạn chọn)</th><th>' + it.answer + '</th></tr>' +
              d.map(function (x) { return '<tr><td>' + x.label + '</td><td>' + esc(x.a) + '</td><td>' + esc(x.b) + '</td></tr>'; }).join('') + '</table>';
          }
          resolve(it, ok ? 1 : 0, 'Chưa đúng. Phù hợp nhất là ' + it.answer + '.', html);
        };
      });
    }

    function clause(it, body) {
      body.innerHTML = '<p class="story">' + esc(it.context) + '</p><p class="ask">Bấm vào phần có vấn đề trong điều khoản.</p>' +
        '<div class="paper">' + it.tokens.map(function (t, k) { return '<button class="tok" data-k="' + k + '">' + esc(t) + '</button>'; }).join('') + '</div><div class="fixes"></div>';
      var part = 0;
      $$('.tok', body).forEach(function (b) {
        b.onclick = function () {
          var ok = +b.dataset.k === it.bad;
          if (ok) { part += 0.5; IG.sfx.flag(); } else { b.classList.add('wrong'); IG.sfx.bad(); }
          $$('.tok', body).forEach(function (x) { x.disabled = true; if (+x.dataset.k === it.bad) x.classList.add('flagged'); });
          var order = IG.shuffle(it.fixes.map(function (_, k) { return k; }));
          var fx = $('.fixes', body);
          fx.innerHTML = '<p class="ask">' + (ok ? 'Đúng chỗ rồi.' : 'Chỗ có vấn đề là phần được đánh dấu.') + ' Sửa thế nào?</p><div class="opts col">' +
            order.map(function (k, n) { return '<button class="btn opt" data-k="' + k + '"><kbd>' + (n + 1) + '</kbd>' + esc(it.fixes[k]) + '</button>'; }).join('') + '</div>';
          var bs = $$('button', fx);
          bs.forEach(function (o) {
            o.onclick = function () {
              var ok2 = +o.dataset.k === it.fix;
              o.classList.add(ok2 ? 'right' : 'wrong');
              if (!ok2) bs.forEach(function (x) { if (+x.dataset.k === it.fix) x.classList.add('right'); });
              resolve(it, part + (ok2 ? 0.5 : 0));
            };
          });
          keysFor(bs);
        };
      });
    }

    show();
  };

  /* =====================================================================
     SORT: phân loại thẻ vào ô
     ===================================================================== */
  M.sort = function (level, root, done) {
    var set = IG.SORTS[level.set];
    var items = IG.shuffle(set.items);
    var i = 0, score = 0, results = [], mistakes = [], busy = false;

    root.innerHTML = '<div class="play sort"><div class="q-top"><div class="pips-slot"></div><div class="q-score"></div></div>' +
      '<div class="belt"><div class="belt-card"></div></div><div class="sort-fb" aria-live="polite"></div>' +
      '<div class="bins n' + set.bins.length + '">' + set.bins.map(function (b, k) {
        return '<button class="bin tone-' + b.tone + '" data-b="' + b.id + '"><span class="bin-label"><kbd>' + (k + 1) + '</kbd>' + esc(b.label) + '</span><span class="bin-chips"></span></button>';
      }).join('') + '</div></div>';
    var card = $('.belt-card', root), fb = $('.sort-fb', root), bins = $$('.bin', root);

    function label(it) { return it.rule ? IG.rule(it.rule).code : it.text; }
    function show() {
      busy = false;
      $('.pips-slot', root).innerHTML = pips(items.length, i, results);
      $('.q-score', root).textContent = 'Đúng ' + results.filter(Boolean).length + ' trên ' + i;
      var it = items[i];
      card.className = 'belt-card in';
      card.innerHTML = it.rule ? A.badge(it.rule, 'xl') + '<div><b>' + esc(IG.rule(it.rule).name) + '</b><br>' + esc(IG.rule(it.rule).vn) + '</div>' : '<p>' + esc(it.text) + '</p>';
      fb.innerHTML = '';
      bins.forEach(function (b) { b.disabled = false; b.classList.remove('shake', 'glow'); });
    }
    function next() { i++; if (i >= items.length) done({ score: score, max: items.length, mistakes: mistakes }); else show(); }

    bins.forEach(function (b) {
      b.onclick = function () {
        if (busy) return; busy = true;
        var it = items[i], ok = b.dataset.b === it.bin;
        var target = bins.find(function (x) { return x.dataset.b === it.bin; });
        results[i] = ok; IG.srs.record('sort-' + it.id, ok);
        $('.bin-chips', target).insertAdjacentHTML('beforeend', '<i class="chip ' + (ok ? '' : 'miss') + '">' + esc(label(it)) + '</i>');
        bins.forEach(function (x) { x.disabled = true; });
        target.classList.add('glow');
        card.className = 'belt-card out';
        if (ok) {
          score++; IG.sfx.ok();
          fb.innerHTML = '<p class="mini ok">Đúng. ' + esc(it.why) + '</p>';
          later(next, 1500);
        } else {
          IG.sfx.bad(); b.classList.add('shake');
          var binName = set.bins.find(function (x) { return x.id === it.bin; }).label;
          mistakes.push({ q: label(it) + ' thuộc ô "' + binName + '"', why: it.why });
          fb.innerHTML = '<div class="fb bad"><h3>Chưa đúng. Thẻ này thuộc ô "' + esc(binName) + '"</h3><p>' + esc(it.why) + '</p><button class="btn next">Thẻ tiếp theo</button></div>';
          var nb = $('.next', fb); nb.onclick = function () { IG.sfx.click(); next(); }; nb.focus({ preventScroll: true });
        }
      };
    });
    M.onKey = function (e) {
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= bins.length && !bins[n - 1].disabled) bins[n - 1].click();
      else if (e.key === 'Enter') { var nb = $('.sort-fb .next', root); if (nb) { e.preventDefault(); nb.click(); } }
    };
    show();
  };

  /* =====================================================================
     ROUTE: dựng tuyến, cắm cờ rủi ro và mốc chi phí, cho hàng chạy
     ===================================================================== */
  var SW = [
    { k: 'carriage', q: 'Ai ký hợp đồng vận tải chặng chính?', o: [['S', 'Người bán'], ['B', 'Người mua']] },
    { k: 'insurance', q: 'Bảo hiểm hàng hóa', o: [['S', 'Người bán buộc phải mua'], ['none', 'Không ai bị buộc']] },
    { k: 'exp', q: 'Ai thông quan xuất khẩu?', o: [['S', 'Người bán'], ['B', 'Người mua']] },
    { k: 'imp', q: 'Ai thông quan nhập khẩu, nộp thuế?', o: [['S', 'Người bán'], ['B', 'Người mua']] }
  ];
  function swWhy(k, r) {
    if (k === 'carriage') return r.carriage === 'S' ? 'Nhóm C và D: người bán ký hợp đồng vận tải chặng chính.' : 'Nhóm E và F: người mua tự thuê vận tải chặng chính.';
    if (k === 'insurance') return r.insurance === 'S' ? r.code + ': người bán buộc phải mua bảo hiểm cho người mua, mặc định điều kiện (' + r.insClause + ').' : 'Chỉ CIF và CIP buộc người bán mua bảo hiểm. Ở các quy tắc khác, ai chịu rủi ro thì nên tự mua.';
    if (k === 'exp') return r.exp === 'B' ? 'Chỉ riêng EXW để người mua thông quan xuất khẩu.' : 'Trừ EXW, người bán luôn thông quan xuất khẩu.';
    return r.imp === 'S' ? 'Chỉ riêng DDP buộc người bán thông quan nhập khẩu và nộp thuế.' : 'Trừ DDP, người mua luôn thông quan nhập khẩu.';
  }

  M.route = function (level, root, done, opts) {
    opts = opts || {};
    var tasks = opts.tasks || level.tasks;
    var t = 0, score = 0, max = tasks.length * 9, mistakes = [], results = [];

    function show() {
      var task = tasks[t], r = IG.rule(task.rule);
      var truth = { risk: A.riskIdx(r, task.variant), cost: task.variant === 1 ? A.riskIdx(r, 1) : r.cost, carriage: r.carriage, insurance: r.insurance, exp: r.exp, imp: r.imp };
      var sel = { risk: null, cost: null, carriage: null, insurance: null, exp: null, imp: null };

      function laneHtml(kind, title) {
        return '<div class="lane lane-' + kind + ' unset" data-lane="' + kind + '"><div class="lane-name"><span class="ic ic-' + (kind === 'risk' ? 'flag' : 'coin') + '"></span>' + title + '</div>' +
          '<div class="lane-bar"><div class="fill-s"></div>' + IG.POINTS.map(function (p) {
            return '<button class="dot" data-i="' + p.id + '" style="left:' + A.pct(p.x) + '" aria-label="' + esc(p.label) + '" title="' + esc(p.label) + '"></button>';
          }).join('') + '<span class="handle" hidden><span class="ic ic-' + (kind === 'risk' ? 'flag' : 'coin') + '"></span></span></div></div>';
      }

      root.innerHTML = '<div class="play route"><div class="q-top">' + pips(tasks.length, t, results) + '<div class="q-score">Tuyến ' + (t + 1) + ' trên ' + tasks.length + '</div></div>' +
        '<div class="route-head"><div class="avatar">' + A.portrait(r.code) + '</div><div><div class="clause">' + esc(task.clause) + '</div>' +
        '<p class="say"><b>' + esc(r.who) + ':</b> ' + esc(r.line) + '</p>' + (task.hint ? '<p class="hint">' + esc(task.hint) + '</p>' : '') + '</div></div>' +
        '<div class="journey builder"><div class="journey-inner">' + A.scene() + A.points() +
        laneHtml('risk', 'Cắm cờ rủi ro: người bán chịu rủi ro tới mốc nào?') +
        laneHtml('cost', 'Đặt mốc chi phí: người bán trả chi phí tới mốc nào?') +
        '<div class="token" hidden></div></div></div>' + A.legend() +
        '<p class="picked" aria-live="polite"></p>' +
        '<div class="switches">' + SW.map(function (s) {
          return '<div class="sw-row" data-k="' + s.k + '"><span>' + s.q + '</span><div class="seg">' + s.o.map(function (o) {
            return '<button type="button" data-k="' + s.k + '" data-v="' + o[0] + '" aria-pressed="false" class="' + (o[0] === 'S' ? 'is-s' : o[0] === 'B' ? 'is-b' : '') + '">' + o[1] + '</button>';
          }).join('') + '</div></div>';
        }).join('') + '</div>' +
        '<div class="route-actions"><button class="btn big go" disabled>Cho hàng khởi hành</button><span class="todo"></span></div>' +
        '<div class="route-log" aria-live="polite"></div></div>';

      var go = $('.go', root);
      function refresh() {
        var left = Object.keys(sel).filter(function (k) { return sel[k] === null; }).length;
        go.disabled = left > 0;
        $('.todo', root).textContent = left ? 'Còn ' + left + ' lựa chọn chưa đặt' : '';
      }
      function setLane(kind, idx, cls) {
        var lane = $('[data-lane="' + kind + '"]', root), x = A.pct(IG.POINTS[idx].x);
        lane.classList.remove('unset');
        $('.fill-s', lane).style.width = x;
        var hd = $('.handle', lane); hd.hidden = false; hd.style.left = x;
        if (cls) lane.classList.add(cls);
      }
      $$('.dot', root).forEach(function (d) {
        d.onclick = function () {
          var kind = d.closest('.lane').dataset.lane, idx = +d.dataset.i;
          sel[kind] = idx; setLane(kind, idx); IG.sfx.flag();
          $('.picked', root).textContent = (kind === 'risk' ? 'Cờ rủi ro: ' : 'Mốc chi phí: ') + IG.POINTS[idx].label + '.';
          refresh();
        };
      });
      $$('.switches button', root).forEach(function (b) {
        b.onclick = function () {
          sel[b.dataset.k] = b.dataset.v; IG.sfx.click();
          $$('.sw-row[data-k="' + b.dataset.k + '"] button', root).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          refresh();
        };
      });
      refresh();

      go.onclick = function () {
        go.disabled = true; $('.todo', root).textContent = '';
        $$('.dot, .switches button', root).forEach(function (b) { b.disabled = true; });
        IG.sfx.horn();
        var token = $('.token', root), log = $('.route-log', root), inner = $('.journey-inner', root);
        token.hidden = false;
        var incs = task.incidents.map(function (k) { return IG.INCIDENTS[k]; }).sort(function (a, b) { return a.x - b.x; });
        var x = 60, n = 0, pausedUntil = 0, lastT = 0;
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var speed = reduce ? 5000 : 230;
        log.innerHTML = '<h3>Nhật ký hành trình</h3>';
        function step(ts) {
          if (!lastT) lastT = ts;
          var dt = Math.min(60, ts - lastT); lastT = ts;
          if (ts >= pausedUntil) {
            x += speed * dt / 1000;
            if (n < incs.length && x >= incs[n].x) {
              x = incs[n].x; incident(incs[n]); n++;
              pausedUntil = ts + (reduce ? 50 : 1700);
            }
          }
          token.style.left = A.pct(Math.min(x, 950));
          centerOn(inner.parentNode, x);
          if (x >= 950 && n >= incs.length) { M._raf = 0; later(verdict, reduce ? 0 : 400); return; }
          M._raf = requestAnimationFrame(step);
        }
        function incident(inc) {
          IG.sfx.alarm();
          var real = inc.x <= IG.POINTS[truth.risk].x ? 'S' : 'B';
          var mine = inc.x <= IG.POINTS[sel.risk].x ? 'S' : 'B';
          inner.insertAdjacentHTML('beforeend', '<span class="mark" style="left:' + A.pct(inc.x) + '">!</span>');
          log.insertAdjacentHTML('beforeend', '<div class="inc"><p>' + esc(inc.text) + '</p><span class="stamp ' + (real === 'S' ? 's' : 'b') + '">' + IG.party(real) + ' chịu</span>' +
            (mine !== real ? '<em>Theo cờ bạn cắm thì ' + IG.party(mine).toLowerCase() + ' chịu. Khách của bạn sẽ kiện.</em>' : '') + '</div>');
        }
        function verdict() {
          var got = 0, rows = [];
          function row(ok, label, yours, right, why, pts) {
            if (ok) got += pts;
            rows.push('<li class="' + (ok ? 'ok' : 'bad') + '"><b>' + label + '</b><span>' + (ok ? esc(right) : 'Bạn đặt: ' + esc(yours) + '. Đúng là: ' + esc(right)) + '</span>' + (ok ? '' : '<p>' + esc(why) + '</p>') + '</li>');
          }
          row(sel.risk === truth.risk, 'Cờ rủi ro', IG.POINTS[sel.risk].short, IG.POINTS[truth.risk].short, r.riskWhy, 3);
          row(sel.cost === truth.cost, 'Mốc chi phí', IG.POINTS[sel.cost].short, IG.POINTS[truth.cost].short, r.costWhy, 2);
          SW.forEach(function (s) {
            var name = function (v) { return s.o.find(function (o) { return o[0] === v; })[1]; };
            row(sel[s.k] === truth[s.k], s.q.replace('?', ''), name(sel[s.k]), name(truth[s.k]), swWhy(s.k, r), 1);
          });
          if (sel.risk !== truth.risk) { $('[data-lane="risk"]', root).insertAdjacentHTML('beforeend', '<p class="lane-fix">Vạch đã được sửa lại cho đúng.</p>'); }
          setLane('risk', truth.risk, 'truth'); setLane('cost', truth.cost, 'truth');
          var perfect = got === 9;
          score += got; results[t] = perfect;
          IG.srs.record('route-' + r.code, perfect);
          if (perfect) IG.sfx.ok(); else { IG.sfx.bad(); mistakes.push({ q: 'Tuyến ' + r.code + (task.variant === 1 ? ' (giao tại cơ sở người bán)' : ''), why: r.riskWhy + ' ' + r.costWhy }); }
          var split = truth.risk !== truth.cost ? '<p class="note">Hai vạch dài ngắn khác nhau: đó là dấu hiệu của nhóm C. Người bán trả cước tới nơi đến nhưng đã hết chịu rủi ro từ nơi đi.</p>' : '';
          var last = t === tasks.length - 1;
          log.insertAdjacentHTML('beforeend', '<div class="fb ' + (perfect ? 'ok' : 'bad') + '"><h3>' + (perfect ? 'Tuyến ' + r.code + ' dựng chuẩn' : 'Tuyến ' + r.code + ': ' + got + ' trên 9 điểm') + '</h3><ul class="verdict">' + rows.join('') + '</ul>' + split +
            '<p class="keyline">' + esc(r.keyword) + '</p><button class="btn next">' + (last ? 'Xem kết quả' : 'Tuyến tiếp theo') + '</button></div>');
          var nb = $('.next', log);
          nb.onclick = function () { IG.sfx.click(); t++; if (t >= tasks.length) done({ score: score, max: max, mistakes: mistakes }); else { show(); window.scrollTo(0, 0); } };
          nb.focus({ preventScroll: true });
          nb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          M.onKey = function (e) { if (e.key === 'Enter') { e.preventDefault(); nb.click(); } };
        }
        M._raf = requestAnimationFrame(step);
      };
    }
    show();
  };

  /* =====================================================================
     PRICE: dựng giá FAS, FOB, CFR, CIF từ các khoản chi phí
     ===================================================================== */
  M.price = function (level, root, done) {
    var P = IG.PRICE;
    var replay = (IG.state.levels[level.id] || {}).plays > 0;
    function rnd(a, b, stepv) { return Math.round((a + Math.random() * (b - a)) / stepv) * stepv; }
    var pct = replay ? IG.pick([0.15, 0.2, 0.25, 0.3], 1)[0] : 0.25;
    var rate = replay ? IG.pick([0.002, 0.0025, 0.003, 0.004], 1)[0] : P.rate;
    var val = {};
    P.blocks.forEach(function (b) {
      if (b.base !== undefined) val[b.id] = replay ? +(b.id === 'cost' ? rnd(300, 900, 50) : b.base * (0.6 + Math.random() * 1.2)).toFixed(b.base < 2 ? 1 : 0) : b.base;
    });
    val.profit = +(val.cost * pct).toFixed(2);
    var names = {};
    P.blocks.forEach(function (b) { names[b.id] = b.id === 'profit' ? 'Lãi dự tính ' + Math.round(pct * 100) + '% giá thành' : b.label; });

    var s = 0, score = 0, max = 10, mistakes = [], placed = [], prices = {}, picked = {};

    function sum(ids) { return ids.reduce(function (a, id) { return a + (val[id] || 0); }, 0); }

    function show() {
      var step = P.steps[s], prev = s ? P.steps[s - 1] : null;
      picked = {};
      var pool = P.blocks.filter(function (b) { return placed.indexOf(b.id) < 0; });
      root.innerHTML = '<div class="play price"><div class="q-top">' + pips(P.steps.length, s, P.steps.map(function (_, k) { return k < s; })) + '<div class="q-score">' + esc(P.route) + '</div></div>' +
        '<div class="price-grid"><div class="pool"><h3>' + (prev ? 'Từ ' + prev.term + ' lên ' + step.term + ', cộng thêm khoản nào?' : 'Giá ' + step.term + ' gồm những khoản nào?') + '</h3>' +
        '<p class="hint">Bấm để chọn các khoản thuộc giá <b>' + step.term + ' ' + esc(step.place) + '</b>. Đơn vị: ' + P.unit + '. Tỷ lệ phí bảo hiểm: ' + (rate * 100).toLocaleString('vi-VN') + '% (' + (rate * 100).toLocaleString('vi-VN') + ' USD cho mỗi 100 USD).</p>' +
        '<div class="blocks">' + pool.map(function (b) {
          return '<button class="blk" data-id="' + b.id + '" aria-pressed="false"><span>' + esc(names[b.id]) + '</span><b>' + (val[b.id] !== undefined ? IG.money(val[b.id]) : 'tính sau') + '</b></button>';
        }).join('') + '</div><button class="btn big lock">Chốt giá ' + step.term + '</button></div>' +
        '<div class="tower"><h3>Thang giá</h3><ol class="ladder">' + P.steps.map(function (st, k) {
          return '<li class="' + (k < s ? 'done' : k === s ? 'cur' : '') + '">' + A.badge(st.term) + '<span>' + esc(st.place) + '</span><b>' + (prices[st.term] !== undefined ? IG.money(prices[st.term]) : k === s ? '<span class="live">' + IG.money(sum(placed)) + '</span>' : '') + '</b></li>';
        }).join('') + '</ol><ul class="in-price">' + placed.map(function (id) { return '<li><span>' + esc(names[id]) + '</span><b>' + IG.money(val[id]) + '</b></li>'; }).join('') + '</ul></div></div>' +
        '<div class="q-fb" aria-live="polite"></div></div>';
      $$('.blk', root).forEach(function (b) {
        b.onclick = function () {
          picked[b.dataset.id] = !picked[b.dataset.id];
          b.setAttribute('aria-pressed', String(!!picked[b.dataset.id])); IG.sfx.click();
          var live = $('.live', root);
          if (live) live.textContent = IG.money(sum(placed) + sum(Object.keys(picked).filter(function (k) { return picked[k]; })));
        };
      });
      $('.lock', root).onclick = check;
    }

    function check() {
      var step = P.steps[s];
      var want = P.blocks.filter(function (b) { return b.step === step.term; }).map(function (b) { return b.id; });
      var got = Object.keys(picked).filter(function (k) { return picked[k]; });
      var extra = got.filter(function (id) { return want.indexOf(id) < 0; });
      var miss = want.filter(function (id) { return got.indexOf(id) < 0; });
      var ok = !extra.length && !miss.length;
      $$('.blk, .lock', root).forEach(function (b) { b.disabled = true; });
      $$('.blk', root).forEach(function (b) {
        if (want.indexOf(b.dataset.id) >= 0) b.classList.add('right');
        else if (extra.indexOf(b.dataset.id) >= 0) b.classList.add('wrong');
      });
      if (ok) { score += 2; IG.sfx.ok(); } else {
        IG.sfx.bad();
        mistakes.push({ q: 'Giá ' + step.term + ' ' + step.place, why: step.why });
      }
      IG.srs.record('price-' + step.term, ok);
      placed = placed.concat(want);
      var detail = '';
      if (extra.length) detail += '<p>Thừa: ' + extra.map(function (id) { return esc(names[id]); }).join(', ') + '.</p>';
      if (miss.length) detail += '<p>Thiếu: ' + miss.map(function (id) { return esc(names[id]); }).join(', ') + '.</p>';
      var fb = $('.q-fb', root);
      if (step.term === 'CIF') { formula(ok, detail); return; }
      prices[step.term] = sum(placed);
      fb.innerHTML = '<div class="fb ' + (ok ? 'ok' : 'bad') + '"><h3>' + (ok ? 'Chính xác' : 'Chưa đúng') + '. ' + step.term + ' ' + esc(step.place) + ' = ' + IG.money(prices[step.term]) + ' ' + P.unit + '</h3>' + detail + '<p>' + esc(step.why) + '</p><button class="btn next">Bậc tiếp theo</button></div>';
      var nb = $('.next', fb); nb.onclick = function () { IG.sfx.click(); s++; show(); }; nb.focus({ preventScroll: true });
      fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function formula(okBlocks, detail) {
      var cfr = prices.CFR, k = 1.1 * rate;
      var right = cfr / (1 - k);
      var opts = IG.shuffle([
        { t: 'CIF = CFR ÷ (1 − 110% × R)', v: right, ok: true },
        { t: 'CIF = CFR + R × CFR', v: cfr + rate * cfr, ok: false },
        { t: 'CIF = CFR + 110% × CFR', v: cfr * 2.1, ok: false }
      ]);
      var fb = $('.q-fb', root);
      fb.innerHTML = '<div class="fb ' + (okBlocks ? 'ok' : 'bad') + '"><h3>' + (okBlocks ? 'Đúng khoản rồi' : 'Khoản cần cộng là phí bảo hiểm') + '. Nhưng phí bảo hiểm là bao nhiêu?</h3>' + detail +
        '<p>Phí bảo hiểm = R × 110% × giá CIF, mà giá CIF lại chứa chính phí bảo hiểm. CFR đang là ' + IG.money(cfr) + ', R = ' + (rate * 100).toLocaleString('vi-VN') + '%. Chọn công thức đúng.</p><div class="opts col">' +
        opts.map(function (o, n) { return '<button class="btn opt" data-n="' + n + '"><kbd>' + (n + 1) + '</kbd>' + o.t + ' = ' + IG.money(o.v) + '</button>'; }).join('') + '</div><div class="f-out"></div></div>';
      fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      var bs = $$('.opt', fb);
      bs.forEach(function (b) {
        b.onclick = function () {
          var o = opts[+b.dataset.n];
          bs.forEach(function (x) { x.disabled = true; if (opts[+x.dataset.n].ok) x.classList.add('right'); });
          if (o.ok) { score += 2; IG.sfx.ok(); } else { b.classList.add('wrong'); IG.sfx.bad(); mistakes.push({ q: 'Công thức giá CIF', why: 'Bảo hiểm tính trên 110% giá CIF nên CIF = CFR ÷ (1 − 110% × R).' }); }
          IG.srs.record('price-formula', o.ok);
          prices.CIF = right; val.ins = right - cfr;
          $('.f-out', fb).innerHTML = '<p><b>CIF Le Havre = ' + IG.money(right) + ' ' + P.unit + '</b>, trong đó phí bảo hiểm là ' + IG.money(right - cfr) + '. Lấy 110% vì người mua được bảo hiểm cả phần lãi dự tính 10%.</p>' +
            '<ol class="ladder final">' + P.steps.map(function (st) { return '<li class="done">' + A.badge(st.term) + '<span>' + esc(st.place) + '</span><b>' + IG.money(prices[st.term]) + '</b></li>'; }).join('') + '</ol>' +
            '<p class="note">' + esc(P.leftover) + '</p><button class="btn next">Xem kết quả</button>';
          var nb = $('.next', fb); nb.onclick = function () { IG.sfx.click(); done({ score: score, max: max, mistakes: mistakes }); }; nb.focus({ preventScroll: true });
          nb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        };
      });
    }
    show();
  };
})();
