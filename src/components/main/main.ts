import { deleteCars, getCars, postCars, putCars, startEngine, stopEngine, switchEngine } from '../api';
import { ICars, IStartEngine, ISwitchEngine } from './../types';

const container = document.body as HTMLElement;
let currPage = 0;

const renderButtonsContainer = (name:string):string => {
  return (`<div class="container-garage_car-buttons">
    <div class="btn-container">
    <div class="btn-garage_edit">
    <button>EDIT</button>
</div>
  <div class="btn-garage_remove">
    <button>REMOVE</button>
</div>
    </div>
  <div class="car-name">${name}</div>
  </div>
  <div class="container-buttons_use">
  <div class="btn-container">
  <div class="btn-start">
          <button class="btn-startOne" >START</button>
      </div>
      <div class="btn-reset">
          <button class="btn-resetOne" disabled>RESET</button>
      </div>
  </div>
  </div>
 `);
};

const renderCar = (color:string) => {
  return (`<div class="container-img">
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg
       xmlns:dc="http://purl.org/dc/elements/1.1/"
       xmlns:cc="http://creativecommons.org/ns#"
       xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
       xmlns:svg="http://www.w3.org/2000/svg"
       xmlns="http://www.w3.org/2000/svg"
       version="1.1"
       id="svg5332"
       viewBox="0 0 256.00007 256.00002"
       height="72.248894mm"
       width="72.248909mm"
       class ="car-icon">
      <g
         transform="translate(-362.5464,-406.21469)"
         id="layer1">
        <path
           id="path4729-0-0"
           d="m 469.54633,480.16096 c -28.4885,-0.0451 -72.9963,4.7606 -72.9963,4.7606 0,0 6.1798,1.26482 4.9637,4.32757 -1.2162,3.06274 -12.9467,17.32041 -15.7822,19.34577 -1.6924,1.20893 -5.2585,1.62257 -7.8752,1.76616 0,0 -1.7042,1.94896 -2.5337,3.4482 -4.4252,7.99941 -3.7176,17.63218 -3.6889,16.15996 l -0.029,1.5351 c -6.6598,3.69009 -8.1038,5.47112 -8.6547,6.61849 -0.8478,1.76593 -0.2904,18.57192 1.0182,20.87321 0.9857,1.73392 7.9214,6.33244 11.2916,8.50164 -0.056,-0.70873 -0.092,-1.42082 -0.092,-2.13786 0,-7.17978 2.8263,-14.00249 7.9031,-19.07936 5.0769,-5.07684 11.8996,-7.90314 19.0794,-7.90314 7.1798,0 14.0025,2.8263 19.0793,7.90314 5.0769,5.07687 7.9029,11.89957 7.9029,19.07936 0,2.24289 -0.2752,4.45153 -0.8092,6.58241 l 0.5548,0.0361 120.8635,0 c -0.7721,-2.53009 -1.1733,-5.18506 -1.1733,-7.8912 0,-7.17954 2.826,-14.00226 7.9029,-19.07912 5.0768,-5.07686 11.8995,-7.90314 19.0793,-7.90314 7.18,0 14.0025,2.82628 19.0794,7.90314 5.0768,5.07686 7.9031,11.89958 7.9031,19.07912 0,2.55557 -0.364,5.06356 -1.0541,7.46584 5.0469,-0.7148 14.2719,-2.31369 15.0106,-4.57621 1.0187,-3.12 3.4004,-16.99581 1.0619,-24.52634 -2.3384,-7.53075 -12.7275,-20.74585 -51.6738,-29.01891 -44.8008,-25.45504 -63.7988,-31.06907 -89.3116,-32.92651 -3.1889,-0.23195 -2.9498,-0.33767 -7.0195,-0.34399 z m 1.7242,3.97119 c 6.6996,-0.0428 31.1274,0.62823 56.5514,14.15351 8.7451,4.65217 32.7782,16.49877 29.6553,19.0913 -12.726,10.56532 -21.7497,-3.30913 -85.7694,-5.09107 l -1.9091,-28.12782 c 0,0 0.5147,-0.0225 1.4718,-0.0248 z m -13.6445,0.21414 0,0 c 2.3774,-0.0293 3.8363,0 3.8363,0 l -0.891,27.61884 c 0,0 -53.8404,-1.39083 -55.3013,-2.99106 -1.4609,-1.60002 8.5016,-15.87798 20.6823,-20.49136 9.1355,-3.45971 24.5414,-4.05572 31.6737,-4.13822 z m 125.9029,37.15648 c 1.2019,-0.0225 2.4794,0.15328 2.8914,0.20063 2.5493,0.28852 11.4961,3.71849 17.0531,7.57695 5.5568,3.85848 9.3686,8.58706 9.3686,8.58706 -7.1911,2.09999 -31.9798,-14.08521 -31.7553,-15.46409 0.1127,-0.68934 1.24,-0.88657 2.4422,-0.90077 z m -24.6517,6.56462 9.4184,0 c 0,0 -0.6785,1.44064 -2.464,1.79973 -1.7855,0.35931 -2.8342,0.45646 -4.4903,0 -1.6564,-0.45625 -2.4641,-1.79973 -2.4641,-1.79973 z m 16.673,13.10937 c -6.0619,0 -11.9133,2.42348 -16.1998,6.71002 -4.2866,4.28631 -6.7096,10.13747 -6.7096,16.19963 0,6.06216 2.423,11.91332 6.7096,16.19986 4.2865,4.28632 10.1379,6.70978 16.1998,6.70978 6.0622,0 11.9134,-2.42346 16.1999,-6.70978 4.2865,-4.28654 6.7098,-10.1377 6.7098,-16.19986 0,-6.06216 -2.4233,-11.91332 -6.7098,-16.19963 -4.2865,-4.28654 -10.1377,-6.71002 -16.1999,-6.71002 z m -173.4002,1.27272 c -6.0621,0 -11.9133,2.42324 -16.1998,6.70999 -4.2866,4.28656 -6.7098,10.13748 -6.7098,16.19965 0,6.06215 2.4232,11.91332 6.7098,16.19986 4.2865,4.28654 10.1377,6.70978 16.1998,6.70978 6.0622,0 11.9133,-2.42324 16.1999,-6.70978 4.2865,-4.28654 6.7098,-10.13771 6.7098,-16.19986 0,-6.06217 -2.4233,-11.91309 -6.7098,-16.19965 -4.2866,-4.28675 -10.1377,-6.70999 -16.1999,-6.70999 z m 173.4002,8.9094 c 3.2679,0 6.6882,1.41811 8.9989,3.72864 2.3106,2.31074 3.7287,5.73124 3.7287,8.99889 0,3.26766 -1.4181,6.69017 -3.7287,9.0007 -2.3107,2.31076 -5.731,3.72683 -8.9989,3.72683 -3.2676,0 -6.6881,-1.41607 -8.9986,-3.72683 -2.3108,-2.31053 -3.7289,-5.73305 -3.7289,-9.0007 0,-3.26765 1.4181,-6.68815 3.7289,-8.99889 2.3105,-2.31053 5.731,-3.72864 8.9986,-3.72864 z m -173.4002,1.27271 c 3.2677,0 6.6882,1.4181 8.9987,3.72886 2.3107,2.31053 3.7288,5.73102 3.7288,8.99867 0,3.26788 -1.4181,6.69017 -3.7288,9.00091 -2.3105,2.31054 -5.731,3.72662 -8.9987,3.72662 -3.2676,0 -6.6881,-1.41608 -8.9989,-3.72662 -2.3105,-2.31074 -3.7286,-5.73303 -3.7286,-9.00091 0,-3.26765 1.4181,-6.68814 3.7286,-8.99868 2.3108,-2.31075 5.7313,-3.72885 8.9989,-3.72885 z"
           style="fill:${color};fill-opacity:0.99450983;stroke:none" />
      </g>
    </svg>
</div>
  `);
};

const renderContainerCars = (name: string, color:string, id?:number):string => {
  return (`<div class="container-car_race" data-id = "${id} ">
                   ${renderButtonsContainer(name)}
                    <div class="container-game">
                       ${renderCar(color)}
                        <div class="game-finish">
                        <svg height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                         <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                         <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                         <g id="SVGRepo_iconCarrier"> <path style="fill:#ff1100;" d="M259.115,25.984C233.19,19.499,206.387,12.8,179.2,12.8c-36.19,0-76.015,12.109-109.261,33.22 L64,49.783v235.119l19.661-12.476C112.913,253.85,147.738,243.2,179.2,243.2c24.013,0,48.145,6.033,73.685,12.416 c25.924,6.485,52.736,13.184,79.915,13.184c26.65,0,82.099,0,111.454-29.346l3.746-3.746V16.538l-21.854,0.017 C404.301,38.4,356.011,38.4,332.8,38.4C308.779,38.4,284.655,32.367,259.115,25.984z"/> <path style="fill:#ff3700;" d="M51.2,0v512h25.6V293.069C100.292,273.732,140.177,256,179.2,256 c22.443,0,45.824,5.845,70.588,12.032c26.675,6.673,54.255,13.568,83.012,13.568c28.373,0,87.407,0,120.499-33.101 c4.804-4.796,7.501-11.307,7.501-18.099V25.6c0-10.351-6.238-19.686-15.804-23.654C441.83,0.64,438.502,0,435.209,0 c-6.665,0-13.21,2.603-18.108,7.501C398.993,25.6,352.606,25.6,332.8,25.6c-22.443,0-45.824-5.845-70.579-12.032 C235.546,6.895,207.957,0,179.2,0c-37.171,0-73.429,11.682-102.4,27.273V0H51.2z M179.2,25.6c51.209,0,102.4,25.6,153.6,25.6 c25.6,0,76.8,0,102.4-25.6c0,51.2,0,128,0,204.8C409.6,256,358.4,256,332.8,256c-51.2,0-102.409-25.6-153.6-25.6 c-37.53,0-74.957,13.798-102.4,31.215v-204.8C104.252,39.39,141.679,25.6,179.2,25.6z"/> </g>
                        </svg>
                        </div>
                    </div>
              </div>
    `);
};

const renderAllCars = (name:string, color:string, id:number) => {
  return (`<div class="container-garage">
              ${renderContainerCars(name, color, id)}
              </div>
  `);
};

const renderCars = async () => {
  const dataCars: ICars | undefined = await getCars();
  let arrAll = [];
  let htmlView = '';
  if (dataCars)
    for (let i = 0 ; i < dataCars.length;) {
      let tmpArr = [];
      let count = 0;
      while (count < 7) {
        if (!dataCars[i]) {
          count = 7;
        } else {
          tmpArr.push(dataCars[i++]);
          count++;
        }
      }
      arrAll.push(tmpArr);
    }

  if (dataCars || dataCars) {
    for (let i = 0; i < arrAll.length; i++) {
      let htmlCar = '';
      for (let y = 0; y < arrAll[i].length; y++) {
        htmlCar += (renderAllCars(arrAll[i][y].name, arrAll[i][y].color, arrAll[i][y].id));
      }
      htmlView += `<div class = "container-all-items">
      ${htmlCar}
      </div>`;
    }
    return (htmlView);
  } else {
    console.log("DON'T EXIST CARS");
  }
};


const editCar = () =>{
  const pageGarage = document.querySelector('.page-garage') as HTMLElement;
  const inputUpdateCar = document.querySelector('.input-update-car') as HTMLInputElement;
  const colorUpdateCar = document.querySelector('.color-update-car') as HTMLInputElement;
  const btnUpdate = document.querySelector('.btnUpdate') as HTMLButtonElement;
  let getNameCar: string | null | undefined = '';
  pageGarage?.addEventListener('click', (e)=> {
    const target = e.target as HTMLElement;
    if (target.innerHTML === 'EDIT') {
      window.scrollTo(0, 0);
      getNameCar = target.closest('.container-car_race')?.querySelector('.car-name')?.innerHTML;
      getIdEditCar = target.closest('.container-car_race')?.getAttribute('data-id');
      inputUpdateCar.disabled = false;
      colorUpdateCar.disabled = false;
      btnUpdate.disabled = false;
      if (getNameCar) {
        inputUpdateCar.value = getNameCar;
      }
    }
  });
  return (Number(getIdEditCar));
};

const startOneRace = async () =>{
  const pageGarage = document.querySelector('.page-garage') as HTMLElement;
  pageGarage?.addEventListener('click', async (e)=> {
    let moveCar:NodeJS.Timer;
    const target = e.target as HTMLElement;
    const buttonStart = target as HTMLButtonElement;
    if (target.innerHTML === 'START') {
      const getId: string | null | undefined = target.closest('.container-car_race')?.getAttribute('data-id');
      const getStatus:IStartEngine = await startEngine(Number(getId));
      const carIcon: HTMLElement | null | undefined = target.closest('.container-car_race')?.querySelector('.container-img');
      const gameFinish: HTMLElement | null | undefined = target.closest('.container-car_race')?.querySelector('.game-finish');
      const buttonReset: HTMLButtonElement | null | undefined = target.closest('.container-car_race')?.querySelector('.btn-resetOne');
      let start = 0;
      let distance = 0;
      buttonStart.disabled = true;
      if (buttonReset) buttonReset.disabled = false;

      if (gameFinish?.offsetLeft && carIcon?.offsetLeft)
        distance = gameFinish?.offsetLeft;

      moveCar = setInterval( async function () {
        start += getStatus.velocity;
        if (carIcon) carIcon.style.left = start / 36 + 'px';

        if (carIcon) {
          if ((distance - carIcon?.offsetLeft) <= 0) {
            clearInterval(moveCar);
          }
        }
      }, 10);
      buttonReset?.addEventListener('click', async () => {
        await stopEngine(Number(getId));
        clearInterval(moveCar);
        if (carIcon) carIcon.style.left = '1px';
        buttonStart.disabled = false;
        if (buttonReset) buttonReset.disabled = true;
      });
      const SwitchEngine:ISwitchEngine = await switchEngine(Number(getId));
      if ( !SwitchEngine ) {
        clearInterval(moveCar);
      }
    }
  });
};

const paginationPages = () =>{
  const containerAllItems = document.querySelectorAll('.container-all-items') as NodeList;
  const btnPrev = document.querySelector('.btnPrev') as HTMLButtonElement;
  const btnNext = document.querySelector('.btnNext') as HTMLButtonElement;
  const btnPaginationPrev = document.querySelector('.btnPaginationPrev') as HTMLButtonElement;
  const btnPaginationNext = document.querySelector('.btnPaginationNext') as HTMLButtonElement;

  (containerAllItems[0] as HTMLElement).classList.add('pageShow');

  if (containerAllItems.length >= 2) {
    btnPaginationNext.disabled = false;
  }

  btnNext?.addEventListener('click', () => {
    if (!(currPage <= containerAllItems.length)) return false;

      (containerAllItems[currPage] as HTMLElement).classList.remove('pageShow');
      (containerAllItems[currPage + 1] as HTMLElement).classList.add('pageShow');
      currPage += 1;

      if (currPage >= 1) {
        btnPaginationPrev.disabled = false;
      }

      if (currPage === containerAllItems.length - 1) {
        btnPaginationNext.disabled = true;
      }

  });

  btnPrev?.addEventListener('click', () => {
    if (currPage >= 0) {
      (containerAllItems[currPage] as HTMLElement).classList.remove('pageShow');
      (containerAllItems[currPage - 1] as HTMLElement).classList.add('pageShow');
      currPage -= 1;
      if (currPage >= 0) {
        btnPaginationNext.disabled = false;
      }
      if (currPage <= 0) {
        btnPaginationPrev.disabled = true;
      }
    } else {
      return false;
    }
  });
};

const changeOrAddCar = () => {
  return (`
    <div class="createAndChangeCar">
        <div class="createCar">
          <input class = "car-create" type="text">
          <input class = "car-update" type="color" id="head" name="head"
          value="#FF0000">
          <div class="btnCreateCar">
              <button class="btn-create">CREATE</button>
          </div>
        </div>
        <div class="updateCar">
          <input class = "input-update-car" disabled type="text">
          <input class = "color-update-car" disabled type="color" id="head" name="head"
          value="#FF0000">
          <div class="btnUpdateCar">
              <button class = "btnUpdate" disabled>UPDATE</button>
          </div>
        </div>
        <div class="buttonsChangeParameters">
          <div class="btnRace">
              <button class = "startRace">RACE</button>
          </div>
          <div class="btnReset">
              <button class = "resetRace" disabled>RESET</button>
          </div>
          <div class="btnGenerateCars">
              <button>GENERATE CARS</button>
          </div>
        </div>
      </div>
  `);
};

export const generateMainPage = async (totalCar:number | undefined) => {
  const dataCars: ICars | undefined = await getCars();
  totalCar = dataCars?.length;
  const div = document.createElement('div');
  (div.className = 'wrapper-pageOne'),
  div.innerHTML = `${ await changeOrAddCar() }
      <div class="page-garage">
      <div class="alert-winner">
        Победитель: Название Время
          </div>
          <h2 class = "allCars" >GARAGE (${totalCar})</h2>
          <h3 class="pageNum">Page #1 / 1</h3>
          ${await renderCars()}
      </div>
      <div class="buttonsPaginate">
          <div class="btnPrev">
              <button class="btnPaginationPrev" disabled>PREV PAGE</button>
          </div>
          <div class="btnNext">
              <button class="btnPaginationNext" disabled>NEXT PAGE</button>
          </div>
      </div>
  `;
  container.appendChild(div);

  createCar();
  removeCar();
  editCar();
  updateCar();
  startOneRace();
  startRace();
  render100Cars();
  paginationPages();
};

function getRandomInteger(min:number, max:number) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function getRandomColor() {
  const COLORS = ['009900', '006633', '333399', '669900', '33CC66', '339999', '66FF00',
    '990099', 'CC0000', '99CC99', 'CC3300', 'CCCCCC', 'FF6600', 'FF6699',
    'FFFF00', 'FF66CC', 'FF3300', '3366CC', '0033CC'];
  const color = `#${COLORS[getRandomInteger(0, 18)]}`;
  return color;
}

const getRandomParam = () =>{
  const MODELCAR = ['BMW', 'Mercedes', 'Suzuki', 'Peugeot', 'Citroen', 'Opel', 'Jeep', 'Lada', 'Ferrari', 'Lancia' ];
  const MARKCAR = ['Allante', 'Catera', 'FF', 'Roma', 'Testarossa', 'LaFerrari', 'Coupe', 'Fox', 'Q8', 'R8' ];

  const nameCar = `${MODELCAR[getRandomInteger(0, 9)]} ${MARKCAR[getRandomInteger(0, 9)]}`;
  const colorCar = getRandomColor();
  return ([nameCar, colorCar]);
};

const render100Cars = async () => {
  const wrapperPageOne = document.querySelector('.wrapper-pageOne');
  const btnGenerateCars = document.querySelector('.btnGenerateCars') as HTMLButtonElement;
  const dataCars: ICars | undefined = await getCars();
  btnGenerateCars?.addEventListener('click', async ()=>{
    for (let i = 0; i < 100; i++) {
      const body = {
        name: getRandomParam()[0],
        color: getRandomParam()[1],
      };
      postCars(body);
    }
    if ( wrapperPageOne) {
      wrapperPageOne.remove();
    }
    generateMainPage(dataCars?.length);
    renderCars();
  },
  );
};

const createCar = async (NameCar?:string, ColorCar?:string) => {
  const inputCarName = document.querySelector('.car-create') as HTMLInputElement;
  const btn = document.querySelector('.btn-create') as HTMLButtonElement;
  const carColor = document.querySelector('.car-update') as HTMLInputElement;
  const wrapperPageOne = document.querySelector('.wrapper-pageOne');
  let nameCar:string;
  let colorCar = '#FF0000';
  const dataCars: ICars | undefined = await getCars();
  inputCarName.addEventListener('input', ()=> {
    nameCar = inputCarName.value;
  });
  carColor.addEventListener('input', ()=> {
    colorCar = carColor.value;
  });
  btn.addEventListener('click', ()=>{
    if (nameCar === null || nameCar === undefined) {
      return false;
    } else {
      const body = {
        name: (NameCar) ? nameCar = NameCar : nameCar,
        color: (ColorCar) ? colorCar = ColorCar : colorCar,
      };
      if ( wrapperPageOne) {
        wrapperPageOne.remove();
      }
      generateMainPage(dataCars?.length);
      postCars(body);
      renderCars();
    }
  });
};

const removeCar = async () => {
  const pageGarage = document.querySelector('.page-garage') as HTMLElement;
  let getId: string | null | undefined = '';
  const wrapperPageOne = document.querySelector('.wrapper-pageOne');
  const dataCars: ICars | undefined = await getCars();
  pageGarage?.addEventListener('click', (e)=>{
    const target = e.target as HTMLElement;
    if (target.innerHTML === 'REMOVE') {
      getId = target.closest('.container-car_race')?.getAttribute('data-id');
      deleteCars(Number(getId));
      if ( wrapperPageOne) {
        wrapperPageOne.remove();
      }
      generateMainPage(dataCars?.length);
      renderCars();
    }
  });
};

let getIdEditCar: string | null | undefined = '';

const updateCar = async () => {
  const inputUpdateCar = document.querySelector('.input-update-car') as HTMLInputElement;
  const colorUpdateCar = document.querySelector('.color-update-car') as HTMLInputElement;
  const btnUpdate = document.querySelector('.btnUpdate') as HTMLButtonElement;
  const wrapperPageOne = document.querySelector('.wrapper-pageOne');
  let updateNameCar:string = inputUpdateCar.value;
  let updateColorCar = '#FF0000';
  const dataCars: ICars | undefined = await getCars();
  inputUpdateCar.addEventListener('input', ()=>{
    updateNameCar = inputUpdateCar.value;
  });

  colorUpdateCar.addEventListener('input', ()=>{
    updateColorCar = colorUpdateCar.value;

  });

  btnUpdate?.addEventListener('click', ()=>{
    const id = editCar();
    const body:{
      name:string,
      color:string
    } = {
      name: updateNameCar,
      color: updateColorCar,
    };
    if ( wrapperPageOne) {
      wrapperPageOne.remove();
    }
    generateMainPage(dataCars?.length);
    putCars(id, body);
    renderCars();
  });
};

const returnPromise = (allContainerCarRace: Node[], buttonReset:HTMLButtonElement | null | undefined, button:HTMLButtonElement, sec:number, alertWinner:HTMLElement) =>{
  Promise.all([allContainerCarRace.forEach( async (item) => {
    let moveCar:NodeJS.Timer;
    let getNameCar: string | null | undefined = '';
    const getId: string | null | undefined = (<Element>item).getAttribute('data-id');
    const carIcon: HTMLElement | null = (<Element>item).querySelector('.container-img');
    const gameFinish: HTMLElement | null = (<Element>item).querySelector('.game-finish');
    getNameCar = (<Element>item).querySelector('.car-name')?.innerHTML;
    const getStatus:IStartEngine = await startEngine(Number(getId));
    const startSec = Date.now();
    let start = 0;
    let distance = 0;
    buttonReset?.addEventListener('click', async () => {
      await stopEngine(Number(getId));
      clearInterval(moveCar);
      if (carIcon) carIcon.style.left = '1px';
      button.disabled = false;
      if (buttonReset) buttonReset.disabled = true;
    });
    if (gameFinish?.offsetLeft && carIcon?.offsetLeft)
      distance = gameFinish?.offsetLeft;
    moveCar = setInterval( function () {
      start += getStatus.velocity;
      if (carIcon) carIcon.style.left = start / 36 + 'px';

      if (carIcon) {
        if ((distance - carIcon?.offsetLeft) <= 0) {
          clearInterval(moveCar);

          if (!sec) return false;
            sec = Date.now() - startSec;
            alertWinner.style.display = 'block';
            alertWinner.innerHTML = `Победитель: ${getNameCar}, Время: ${sec / 1000} сек`;
            setTimeout(()=>{alertWinner.style.display = 'none';}, 4000);
        }
      }
    }, 10);
    const SwitchEngine:ISwitchEngine = await switchEngine(Number(getId));
    if ( !SwitchEngine ) {
      clearInterval(moveCar);
    }
  }),
  ]);
};

const startRace = async () => {
  const startRaceAll = document.querySelector('.startRace') as HTMLElement;
  const buttonReset = document.querySelector('.resetRace')  as HTMLButtonElement | null | undefined;
  const allContainerCarRace = document.querySelectorAll('.container-car_race') as NodeList;
  const alertWinner = document.querySelector('.alert-winner') as HTMLElement;
  let shortContainerCarRace:Node[] = [];
  startRaceAll.addEventListener('click', async (e) => {
    let i = 0;
    let count = 1;
    let startPos = 0;
    let temp:Node[]  = [];
    shortContainerCarRace = temp
    if (currPage + 1 <= 1) {
      i = 0;
      startPos = 0;
    } else {
      while (count <= currPage) {
        ++count;
        i += 7;
        startPos = i;
      }
    }
    for (i; i < startPos + 7; i++) {
      if (allContainerCarRace[i]) {
        shortContainerCarRace.push(allContainerCarRace[i]);
      }
    }
    const sec = 0;
    const target = e.target as HTMLElement;
    const button = target as HTMLButtonElement;
    button.disabled = true;
    if (buttonReset) buttonReset.disabled = false;
    returnPromise(shortContainerCarRace, buttonReset, button, sec, alertWinner);
  });
};








