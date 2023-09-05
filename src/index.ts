import './style.css';

import { header } from './components/header/header';
import { generateMainPage } from './components/main/main';
import { generateWinnersPage } from './components/garage/garage';

header();

window.addEventListener( 'DOMContentLoaded', function () {

  generateMainPage(4);
  generateWinnersPage();

  const btnGarage = document.querySelector('.btnGarage') as HTMLElement;
  const btnWinners = document.querySelector('.btnWinners') as HTMLElement;

  const btnGR = document.querySelector('.btnGR') as HTMLButtonElement;
  const btnWR = document.querySelector('.btnWR') as HTMLButtonElement;

  btnGarage.addEventListener('click', () => {
    const wrapperPageTwo = document.querySelector('.wrapper-pageTwo') as HTMLElement;
    const wrapperPageOne = document.querySelector('.wrapper-pageOne') as HTMLElement;

    const { display } = window.getComputedStyle(wrapperPageOne);

    wrapperPageOne.style.display = display === 'none' ? 'block' : 'block';
    wrapperPageTwo.style.display = display === 'none' ? 'none' : 'none';
    btnGR.disabled = true;
    btnWR.disabled = false;
  });

  btnWinners.addEventListener('click', () => {
    const wrapperPageTwo = document.querySelector('.wrapper-pageTwo') as HTMLElement;
    const wrapperPageOne = document.querySelector('.wrapper-pageOne') as HTMLElement;
    const { display } = window.getComputedStyle(wrapperPageTwo);
    wrapperPageOne.style.display = display === 'none' ? 'none' : 'none';
    wrapperPageTwo.style.display = display === 'none' ? 'block' : 'block';
    btnGR.disabled = false;
    btnWR.disabled = true;
  });
});


