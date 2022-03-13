const baseUrl = 'https://api.adviceslip.com/advice';

const quoteIdSpan = document.querySelector('#quote-id');
const quoteText = document.querySelector('#quote');
const button = document.querySelector('.btn');

getRandomAdvice();

button.addEventListener('click', getRandomAdvice);

function getRandomAdvice() {
  fetch(baseUrl)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const slip = data.slip;
      quoteIdSpan.innerText = `Advice #${slip.id}`;
      quoteText.innerText = `"${slip.advice}"`;
    })
    .catch((err) => {
      console.error(err);
    });
}
