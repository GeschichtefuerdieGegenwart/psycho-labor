/* Gegenwart – interaktive Bausteine. Ein klassisches Skript, keine Bibliothek, kein Netzwerk.
   Gegenwart.init(wurzel) belebt alle Elemente mit data-g="…". Ohne Aufruf bleibt alles lesbar (Ruhezustand = Endzustand). */
(function () {
  "use strict";
  var doc = document;
  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function css(name, fallback) {
    var v = getComputedStyle(doc.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  function ms(name, fallback) { var v = parseFloat(css(name, "")); return isNaN(v) ? fallback : v; }

  /* ---------- Bewegung ---------- */
  var mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  function ruhig() { return mq.matches || doc.documentElement.getAttribute("data-bewegung") === "weniger"; }
  function bewegen(el, frames, opt) {
    if (!el || !el.animate) return null;
    opt = opt || {};
    if (ruhig()) {
      if (!opt.fade) return null;
      return el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: Math.min(150, ms("--dauer-aus", 150)), easing: "linear" });
    }
    return el.animate(frames, {
      duration: opt.dauer || ms("--dauer-mittel", 220),
      easing: opt.kurve || css("--kurve-aus", "cubic-bezier(0.23, 1, 0.32, 1)"),
      delay: opt.verzug || 0,
      fill: "backwards"
    });
  }
  function staffel(liste, frames, opt) {
    var schritt = ms("--dauer-staffel", 30);
    liste.slice(0, 8).forEach(function (el, i) {
      var o = Object.assign({}, opt || {}); o.verzug = (o.verzug || 0) + i * schritt; bewegen(el, frames, o);
    });
  }
  function feder() {
    var f = css("--kurve-feder", "");
    return (f && window.CSS && CSS.supports && CSS.supports("transition-timing-function", f)) ? f : css("--kurve-aus", "ease-out");
  }
  function ansagen(el, text) { if (el) { el.textContent = ""; setTimeout(function () { el.textContent = text; }, 30); } }

  /* ---------- Bausteine ---------- */
  var B = {};

  // Bewegungsschalter: html[data-bewegung=weniger], gemerkt im Browser
  B.bewegung = function (el) {
    var box = $("input", el);
    try { if (localStorage.getItem("g-bewegung") === "weniger") doc.documentElement.setAttribute("data-bewegung", "weniger"); } catch (e) {}
    box.checked = doc.documentElement.getAttribute("data-bewegung") === "weniger";
    box.addEventListener("change", function () {
      if (box.checked) doc.documentElement.setAttribute("data-bewegung", "weniger");
      else doc.documentElement.removeAttribute("data-bewegung");
      try { localStorage.setItem("g-bewegung", box.checked ? "weniger" : "voll"); } catch (e) {}
    });
  };

  // Karte umdrehen
  B.wende = function (el) {
    var k = $(".g-wende__knopf", el);
    if (!k) return;
    k.hidden = false;
    $$(".g-wende__knopf", el).forEach(function (b) {
      b.hidden = false;
      b.addEventListener("click", function () {
        var auf = !el.hasAttribute("data-gewendet");
        el.toggleAttribute("data-gewendet", auf);
        $$(".g-wende__seite", el).forEach(function (s, i) { s.setAttribute("aria-hidden", String(auf ? i === 0 : i === 1)); });
        var ziel = auf ? $(".g-wende__seite--hinten .g-wende__knopf", el) : $(".g-wende__seite--vorne .g-wende__knopf", el);
        if (ziel) setTimeout(function () { ziel.focus({ preventScroll: true }); }, 0);
      });
    });
    $(".g-wende__seite--hinten", el).setAttribute("aria-hidden", "true");
  };

  // Denken vor Klicken: wählen, begründen, festlegen → gestufte Rückmeldung, Antwort versiegelt
  B.wahl = function (el) {
    var los = $("[data-g-festlegen]", el), feld = $("textarea", el), live = $("[aria-live]", el), stempel = $(".g-stempel", el);
    var mind = parseInt(el.getAttribute("data-mind") || "0", 10);
    function pruefen() {
      var gew = $("input:checked", el);
      var lang = !feld || !mind || feld.value.trim().length >= mind || feld.value.trim().length === 0;
      los.disabled = !gew || !lang || el.hasAttribute("data-zu");
    }
    el.addEventListener("change", pruefen); if (feld) feld.addEventListener("input", pruefen); pruefen();
    los.addEventListener("click", function () {
      var gew = $("input:checked", el); if (!gew) return;
      el.setAttribute("data-zu", "");
      $$("input", el).forEach(function (i) { i.disabled = true; }); if (feld) feld.readOnly = true;
      var opt = gew.closest(".g-option"), urteil = opt.getAttribute("data-urteil");
      var wort = { zentral: "zentral", begruendbar: "auch begründbar", kaum: "passt kaum" }[urteil] || "";
      staffel($$(".g-option__urteil", el), [{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { dauer: ms("--dauer-mittel", 220) });
      if (stempel) { stempel.hidden = false; bewegen(stempel, [{ transform: "rotate(-8deg) scale(1.35)", opacity: 0 }, { transform: "rotate(-8deg) scale(1)", opacity: 1 }], { dauer: 320, kurve: feder(), fade: true }); }
      ansagen(live, "Festgelegt. Deine Wahl: " + wort + ". " + (opt.getAttribute("data-grund") || ""));
      los.disabled = true;
    });
  };

  // Skala mit Bezugsmarke
  B.skala = function (el) {
    var r = $("input[type=range]", el), w = $(".g-skala__wert", el), ref = $(".g-skala__ref", el), k = $("[data-g-vergleichen]", el), t = $(".g-skala__ref-text", el);
    var namen = (el.getAttribute("data-stufen") || "").split("|");
    function zeigen() { var v = +r.value; w.textContent = namen[v - +r.min] ? v + " – " + namen[v - +r.min] : String(v); }
    r.addEventListener("input", zeigen); zeigen();
    if (k && ref) k.addEventListener("click", function () {
      var v = +el.getAttribute("data-referenz"), p = (v - r.min) / (r.max - r.min) * 100;
      ref.style.left = p + "%"; ref.hidden = false; if (t) t.hidden = false;
      bewegen(ref, [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { dauer: ms("--dauer-langsam", 300), fade: true });
      k.disabled = true;
    });
  };

  // Schwärzung aufdecken (gestaffelt)
  B.aufdecken = function (el) {
    $$(".g-schwarz", el).forEach(function (s, i) { s.style.setProperty("--i", Math.min(i, 7)); });
    var k = $("[data-g-aufdecken]", el), live = $("[aria-live]", el);
    if (!k) return;
    k.hidden = false;
    k.addEventListener("click", function () {
      var offen = !el.hasAttribute("data-offen");
      el.toggleAttribute("data-offen", offen);
      k.textContent = offen ? "Wieder schwärzen" : "Aufdecken";
      ansagen(live, offen ? "Geschwärzte Stellen aufgedeckt." : "Stellen wieder geschwärzt.");
    });
  };

  // Markieren mit zwei Stiften
  B.markieren = function (el) {
    var stift = "beleg";
    $$(".g-stift", el).forEach(function (b) {
      b.addEventListener("click", function () {
        stift = b.getAttribute("data-stift");
        $$(".g-stift", el).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      });
    });
    $$(".g-wort", el).forEach(function (w) {
      w.setAttribute("role", "button"); w.setAttribute("tabindex", "0");
      function setzen() {
        var hat = w.classList.contains("g-mark--" + stift);
        w.classList.remove("g-mark--beleg", "g-mark--gedanke");
        if (!hat) { w.classList.add("g-mark", "g-mark--" + stift); bewegen(w, [{ backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%" }], { dauer: 260 }); }
        w.setAttribute("aria-pressed", String(!hat));
        var n = $(".g-zaehler", el);
        if (n) n.textContent = $$(".g-mark--beleg", el).length + " Belege · " + $$(".g-mark--gedanke", el).length + " Gedanken";
      }
      w.addEventListener("click", setzen);
      w.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setzen(); } });
    });
  };

  // Schritte mit Stanzloch-Punkten
  B.schritte = function (el) {
    var punkte = $$(".g-punkt", el), text = $(".g-schritt-text", el), jetzt = +(el.getAttribute("data-jetzt") || 1);
    function malen(alt) {
      punkte.forEach(function (p, i) { p.setAttribute("data-stand", i + 1 < jetzt ? "fertig" : i + 1 === jetzt ? "jetzt" : "offen"); });
      text.textContent = "Schritt " + jetzt + " von " + punkte.length;
      if (alt !== undefined && punkte[jetzt - 1]) bewegen(punkte[jetzt - 1], [{ transform: "scale(.6)" }, { transform: "scale(1.25)" }], { dauer: ms("--dauer-langsam", 300), kurve: feder() });
    }
    $$("[data-g-schritt]", el).forEach(function (b) {
      b.addEventListener("click", function () {
        var alt = jetzt; jetzt = Math.max(1, Math.min(punkte.length, jetzt + +b.getAttribute("data-g-schritt"))); if (alt !== jetzt) malen(alt);
      });
    });
    malen();
  };

  // Zeitleiste: »Du bist hier« wandert per FLIP
  B.zeit = function (el) {
    var hier = $(".g-zeit__hier", el), info = $("[aria-live]", el);
    function setzen(li, animiert) {
      var btn = $("button", li), alt = hier.getBoundingClientRect();
      $$("button", el).forEach(function (b) { b.removeAttribute("aria-current"); });
      btn.setAttribute("aria-current", "step");
      li.appendChild(hier);
      var neu = hier.getBoundingClientRect();
      if (animiert) bewegen(hier, [{ transform: "translateX(" + (alt.left - neu.left) + "px)" }, { transform: "none" }], { dauer: ms("--dauer-reihe", 440), kurve: css("--kurve-beidseits", "ease-in-out") });
      if (info) info.textContent = $(".g-zeit__jahr", li).textContent + ": " + (li.getAttribute("data-mehr") || $(".g-zeit__text", li).textContent);
    }
    $$("li", el).forEach(function (li) { $("button", li).addEventListener("click", function () { setzen(li, true); }); });
    var start = $("li[data-hier]", el) || $("li", el); setzen(start, false);
  };

  // Balken wachsen auf Knopfdruck (ohne JS: volle Balken)
  B.balken = function (el) {
    var k = $("[data-g-zeigen]", el); if (!k) return;
    k.hidden = false;
    k.addEventListener("click", function () {
      staffel($$(".g-balken__wert", el), [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { dauer: ms("--dauer-reihe", 440) });
      staffel($$(".g-balken__zahl", el), [{ opacity: 0 }, { opacity: 1 }], { dauer: ms("--dauer-reihe", 440), verzug: 120 });
    });
  };

  // Gestufte Hilfen: eine nach der anderen
  B.hilfen = function (el) {
    var stufen = $$(".g-hilfe__stufe", el), k = $("[data-g-hilfe]", el), n = 0;
    stufen.forEach(function (s) { s.hidden = true; });
    k.hidden = false;
    k.addEventListener("click", function () {
      if (n >= stufen.length) return;
      var s = stufen[n++]; s.hidden = false;
      bewegen(s, [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { dauer: ms("--dauer-mittel", 220), fade: true });
      k.textContent = n < stufen.length ? "Nächste Hilfe (" + (n + 1) + " von " + stufen.length + ")" : "Alle Hilfen offen";
      k.disabled = n >= stufen.length;
    });
  };

  // Platten registrieren (einmal je Sitzung, oder auf Knopfdruck)
  B.platten = function (el) {
    function los() {
      var d = ms("--dauer-registrieren", 720), k = css("--kurve-register", "ease-out");
      bewegen($(".g-platte--ki", el), [{ transform: "translate(-14px,-10px)" }, { transform: "none" }], { dauer: d, kurve: k });
      bewegen($(".g-platte--lernen", el), [{ transform: "translate(14px,10px)" }, { transform: "none" }], { dauer: d, kurve: k });
      bewegen($(".g-schnitt", el), [{ opacity: 0, offset: 0 }, { opacity: 0, offset: .55 }, { opacity: 1 }], { dauer: d, kurve: "linear", fade: true });
    }
    var k = $("[data-g-registrieren]", el); if (k) { k.hidden = false; k.addEventListener("click", los); }
    var erst = true; try { erst = !sessionStorage.getItem("g-registriert"); sessionStorage.setItem("g-registriert", "1"); } catch (e) {}
    if (erst && el.hasAttribute("data-beim-start")) los();
  };

  // Musterbuch: jedes Muster auf Knopfdruck abspielen
  var MUSTER = {
    druck: function (b) { bewegen(b, [{ transform: "none" }, { transform: "translate(2px,2px)" }, { transform: "none" }], { dauer: ms("--dauer-druck", 100) * 2 }); },
    abheben: function (b) { bewegen(b, [{ transform: "none", boxShadow: "6px 6px 0 0 var(--petrol)" }, { transform: "translate(-2px,-2px)", boxShadow: "8px 8px 0 0 var(--petrol)" }, { transform: "none", boxShadow: "6px 6px 0 0 var(--petrol)" }], { dauer: ms("--dauer-schnell", 160) * 3 }); },
    erscheinen: function (b) { bewegen(b, [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { dauer: ms("--dauer-langsam", 300), fade: true }); },
    stempel: function (b) { bewegen(b, [{ transform: "rotate(-8deg) scale(1.35)", opacity: 0 }, { transform: "rotate(-8deg) scale(1)", opacity: 1 }], { dauer: 320, kurve: feder(), fade: true }); },
    wende: function (b) { bewegen(b, [{ transform: "perspective(600px) rotateY(0)" }, { transform: "perspective(600px) rotateY(180deg)" }, { transform: "perspective(600px) rotateY(360deg)" }], { dauer: ms("--dauer-wende", 460) * 2, kurve: css("--kurve-beidseits", "ease-in-out") }); },
    staffel: function (b) { staffel($$(".g-klotz", b), [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { dauer: ms("--dauer-langsam", 300) }); },
    balken: function (b) { bewegen($(".g-klotz", b), [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { dauer: ms("--dauer-reihe", 440) }); },
    register: function (b) { var k = $$(".g-klotz", b); bewegen(k[0], [{ transform: "translate(-14px,-10px)" }, { transform: "none" }], { dauer: ms("--dauer-registrieren", 720), kurve: css("--kurve-register", "ease-out") }); bewegen(k[1], [{ transform: "translate(14px,10px)" }, { transform: "none" }], { dauer: ms("--dauer-registrieren", 720), kurve: css("--kurve-register", "ease-out") }); },
    feder: function (b) { bewegen(b, [{ transform: "scale(.6)" }, { transform: "scale(1)" }], { dauer: ms("--dauer-langsam", 300), kurve: feder() }); }
  };
  B.musterbuch = function (el) {
    $$("[data-muster]", el).forEach(function (f) {
      var k = $(".g-knopf", f), buehne = $(".g-muster__buehne > *", f), name = f.getAttribute("data-muster");
      k.hidden = false;
      k.addEventListener("click", function () { if (MUSTER[name]) MUSTER[name](name === "staffel" || name === "register" || name === "balken" ? $(".g-muster__buehne", f) : buehne); });
    });
  };


  /* ---------- Leinwand (HTML5 Canvas) ---------- */
  function farbe(name, fallback) { return css("--" + name, fallback || "#000"); }
  function mischen(a, b, t) {
    function h(x) { x = x.replace("#", ""); if (x.length === 3) x = x.replace(/./g, function (c) { return c + c; }); return [parseInt(x.slice(0, 2), 16), parseInt(x.slice(2, 4), 16), parseInt(x.slice(4, 6), 16)]; }
    var A = h(a), B = h(b); return "rgb(" + A.map(function (v, i) { return Math.round(v + (B[i] - v) * t); }).join(",") + ")";
  }
  // leinwand(canvas, zeichnen(ctx, w, h, t)) – skaliert für devicePixelRatio, zeichnet neu bei Größenänderung,
  // start()/stop() für Schleifen (requestAnimationFrame), hält außer Sicht an und zeichnet bei weniger Bewegung nur den Endzustand.
  function leinwand(cv, zeichnen, opt) {
    opt = opt || {};
    var ctx = cv.getContext("2d"), st = { w: 0, h: 0, laeuft: false, raf: 0, t0: 0, pausiert: false };
    function messen() {
      var r = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      st.w = r.width || cv.width; st.h = r.height || cv.height;
      cv.width = Math.round(st.w * dpr); cv.height = Math.round(st.h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function bild(t) { zeichnen(ctx, st.w, st.h, t || 0); }
    function schleife(ts) { if (!st.laeuft) return; if (!st.t0) st.t0 = ts; bild((ts - st.t0) / 1000); st.raf = requestAnimationFrame(schleife); }
    var api = {
      ctx: ctx, zeichnen: function (t) { bild(t); },
      start: function () { if (ruhig()) { bild(opt.ruhigT != null ? opt.ruhigT : 0); return false; } if (st.laeuft) return true; st.laeuft = true; st.t0 = 0; st.raf = requestAnimationFrame(schleife); return true; },
      stop: function () { st.laeuft = false; cancelAnimationFrame(st.raf); },
      laeuft: function () { return st.laeuft; },
      // einmalige Bewegung über d Sekunden, danach steht das Bild
      einmal: function (d, fertig) { if (ruhig()) { bild(d); if (fertig) fertig(); return; } var t0 = 0; api.stop(); (function s(ts) { if (!t0) t0 = ts; var t = (ts - t0) / 1000; if (t >= d) { bild(d); if (fertig) fertig(); return; } bild(t); requestAnimationFrame(s); })(performance.now()); }
    };
    messen(); bild(0);
    if (opt.autoplay && !ruhig() && window.IntersectionObserver) { var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io.disconnect(); api.start(); } }); io.observe(cv); }
    if (window.ResizeObserver) new ResizeObserver(function () { messen(); bild(0); }).observe(cv);
    if (window.IntersectionObserver) new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting && st.laeuft) { api.stop(); st.pausiert = true; }
      else if (e[0].isIntersecting && st.pausiert) { st.pausiert = false; api.start(); }
    }).observe(cv);
    return api;
  }
  function zufall(seed) { var s = seed || 1; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function pos(cv, e) { var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }

  // Zeichenfläche: zwei Stifte (Beleg = Marker, Gedanke = Kuli) über einem Text; Rückgängig, Leeren
  B.zeichnen = function (el) {
    var cv = $("canvas", el), striche = [], akt = null, stift = "beleg", z = $(".g-zaehler", el);
    var L = leinwand(cv, function (ctx, w, h) {
      ctx.clearRect(0, 0, w, h);
      striche.concat(akt ? [akt] : []).forEach(function (s) {
        ctx.strokeStyle = farbe(s.stift === "beleg" ? "marker" : "kuli"); ctx.globalAlpha = s.stift === "beleg" ? .55 : 1;
        ctx.lineWidth = s.stift === "beleg" ? 16 : 3; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.beginPath();
        s.p.forEach(function (q, i) { i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.stroke(); ctx.globalAlpha = 1;
      });
    });
    function zaehlen() { if (z) z.textContent = striche.length + (striche.length === 1 ? " Strich" : " Striche"); }
    $$(".g-stift", el).forEach(function (b) { b.addEventListener("click", function () { stift = b.getAttribute("data-stift"); $$(".g-stift", el).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); }); }); });
    cv.addEventListener("pointerdown", function (e) { cv.setPointerCapture(e.pointerId); akt = { stift: stift, p: [pos(cv, e)] }; L.zeichnen(); });
    cv.addEventListener("pointermove", function (e) { if (!akt) return; akt.p.push(pos(cv, e)); L.zeichnen(); });
    function ende() { if (!akt) return; if (akt.p.length === 1) akt.p.push([akt.p[0][0] + .1, akt.p[0][1]]); striche.push(akt); akt = null; L.zeichnen(); zaehlen(); }
    cv.addEventListener("pointerup", ende); cv.addEventListener("pointercancel", ende);
    var r = $("[data-g-rueck]", el), l = $("[data-g-leeren]", el);
    if (r) r.addEventListener("click", function () { striche.pop(); L.zeichnen(); zaehlen(); });
    if (l) l.addEventListener("click", function () { striche = []; L.zeichnen(); zaehlen(); });
  };

  // Verortung: sich auf zwei Achsen einordnen, dann die Bezugspunkte (Klasse, Studie) einblenden
  B.verortung = function (el) {
    var cv = $("canvas", el), ich = null, zeige = 0, live = $("[aria-live]", el), k = $("[data-g-vergleichen]", el);
    var refs = (el.getAttribute("data-punkte") || "").split(";").filter(Boolean).map(function (p) { return p.split(",").map(Number); });
    var L = leinwand(cv, function (ctx, w, h, t) {
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = farbe("flaeche"); ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = farbe("linie"); ctx.lineWidth = 1;
      for (var i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(w * i / 4, 0); ctx.lineTo(w * i / 4, h); ctx.moveTo(0, h * i / 4); ctx.lineTo(w, h * i / 4); ctx.stroke(); }
      ctx.strokeStyle = farbe("stahl"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
      if (zeige) refs.forEach(function (p, i) {
        var a = Math.max(0, Math.min(1, (t - i * .03) / .3)), e = 1 - Math.pow(1 - a, 3);
        ctx.fillStyle = farbe("petrol"); ctx.beginPath(); ctx.arc(p[0] * w, p[1] * h, 7 * e, 0, Math.PI * 2); ctx.fill();
      });
      if (ich) { ctx.fillStyle = farbe("kuli"); ctx.strokeStyle = farbe("flaeche"); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ich[0] * w, ich[1] * h, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
    });
    function setzen(x, y) {
      ich = [Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y))]; L.zeichnen(zeige ? 9 : 0);
      if (k) k.disabled = false;
      ansagen(live, "Deine Position: " + Math.round(ich[0] * 100) + " % von links, " + Math.round((1 - ich[1]) * 100) + " % von unten.");
    }
    cv.addEventListener("pointerdown", function (e) { var p = pos(cv, e); setzen(p[0] / cv.clientWidth, p[1] / cv.clientHeight); });
    cv.addEventListener("keydown", function (e) {
      var d = { ArrowLeft: [-.05, 0], ArrowRight: [.05, 0], ArrowUp: [0, -.05], ArrowDown: [0, .05] }[e.key]; if (!d) return; e.preventDefault();
      var p = ich || [.5, .5]; setzen(p[0] + d[0], p[1] + d[1]);
    });
    if (k) { k.disabled = true; k.addEventListener("click", function () { zeige = 1; k.disabled = true; L.einmal(.3 + refs.length * .03, function () { ansagen(live, refs.length + " Bezugspunkte eingeblendet."); }); }); }
  };

  // Gemeinsames Schicksal: Punkte, von denen ein Teil sich gemeinsam bewegt – man sieht die Gruppe nur in Bewegung
  B.schicksal = function (el) {
    var cv = $("canvas", el), z = zufall(7), N = 90, P = [], anteil = .3, zeigen = false, sl = $("input[type=range]", el), live = $("[aria-live]", el);
    for (var i = 0; i < N; i++) P.push({ x: z(), y: z(), vx: (z() - .5) * .14, vy: (z() - .5) * .14, ph: z() * 6.28 });
    var L = leinwand(cv, function (ctx, w, h, t) {
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = farbe("flaeche"); ctx.fillRect(0, 0, w, h);
      P.forEach(function (p, i) {
        var g = i < N * anteil, x, y;
        if (g) { x = p.x + Math.sin(t * 1.2) * .06; y = p.y + Math.cos(t * 1.2) * .04; }
        else { x = p.x + Math.sin(t * .9 + p.ph) * p.vx; y = p.y + Math.cos(t * 1.1 + p.ph) * p.vy; }
        x = ((x % 1) + 1) % 1; y = ((y % 1) + 1) % 1;
        ctx.fillStyle = (zeigen || (ruhig() && zeigen)) && g ? farbe("petrol") : farbe("text");
        ctx.beginPath(); ctx.arc(x * w, y * h, 5, 0, Math.PI * 2); ctx.fill();
      });
    }, { ruhigT: 1.3, autoplay: el.hasAttribute("data-autoplay") });
    var s = $("[data-g-start]", el), v = $("[data-g-gruppe]", el);
    if (s) { if (el.hasAttribute("data-autoplay") && !ruhig()) s.textContent = "Anhalten"; s.addEventListener("click", function () {
      if (L.laeuft()) { L.stop(); s.textContent = "Bewegung starten"; return; }
      if (L.start()) s.textContent = "Anhalten"; else ansagen(live, "Weniger Bewegung ist eingeschaltet: Die Punkte stehen still. Nutze »Gruppe zeigen«.");
    }); }
    if (v) v.addEventListener("click", function () { zeigen = !zeigen; v.textContent = zeigen ? "Gruppe verbergen" : "Gruppe zeigen"; if (!L.laeuft()) L.zeichnen(1.3); ansagen(live, zeigen ? Math.round(N * anteil) + " von " + N + " Punkten bewegen sich gemeinsam." : "Gruppe verborgen."); });
    if (sl) sl.addEventListener("input", function () { anteil = sl.value / 100; var o = $(".g-skala__wert", el); if (o) o.textContent = sl.value + " %"; if (!L.laeuft()) L.zeichnen(1.3); });
  };

  // Sitze: Halbrund aus Sitzen; gewählte Fraktionen füllen sich, die Mehrheitsschwelle steht als Zahl
  B.sitze = function (el) {
    var cv = $("canvas", el), F = JSON.parse(el.getAttribute("data-fraktionen") || "[]"), gew = {}, live = $("[aria-live]", el), aus = $(".g-sitze__stand", el);
    var ges = F.reduce(function (a, f) { return a + f.sitze; }, 0), mehr = Math.floor(ges / 2) + 1, S = [], anim = {};
    function bauen(w, h) {
      S = []; var R = 10, cx = w / 2, cy = h - 8, rmax = Math.min(w / 2 - 8, h - 16), rmin = rmax * .42, roh = [];
      for (var r = 0; r < R; r++) roh.push(rmin + (rmax - rmin) * r / (R - 1));
      var sum = roh.reduce(function (a, b) { return a + b; }, 0), rest = ges, cnt = roh.map(function (x, i) { var n = Math.round(ges * x / sum); return n; });
      var diff = ges - cnt.reduce(function (a, b) { return a + b; }, 0); cnt[R - 1] += diff;
      roh.forEach(function (rad, r) { for (var i = 0; i < cnt[r]; i++) { var a = Math.PI - Math.PI * (i + .5) / cnt[r]; S.push({ x: cx + Math.cos(a) * rad, y: cy - Math.sin(a) * rad, a: a, rad: rad }); } });
      S.sort(function (p, q) { return q.a - p.a || p.rad - q.rad; });
      var k = 0; F.forEach(function (f, fi) { for (var i = 0; i < f.sitze; i++) S[k++].f = fi; });
      S.forEach(function (s) { s.r = Math.max(2.2, (rmax - rmin) / (R - 1) * .36); });
    }
    var L = leinwand(cv, function (ctx, w, h, t) {
      if (!S.length || S.w !== w) { bauen(w, h); S.w = w; }
      ctx.clearRect(0, 0, w, h);
      S.forEach(function (s, i) {
        var an = gew[s.f], a0 = anim[s.f], k = an ? 1 : 0;
        if (a0 != null) { var tt = (t - a0 - (i % 40) * .004) / .3; k = Math.max(0, Math.min(1, tt)); if (!an) k = 1 - k; }
        ctx.fillStyle = farbe("karton"); ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.29); ctx.fill();
        if (k > 0) { ctx.fillStyle = farbe("petrol"); ctx.beginPath(); ctx.arc(s.x, s.y, s.r * k, 0, 6.29); ctx.fill(); }
      });
      ctx.strokeStyle = farbe("oxid"); ctx.lineWidth = 2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(w / 2, h - 8); ctx.lineTo(w / 2, 4); ctx.stroke(); ctx.setLineDash([]);
    });
    function stand() {
      var n = F.reduce(function (a, f, i) { return a + (gew[i] ? f.sitze : 0); }, 0), txt = n + " von " + ges + " Sitzen" + (n >= mehr ? " – Mehrheit (ab " + mehr + ")" : " – keine Mehrheit (nötig: " + mehr + ")");
      if (aus) aus.textContent = txt; ansagen(live, txt);
    }
    $$("[data-fraktion]", el).forEach(function (b) {
      b.addEventListener("click", function () {
        var i = +b.getAttribute("data-fraktion"); gew[i] = !gew[i]; b.setAttribute("aria-pressed", String(!!gew[i]));
        anim = {}; anim[i] = 0; L.einmal(.3 + .2, function () { anim = {}; L.zeichnen(0); }); stand();
      });
    });
    stand();
  };

  // Verlauf: ein Merkmal ändert sich stetig von West nach Ost; eine verschiebbare Grenze zeigt, wie willkürlich sie schneidet
  B.verlauf = function (el) {
    var cv = $("canvas", el), sl = $("input[type=range]", el), live = $("[aria-live]", el), aus = $(".g-verlauf__stand", el), z = zufall(11), C = 36, R = 9, D = [];
    for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) D.push({ c: c, r: r, v: Math.max(0, Math.min(1, c / (C - 1) + (z() - .5) * .18)) });
    var grenze = sl ? sl.value / 100 : .5;
    var L = leinwand(cv, function (ctx, w, h) {
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = farbe("flaeche"); ctx.fillRect(0, 0, w, h);
      var dx = w / C, dy = h / R, rad = Math.min(dx, dy) * .36, A = farbe("honigplatte"), Bc = farbe("petrol");
      D.forEach(function (d) { ctx.fillStyle = mischen(A, Bc, d.v); ctx.beginPath(); ctx.arc((d.c + .5) * dx, (d.r + .5) * dy, rad, 0, 6.29); ctx.fill(); });
      var gx = grenze * w; ctx.strokeStyle = farbe("text"); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
      ctx.fillStyle = farbe("text"); ctx.fillRect(gx - 14, 0, 28, 6);
    });
    function stand() {
      var gc = grenze * C, li = D.filter(function (d) { return d.c + .5 < gc; }), re = D.filter(function (d) { return d.c + .5 >= gc; });
      var m = function (a) { return a.length ? Math.round(a.reduce(function (s, d) { return s + d.v; }, 0) / a.length * 100) : 0; };
      var n1 = D.filter(function (d) { return d.c === Math.max(0, Math.ceil(gc - 1) - 0); }), n2 = D.filter(function (d) { return d.c === Math.min(C - 1, Math.ceil(gc)); });
      var txt = "Links der Grenze im Mittel " + m(li) + " %, rechts " + m(re) + " %. Die Nachbarn direkt an der Grenze: " + m(n1) + " % und " + m(n2) + " %.";
      if (aus) aus.textContent = txt; ansagen(live, txt);
    }
    if (sl) sl.addEventListener("input", function () { grenze = sl.value / 100; L.zeichnen(); stand(); });
    var zieh = false;
    cv.addEventListener("pointerdown", function (e) { zieh = true; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener("pointermove", function (e) { if (!zieh) return; grenze = Math.max(.03, Math.min(.97, pos(cv, e)[0] / cv.clientWidth)); if (sl) sl.value = Math.round(grenze * 100); L.zeichnen(); });
    cv.addEventListener("pointerup", function () { if (zieh) { zieh = false; stand(); } });
    stand();
  };

  /* ---------- Scrub: jede Bewegung mit Regler oder Finger vor- und zurückziehen ---------- */
  // scrub(regler, bild(t 0..1), opt{dauer (s), autoplay, knopf, pendeln}) – bild wird mit dem Reglerwert aufgerufen;
  // »Abspielen« fährt den Regler automatisch (auch bei weniger Bewegung erlaubt, weil die Person jederzeit eingreifen kann).
  function scrub(regler, bild, opt) {
    opt = opt || {}; var raf = 0, laeuft = false, richtung = 1, k = opt.knopf, max = +regler.max || 100, min = +regler.min || 0;
    function wert() { return (regler.value - min) / (max - min); }
    function setzen(v) { regler.value = min + Math.max(0, Math.min(1, v)) * (max - min); bild(wert()); regler.dispatchEvent(new Event("scrub")); }
    function schritt(ts, letzte) {
      if (!laeuft) return; var dt = letzte ? (ts - letzte) / 1000 : 0, v = wert() + richtung * dt / (opt.dauer || 4);
      if (v >= 1 || v <= 0) { if (opt.pendeln) { richtung = -richtung; v = Math.max(0, Math.min(1, v)); } else { setzen(v >= 1 ? 1 : 0); api.stop(); return; } }
      setzen(v); raf = requestAnimationFrame(function (t2) { schritt(t2, ts); });
    }
    var api = {
      start: function () { if (laeuft) return; if (wert() >= 1 && !opt.pendeln) setzen(0); laeuft = true; if (k) { k.textContent = "Anhalten"; k.setAttribute("aria-pressed", "true"); } raf = requestAnimationFrame(function (t) { schritt(t, 0); }); },
      stop: function () { laeuft = false; cancelAnimationFrame(raf); if (k) { k.textContent = opt.text || "Abspielen"; k.setAttribute("aria-pressed", "false"); } },
      laeuft: function () { return laeuft; }, setzen: setzen, wert: wert
    };
    regler.addEventListener("input", function () { if (laeuft) api.stop(); bild(wert()); });
    if (k) k.addEventListener("click", function () { laeuft ? api.stop() : api.start(); });
    if (window.IntersectionObserver) new IntersectionObserver(function (e) { if (!e[0].isIntersecting && laeuft) { api.stop(); api._p = true; } else if (e[0].isIntersecting && api._p) { api._p = false; api.start(); } }).observe(regler);
    bild(wert());
    if (opt.autoplay && !ruhig()) { if (window.IntersectionObserver) { var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io.disconnect(); api.start(); } }); io.observe(opt.sicht || regler); } else api.start(); }
    return api;
  }

  // Text aufbauen: Wörter erscheinen nacheinander; der volle Text bleibt für Hilfstechnik sofort da.
  function setzenText(el, opt) {
    opt = opt || {}; var text = el.getAttribute("data-text") || el.textContent.trim(), woerter = text.split(/\s+/);
    el.setAttribute("data-text", text); el.innerHTML = "";
    var sr = doc.createElement("span"); sr.className = "g-sr"; sr.textContent = text; el.appendChild(sr);
    var sicht = doc.createElement("span"); sicht.setAttribute("aria-hidden", "true"); el.appendChild(sicht);
    woerter.forEach(function (w, i) { var s = doc.createElement("span"); s.className = "g-wortauf"; s.textContent = w; sicht.appendChild(s); if (i < woerter.length - 1) sicht.appendChild(doc.createTextNode(" ")); });
    var spans = $$(".g-wortauf", sicht);
    function zeigen(v) { var n = Math.round(v * spans.length); spans.forEach(function (s, i) { s.classList.toggle("ist-da", i < n); }); }
    if (ruhig()) { zeigen(1); return { zeigen: zeigen, spielen: function () { zeigen(1); } }; }
    function spielen() { zeigen(0); var d = opt.dauer || Math.min(2.4, .12 * spans.length), t0 = 0; (function s(ts) { if (!t0) t0 = ts; var v = Math.min(1, (ts - t0) / 1000 / d); zeigen(v); if (v < 1) requestAnimationFrame(s); })(performance.now()); }
    if (opt.sofort) spielen(); else zeigen(1);
    return { zeigen: zeigen, spielen: spielen };
  }
  B.aufbauen = function (el) { var k = $("[data-g-aufbauen]", el), ziel = $("[data-text], .g-aufbau", el) || el; var S = setzenText(ziel, { sofort: el.hasAttribute("data-autoplay") }); if (k) k.addEventListener("click", S.spielen); };

  // Vorher–nachher: zwei Zustände, ein Griff. Ziehen, Regler (Tastatur) oder Abspielen (pendelt einmal).
  B.schieber = function (el) {
    var r = $("input[type=range]", el), nach = $(".g-schieber__nach", el), griff = $(".g-schieber__griff", el), live = $("[aria-live]", el), aus = $(".g-schieber__stand", el), buehne = $(".g-schieber__buehne", el);
    var a = el.getAttribute("data-vorher") || "Vorher", b = el.getAttribute("data-nachher") || "Nachher", zieh = false;
    function bild(v) { var p = v * 100; nach.style.clipPath = "inset(0 0 0 " + p + "%)"; griff.style.left = p + "%"; if (aus) aus.textContent = Math.round(p) + " % " + b + " · " + Math.round(100 - p) + " % " + a; }
    var S = scrub(r, bild, { dauer: +(el.getAttribute("data-dauer") || 3), pendeln: true, autoplay: el.hasAttribute("data-autoplay"), sicht: buehne, knopf: $("[data-g-abspielen]", el), text: "Hin und her" });
    buehne.addEventListener("pointerdown", function (e) { zieh = true; buehne.setPointerCapture(e.pointerId); S.stop(); S.setzen(pos(buehne, e)[0] / buehne.clientWidth); });
    buehne.addEventListener("pointermove", function (e) { if (zieh) S.setzen(pos(buehne, e)[0] / buehne.clientWidth); });
    buehne.addEventListener("pointerup", function () { zieh = false; ansagen(live, aus ? aus.textContent : ""); });
    r.addEventListener("change", function () { ansagen(live, aus ? aus.textContent : ""); });
  };

  // Zeitstrahl: Werte über die Zeit; der Regler zieht die Zeit, Zwischenstände werden interpoliert, Bildtexte bauen sich auf.
  B.zeitstrahl = function (el) {
    var cv = $("canvas", el), r = $("input[type=range]", el), live = $("[aria-live]", el), jahr = $(".g-zeitstrahl__jahr", el), txt = $(".g-zeitstrahl__text", el);
    var D = JSON.parse(el.getAttribute("data-daten") || "[]"), max = Math.max.apply(null, D.map(function (d) { return d.wert; })) * 1.15, letzt = -1, T;
    var L = leinwand(cv, function (ctx, w, h) {
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = farbe("flaeche"); ctx.fillRect(0, 0, w, h);
      var v = r ? (r.value - r.min) / (r.max - r.min) : 1, n = D.length, pad = 28, bw = (w - pad * 2) / n, t = v * (n - 1);
      ctx.strokeStyle = farbe("linie"); ctx.lineWidth = 1; [0.25, 0.5, 0.75].forEach(function (g) { ctx.beginPath(); ctx.moveTo(pad, h - 30 - (h - 60) * g); ctx.lineTo(w - pad, h - 30 - (h - 60) * g); ctx.stroke(); });
      D.forEach(function (d, i) {
        var k = Math.max(0, Math.min(1, t - i + 1)), hh = (h - 60) * (d.wert / max) * k, x = pad + i * bw + bw * .2, bwi = bw * .6;
        ctx.fillStyle = i <= t ? farbe("petrol") : farbe("karton"); ctx.fillRect(x, h - 30 - hh, bwi, hh);
        ctx.fillStyle = farbe("text"); ctx.font = "700 14px " + farbe("font-text", "sans-serif"); ctx.textAlign = "center"; ctx.fillText(d.zeit, x + bwi / 2, h - 10);
        if (k > 0) { ctx.font = "700 15px " + farbe("font-text", "sans-serif"); ctx.fillText(String(Math.round(d.wert * k * 10) / 10).replace(".", ",") + (d.einheit || ""), x + bwi / 2, h - 36 - hh); }
      });
      var idx = Math.round(t);
      if (idx !== letzt) { letzt = idx; if (jahr) jahr.textContent = D[idx].zeit; if (txt) { txt.setAttribute("data-text", D[idx].text || ""); T = setzenText(txt, { sofort: true, dauer: 1 }); } if (live) live.textContent = D[idx].zeit + ": " + D[idx].wert + (D[idx].einheit || "") + ". " + (D[idx].text || ""); }
    });
    if (r) scrub(r, function () { L.zeichnen(); }, { dauer: +(el.getAttribute("data-dauer") || 6), autoplay: el.hasAttribute("data-autoplay"), sicht: cv, knopf: $("[data-g-abspielen]", el) });
  };

  // Zustandskarte: alle Zustände eines Bausteins nebeneinander; »Übergang abspielen« geht sie der Reihe nach durch
  B.zustaende = function (el) {
    var k = $("[data-g-durchlauf]", el), karten = $$("[data-zustand]", el), live = $("[aria-live]", el), i = -1, timer = 0;
    function anwenden(karte, an) {
      var z = karte.getAttribute("data-zustand"), ziel = $("[data-ziel]", karte); if (!ziel) return;
      ziel.classList.toggle("g-sim-" + z, an); karte.classList.toggle("ist-aktiv", an);
      if (z === "gesperrt") ziel.toggleAttribute("disabled", an);
      if (z === "fokus") { if (an) ziel.classList.add("g-sim-fokus"); else ziel.classList.remove("g-sim-fokus"); }
      if (z === "gewaehlt" || z === "festgelegt") { var inp = $("input", ziel); if (inp) inp.checked = an; }
    }
    karten.forEach(function (c) { anwenden(c, true); });
    function schritt() {
      karten.forEach(function (c, j) { c.classList.toggle("ist-aktiv", j === i); });
      if (i >= 0) { var c = karten[i], z = c.getAttribute("data-zustand"), ziel = $("[data-ziel]", c); bewegen(ziel, [{ transform: "scale(.96)", opacity: .6 }, { transform: "none", opacity: 1 }], { dauer: ms("--dauer-mittel", 220), fade: true }); ansagen(live, "Zustand: " + ($(".g-zustand__name", c) || c).textContent); }
      i++; if (i < karten.length) timer = setTimeout(schritt, ruhig() ? 600 : 900); else { i = -1; k.textContent = "Übergänge abspielen"; }
    }
    if (k) k.addEventListener("click", function () { clearTimeout(timer); i = 0; k.textContent = "Läuft …"; schritt(); });
  };

  // Ansichtswechsel: Karte wird zur Detailansicht (View Transitions, mit Rückfall ohne Bewegung)
  B.ansicht = function (el) {
    var liste = $(".g-ansicht__liste", el), detail = $(".g-ansicht__detail", el), live = $("[aria-live]", el);
    function wechseln(fn, fokus) { var go = function () { fn(); if (fokus) setTimeout(function () { fokus.focus({ preventScroll: true }); }, 0); }; if (doc.startViewTransition && !ruhig()) doc.startViewTransition(go); else go(); }
    $$("[data-g-oeffnen]", liste).forEach(function (b) {
      b.addEventListener("click", function () {
        var karte = b.closest(".g-karte"), bild = $(".g-ansicht__bild", karte), titel = $(".g-karte__titel", karte);
        $$(".g-karte", liste).forEach(function (c) { $(".g-ansicht__bild", c).style.viewTransitionName = ""; $(".g-karte__titel", c).style.viewTransitionName = ""; });
        bild.style.viewTransitionName = "bild"; titel.style.viewTransitionName = "titel";
        $(".g-ansicht__bild", detail).style.viewTransitionName = "bild"; $(".g-ansicht__titel", detail).style.viewTransitionName = "titel";
        $(".g-ansicht__titel", detail).textContent = titel.textContent; $(".g-ansicht__text", detail).textContent = karte.getAttribute("data-text") || "";
        $(".g-ansicht__bild", detail).className = bild.className.replace("g-ansicht__bild", "g-ansicht__bild");
        $(".g-ansicht__bild", detail).style.background = getComputedStyle(bild).background;
        wechseln(function () { liste.hidden = true; detail.hidden = false; }, $("[data-g-zurueck]", detail));
        ansagen(live, "Geöffnet: " + titel.textContent);
      });
    });
    var z = $("[data-g-zurueck]", detail);
    if (z) z.addEventListener("click", function () { wechseln(function () { detail.hidden = true; liste.hidden = false; }, $("[data-g-oeffnen]", liste)); ansagen(live, "Zurück zur Übersicht."); });
  };

  function init(wurzel) {
    wurzel = wurzel || doc;
    (wurzel.documentElement || wurzel).classList.add("g-ist-js");
    $$("[data-g]", wurzel).forEach(function (el) {
      if (el.__g) return; el.__g = true;
      el.getAttribute("data-g").split(" ").forEach(function (n) { if (B[n]) B[n](el); });
    });
  }

  window.Gegenwart = { init: init, bewegen: bewegen, staffel: staffel, ruhig: ruhig, muster: MUSTER, bausteine: B, leinwand: leinwand, farbe: farbe, mischen: mischen, zufall: zufall, scrub: scrub, setzenText: setzenText };
  if (doc.readyState !== "loading") init(doc); else doc.addEventListener("DOMContentLoaded", function () { init(doc); });
})();
