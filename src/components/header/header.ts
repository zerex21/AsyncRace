const container = document.body as HTMLElement;

export const header = ():void => {
  container.innerHTML = `<div class="wrapper-page">
    <div class="buttonsPages">
        <div class="btnGarage">
            <button disabled class="btnGR">TO GARAGE</button>
        </div>
        <div class="btnWinners">
            <button class="btnWR">TO WINNERS</button>
        </div>
    </div>`;
};
