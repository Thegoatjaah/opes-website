/* Opes Black Friday gift, 2026.
   Hides three gifts on the page. Opening one shows wrapping paper to tear and a 3D monitor with the BFCM plan.
   Needs bfcm/bfcm.css. Loads three.js from jsDelivr only when someone opens a gift.
   Switches itself off after Cyber Monday (1 Dec 2026). */
(() => {
const GIFT_HTML = "<button class=\"obf-gift\" id=\"obf-gift\" type=\"button\" aria-label=\"Open the Opes Black Friday gift\" hidden>\n    <span class=\"obf-tag\">Black Friday</span>\n    <svg viewBox=\"0 0 64 64\" aria-hidden=\"true\">\n      <rect x=\"9\" y=\"27\" width=\"46\" height=\"31\" rx=\"3\" fill=\"#0A0C19\"/>\n      <rect x=\"6\" y=\"19\" width=\"52\" height=\"11\" rx=\"3\" fill=\"#141830\"/>\n      <rect x=\"28\" y=\"19\" width=\"8\" height=\"39\" fill=\"#0094FF\"/>\n            <path d=\"M32 19c-3-8-14-12-15-5-1 5 9 6 15 5z\" fill=\"#0094FF\"/>\n      <path d=\"M32 19c3-8 14-12 15-5 1 5-9 6-15 5z\" fill=\"#0094FF\"/>\n      <path d=\"M32 19c-2.6-5.4-9.6-8.4-10.6-4.6-.6 2.8 5.6 4.3 10.6 4.6z\" fill=\"#5CC6FF\" opacity=\".55\"/>\n      <circle cx=\"32\" cy=\"19\" r=\"3.4\" fill=\"#0077CC\"/>\n      <path d=\"M13 30v25\" stroke=\"#fff\" stroke-opacity=\".08\" stroke-width=\"3\"/>\n    </svg>\n  </button>";
const OVERLAY_HTML = "<div class=\"obf\" id=\"obf-bf\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Opes Black Friday\" hidden>\n  <section class=\"obf-stage\" id=\"obf-stage\">\n    <canvas class=\"obf-gl\" id=\"obf-gl\" aria-label=\"A retro Opes monitor showing the Black Friday and Cyber Monday plan. Use the channel buttons below to change what it shows.\"></canvas>\n    <div class=\"obf-glow\"></div>\n    <div class=\"obf-topbar\">\n      <div class=\"obf-mark\"><svg viewBox=\"0 0 64 64\" aria-hidden=\"true\" id=\"obf-markSvg\"></svg>OPES \u00b7 BFCM 2026</div>\n      <button class=\"obf-close\" id=\"obf-bfClose\" type=\"button\" aria-label=\"Close and go back to the site\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M3 3l10 10M13 3L3 13\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg></button>\n    </div>\n    <p class=\"obf-drag-note\">Drag the monitor to turn it \u00b7 press its buttons to change channel</p>\n    <div class=\"obf-channels\" role=\"group\" aria-label=\"Monitor channels\" id=\"obf-channels\">\n      <button type=\"button\" data-ch=\"0\" aria-pressed=\"true\"><b>1</b>Countdown</button>\n      <button type=\"button\" data-ch=\"1\" aria-pressed=\"false\"><b>2</b><span class=\"obf-long\">The flows</span><span class=\"obf-short\">Flows</span></button>\n      <button type=\"button\" data-ch=\"2\" aria-pressed=\"false\"><b>3</b><span class=\"obf-long\">Before and after purchase</span><span class=\"obf-short\">Purchase</span></button>\n      <button type=\"button\" data-ch=\"3\" aria-pressed=\"false\"><b>4</b>November</button>\n    </div>\n\n    <div class=\"obf-paper obf-wrap-in\" id=\"obf-paper\">\n      <canvas id=\"obf-paperCanvas\"></canvas>\n    </div>\n    <svg class=\"obf-hand\" id=\"obf-hand\" viewBox=\"0 0 48 48\" aria-hidden=\"true\"><circle cx=\"16\" cy=\"14\" r=\"12\" fill=\"#fff\" opacity=\".35\"/><path d=\"M14 8c0-2 3-2 3 0v14l1-6c.4-2 3.3-1.7 3 .3l-.5 6 1.6-4.4c.7-1.9 3.4-1 2.9.9l-1.3 5 1.8-3c1-1.7 3.4-.4 2.6 1.4L24.6 34c-1.6 4-5 6-9 6-5 0-8-3-9-8l-1.8-7c-.5-2 2.2-3 3.1-1.1L10 29V8z\" fill=\"#fff\" stroke=\"#0A0C19\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/></svg>\n    <div class=\"obf-tear-hint\" id=\"obf-tearHint\">\n      <svg viewBox=\"0 0 20 20\" aria-hidden=\"true\"><path d=\"M3 12l4-4 3 3 7-7\" stroke=\"#5CC6FF\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M12 4h5v5\" stroke=\"#5CC6FF\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n      Drag across the paper to tear it\n      <button type=\"button\" id=\"obf-autoTear\">Open it for me</button>\n    </div>\n  </section>\n\n  <section class=\"obf-offer\" id=\"obf-offer\" aria-labelledby=\"obf-offerTitle\">\n    <div class=\"obf-offer-in\">\n      <h2 id=\"obf-offerTitle\"><span class=\"obf-big\" id=\"obf-offerBig\">20% off</span>your whole <em>Black Friday</em> programme.</h2>\n      <div>\n        <p>We plan, write, design and automate the lot: early access, Black Friday, the weekend, Cyber Monday, and every flow before and after the purchase. You just watch the orders come in.</p>\n        <p id=\"obf-offerDeadline\">Book your BFCM call before Friday 6 November to lock in 20% off and give us time to warm up your list.</p>\n        <div class=\"obf-row\">\n          <a class=\"obf-pill obf-pill-navy\" href=\"https://opesconsulting.london/book.html\" target=\"_blank\" rel=\"noopener\">Book a BFCM call</a>\n          <button type=\"button\" class=\"obf-ghost-link\" id=\"obf-backToSite\">Back to the site</button>\n        </div>\n        <div class=\"obf-guarantee\">\n          <svg width=\"22\" height=\"22\" viewBox=\"0 0 20 20\" aria-hidden=\"true\" style=\"flex:none;margin-top:2px\"><circle cx=\"10\" cy=\"10\" r=\"10\" fill=\"#0A0C19\"/><path d=\"M5.5 10.2l3 3 6-6.4\" stroke=\"#fff\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n          <div><strong>You don\u2019t pay unless we deliver on our promise.</strong>Your Performance Threshold is agreed on the call, in writing, before any work starts.</div>\n        </div>\n        <p class=\"obf-terms\">Black Friday is Friday 27 November 2026. Cyber Monday is Monday 30 November 2026.</p>\n      </div>\n    </div>\n  </section>\n  <footer class=\"obf-foot\">\n    <span>Opes Consulting \u00b7 London</span>\n    <span id=\"obf-footCount\"></span>\n  </footer>\n</div>\n";
/* ============ CRT screen UI, drawn into a canvas that becomes the monitor's glass ============ */
const SCREEN = (() => {
  const W = 1280, H = 960;
  const ui = document.createElement('canvas'); ui.width = W; ui.height = H;
  const out = document.createElement('canvas'); out.width = W; out.height = H;
  const u = ui.getContext('2d'), o = out.getContext('2d');
  const C = {
    bg: '#06101E', text: '#EAF4FF', dim: '#8FA9C6', faint: 'rgba(143,169,198,.35)',
    blue: '#0094FF', neon: '#5CC6FF', amber: '#FFB547', navy: '#0A0C19'
  };
  const SANS = 'Aspekta, system-ui, sans-serif';
  const SERIF = 'Newsreader, Georgia, serif';
  const TABS = ['Countdown', 'Flows', 'Before and after', 'November'];
  const EA = Date.UTC(2026, 10, 26, 18), BF = Date.UTC(2026, 10, 27, 0), BF_OPEN = Date.UTC(2026, 10, 27, 7),
        CM = Date.UTC(2026, 10, 30, 0), CM_END = Date.UTC(2026, 11, 1, 0);

  let tab = 0, compact = false, hits = [], flip = 0;
  let power = 1, powerTarget = 1, switchT = 0, osdT = 0, switchEnd = 0, osdEnd = 0;

  // overlay: scanlines + vignette, drawn once
  const fx = document.createElement('canvas'); fx.width = W; fx.height = H;
  (() => {
    const f = fx.getContext('2d');
    f.fillStyle = 'rgba(0,0,0,.22)';
    for (let y = 0; y < H; y += 3) f.fillRect(0, y, W, 1);
    const g = f.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * .82);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.62)');
    f.fillStyle = g; f.fillRect(0, 0, W, H);
  })();
  const noise = document.createElement('canvas'); noise.width = 320; noise.height = 240;
  const nctx = noise.getContext('2d'); const nimg = nctx.createImageData(320, 240);

  function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
  function t(c, s, x, y, font, color, align = 'left', base = 'alphabetic') {
    c.font = font; c.fillStyle = color; c.textAlign = align; c.textBaseline = base; c.fillText(s, x, y);
  }
  function tracked(c, s, x, y, size, color, align = 'left', spacing = .14) {
    c.font = `600 ${size}px ${SANS}`; c.fillStyle = color; c.textBaseline = 'alphabetic';
    if ('letterSpacing' in c) { c.letterSpacing = `${spacing * size}px`; c.textAlign = align; c.fillText(s, x, y); c.letterSpacing = '0px'; }
    else { c.textAlign = align; c.fillText(s, x, y); }
  }
  function mark(c, cx, cy, R, ring, arc) {
    const r = R * .62, g = .6;
    c.fillStyle = ring; c.beginPath();
    c.arc(cx, cy, R, -Math.PI + g, Math.PI - g, false);
    c.arc(cx, cy, r, Math.PI - g, -Math.PI + g, true); c.closePath(); c.fill();
    const ax = cx - R * .2, ga = .5;
    c.fillStyle = arc; c.beginPath();
    c.arc(ax, cy, R, Math.PI - ga, Math.PI + ga, false);
    c.arc(ax, cy, r * 1.08, Math.PI + ga * .92, Math.PI - ga * .92, true); c.closePath(); c.fill();
  }
  function arrow(c, x1, y1, x2, y2, color) {
    c.strokeStyle = color; c.lineWidth = 3; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2 - 8, y2); c.stroke();
    c.fillStyle = color; c.beginPath(); c.moveTo(x2, y2); c.lineTo(x2 - 12, y2 - 7); c.lineTo(x2 - 12, y2 + 7); c.fill();
  }
  function remain(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
  }
  const pad = n => String(n).padStart(2, '0');
  function daysTo(ts) { return Math.floor((ts - Date.now()) / 86400000); }
  function whenLabel(start, end) {
    const now = Date.now();
    if (now >= end) return 'Done';
    if (now >= start) return 'Live now';
    const d = daysTo(start);
    return d < 1 ? 'Today' : d < 2 ? 'Tomorrow' : `in ${d} days`;
  }

  /* ---------- top bar ---------- */
  function topBar() {
    hits = [];
    mark(u, 92, 94, 22, C.text, C.blue);
    t(u, 'BFCM 26', 128, 104, `700 ${compact ? 40 : 28}px ${SANS}`, C.text);
    if (compact) {
      tracked(u, `CH ${tab + 1}  ${TABS[tab].toUpperCase()}`, 1216, 104, 30, C.neon, 'right', .1);
      return;
    }
    u.font = `600 24px ${SANS}`;
    const widths = TABS.map(s => u.measureText(s).width + 30 + 8 + 36);
    let x = 1216 - widths.reduce((a, b) => a + b, 0) - 12 * 3;
    TABS.forEach((s, i) => {
      const w = widths[i], y = 66, h = 56, on = i === tab;
      rr(u, x, y, w, h, 28);
      if (on) { u.fillStyle = C.blue; u.fill(); } else { u.strokeStyle = C.faint; u.lineWidth = 2; u.stroke(); }
      u.beginPath(); u.arc(x + 18 + 15, y + h / 2, 15, 0, 7); u.fillStyle = on ? '#fff' : 'rgba(143,169,198,.18)'; u.fill();
      t(u, String(i + 1), x + 33, y + h / 2 + 1, `700 18px ${SANS}`, on ? C.blue : C.dim, 'center', 'middle');
      t(u, s, x + 18 + 30 + 8, y + h / 2 + 1, `600 24px ${SANS}`, on ? '#fff' : C.dim, 'left', 'middle');
      hits.push({ x, y, w, h, tab: i });
      x += w + 12;
    });
  }

  /* ---------- 1. countdown ---------- */
  function drawCountdown() {
    const r = remain(BF - Date.now());
    const live = Date.now() >= BF;
    if (!compact) {
      t(u, live ? 'Black Friday is live' : 'Black Friday opens in', 640, 214, `italic 400 48px ${SERIF}`, C.dim, 'center');
      const vals = [[r.d, 'DAYS'], [r.h, 'HOURS'], [r.m, 'MINUTES'], [r.s, 'SECONDS']];
      const bw = 236, gap = 26, x0 = (W - (bw * 4 + gap * 3)) / 2, y = 250, bh = 290;
      vals.forEach(([v, l], i) => {
        const x = x0 + i * (bw + gap);
        rr(u, x, y, bw, bh, 20); u.fillStyle = 'rgba(92,198,255,.07)'; u.fill();
        u.strokeStyle = 'rgba(92,198,255,.32)'; u.lineWidth = 2; u.stroke();
        const s = i === 0 ? String(v) : pad(v);
        t(u, s, x + bw / 2, y + 190, `400 ${s.length > 2 ? 150 : 184}px ${SERIF}`, i === 3 ? C.neon : C.text, 'center');
        tracked(u, l, x + bw / 2, y + 252, 22, C.dim, 'center');
      });
      // key moments
      const items = [
        ['Thu 26 Nov', 'Early access', '6pm for VIPs', EA, BF],
        ['Fri 27 Nov', 'Black Friday', 'Doors open 7am', BF, Date.UTC(2026, 10, 28)],
        ['Sat 28 and Sun 29', 'The weekend', 'Last chance Sunday', Date.UTC(2026, 10, 28), CM],
        ['Mon 30 Nov', 'Cyber Monday', 'Ends midnight', CM, CM_END]
      ];
      const ly = 680, lx0 = 150, lx1 = 1130;
      u.strokeStyle = C.faint; u.lineWidth = 2; u.beginPath(); u.moveTo(90, ly); u.lineTo(1190, ly); u.stroke();
      items.forEach(([d, n, sub, s, e], i) => {
        const x = lx0 + i * (lx1 - lx0) / 3, big = i === 1 || i === 3;
        u.beginPath(); u.arc(x, ly, big ? 13 : 9, 0, 7); u.fillStyle = i === 3 ? C.neon : (big ? C.blue : C.text); u.fill();
        t(u, d, x, ly - 34, `600 26px ${SANS}`, C.text, 'center');
        t(u, n, x, ly + 52, `400 34px ${SERIF}`, C.text, 'center');
        t(u, sub, x, ly + 88, `500 22px ${SANS}`, C.dim, 'center');
        t(u, whenLabel(s, e), x, ly + 124, `600 22px ${SANS}`, C.neon, 'center');
      });
      u.beginPath(); u.arc(452, 874, 7, 0, 7); u.fillStyle = C.amber; u.fill();
      t(u, 'Book by Fri 6 Nov to be live for early access', 470, 882, `600 26px ${SANS}`, C.amber);
    } else {
      t(u, live ? 'Black Friday is live' : 'Black Friday opens in', 640, 226, `italic 400 64px ${SERIF}`, C.dim, 'center');
      const vals = [[r.d, 'DAYS'], [r.h, 'HOURS'], [r.m, 'MINUTES'], [r.s, 'SECONDS']];
      vals.forEach(([v, l], i) => {
        const col = i % 2, row = Math.floor(i / 2), x = 110 + col * 540, y = 270 + row * 290, w = 520, h = 270;
        rr(u, x, y, w, h, 24); u.fillStyle = 'rgba(92,198,255,.07)'; u.fill();
        u.strokeStyle = 'rgba(92,198,255,.32)'; u.lineWidth = 3; u.stroke();
        t(u, i === 0 ? String(v) : pad(v), x + w / 2, y + 180, `400 190px ${SERIF}`, i === 3 ? C.neon : C.text, 'center');
        tracked(u, l, x + w / 2, y + 240, 34, C.dim, 'center');
      });
      t(u, 'Fri 27 Nov · Cyber Monday 30 Nov', 640, 900, `600 44px ${SANS}`, C.text, 'center');
    }
  }

  /* ---------- 2. flows ---------- */
  const BF_FLOW = [['VIP list opens', 'Mon 16 Nov'], ['Teaser', 'Fri 20 Nov'], ['Early access', 'Thu 26 Nov 6pm'], ['Doors open', 'Fri 27 Nov 7am'], ['Last chance', 'Sun 29 Nov 8pm']];
  const CM_FLOW = [['Cyber Monday', 'Mon 30 Nov 7am'], ['Skip buyers', 'bought on Friday'], ['Final hours', 'Mon 30 Nov 8pm'], ['Extension', 'Tue 1 Dec'], ['Post purchase', 'every buyer']];
  function node(x, y, w, h, title, sub, style) {
    rr(u, x, y, w, h, 16);
    if (style === 'exit') { u.setLineDash([8, 7]); u.strokeStyle = C.amber; u.lineWidth = 2.5; u.stroke(); u.setLineDash([]); }
    else if (style === 'hot') { u.fillStyle = C.blue; u.fill(); }
    else if (style === 'cm') { u.fillStyle = C.neon; u.fill(); }
    else { u.fillStyle = 'rgba(234,244,255,.06)'; u.fill(); u.strokeStyle = C.faint; u.lineWidth = 2; u.stroke(); }
    const dark = style === 'cm';
    t(u, title, x + 18, y + 46, `600 25px ${SANS}`, dark ? C.navy : (style === 'exit' ? C.amber : C.text));
    t(u, sub, x + 18, y + 82, `500 21px ${SANS}`, dark ? '#0B2A4A' : (style === 'hot' ? '#E6F4FF' : C.dim));
  }
  function pulse(x, y, color) {
    const g = u.createRadialGradient(x, y, 0, x, y, 22);
    g.addColorStop(0, color); g.addColorStop(1, 'rgba(92,198,255,0)');
    u.fillStyle = g; u.beginPath(); u.arc(x, y, 22, 0, 7); u.fill();
    u.fillStyle = '#fff'; u.beginPath(); u.arc(x, y, 5, 0, 7); u.fill();
  }
  function drawFlows(time) {
    if (!compact) {
      t(u, 'Black Friday and Cyber Monday flows', 64, 214, `400 50px ${SERIF}`, C.text);
      const nw = 204, nh = 104, gap = 33, x0 = 64;
      tracked(u, 'BLACK FRIDAY', x0, 278, 20, C.blue);
      const y1 = 308;
      BF_FLOW.forEach(([a, b], i) => {
        const x = x0 + i * (nw + gap);
        node(x, y1, nw, nh, a, b, i === 3 ? 'hot' : '');
        if (i < 4) arrow(u, x + nw + 3, y1 + nh / 2, x + nw + gap - 3, y1 + nh / 2, C.dim);
      });
      // decision under early access
      const ex = x0 + 2 * (nw + gap) + nw / 2, dy = 492;
      u.strokeStyle = C.dim; u.lineWidth = 3; u.beginPath(); u.moveTo(ex, y1 + nh); u.lineTo(ex, dy - 40); u.stroke();
      u.save(); u.translate(ex, dy); u.rotate(Math.PI / 4); u.fillStyle = 'rgba(234,244,255,.06)'; u.strokeStyle = C.text; u.lineWidth = 2;
      rr(u, -38, -38, 76, 76, 10); u.fill(); u.stroke(); u.restore();
      t(u, 'Opened?', ex, dy + 8, `600 20px ${SANS}`, C.text, 'center');
      arrow(u, ex + 56, dy, ex + 120, dy, C.dim);
      t(u, 'No', ex + 70, dy - 12, `600 18px ${SANS}`, C.dim);
      rr(u, ex + 124, dy - 38, 350, 76, 14); u.fillStyle = 'rgba(234,244,255,.06)'; u.fill(); u.strokeStyle = C.faint; u.lineWidth = 2; u.stroke();
      t(u, 'Resend with a new subject', ex + 146, dy - 4, `600 24px ${SANS}`, C.text);
      t(u, '4 hours later, same code', ex + 146, dy + 26, `500 20px ${SANS}`, C.dim);
      t(u, 'Yes: straight to doors open', ex - 58, dy + 70, `500 20px ${SANS}`, C.dim, 'center');

      tracked(u, 'CYBER MONDAY', x0, 612, 20, C.neon);
      const y2 = 628;
      CM_FLOW.forEach(([a, b], i) => {
        const x = x0 + i * (nw + gap);
        node(x, y2, nw, nh, a, b, i === 0 ? 'cm' : (i === 4 ? 'exit' : ''));
        if (i < 4) arrow(u, x + nw + 3, y2 + nh / 2, x + nw + gap - 3, y2 + nh / 2, C.dim);
      });
      // travelling customers
      const span = 4 * (nw + gap) + nw, p1 = (time / 6000) % 1, p2 = ((time + 3000) / 6000) % 1;
      [[y2 + nh + 18, p2, 'rgba(92,198,255,.9)']].forEach(([ty, p, col]) => {
        u.strokeStyle = 'rgba(143,169,198,.18)'; u.lineWidth = 2; u.beginPath(); u.moveTo(x0, ty); u.lineTo(x0 + span, ty); u.stroke();
        pulse(x0 + p * span, ty, col);
      });
      u.strokeStyle = 'rgba(143,169,198,.18)'; u.lineWidth = 2; u.beginPath(); u.moveTo(x0, y1 - 12); u.lineTo(x0 + span, y1 - 12); u.stroke();
      pulse(x0 + p1 * span, y1 - 12, 'rgba(0,148,255,.9)');
      t(u, 'Example programme. Every send is split by engagement: VIPs first, then actives, then the wider list.', 64, 836, `500 23px ${SANS}`, C.dim);
      t(u, 'Anyone who buys leaves the sale flow and moves to post purchase.', 64, 872, `500 23px ${SANS}`, C.dim);
    } else {
      const showCM = flip % 2 === 1;
      const list = showCM ? CM_FLOW : BF_FLOW;
      t(u, showCM ? 'Cyber Monday flow' : 'Black Friday flow', 90, 236, `400 70px ${SERIF}`, C.text);
      list.forEach(([a, b], i) => {
        const y = 330 + i * 120;
        u.beginPath(); u.arc(112, y - 14, 14, 0, 7); u.fillStyle = (showCM ? i === 0 : i === 3) ? (showCM ? C.neon : C.blue) : C.text; u.fill();
        if (i < 4) { u.strokeStyle = C.faint; u.lineWidth = 3; u.beginPath(); u.moveTo(112, y + 4); u.lineTo(112, y + 92); u.stroke(); }
        t(u, a, 156, y, `600 50px ${SANS}`, i === 4 && showCM ? C.amber : C.text);
        t(u, b, 156, y + 46, `500 36px ${SANS}`, C.dim);
      });
    }
  }

  /* ---------- 3. before and after ---------- */
  const BEFORE = [['Browse abandonment', '1 hour after they look'], ['Cart reminder', '30 minutes, no code yet'], ['Second nudge', '4 hours, with the BF code'], ['Final call', '20 hours, code ends tonight'], ['Back in stock', 'the moment it lands']];
  const AFTER = [['Thank you', 'instantly, plus what’s next'], ['Delivery heads up', 'day 2, holiday shipping'], ['Cross sell', 'day 5, what goes with it'], ['Review request', 'day 12'], ['New buyer winback', 'day 30, before January']];
  function drawPurchase(time) {
    if (!compact) {
      t(u, 'Before and after the purchase', 64, 214, `400 50px ${SERIF}`, C.text);
      tracked(u, 'BEFORE THEY BUY', 64, 296, 20, C.blue);
      tracked(u, 'AFTER THEY BUY', 818, 296, 20, C.neon);
      const cx = 640, cy = 560;
      const ys = BEFORE.map((_, i) => 360 + i * 106);
      // fan lines
      ys.forEach(y => {
        u.strokeStyle = 'rgba(0,148,255,.35)'; u.lineWidth = 2; u.beginPath(); u.moveTo(470, y - 10);
        u.bezierCurveTo(540, y - 10, 520, cy, cx - 84, cy); u.stroke();
        u.strokeStyle = 'rgba(92,198,255,.35)'; u.beginPath(); u.moveTo(cx + 84, cy);
        u.bezierCurveTo(760, cy, 740, y - 10, 810, y - 10); u.stroke();
      });
      const g = u.createRadialGradient(cx, cy, 20, cx, cy, 140); g.addColorStop(0, 'rgba(0,148,255,.35)'); g.addColorStop(1, 'rgba(0,148,255,0)');
      u.fillStyle = g; u.beginPath(); u.arc(cx, cy, 140, 0, 7); u.fill();
      const beat = 1 + Math.sin(time / 420) * .03;
      u.beginPath(); u.arc(cx, cy, 80 * beat, 0, 7); u.fillStyle = C.blue; u.fill();
      t(u, 'Order', cx, cy - 2, `400 40px ${SERIF}`, '#fff', 'center');
      t(u, 'placed', cx, cy + 32, `600 20px ${SANS}`, '#E6F4FF', 'center');
      BEFORE.forEach(([a, b], i) => {
        const y = ys[i];
        u.beginPath(); u.arc(76, y - 10, 8, 0, 7); u.fillStyle = C.blue; u.fill();
        t(u, a, 100, y, `600 28px ${SANS}`, C.text);
        t(u, b, 100, y + 34, `500 22px ${SANS}`, C.dim);
      });
      AFTER.forEach(([a, b], i) => {
        const y = ys[i];
        u.beginPath(); u.arc(826, y - 10, 8, 0, 7); u.fillStyle = C.neon; u.fill();
        t(u, a, 850, y, `600 28px ${SANS}`, C.text);
        t(u, b, 850, y + 34, `500 22px ${SANS}`, C.dim);
      });
    } else {
      const after = flip % 2 === 1, list = after ? AFTER : BEFORE;
      t(u, after ? 'After they buy' : 'Before they buy', 90, 236, `400 70px ${SERIF}`, C.text);
      list.forEach(([a, b], i) => {
        const y = 330 + i * 120;
        u.beginPath(); u.arc(112, y - 14, 14, 0, 7); u.fillStyle = after ? C.neon : C.blue; u.fill();
        t(u, a, 156, y, `600 50px ${SANS}`, C.text);
        t(u, b, 156, y + 46, `500 36px ${SANS}`, C.dim);
      });
    }
  }

  /* ---------- 4. November ---------- */
  const EVENTS = { 2: ['List clean', 'prep'], 4: ['Warm up', 'prep'], 6: ['Warm up', 'prep'], 9: ['Warm up', 'prep'], 11: ['Gift guide', 'build'], 13: ['Warm up', 'prep'], 16: ['VIP list', 'build'], 18: ['Gift guide', 'build'], 20: ['Teaser', 'build'], 23: ['Teaser', 'build'], 25: ['Teaser', 'build'], 26: ['Early access', 'sale'], 27: ['Black Friday', 'bf'], 28: ['Weekend', 'sale'], 29: ['Last chance', 'sale'], 30: ['Cyber Monday', 'cm'] };
  const KIND = { prep: 'rgba(143,169,198,.28)', build: 'rgba(0,148,255,.55)', sale: 'rgba(92,198,255,.9)' };
  function drawNovember() {
    const big = compact;
    t(u, 'November 2026', big ? 90 : 64, big ? 236 : 214, `400 ${big ? 70 : 50}px ${SERIF}`, C.text);
    if (!big) {
      [['Prep', KIND.prep], ['Build up', KIND.build], ['Sale', KIND.sale]].forEach(([l, c], i) => {
        const x = 800 + i * 140; rr(u, x, 186, 26, 26, 7); u.fillStyle = c; u.fill();
        t(u, l, x + 36, 207, `600 22px ${SANS}`, C.dim);
      });
    }
    const x0 = big ? 90 : 64, gw = big ? 1100 : 1152, cw = gw / 7, top = big ? 290 : 272, rh = big ? 80 : 94;
    ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].forEach((d, i) => tracked(u, d, x0 + i * cw + 12, top - 12, big ? 26 : 18, C.dim));
    // Nov 1 2026 is a Sunday: Monday first grid starts Mon 26 Oct
    for (let i = 0; i < 42; i++) {
      const day = i - 5; // day 1 sits at index 6
      if (i > 35) break;
      const col = i % 7, row = Math.floor(i / 7), x = x0 + col * cw + 3, y = top + row * rh + 3, w = cw - 6, h = rh - 6;
      const inMonth = day >= 1 && day <= 30;
      const ev = inMonth ? EVENTS[day] : null;
      rr(u, x, y, w, h, 12);
      if (ev && ev[1] === 'bf') { u.fillStyle = C.blue; u.fill(); }
      else if (ev && ev[1] === 'cm') { u.fillStyle = C.neon; u.fill(); }
      else if (big && ev) { u.fillStyle = KIND[ev[1]]; u.fill(); }
      else { u.fillStyle = inMonth ? 'rgba(234,244,255,.04)' : 'rgba(234,244,255,.015)'; u.fill(); }
      const label = inMonth ? String(day) : String(25 + col + 1);
      const dark = ev && ev[1] === 'cm';
      t(u, label, x + 12, y + (big ? 50 : 30), `600 ${big ? 38 : 22}px ${SANS}`, !inMonth ? 'rgba(143,169,198,.3)' : dark ? C.navy : C.text);
      if (ev && !big) {
        const [name, kind] = ev;
        if (kind === 'bf' || kind === 'cm') {
          t(u, name, x + 10, y + h - 14, `400 23px ${SERIF}`, dark ? C.navy : '#fff');
        } else {
          u.font = `600 17px ${SANS}`; const tw = u.measureText(name).width;
          rr(u, x + 8, y + h - 36, tw + 18, 28, 14); u.fillStyle = KIND[kind]; u.fill();
          t(u, name, x + 17, y + h - 16, `600 17px ${SANS}`, kind === 'sale' ? C.navy : C.text);
        }
      }
    }
    if (big) {
      t(u, '26 Early access · 27 Black Friday · 30 Cyber Monday', 640, 880, `600 38px ${SANS}`, C.text, 'center');
    }
  }

  function drawUI(time) {
    u.fillStyle = C.bg; u.fillRect(0, 0, W, H);
    const g = u.createRadialGradient(W / 2, H * .45, 60, W / 2, H * .45, W * .7);
    g.addColorStop(0, 'rgba(0,148,255,.16)'); g.addColorStop(1, 'rgba(0,148,255,0)');
    u.fillStyle = g; u.fillRect(0, 0, W, H);
    topBar();
    [drawCountdown, drawFlows, drawPurchase, drawNovember][tab](time);
  }

  function frame(time, dt) {
    // power animation
    power += (powerTarget - power) * Math.min(1, dt / 160);
    if (Math.abs(powerTarget - power) < .002) power = powerTarget;
    if (compact && (tab === 1 || tab === 2)) {
      const f = Math.floor(time / 5000);
      if (f !== flip) { flip = f; }
    }
    drawUI(time);
    o.fillStyle = '#000'; o.fillRect(0, 0, W, H);
    if (power > .01) {
      const p = power;
      if (p < .35) {
        const k = p / .35; const lw = W * k;
        o.fillStyle = '#DDF1FF'; o.fillRect((W - lw) / 2, H / 2 - 3, lw, 6);
      } else {
        const k = (p - .35) / .65, e = 1 - Math.pow(1 - k, 3), h = Math.max(6, H * e);
        o.drawImage(ui, 0, (H - h) / 2, W, h);
        if (k < 1) { o.fillStyle = `rgba(221,241,255,${(1 - k) * .8})`; o.fillRect(0, (H - h) / 2, W, h); }
      }
    }
    // channel change static
    if (switchT > 0) { switchT = switchEnd - performance.now();
      const d = nimg.data;
      for (let i = 0; i < d.length; i += 4) { const v = Math.random() * 255; d[i] = v * .8; d[i + 1] = v * .9; d[i + 2] = v; d[i + 3] = 255; }
      nctx.putImageData(nimg, 0, 0);
      o.globalAlpha = Math.min(1, switchT / 120); o.imageSmoothingEnabled = false;
      o.drawImage(noise, 0, 0, W, H); o.globalAlpha = 1; o.imageSmoothingEnabled = true;
    }
    // on screen display after a switch
    if (osdT > 0 && !compact && power > .9) {
      o.globalAlpha = Math.min(1, osdT / 400);
      tracked(o, `CH ${tab + 1}`, 1216, 912, 34, '#7CFFB2', 'right', .08);
      o.globalAlpha = 1; osdT = osdEnd - performance.now();
    }
    o.drawImage(fx, 0, 0);
  }

  return {
    canvas: out, W, H,
    get tab() { return tab; },
    setTab(i, quiet) { if (i === tab && !quiet) return; tab = i; flip = Math.floor(performance.now() / 5000); if (!quiet) { switchT = 260; osdT = 1600; switchEnd = performance.now() + 260; osdEnd = performance.now() + 1600; } },
    setCompact(v) { compact = v; },
    power(on) { powerTarget = on ? 1 : 0; },
    get isOn() { return powerTarget === 1; },
    hitTest(x, y) { if (compact) return null; const h = hits.find(h => x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h); return h ? h.tab : null; },
    frame, mark,
    bfIn() { return remain(BF - Date.now()); }
  };
})();

/* ============ Opes wrapping paper that tears where you drag ============ */
const PAPER = (() => {
  let cv, ctx, wrap, dpr = 1, w = 0, h = 0, grid, gw = 48, gh = 30, torn = 0, done = false, onDone = null;
  let stroke = null, seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  function tile(size) {
    const t = document.createElement('canvas'); t.width = t.height = size; const c = t.getContext('2d');
    const s = size / 240;
    c.fillStyle = '#0094FF'; c.fillRect(0, 0, size, size);
    c.strokeStyle = 'rgba(255,255,255,.10)'; c.lineWidth = 2 * s;
    for (let i = -size; i < size * 2; i += 20 * s) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i + size, size); c.stroke(); }
    const markAt = (x, y, R, rot, ring, arc) => { c.save(); c.translate(x, y); c.rotate(rot); SCREEN.mark(c, 0, 0, R, ring, arc); c.restore(); };
    markAt(62 * s, 62 * s, 30 * s, -.3, '#0A0C19', '#FFFFFF');
    markAt(182 * s, 182 * s, 30 * s, .45, '#FFFFFF', '#0A0C19');
    markAt(182 * s, 62 * s, 11 * s, 1.2, 'rgba(10,12,25,.9)', 'rgba(10,12,25,.9)');
    markAt(62 * s, 182 * s, 11 * s, 2.4, 'rgba(255,255,255,.95)', 'rgba(255,255,255,.95)');
    const star = (x, y, r) => { c.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * .32 : r; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.fill(); };
    c.fillStyle = '#FFFFFF'; star(122 * s, 20 * s, 7 * s); star(20 * s, 122 * s, 5 * s);
    c.fillStyle = '#0A0C19'; star(122 * s, 122 * s, 6 * s); star(222 * s, 122 * s, 4 * s);
    return t;
  }

  function drawRibbon(c, x0, y0, len, vertical, width) {
    const g = vertical ? c.createLinearGradient(x0 - width / 2, 0, x0 + width / 2, 0) : c.createLinearGradient(0, y0 - width / 2, 0, y0 + width / 2);
    g.addColorStop(0, '#070913'); g.addColorStop(.35, '#1B2140'); g.addColorStop(.5, '#2A3260'); g.addColorStop(.65, '#1B2140'); g.addColorStop(1, '#070913');
    c.fillStyle = g;
    if (vertical) c.fillRect(x0 - width / 2, 0, width, len); else c.fillRect(0, y0 - width / 2, len, width);
    c.strokeStyle = 'rgba(92,198,255,.35)'; c.lineWidth = 1.5 * dpr;
    c.beginPath();
    if (vertical) { c.moveTo(x0 - width / 2 + 6 * dpr, 0); c.lineTo(x0 - width / 2 + 6 * dpr, len); c.moveTo(x0 + width / 2 - 6 * dpr, 0); c.lineTo(x0 + width / 2 - 6 * dpr, len); }
    else { c.moveTo(0, y0 - width / 2 + 6 * dpr); c.lineTo(len, y0 - width / 2 + 6 * dpr); c.moveTo(0, y0 + width / 2 - 6 * dpr); c.lineTo(len, y0 + width / 2 - 6 * dpr); }
    c.setLineDash([4 * dpr, 5 * dpr]); c.stroke(); c.setLineDash([]);
  }
  function loop(c, x, y, rot, L, Wd) {
    c.save(); c.translate(x, y); c.rotate(rot);
    const g = c.createLinearGradient(0, -Wd, L, Wd); g.addColorStop(0, '#0A0C19'); g.addColorStop(.45, '#27305C'); g.addColorStop(1, '#0A0C19');
    c.fillStyle = g; c.beginPath(); c.moveTo(0, 0);
    c.bezierCurveTo(L * .35, -Wd * 1.3, L * 1.05, -Wd * 1.1, L, 0);
    c.bezierCurveTo(L * 1.05, Wd * 1.1, L * .35, Wd * 1.3, 0, 0); c.fill();
    c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.moveTo(L * .2, 0);
    c.bezierCurveTo(L * .45, -Wd * .45, L * .85, -Wd * .4, L * .88, 0);
    c.bezierCurveTo(L * .85, Wd * .4, L * .45, Wd * .45, L * .2, 0); c.fill();
    c.strokeStyle = 'rgba(92,198,255,.25)'; c.lineWidth = 2 * dpr; c.beginPath(); c.moveTo(L * .1, -Wd * .3);
    c.bezierCurveTo(L * .4, -Wd * 1.05, L * .9, -Wd * .95, L * .95, -Wd * .1); c.stroke();
    c.restore();
  }

  function paint() {
    const c = ctx;
    c.globalCompositeOperation = 'source-over';
    c.fillStyle = c.createPattern(tile(Math.round(240 * dpr)), 'repeat'); c.fillRect(0, 0, w, h);
    // crinkles: soft folds of light and shadow
    seed = 11;
    for (let i = 0; i < 26; i++) {
      const x = rnd() * w, y = rnd() * h, a = rnd() * Math.PI, L = (200 + rnd() * 500) * dpr, Wd = (30 + rnd() * 90) * dpr;
      c.save(); c.translate(x, y); c.rotate(a);
      const g = c.createLinearGradient(0, -Wd, 0, Wd); const lite = rnd() > .5;
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.5, lite ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = g; c.fillRect(-L / 2, -Wd, L, Wd * 2); c.restore();
    }
    const edge = c.createRadialGradient(w / 2, h / 2, Math.min(w, h) * .3, w / 2, h / 2, Math.max(w, h) * .75);
    edge.addColorStop(0, 'rgba(0,0,0,0)'); edge.addColorStop(1, 'rgba(10,12,25,.35)'); c.fillStyle = edge; c.fillRect(0, 0, w, h);
    // ribbon cross and bow
    const rx = w * .5, ry = h * .44, RW = Math.max(52 * dpr, Math.min(w, h) * .075);
    drawRibbon(c, rx, 0, h, true, RW); drawRibbon(c, 0, ry, w, false, RW);
    const L = RW * 2.3, Wd = RW * .9;
    // tails
    c.fillStyle = '#10142A';
    [[-1, .5], [1, .7]].forEach(([s, k]) => { c.save(); c.translate(rx, ry); c.rotate(s * k + Math.PI / 2 - s * .9);
      c.beginPath(); c.moveTo(-RW * .35, 0); c.lineTo(RW * .35, 0); c.lineTo(RW * .45, L * 1.1); c.lineTo(0, L * .9); c.lineTo(-RW * .45, L * 1.1); c.closePath(); c.fill(); c.restore(); });
    loop(c, rx, ry, Math.PI + .35, L, Wd); loop(c, rx, ry, -.35, L, Wd);
    loop(c, rx, ry, Math.PI - .5, L * .78, Wd * .8); loop(c, rx, ry, -Math.PI + .5 + Math.PI, L * .78, Wd * .8);
    const kg = c.createRadialGradient(rx - RW * .15, ry - RW * .2, 2, rx, ry, RW * .6); kg.addColorStop(0, '#34407A'); kg.addColorStop(1, '#0A0C19');
    c.fillStyle = kg; c.beginPath(); c.ellipse(rx, ry, RW * .55, RW * .48, 0, 0, 7); c.fill();
    // gift tag hanging from the bow
    const tw = 230 * dpr, th = 118 * dpr, ts = Math.min(1, (w / dpr) / 520);
    const tx = Math.min(rx + RW * 1.2, w - tw * ts - 20 * dpr), ty = ry + RW * 1.3;
    c.strokeStyle = '#EAF2FB'; c.lineWidth = 2 * dpr; c.beginPath(); c.moveTo(rx + RW * .3, ry + RW * .2); c.quadraticCurveTo(tx, ty - 30 * dpr, tx + 18 * dpr * ts, ty + 14 * dpr * ts); c.stroke();
    c.save(); c.translate(tx, ty); c.rotate(.12); c.scale(ts, ts);
    c.shadowColor = 'rgba(10,12,25,.35)'; c.shadowBlur = 18 * dpr; c.shadowOffsetY = 8 * dpr;
    c.fillStyle = '#FFFFFF'; c.beginPath(); c.moveTo(0, th * .3); c.lineTo(th * .3, 0); c.lineTo(tw, 0); c.lineTo(tw, th); c.lineTo(th * .3, th); c.lineTo(0, th * .7); c.closePath(); c.fill();
    c.shadowColor = 'transparent';
    c.fillStyle = '#0A0C19'; c.beginPath(); c.arc(18 * dpr, th / 2, 6 * dpr, 0, 7); c.fill();
    c.fillStyle = '#0A0C19'; c.textBaseline = 'alphabetic';
    c.font = `italic 400 ${26 * dpr}px Newsreader, Georgia, serif`; c.fillText('To you, from Opes', 44 * dpr, 48 * dpr);
    c.font = `600 ${15 * dpr}px Aspekta, sans-serif`; c.fillStyle = '#0077CC'; c.fillText('Black Friday 2026', 44 * dpr, 78 * dpr);
    c.fillStyle = '#475569'; c.font = `500 ${13 * dpr}px Aspekta, sans-serif`; c.fillText('Tear to open', 44 * dpr, 100 * dpr);
    c.restore();
  }

  function setup(el, canvas, cb) {
    wrap = el; cv = canvas; ctx = cv.getContext('2d'); onDone = cb;
    wrap.addEventListener('pointerdown', down);
    wrap.addEventListener('pointermove', move);
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => wrap.addEventListener(t, up));
  }
  function reset() {
    done = false; torn = 0; stroke = null;
    wrap.classList.remove('obf-falling', 'obf-dragging'); wrap.hidden = false;
    wrap.classList.remove('obf-wrap-in'); void wrap.offsetWidth; wrap.classList.add('obf-wrap-in');
    size();
  }
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = Math.round(wrap.clientWidth * dpr); h = Math.round(wrap.clientHeight * dpr);
    cv.width = w; cv.height = h; grid = new Uint8Array(gw * gh); torn = 0; paint();
  }

  function jag(points, width) {
    // build a jagged torn strip along the points
    const L = [], R = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i], q = points[Math.min(i + 1, points.length - 1)], o = points[Math.max(i - 1, 0)];
      let dx = q[0] - o[0], dy = q[1] - o[1]; const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
      const nx = -dy, ny = dx;
      const j1 = (rnd() - .5) * 7 * dpr + (rnd() < .12 ? rnd() * 9 * dpr : 0);
      const j2 = (rnd() - .5) * 7 * dpr + (rnd() < .12 ? rnd() * 9 * dpr : 0);
      L.push([p[0] + nx * (width / 2 + j1), p[1] + ny * (width / 2 + j1)]);
      R.push([p[0] - nx * (width / 2 + j2), p[1] - ny * (width / 2 + j2)]);
    }
    return L.concat(R.reverse());
  }
  function poly(pts) { ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); }
  function blob(x, y, r) {
    const pts = []; const n = 22;
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, rr = r * (0.82 + rnd() * .3); pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
    return pts;
  }
  function tearSegment(a, b, width) {
    const pts = []; const d = Math.hypot(b[0] - a[0], b[1] - a[1]); const n = Math.max(2, Math.ceil(d / (5 * dpr)));
    for (let i = 0; i <= n; i++) pts.push([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]);
    const cut = jag(pts, width), cap = blob(b[0], b[1], width / 2);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(4,20,48,.28)'; poly(jag(pts, width + 22 * dpr)); ctx.fill(); poly(blob(b[0], b[1], width / 2 + 11 * dpr)); ctx.fill();
    ctx.fillStyle = '#F4F8FC'; poly(jag(pts, width + 9 * dpr)); ctx.fill(); poly(blob(b[0], b[1], width / 2 + 4.5 * dpr)); ctx.fill();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = '#000'; poly(cut); ctx.fill(); poly(cap); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    // coverage bookkeeping on a coarse grid
    const cw = w / gw, chh = h / gh, rad = width / 2;
    for (let i = 0; i <= n; i += 2) {
      const [px, py] = pts[i];
      const x0 = Math.max(0, Math.floor((px - rad) / cw)), x1 = Math.min(gw - 1, Math.floor((px + rad) / cw));
      const y0 = Math.max(0, Math.floor((py - rad) / chh)), y1 = Math.min(gh - 1, Math.floor((py + rad) / chh));
      for (let gy = y0; gy <= y1; gy++) for (let gx = x0; gx <= x1; gx++) {
        const cx = (gx + .5) * cw, cy = (gy + .5) * chh;
        if (!grid[gy * gw + gx] && Math.hypot(cx - px, cy - py) < rad) { grid[gy * gw + gx] = 1; torn++; }
      }
    }
  }
  function pos(e) { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * dpr, (e.clientY - r.top) * dpr]; }
  function down(e) {
    if (done) return;
    wrap.setPointerCapture?.(e.pointerId);
    wrap.classList.add('obf-dragging');
    stroke = { last: pos(e), len: 0 };
    tearSegment(stroke.last, [stroke.last[0] + 1, stroke.last[1] + 1], 16 * dpr);
    document.dispatchEvent(new CustomEvent('paper:start'));
  }
  function move(e) {
    if (!stroke || done) return;
    const p = pos(e), d = Math.hypot(p[0] - stroke.last[0], p[1] - stroke.last[1]);
    if (d < 6 * dpr) return;
    stroke.len += d / dpr;
    const width = Math.min(18 + stroke.len * .22, Math.max(170, Math.min(w, h) / dpr * .3)) * dpr;
    tearSegment(stroke.last, p, width);
    stroke.last = p;
    check();
  }
  function up() { stroke = null; wrap.classList.remove('obf-dragging'); }
  function check() {
    if (!done && torn / (gw * gh) > .26) finish();
  }
  function finish() {
    done = true; stroke = null;
    wrap.classList.add('obf-falling');
    const ms = matchMedia('(prefers-reduced-motion: reduce)').matches ? 300 : 1000;
    onDone && onDone();
    setTimeout(() => { wrap.hidden = true; }, ms);
  }
  function auto() {
    // tear it for the visitor along a sweeping path
    if (done) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { finish(); return; }
    const path = []; const n = 60;
    for (let i = 0; i <= n; i++) { const k = i / n; path.push([w * (.08 + .84 * k), h * (.72 - .5 * k + Math.sin(k * Math.PI * 3) * .12)]); }
    for (let i = 0; i <= n; i++) { const k = i / n; path.push([w * (.92 - .84 * k), h * (.2 + .6 * k + Math.sin(k * Math.PI * 2) * .1)]); }
    let i = 1, len = 0; const t0 = performance.now(), dur = 1300;
    const step = now => {
      if (done) return;
      const target = Math.min(path.length, 1 + Math.floor((now - t0) / dur * (path.length - 1)) + 1);
      while (i < target && !done) {
        const a = path[i - 1], b = path[i]; len += Math.hypot(b[0] - a[0], b[1] - a[1]) / dpr;
        tearSegment(a, b, Math.min(18 + len * .22, 200) * dpr); i++; check();
      }
      if (i >= path.length) { if (!done) finish(); return; }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  return { setup, reset, size, auto, get done() { return done; } };
})();

/* ============ The monitor: rebuilt in code from Aran's photo (img2threejs method) ============
   Reference read: 15 inch beige CRT, front view, slightly above. Bezel W:H about 1.17.
   Screen opening sits high (thin top and side margins, deep bottom control strip).
   Bottom strip: brand badge left, four small oval buttons centre, model script and LED right,
   big round power button far right. Swivel base under the front. The back (tube bell, vents)
   is not visible in the photo, so it is inferred from typical 15 inch CRTs. Brand badge swapped
   for Opes. */
function makeMonitor() { window.MONITOR = (() => {
  const T = THREE;
  let renderer, scene, camera, root, pivot, glass, screenTex, buttons = [], power, led, ledMat;
  let W = 1, H = 1, compact = false;
  const ray = new T.Raycaster(), ndc = new T.Vector2();
  const state = { rotY: 0, rotX: 0, tRotY: 0, tRotX: 0, dragging: false, lastDrag: -1e9, spin: 0, rise: 0, riseT: 1, visible: false };

  const BW = 1.6, BH = 1.37;               // bezel
  const OW = 1.33, OH = 0.99, OY = 0.03;   // screen opening
  const GW = 1.24, GH = 0.93;              // glass (4:3)

  function rrShape(w, h, r, cx = 0, cy = 0) {
    const s = new T.Shape(), x = cx - w / 2, y = cy - h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }
  function slab(w, h, d, r, bev, mat) {
    const g = new T.ExtrudeGeometry(rrShape(w - bev * 2, h - bev * 2, Math.max(.001, r - bev)), { depth: d - bev * 2, bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 4, curveSegments: 10 });
    g.translate(0, 0, -(d - bev * 2) / 2);
    return new T.Mesh(g, mat);
  }
  function rrPoints(w, h, r, n) {
    // evenly sampled rounded rectangle outline (counter clockwise), n points
    const pts = [], per = 2 * (w + h - 4 * r) + 2 * Math.PI * r;
    for (let i = 0; i < n; i++) {
      let s = i / n * per; const hw = w / 2 - r, hh = h / 2 - r;
      const segs = [[2 * hw, 'b'], [Math.PI / 2 * r, 'c1'], [2 * hh, 'r'], [Math.PI / 2 * r, 'c2'], [2 * hw, 't'], [Math.PI / 2 * r, 'c3'], [2 * hh, 'l'], [Math.PI / 2 * r, 'c4']];
      for (const [len, k] of segs) {
        if (s <= len) {
          const a = s / (r || 1);
          if (k === 'b') pts.push([-hw + s, -h / 2]);
          else if (k === 'c1') pts.push([hw + Math.sin(a) * r, -hh - Math.cos(a) * r]);
          else if (k === 'r') pts.push([w / 2, -hh + s]);
          else if (k === 'c2') pts.push([hw + Math.cos(a) * r, hh + Math.sin(a) * r]);
          else if (k === 't') pts.push([hw - s, h / 2]);
          else if (k === 'c3') pts.push([-hw - Math.sin(a) * r, hh + Math.cos(a) * r]);
          else if (k === 'l') pts.push([-w / 2, hh - s]);
          else pts.push([-hw - Math.cos(a) * r, -hh - Math.sin(a) * r]);
          break;
        }
        s -= len;
      }
    }
    return pts;
  }
  function loft(rings, mat) {
    // rings: [{w,h,r,y,z}], lofted along z with a closed cap on the last ring
    const n = 96, pos = [], idx = [];
    rings.forEach(R => rrPoints(R.w, R.h, R.r, n).forEach(([x, y]) => pos.push(x, y + R.y, R.z)));
    for (let k = 0; k < rings.length - 1; k++) for (let i = 0; i < n; i++) {
      const a = k * n + i, b = k * n + (i + 1) % n, c = (k + 1) * n + i, d = (k + 1) * n + (i + 1) % n;
      idx.push(a, c, b, b, c, d);
    }
    const last = rings[rings.length - 1], ci = pos.length / 3; pos.push(0, last.y, last.z);
    const base = (rings.length - 1) * n; for (let i = 0; i < n; i++) idx.push(base + i, ci, base + (i + 1) % n);
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    return new T.Mesh(g, mat);
  }
  function labelTex(draw, w, h) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
    const tx = new T.CanvasTexture(c); tx.colorSpace = T.SRGBColorSpace; tx.anisotropy = 4; return tx;
  }

  function build() {
    const plastic = new T.MeshStandardMaterial({ color: 0xDDD6C4, roughness: .5, metalness: 0, envMapIntensity: .9 });
    const plasticShade = new T.MeshStandardMaterial({ color: 0xD2CBB9, roughness: .58, metalness: 0, envMapIntensity: .8 });
    const lip = new T.MeshStandardMaterial({ color: 0xE4DDCC, roughness: .5, metalness: 0, envMapIntensity: .45 });
    const dark = new T.MeshStandardMaterial({ color: 0x2B2A27, roughness: .8 });
    root = new T.Group(); root.name = 'monitor';
    const front = new T.Group(); front.name = 'front'; root.add(front);

    // bezel with the screen opening cut out
    const bev = .022, depth = .12;
    const outer = rrShape(BW - bev * 2, BH - bev * 2, .06);
    const hole = rrShape(OW + bev * 2, OH + bev * 2, .045, 0, OY); outer.holes.push(hole);
    const bg = new T.ExtrudeGeometry(outer, { depth: depth - bev * 2, bevelEnabled: true, bevelThickness: bev, bevelSize: bev, bevelSegments: 4, curveSegments: 12 });
    bg.translate(0, 0, -(depth - bev));
    const bezel = new T.Mesh(bg, plastic); bezel.name = 'bezel'; front.add(bezel);

    // sloped inner frame between opening and glass
    const zA = -.018, zB = -.085, oa = [OW / 2, OH / 2], ga = [GW / 2 + .004, GH / 2 + .004];
    const ch = new T.BufferGeometry();
    const P = (sx, sy, a, z) => [sx * a[0], OY + sy * a[1], z];
    const quads = [[[-1, 1], [1, 1]], [[1, 1], [1, -1]], [[1, -1], [-1, -1]], [[-1, -1], [-1, 1]]];
    const cp = [];
    quads.forEach(([p, q]) => {
      const a = P(p[0], p[1], oa, zA), b = P(q[0], q[1], oa, zA), c = P(q[0], q[1], ga, zB), d = P(p[0], p[1], ga, zB);
      cp.push(...a, ...d, ...b, ...b, ...d, ...c);
    });
    ch.setAttribute('position', new T.Float32BufferAttribute(cp, 3)); ch.computeVertexNormals();
    front.add(new T.Mesh(ch, lip));

    // curved glass with the live screen
    screenTex = new T.CanvasTexture(SCREEN.canvas); screenTex.colorSpace = T.SRGBColorSpace; screenTex.anisotropy = 8;
    const gg = new T.PlaneGeometry(GW, GH, 40, 30), gp = gg.attributes.position;
    for (let i = 0; i < gp.count; i++) {
      const x = gp.getX(i) / (GW / 2), y = gp.getY(i) / (GH / 2);
      gp.setZ(i, .034 * (1 - x * x * .9) * (1 - y * y * .9));
    }
    gg.computeVertexNormals(); gg.translate(0, OY, zB - .002);
    const gm = new T.MeshBasicMaterial({ map: screenTex, toneMapped: false });
    glass = new T.Mesh(gg, gm); glass.name = 'glass'; front.add(glass);
    // soft glare like the one in the photo
    const glare = new T.Mesh(gg.clone(), new T.MeshBasicMaterial({
      map: labelTex((c, w, h) => {
        const g = c.createRadialGradient(w * .3, h * .22, 10, w * .3, h * .22, w * .55);
        g.addColorStop(0, 'rgba(255,255,255,.16)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      }, 256, 192), transparent: true, depthWrite: false, toneMapped: false
    }));
    glare.position.z = .003; front.add(glare);

    // control strip
    const sy = -.585;
    const recess = new T.MeshStandardMaterial({ color: 0xB9B4A7, roughness: .7 });
    const btnGeo = new T.CylinderGeometry(.017, .017, .024, 28); btnGeo.rotateX(Math.PI / 2);
    const ringGeo = new T.CircleGeometry(.022, 28);
    [-.11, -.037, .037, .11].forEach((x, i) => {
      const r = new T.Mesh(ringGeo, recess); r.scale.set(1.15, 1, 1); r.position.set(x, sy, .001); front.add(r);
      const b = new T.Mesh(btnGeo, lip); b.scale.set(1.1, 1, 1); b.position.set(x, sy, .006); b.name = 'btn' + i; b.userData = { ch: i, z: .006 };
      front.add(b); buttons.push(b);
    });
    const pr = new T.Mesh(new T.CircleGeometry(.045, 36), recess); pr.position.set(.49, sy + .005, .001); front.add(pr);
    power = new T.Mesh(new T.CylinderGeometry(.036, .036, .03, 36).rotateX(Math.PI / 2), lip);
    power.position.set(.49, sy + .005, .008); power.name = 'power'; power.userData = { z: .008 }; front.add(power);
    ledMat = new T.MeshBasicMaterial({ color: 0x5CC6FF, toneMapped: false });
    led = new T.Mesh(new T.SphereGeometry(.008, 16, 12), ledMat); led.position.set(.415, sy + .005, .002); front.add(led);

    // Opes badge (replaces the maker badge in the photo) and the script label
    const badge = new T.Mesh(new T.PlaneGeometry(.3, .075), new T.MeshStandardMaterial({
      map: labelTex((c, w, h) => {
        SCREEN.mark(c, 40, h / 2, 26, '#0A0C19', '#0094FF');
        c.font = '700 44px Aspekta, sans-serif'; c.fillStyle = '#0A0C19'; c.textBaseline = 'middle'; c.fillText('OPES', 84, h / 2 + 2);
      }, 320, 80), transparent: true, roughness: .5
    }));
    badge.position.set(-.5, -.57, .0015); front.add(badge);
    const script = new T.Mesh(new T.PlaneGeometry(.2, .05), new T.MeshStandardMaterial({
      map: labelTex((c, w, h) => {
        c.font = 'italic 400 40px Newsreader, Georgia, serif'; c.fillStyle = '#55534C'; c.textBaseline = 'middle'; c.fillText('bfcm 26', 8, h / 2);
      }, 240, 60), transparent: true, roughness: .5
    }));
    script.position.set(.35, -.53, .0015); front.add(script);

    // housing: shoulder box, tube bell, rear cap
    const shoulder = slab(1.54, 1.32, .36, .07, .03, plastic); shoulder.position.set(0, 0, -.12 - .18); root.add(shoulder);
    const bell = loft([
      { w: 1.46, h: 1.24, r: .1, y: 0, z: -.46 },
      { w: 1.3, h: 1.14, r: .14, y: .01, z: -.75 },
      { w: 1.02, h: .92, r: .16, y: .03, z: -1.14 },
      { w: .9, h: .84, r: .16, y: .03, z: -1.2 }
    ], plasticShade); bell.name = 'bell'; root.add(bell);
    const cap = slab(.84, .78, .14, .12, .03, plastic); cap.position.set(0, .03, -1.26); root.add(cap);
    // vents on the top of the bell
    const vent = new T.InstancedMesh(new T.BoxGeometry(.3, .01, .018), dark, 16);
    const m = new T.Matrix4(), q = new T.Quaternion(), e = new T.Euler();
    let k = 0;
    for (let row = 0; row < 8; row++) for (let side = -1; side <= 1; side += 2) {
      const z = -.5 - row * .03, t = (-.46 - z) / .29;
      const top = .62 - .04 * t;
      e.set(-Math.atan2(.04, .29), 0, 0); q.setFromEuler(e);
      m.compose(new T.Vector3(side * .25, top, z), q, new T.Vector3(1, 1, 1)); vent.setMatrixAt(k++, m);
    }
    root.add(vent);
    // swivel stand
    const neck = slab(.5, .2, .42, .06, .02, plasticShade); neck.position.set(0, -.66, -.55); root.add(neck);
    const prof = [[0, 0], [.97, 0], [1, .02], [.985, .05], [.9, .075], [.4, .09], [0, .092]].map(([x, y]) => new T.Vector2(x, y));
    const base = new T.Mesh(new T.LatheGeometry(prof, 72), plastic); base.scale.set(.5, 1, .46); base.position.set(0, -.8, -.46); root.add(base);

    // contact shadow + blue pool of light on the floor
    const floorY = -.8;
    const shadow = new T.Mesh(new T.PlaneGeometry(2.6, 2.2), new T.MeshBasicMaterial({
      map: labelTex((c, w, h) => { const g = c.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2); g.addColorStop(0, 'rgba(0,0,0,.7)'); g.addColorStop(.5, 'rgba(0,0,0,.28)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); }, 256, 256),
      transparent: true, depthWrite: false
    }));
    shadow.rotation.x = -Math.PI / 2; shadow.position.set(0, floorY + .001, -.45); root.add(shadow);
    const pool = new T.Mesh(new T.PlaneGeometry(4.5, 3), new T.MeshBasicMaterial({
      map: labelTex((c, w, h) => { const g = c.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w * .5); g.addColorStop(0, 'rgba(0,148,255,.35)'); g.addColorStop(1, 'rgba(0,148,255,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); }, 256, 256),
      transparent: true, depthWrite: false, toneMapped: false, blending: T.AdditiveBlending
    }));
    pool.rotation.x = -Math.PI / 2; pool.position.set(0, floorY, .1); pool.scale.set(1, 1.5, 1); root.add(pool);

    root.traverse(o => { if (o.isMesh) o.userData.part = o.name; });
    return root;
  }

  function envMap() {
    const env = new T.Scene();
    const sky = new T.Mesh(new T.SphereGeometry(10, 32, 16), new T.MeshBasicMaterial({ side: T.BackSide, vertexColors: true }));
    const cols = [], p = sky.geometry.attributes.position, top = new T.Color(0x3a4460), bot = new T.Color(0x0A0C19), c = new T.Color();
    for (let i = 0; i < p.count; i++) { c.copy(bot).lerp(top, (p.getY(i) / 10 + 1) / 2); cols.push(c.r, c.g, c.b); }
    sky.geometry.setAttribute('color', new T.Float32BufferAttribute(cols, 3)); env.add(sky);
    const box = (col, int, pos, s) => { const m = new T.Mesh(new T.PlaneGeometry(s[0], s[1]), new T.MeshBasicMaterial({ color: new T.Color(col).multiplyScalar(int), side: T.DoubleSide })); m.position.set(...pos); m.lookAt(0, 0, 0); env.add(m); };
    box(0xfff4e6, 3.2, [-4, 5, 5], [5, 3]);
    box(0x0094FF, 4, [6, 1, -4], [3, 6]);
    box(0xffffff, 1.4, [3, 4, 6], [3, 2]);
    const pm = new T.PMREMGenerator(renderer); const tex = pm.fromScene(env, .04).texture; pm.dispose(); return tex;
  }

  function init(canvas) {
    renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x0A0C19, 1);
    scene = new T.Scene(); scene.environment = envMap();
    camera = new T.PerspectiveCamera(30, 1, .1, 50);
    scene.add(new T.HemisphereLight(0xdfe8ff, 0x0A0C19, .55));
    const key = new T.DirectionalLight(0xfff1e0, 1.7); key.position.set(-2.5, 3, 4); scene.add(key);
    const rim = new T.DirectionalLight(0x0094FF, 3.2); rim.position.set(3, 1.2, -3); scene.add(rim);
    const rim2 = new T.DirectionalLight(0x5CC6FF, 1.4); rim2.position.set(-3, .5, -2.5); scene.add(rim2);
    const glow = new T.PointLight(0x5CC6FF, 1.2, 1.6, 2); glow.position.set(0, -.74, .55); scene.add(glow);
    pivot = new T.Group(); pivot.position.z = -.6; const m = build(); m.position.z = .6; pivot.add(m); scene.add(pivot);
    resize();
  }

  function resize() {
    const c = renderer.domElement; W = c.clientWidth || 1; H = c.clientHeight || 1;
    renderer.setSize(W, H, false); camera.aspect = W / H;
    compact = W < 640; SCREEN.setCompact(compact);
    const tan = Math.tan(T.MathUtils.degToRad(camera.fov / 2));
    const usableH = H - 150; // room for the top bar and the channel buttons
    const needH = compact ? 1.2 : 1.74;
    const dH = (needH / 2) / tan * (H / Math.max(usableH, H * .6));
    const needW = compact ? 1.34 : 1.9;
    const dW = (needW / 2) / (tan * camera.aspect);
    const d = Math.max(dH, dW);
    camera.position.set(0, compact ? .06 : .16, d);
    camera.lookAt(0, compact ? -.12 : -.04, 0);
    camera.updateProjectionMatrix();
  }

  function pick(clientX, clientY) {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set((clientX - r.left) / r.width * 2 - 1, -(clientY - r.top) / r.height * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects([glass, power, ...buttons], false)[0];
    if (!hit) return null;
    if (hit.object === glass && hit.uv) return { kind: 'glass', x: hit.uv.x * SCREEN.W, y: (1 - hit.uv.y) * SCREEN.H };
    if (hit.object === power) return { kind: 'power', obj: power };
    return { kind: 'button', obj: hit.object, ch: hit.object.userData.ch };
  }
  function press(obj) {
    obj.position.z = obj.userData.z - .012;
    setTimeout(() => { obj.position.z = obj.userData.z; }, 160);
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(64, now - last); last = now;
    if (!state.dragging && now - state.lastDrag > 2600) { state.spin *= .94; }
    state.rotY += (state.tRotY + state.spin - state.rotY) * .08;
    state.rotX += (state.tRotX - state.rotX) * .08;
    // entrance
    if (state.riseT < 1) state.riseT = Math.min(1, (now - state.riseStart) / 1400);
    const e = 1 - Math.pow(1 - state.riseT, 4);
    pivot.position.y = (1 - e) * -1.6;
    pivot.rotation.y = state.rotY + (1 - e) * -1.1;
    pivot.rotation.x = state.rotX;
    ledMat.color.setHex(SCREEN.isOn ? 0x5CC6FF : 0xFFB547);
    SCREEN.frame(now, dt);
    screenTex.needsUpdate = true;
    renderer.render(scene, camera);
  }

  return {
    init, resize, frame, pick, press, state,
    riseIn() { state.riseT = 0; state.riseStart = performance.now(); },
    pressCh(i) { if (buttons[i]) press(buttons[i]); },
    get compact() { return compact; }
  };
})(); }

/* ============ Orchestration for the live site ============ */
(() => {
  const END = Date.UTC(2026, 11, 1, 0);            // the gift disappears after Cyber Monday
  const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.min.js';
  if (Date.now() >= END && location.hash !== '#black-friday') return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wrap = document.createElement('div');
  wrap.innerHTML = GIFT_HTML + OVERLAY_HTML;
  const COUNT = 3; // how many gifts hide on each page
  const gift0 = wrap.querySelector('.obf-gift'), bf = wrap.querySelector('.obf');
  const gifts = [gift0];
  for (let i = 1; i < COUNT; i++) gifts.push(gift0.cloneNode(true));
  gifts.forEach(g => { g.removeAttribute('id'); document.body.appendChild(g); });
  document.body.appendChild(bf);
  const $ = s => bf.querySelector(s);
  const stage = $('#obf-stage'), gl = $('#obf-gl'), paperEl = $('#obf-paper'), tearHint = $('#obf-tearHint'), hand = $('#obf-hand');
  const chans = [...bf.querySelectorAll('#obf-channels button')];
  let opened = false, started = false, paperReady = false, raf = 0, lastFocus = null, threeReady = null;

  (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    SCREEN.mark(c.getContext('2d'), 70, 64, 50, '#EAF2FB', '#0094FF');
    $('#obf-markSvg').innerHTML = `<image href="${c.toDataURL()}" width="64" height="64"/>`;
  })();

  /* ---- hide the gift somewhere new on every page load, away from text, images and controls ---- */
  const AVOID = 'h1,h2,h3,h4,h5,h6,p,a,button,img,picture,video,iframe,input,textarea,select,label,li,blockquote,figure,table,nav,header,footer,span,small,strong,em,svg,i,[role="button"]';
  function placeGift() {
    gifts.forEach(g => { g.hidden = true; });
    const sx = scrollX, sy = scrollY, W = document.documentElement.clientWidth, H = document.documentElement.scrollHeight, s = 58;
    const avoid = [];
    document.querySelectorAll(AVOID).forEach(el => {
      if (bf.contains(el)) return;
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
      avoid.push({ x: r.left + sx - 16, y: r.top + sy - 16, w: r.width + 32, h: r.height + 32 });
    });
    // spread the gifts out: each one gets its own band of the page
    const top = 120, span = Math.max(10, H - s - 400) / gifts.length;
    gifts.forEach((g, k) => {
      let best = null;
      for (let i = 0; i < 200; i++) {
        const x = 16 + Math.random() * (W - s - 32), y = top + k * span + Math.random() * span;
        if (!avoid.some(a => x < a.x + a.w && x + s > a.x && y < a.y + a.h && y + s > a.y)) { best = { x, y }; break; }
      }
      if (!best) best = { x: k % 2 ? 24 : W - s - 24, y: top + k * span + span / 2 };
      avoid.push({ x: best.x - 40, y: best.y - 40, w: s + 80, h: s + 80 });
      g.style.left = best.x + 'px'; g.style.top = best.y + 'px';
      g.hidden = false;
    });
  }
  if (document.readyState === 'complete') setTimeout(placeGift, 600); else addEventListener('load', () => setTimeout(placeGift, 600));
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (!opened) placeGift(); else resize(); }, 200); });

  function loadThree() {
    if (window.THREE) return Promise.resolve();
    if (threeReady) return threeReady;
    threeReady = new Promise((ok, fail) => {
      const s = document.createElement('script'); s.src = THREE_URL; s.async = true;
      s.onload = ok; s.onerror = fail; document.head.appendChild(s);
    });
    return threeReady;
  }
  // start fetching the 3D library when someone gets close to the gift
  gifts.forEach(g => { g.addEventListener('pointerenter', loadThree, { once: true }); g.addEventListener('focus', loadThree, { once: true }); });

  /* ---- open and close ---- */
  async function open() {
    if (opened) return; opened = true; lastFocus = document.activeElement;
    bf.hidden = false; document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => bf.classList.add('obf-on'));
    bf.scrollTop = 0; stage.classList.remove('obf-revealed'); tearHint.classList.remove('obf-gone');
    if (!paperReady) { paperReady = true; PAPER.setup(paperEl, $('#obf-paperCanvas'), reveal); }
    PAPER.reset();
    hand.style.left = (stage.clientWidth * .32) + 'px'; hand.style.top = (stage.clientHeight * .62) + 'px';
    hand.classList.remove('obf-play'); void hand.getBoundingClientRect(); if (!reduce) hand.classList.add('obf-play');
    setTimeout(() => $('#obf-autoTear').focus({ preventScroll: true }), 400);
    try { await loadThree(); } catch (e) { gl.hidden = true; return; }
    if (!started) { started = true; makeMonitor(); MONITOR.init(gl); bindGL(); }
    SCREEN.setTab(0, true); SCREEN.power(true); syncChans();
    MONITOR.resize(); loop();
  }
  function close() {
    if (!opened) return; opened = false;
    bf.classList.remove('obf-on'); document.documentElement.style.overflow = '';
    setTimeout(() => { bf.hidden = true; cancelAnimationFrame(raf); }, 350);
    if (location.hash === '#black-friday') history.replaceState(null, '', location.pathname + location.search);
    lastFocus?.focus?.();
    placeGift();
  }
  function reveal() {
    stage.classList.add('obf-revealed'); tearHint.classList.add('obf-gone'); hand.classList.remove('obf-play');
    if (window.MONITOR && !reduce) MONITOR.riseIn();
    SCREEN.power(false);
    setTimeout(() => SCREEN.power(true), reduce ? 0 : 450);
    setTimeout(() => chans[0].focus({ preventScroll: true }), 900);
    try { window.fbq && fbq('trackCustom', 'BlackFridayGiftOpened'); } catch (e) {}
  }
  gifts.forEach(g => g.addEventListener('click', open));
  $('#obf-bfClose').addEventListener('click', close);
  $('#obf-backToSite').addEventListener('click', close);
  $('#obf-autoTear').addEventListener('click', () => { tearHint.classList.add('obf-gone'); PAPER.auto(); });
  document.addEventListener('paper:start', () => { tearHint.classList.add('obf-gone'); hand.classList.remove('obf-play'); });
  addEventListener('keydown', e => {
    if (!opened) return;
    if (e.key === 'Escape') close();
    if (PAPER.done && /^[1-4]$/.test(e.key) && !e.metaKey && !e.ctrlKey) setChannel(+e.key - 1);
  });
  bf.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const f = [...bf.querySelectorAll('button,a[href]')].filter(el => el.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  /* ---- channels ---- */
  function syncChans() { chans.forEach((b, i) => b.setAttribute('aria-pressed', String(i === SCREEN.tab))); }
  function setChannel(i) { if (!SCREEN.isOn) SCREEN.power(true); SCREEN.setTab(i); syncChans(); }
  chans.forEach(b => b.addEventListener('click', () => { const i = +b.dataset.ch; setChannel(i); window.MONITOR && MONITOR.pressCh(i); }));

  /* ---- pointer on the 3D monitor ---- */
  function bindGL() {
    const st = MONITOR.state; let down = null;
    gl.addEventListener('pointermove', e => {
      if (down) {
        const dx = e.clientX - down.x;
        if (Math.abs(dx) > 4) down.moved = true;
        st.spin = down.spin + dx * .008; st.lastDrag = performance.now(); st.dragging = true;
        return;
      }
      if (e.pointerType === 'mouse' && !reduce) {
        const r = gl.getBoundingClientRect();
        st.tRotY = ((e.clientX - r.left) / r.width - .5) * .5;
        st.tRotX = ((e.clientY - r.top) / r.height - .5) * .14;
      }
      const hit = MONITOR.pick(e.clientX, e.clientY);
      const clickable = hit && (hit.kind !== 'glass' || SCREEN.hitTest(hit.x, hit.y) !== null);
      gl.style.cursor = clickable ? 'pointer' : 'grab';
    });
    gl.addEventListener('pointerdown', e => { down = { x: e.clientX, spin: st.spin, moved: false }; gl.setPointerCapture?.(e.pointerId); });
    const end = e => {
      if (!down) return;
      const wasDrag = down.moved; down = null; st.dragging = false; st.lastDrag = performance.now();
      if (wasDrag || e.type !== 'pointerup') return;
      const hit = MONITOR.pick(e.clientX, e.clientY);
      if (!hit || !PAPER.done) return;
      if (hit.kind === 'button') { MONITOR.press(hit.obj); setChannel(hit.ch); }
      else if (hit.kind === 'power') { MONITOR.press(hit.obj); SCREEN.power(!SCREEN.isOn); }
      else { const t = SCREEN.hitTest(hit.x, hit.y); if (t !== null) setChannel(t); }
    };
    gl.addEventListener('pointerup', end); gl.addEventListener('pointercancel', end);
    gl.addEventListener('pointerleave', () => { if (!down) { st.tRotY = 0; st.tRotX = 0; } });
  }
  function resize() { if (window.MONITOR && started) MONITOR.resize(); if (!PAPER.done) PAPER.size(); }

  let stageVisible = true;
  new IntersectionObserver(es => { stageVisible = es[0].isIntersecting; }).observe(stage);
  function loop() {
    cancelAnimationFrame(raf);
    const tick = now => { if (!opened) return; if (stageVisible) MONITOR.frame(now); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
  }

  const foot = () => { const r = SCREEN.bfIn(); $('#obf-footCount').textContent = `Black Friday in ${r.d} days, ${r.h} hours`; };
  foot(); setInterval(foot, 30000);

  // opesconsulting.london/#black-friday opens the gift straight away (handy for ads and emails)
  const fromHash = () => { if (location.hash === '#black-friday') open(); };
  addEventListener('hashchange', fromHash);
  if (document.readyState === 'complete') setTimeout(fromHash, 300); else addEventListener('load', () => setTimeout(fromHash, 300));
})();

})();
