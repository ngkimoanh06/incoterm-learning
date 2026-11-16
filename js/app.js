/* Cảng Thập Nhất — màn hình: mở đầu, hải đồ, lời dẫn, chơi, kết quả, sổ tay, ôn tập, bằng hoa tiêu */
(function () {
  'use strict';
  var A = IG.art, esc = IG.esc, $ = IG.$, $$ = IG.$$;
  var stage, hud, dlgOpen = null;
  var TYPE = { sort: 'Phân loại', route: 'Dựng tuyến', price: 'Tính giá' };
  function typeName(lv) { return lv.type === 'quiz' ? (lv.exam ? 'Sát hạch' : lv.timed ? 'Phản xạ' : 'Tình huống') : TYPE[lv.type]; }

  IG.go = function (screen, p) {
    IG.modes.stop();
    closeDialog();
    screens[screen](p || {});
    renderHud(screen);
    window.scrollTo(0, 0);
    var h = $('h1, h2', stage); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  };

  /* ---------- thanh trạng thái ---------- */
  function renderHud(screen) {
    if (screen === 'title') { hud.hidden = true; return; }
    hud.hidden = false;
    var rk = IG.rank(), st = IG.totalStars(), due = IG.srs.due(10).length;
    var lo = rk.cur.xp, hi = rk.next ? rk.next.xp : lo;
    var w = rk.next ? Math.round(100 * (IG.state.xp - lo) / (hi - lo)) : 100;
    hud.innerHTML = '<button class="brand" data-go="hub">Cảng Thập Nhất</button>' +
      '<div class="rank" title="Điểm kinh nghiệm"><b>' + esc(rk.cur.name) + '</b><div class="xpbar"><i style="width:' + w + '%"></i></div><small>' + IG.state.xp + (rk.next ? ' / ' + rk.next.xp : '') + ' điểm</small></div>' +
      '<div class="hud-stars">' + A.stars(1, 1) + st.got + '/' + st.max + '</div>' +
      '<nav><button data-go="hub" class="' + (screen === 'hub' ? 'on' : '') + '">Hải đồ</button>' +
      '<button data-go="codex" class="' + (screen === 'codex' ? 'on' : '') + '">Sổ tay</button>' +
      '<button data-go="review" class="' + (screen === 'review' ? 'on' : '') + '">Ôn tập' + (due ? '<i class="dot-n">' + due + '</i>' : '') + '</button>' +
      '<button class="snd">' + (IG.state.sound ? 'Tắt tiếng' : 'Bật tiếng') + '</button></nav>';
    $$('[data-go]', hud).forEach(function (b) { b.onclick = function () { IG.sfx.click(); IG.go(b.dataset.go); }; });
    $('.snd', hud).onclick = function () { IG.state.sound = !IG.state.sound; IG.save(); IG.sfx.click(); renderHud(screen); };
  }

  /* ---------- lời dẫn ---------- */
  function closeDialog() { if (dlgOpen) { dlgOpen.remove(); dlgOpen = null; } }
  function dialogue(lines, then) {
    closeDialog();
    var i = 0, typing = null, full = '';
    var el = IG.h('<div class="dlg" role="dialog" aria-modal="true" aria-label="Lời dẫn"><div class="dlg-box"><div class="dlg-face"></div><div class="dlg-text"><b></b><p></p></div>' +
      '<div class="dlg-actions"><span class="dlg-count"></span><button class="link skip">Bỏ qua lời dẫn</button><button class="btn next">Tiếp</button></div></div></div>');
    document.body.appendChild(el); dlgOpen = el;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show() {
      var ln = lines[i];
      $('.dlg-face', el).innerHTML = A.portrait(ln.who, 'talk');
      $('.dlg-text b', el).textContent = A.whoName(ln.who);
      $('.dlg-count', el).textContent = (i + 1) + ' / ' + lines.length;
      full = ln.text;
      var p = $('.dlg-text p', el), n = 0;
      clearInterval(typing);
      if (reduce) { p.textContent = full; typing = null; }
      else {
        p.textContent = '';
        typing = setInterval(function () {
          n += 2; p.textContent = full.slice(0, n);
          if (n >= full.length) { clearInterval(typing); typing = null; $('.dlg-face', el).innerHTML = A.portrait(ln.who, 'happy'); }
        }, 16);
      }
      $('.next', el).textContent = i === lines.length - 1 ? 'Bắt đầu' : 'Tiếp';
    }
    function end() { clearInterval(typing); closeDialog(); then(); }
    function advance() {
      IG.sfx.click();
      if (typing) { clearInterval(typing); typing = null; $('.dlg-text p', el).textContent = full; $('.dlg-face', el).innerHTML = A.portrait(lines[i].who, 'happy'); return; }
      i++; if (i >= lines.length) end(); else show();
    }
    $('.next', el).onclick = advance;
    $('.skip', el).onclick = end;
    el._advance = advance;
    show();
    $('.next', el).focus();
  }

  function chapterIntro(ch, then) {
    dialogue(ch.intro, function () {
      IG.state.seen[ch.id] = true;
      (ch.meet || []).forEach(function (c) { IG.state.met[c] = true; });
      IG.save(); then();
    });
  }

  /* ---------- các màn hình ---------- */
  var screens = {};

  screens.title = function () {
    var cont = IG.hasProgress();
    stage.innerHTML = '<section class="title"><div class="title-ship" aria-hidden="true"><div class="stack">' +
      IG.RULES.map(function (r) { return A.badge(r.code, 'xl'); }).join('') + '</div><div class="hull"><span>SAO BIỂN</span></div><div class="waves"></div></div>' +
      '<div class="title-copy"><h1>Cảng Thập Nhất</h1><p class="lede">Mười một hoa tiêu, mười một cách chia việc giữa người bán và người mua. Bạn học Incoterms® 2020 bằng cách tự tay cắm cờ rủi ro, phân xử sự cố và tư vấn cho khách.</p>' +
      '<div class="title-actions"><button class="btn big start">' + (cont ? 'Tiếp tục hải trình' : 'Bắt đầu hải trình') + '</button>' +
      (cont ? '<button class="link fresh">Chơi lại từ đầu</button>' : '') + '</div>' +
      '<p class="fine">Tiến độ được lưu ngay trên trình duyệt này. Nội dung dựa trên tài liệu môn Giao dịch thương mại quốc tế và bản Incoterms® 2020 của ICC.</p></div></section>';
    $('.start', stage).onclick = function () { IG.sfx.horn(); IG.go('hub'); };
    var f = $('.fresh', stage);
    if (f) f.onclick = function () {
      if (window.confirm('Xóa toàn bộ tiến độ và chơi lại từ đầu? Không thể hoàn tác.')) { IG.reset(); IG.go('title'); }
    };
  };

  function mapArt() {
    var s = '<svg class="map-art" viewBox="0 0 1040 440" aria-hidden="true" preserveAspectRatio="none">';
    for (var x = 80; x < 1040; x += 80) s += '<path d="M' + x + ' 0V440" stroke="rgba(255,255,255,.07)"/>';
    for (var y = 80; y < 440; y += 80) s += '<path d="M0 ' + y + 'H1040" stroke="rgba(255,255,255,.07)"/>';
    var isl = ['M40 370 q30 -60 100 -50 q60 10 50 60 q-20 40 -90 30 q-50 -5 -60 -40Z', 'M230 150 q50 -50 110 -10 q30 40 -20 70 q-70 20 -90 -60Z', 'M440 330 q40 -70 120 -40 q40 40 -10 70 q-80 20 -110 -30Z',
      'M660 170 q60 -50 120 0 q20 50 -40 60 q-70 5 -80 -60Z', 'M800 380 q50 -70 120 -30 q30 40 -30 60 q-60 10 -90 -30Z', 'M880 90 q50 -50 100 0 q10 50 -40 55 q-55 0 -60 -55Z'];
    isl.forEach(function (d) { s += '<path d="' + d + '" fill="#1d6b74" stroke="#7fd0cf" stroke-width="1.5" stroke-dasharray="2 5"/><path d="' + d + '" fill="#e6d7a8" transform="scale(.985)" opacity=".0"/>'; });
    var pts = IG.CHAPTERS.map(function (c) { return c.x + ' ' + c.y; });
    s += '<path d="M' + pts.join(' L') + '" fill="none" stroke="#f5c518" stroke-width="3" stroke-dasharray="3 10" stroke-linecap="round"/>';
    s += '<g transform="translate(70 80)" stroke="#bfe6e4" fill="none" stroke-width="1.5"><circle r="34"/><circle r="24" opacity=".5"/><path d="M0 -44 L7 0 L0 44 L-7 0Z" fill="#bfe6e4"/><path d="M-44 0 L0 -7 L44 0 L0 7Z" opacity=".6"/></g><text x="70" y="28" text-anchor="middle" fill="#bfe6e4" font-size="15" font-weight="700">B</text>';
    return s + '</svg>';
  }

  var openChapter = null;
  screens.hub = function (p) {
    var cur = IG.currentChapter();
    var ch = (p.chapter && IG.CHAPTERS.find(function (c) { return c.id === p.chapter; })) || openChapter || cur;
    if (!IG.chapterUnlocked(ch)) ch = cur;
    openChapter = ch;
    var due = IG.srs.due(10).length;
    stage.innerHTML = '<section class="hub"><div class="map"><h1 class="sr">Hải đồ</h1>' + mapArt() + IG.CHAPTERS.map(function (c, n) {
      var open = IG.chapterUnlocked(c), got = 0;
      c.levels.forEach(function (l) { got += IG.stars(l.id); });
      var done = c.levels.every(function (l) { return IG.stars(l.id) >= 1; });
      return '<button class="port ' + (open ? '' : 'locked ') + (done ? 'done ' : '') + (c === ch ? 'sel ' : '') + (c === cur ? 'here' : '') + '" style="left:' + (c.x / 10.4) + '%;top:' + (c.y / 4.4) + '%" data-ch="' + c.id + '" ' + (open ? '' : 'disabled') + '>' +
        '<span class="port-pin">' + (open ? n + 1 : '<span class="ic ic-lock"></span>') + '</span><span class="port-name">' + esc(c.name) + '</span><span class="port-stars">' + (open ? A.stars(1, 1) + got + '/' + c.levels.length * 3 : 'Chưa mở') + '</span></button>';
    }).join('') + '</div><aside class="chapter"></aside></section>' +
      '<section class="tools"><button class="tool" data-t="review"><b>Ca trực ôn tập</b><span>' + (due ? due + ' câu đang chờ ôn lại' : 'Ôn lại những câu từng trả lời sai') + '</span></button>' +
      '<button class="tool" data-t="practice"><b>Luyện dựng tuyến</b><span>Bốn tuyến ngẫu nhiên từ các hoa tiêu đã gặp</span></button>' +
      '<button class="tool" data-t="codex"><b>Sổ tay hoa tiêu</b><span>Tra cứu và so sánh 11 quy tắc</span></button>' +
      (IG.state.cert ? '<button class="tool" data-t="cert"><b>Bằng hoa tiêu</b><span>Xem lại tấm bằng của bạn</span></button>' : '') + '</section>';
    $$('.port', stage).forEach(function (b) { b.onclick = function () { IG.sfx.click(); openChapter = null; IG.go('hub', { chapter: b.dataset.ch }); }; });
    $$('.tool', stage).forEach(function (b) { b.onclick = function () { IG.sfx.click(); IG.go(b.dataset.t); }; });
    chapterPanel(ch);
    if (!IG.state.seen[ch.id]) chapterIntro(ch, function () { chapterPanel(ch); });
  };

  function chapterPanel(ch) {
    var n = IG.CHAPTERS.indexOf(ch) + 1;
    var box = $('.chapter', stage);
    box.innerHTML = '<p class="ch-no">Chặng ' + n + ' trên ' + IG.CHAPTERS.length + '</p><h2>' + esc(ch.name) + '</h2><p class="ch-sub">' + esc(ch.sub) + '</p>' +
      (ch.meet ? '<div class="meet">' + ch.meet.map(function (c) { return A.badge(c); }).join('') + '</div>' : '') +
      '<ol class="levels">' + ch.levels.map(function (lv) {
        var open = IG.isUnlocked(lv.id), st = IG.stars(lv.id);
        return '<li><button class="lvl" data-lv="' + lv.id + '" ' + (open ? '' : 'disabled') + '><span class="lvl-type">' + typeName(lv) + '</span><b>' + esc(lv.title) + '</b><small>' + (open ? esc(lv.goal) : 'Qua màn trước với ít nhất một sao để mở') + '</small>' + (open ? A.stars(st) : '<span class="ic ic-lock"></span>') + '</button></li>';
      }).join('') + '</ol><button class="link replay">Nghe lại lời dẫn của chặng này</button>';
    $$('.lvl', box).forEach(function (b) { b.onclick = function () { IG.sfx.click(); IG.go('play', { id: b.dataset.lv }); }; });
    $('.replay', box).onclick = function () { chapterIntro(ch, function () {}); };
  }

  function playShell(title, goal, kind, backTo) {
    stage.innerHTML = '<section class="level"><header class="level-head"><button class="link back">Rời màn</button><div><p class="lvl-type">' + esc(kind) + '</p><h1>' + esc(title) + '</h1><p class="goal">' + esc(goal) + '</p></div></header><div class="mode-root"></div></section>';
    $('.back', stage).onclick = function () { IG.sfx.click(); IG.save(); IG.go(backTo || 'hub'); };
    return $('.mode-root', stage);
  }

  screens.play = function (p) {
    var x = IG.findLevel(p.id);
    if (!x || !IG.isUnlocked(p.id)) { IG.go('hub'); return; }
    var lv = x.lv; openChapter = x.ch;
    var root = playShell(lv.title, lv.goal, typeName(lv));
    IG.modes[lv.type](lv, root, function (res) {
      var out = IG.finishLevel(lv.id, res.score, res.max);
      if (lv.exam && out.ratio >= 0.7) {
        var pct = Math.round(out.ratio * 100);
        var now = new Date(), two = function (n) { return (n < 10 ? '0' : '') + n; };
        if (!IG.state.cert || pct >= IG.state.cert.pct) IG.state.cert = { pct: pct, date: now.getFullYear() + '-' + two(now.getMonth() + 1) + '-' + two(now.getDate()) };
        IG.save();
      }
      IG.go('result', { lv: lv, ch: x.ch, res: res, out: out });
    });
  };

  screens.result = function (p) {
    var lv = p.lv, res = p.res, out = p.out;
    var next = IG.nextLevel(lv.id), canNext = next && IG.isUnlocked(next.lv.id);
    var pass = out.stars >= 1;
    var head = lv.exam ? (out.ratio >= 0.7 ? 'Bạn đã đỗ kỳ sát hạch' : 'Chưa đủ 70% để nhận bằng') : out.ratio === 1 ? 'Hoàn hảo' : pass ? ['', 'Qua màn', 'Làm tốt lắm', 'Gần như hoàn hảo'][out.stars] : 'Chưa qua màn';
    if (pass) IG.sfx.win();
    stage.innerHTML = '<section class="result"><h1>' + head + '</h1><div class="res-stars">' + A.stars(out.stars) + '</div>' +
      '<p class="res-score">Điểm ' + (Math.round(res.score * 10) / 10).toLocaleString('vi-VN') + ' trên ' + res.max + ' (' + Math.round(out.ratio * 100) + '%). Nhận ' + out.gain + ' điểm kinh nghiệm.</p>' +
      (out.rankUp ? '<p class="rankup">Thăng cấp: ' + esc(out.rankUp) + '</p>' : '') +
      (!pass ? '<p class="res-hint">Cần ít nhất 50% để mở màn kế tiếp. Xem lại phần giải thích bên dưới rồi thử lại.</p>' : '') +
      '<div class="res-grid"><div class="box"><h2>Điều cần mang theo</h2><ul class="take">' + lv.takeaways.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>' +
      (res.mistakes.length ? '<div class="box"><h2>Những chỗ bạn vấp (' + res.mistakes.length + ')</h2><ul class="miss">' + res.mistakes.map(function (m) { return '<li><b>' + esc(m.q) + '</b><p>' + esc(m.why) + '</p></li>'; }).join('') + '</ul><p class="fine">Các câu này đã vào danh sách ôn tập.</p></div>' : '<div class="box"><h2>Không vấp chỗ nào</h2><p>Bạn trả lời đúng toàn bộ. Thử "Ca trực ôn tập" sau vài hôm để kiểm tra trí nhớ.</p></div>') + '</div>' +
      '<div class="res-actions">' + (lv.exam && IG.state.cert && out.ratio >= 0.7 ? '<button class="btn big" data-a="cert">Nhận bằng hoa tiêu</button>' : canNext ? '<button class="btn big" data-a="next">Màn tiếp theo: ' + esc(next.lv.title) + '</button>' : '') +
      '<button class="btn ghost" data-a="again">Chơi lại</button><button class="btn ghost" data-a="hub">Về hải đồ</button></div></section>';
    $$('[data-a]', stage).forEach(function (b) {
      b.onclick = function () {
        IG.sfx.click();
        var a = b.dataset.a;
        if (a === 'next') {
          if (next.ch !== p.ch) IG.go('hub', { chapter: next.ch.id }); else IG.go('play', { id: next.lv.id });
        } else if (a === 'again') IG.go('play', { id: lv.id });
        else if (a === 'cert') IG.go('cert');
        else IG.go('hub', { chapter: p.ch.id });
      };
    });
  };

  /* ---------- ôn tập và luyện tuyến ---------- */
  function miniResult(title, res, again) {
    var ratio = res.max ? res.score / res.max : 0;
    var gain = Math.round(res.score * 5);
    IG.state.xp += gain; IG.save();
    if (ratio >= 0.5) IG.sfx.win();
    stage.innerHTML = '<section class="result"><h1>' + esc(title) + '</h1><p class="res-score">Đúng ' + (Math.round(res.score * 10) / 10).toLocaleString('vi-VN') + ' trên ' + res.max + '. Nhận ' + gain + ' điểm kinh nghiệm.</p>' +
      (res.mistakes.length ? '<div class="box"><h2>Còn vấp (' + res.mistakes.length + ')</h2><ul class="miss">' + res.mistakes.map(function (m) { return '<li><b>' + esc(m.q) + '</b><p>' + esc(m.why) + '</p></li>'; }).join('') + '</ul></div>' : '<div class="box"><p>Không sai câu nào.</p></div>') +
      '<div class="res-actions"><button class="btn big" data-a="again">Làm thêm một lượt</button><button class="btn ghost" data-a="hub">Về hải đồ</button></div></section>';
    $('[data-a="again"]', stage).onclick = function () { IG.go(again); };
    $('[data-a="hub"]', stage).onclick = function () { IG.go('hub'); };
    renderHud(again);
  }

  screens.review = function () {
    var due = IG.srs.due(10), mode = 'due';
    if (!due.length) { due = IG.pick(IG.unlockedItems(), 10); mode = 'random'; }
    if (!due.length) {
      stage.innerHTML = '<section class="result"><h1>Ca trực ôn tập</h1><div class="box"><p>Chưa có câu nào để ôn. Hãy chơi vài màn ở hải đồ trước, những câu bạn trả lời sai sẽ tự động xuất hiện ở đây.</p></div><div class="res-actions"><button class="btn big" data-a="hub">Về hải đồ</button></div></section>';
      $('[data-a="hub"]', stage).onclick = function () { IG.go('hub'); };
      return;
    }
    var root = playShell('Ca trực ôn tập', mode === 'due' ? 'Những câu bạn từng vấp quay lại để kiểm tra. Trả lời đúng nhiều lần thì chúng mới rời danh sách.' : 'Không có câu nào đang chờ, nên đây là mười câu ngẫu nhiên từ các màn đã mở.', 'Ôn tập');
    IG.modes.quiz({ id: 'review', title: 'Ôn tập' }, root, function (res) { miniResult('Xong ca trực', res, 'review'); }, { items: due, review: true });
  };

  screens.practice = function () {
    var met = IG.RULES.filter(function (r) { return IG.state.met[r.code]; });
    if (met.length < 2) {
      stage.innerHTML = '<section class="result"><h1>Luyện dựng tuyến</h1><div class="box"><p>Bạn chưa gặp hoa tiêu nào. Hãy tới Vịnh Người Mua Thuê Tàu trên hải đồ trước.</p></div><div class="res-actions"><button class="btn big" data-a="hub">Về hải đồ</button></div></section>';
      $('[data-a="hub"]', stage).onclick = function () { IG.go('hub'); };
      return;
    }
    var keys = Object.keys(IG.INCIDENTS);
    var tasks = IG.pick(met, 4).map(function (r) {
      return { rule: r.code, clause: r.example, incidents: IG.pick(keys, 2), hint: r.code === 'FCA' ? 'Nơi giao không phải cơ sở người bán.' : r.code === 'CPT' || r.code === 'CIP' ? 'Người bán giao hàng cho người chuyên chở tại điểm tập kết ở nước xuất khẩu.' : '' };
    });
    var root = playShell('Luyện dựng tuyến', 'Bốn tuyến ngẫu nhiên, sự cố ngẫu nhiên.', 'Dựng tuyến');
    IG.modes.route({ id: 'practice' }, root, function (res) { miniResult('Xong lượt luyện', res, 'practice'); }, { tasks: tasks });
  };

  /* ---------- sổ tay ---------- */
  function fourAnswers(r) {
    return '<table class="four"><tr><th>Ai thuê vận tải chặng chính?</th><td class="' + r.carriage + '">' + IG.party(r.carriage) + '</td></tr>' +
      '<tr><th>Ai mua bảo hiểm?</th><td class="' + (r.insurance === 'S' ? 'S' : '') + '">' + IG.insText(r) + '</td></tr>' +
      '<tr><th>Ai thông quan?</th><td>Xuất khẩu: <span class="' + r.exp + '">' + IG.party(r.exp).toLowerCase() + '</span>. Nhập khẩu: <span class="' + r.imp + '">' + IG.party(r.imp).toLowerCase() + '</span></td></tr>' +
      '<tr><th>Rủi ro chuyển ở đâu?</th><td>' + esc(IG.POINTS[r.risk].label) + (r.riskAlt !== undefined ? '. Nếu giao tại cơ sở người bán: ' + esc(IG.POINTS[r.riskAlt].label.toLowerCase()) : '') + '</td></tr>' +
      '<tr><th>Ai dỡ hàng tại nơi đến?</th><td class="' + r.unload + '">' + IG.party(r.unload) + '</td></tr></table>';
  }

  screens.codex = function (p) {
    if (p.code) return ruleDetail(p.code);
    if (p.compare) return compare(p.compare[0], p.compare[1]);
    stage.innerHTML = '<section class="codex"><h1>Sổ tay hoa tiêu</h1><p class="lede">Mười một quy tắc Incoterms® 2020. Mỗi trang mở ra khi bạn gặp hoa tiêu đó trên hải trình. Thanh dưới mỗi thẻ cho biết bạn đã nắm quy tắc ấy tới đâu.</p>' +
      ['E', 'F', 'C', 'D'].map(function (g) {
        return '<div class="grp"><h2>' + IG.GROUPS[g].name + '</h2><p>' + IG.GROUPS[g].desc + '</p><div class="cards">' + IG.RULES.filter(function (r) { return r.group === g; }).map(function (r) {
          var met = IG.state.met[r.code], m = Math.round(IG.srs.mastery(r.code) * 100);
          return '<button class="rcard ' + (met ? '' : 'locked') + '" data-c="' + r.code + '" ' + (met ? '' : 'disabled') + ' style="--c:' + r.color + '"><span class="rcard-face">' + (met ? A.portrait(r.code) : '<span class="ic ic-lock"></span>') + '</span>' +
            '<span class="rcard-body">' + A.badge(r.code) + '<b>' + (met ? esc(r.who) : 'Chưa gặp') + '</b><small>' + esc(r.vn) + '</small>' +
            '<span class="meter" title="Mức thành thạo ' + m + '%"><i style="width:' + m + '%"></i></span></span></button>';
        }).join('') + '</div></div>';
      }).join('') +
      '<div class="box cmp-start"><h2>So sánh hai quy tắc</h2><div class="cmp-pick"><select id="cmpA" aria-label="Quy tắc thứ nhất">' + opts('FOB') + '</select><span>với</span><select id="cmpB" aria-label="Quy tắc thứ hai">' + opts('CIF') + '</select><button class="btn" id="cmpGo">So sánh</button></div></div></section>';
    function opts(sel) { return IG.RULES.map(function (r) { return '<option value="' + r.code + '"' + (r.code === sel ? ' selected' : '') + '>' + r.code + ' – ' + r.vn + '</option>'; }).join(''); }
    $$('.rcard', stage).forEach(function (b) { b.onclick = function () { IG.sfx.click(); IG.go('codex', { code: b.dataset.c }); }; });
    $('#cmpGo', stage).onclick = function () { IG.sfx.click(); IG.go('codex', { compare: [$('#cmpA', stage).value, $('#cmpB', stage).value] }); };
  };

  function ruleDetail(code) {
    var r = IG.rule(code), m = Math.round(IG.srs.mastery(code) * 100);
    stage.innerHTML = '<section class="rule"><button class="link back">Về sổ tay</button><div class="rule-head" style="--c:' + r.color + '"><div class="avatar xl">' + A.portrait(code) + '</div><div>' +
      '<p class="grp-tag">' + IG.GROUPS[r.group].name + ', ' + (r.mode === 'sea' ? 'chỉ đường biển và thủy nội địa' : 'mọi phương thức vận tải') + '</p>' +
      '<h1>' + A.badge(code, 'xl') + ' ' + esc(r.name) + '</h1><p class="vn">' + esc(r.vn) + '</p><blockquote><b>' + esc(r.who) + ':</b> ' + esc(r.line) + '</blockquote></div></div>' +
      '<p class="keyline">' + esc(r.keyword) + '</p>' + A.journey({ risk: r.risk, cost: r.cost }) + A.legend() +
      '<div class="res-grid"><div class="box"><h2>Bốn câu hỏi</h2>' + fourAnswers(r) + '</div>' +
      '<div class="box"><h2>Cách ghi vào hợp đồng</h2><p>' + code + ' + ' + esc(r.named) + ' + Incoterms® 2020</p><p class="clause">' + esc(r.example) + '</p>' +
      '<h2>Mức thành thạo của bạn</h2><span class="meter big"><i style="width:' + m + '%"></i></span><p class="fine">' + m + '%. Tăng khi bạn trả lời đúng các tình huống về ' + code + ', giảm khi trả lời sai.</p></div></div>' +
      '<div class="box"><h2>Lưu ý khi dùng</h2><ul class="take">' + r.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="box"><h2>Dễ nhầm với</h2><div class="confuse">' + r.confuse.map(function (c) { return '<button class="btn ghost" data-c="' + c + '">' + code + ' và ' + c + ' khác nhau thế nào?</button>'; }).join('') + '</div></div></section>';
    $('.back', stage).onclick = function () { IG.go('codex'); };
    $$('.confuse button', stage).forEach(function (b) { b.onclick = function () { IG.sfx.click(); IG.go('codex', { compare: [code, b.dataset.c] }); }; });
    renderHud('codex');
  }

  function compare(ca, cb) {
    var a = IG.rule(ca), b = IG.rule(cb), d = IG.diff(a, b);
    function one(r) {
      return '<div class="cmp-one"><h2>' + A.badge(r.code) + ' ' + esc(r.vn) + '</h2><div class="journey slim"><div class="journey-inner">' + A.points() + A.lane('risk', r.risk) + A.lane('cost', r.cost) + '</div></div></div>';
    }
    stage.innerHTML = '<section class="rule"><button class="link back">Về sổ tay</button><h1>' + ca + ' và ' + cb + '</h1>' +
      '<div class="journey"><div class="journey-inner">' + A.scene() + '</div></div>' + one(a) + one(b) + A.legend() +
      (ca === cb ? '<div class="box"><p>Bạn đang so một quy tắc với chính nó. Chọn hai quy tắc khác nhau ở trang sổ tay.</p></div>' :
        '<div class="box"><h2>Khác nhau ở ' + d.length + ' điểm</h2><table class="difft"><tr><th></th><th>' + ca + '</th><th>' + cb + '</th></tr>' + d.map(function (x) { return '<tr><td>' + x.label + '</td><td>' + esc(x.a) + '</td><td>' + esc(x.b) + '</td></tr>'; }).join('') + '</table>' +
        (d.length === 0 ? '<p>Hai quy tắc này giống nhau ở mọi tiêu chí trong bảng.</p>' : '') + '</div>') + '</section>';
    $('.back', stage).onclick = function () { IG.go('codex'); };
    renderHud('codex');
  }

  /* ---------- bằng hoa tiêu ---------- */
  screens.cert = function () {
    var c = IG.state.cert;
    if (!c) { IG.go('hub'); return; }
    var d = c.date.split('-');
    stage.innerHTML = '<section class="cert-wrap"><div class="cert"><div class="cert-rib">' + IG.RULES.map(function (r) { return A.badge(r.code); }).join('') + '</div>' +
      '<p class="cert-small">Cảng Thập Nhất chứng nhận</p><h1 class="cert-name">' + esc(IG.state.name || 'Hoa tiêu chưa ghi tên') + '</h1>' +
      '<p>đã vượt kỳ sát hạch Incoterms® 2020 với kết quả <b>' + c.pct + '%</b>, đủ năng lực giải thích, phân biệt và vận dụng mười một quy tắc.</p>' +
      '<p class="cert-date">Ngày ' + d[2] + ' tháng ' + d[1] + ' năm ' + d[0] + '</p><div class="cert-seal">' + A.portrait('haiau') + '<span>Chị Hải Âu<br>Trưởng phòng chứng từ</span></div></div>' +
      '<div class="cert-form no-print"><label for="nm">Tên ghi trên bằng</label><input id="nm" maxlength="40" value="' + esc(IG.state.name) + '" placeholder="Nhập tên của bạn" autocomplete="name">' +
      '<button class="btn" id="saveNm">Ghi tên</button><button class="btn ghost" id="printC">In bằng</button><button class="btn ghost" id="backH">Về hải đồ</button></div></section>';
    $('#saveNm', stage).onclick = function () { IG.state.name = $('#nm', stage).value.trim(); IG.save(); IG.go('cert'); };
    $('#printC', stage).onclick = function () { window.print(); };
    $('#backH', stage).onclick = function () { IG.go('hub'); };
  };

  /* ---------- khởi động ---------- */
  document.addEventListener('keydown', function (e) {
    if (dlgOpen) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dlgOpen._advance(); }
      else if (e.key === 'Escape') $('.skip', dlgOpen).click();
      return;
    }
    if (e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
    if (IG.modes.onKey) IG.modes.onKey(e);
  });
  document.addEventListener('DOMContentLoaded', function () {
    stage = document.getElementById('stage'); hud = document.getElementById('hud');
    IG.load();
    IG.go('title');
  });
})();
