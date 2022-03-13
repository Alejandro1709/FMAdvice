const baseUrl = 'https://api.adviceslip.com/advice';

const quoteIdSpan = document.querySelector('#quote-id');
const quoteText = document.querySelector('#quote');
const button = document.querySelector('.btn');
const statusMessage = document.querySelector('#status');

class Adviser {
  constructor(quoteIdSpan, quoteText, button, callbacks) {
    this.quoteIdSpan = quoteIdSpan;
    this.quoteText = quoteText;
    this.button = button;

    if (callbacks) {
      this.onDiceClick = callbacks.onDiceClick;
      this.onLoading = callbacks.onLoading;
      this.onFinish = callbacks.onFinish;
    }

    this.button.addEventListener('click', this.getRandomAdvice);
  }
  getRandomAdvice = () => {
    if (this.onDiceClick) {
      this.onDiceClick();
      if (this.onLoading) {
        this.onLoading();
      }
    }
    fetch(baseUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const slip = data.slip;
        this.quoteIdSpan.innerText = `Advice #${slip.id}`;
        this.quoteText.innerText = `"${slip.advice}"`;
        if (this.onFinish) {
          this.onFinish();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

const adviser = new Adviser(quoteIdSpan, quoteText, button, {
  onDiceClick() {
    console.log('Clicked');
  },
  onLoading() {
    statusMessage.innerText = 'Loading...';
    console.log('Loading.. Sit tight');
  },
  onFinish() {
    statusMessage.innerText = 'Finished';
    console.log('Finished.');
  },
});
