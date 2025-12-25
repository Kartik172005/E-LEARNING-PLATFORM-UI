/* COURSE DATA */
let courses = {
  HTML: { video: "https://www.youtube.com/embed/HcOc7P5BMi4", progress: 0 },
  JS: { video: "https://www.youtube.com/embed/hKB-YGF14SY", progress: 0 },
  Python: { video: "https://www.youtube.com/embed/rfscVS0vtbw", progress: 0 },
  Java: { video: "https://www.youtube.com/embed/UmnCZ7-9yDY", progress: 0 },
  React: { video: "https://www.youtube.com/embed/bMknfKXIFA8", progress: 0 },
  Mongo: { video: "https://www.youtube.com/embed/ofme2o29ngU", progress: 0 }
};

const saved = JSON.parse(localStorage.getItem("coursesData"));
if (saved) courses = saved;

const params = new URLSearchParams(window.location.search);
let currentCourse = params.get("course");

window.onload = () => {
  if (currentCourse && courses[currentCourse]) {
    document.getElementById("courseTitle").innerText = currentCourse;
    document.getElementById("courseVideo").src = courses[currentCourse].video;
  }
  loadProfileProgress();
};

function completeLesson() {
  if (!currentCourse) {
    alert("Please select a course first.");
    return;
  }

  if (courses[currentCourse].progress < 100) {
    courses[currentCourse].progress += 25;
    if (courses[currentCourse].progress > 100) {
      courses[currentCourse].progress = 100;
    }
    localStorage.setItem("coursesData", JSON.stringify(courses));
    alert("Lesson completed!");
    loadProfileProgress();
  }
}

function loadProfileProgress() {
  const box = document.getElementById("allProgress");
  if (!box) return;

  box.innerHTML = "";
  let hasProgress = false;

  for (let c in courses) {
    if (courses[c].progress > 0) {
      hasProgress = true;

      box.innerHTML += `
        <div class="progress-card" onclick="location.href='course.html?course=${c}'">
          <div class="progress-percent">${courses[c].progress}%</div>
          <h3>${c}</h3>
          <small>Click to continue</small>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${courses[c].progress}%"></div>
          </div>
        </div>
      `;
    }
  }

  if (!hasProgress) {
    box.innerHTML = "<p>You haven’t started any course yet.</p>";
  }
}

function searchCourses() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  const query = input.value.toLowerCase();
  const cards = document.querySelectorAll(".course-card");

  cards.forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(query)
      ? "block"
      : "none";
  });
}
