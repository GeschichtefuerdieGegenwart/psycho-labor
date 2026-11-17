/* Stunde 3 · Wann lohnt sich Anstrengung? – nach M6 (Eccles), dazu Leistungsmotivation (Hoppe, Atkinson).
   Das Zielspiel (Papierkorbwurf) ist analog; die Seite hält nur Wahl und Ergebnis fest. */
(function () {
  "use strict";
  var E = window.EINHEIT;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function bild(id) { var r = ""; E.BILDER.forEach(function (b) { if (b.id === id) r = b.bild; }); return r; }

  /* ---------- Zielspiel: Wurfprotokoll ---------- */
  var LINIEN = [1, 2, 3, 4, 5];
  function wechsel(w) {
    /* Was geschah nach einem Treffer, was nach einem Fehlwurf? */
    var r = [];
    for (var i = 1; i < w.length; i++) {
      if (!w[i] || !w[i - 1] || w[i].l == null || w[i - 1].t == null) continue;
      r.push({ nach: w[i - 1].t ? "Treffer" : "Fehlwurf", wohin: w[i].l > w[i - 1].l ? "weiter weg" : w[i].l < w[i - 1].l ? "näher" : "gleich", von: w[i - 1].l, zu: w[i].l });
    }
    return r;
  }
  var protokoll = {
    typ: "eigen",
    erledigt: function (S) { var w = S.wurf || []; return !!S.strich || (w.length === 3 && w.every(function (x) { return x && x.l != null && x.t != null; })); },
    druck: function (c) { if (c.S.strich) return "<p><b>Zielspiel:</b> Ich habe vorne die Strichliste geführt.</p>"; var w = c.S.wurf || []; if (!w.length) return ""; return "<p><b>Mein Zielspiel:</b> " + w.map(function (x, i) { return "Wurf " + (i + 1) + ": " + (x.l != null ? x.l + " m" : "–") + ", " + (x.t == null ? "–" : x.t ? "Treffer" : "daneben"); }).join(" · ") + "</p>"; },
    bauen: function (c) {
      var S = c.S; if (!S.wurf) S.wurf = [];
      var n = c.el('<div class="k-protokoll" role="group" aria-label="Wurfprotokoll"></div>');
      function malen() {
        var w = S.wurf;
        if (S.strich) { n.innerHTML = '<p><b>Du führst heute vorne die Strichliste.</b> Du trägst keine eigenen Würfe ein. Zähle mit, von welcher Linie geworfen wird und was nach einem Treffer oder Fehlwurf geschieht.</p><div class="k-frei"><button type="button" class="g-knopf g-knopf--still" data-strich="0">Doch selbst werfen</button></div>'; return; }
        n.innerHTML = [0, 1, 2].map(function (i) {
          var x = w[i] || {}, frei = i === 0 || (w[i - 1] && w[i - 1].t != null), aktiv = frei && x.t == null;
          return '<div class="k-wurf"' + (aktiv ? " data-aktiv" : "") + ' aria-disabled="' + !frei + '"><b>Wurf ' + (i + 1) + '</b><div class="k-wurf__wahl"><span class="k-sr">Linie wählen:</span>' + LINIEN.map(function (l) {
            return '<button type="button" data-w="' + i + '" data-l="' + l + '" aria-pressed="' + (x.l === l) + '"' + (frei && x.t == null ? "" : " disabled") + ">" + l + " m</button>";
          }).join("") + '<span class="k-wurf__trenner" aria-hidden="true"></span><button type="button" data-w="' + i + '" data-t="1" aria-pressed="' + (x.t === true) + '"' + (x.l != null && frei ? "" : " disabled") + '>Treffer</button><button type="button" data-w="' + i + '" data-t="0" aria-pressed="' + (x.t === false) + '"' + (x.l != null && frei ? "" : " disabled") + ">daneben</button></div></div>";
        }).join("") + '<p class="k-klein" aria-live="polite">' + musterText(w) + '</p><div class="k-frei"><p class="k-klein">Du wirfst nicht? Dann bist du heute für die Strichliste vorne zuständig.</p><button type="button" class="g-knopf g-knopf--still" data-strich="1">Ich führe heute die Strichliste</button></div>';
      }
      function musterText(w) {
        var r = wechsel(w);
        if (!r.length) return "Erst die Linie wählen, dann werfen, dann eintragen.";
        return "Dein Muster: " + r.map(function (x) { return "nach dem " + x.nach + " " + x.wohin; }).join(", ") + ".";
      }
      n.addEventListener("click", function (e) {
        var st = e.target.closest("[data-strich]");
        if (st) { S.strich = st.getAttribute("data-strich") === "1"; malen(); c.aktualisieren(); var z = c.$(S.strich ? "[data-strich]" : 'button[data-w="0"][data-l="3"]', n); if (z) z.focus(); return; }
        var b = e.target.closest("button[data-w]"); if (!b || b.disabled) return;
        var i = +b.getAttribute("data-w"), x = S.wurf[i] || (S.wurf[i] = { l: null, t: null });
        if (b.hasAttribute("data-l")) x.l = +b.getAttribute("data-l"); else x.t = b.getAttribute("data-t") === "1";
        malen(); c.aktualisieren();
        var f = c.$('button[data-w="' + i + '"][' + (b.hasAttribute("data-l") ? 'data-t="1"' : 'data-l="3"') + "]", n);
        if (f && !f.disabled) f.focus(); else { var g = c.$('button[data-w="' + (i + 1) + '"][data-l="3"]', n); if (g) g.focus(); }
      });
      malen();
      return n;
    }
  };
  var meinMuster = {
    typ: "eigen",
    bauen: function (c) {
      var n = c.el('<div class="k-karte k-karte--honig"><h3>Dein Muster – für das Zählen vorne</h3><div data-x></div></div>');
      n.kNeu = function () {
        if (c.S.strich) { c.$("[data-x]", n).innerHTML = '<p>Du führst die Strichliste. Zähle beim Klassenbild mit: Wie viele Finger zeigen sich bei jeder Zeile?</p>'; return; }
        var r = wechsel(c.S.wurf || []), z = { Treffer: {}, Fehlwurf: {} };
        r.forEach(function (x) { z[x.nach][x.wohin] = (z[x.nach][x.wohin] || 0) + 1; });
        function zeile(k) { var t = Object.keys(z[k]); return t.length ? t.map(function (w) { return z[k][w] + "× " + w; }).join(", ") : "kam bei dir nicht vor"; }
        c.$("[data-x]", n).innerHTML = "<p>Erster Wurf: <b>" + ((c.S.wurf[0] || {}).l || "–") + " m</b></p><p>Nach einem Treffer: <b>" + zeile("Treffer") + "</b></p><p>Nach einem Fehlwurf: <b>" + zeile("Fehlwurf") + '</b></p><p class="k-klein">Zeig vorne bei jeder Zeile so viele Finger, wie oft es bei dir vorkam. Gezählt werden Würfe, keine Namen.</p>';
      };
      n.kNeu();
      return n;
    }
  };

  /* ---------- Risikowahl nach Atkinson: Regler mit sichtbarer Folge ---------- */
  var risiko = {
    typ: "eigen",
    druck: false,
    bauen: function (c) {
      var S = c.S; if (!S.risiko) S.risiko = { stufe: 5, art: "suchen" };
      var R = S.risiko;
      var n = c.el('<div class="k-werkbank"><p><span class="k-pille k-pille--modell">Modell – Zahlen sind keine Messwerte</span></p>' +
        '<div class="k-schalter-zwei" role="group" aria-label="Welches Motiv?"><button type="button" data-art="suchen">Wer Erfolg sucht</button><button type="button" data-art="meiden">Wer Misserfolg meidet</button></div>' +
        '<label>Wie weit stellst du dich? <output data-o="stufe"></output><input type="range" min="1" max="9" step="1" data-r="stufe" aria-describedby="risiko-text"></label>' +
        '<div data-svg class="k-bild-rahmen" tabindex="0" role="region" aria-label="Schaubild Risikowahl, auf schmalen Bildschirmen seitlich verschiebbar" style="max-width:38rem;--min-bild:480px"></div><div class="k-balken" data-balken></div><p id="risiko-text" aria-live="polite" data-text></p></div>');
      function malen() {
        var st = R.stufe, p = 1 - st / 10, anreiz = 1 - p, prod = p * anreiz, meiden = R.art === "meiden";
        c.$("[data-r=stufe]", n).value = st;
        c.$("[data-o=stufe]", n).textContent = ["", "ganz nah", "sehr nah", "nah", "eher nah", "mittel", "eher weit", "weit", "sehr weit", "ganz weit"][st];
        c.$$("[data-art]", n).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-art") === R.art)); });
        /* Kurve p·(1−p) über die Entfernung: links nah (leicht), rechts weit (schwer) */
        var x0 = 50, x1 = 490, y0 = 210, h = 150, pts = [];
        for (var s = 1; s <= 9; s += 0.25) { var q = 1 - s / 10; pts.push([x0 + (s - 1) / 8 * (x1 - x0), y0 - (q * (1 - q)) / 0.25 * h]); }
        var cx = x0 + (st - 1) / 8 * (x1 - x0), cy = y0 - prod / 0.25 * h;
        var titel = meiden ? "Furcht, sich zu blamieren" : "Antrieb, die Aufgabe anzugehen";
        c.$("[data-svg]", n).innerHTML = '<svg class="k-svg" viewBox="0 0 520 250" role="img" aria-label="Kurve: ' + titel + ' über die Entfernung. Am höchsten in der Mitte, niedrig ganz nah und ganz weit. Markierung bei ' + Math.round(p * 100) + ' Prozent Trefferchance.">' +
          '<path class="l-linie" d="M' + x0 + " " + y0 + " H" + x1 + " M" + x0 + " " + y0 + " V40" + '"/>' +
          '<path class="' + (meiden ? "l-oxid" : "l-kuli") + '" d="M' + pts.map(function (q) { return q[0].toFixed(1) + " " + q[1].toFixed(1); }).join(" L") + '"/>' +
          '<path class="l-leise" stroke-dasharray="4 4" d="M' + cx + " " + y0 + " V" + cy + '"/><circle cx="' + cx + '" cy="' + cy + '" r="8" class="' + (meiden ? "f-text" : "f-kuli") + '"/>' +
          '<text x="' + x0 + '" y="236" class="t-leise t-18">nah – leicht</text><text x="' + x1 + '" y="236" text-anchor="end" class="t-leise t-18">weit – schwer</text>' +
          '<text x="' + (x0 + 8) + '" y="34" class="t-18">' + titel + "</text></svg>";
        function balken(name, wert, text) { return "<div><b>" + name + '</b><span role="img" aria-label="' + name + ": " + Math.round(wert * 100) + ' Prozent"><i style="width:' + Math.round(wert * 100) + '%"></i></span><small>' + text + "</small></div>"; }
        c.$("[data-balken]", n).innerHTML = balken("Trefferchance", p, Math.round(p * 100) + " %") + balken(meiden ? "Scham bei Fehlwurf" : "Stolz bei Treffer", meiden ? p : anreiz, meiden ? "Wer aus der Nähe danebenwirft, schämt sich am meisten." : "Je schwerer, desto stolzer.") + balken(meiden ? "Furcht (Modell)" : "Antrieb (Modell)", prod / 0.25, (meiden ? "Furcht = Wahrscheinlichkeit des Fehlwurfs × Scham" : "Antrieb = Trefferchance × Stolz") + " = " + Math.round(prod / 0.25 * 100) + " % des Höchstwerts");
        c.$("[data-text]", n).textContent = meiden
          ? "Wer Misserfolg meidet, fürchtet die Mitte am meisten: Dort ist ein Fehlwurf wahrscheinlich und peinlich. Ganz nah ist ein Fehlwurf unwahrscheinlich, ganz weit ist ein Fehlwurf keine Schande. Darum wählen diese Menschen oft die Extreme."
          : (st >= 4 && st <= 6 ? "In der Mitte ist das Produkt am größten: Ein Treffer ist möglich und macht stolz." : st < 4 ? "Ganz nah triffst du fast sicher – aber ein Treffer macht kaum stolz. Das Produkt bleibt klein." : "Ganz weit wärst du sehr stolz – aber ein Treffer ist unwahrscheinlich. Das Produkt bleibt klein.");
      }
      n.addEventListener("input", function (e) { if (e.target.getAttribute("data-r") === "stufe") { R.stufe = +e.target.value; c.sichern(); malen(); } });
      n.addEventListener("click", function (e) { var b = e.target.closest("[data-art]"); if (b) { R.art = b.getAttribute("data-art"); c.sichern(); malen(); } });
      malen();
      return n;
    }
  };

  /* ---------- Josef im Erwartungs-Wert-Modell: Rechteck, dessen Fläche die Motivation zeigt ---------- */
  function rechteckSVG(e, w, bonus) {
    var x0 = 56, y0 = 262, ex = 26, wy = 21, s = '<svg class="k-svg" viewBox="0 0 360 300" role="img" aria-label="Rechteck: Breite Erwartung ' + e + ', Höhe Wert ' + w + ', Fläche ' + e * w + (bonus ? ". Gestrichelt mit Belohnung: Wert " + Math.min(10, w + 2) + ", Fläche " + e * Math.min(10, w + 2) : "") + '.">';
    for (var i = 0; i <= 10; i++) s += '<path class="l-linie" d="M' + (x0 + i * ex) + " " + y0 + " V" + (y0 - 10 * wy) + " M" + x0 + " " + (y0 - i * wy) + " H" + (x0 + 10 * ex) + '"/>';
    if (bonus) { var w2 = Math.min(10, w + 2); s += '<rect x="' + x0 + '" y="' + (y0 - w2 * wy) + '" width="' + e * ex + '" height="' + w2 * wy + '" class="f-honig-hi"/><rect x="' + x0 + '" y="' + (y0 - w2 * wy) + '" width="' + e * ex + '" height="' + w2 * wy + '" class="l-leise" stroke-dasharray="6 4"/>'; }
    s += '<rect x="' + x0 + '" y="' + (y0 - w * wy) + '" width="' + e * ex + '" height="' + w * wy + '" class="f-honig"/>';
    s += '<path class="l-text" d="M' + x0 + " " + y0 + " H" + (x0 + 10 * ex + 6) + " M" + x0 + " " + y0 + " V" + (y0 - 10 * wy - 6) + '"/>';
    s += '<text x="' + (x0 + 5 * ex) + '" y="290" text-anchor="middle">Erwartung: ' + e + '</text><text x="18" y="' + (y0 - 5 * wy) + '" text-anchor="middle" transform="rotate(-90 18 ' + (y0 - 5 * wy) + ')">Wert: ' + w + "</text>";
    s += '<text x="' + (x0 + 10 * ex) + '" y="22" text-anchor="end" class="t-gross">Fläche: ' + e * w + (bonus ? " → " + e * Math.min(10, w + 2) : "") + "</text></svg>";
    return s;
  }
  var rechteck = {
    typ: "eigen",
    erledigt: function (S) { return !!(S.rechteck && S.rechteck.fest); },
    druck: function (c) { var r = c.S.rechteck; if (!r || !r.fest) return ""; return "<p><b>Josef im Erwartungs-Wert-Modell:</b> Erwartung " + r.e + " von 10 (" + esc(r.be) + ") · Wert " + r.w + " von 10 (" + esc(r.bw) + ") · Fläche " + r.e * r.w + "; mit Belohnung " + r.e * Math.min(10, r.w + 2) + "</p>"; },
    bauen: function (c) {
      var S = c.S; if (!S.rechteck) S.rechteck = { e: null, w: null, be: "", bw: "", fest: false, bonus: false };
      var R = S.rechteck;
      var n = c.el('<div class="k-werkbank"><p><b>Stelle Josef als Rechteck dar:</b> Die Breite ist seine Erfolgserwartung, die Höhe der Wert, den Mathe für ihn hat. Die Fläche zeigt – im Modell – seine Motivation.</p>' +
        '<div class="k-werkbank__regler"><label>Erfolgserwartung <output data-o="e">bitte einstellen</output><input type="range" min="0" max="10" step="1" value="5" data-r="e"></label><label>Wert <output data-o="w">bitte einstellen</output><input type="range" min="0" max="10" step="1" value="5" data-r="w"></label></div>' +
        '<div class="k-zwei"><label class="k-feld"><span>Beleg aus dem Fall für die Erwartung</span><textarea rows="2" maxlength="200" data-b="be"></textarea></label><label class="k-feld"><span>Beleg aus dem Fall für den Wert</span><textarea rows="2" maxlength="200" data-b="bw"></textarea></label></div>' +
        '<div data-svg class="k-bild-rahmen" tabindex="0" role="region" aria-label="Schaubild Josef als Rechteck, auf schmalen Bildschirmen seitlich verschiebbar" style="max-width:30rem;--min-bild:352px"></div>' +
        '<div class="k-zeile"><button type="button" class="g-knopf g-knopf--primaer" data-k="fest">Festlegen</button><span class="g-stempel k-stempel" hidden>Festgelegt</span></div>' +
        '<div data-nach hidden><p><b>Jetzt versprechen die Eltern die Belohnung.</b> Sie macht eine bessere Note für Josef wertvoller.</p><button type="button" class="g-knopf g-knopf--sekundaer" data-k="bonus" aria-pressed="false">Belohnung dazunehmen: Wert + 2</button><p aria-live="polite" data-bonus></p></div></div>');
      c.$$("[data-b]", n).forEach(function (t) { t.value = R[t.getAttribute("data-b")] || ""; });
      function malen() {
        ["e", "w"].forEach(function (k) { var r = c.$('[data-r="' + k + '"]', n); if (R[k] != null) r.value = R[k]; r.disabled = R.fest; c.$('[data-o="' + k + '"]', n).textContent = R[k] == null ? "bitte einstellen" : R[k] + " von 10"; });
        c.$$("[data-b]", n).forEach(function (t) { t.readOnly = R.fest; });
        c.$("[data-svg]", n).innerHTML = rechteckSVG(R.e == null ? 0 : R.e, R.w == null ? 0 : R.w, R.fest && R.bonus);
        var ok = R.e != null && R.w != null && (R.be || "").trim().length >= 5 && (R.bw || "").trim().length >= 5;
        c.$('[data-k="fest"]', n).disabled = !ok; c.$('[data-k="fest"]', n).hidden = R.fest; c.$(".g-stempel", n).hidden = !R.fest;
        c.$("[data-nach]", n).hidden = !R.fest;
        var bo = c.$('[data-k="bonus"]', n); bo.setAttribute("aria-pressed", String(!!R.bonus)); bo.textContent = R.bonus ? "Belohnung wieder weglassen" : "Belohnung dazunehmen: Wert + 2";
        c.$("[data-bonus]", n).textContent = R.bonus ? "Die Fläche wächst von " + R.e * R.w + " auf " + R.e * Math.min(10, R.w + 2) + " – also um " + (R.e * Math.min(10, R.w + 2) - R.e * R.w) + ". Je schmaler das Rechteck, desto weniger bringt mehr Wert." : "";
      }
      n.addEventListener("input", function (e) {
        var k = e.target.getAttribute("data-r"), b = e.target.getAttribute("data-b");
        if (k) { R[k] = +e.target.value; c.sichern(); malen(); }
        if (b) { R[b] = e.target.value; c.sichern(); var f = c.$('[data-k="fest"]', n); f.disabled = !(R.e != null && R.w != null && (R.be || "").trim().length >= 5 && (R.bw || "").trim().length >= 5); }
      });
      n.addEventListener("click", function (e) {
        var k = e.target.closest("[data-k]"); if (!k) return;
        if (k.getAttribute("data-k") === "fest" && !k.disabled) { R.fest = true; malen(); c.aktualisieren(); }
        if (k.getAttribute("data-k") === "bonus") { R.bonus = !R.bonus; c.sichern(); malen(); }
      });
      malen();
      return n;
    }
  };

  /* M6, Aufgabe 3: Spiegelt sich das Modell in deinem Selbsttest? (freiwillig, nur für dich) */
  var unddu = {
    typ: "eigen", druck: false,
    bauen: function (c) {
      var t = (c.D.st.ds06 && c.D.st.ds06.skala && c.D.st.ds06.skala.m1) || {}, STUFE = ["stimme gar nicht zu", "eher nein", "eher ja", "stimme voll zu"];
      if (!Object.keys(t).length) return '<p class="k-klein">Dein Selbsttest aus Stunde 1 ist nicht auf diesem Gerät. Überlege trotzdem: Bist du eher motiviert, wenn du glaubst, es zu schaffen?</p>';
      var z = [3, 17, 18, 19].map(function (i) { return "<li>… " + esc(E.M1[i][0]) + ": <b>" + (t[i] == null ? "nicht beantwortet" : STUFE[t[i]]) + "</b></li>"; }).join("");
      return '<div><p>Vier Sätze aus deinem Selbsttest in Stunde 1 fragen nach deiner Erfolgserwartung. Viele Menschen stimmen den ersten beiden eher zu und den letzten beiden eher nicht – so würde es das Modell erwarten. Ein einzelner Bogen bestätigt oder widerlegt kein Modell.</p><p>Ich bin motiviert, wenn …</p><ul>' + z + "</ul></div>";
    }
  };

  window.STUNDE = {
    id: "ds08", minuten: 90, material: "nach M6",
    frage: "Warum strenge ich mich für manches an – und für anderes nicht?",
    darum: "<p>Heute wird geworfen. Im Zielspiel entscheidest du vor jedem Wurf, wie weit du dich vom Papierkorb stellst. Aus euren Entscheidungen leitest du zwei Ideen der Leistungsmotivation ab: das Anspruchsniveau und die Risikowahl. Dann lernst du das Modell aus deinem Material M6 kennen: <b>Erwartung mal Wert</b>. Am Ende prüfst du es an Bucays Fröschen in der Sahne.</p>",
    ziele: ["erklären, wie Menschen sich Ziele setzen (Anspruchsniveau, Risikowahl),", "das Erwartungs-Wert-Modell von Eccles und Wigfield darstellen und auf Josef anwenden,", "prüfen, was das Modell an einer Geschichte erklären kann – und was nicht."],
    hinweis: "Das Zielspiel braucht Platz vorne: einen Papierkorb, Klebeband-Linien bei 1, 2, 3, 4 und 5 Metern und ein paar Papierkugeln.",
    auftraege: [
      { id: "a1", nr: "1", titel: "Erst erinnern", sozial: "allein, ohne Heft", min: 4, oeffnet: "offen", bloecke: [
        { typ: "abruf", min: 3, fragen: ["Nenne die drei Grundbedürfnisse nach Deci und Ryan.", "Was ist der Unterschied zwischen introjiziert und identifiziert?", "Woran erkennt man Motivation von außen?"], antworten: [
          "Kompetenz, Selbstbestimmung (Autonomie), soziale Eingebundenheit.",
          "Introjiziert: innerer Druck, der nicht zu mir gehört (schlechtes Gewissen). Identifiziert: Ich halte das Ziel selbst für wichtig.",
          "Zielrichtung, Ausdauer, Intensität."], danach: "Die dritte Frage stammt aus Stunde 1. Was du nach einer Woche noch abrufen kannst, sitzt." }
      ] },
      { id: "a2", nr: "2", titel: "Das Zielspiel", sozial: "Plenum", min: 15, oeffnet: "ansage", bloecke: [
        { typ: "kasten", art: "auftrag", titel: "So geht das Spiel", html: "<ul><li>Vorne steht ein Papierkorb. Auf dem Boden sind Linien bei 1, 2, 3, 4 und 5 Metern.</li><li>Jede Person wirft dreimal. <b>Vor jedem Wurf</b> wählst du selbst, von welcher Linie du wirfst.</li><li>Es gibt keine Punkte und keinen Preis. Du entscheidest nur, wie weit weg du dich stellst.</li><li>Trage nach jedem Wurf ein, ob du getroffen hast.</li><li>Wer nicht vor allen werfen mag, wirft auf einen zweiten Korb hinten im Raum oder führt vorne die Strichliste – beides ist in Ordnung.</li><li>Wir deuten nur das Klassenbild, keine einzelnen Würfe.</li></ul>" },
        { typ: "fest", id: "linie", label: "Bevor geworfen wird: Welche Linie wählst du für den ersten Wurf – oder würdest du wählen – und warum?", platzhalter: "Ich nehme (würde nehmen) … Meter, weil …", mind: 10, max: 300, kurz: "Welche Linie ich wähle – und warum" },
        protokoll,
        meinMuster,
        { typ: "klassenbild", id: "erster", hinweis: "Alle melden sich bei ihrer Linie. Die Lehrkraft zählt und tippt die Zahlen ein.", frage: "Erster Wurf: Von welcher Linie?", optionen: ["1 m", "2 m", "3 m", "4 m", "5 m"] },
        { typ: "klassenbild", id: "treffer", hinweis: "Alle zeigen bei jeder Zeile so viele Finger, wie oft es bei ihnen vorkam. Die Lehrkraft zählt Würfe, keine Namen.", frage: "Nach einem Treffer …", optionen: ["weiter weg", "gleich", "näher"] },
        { typ: "klassenbild", id: "fehl", hinweis: "Alle zeigen bei jeder Zeile so viele Finger, wie oft es bei ihnen vorkam. Die Lehrkraft zählt Würfe, keine Namen.", frage: "Nach einem Fehlwurf …", optionen: ["weiter weg", "gleich", "näher"] },
        { typ: "ansage", id: "forschung", titel: "Vergleich mit der Forschung", text: "erst, wenn alle geworfen haben und vorne gezählt ist." },
        { typ: "befund", status: "belegte Quelle · vereinfacht", quelle: "Hoppe (1930), Psychologische Forschung 14; Atkinson & Litwin (1960), Journal of Abnormal and Social Psychology 60", html: "<p><b>Hoppe (1930)</b> ließ Menschen Aufgaben mit wachsender Schwierigkeit wählen. Nach einem Erfolg nahmen sich die meisten etwas Schwereres vor, nach einem Misserfolg etwas Leichteres. Das Ziel, an dem jemand seine Leistung misst, nannte er <b>Anspruchsniveau</b>.</p><p><b>Atkinson und Litwin (1960)</b> ließen Studierende Ringe auf einen Pflock werfen, aus selbst gewählter Entfernung. Die meisten wählten eine <b>mittlere</b> Entfernung. Wer eher Misserfolg fürchtete, wählte häufiger sehr nahe oder sehr weite Entfernungen – in späteren Studien war dieser Unterschied oft schwächer.</p>" },
        { typ: "text", html: "<h3>Denkwerkzeug: Ein Konstrukt messen</h3><p>Motivation kann man nicht sehen. Wer sie erforschen will, muss sie an etwas Beobachtbarem festmachen.</p>" },
        { typ: "wahl", items: [
          { id: "m1", text: "Wir haben festgehalten, von welcher Linie ihr werft. Was messen wir damit?", opt: [
            ["wie motiviert jemand ist", "kaum", "Das ist zu groß gegriffen. Gemessen ist nur eine Wahl in einem Spiel. Wer hier vorsichtig ist, kann beim Lernen sehr ehrgeizig sein."],
            ["welches Ziel sich jemand in diesem Spiel setzt – sein Anspruchsniveau hier", "zentral", "Genau: Die gewählte Linie macht das Anspruchsniveau beobachtbar – für dieses Spiel, heute. Jede Messung erfasst nur einen Ausschnitt."],
            ["wie gut jemand werfen kann", "begruendbar", "Wurfgeschick spielt mit hinein – wer gut wirft, stellt sich vielleicht weiter weg. Das Können zeigen aber eher die Treffer, nicht die Wahl."]] },
          { id: "m2", text: "Vergleicht euer Klassenbild mit Hoppes Befund. Was dürft ihr daraus schließen – ob es passt oder nicht?", opt: [
            ["Was wir sehen, gilt für alle Menschen.", "kaum", "Ein paar Würfe von wenigen Personen sind ein Hinweis, kein Beweis. Für eine Regel braucht es viele Personen und viele Durchgänge."],
            ["Es ist ein Hinweis, kein Beweis – in beide Richtungen.", "zentral", "Genau: Passt es, bestätigt es Hoppe nicht; passt es nicht, widerlegt es ihn nicht. Wenige Personen, wenige Würfe, und alle haben einander zugesehen."],
            ["Nichts, weil wir zu wenige sind.", "begruendbar", "Vorsichtig und fast richtig: Beweisen können wir nichts. Wertlos ist es aber nicht – wir können es mit größeren Studien vergleichen."]] }
        ] }
      ] },
      { id: "a3", nr: "3", titel: "Wie schwer soll es sein?", sozial: "allein, dann Plenum", min: 10, oeffnet: "nach", bloecke: [
        { typ: "text", html: "<p>Wie viele von euch standen ganz nah am Korb, wo man fast sicher trifft? <b>John W. Atkinson (1957)</b> erwartet: wenige. Er erklärt die Wahl mit zwei Größen:</p><ul><li><b>Erfolgswahrscheinlichkeit:</b> Wie wahrscheinlich ist ein Treffer?</li><li><b>Anreiz:</b> Wie stolz macht ein Treffer? Je schwerer die Aufgabe, desto stolzer.</li></ul><p>Der Antrieb ist das Produkt aus beiden: Wahrscheinlichkeit mal Anreiz.</p>" },
        { typ: "wahl", items: [{ id: "r1", stimmkarte: true, text: "Deine Vorhersage: Bei welcher Entfernung ist das Produkt aus Trefferchance und Stolz am größten?", opt: [
          ["ganz nah – ein Treffer ist fast sicher", "kaum", "Der Treffer ist sicher, aber er macht kaum stolz. Fast eins mal fast null ergibt wenig.", "ganz nah"],
          ["in der Mitte", "zentral", "Hier sind beide Faktoren mittelgroß – ihr Produkt ist am größten. Probiere es gleich am Regler aus.", "Mitte"],
          ["ganz weit – ein Treffer macht am stolzesten", "kaum", "Stolz wärst du, aber ein Treffer ist sehr unwahrscheinlich. Fast null mal groß ergibt wenig.", "ganz weit"]] }] },
        risiko,
        { typ: "karten", karten: [
          { art: "honig", titel: "Hoffnung auf Erfolg", html: "<p>Wer eher Erfolg sucht, freut sich auf den Stolz nach einem Treffer. Diese Menschen wählen Aufgaben, die <b>schwer, aber machbar</b> sind.</p>" },
          { art: "petrol", titel: "Furcht vor Misserfolg", html: "<p>Wer eher Misserfolg meidet, will vor allem nicht scheitern. Diese Menschen wählen oft <b>sehr leichte</b> (dann klappt es sicher) oder <b>sehr schwere</b> Aufgaben (dann ist Scheitern keine Schande).</p>" }
        ] },
        { typ: "text", html: "<p class=\"k-klein\">Beides zusammen nennt man das <b>Leistungsmotiv</b>. Jeder Mensch hat beide Seiten – unterschiedlich stark. Nach Atkinson (1957); Bezeichnungen nach Heckhausen.</p>" },
        { typ: "wahl", items: [{ id: "r2", text: "Josef soll sich für die nächste Mathearbeit ein Ziel setzen. Welches ist nach Atkinson am günstigsten?", opt: [
          ["eine 1 – das wäre ein großer Erfolg", "kaum", "Darauf wäre er stolz, aber nach seinen 3–4ern ist das sehr unwahrscheinlich. So ein Ziel lädt eher zum Aufgeben ein."],
          ["eine 3 – schwer, aber machbar", "zentral", "Eine mittlere Schwierigkeit: Der Erfolg ist möglich und macht stolz. Für jemanden, der eher Erfolg sucht, ist der Antrieb hier am größten. Wer Misserfolg fürchtet, meidet gerade die Mitte – darum braucht Josef dabei Unterstützung."],
          ["eine 4 – die schafft er sicher", "begruendbar", "Das schützt vor Misserfolg – für jemanden, der Misserfolg fürchtet, verständlich. Stolz macht so ein Erfolg aber kaum."]] }] }
      ] },
      { id: "a4", nr: "4", titel: "Erwartung mal Wert", sozial: "allein, dann Plenum", min: 20, oeffnet: "ansage", bloecke: [
        { typ: "text", html: "<p>Eccles und Wigfield haben Atkinsons Idee erweitert. Ob jemand eine Aufgabe <b>wählt</b>, wie sehr er sich <b>anstrengt</b> und wie lange er <b>dranbleibt</b>, hängt an zwei Fragen:</p>" },
        { typ: "karten", karten: [
          { art: "honig", titel: "Erfolgserwartung", html: "<p><b>Schaffe ich das?</b> Wie sicher bin ich, die Aufgabe zu bewältigen? Sie hängt davon ab, wie fähig ich mich in diesem Bereich einschätze.</p>" },
          { art: "petrol", titel: "Wert", html: "<p><b>Was ist es mir wert?</b> Eccles und Wigfield unterscheiden vier Seiten:</p><ul><li><b>Wichtigkeit:</b> Gehört eine gute Leistung zu meinem Bild von mir?</li><li><b>Interesse:</b> Macht mir die Sache Freude?</li><li><b>Nützlichkeit:</b> Hilft sie mir für meine Ziele?</li><li><b>Kosten:</b> Was kostet sie mich – Zeit, Mühe, Angst?</li></ul>" }
        ] },
        { typ: "text", html: "<p class=\"k-klein\">Nach Wigfield &amp; Eccles (2000), Expectancy-Value Theory of Achievement Motivation; Unterrichtsmaterial M6.</p><h3>Wer sagt was? Lege die Sätze ab</h3><p>Tippe einen Satz an, dann das Fach, in das er gehört.</p>" },
        { typ: "sortieren", id: "eccles", satz: true, faecher: [
          { id: "e", titel: "Erfolgserwartung", text: "Schaffe ich das?" }, { id: "w", titel: "Wichtigkeit", text: "Gehört das zu mir?" }, { id: "i", titel: "Interesse", text: "Macht es mir Freude?" },
          { id: "n", titel: "Nützlichkeit", text: "Hilft es mir für ein Ziel?" }, { id: "k", titel: "Kosten", text: "Was kostet es mich?" }],
          karten: [
            ["»Die nächste Mathearbeit kann ich schaffen.«", "e", "Hier geht es um die Frage »Schaffe ich das?« – die Erfolgserwartung."],
            ["»Gut in Mathe zu sein, gehört zu mir.«", "w", "Eine gute Leistung ist Teil des eigenen Bildes von sich – das ist Wichtigkeit."],
            ["»Knobeln macht mir einfach Spaß.«", "i", "Die Freude liegt in der Sache selbst – das ist Interesse."],
            ["»Mathe brauche ich für die Ausbildung, die ich machen will.«", "n", "Die Sache hilft für ein Ziel außerhalb – das ist Nützlichkeit."],
            ["»Dafür müsste ich aufs Training verzichten.«", "k", "Was man für die Aufgabe aufgeben muss, zählt zu den Kosten."],
            ["»Bei Bruchrechnen habe ich sowieso keine Chance.«", "e", "Eine sehr niedrige Erwartung: »Schaffe ich das?« – Nein."],
            ["»Ich sehe mich als jemand, der Mathe kann – darum ist mir eine gute Note wichtig.«", "w", "Die gute Note ist wichtig, weil sie zum Bild von sich passt – das ist Wichtigkeit."],
            ["»In Bio vergesse ich die Zeit.«", "i", "Wer die Zeit vergisst, hat Freude an der Sache – Interesse."],
            ["»Englisch hilft mir bei jedem Job.«", "n", "Nützlich für spätere Ziele."],
            ["»Wenn ich durchfalle, schäme ich mich vor allen.«", "k", "Angst und Scham, die eine Aufgabe mit sich bringt, zählen Eccles und Wigfield zu den Kosten."]
          ], fertigText: "Lies die Fächer noch einmal: Erwartung ist eine Frage, die vier anderen beschreiben den Wert." },
        { typ: "merk", titel: "Das Mal", html: "<p><b>Motivation = Erfolgserwartung × Wert.</b> Ist einer der beiden Faktoren null, ist die Motivation null – egal, wie groß der andere ist.</p><p class=\"k-klein\"><span class=\"k-pille k-pille--modell\">Modell, vereinfacht</span> Das »Mal« stammt aus Atkinsons Modell. Eccles und Wigfield nennen Erwartung und Wert zusammen; ob sie sich wirklich multiplizieren, prüft die Forschung bis heute. Mehrere Studien finden dieses Zusammenspiel (zum Beispiel Nagengast u. a. 2011).</p>" },
        rechteck,
        { typ: "wahl", items: [{ id: "r3", text: "Was hilft Josef nach dem Modell am meisten?", opt: [
          ["die Erwartung heben – zum Beispiel mit Aufgaben, die er schaffen kann", "zentral", "Sein Rechteck ist vor allem schmal. Wird es breiter, wächst jede Einheit Wert mit. Genau das hat auch Stunde 2 gezeigt: Ansetzen bei der Kompetenz."],
          ["den Wert heben – zum Beispiel mit einer größeren Belohnung", "begruendbar", "Etwas hilft das – aber nur so viel, wie die Erwartung zulässt. Bei einer kleinen Erwartung bringt mehr Wert wenig."],
          ["mehr Druck machen", "kaum", "Druck erhöht vor allem die Kosten – Angst, Scham. Damit sinkt der Wert eher, und an der Erwartung ändert sich nichts."]] }] },
        { typ: "text", html: "<h3>Und du?</h3><p><span class=\"k-pille k-pille--privat\">Nur für dich · freiwillig</span></p>" },
        unddu,
        { typ: "fest", id: "unddu", optional: true, druck: false, label: "Spiegelt sich das Modell in deinem Selbsttest? Ein Satz. (freiwillig)", platzhalter: "Bei mir passt das / passt das nicht, weil …", mind: 10, max: 300, kurz: "Das Modell und mein Selbsttest (freiwillig)" }
      ] },
      { id: "a5", nr: "5", titel: "Die Frösche in der Sahne", sozial: "zuhören, dann allein", min: 12, oeffnet: "ansage", bloecke: [
        { typ: "geschichte", titel: "Die Frösche in der Sahne", hoerauftrag: "Achte darauf, was die beiden Frösche sich sagen – und was sie dann tun." },
        { typ: "text", html: "<h3>Zwei Sprachen: die Frösche im Modell</h3>" },
        { typ: "wahl", items: [
          { id: "fr1", text: "Bild 1: " + bild("fr1") + " – Was ist nach dem Modell gegen null gesunken?", opt: [
            ["der Wert des Strampelns – er sieht keinen Sinn mehr", "begruendbar", "Das lässt sich hören: Strampeln erscheint ihm sinnlos. Aber warum? Weil er nicht mehr erwartet, herauszukommen. Den Anfang macht sein Satz, dass sie hier nicht herauskommen – die Erwartung."],
            ["die Erfolgserwartung – der Wert, zu überleben, bleibt riesig, aber mal null ergibt null", "zentral", "Genau: Herauszukommen wäre ihm alles wert. Doch er erwartet nicht mehr, dass es gelingt – und viel Wert mal null Erwartung ergibt null."],
            ["seine Ausdauer", "kaum", "Ausdauer ist ein Verhaltensmerkmal – sie zeigt, dass seine Motivation gesunken ist. Erklären kann sie das nicht."]] },
          { id: "fr2", stimmkarte: true, text: "Bild 2: " + bild("fr2") + " – Kann das Erwartungs-Wert-Modell das erklären?", opt: [
            ["Nein. Nach dem Modell müsste er aufgeben – hier stößt es an eine Grenze.", "zentral", "Haltbar, wenn du begründest: Seine Erwartung, herauszukommen, ist fast null – nach dem Modell müsste er aufhören. Klärt vorne: Erklärt das Modell hier noch etwas – oder passt es sich nachträglich an?", "Nein"],
            ["Ja. Sein Wert liegt im Kämpfen selbst: Er will sich nicht einfach ergeben. Und dass er weiterkämpfen kann, erwartet er sehr wohl.", "zentral", "Haltbar, wenn du begründest: Ans Entkommen glaubt er nicht – aber er erwartet, dass er weiterkämpfen kann, und das ist ihm viel wert. Klärt vorne: Erklärt das Modell hier noch etwas – oder passt es sich nachträglich an?", "Ja"],
            ["Ja. Er ist eben intrinsisch motiviert, weil Strampeln Spaß macht.", "kaum", "Von Freude ist keine Rede. Er kämpft aus Trotz und Würde, nicht aus Spaß.", "Spaß"]] },
          { id: "fr3", text: "Bild 3: " + bild("fr3") + " – Wie wird er die nächste aussichtslose Lage einschätzen?", opt: [
            ["Er wird mehr erwarten – der Erfolg wirkt auf die Erwartung zurück.", "zentral", "Wie bei Hoppe: Nach einem Erfolg nehmen sich die meisten mehr vor. Erfolg hebt Erwartung und Anspruchsniveau."],
            ["Gar nicht anders – Glück ist Glück.", "begruendbar", "Wenn er den Erfolg dem Zufall zuschreibt, ändert sich wenig. Wie wir uns Erfolg erklären, ist das Thema der nächsten Stunde."],
            ["Er wird aufgeben, weil er erschöpft ist.", "kaum", "Erschöpfung erklärt den Moment, nicht seine Einschätzung beim nächsten Mal."]] }
        ] },
        { typ: "klassenbild", id: "frosch", frage: "Kann das Modell den zweiten Frosch erklären?", optionen: ["Ja", "Nein", "Spaß"] },
        { typ: "sprachen" }
      ] },
      { id: "a6", nr: "6", titel: "Verorten und vernetzen", sozial: "allein, dann am Board", min: 7, oeffnet: "nach", bloecke: [
        { typ: "verorten" },
        { typ: "text", html: "<h3>Eine Verbindung knüpfen</h3>" },
        { typ: "verbindung", einleitung: "Verbinde einen Begriff von heute mit einem aus Stunde 1 oder 2. Zum Beispiel: Was hat die Erfolgserwartung mit dem Grundbedürfnis nach Kompetenz zu tun?" },
        { typ: "text", html: "<h3>Deine Lernspur</h3>" },
        { typ: "lernspur", satzanfang: "Anstrengen lohnt sich für mich, wenn …" }
      ] },
      { id: "a7", nr: "7", titel: "Josef im Modell", sozial: "allein", min: 12, oeffnet: "nach", bloecke: [
        { typ: "schreiben", id: "josef-ew", operator: "erklären und anwenden", mind: 50,
          aufgabe: "Erkläre mit dem Erwartungs-Wert-Modell von Eccles und Wigfield (vereinfacht: Erwartung mal Wert), warum Josef immer seltener Hausaufgaben macht. Prüfe auch, was die Belohnung der Eltern nach dem Modell ändern kann – und was nicht.",
          hinweis: "Stelle das Modell zuerst kurz dar. Belege dann mit Stellen aus dem Fall. Dein Rechteck aus Auftrag 4 ist dein Schaubild.",
          material: E.fallHTML("Den Fall noch einmal lesen"),
          beispiel: "<p>»Nach Eccles und Wigfield hängt Motivation von zwei Fragen ab: Schaffe ich das? (Erfolgserwartung) und Was ist es mir wert? (Wert). Vereinfacht gesagt: Ist einer der beiden Faktoren fast null, … Bei Josef ist vor allem die Erwartung gesunken, denn er sagt: …«</p>",
          satzanfaenge: ["Nach Eccles und Wigfield hängt Motivation davon ab, ob …", "Josefs Erfolgserwartung ist gering, denn …", "Der Wert von Mathe ist für Josef …, weil …", "Die Belohnung kann … erhöhen, aber …", "Deshalb …"],
          wortspeicher: ["Erfolgserwartung", "Wert", "Wichtigkeit", "Interesse", "Nützlichkeit", "Kosten", "Erwartung mal Wert", "extrinsisch"],
          kriterien: [
            ["Grundlegend", "Ich stelle das Modell richtig dar: Erfolgserwartung und Wert bestimmen die Motivation."],
            ["Sicher", "Ich wende es auf Josef an und belege Erwartung und Wert mit Stellen aus dem Fall."],
            ["Souverän", "Ich erkläre mit dem »Mal«, warum mehr Wert (Belohnung) wenig hilft, solange die Erwartung klein ist, und nenne, wo man stattdessen ansetzen könnte."]],
          muster: "<p>Nach dem Erwartungs-Wert-Modell von Eccles und Wigfield hängt Motivation davon ab, ob jemand erwartet, eine Aufgabe zu schaffen (Erfolgserwartung), und welchen Wert sie für ihn hat – Wichtigkeit, Interesse, Nützlichkeit, Kosten. Beide Faktoren wirken zusammen; vereinfacht gesagt: Ist einer fast null, bleibt die Motivation klein. Bei Josef ist vor allem die Erwartung gesunken: Seit keine Arbeit besser als 3–4 war, sagt er, er checke es ohnehin nicht. Der Wert ist dagegen nicht null: Gut in Mathe zu sein, gehörte zu seinem Bild von sich (Wichtigkeit), und er will seinen Vater nicht enttäuschen. Die Kosten sind gestiegen, denn jede Hausaufgabe erinnert ihn an sein Scheitern. Die Belohnung der Eltern kann den Wert erhöhen – an der kleinen Erwartung ändert sie nichts. Nach dem Modell hilft sie darum wenig. Mehr bringt es, seine Erwartung zu heben, etwa mit Aufgaben, die schwer, aber machbar sind.</p>" },
        { typ: "rueckblick", id: "linie-jetzt", von: "linie", vorher: "Am Anfang hast du begründet, welche Linie du wählst:", label: "Was würde Atkinson zu einer Wahl wie deiner sagen – und warum lässt sich aus drei Würfen nicht ablesen, welches Motiv jemand hat?", mind: 12 },
        { typ: "kann", items: ["Ich kann erklären, was das Anspruchsniveau ist und wie es sich nach Erfolg verändert.", "Ich kann erklären, warum Erfolgsuchende mittelschwere Aufgaben wählen.", "Ich kann das Erwartungs-Wert-Modell darstellen und auf einen Fall anwenden.", "Ich kann sagen, was eine Messung von Motivation erfasst – und was nicht."] },
        { typ: "text", html: "<details class=\"k-hilfe\"><summary>Für Schnelle</summary><p>Zeichne dein eigenes Rechteck für ein Fach, das dir leichtfällt, und eines für ein Fach, das dir schwerfällt. Was müsste sich ändern, damit das zweite Rechteck größer wird? Nur für dich.</p></details>" }
      ] }
    ],
    merkseite: Object.assign({}, E.MERK.ds08, {
      extra2: '<h2>Erwartung mal Wert <span class="d-meta">(Modell)</span></h2><p>Stell dir Motivation als Rechteck vor: Die Breite ist die Erfolgserwartung, die Höhe der Wert. Ist das Rechteck sehr schmal, wächst die Fläche kaum, egal, wie hoch es wird. Darum hilft Josefs Belohnung wenig.</p>'
    })
  };
})();
