    // VideoSoound
document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("nachiaVideo");

if (video) {
    document.body.addEventListener("click", () => {
    video.muted = true;
    video.play().catch(err => {
        console.warn("Video tidak dapat diputar ulang:", err);
    });
    });
}
});

    // Birhday Countdown
document.addEventListener("DOMContentLoaded", function () {
const targetDate = new Date("2025-10-16T00:00:00");

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) return;

    const totalDays = 365;
    const totalHours = 24;
    const totalMinutes = 60;
    const totalSeconds = 60;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Update Text
    document.getElementById("days-value").textContent = days;
    document.getElementById("hours-value").textContent = hours;
    document.getElementById("minutes-value").textContent = minutes;
    document.getElementById("seconds-value").textContent = seconds;

    // Update Progress Circle
    updateCircle("days-progress", days, totalDays);
    updateCircle("hours-progress", hours, totalHours);
    updateCircle("minutes-progress", minutes, totalMinutes);
    updateCircle("seconds-progress", seconds, totalSeconds);
    }

    function updateCircle(id, value, max) {
    const circle = document.getElementById(id);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / max) * circumference;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference - progress}`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});

    // Kalender Kegiatan
const calendarGrid = document.getElementById("calendarGrid");
const calendarTitle = document.getElementById("calendarTitle");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date();

const events = {
    "2025-06-21": ["14.00 VC Nachia"],
    "2025-06-25": ["19.00 VC Nachia"],
    "2025-07-01": ["16.00 Meet & Greet Nachia"]
};

function renderCalendar(date) {
calendarGrid.innerHTML = "";

const year = date.getFullYear();
const month = date.getMonth();

const firstDayOfMonth = new Date(year, month, 1);
const lastDayOfMonth = new Date(year, month + 1, 0);
const firstWeekday = firstDayOfMonth.getDay();
const daysInMonth = lastDayOfMonth.getDate();

const daysInPrevMonth = new Date(year, month, 0).getDate();

const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    calendarTitle.textContent = `${monthNames[month]} ${year}`;

    const totalCells = 42;
    let cells = [];

    for (let i = firstWeekday - 1; i >= 0; i--) {
    let day = daysInPrevMonth - i;
    cells.push({ day, class: "prev-month" });
}

    for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ day: i, class: "current-month" });
    }

    for (let i = cells.length, d = 1; i < totalCells; i++, d++) {
    cells.push({ day: d, class: "next-month" });
    }

cells.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    const trueMonth = cell.class === 'prev-month' ? month - 1 : cell.class === 'next-month' ? month + 1 : month;
    const trueYear = trueMonth < 0 ? year - 1 : trueMonth > 11 ? year + 1 : year;
    const adjustedMonth = (trueMonth + 12) % 12;

    const dateKey = `${trueYear}-${String(adjustedMonth + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;

    cellDiv.className = cell.class;
    cellDiv.innerHTML = `<strong>${cell.day}</strong>`;

    if (events[dateKey]) {
    events[dateKey].forEach(ev => {
        const evEl = document.createElement("div");
        evEl.classList.add("event");
        evEl.textContent = ev;
        cellDiv.appendChild(evEl);
    });
    }
    calendarGrid.appendChild(cellDiv);
    });
}

prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);

    // Gallery
const galleryData = [
    { img: "img/nachia1.jpg", date: "10 Juni 2025", tag: "#SelaChia" },
    { img: "img/nachia2.jpg", date: "15 Juni 2025", tag: "#SabTutachia" },
    { img: "img/nachia3kw.jpg", date: "20 Juni 2025", tag: "#SelaChia" },
    { img: "img/nachia4.jpg", date: "23 Juni 2025", tag: "#SabTutachia" },
    { img: "img/nachia5.jpg", date: "25 Juni 2025", tag: "#SelaChia" },
    { img: "img/nachia6.jpg", date: "27 Juni 2025", tag: "#SabTutachia" },
    { img: "img/nachia7.jpg", date: "27 Juni 2025", tag: "#SabTutachia" },
    { img: "img/nachia8.jpg", date: "27 Juni 2025", tag: "#SabTutachia" }
];

const galleryGrid = document.getElementById("galleryGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let itemsToShow = 3;
let showingAll = false;

function displayGallery() {
    galleryGrid.innerHTML = "";

    const displayedData = showingAll ? galleryData : galleryData.slice(0, itemsToShow);

displayedData.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("gallery-item");
    div.style.animationDelay = `${index * 0.1}s`;
    div.innerHTML = `
    <img src="${item.img}" alt="">
    <div class="overlay">${item.date} — ${item.tag}</div>
`;
    galleryGrid.appendChild(div);
});

    loadMoreBtn.textContent = showingAll ? "Show Less" : "Load More";
}

loadMoreBtn.addEventListener("click", () => {
    showingAll = !showingAll;
    displayGallery();
});

displayGallery();
