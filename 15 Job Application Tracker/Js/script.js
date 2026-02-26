const totalCountEl = document.getElementById("total-count");
const interviewCountEl = document.getElementById("interview-count");
const rejectedCountEl = document.getElementById("rejected-count");
const availableJobEl = document.getElementById("available-job");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const filteredSection = document.getElementById("filtered-section");
const allJobsSection = document.getElementById("all-jobs-cards");

let currentFilter = "all";

allFilterBtn.addEventListener("click", function () {
  if (currentFilter === "all") return;

  currentFilter = "all";

  allFilterBtn.classList.remove("bg-base-200");
  allFilterBtn.classList.add("bg-primary", "text-white");

  interviewFilterBtn.classList.remove("bg-primary", "text-white");
  interviewFilterBtn.classList.add("bg-base-200");

  rejectedFilterBtn.classList.remove("bg-primary", "text-white");
  rejectedFilterBtn.classList.add("bg-base-200");

  allJobsSection.classList.remove("hidden");
  filteredSection.classList.add("hidden");

  updateCounts();
});

interviewFilterBtn.addEventListener("click", function () {
  if (currentFilter === "interview") return;

  currentFilter = "interview";

  interviewFilterBtn.classList.remove("bg-base-200");
  interviewFilterBtn.classList.add("bg-primary", "text-white");

  allFilterBtn.classList.remove("bg-primary", "text-white");
  allFilterBtn.classList.add("bg-base-200");

  rejectedFilterBtn.classList.remove("bg-primary", "text-white");
  rejectedFilterBtn.classList.add("bg-base-200");

  allJobsSection.classList.add("hidden");
  filteredSection.classList.remove("hidden");

  filterJobsByStatus("Interview");
});

rejectedFilterBtn.addEventListener("click", function () {
  if (currentFilter === "rejected") return;

  currentFilter = "rejected";

  rejectedFilterBtn.classList.remove("bg-base-200");
  rejectedFilterBtn.classList.add("bg-primary", "text-white");

  allFilterBtn.classList.remove("bg-primary", "text-white");
  allFilterBtn.classList.add("bg-base-200");

  interviewFilterBtn.classList.remove("bg-primary", "text-white");
  interviewFilterBtn.classList.add("bg-base-200");

  allJobsSection.classList.add("hidden");
  filteredSection.classList.remove("hidden");

  filterJobsByStatus("Rejected");
});

function filterJobsByStatus(status) {
  const allCards = document.querySelectorAll(".card");
  filteredSection.innerHTML = "";

  let hasVisibleCards = false;
  const addedCompanies = new Set();

  allCards.forEach((card) => {
    const statusBtn = card.querySelector(".job-status-btn");
    const statusText = statusBtn.textContent.trim();
    const companyName = card.querySelector(".company-name").textContent;

    if (statusText === status && !addedCompanies.has(companyName)) {
      const clone = card.cloneNode(true);
      filteredSection.appendChild(clone);
      addedCompanies.add(companyName);
      hasVisibleCards = true;
    }
  });

  if (!hasVisibleCards) {
    filteredSection.innerHTML = `
      <div id="no-jobs-available" class="w-full bg-base-200 flex flex-col gap-3 justify-center items-center rounded-md p-10 sm:p-15">
        <img src="assets/jobs.png" alt="" />
        <h2 class="text-xl font-medium text-center">No Jobs available</h2>
        <p class="text-center">Check back soon for new job opportunities</p>
      </div>
    `;
  } else {
    addListenersToFiltered();
  }
}

function addListenersToFiltered() {
  filteredSection.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", deleteHandler);
  });
  filteredSection.querySelectorAll(".interview-btn").forEach((btn) => {
    btn.addEventListener("click", interviewHandler);
  });
  filteredSection.querySelectorAll(".rejected-btn").forEach((btn) => {
    btn.addEventListener("click", rejectedHandler);
  });
}

function deleteHandler(event) {
  event.preventDefault();
  event.stopPropagation();

  const card = event.currentTarget.closest(".card");
  const companyName = card.querySelector(".company-name").textContent;

  const allCards = document.querySelectorAll("#all-jobs-cards .card");
  for (let i = 0; i < allCards.length; i++) {
    if (
      allCards[i].querySelector(".company-name").textContent === companyName
    ) {
      allCards[i].remove();
      break;
    }
  }

  card.remove();
  updateCounts();
  checkEmptyState();

  if (currentFilter === "interview") {
    filterJobsByStatus("Interview");
  } else if (currentFilter === "rejected") {
    filterJobsByStatus("Rejected");
  }
}

function interviewHandler(event) {
  event.preventDefault();
  event.stopPropagation();

  const card = event.currentTarget.closest(".card");
  const companyName = card.querySelector(".company-name").textContent;

  const allCards = document.querySelectorAll("#all-jobs-cards .card");
  for (let i = 0; i < allCards.length; i++) {
    if (
      allCards[i].querySelector(".company-name").textContent === companyName
    ) {
      const statusBtn = allCards[i].querySelector(".job-status-btn");
      statusBtn.textContent = "Interview";
      statusBtn.className =
        "job-status-btn bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium";
      break;
    }
  }

  const statusBtn = card.querySelector(".job-status-btn");
  statusBtn.textContent = "Interview";
  statusBtn.className =
    "job-status-btn bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium";

  updateCounts();

  if (currentFilter === "interview") {
    filterJobsByStatus("Interview");
  } else if (currentFilter === "rejected") {
    filterJobsByStatus("Rejected");
  }
}

function rejectedHandler(event) {
  event.preventDefault();
  event.stopPropagation();

  const card = event.currentTarget.closest(".card");
  const companyName = card.querySelector(".company-name").textContent;

  const allCards = document.querySelectorAll("#all-jobs-cards .card");
  for (let i = 0; i < allCards.length; i++) {
    if (
      allCards[i].querySelector(".company-name").textContent === companyName
    ) {
      const statusBtn = allCards[i].querySelector(".job-status-btn");
      statusBtn.textContent = "Rejected";
      statusBtn.className =
        "job-status-btn bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium";
      break;
    }
  }

  const statusBtn = card.querySelector(".job-status-btn");
  statusBtn.textContent = "Rejected";
  statusBtn.className =
    "job-status-btn bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium";

  updateCounts();

  if (currentFilter === "interview") {
    filterJobsByStatus("Interview");
  } else if (currentFilter === "rejected") {
    filterJobsByStatus("Rejected");
  }
}

function checkEmptyState() {
  const allCards = document.querySelectorAll("#all-jobs-cards .card");

  if (allCards.length === 0) {
    allJobsSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    filteredSection.innerHTML = `
      <div id="no-jobs-available" class="w-full bg-base-200 flex flex-col gap-3 justify-center items-center rounded-md p-10 sm:p-15">
        <img src="assets/jobs.png" alt="" />
        <h2 class="text-xl font-medium text-center">No Jobs available</h2>
        <p class="text-center">Check back soon for new job opportunities</p>
      </div>
    `;
  }
}

function updateCounts() {
  const allCards = document.querySelectorAll("#all-jobs-cards .card");
  const totalJobs = allCards.length;
  totalCountEl.textContent = totalJobs;
  availableJobEl.textContent = totalJobs;

  let interviewCount = 0;
  let rejectedCount = 0;

  allCards.forEach((card) => {
    const statusText = card.querySelector(".job-status-btn").textContent.trim();
    if (statusText === "Interview") interviewCount++;
    if (statusText === "Rejected") rejectedCount++;
  });

  interviewCountEl.textContent = interviewCount;
  rejectedCountEl.textContent = rejectedCount;
}

document
  .querySelectorAll(".delete-btn")
  .forEach((btn) => btn.addEventListener("click", deleteHandler));
document
  .querySelectorAll(".interview-btn")
  .forEach((btn) => btn.addEventListener("click", interviewHandler));
document
  .querySelectorAll(".rejected-btn")
  .forEach((btn) => btn.addEventListener("click", rejectedHandler));

updateCounts();
