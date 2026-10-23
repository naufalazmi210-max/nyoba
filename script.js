/* =========================================================
   MULAI AJA — script.js
   Logika pencarian, filter, checklist, progres, dan penyimpanan.
   ========================================================= */

// Data panduan contoh. Kamu bisa menambah panduan baru di daftar ini.
const guides = [
  {
    id: "cv-pertama", title: "Bikin CV pertamamu", category: "Karier", icon: "💼",
    color: "#eeeaff", duration: "30–60 menit",
    description: "Susun CV sederhana meskipun kamu belum punya banyak pengalaman kerja. Fokus pada pendidikan, keterampilan, proyek, dan pengalaman yang relevan.",
    keywords: "cv resume kerja magang fresh graduate karier",
    steps: [
      { title: "Kumpulkan informasi dasar", detail: "Siapkan nama, email profesional, nomor kontak, pendidikan, dan kota tempat tinggal. Tidak perlu mencantumkan data sensitif." },
      { title: "Tulis ringkasan singkat", detail: "Buat 2–3 kalimat tentang minat, kemampuan, dan jenis kesempatan yang kamu cari." },
      { title: "Catat keterampilan yang relevan", detail: "Pilih 3–6 keterampilan yang benar-benar kamu miliki, misalnya desain, komunikasi, atau pengolahan dokumen." },
      { title: "Masukkan proyek atau pengalaman", detail: "Tugas sekolah, organisasi, relawan, dan proyek pribadi juga bisa menunjukkan kemampuan." },
      { title: "Periksa dan simpan sebagai PDF", detail: "Cek ejaan, konsistensi format, dan keterbacaan. Minta satu orang tepercaya untuk meninjau CV-mu." }
    ]
  },
  {
    id: "belajar-skill", title: "Mulai belajar skill baru", category: "Belajar", icon: "📚",
    color: "#e5f5ff", duration: "20 menit untuk mulai",
    description: "Pilih satu keterampilan, tentukan tujuan kecil, dan mulai berlatih tanpa harus membeli banyak alat atau kursus.",
    keywords: "belajar skill desain coding bahasa inggris keterampilan",
    steps: [
      { title: "Pilih satu skill yang ingin dipelajari", detail: "Contohnya desain grafis, coding dasar, menulis, bahasa Inggris, atau editing video." },
      { title: "Tentukan hasil kecil yang ingin dibuat", detail: "Pilih hasil nyata, misalnya poster sederhana, halaman web, atau tulisan 200 kata." },
      { title: "Cari satu sumber belajar pemula", detail: "Pilih satu tutorial atau sumber tepercaya agar tidak berpindah-pindah sebelum mencoba." },
      { title: "Latihan selama 20 menit", detail: "Ikuti satu bagian materi dan langsung praktikkan. Tidak harus langsung sempurna." },
      { title: "Simpan hasil latihan", detail: "Simpan file atau catatan dan tulis satu hal yang sudah dipahami serta satu hal yang ingin ditingkatkan." }
    ]
  },
  {
    id: "atur-uang", title: "Atur uang saku atau gaji", category: "Keuangan", icon: "💸",
    color: "#e2f8ed", duration: "15–20 menit",
    description: "Kenali pola pengeluaran dan buat rencana sederhana agar uangmu bisa dipakai untuk kebutuhan, keinginan, dan tabungan.",
    keywords: "uang uang saku gaji hemat menabung budget keuangan",
    steps: [
      { title: "Catat uang yang tersedia", detail: "Tulis uang saku atau pemasukan yang bisa kamu gunakan dalam periode ini." },
      { title: "Daftar kebutuhan utama", detail: "Misalnya transportasi, makan, paket data, atau kebutuhan sekolah dan kerja." },
      { title: "Periksa pengeluaran beberapa hari terakhir", detail: "Catat pengeluaran yang kamu ingat tanpa menyalahkan diri sendiri." },
      { title: "Tentukan batas pengeluaran realistis", detail: "Sisihkan kebutuhan utama terlebih dahulu. Tentukan batas yang sesuai dengan kondisi nyata." },
      { title: "Pilih target tabungan kecil", detail: "Tentukan jumlah dan alasan menabung. Sesuaikan target agar tetap masuk akal." }
    ]
  },
  {
    id: "fokus-belajar", title: "Fokus tanpa terdistraksi HP", category: "Produktivitas", icon: "⚡",
    color: "#fff0df", duration: "25 menit",
    description: "Mulai satu sesi fokus singkat, kurangi gangguan, dan evaluasi cara belajar atau bekerja yang paling cocok untukmu.",
    keywords: "fokus belajar produktif hp distraksi konsentrasi waktu",
    steps: [
      { title: "Pilih satu tugas yang spesifik", detail: "Contohnya membaca 5 halaman atau menyelesaikan satu bagian tugas." },
      { title: "Siapkan tempat dan perlengkapan", detail: "Buka materi yang dibutuhkan dan singkirkan barang yang tidak relevan." },
      { title: "Atur timer 15–25 menit", detail: "Pilih durasi yang terasa realistis. Kamu bisa mulai lebih singkat jika sulit fokus." },
      { title: "Jauhkan notifikasi sementara", detail: "Aktifkan mode fokus atau letakkan HP di luar jangkauan jika memungkinkan." },
      { title: "Catat hasil sesi", detail: "Tulis apa yang selesai dan tentukan langkah kecil berikutnya sebelum beristirahat." }
    ]
  },
  {
    id: "bisnis-kecil", title: "Uji ide bisnis kecil", category: "Bisnis", icon: "🚀",
    color: "#ffe8ec", duration: "45–60 menit",
    description: "Sebelum mengeluarkan banyak modal, cari tahu apakah calon pelanggan benar-benar membutuhkan produk atau jasamu.",
    keywords: "bisnis usaha jualan umkm modal ide wirausaha",
    steps: [
      { title: "Tulis masalah yang ingin kamu bantu", detail: "Jelaskan masalah pelanggan dalam satu atau dua kalimat, bukan langsung fokus pada produk." },
      { title: "Tentukan calon pelanggan", detail: "Pilih kelompok yang mudah kamu jangkau dan punya kemungkinan mengalami masalah tersebut." },
      { title: "Tanya 3–5 calon pelanggan", detail: "Tanyakan cara mereka menyelesaikan masalah sekarang dan bagian yang paling merepotkan." },
      { title: "Buat versi paling sederhana", detail: "Contohnya contoh desain, sampel produk, atau penawaran jasa sederhana. Hindari belanja stok besar dulu." },
      { title: "Catat tanggapan dan biaya", detail: "Periksa minat nyata, perkiraan biaya, harga yang masuk akal, dan apa yang perlu diperbaiki." }
    ]
  },
  {
    id: "rutinitas-pagi", title: "Bangun rutinitas pagi", category: "Produktivitas", icon: "🌤️",
    color: "#fff3d9", duration: "10–15 menit",
    description: "Buat awal hari terasa lebih terarah dengan rutinitas ringan yang sesuai jadwal dan energi kamu.",
    keywords: "rutinitas pagi bangun kebiasaan habit tidur",
    steps: [
      { title: "Pilih waktu bangun yang realistis", detail: "Sesuaikan dengan jam tidur, sekolah, kuliah, atau kerja. Hindari perubahan ekstrem sekaligus." },
      { title: "Siapkan satu hal pada malam hari", detail: "Misalnya pakaian, tas, bekal, atau daftar prioritas untuk besok." },
      { title: "Pilih dua aktivitas sederhana", detail: "Contohnya minum air, merapikan tempat tidur, peregangan, atau membaca agenda." },
      { title: "Coba rutinitas selama tiga hari", detail: "Mulai dari versi singkat agar mudah diulang." },
      { title: "Evaluasi dan sesuaikan", detail: "Pertahankan yang membantu dan ubah bagian yang terasa tidak realistis." }
    ]
  },
  {
    id: "rapikan-tugas", title: "Rapikan tugas yang menumpuk", category: "Produktivitas", icon: "🗂️",
    color: "#eeeaff", duration: "15–25 menit",
    description: "Keluarkan semua tugas dari kepala, tentukan prioritas, lalu mulai dari tindakan yang paling masuk akal.",
    keywords: "tugas deadline menumpuk prioritas sekolah kuliah kerja",
    steps: [
      { title: "Tulis semua tugas yang belum selesai", detail: "Masukkan tugas sekolah, kuliah, kerja, dan urusan pribadi yang perlu ditangani." },
      { title: "Tambahkan tenggat waktu", detail: "Tandai tanggal pengumpulan atau waktu ketika tugas itu benar-benar dibutuhkan." },
      { title: "Pilih satu tugas paling mendesak", detail: "Pertimbangkan tenggat, dampak, dan waktu yang diperlukan." },
      { title: "Pecah menjadi langkah 10–20 menit", detail: "Contohnya membuka dokumen dan membuat kerangka, bukan langsung menyelesaikan semuanya." },
      { title: "Mulai timer dan kerjakan", detail: "Kerjakan satu langkah. Setelah selesai, pilih langkah berikutnya." }
    ]
  },
  {
    id: "portofolio", title: "Buat portofolio sederhana", category: "Karier", icon: "🧩",
    color: "#e4f7f3", duration: "30–45 menit",
    description: "Kumpulkan contoh karya dan jelaskan prosesnya agar orang lain bisa memahami kemampuan yang kamu miliki.",
    keywords: "portofolio karya desain coding menulis kerja magang",
    steps: [
      { title: "Pilih 2–3 karya terbaik", detail: "Gunakan proyek sekolah, latihan pribadi, kegiatan organisasi, atau pekerjaan yang memang kamu kerjakan." },
      { title: "Tulis tujuan setiap karya", detail: "Jelaskan masalah, kebutuhan, atau tujuan yang ingin diselesaikan." },
      { title: "Ceritakan kontribusimu", detail: "Terangkan bagian yang kamu kerjakan dan alat yang digunakan secara jujur." },
      { title: "Kumpulkan tautan atau gambar", detail: "Pastikan kamu punya izin untuk membagikan karya dan tidak menyertakan data pribadi orang lain." },
      { title: "Susun satu halaman portofolio", detail: "Gunakan dokumen atau halaman sederhana dengan judul, deskripsi, dan kontak profesional bila diperlukan." }
    ]
  },
  {
    id: "mulai-menabung", title: "Mulai menabung dengan target", category: "Keuangan", icon: "🐣",
    color: "#e2f8ed", duration: "10–15 menit",
    description: "Ubah keinginan menabung menjadi target yang jelas, terukur, dan sesuai kemampuanmu.",
    keywords: "tabungan menabung target uang hemat",
    steps: [
      { title: "Pilih tujuan tabungan", detail: "Tentukan hal yang ingin dicapai dan alasan tujuan tersebut penting bagimu." },
      { title: "Tentukan perkiraan biaya", detail: "Cari harga atau jumlah yang dibutuhkan, lalu sesuaikan dengan kemampuan." },
      { title: "Pilih jangka waktu", detail: "Tentukan kapan target ingin dicapai tanpa mengorbankan kebutuhan pokok." },
      { title: "Hitung jumlah yang bisa disisihkan", detail: "Bagi target dengan periode menabung dan periksa apakah nominalnya realistis." },
      { title: "Tentukan cara mencatat tabungan", detail: "Gunakan catatan sederhana dan perbarui setiap kali menabung." }
    ]
  },
  {
    id: "mulai-jualan", title: "Mulai jualan online sederhana", category: "Bisnis", icon: "🛍️",
    color: "#ffe8ec", duration: "30–45 menit",
    description: "Siapkan penawaran pertama dengan jelas, mulai dari produk atau jasa yang kamu pahami dan bisa kamu penuhi.",
    keywords: "jualan online produk jasa usaha bisnis pemula",
    steps: [
      { title: "Pilih satu produk atau jasa", detail: "Mulai dari sesuatu yang kamu pahami dan bisa disediakan secara konsisten." },
      { title: "Tentukan calon pembeli", detail: "Pikirkan siapa yang mungkin membutuhkan produk dan bagaimana menjangkau mereka secara wajar." },
      { title: "Hitung biaya dan harga", detail: "Masukkan biaya bahan, waktu, kemasan, dan biaya lain yang relevan." },
      { title: "Buat deskripsi dan foto yang jujur", detail: "Jelaskan manfaat, ukuran, harga, dan ketentuan secara transparan." },
      { title: "Tawarkan ke kelompok kecil", detail: "Minta masukan dari calon pembeli dan catat pertanyaan atau keberatan mereka." }
    ]
  }
];

// Penyimpanan progres: hanya di browser/perangkat ini, tanpa akun.
const STORAGE_KEY = "mulaiaja-progress-v1";
let progressData = loadProgress();
let activeCategory = "Semua";
let activeGuideId = null;
let toastTimer = null;

const guideGrid = document.getElementById("guideGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");
const emptyState = document.getElementById("emptyState");
const guideModal = document.getElementById("guideModal");
const stepsList = document.getElementById("stepsList");
const toast = document.getElementById("toast");

// Ambil data dari localStorage. Jika belum ada atau rusak, mulai dengan data kosong.
function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.warn("Progres tidak dapat dibaca dari browser:", error);
    return {};
  }
}

// Simpan progres dan perbarui angka ringkasan.
function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
    updateSummary();
    renderGuides();
    updateHeroProgress();
    document.getElementById("savedMessage").textContent = "✓ Progres tersimpan otomatis di browser ini.";
  } catch (error) {
    console.warn("Progres tidak dapat disimpan:", error);
    document.getElementById("savedMessage").textContent = "Browser tidak mengizinkan penyimpanan. Progres mungkin tidak bertahan setelah halaman ditutup.";
  }
}

// Mengambil daftar langkah yang sudah dicentang untuk suatu panduan.
function getCompletedSteps(guideId) {
  return progressData[guideId]?.completed || [];
}

// Hitung progres dalam persen.
function getGuideProgress(guide) {
  const completed = getCompletedSteps(guide.id).length;
  return guide.steps.length ? Math.round((completed / guide.steps.length) * 100) : 0;
}

// Membuat kartu panduan dari data di atas.
function renderGuides() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = guides.filter((guide) => {
    const matchesCategory = activeCategory === "Semua" || guide.category === activeCategory;
    const searchable = `${guide.title} ${guide.category} ${guide.description} ${guide.keywords}`.toLowerCase();
    return matchesCategory && searchable.includes(query);
  });

  guideGrid.innerHTML = filtered.map((guide) => {
    const progress = getGuideProgress(guide);
    return `
      <article class="guide-card">
        <div class="card-top">
          <span class="card-icon" style="background:${guide.color}">${guide.icon}</span>
          <span class="card-time">${guide.duration}</span>
        </div>
        <h3>${escapeHTML(guide.title)}</h3>
        <p>${escapeHTML(guide.description)}</p>
        <div class="card-bottom">
          <div class="card-progress">
            <div class="card-progress-label"><span>${progress === 100 ? "Panduan selesai" : progress > 0 ? "Sedang berjalan" : guide.category}</span><strong>${progress}%</strong></div>
            <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
          </div>
          <button class="card-open" type="button" data-open-guide="${guide.id}">${progress > 0 ? "Lanjutkan →" : "Mulai →"}</button>
        </div>
      </article>`;
  }).join("");

  emptyState.classList.toggle("hidden", filtered.length !== 0);
  guideGrid.classList.toggle("hidden", filtered.length === 0);
  document.getElementById("guideCount").textContent = filtered.length;
}

// Escape teks yang dimasukkan ke HTML agar tidak ditafsirkan sebagai markup.
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

// Tampilkan panduan yang dipilih dalam modal.
function openGuide(guideId) {
  const guide = guides.find((item) => item.id === guideId);
  if (!guide) return;

  activeGuideId = guideId;
  document.getElementById("modalIcon").textContent = guide.icon;
  document.getElementById("modalIcon").style.background = guide.color;
  document.getElementById("modalCategory").textContent = guide.category;
  document.getElementById("modalDuration").textContent = guide.duration;
  document.getElementById("modalTitle").textContent = guide.title;
  document.getElementById("modalDescription").textContent = guide.description;
  document.getElementById("stepCount").textContent = `${guide.steps.length} langkah`;

  // Buat checklist. Status setiap kotak mengikuti data yang tersimpan.
  stepsList.innerHTML = guide.steps.map((step, index) => {
    const checked = getCompletedSteps(guide.id).includes(index);
    return `
      <div class="step-item ${checked ? "completed" : ""}">
        <input class="step-checkbox" type="checkbox" id="step-${guide.id}-${index}"
          data-step-index="${index}" ${checked ? "checked" : ""} aria-label="Tandai langkah ${index + 1} selesai" />
        <div class="step-copy">
          <label for="step-${guide.id}-${index}">${escapeHTML(step.title)}</label>
          <p>${escapeHTML(step.detail)}</p>
        </div>
      </div>`;
  }).join("");

  updateModalProgress();
  guideModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}

// Tutup modal dan kembalikan scroll halaman.
function closeGuide() {
  guideModal.classList.add("hidden");
  document.body.style.overflow = "";
  activeGuideId = null;
}

// Perbarui persentase di modal setelah checkbox berubah.
function updateModalProgress() {
  if (!activeGuideId) return;
  const guide = guides.find((item) => item.id === activeGuideId);
  if (!guide) return;
  const completed = getCompletedSteps(guide.id).length;
  const percent = getGuideProgress(guide);
  document.getElementById("modalProgressText").textContent = `${percent}%`;
  document.getElementById("modalProgressBar").style.width = `${percent}%`;
  document.getElementById("stepCount").textContent = `${completed} dari ${guide.steps.length} langkah`;
  document.getElementById("modalDone").textContent = percent === 100 ? "Panduan selesai ✓" : "Selesai untuk sekarang ✓";
}

// Perbarui ringkasan semua panduan dan jumlah langkah.
function updateSummary() {
  let totalCompleted = 0;
  let started = 0;
  guides.forEach((guide) => {
    const completed = getCompletedSteps(guide.id);
    totalCompleted += completed.length;
    if (completed.length > 0) started += 1;
  });
  document.getElementById("completedTotal").textContent = totalCompleted;
  document.getElementById("startedTotal").textContent = started;
}

// Ilustrasi progres di bagian hero menggunakan total progres semua panduan.
function updateHeroProgress() {
  const totalSteps = guides.reduce((sum, guide) => sum + guide.steps.length, 0);
  const completed = guides.reduce((sum, guide) => sum + getCompletedSteps(guide.id).length, 0);
  const percent = totalSteps ? Math.round((completed / totalSteps) * 100) : 0;
  document.getElementById("heroProgressText").textContent = `${percent}%`;
  document.getElementById("heroProgressBar").style.width = `${percent}%`;
}

// Notifikasi kecil untuk memberi umpan balik kepada pengguna.
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

// Event delegation: tombol "Mulai" di kartu panduan.
guideGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open-guide]");
  if (button) openGuide(button.dataset.openGuide);
});

// Saat checkbox berubah, simpan nomor langkah yang sudah selesai.
stepsList.addEventListener("change", (event) => {
  if (!event.target.matches(".step-checkbox") || !activeGuideId) return;
  const index = Number(event.target.dataset.stepIndex);
  const guideId = activeGuideId;
  const current = new Set(getCompletedSteps(guideId));

  if (event.target.checked) current.add(index);
  else current.delete(index);

  progressData[guideId] = { completed: [...current].sort((a, b) => a - b) };
  event.target.closest(".step-item").classList.toggle("completed", event.target.checked);
  saveProgress();
  updateModalProgress();

  if (getGuideProgress(guides.find((guide) => guide.id === guideId)) === 100) {
    showToast("Keren! Kamu sudah menyelesaikan panduan ini 🎉");
  }
});

// Pencarian langsung saat pengguna mengetik.
searchInput.addEventListener("input", renderGuides);

// Filter kategori.
categoryFilters.addEventListener("click", (event) => {
  const chip = event.target.closest("[data-category]");
  if (!chip) return;
  activeCategory = chip.dataset.category;
  categoryFilters.querySelectorAll(".category-chip").forEach((item) => {
    item.classList.toggle("active", item === chip);
  });
  renderGuides();
});

// Tombol kategori untuk layar kecil hanya membuka/menutup bar filter.
document.getElementById("filterToggle").addEventListener("click", () => {
  const filters = document.getElementById("categoryFilters");
  const expanded = document.getElementById("filterToggle").getAttribute("aria-expanded") === "true";
  document.getElementById("filterToggle").setAttribute("aria-expanded", String(!expanded));
  filters.classList.toggle("filters-collapsed", expanded);
  if (expanded) filters.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Reset pencarian dan filter.
document.getElementById("resetSearch").addEventListener("click", () => {
  searchInput.value = "";
  activeCategory = "Semua";
  categoryFilters.querySelectorAll(".category-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.category === "Semua");
  });
  renderGuides();
});

// Tutup modal lewat tombol, klik area gelap, atau tombol Escape.
document.getElementById("modalClose").addEventListener("click", closeGuide);
guideModal.addEventListener("click", (event) => {
  if (event.target === guideModal) closeGuide();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !guideModal.classList.contains("hidden")) closeGuide();
  // Pintasan Ctrl/Cmd + K untuk langsung menuju kolom pencarian.
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
    document.getElementById("panduan").scrollIntoView({ behavior: "smooth" });
  }
});

// Reset progres untuk panduan yang sedang dibuka.
document.getElementById("resetGuide").addEventListener("click", () => {
  if (!activeGuideId) return;
  delete progressData[activeGuideId];
  saveProgress();
  const id = activeGuideId;
  openGuide(id);
  showToast("Checklist panduan sudah diulang.");
});

// Tombol selesai menutup modal. Progres tetap tersimpan otomatis.
document.getElementById("modalDone").addEventListener("click", () => {
  if (activeGuideId && getGuideProgress(guides.find((guide) => guide.id === activeGuideId)) === 100) {
    showToast("Selamat! Semua langkah panduan selesai 🎉");
  } else {
    showToast("Progresmu tersimpan. Lanjutkan kapan saja!");
  }
  closeGuide();
});

// Navigasi header.
document.getElementById("headerExplore").addEventListener("click", () => {
  document.getElementById("panduan").scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => searchInput.focus(), 450);
});
document.getElementById("continueButton").addEventListener("click", () => {
  const inProgress = guides.find((guide) => {
    const progress = getGuideProgress(guide);
    return progress > 0 && progress < 100;
  });
  const firstStarted = inProgress || guides.find((guide) => getGuideProgress(guide) > 0);
  if (firstStarted) {
    openGuide(firstStarted.id);
  } else {
    document.getElementById("panduan").scrollIntoView({ behavior: "smooth" });
    showToast("Pilih satu panduan untuk mulai, ya!");
  }
});

// Navigasi mobile.
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
menuToggle.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
  menuToggle.setAttribute("aria-label", open ? "Tutup navigasi" : "Buka navigasi");
});
mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Tahun footer dan render awal.
document.getElementById("currentYear").textContent = new Date().getFullYear();
renderGuides();
updateSummary();
updateHeroProgress();
