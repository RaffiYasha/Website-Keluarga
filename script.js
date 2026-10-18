/* =========================================================
   EDIT BAGIAN CONFIG INI SAJA UNTUK MENGGANTI ISI WEBSITE
   (semua teks, tanggal, dan nama foto ada di sini)
   ========================================================= */
const CONFIG = {
  // Kosongkan ("") kalau tidak mau pakai password.
  // Catatan: ini hanya pengaman ringan, bukan keamanan penuh.
  password: "",

  eyebrow: "Rumah Kita",
  titleLine1: "Keluarga",
  titleLine2: "Besar Kita",
  lead: "Tempat kita menyimpan cerita, tawa, dan momen-momen kecil yang bikin rumah terasa seperti rumah.",

  // Sejak kapan keluarga ini terbentuk (format: TAHUN-BULAN-TANGGAL)
  // Kosongkan ("") kalau tidak mau menampilkan penghitung.
  sinceDate: "2000-01-01",
  sinceLabel: "Bersama membangun cerita selama",

  // Anggota keluarga. birth boleh dikosongkan ("") kalau tidak mau
  // masuk daftar ulang tahun. photo boleh dikosongkan, nanti tampil emoji.
  members: [
    { name: "Ayah", role: "Kepala Keluarga", birth: "1975-03-12", fact: "Ganti dengan fakta singkat atau kebiasaan khasnya.", photo: "foto/ayah.jpg", emoji: "👨" },
    { name: "Ibu", role: "Koki Utama", birth: "1978-08-25", fact: "Ganti dengan fakta singkat atau kebiasaan khasnya.", photo: "foto/ibu.jpg", emoji: "👩" },
    { name: "Anak Pertama", role: "Si Sulung", birth: "2002-11-05", fact: "Ganti dengan fakta singkat atau kebiasaan khasnya.", photo: "foto/anak1.jpg", emoji: "🧑" },
    { name: "Anak Kedua", role: "Si Tengah", birth: "2005-02-18", fact: "Ganti dengan fakta singkat atau kebiasaan khasnya.", photo: "foto/anak2.jpg", emoji: "🧑" },
    { name: "Anak Ketiga", role: "Si Bungsu", birth: "2008-05-30", fact: "Ganti dengan fakta singkat atau kebiasaan khasnya.", photo: "foto/anak3.jpg", emoji: "🧒" }
  ],

  // Cerita keluarga: tambah / hapus blok sesuka hati.
  // photo boleh dikosongkan ("") kalau tidak ada foto.
  timeline: [
    { year: "2000", title: "Awal Cerita", text: "Ceritakan bagaimana keluarga ini bermula.", photo: "" },
    { year: "2010", title: "Pindah ke Rumah Baru", text: "Tulis momen penting lain di sini.", photo: "foto/rumah.jpg" },
    { year: "2018", title: "Liburan Besar", text: "Ceritakan liburan atau acara yang paling diingat.", photo: "foto/liburan.jpg" },
    { year: "Sekarang", title: "Masih Terus Berlanjut", text: "Cerita keluarga kita belum selesai.", photo: "" }
  ],

  // Album: taruh foto di folder "foto" lalu tulis namanya di sini.
  album: [
    { src: "foto/1.jpg", caption: "Makan bersama" },
    { src: "foto/2.jpg", caption: "Liburan akhir tahun" },
    { src: "foto/3.jpg", caption: "Kumpul lebaran" },
    { src: "foto/4.jpg", caption: "Ulang tahun adik" },
    { src: "foto/5.jpg", caption: "Jalan sore" },
    { src: "foto/6.jpg", caption: "Foto keluarga" }
  ],

  traditions: [
    { icon: "🍲", title: "Makan Bersama Hari Minggu", text: "Setiap Minggu kita makan siang bareng di rumah." },
    { icon: "🎂", title: "Kejutan Ulang Tahun", text: "Siapa pun yang berulang tahun selalu dapat kejutan kecil." },
    { icon: "🚗", title: "Liburan Tahunan", text: "Setiap akhir tahun kita jalan-jalan ke tempat baru." }
  ],

  messages: [
    { text: "Tulis pesan atau doa untuk keluarga di sini.", from: "Ayah" },
    { text: "Pesan dari anggota keluarga lainnya.", from: "Ibu" },
    { text: "Boleh serius, boleh lucu.", from: "Kakak" }
  ],

  footer: "Dibuat dengan penuh cinta untuk keluarga kita 🏡"
};
/* ========================================================= */

const $ = (id) => document.getElementById(id);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupText() {
  $("eyebrow").textContent = CONFIG.eyebrow;
  $("t1").textContent = CONFIG.titleLine1;
  $("t2").textContent = CONFIG.titleLine2;
  $("lead").textContent = CONFIG.lead;
  $("footer").textContent = CONFIG.footer;
  document.title = CONFIG.titleLine1 + " " + CONFIG.titleLine2;
}

function updateCounter() {
  const wrap = $("counterWrap");
  const start = new Date(CONFIG.sinceDate + "T00:00:00");
  const now = new Date();
  if (!CONFIG.sinceDate || isNaN(start) || start > now) { wrap.style.display = "none"; return; }

  $("counterLabel").textContent = CONFIG.sinceLabel;
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (months < 0) { years--; months += 12; }

  $("counter").innerHTML = "";
  [[years, "Tahun"], [months, "Bulan"], [days, "Hari"]].forEach(([n, label]) => {
    const d = document.createElement("div");
    const b = document.createElement("b"); b.textContent = n;
    const s = document.createElement("span"); s.textContent = label;
    d.append(b, s);
    $("counter").appendChild(d);
  });
}

function buildMembers() {
  CONFIG.members.forEach((m) => {
    const card = document.createElement("article");
    card.className = "member reveal";

    const av = document.createElement("div");
    av.className = "avatar";
    av.textContent = m.emoji || "🙂";
    if (m.photo) {
      const img = document.createElement("img");
      img.src = m.photo; img.alt = m.name; img.loading = "lazy";
      img.onload = () => { av.textContent = ""; av.appendChild(img); };   // ganti emoji kalau foto ada
    }

    const h = document.createElement("h3"); h.textContent = m.name;
    const role = document.createElement("span"); role.className = "role"; role.textContent = m.role;
    const p = document.createElement("p"); p.textContent = m.fact;
    card.append(av, h, role, p);
    $("memberGrid").appendChild(card);
  });
}

function buildBirthdays() {
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const list = CONFIG.members
    .filter((m) => m.birth && /^\d{4}-\d{2}-\d{2}$/.test(m.birth))
    .map((m) => {
      const [y, mo, d] = m.birth.split("-").map(Number);
      let next = new Date(today.getFullYear(), mo - 1, d);
      if (next < today) next = new Date(today.getFullYear() + 1, mo - 1, d);
      return { name: m.name, days: Math.round((next - today) / 86400000), age: next.getFullYear() - y, date: next };
    })
    .sort((a, b) => a.days - b.days);

  if (!list.length) { $("birthdays").style.display = "none"; return; }

  let anyToday = false;
  list.forEach((b) => {
    const row = document.createElement("div");
    row.className = "bday reveal";
    if (b.days === 0) { row.classList.add("today"); anyToday = true; }
    else if (b.days <= 30) row.classList.add("soon");

    const em = document.createElement("div"); em.className = "emoji"; em.textContent = b.days === 0 ? "🎉" : "🎂";

    const info = document.createElement("div"); info.className = "info";
    const nm = document.createElement("b"); nm.textContent = b.name;
    const sm = document.createElement("small");
    sm.textContent = b.date.toLocaleDateString("id-ID", { day: "numeric", month: "long" }) + " · menjadi " + b.age + " tahun";
    info.append(nm, sm);

    const left = document.createElement("div"); left.className = "left";
    if (b.days === 0) { left.textContent = "Hari ini!"; }
    else { left.textContent = b.days; const u = document.createElement("small"); u.textContent = "hari lagi"; left.appendChild(u); }

    row.append(em, info, left);
    $("bdayList").appendChild(row);
  });

  if (anyToday) setTimeout(confetti, 600);
}

function buildTimeline() {
  CONFIG.timeline.forEach((it) => {
    const item = document.createElement("div");
    item.className = "t-item reveal";
    const card = document.createElement("div"); card.className = "t-card";

    const y = document.createElement("span"); y.className = "t-year"; y.textContent = it.year;
    const h = document.createElement("h3"); h.textContent = it.title;
    const p = document.createElement("p"); p.textContent = it.text;
    card.append(y, h, p);

    if (it.photo) {
      const img = document.createElement("img");
      img.src = it.photo; img.alt = it.title; img.loading = "lazy";
      img.onerror = () => img.remove();   // kalau foto belum ada, otomatis disembunyikan
      card.appendChild(img);
    }
    item.appendChild(card);
    $("timelineList").appendChild(item);
  });
}

function buildAlbum() {
  const lb = $("lightbox");
  CONFIG.album.forEach((g) => {
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "shot reveal";
    btn.setAttribute("aria-label", g.caption);

    let hasImage = false;
    const ph = document.createElement("div");
    ph.className = "ph"; ph.textContent = "📷";
    btn.appendChild(ph);

    const img = document.createElement("img");
    img.src = g.src; img.alt = g.caption; img.loading = "lazy";
    img.onload = () => { hasImage = true; ph.replaceWith(img); };   // ganti placeholder kalau foto ada

    const cap = document.createElement("div"); cap.className = "cap"; cap.textContent = g.caption;
    btn.appendChild(cap);

    btn.addEventListener("click", () => {
      if (!hasImage) return;
      $("lbImg").src = g.src; $("lbImg").alt = g.caption;
      $("lbCaption").textContent = g.caption;
      lb.showModal();
    });
    $("albumGrid").appendChild(btn);
  });
  $("lbClose").addEventListener("click", () => lb.close());
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
}

function buildTraditions() {
  if (!CONFIG.traditions.length) { $("traditions").style.display = "none"; return; }
  CONFIG.traditions.forEach((t) => {
    const c = document.createElement("div"); c.className = "trad reveal";
    const i = document.createElement("div"); i.className = "icon"; i.textContent = t.icon;
    const h = document.createElement("h3"); h.textContent = t.title;
    const p = document.createElement("p"); p.textContent = t.text;
    c.append(i, h, p);
    $("tradGrid").appendChild(c);
  });
}

function buildMessages() {
  if (!CONFIG.messages.length) { $("messages").style.display = "none"; return; }
  CONFIG.messages.forEach((m) => {
    const c = document.createElement("div"); c.className = "msg reveal";
    const p = document.createElement("p"); p.textContent = m.text;
    const f = document.createElement("div"); f.className = "from"; f.textContent = "— " + m.from;
    c.append(p, f);
    $("msgGrid").appendChild(c);
  });
}

function confetti() {
  if (reducedMotion) return;
  const emojis = ["🎉", "🎂", "✨", "🎈", "⭐", "🍰"];
  for (let n = 0; n < 26; n++) {
    const s = document.createElement("span");
    s.className = "confetti";
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = 18 + Math.random() * 18 + "px";
    s.style.animationDuration = 1.8 + Math.random() * 1.6 + "s";
    s.style.setProperty("--dx", Math.random() * 200 - 100 + "px");
    s.style.setProperty("--rot", Math.random() * 720 - 360 + "deg");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 3800);
  }
}

function revealOnScroll() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

function init() {
  setupText();
  updateCounter();
  buildMembers();
  buildBirthdays();
  buildTimeline();
  buildAlbum();
  buildTraditions();
  buildMessages();
  revealOnScroll();
}

function start() {
  const needPass = CONFIG.password && CONFIG.password.length > 0;
  let unlocked = false;
  try { unlocked = sessionStorage.getItem("unlocked_family") === "1"; } catch (e) {}

  if (!needPass || unlocked) { init(); return; }

  $("gate").classList.add("show");
  $("content").style.display = "none";
  $("gateForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if ($("gateInput").value === CONFIG.password) {
      try { sessionStorage.setItem("unlocked_family", "1"); } catch (err) {}
      $("gate").classList.remove("show");
      $("content").style.display = "";
      init();
    } else {
      $("gateError").textContent = "Kata sandinya belum tepat, coba lagi ya.";
    }
  });
}

start();
