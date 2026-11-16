/* Cảng Thập Nhất — hình vẽ: chân dung nhân vật, khung cảnh hành trình, vạch rủi ro và chi phí */
window.IG = window.IG || {};
(function () {
  'use strict';
  var A = IG.art = {};

  /* ---------- chân dung ---------- */
  A.face = function (f, color, mood) {
    mood = mood || 'happy';
    var s = '<svg viewBox="0 0 100 100" class="face" aria-hidden="true">';
    s += '<rect width="100" height="100" fill="' + color + '"/>';
    for (var i = 0; i < 10; i++) s += '<rect x="' + (i * 10 + 4) + '" width="2" height="100" fill="rgba(0,0,0,.09)"/>';
    if (f.extra === 'umbrellaL') {
      s += '<path d="M4 34 Q50 -22 96 34 Q84 26 73 34 Q62 26 50 34 Q38 26 27 34 Q16 26 4 34Z" fill="#fff" stroke="#1d1d1d" stroke-width="2"/>';
      s += '<path d="M88 30 L88 78 Q88 84 82 84" fill="none" stroke="#1d1d1d" stroke-width="2.5"/>';
    }
    s += '<path d="M12 100 Q12 72 50 72 Q88 72 88 100Z" fill="' + f.shirt + '" stroke="#1d1d1d" stroke-width="2"/>';
    s += '<rect x="44" y="60" width="12" height="15" fill="' + f.skin + '"/>';
    if (f.hairStyle === 'long') s += '<path d="M29 40 Q22 62 30 76 L40 70 L36 40Z M71 40 Q78 62 70 76 L60 70 L64 40Z" fill="' + f.hair + '"/>';
    s += '<ellipse cx="50" cy="46" rx="20" ry="22" fill="' + f.skin + '" stroke="#1d1d1d" stroke-width="2"/>';
    if (f.hairStyle === 'bald') {
      s += '<path d="M30 48 Q28 38 33 33 L35 47Z M70 48 Q72 38 67 33 L65 47Z" fill="' + f.hair + '"/>';
    } else {
      s += '<path d="M30 44 Q29 23 50 23 Q71 23 70 44 Q63 33 50 33 Q37 33 30 44Z" fill="' + f.hair + '"/>';
      if (f.hairStyle === 'bun') s += '<circle cx="50" cy="19" r="8" fill="' + f.hair + '"/>';
    }
    if (f.extra === 'beard') s += '<path d="M31 50 Q33 71 50 71 Q67 71 69 50 Q61 61 50 61 Q39 61 31 50Z" fill="' + f.hair + '"/>';
    /* mắt, mày */
    var brow = mood === 'worry' ? ['M37 40 L46 37', 'M63 40 L54 37'] : mood === 'stern' ? ['M37 37 L46 40', 'M63 37 L54 40'] : ['M37 39 L46 38', 'M63 39 L54 38'];
    s += '<path d="' + brow[0] + ' ' + brow[1] + '" stroke="#1d1d1d" stroke-width="2.2" stroke-linecap="round" fill="none"/>';
    s += '<circle cx="42" cy="46" r="2.7" fill="#1d1d1d"/><circle cx="58" cy="46" r="2.7" fill="#1d1d1d"/>';
    if (f.extra === 'glasses') s += '<circle cx="42" cy="46" r="6.5" fill="rgba(255,255,255,.35)" stroke="#1d1d1d" stroke-width="2"/><circle cx="58" cy="46" r="6.5" fill="rgba(255,255,255,.35)" stroke="#1d1d1d" stroke-width="2"/><path d="M48.5 46 L51.5 46" stroke="#1d1d1d" stroke-width="2"/>';
    /* miệng */
    if (mood === 'talk') s += '<ellipse cx="50" cy="58.5" rx="4.5" ry="3.4" fill="#7a2a2a"/>';
    else if (mood === 'worry') s += '<path d="M43 60 Q50 55 57 60" stroke="#1d1d1d" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    else if (mood === 'stern') s += '<path d="M44 58.5 L56 58.5" stroke="#1d1d1d" stroke-width="2.2" stroke-linecap="round"/>';
    else s += '<path d="M42 56 Q50 64 58 56" stroke="#1d1d1d" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    if (f.extra === 'mustache') s += '<path d="M39 54 Q45 49 50 53 Q55 49 61 54 Q55 57 50 55 Q45 57 39 54Z" fill="' + f.hair + '"/>';
    /* mũ */
    var hc = f.hatColor || '#333';
    if (f.hat === 'cap') s += '<path d="M29 36 Q30 17 50 17 Q70 17 71 36Z" fill="' + hc + '" stroke="#1d1d1d" stroke-width="2"/><path d="M28 34 L82 34 Q84 39 78 39 L28 39Z" fill="' + hc + '" stroke="#1d1d1d" stroke-width="2"/>';
    if (f.hat === 'hardhat') s += '<path d="M28 36 Q28 13 50 13 Q72 13 72 36Z" fill="' + hc + '" stroke="#1d1d1d" stroke-width="2"/><rect x="23" y="33" width="54" height="6" rx="3" fill="' + hc + '" stroke="#1d1d1d" stroke-width="2"/><rect x="47" y="13" width="6" height="20" fill="rgba(255,255,255,.4)"/>';
    if (f.hat === 'captain') s += '<path d="M25 30 Q50 6 75 30Z" fill="#fff" stroke="#1d1d1d" stroke-width="2"/><rect x="29" y="28" width="42" height="8" fill="' + hc + '" stroke="#1d1d1d" stroke-width="2"/><path d="M29 36 Q50 41 71 36 L71 38 Q50 46 29 38Z" fill="#1d1d1d"/><circle cx="50" cy="22" r="4" fill="#f5c518" stroke="#1d1d1d" stroke-width="1.5"/>';
    if (f.hat === 'tophat') s += '<rect x="34" y="3" width="32" height="27" fill="' + hc + '" stroke="#1d1d1d" stroke-width="2"/><rect x="34" y="22" width="32" height="5" fill="#f5c518"/><rect x="23" y="28" width="54" height="6" rx="3" fill="' + hc + '" stroke="#1d1d1d" stroke-width="2"/>';
    if (f.hat === 'beanie') s += '<path d="M29 38 Q29 13 50 13 Q71 13 71 38Z" fill="' + hc + '" stroke="#1d1d1d" stroke-width="2"/><rect x="27" y="31" width="46" height="8" rx="3" fill="' + hc + '" stroke="#1d1d1d" stroke-width="2"/>';
    if (f.hat === 'conical') s += '<path d="M10 38 L50 7 L90 38 Q50 47 10 38Z" fill="' + hc + '" stroke="#1d1d1d" stroke-width="2"/><path d="M50 7 L36 40 M50 7 L64 40" stroke="rgba(0,0,0,.2)" stroke-width="1.5"/>';
    if (f.extra === 'umbrellaS') {
      s += '<path d="M66 22 Q79 2 92 22 Q85.5 18 79 22 Q72.5 18 66 22Z" fill="#fff" stroke="#1d1d1d" stroke-width="2"/>';
      s += '<path d="M79 20 L79 44" stroke="#1d1d1d" stroke-width="2.5"/>';
    }
    return s + '</svg>';
  };

  A.portrait = function (who, mood) {
    var r = IG.rule(who);
    if (r) return A.face(r.face, r.color, mood);
    var c = IG.CAST[who] || IG.CAST.khach;
    return A.face(c.face, c.color, mood);
  };
  A.whoName = function (who) {
    var r = IG.rule(who);
    return r ? r.who + ' (' + r.code + ')' : (IG.CAST[who] || IG.CAST.khach).who;
  };

  /* nhãn quy tắc kiểu đầu container */
  A.badge = function (code, extraClass) {
    var r = IG.rule(code);
    return '<span class="rb ' + (extraClass || '') + '" style="--c:' + r.color + '"><b>' + code + '</b></span>';
  };

  A.stars = function (n, max) {
    var s = '<span class="stars" aria-label="' + n + ' trên ' + (max || 3) + ' sao">';
    for (var i = 0; i < (max || 3); i++) s += '<i class="' + (i < n ? 'on' : '') + '"></i>';
    return s + '</span>';
  };

  /* ---------- khung cảnh hành trình ---------- */
  A.scene = function () {
    var ink = '#12313d';
    function truck(x) {
      return '<g><rect x="' + (x - 22) + '" y="127" width="36" height="18" fill="#e9eef0" stroke="' + ink + '" stroke-width="2"/>' +
        '<path d="M' + (x - 13) + ' 127 v18 M' + (x - 4) + ' 127 v18 M' + (x + 5) + ' 127 v18" stroke="' + ink + '" stroke-width="1" opacity=".35"/>' +
        '<path d="M' + (x + 14) + ' 133 h9 l5 6 v6 h-14Z" fill="#f5c518" stroke="' + ink + '" stroke-width="2"/>' +
        '<circle cx="' + (x - 13) + '" cy="147" r="4.5" fill="' + ink + '"/><circle cx="' + (x + 4) + '" cy="147" r="4.5" fill="' + ink + '"/><circle cx="' + (x + 21) + '" cy="147" r="4.5" fill="' + ink + '"/></g>';
    }
    function gate(x, label) {
      return '<g><rect x="' + (x - 3) + '" y="118" width="6" height="32" fill="' + ink + '"/>' +
        '<rect x="' + (x + 3) + '" y="124" width="34" height="5" fill="#fff" stroke="' + ink + '" stroke-width="1.5"/>' +
        '<path d="M' + (x + 9) + ' 124 v5 M' + (x + 17) + ' 124 v5 M' + (x + 25) + ' 124 v5" stroke="#d93a3a" stroke-width="4"/>' +
        '<rect x="' + (x - 26) + '" y="98" width="52" height="18" rx="2" fill="#fff" stroke="' + ink + '" stroke-width="2"/>' +
        '<text x="' + x + '" y="111" text-anchor="middle" font-size="11" font-weight="700" fill="' + ink + '">' + label + '</text></g>';
    }
    function ship(x) {
      return '<g><path d="M' + x + ' 150 h112 l-11 22 h-90Z" fill="#17495c" stroke="' + ink + '" stroke-width="2"/>' +
        '<rect x="' + (x + 12) + '" y="138" width="20" height="12" fill="#f47b20" stroke="' + ink + '" stroke-width="1.5"/>' +
        '<rect x="' + (x + 34) + '" y="138" width="20" height="12" fill="#2f9e63" stroke="' + ink + '" stroke-width="1.5"/>' +
        '<rect x="' + (x + 56) + '" y="138" width="20" height="12" fill="#d6247a" stroke="' + ink + '" stroke-width="1.5"/>' +
        '<rect x="' + (x + 34) + '" y="126" width="20" height="12" fill="#f5c518" stroke="' + ink + '" stroke-width="1.5"/>' +
        '<rect x="' + (x + 82) + '" y="122" width="20" height="28" fill="#fff" stroke="' + ink + '" stroke-width="2"/>' +
        '<rect x="' + (x + 86) + '" y="127" width="12" height="4" fill="' + ink + '"/>' +
        '<rect x="' + (x + 88) + '" y="110" width="8" height="12" fill="#d93a3a" stroke="' + ink + '" stroke-width="1.5"/></g>';
    }
    function crane(x) {
      return '<g stroke="' + ink + '" stroke-width="2" fill="#f5c518"><rect x="' + (x - 14) + '" y="92" width="5" height="58"/><rect x="' + (x + 8) + '" y="92" width="5" height="58"/>' +
        '<rect x="' + (x - 24) + '" y="85" width="84" height="7"/><rect x="' + (x + 34) + '" y="92" width="10" height="6" fill="' + ink + '"/>' +
        '<path d="M' + (x + 39) + ' 98 v16" fill="none"/><rect x="' + (x + 32) + '" y="114" width="14" height="9" fill="#2378c9"/></g>';
    }
    var s = '<svg class="scene" viewBox="0 0 1000 200" role="img" aria-label="Hành trình hàng hóa từ xưởng người bán tới nơi đến ở nước nhập khẩu">';
    s += '<rect x="425" y="160" width="275" height="40" fill="#8fcfd3"/>';
    s += '<path d="M425 160 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 v6 h-275Z" fill="#b9e3e4"/>';
    s += '<rect x="0" y="150" width="425" height="50" fill="#c9d5d2"/><rect x="0" y="150" width="425" height="4" fill="' + ink + '"/>';
    s += '<rect x="700" y="150" width="300" height="50" fill="#c9d5d2"/><rect x="700" y="150" width="300" height="4" fill="' + ink + '"/>';
    s += '<text x="8" y="18" font-size="14" font-weight="700" fill="' + ink + '">Nước xuất khẩu</text>';
    s += '<text x="992" y="18" text-anchor="end" font-size="14" font-weight="700" fill="' + ink + '">Nước nhập khẩu</text>';
    /* xưởng */
    s += '<rect x="90" y="66" width="10" height="38" fill="#7d8f95" stroke="' + ink + '" stroke-width="2"/>';
    s += '<path d="M18 104 V86 L40 104 V86 L62 104 V86 L84 104 H106 V150 H18Z" fill="#f47b20" stroke="' + ink + '" stroke-width="2"/>';
    s += '<rect x="50" y="124" width="22" height="26" fill="' + ink + '"/>';
    s += truck(150) + gate(232, 'HQ xuất');
    /* bãi container */
    s += '<g stroke="' + ink + '" stroke-width="1.5"><rect x="276" y="136" width="24" height="14" fill="#2378c9"/><rect x="302" y="136" width="24" height="14" fill="#d6247a"/><rect x="289" y="122" width="24" height="14" fill="#2f9e63"/></g>';
    s += crane(404) + ship(436);
    s += '<path d="M556 136 Q574 120 592 136" fill="none" stroke="' + ink + '" stroke-width="2" stroke-dasharray="5 5"/><path d="M588 128 l5 8 l-9 1Z" fill="' + ink + '"/>';
    s += ship(586);
    s += '<g stroke="' + ink + '" stroke-width="2" fill="#f5c518"><rect x="708" y="96" width="5" height="54"/><rect x="726" y="96" width="5" height="54"/><rect x="664" y="89" width="74" height="7"/></g>';
    s += gate(790, 'HQ nhập') + truck(872);
    /* kho người mua */
    s += '<path d="M920 112 L957 92 L994 112Z" fill="#17495c" stroke="' + ink + '" stroke-width="2"/><rect x="925" y="112" width="64" height="38" fill="#2378c9" stroke="' + ink + '" stroke-width="2"/><rect x="946" y="126" width="22" height="24" fill="' + ink + '"/>';
    var lab = [[62, 'Xưởng người bán'], [300, 'Bãi, ga, sân bay'], [388, 'Cảng đi'], [736, 'Cảng đến'], [940, 'Nơi đến']];
    lab.forEach(function (l) { s += '<text x="' + l[0] + '" y="180" text-anchor="middle" font-size="13" font-weight="600" fill="' + ink + '">' + l[1] + '</text>'; });
    return s + '</svg>';
  };

  A.pct = function (x) { return (x / 10) + '%'; };

  /* hàng nhãn 8 mốc */
  A.points = function () {
    return '<div class="pts">' + IG.POINTS.map(function (p, i) {
      return '<span class="pt ' + (i % 2 ? 'low' : '') + '" style="left:' + A.pct(p.x) + '" title="' + IG.esc(p.label) + '"><i></i><em>' + p.short + '</em></span>';
    }).join('') + '</div>';
  };

  /* một vạch chỉ để xem. idx = mốc chuyển giao, null = chưa lộ */
  A.lane = function (kind, idx) {
    var name = kind === 'risk' ? 'Rủi ro về hàng hóa' : 'Chi phí';
    var icon = kind === 'risk' ? '<span class="ic ic-flag"></span>' : '<span class="ic ic-coin"></span>';
    if (idx === null || idx === undefined) {
      return '<div class="lane lane-' + kind + ' hidden-lane"><div class="lane-name">' + icon + name + '</div><div class="lane-bar"><span class="lane-q">Trả lời xong sẽ hiện</span></div></div>';
    }
    var x = A.pct(IG.POINTS[idx].x);
    return '<div class="lane lane-' + kind + '"><div class="lane-name">' + icon + name + '</div>' +
      '<div class="lane-bar"><div class="fill-s" style="width:' + x + '"></div><span class="handle" style="left:' + x + '">' + icon + '</span></div></div>';
  };

  A.legend = function () {
    return '<div class="legend"><span><i class="sw sw-s"></i>Người bán chịu</span><span><i class="sw sw-b"></i>Người mua chịu</span></div>';
  };

  /* hành trình chỉ để xem, dùng trong sổ tay và phần giải thích */
  A.journey = function (opt) {
    opt = opt || {};
    var mark = opt.marker !== undefined ? '<span class="mark" style="left:' + A.pct(opt.marker) + '" aria-label="Vị trí xảy ra sự cố">!</span>' : '';
    return '<div class="journey"><div class="journey-inner">' + A.scene() + mark + A.points() +
      A.lane('risk', opt.risk) + (opt.noCost ? '' : A.lane('cost', opt.cost)) + '</div></div>';
  };

  A.riskIdx = function (rule, variant) { return variant === 1 && rule.riskAlt !== undefined ? rule.riskAlt : rule.risk; };
})();
