/* Cảng Thập Nhất — lõi: trạng thái, lưu tiến độ, âm thanh, ôn tập ngắt quãng, tiện ích */
window.IG = window.IG || {};
(function () {
  'use strict';
  var KEY = 'cang-thap-nhat-v1';

  /* ---------- tiện ích ---------- */
  IG.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  IG.h = function (html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };
  IG.$ = function (sel, root) { return (root || document).querySelector(sel); };
  IG.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  IG.shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  IG.pick = function (arr, n) { return IG.shuffle(arr).slice(0, n); };
  IG.money = function (n) { return n.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  IG.party = function (p) { return p === 'S' ? 'Người bán' : 'Người mua'; };

  /* ---------- trạng thái ---------- */
  function fresh() {
    return { v: 1, name: '', xp: 0, levels: {}, srs: {}, met: {}, seen: {}, sound: true, cert: null, last: null };
  }
  IG.state = fresh();
  IG.load = function () {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var s = JSON.parse(raw);
        if (s && s.v === 1) { IG.state = Object.assign(fresh(), s); return true; }
      }
    } catch (e) { /* trình duyệt chặn lưu trữ: chơi không lưu */ }
    return false;
  };
  IG.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(IG.state)); return true; } catch (e) { return false; }
  };
  IG.reset = function () {
    IG.state = fresh();
    try { localStorage.removeItem(KEY); } catch (e) { /* bỏ qua */ }
  };
  IG.hasProgress = function () { return Object.keys(IG.state.levels).length > 0 || IG.state.xp > 0; };

  /* ---------- màn chơi, mở khóa, cấp bậc ---------- */
  IG.allLevels = function () {
    var out = [];
    IG.CHAPTERS.forEach(function (ch) { ch.levels.forEach(function (lv) { out.push({ ch: ch, lv: lv }); }); });
    return out;
  };
  IG.findLevel = function (id) {
    return IG.allLevels().find(function (x) { return x.lv.id === id; });
  };
  IG.stars = function (id) { var r = IG.state.levels[id]; return r ? r.stars : 0; };
  IG.isUnlocked = function (id) {
    var all = IG.allLevels();
    var i = all.findIndex(function (x) { return x.lv.id === id; });
    if (i <= 0) return true;
    return IG.stars(all[i - 1].lv.id) >= 1;
  };
  IG.chapterUnlocked = function (ch) { return IG.isUnlocked(ch.levels[0].id); };
  IG.nextLevel = function (id) {
    var all = IG.allLevels();
    var i = all.findIndex(function (x) { return x.lv.id === id; });
    return i >= 0 && i < all.length - 1 ? all[i + 1] : null;
  };
  IG.currentChapter = function () {
    var cur = IG.CHAPTERS[0];
    IG.CHAPTERS.forEach(function (ch) { if (IG.chapterUnlocked(ch)) cur = ch; });
    return cur;
  };
  IG.totalStars = function () {
    var got = 0, max = 0;
    IG.allLevels().forEach(function (x) { got += IG.stars(x.lv.id); max += 3; });
    return { got: got, max: max };
  };
  IG.starsFor = function (ratio) { return ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.5 ? 1 : 0; };
  IG.rank = function () {
    var r = IG.RANKS[0], next = null;
    IG.RANKS.forEach(function (x, i) { if (IG.state.xp >= x.xp) { r = x; next = IG.RANKS[i + 1] || null; } });
    return { cur: r, next: next };
  };
  IG.finishLevel = function (id, score, max) {
    var ratio = max ? score / max : 0;
    var stars = IG.starsFor(ratio);
    var prev = IG.state.levels[id] || { stars: 0, best: 0, plays: 0 };
    /* mỗi màn tối đa 100 điểm theo tỷ lệ đúng, cộng 20 cho mỗi sao mới; chơi lại chỉ được một nửa phần điểm */
    var gain = Math.round(ratio * 100 * (prev.plays > 0 ? 0.5 : 1)) + (stars > prev.stars ? (stars - prev.stars) * 20 : 0);
    IG.state.levels[id] = { stars: Math.max(prev.stars, stars), best: Math.max(prev.best, ratio), plays: prev.plays + 1 };
    var before = IG.rank().cur.name;
    IG.state.xp += gain;
    IG.state.last = id;
    IG.save();
    return { stars: stars, gain: gain, ratio: ratio, rankUp: IG.rank().cur.name !== before ? IG.rank().cur.name : null, firstClear: prev.stars < 1 && stars >= 1 };
  };

  /* ---------- ôn tập ngắt quãng (hộp Leitner 0..3) ---------- */
  IG.srs = {
    record: function (id, ok) {
      var s = IG.state.srs[id] || { box: 0, right: 0, wrong: 0, last: 0 };
      if (ok) { s.box = Math.min(3, s.box + 1); s.right++; } else { s.box = 0; s.wrong++; }
      s.last = Date.now();
      IG.state.srs[id] = s;
    },
    due: function (n) {
      var wait = [0, 10 * 60e3, 24 * 3600e3, 72 * 3600e3];
      var now = Date.now();
      var ids = Object.keys(IG.state.srs).filter(function (id) {
        var s = IG.state.srs[id];
        return IG.ITEMS[id] && (s.box === 0 || (s.box < 3 && now - s.last >= wait[s.box]));
      });
      ids.sort(function (a, b) {
        var x = IG.state.srs[a], y = IG.state.srs[b];
        return x.box - y.box || x.last - y.last;
      });
      return ids.slice(0, n);
    },
    weakCount: function () {
      return Object.keys(IG.state.srs).filter(function (id) { return IG.ITEMS[id] && IG.state.srs[id].box === 0; }).length;
    },
    /* độ thành thạo một quy tắc: trung bình hộp của các câu gắn thẻ quy tắc đó */
    mastery: function (code) {
      var ids = Object.keys(IG.ITEMS).filter(function (id) { return (IG.ITEMS[id].tags || []).indexOf(code) >= 0; });
      ids.push('route-' + code);
      var sum = 0;
      ids.forEach(function (id) { var s = IG.state.srs[id]; if (s) sum += Math.min(3, s.box) / 3; });
      return ids.length ? sum / ids.length : 0;
    }
  };

  /* các câu thuộc những màn đã mở */
  IG.unlockedItems = function () {
    var ids = [];
    IG.allLevels().forEach(function (x) {
      if (x.lv.items && IG.isUnlocked(x.lv.id)) ids = ids.concat(x.lv.items);
    });
    return ids;
  };

  /* ---------- so sánh hai quy tắc ---------- */
  IG.diff = function (a, b) {
    var out = [];
    function line(label, va, vb) { if (va !== vb) out.push({ label: label, a: va, b: vb }); }
    line('Phương thức vận tải', a.mode === 'sea' ? 'Chỉ đường biển, thủy nội địa' : 'Mọi phương thức', b.mode === 'sea' ? 'Chỉ đường biển, thủy nội địa' : 'Mọi phương thức');
    line('Rủi ro chuyển tại', IG.POINTS[a.risk].label, IG.POINTS[b.risk].label);
    line('Người bán trả chi phí tới', IG.POINTS[a.cost].short, IG.POINTS[b.cost].short);
    line('Thuê vận tải chặng chính', IG.party(a.carriage), IG.party(b.carriage));
    line('Bảo hiểm', insText(a), insText(b));
    line('Thông quan xuất khẩu', IG.party(a.exp), IG.party(b.exp));
    line('Thông quan nhập khẩu', IG.party(a.imp), IG.party(b.imp));
    line('Dỡ hàng tại nơi đến', IG.party(a.unload), IG.party(b.unload));
    return out;
  };
  function insText(r) {
    return r.insurance === 'S' ? 'Người bán buộc phải mua, mặc định (' + r.insClause + ')' : 'Không ai bị buộc phải mua';
  }
  IG.insText = insText;

  /* ---------- âm thanh ---------- */
  var ctx = null;
  function tone(freq, dur, type, when, vol) {
    if (!IG.state.sound) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      var t = ctx.currentTime + (when || 0);
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol || 0.12, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + dur + 0.02);
    } catch (e) { /* không có âm thanh cũng không sao */ }
  }
  IG.sfx = {
    click: function () { tone(520, 0.06, 'triangle', 0, 0.06); },
    ok: function () { tone(660, 0.1, 'triangle'); tone(990, 0.16, 'triangle', 0.09); },
    bad: function () { tone(220, 0.18, 'sawtooth', 0, 0.07); tone(160, 0.22, 'sawtooth', 0.12, 0.07); },
    flag: function () { tone(440, 0.07, 'square', 0, 0.05); },
    alarm: function () { tone(700, 0.1, 'square', 0, 0.05); tone(500, 0.14, 'square', 0.12, 0.05); },
    horn: function () { tone(130, 0.5, 'sawtooth', 0, 0.08); tone(196, 0.5, 'sawtooth', 0, 0.05); },
    win: function () { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.22, 'triangle', i * 0.11); }); }
  };
})();
