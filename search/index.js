const wordsContainer = document.getElementById("words-container");
const searchInput = document.getElementById("search-input");

const initialWords = ["turbold", "test", "hello", "GG", "lord", "enhsaihan"];

function renderWords(words) {
  wordsContainer.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    const word = document.createElement("div");
    word.innerHTML = words[i];
    wordsContainer.appendChild(word);
  }
}

searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value;
  const filteredWords = [];
  for (let i = 0; i < initialWords.length; i++) {
    if (
      initialWords[i].toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    ) {
      filteredWords.push(initialWords[i]);
    }
  }
  renderWords(filteredWords);
});

renderWords(initialWords);

// function multiplyByTwo(a) {
//   const result = a * 2;
//   console.log(result);
// }

// multiplyByTwo(20);
