/* ============================================================
   FITNESS DAD — main.js
   ============================================================ */

/* ---- helpers ---- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ---- nav ---- */
const navItems = $$('.nav-item');
const pages    = $$('.page');

function showPage(id) {
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  navItems.forEach(n => n.classList.toggle('active', n.dataset.page === id));
  // if coming back to home, hide day-detail
  if (id === 'home') hideDayDetail();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navItems.forEach(item => {
  item.addEventListener('click', () => showPage(item.dataset.page));
});

/* ---- day detail ---- */
const weekView   = $('#week-view');
const dayDetail  = $('#day-detail');

function showDayDetail(dayKey) {
  const data = DAYS[dayKey];
  if (!data || data.rest) return;

  weekView.style.display  = 'none';
  dayDetail.style.display = 'block';
  dayDetail.innerHTML     = buildDayDetail(dayKey, data);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // bind back button
  const backBtn = dayDetail.querySelector('.day-detail-back');
  if (backBtn) backBtn.addEventListener('click', hideDayDetail);

  // bind video triggers
  dayDetail.querySelectorAll('.video-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const src   = btn.dataset.src;
      const title = btn.dataset.title;
      openVideoModal(src, title);
    });
  });
}

function hideDayDetail() {
  weekView.style.display  = '';
  dayDetail.style.display = 'none';
  dayDetail.innerHTML     = '';
}

/* ---- video modal ---- */
const modal      = $('#video-modal');
const modalVideo = modal.querySelector('video');
const modalTitle = modal.querySelector('.video-modal-title');
const modalPh    = modal.querySelector('.video-modal-placeholder');
const closeBtn   = modal.querySelector('.video-modal-close');

function openVideoModal(src, title) {
  modalTitle.textContent = title || '';
  if (src) {
    modalVideo.src = src;
    modalVideo.style.display = 'block';
    modalPh.style.display    = 'none';
    modalVideo.load();
    modalVideo.play().catch(() => {});
  } else {
    modalVideo.src           = '';
    modalVideo.style.display = 'none';
    modalPh.style.display    = 'flex';
  }
  modal.classList.add('open');
}

function closeVideoModal() {
  modal.classList.remove('open');
  modalVideo.pause();
  modalVideo.src = '';
}

closeBtn.addEventListener('click', closeVideoModal);
modal.addEventListener('click', e => { if (e.target === modal) closeVideoModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideoModal(); });

/* ---- today highlight ---- */
// 0=Sun,1=Mon,...,6=Sat  →  map to day keys
const TODAY_MAP = {
  6: 'sat',   // شنبه
  0: 'sun',   // یکشنبه
  1: 'mon',   // دوشنبه
  2: 'tue',   // سه‌شنبه
  3: 'wed',   // چهارشنبه
  4: 'thu',   // پنجشنبه
  5: 'fri',   // جمعه
};
const todayKey = TODAY_MAP[new Date().getDay()];

/* ============================================================
   DATA
   ============================================================
   برای هر حرکت، مسیر ویدیو را در فیلد `video` وارد کنید.
   مثال:  video: 'videos/day1/squat.mp4'
   اگر ویدیو آماده نباشد، فیلد را خالی بگذارید: video: ''
   ============================================================ */

const DAYS = {
  sat: {
    name: 'شنبه',
    label: 'روز اول',
    type: 'پا، پشت، سینه، جلو بازو',
    emoji: '🏋️',
    category: 'strength',
    exercises: [
      {
        name: 'اسکوات روی صندلی',
        sets: '۳ ست — ۱۰ تا ۱۲ تکرار',
        desc: 'روی صندلی بنشینید و بلند شوید. حرکت باید آرام و کنترل‌شده باشد. زانوها به داخل نریزند.',
        video: 'videos/Sit to Stand.mp4',
      },
      {
        name: 'دمبل رو تک‌دست',
        sets: '۳ ست — ۱۰ تکرار هر دست',
        desc: 'یک دست را روی میز یا صندلی بگذارید، کمر صاف باشد و دمبل را به سمت پهلو بکشید. شانه نباید بالا بیاید.',
        video: 'videos/How to Perfect Your Dumbbell Row _ Form Check _ Men\'s Health.mp4',
      },
      {
        name: 'پرس سینه دمبل روی زمین',
        sets: '۳ ست — ۱۰ تکرار',
        desc: 'به پشت روی زمین بخوابید و دمبل‌ها را از کنار سینه به سمت بالا فشار دهید. دامنه حرکت کنترل‌شده‌تر است.',
        video: 'videos/How To Do A Dumbbell Floor Press.mp4',
      },
      {
        name: 'پل باسن',
        sets: '۳ ست — ۱۲ تکرار',
        desc: 'به پشت بخوابید، زانوها خم، کف پا روی زمین. باسن را بالا بیاورید و آرام پایین ببرید.',
        video: 'videos/Glute Bridge_Iso__Functional_Strength_and_Conditioning_Exercises.mp4',
      },
      {
        name: 'باز کردن دست‌ها در حالت خم سبک',
        sets: '۲ ست — ۱۰ تکرار',
        desc: 'کمی از لگن خم شوید، پشت صاف، دست‌ها را آرام به طرفین باز کنید. اگر دمبل سنگین بود، با بطری آب انجام دهید.',
        video: 'videos/Bent Over Dumbbell Reverse Fly.mp4',
      },
      {
        name: 'جلو بازو دمبل',
        sets: '۲ تا ۳ ست — ۱۰ تا ۱۲ تکرار',
        desc: 'آرنج‌ها نزدیک بدن بمانند و دمبل‌ها آرام بالا و پایین شوند. حرکت باید از آرنج انجام شود، نه با کمک کمر.',
        video: 'videos/How to Perform Standing Dumbbell Bicep Curls.mp4',
      },
      {
        name: 'جلو بازو چکشی',
        sets: '۲ ست — ۱۰ تکرار',
        desc: 'دمبل‌ها طوری بگیرید که کف دست‌ها روبه‌روی هم باشند. برای جلو بازو، ساعد و قدرت گرفتن دست مفید است.',
        video: 'videos/Hammer Curl - Biceps Exercise - Bodybuilding.com.mp4',
      },
      {
        name: 'ددباگ',
        sets: '۲ ست — ۸ تکرار هر طرف',
        desc: 'به پشت بخوابید، دست و پای مخالف را آرام باز و بسته کنید. برای تقویت شکم و کنترل بدن.',
        video: 'videos/The Core-Training Workout_ Dead Bug.mp4',
      },
      {
        name: 'کشش سینه کنار دیوار',
        sets: '۲ نوبت — هر طرف ۲۰ ثانیه',
        desc: 'دست را در ارتفاع شانه کنار دیوار بگذارید و بدن را آرام به سمت مخالف بچرخانید تا جلوی سینه کشیده شود. کشش باید ملایم و بدون درد باشد.',
        video: 'videos/Doorway Chest Stretch.mp4',
      },
    ],
  },

  sun: {
    name: 'یکشنبه',
    label: 'روز هوازی',
    type: 'پیاده‌روی + روتین شانه و گردن',
    emoji: '🚶',
    category: 'cardio',
    lightDay: true,
    exercises: [
      {
        name: 'پیاده‌روی تند',
        sets: '۳۰ تا ۴۰ دقیقه',
        desc: 'با قدم‌های سریع و منظم راه بروید. نفس باید کمی تند شود ولی راحت باشید.',
        video: '',
      },
      {
        name: 'روتین کوتاه شانه و گردن',
        sets: '۸ تا ۱۰ دقیقه',
        desc: 'جمع کردن چانه، جمع کردن کتف‌ها، کشش سینه، حرکت دست روی دیوار و چرخش بالاتنه. برنامه کامل در بخش «گرم‌کردن» موجود است.',
        video: '',
      },
    ],
  },

  mon: {
    name: 'دوشنبه',
    label: 'روز دوم',
    type: 'پا، تعادل، پشت، پشت بازو',
    emoji: '🏋️',
    category: 'strength',
    exercises: [
      {
        name: 'بالا رفتن از پله کوتاه',
        sets: '۳ ست — ۸ تکرار هر پا',
        desc: 'روی یک پله کوتاه یا سطح محکم بالا بروید و آرام پایین بیایید. حرکت باید کنترل‌شده باشد.',
        video: 'videos/Step Up Exercise _ Beginner Lunge Exercise.mp4',
      },
      {
        name: 'ددلیفت رومانیایی با دمبل',
        sets: '۳ ست — ۱۰ تکرار',
        desc: 'دو دمبل را جلوی ران‌ها نگه دارید. زانو کمی خم باشد. باسن به عقب برود و کمر صاف بماند.',
        video: 'videos/Dumbbell Romanian Deadlift.mp4',
      },
      {
        name: 'شنا روی دیوار یا میز',
        sets: '۳ ست — ۸ تا ۱۲ تکرار',
        desc: 'بدن صاف بماند و سر جلو نیاید. برای سینه، بازو و پشت بازو مفید است.',
        video: 'videos/How to Do Wall Push Ups_ A Guide from Physical Therapists.mp4',
      },
      {
        name: 'پول‌اور دمبل روی زمین',
        sets: '۳ ست — ۱۰ تکرار',
        desc: 'به پشت روی زمین بخوابید، یک دمبل را با دو دست بالای سینه نگه دارید و آرام به سمت بالای سر پایین ببرید، سپس برگردانید. برای تقویت پشت، سینه و کشش قفسه سینه بسیار مفید است.',
        video: 'videos/Dumbbell Pullover on Floor.mp4',
      },
      {
        name: 'پشت بازو روی دیوار',
        sets: '۲ ست — ۸ تا ۱۲ تکرار',
        desc: 'روبه‌روی دیوار بایستید، دست‌ها روی دیوار، آرنج‌ها خم و صاف شوند.',
        video: 'videos/Wall Tricep Extension.mp4',
      },
      {
        name: 'ساق پا ایستاده',
        sets: '۲ ست — ۱۲ تا ۱۵ تکرار',
        desc: 'روی پنجه پا بالا بروید و آرام پایین بیایید. برای ساق، مچ پا و تعادل مفید است.',
        video: 'videos/Exercises with an Athletic Trainer_ Standing Calf Raises.mp4',
      },
      {
        name: 'برد داگ',
        sets: '۲ ست — ۸ تکرار هر طرف',
        desc: 'در حالت چهار دست‌وپا، دست و پای مخالف را آرام بالا بیاورید. گردن در امتداد ستون بدن باشد.',
        video: 'videos/How to do a Bird Dog _ Proper Form & Technique_ NASM.mp4',
      },
      {
        name: 'تمرین تعادل پاشنه-پنجه',
        sets: '۲ نوبت — هر بار ۲۰ ثانیه',
        desc: 'یک پا را جلوی پای دیگر بگذارید، مثل راه رفتن روی خط صاف. کنار دیوار بایستید.',
        video: 'videos/Single_leg_balance_exercise_with_arm_workout__Ohio_State_Medical.mp4',
      },
    ],
  },

  tue: {
    name: 'سه‌شنبه',
    label: 'روز هوازی',
    type: 'پیاده‌روی + کشش ملایم',
    emoji: '🚶',
    category: 'cardio',
    exercises: [
      {
        name: 'پیاده‌روی سبک',
        sets: '۲۰ تا ۳۰ دقیقه',
        desc: 'آرام و راحت. هدف فقط حرکت کردن و خون‌رسانی به عضلات است.',
        video: '',
      },
      {
        name: 'حرکات کششی ملایم',
        sets: '۱۰ تا ۱۵ دقیقه',
        desc: 'کشش‌های آرام برای سینه، شانه‌ها، پاها و گردن. هر کشش ۲۰ تا ۳۰ ثانیه نگه داشته شود.',
        video: '',
      },
    ],
  },

  wed: {
    name: 'چهارشنبه',
    label: 'روز سوم',
    type: 'کل بدن، بازو، ساعد، شانه',
    emoji: '🏋️',
    category: 'strength',
    exercises: [
      {
        name: 'گابلت اسکوات با یک دمبل',
        sets: '۳ ست — ۱۰ تکرار',
        desc: 'یک دمبل را نزدیک سینه نگه دارید و اسکوات بزنید. اگر سنگین بود، بدون دمبل انجام دهید.',
        video: 'videos/How_To_Do_A_DUMBBELL_GOBLET_SQUAT__Exercise_Demonstration_Video.mp4',
      },
      {
        name: 'لانج عقب کوتاه',
        sets: '۲ ست — ۸ تکرار هر پا',
        desc: 'یک پا را کمی عقب ببرید و بدن را آرام پایین ببرید. دامنه کوتاه باشد. اگر زانو ناراحت شد، حذف کنید.',
        video: 'videos/Short Reverse Lunge - OPEX Exercise Library.mp4',
      },
      {
        name: 'حرکت Y روی دیوار',
        sets: '۲ ست — ۸ تکرار',
        desc: 'رو به دیوار بایستید و دست‌ها را به شکل Y آرام بالا ببرید. برای تقویت شانه‌ها و پشت بالاتنه.',
        video: 'videos/Wall Y Raises.mp4',
      },
      {
        name: 'جلو بازو کنترل‌شده',
        sets: '۲ ست — ۱۰ تکرار',
        desc: 'دمبل‌ها آرام بالا و پایین شوند. آرنج کنار بدن بماند. قدرت بازو بدون فشار روی شانه.',
        video: 'videos/CONCENTRATION CURL.mp4',
      },
      {
        name: 'پشت بازو سبک',
        sets: '۲ ست — ۱۰ تکرار',
        desc: 'کیک‌بک سبک یا فشار دست به دیوار. گردن و شانه‌ها باید آزاد باشند.',
        video: 'videos/How_To_Seated_Overhead_Dumbbell_Triceps_Extension_French_Press.mp4',
      },
      {
        name: 'چرخش آرام مچ با دمبل سبک',
        sets: '۲ ست — ۸ تکرار هر سمت',
        desc: 'دمبل سبک یا بطری آب در دست بگیرید و مچ را آرام کنترل کنید. برای ساعد و مچ.',
        video: 'videos/Dumbbell Wrist Rotation.mp4',
      },
      {
        name: 'راه رفتن با دمبل',
        sets: '۳ نوبت — ۳۰ تا ۴۵ ثانیه',
        desc: 'دو دمبل را کنار بدن نگه دارید و آرام راه بروید. شانه‌ها پایین، سینه باز، شکم کمی سفت.',
        video: 'videos/How To Do A Farmer\'s Walk (Farmer\'s Carry).mp4',
      },
      {
        name: 'پلانک روی میز یا دیوار',
        sets: '۲ نوبت — ۲۰ تا ۳۰ ثانیه',
        desc: 'دست‌ها روی میز یا دیوار، بدن صاف، شکم فعال، گردن آزاد.',
        video: 'videos/Incline Plank.mp4',
      },
      {
        name: 'کشش سینه و گردن',
        sets: '۳ دقیقه',
        desc: 'در پایان تمرین، چند کشش ملایم برای سینه، شانه‌ها و گردن انجام دهید. هر کشش ۲۰ تا ۳۰ ثانیه نگه داشته شود. کشش نباید با فشار دست یا درد همراه باشد.',
        video: 'videos/Doorway Chest Stretch.mp4',
      },
    ],
  },

  thu: {
    name: 'پنجشنبه',
    label: 'روز هوازی',
    type: 'پیاده‌روی + روتین شانه و گردن',
    emoji: '🚶',
    category: 'cardio',
    lightDay: true,
    exercises: [
      {
        name: 'پیاده‌روی سبک',
        sets: '۲۰ تا ۳۰ دقیقه',
        desc: 'آرام و راحت. هدف فقط حرکت و شادابی است.',
        video: '',
      },
      {
        name: 'روتین کوتاه شانه، گردن و پشت بالا',
        sets: '۸ تا ۱۰ دقیقه',
        desc: 'همان برنامه روزانه گردن و شانه. برنامه کامل در بخش «گرم‌کردن» موجود است.',
        video: '',
      },
    ],
  },

  fri: {
    name: 'جمعه',
    label: 'استراحت',
    type: 'استراحت فعال',
    emoji: '😴',
    category: 'rest',
    rest: true,
  },
};

const WARMUP = [
  {
    icon: '🧘',
    name: 'تنفس آرام و تنظیم بدن',
    sets: '۱ دقیقه',
    desc: 'صاف بایستید، شانه‌ها را پایین و آزاد نگه دارید. چند نفس آرام بکشید تا بدن از حالت فشار خارج شود.',
  },
  {
    icon: '📐',
    name: 'جمع کردن آرام چانه',
    sets: '۲ ست — ۸ تکرار',
    desc: 'چانه را خیلی آرام کمی به داخل ببرید، بدون اینکه سر را به پایین خم کنید. برای کنترل گردن مفید است.',
  },
  {
    icon: '🔗',
    name: 'جمع کردن کتف‌ها',
    sets: '۲ ست — ۱۰ تکرار',
    desc: 'کتف‌ها را آرام به هم نزدیک کنید، بدون اینکه شانه‌ها بالا بروند.',
  },
  {
    icon: '🙌',
    name: 'حرکت دست‌ها روی دیوار',
    sets: '۲ ست — ۸ تکرار',
    desc: 'پشت به دیوار بایستید و دست‌ها را تا جایی که راحت است بالا و پایین ببرید.',
  },
  {
    icon: '↔️',
    name: 'چرخش آرام بالاتنه روی صندلی',
    sets: '۶ بار هر طرف',
    desc: 'روی صندلی بنشینید، دست‌ها روی سینه، و از قسمت بالای تنه کمی به چپ و راست بچرخید. آرام و بدون فشار.',
  },
];

/* ============================================================
   BUILD HTML
   ============================================================ */

function buildWeekView() {
  const order = ['sat','sun','mon','tue','wed','thu','fri'];

  const LABELS = {
    strength: { text: 'تمرین قدرتی', icon: '🏋️' },
    cardio:   { text: 'هوازی و ریکاوری', icon: '🚶' },
    rest:     { text: 'استراحت', icon: '😴' },
  };

  // today badge
  let html = '';
  if (todayKey && DAYS[todayKey] && !DAYS[todayKey].rest) {
    html += `<div class="today-badge">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      امروز: ${DAYS[todayKey].name}
    </div>`;
  }

  // legend
  html += `<div class="week-legend">
    <div class="legend-item strength"><span class="legend-dot"></span>تمرین قدرتی</div>
    <div class="legend-item cardio"><span class="legend-dot"></span>هوازی و ریکاوری</div>
  </div>`;

  html += '<div class="week-grid">';

  order.forEach(key => {
    const d      = DAYS[key];
    const cat    = d.category || 'rest';
    const isToday = key === todayKey;
    const isRest  = !!d.rest;
    const label  = LABELS[cat];
    const classes = ['day-card', cat, isToday ? 'today' : '', isRest ? 'rest' : ''].filter(Boolean).join(' ');
    const action  = isRest ? '' : `onclick="showDayDetail('${key}')"`;

    html += `<div class="${classes}" ${action}>
      <div class="day-card-inner">
        <div class="day-card-right">
          <div class="day-badge">${d.emoji}</div>
          <div>
            <div class="day-info-name">
              ${d.name}
              <span class="day-type-pill">${label.text}</span>
            </div>
            <div class="day-info-sub">${isRest ? 'استراحت کامل' : `<strong>${d.type}</strong>`}</div>
          </div>
        </div>
        ${!isRest ? `<svg class="day-arrow" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>` : ''}
      </div>
    </div>`;
  });

  html += '</div>';
  return html;
}

function buildDayDetail(key, data) {
  const sets = data.exercises || [];
  let html = `
  <div class="day-detail-header">
    <div class="day-detail-back">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      بازگشت به برنامه هفتگی
    </div>
    <div style="font-size:2.5rem;margin-bottom:8px">${data.emoji}</div>
    <div class="day-detail-title">${data.name} — ${data.label}</div>
    <div class="day-detail-sub">${data.type}</div>
  </div>
  <div class="exercise-list">`;

  sets.forEach((ex, i) => {
    const hasSrc = !!ex.video;
    html += `
    <div class="exercise-card">
      <div class="exercise-header">
        <div class="ex-num">${toPersianNum(i + 1)}</div>
        <div class="ex-info">
          <div class="ex-name">${ex.name}</div>
          <div class="ex-sets">${ex.sets}</div>
          <div class="ex-desc">${ex.desc}</div>
        </div>
      </div>
      <button class="video-trigger"
        data-src="${ex.video || ''}"
        data-title="${ex.name}">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span class="vt-label">مشاهده ویدیو</span>
        <span class="vt-badge ${hasSrc ? '' : 'no-video'}">${hasSrc ? '▶ پخش' : 'به‌زودی'}</span>
      </button>
    </div>`;
  });

  html += '</div>';
  return html;
}

function buildWarmupPage() {
  const wrap = $('#warmup-list');
  if (!wrap) return;
  let html = '';
  WARMUP.forEach(w => {
    html += `<div class="warmup-item">
      <div class="warmup-icon">${w.icon}</div>
      <div>
        <div class="warmup-name">${w.name}</div>
        <div class="warmup-sets">${w.sets}</div>
        <div class="warmup-desc">${w.desc}</div>
      </div>
    </div>`;
  });
  wrap.innerHTML = html;
}

/* ---- utility ---- */
function toPersianNum(n) {
  return String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // render week view
  const weekViewEl = $('#week-view');
  if (weekViewEl) weekViewEl.innerHTML = buildWeekView();

  // bind day-card clicks (rendered dynamically, so we use event delegation)
  // (already handled via onclick in buildWeekView for simplicity)

  // warmup
  buildWarmupPage();

  // start on home
  showPage('home');
});
