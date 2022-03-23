import { Negociacoes } from "../models/negociacoes.js";

export class NegociacoesView {
    private element: HTMLElement

    constructor(selector: string){
        this.element = document.querySelector(selector)
    }

    template(model: Negociacoes): string { 
        return `
            <table class="table table=hover table-bordered table-striped">
                <thead class="thead-light">
                    <tr>
                        <th>Data</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    ${model.lista().map(negociacao => {
                        return `
                            <tr>
                                <td>${new Intl.DateTimeFormat().format(negociacao.data)}</td>
                                <td>${negociacao.quantidade}</td>
                                <td>${negociacao.valor}</td>
                            </tr>
                        `
                    }).join('')}
                </tbody>
            </table>
        `;
    }

    update(model: Negociacoes): void {
        this.element.innerHTML = this.template(model)
    }
}