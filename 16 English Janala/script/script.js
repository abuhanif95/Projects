const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN";
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  //   console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  //   console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn);

      removeActive();
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  //   console.log(url);
  const response = await fetch(url);
  const details = await response.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  //   console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
        <div>
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})
            </h2>
          </div>

          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>

          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
     `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  //   console.log(words);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
       <div
        class="text-center col-span-full rounded-md py-10 space-y-6 font-bangla"
      >
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl font-medium text-gray-500">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    // console.log(word);

    const card = document.createElement("div");
    card.innerHTML = `
       <div
        class="bg-white rounded-xl text-center shadow-sm py-10 px-5 space-y-3"
      >
        <h2 class="font-bold text-2xl">${word.word ? word.word : "Words not found"}</h2>
        <p class="font-semibold">Meaning/Pronunciation</p>
        <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "কোনো শব্দ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation not found"}"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn btn-soft btn-info">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick="pronounceWord('${word.word}')" class="btn btn-soft btn-info">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

const displayLesson = (lessons) => {
  // console.log(lessons);

  // get the container and empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // get into every lessons
  for (let lesson of lessons) {
    // create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
       <button 
            id="lesson-btn-${lesson.level_no}" 
            onclick="loadLevelWord(${lesson.level_no})" 
            class="btn btn-outline btn-primary lesson-btn">
               <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}
        </button>
    `;

    // append into container
    levelContainer.append(btnDiv);
  }
};

loadLesson();

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();

  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  // console.log(searchValue)

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((response) => response.json())
    .then((data) => {
      const allWords = data.data;
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
      displayLevelWord(filterWords);
    });
});
