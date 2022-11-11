import './style.css';

import Swal from 'sweetalert2';

const referencieCoin = document.querySelector('input');
const searchBtn = document.querySelector('button');

const converter = (referencie) => {
  cleanDisplay();
  const general_URL = `https://api.exchangerate.host/latest?base=${referencie}`;
  fetch(general_URL).then((response) => response.json()).then((data) => {
    if (data.base !== referencie) {
      cleanDisplay();
      throw new Error('Moeda inválida');
    }
    const entries = Object.entries(data.rates);
    entries.forEach((entrie) => {
      const [coinName, value] = entrie

      const contentCoin = document.createElement('div');
      contentCoin.classList.add('content-coin');

      const headerCoin = document.createElement('div')
      headerCoin.classList.add('header');

      const coinImg = document.createElement('img');
      coinImg.src = "./assets/coin.svg"
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
    })
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Opsss...',
        text: error.message
      })
    });
}

const cleanDisplay = () => {
  const display = document.querySelector('.display');
  display.innerHTML = '';
  titleDisplay.innerHTML = '';
}


searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (!referencieCoin.value) {
    cleanDisplay();
    return Swal.fire({
      icon: 'error',
      title: 'Opsss...',
      text: 'Você precisa digitar uma moeda!'
    })
  }
  titleDisplay.innerHTML = `Valores referentes a 1 ${referencieCoin.value}`
  converter(referencieCoin.value);
  })

