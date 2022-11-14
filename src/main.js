/* eslint-disable max-len */
import './style.css';
import Swal from 'sweetalert2';
import coinimage from './assets/coin.svg'

const referencieCoin = document.querySelector('input');
const searchBtn = document.querySelector('button');
const titleDisplay = document.getElementById('title-display');

const converter = (referencie) => {
  const generalURL = `https://api.exchangerate.host/latest?base=${referencie}`;

  fetch(generalURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.base !== referencie.toUpperCase()) {
          cleanDisplay();
          throw new Error('Moeda inválida');
        }
        const entries = Object.entries(data.rates);
        entries.forEach((entrie) => {
          const [coinName, value] = entrie;

          const contentCoin = document.createElement('div');
          contentCoin.classList.add('content-coin');

          const headerCoin = document.createElement('div');
          headerCoin.classList.add('header');

          const coinImg = document.createElement('img');
          coinImg.src = coinimage;
          headerCoin.appendChild(coinImg);

          const coinNameH4 = document.createElement('h4');
          coinNameH4.classList.add('coin-name');
          coinNameH4.innerText = coinName;
          headerCoin.appendChild(coinNameH4);

          const coinValueH4 = document.createElement('h4');
          coinValueH4.classList.add('coin-value');
          coinValueH4.innerText = value.toFixed(2);
          contentCoin.appendChild(headerCoin);
          contentCoin.appendChild(coinValueH4);

          const display = document.querySelector('.display');
          display.appendChild(contentCoin);
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Opsss...',
          text: error.message,
        });
      });
};

const cleanDisplay = () => {
  const display = document.querySelector('.display');
  display.innerHTML = '';
  titleDisplay.innerHTML = 'Erroooou!';
};

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  cleanDisplay();
  if (!referencieCoin.value) {
    cleanDisplay();
    return Swal.fire({
      icon: 'error',
      title: 'Opsss...',
      text: 'Você precisa digitar uma moeda!',
    });
  }
  titleDisplay.innerHTML = `Valores referentes a 1 ${referencieCoin.value.toUpperCase()}`;
  converter(referencieCoin.value);
});
