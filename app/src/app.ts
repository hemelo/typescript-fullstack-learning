import { NegociacaoController } from './controllers/negociacao-controller.js';

const controller = new NegociacaoController();

const form = document.querySelector('.form');
const importButton = document.querySelector("#import-button")

form.addEventListener('submit', event => {
    event.preventDefault();
    controller.adiciona();
});

importButton.addEventListener('click', event => {
    event.preventDefault();
    controller.importa();
})