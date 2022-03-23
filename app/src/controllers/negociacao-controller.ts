import { domInject } from '../decorators/dom-injector.js';
import { checkPerformance } from '../decorators/performance.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { ValidateData } from '../validators/validate-data.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
    @domInject('#data')
    private inputData: HTMLInputElement;

    @domInject('#quantidade')
    private inputQuantidade: HTMLInputElement;

    @domInject('#valor')
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView("#negociacoesView");
    private mensagemView = new MensagemView("#mensagemView");

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @checkPerformance()
    public adiciona(): void {
        
        const negociacao = this.criaNegociacao();
        
        if(!ValidateData.diaUtil(negociacao.data)){
            return this.mensagemView.update('Insira um dia útil')
        }
        
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }

    private criaNegociacao(): Negociacao {
        return Negociacao.builderFromString(this.inputData.value, this.inputQuantidade.value, this.inputValor.value)
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso')
    }
}
