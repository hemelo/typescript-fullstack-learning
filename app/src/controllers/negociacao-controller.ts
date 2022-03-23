import { domInject } from '../decorators/dom-injector.js';
import { checkPerformance } from '../decorators/performance.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
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
    private negociacoesService = new NegociacoesService();
    
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
        this.atualizaView('Negociação adicionada com sucesso');
    }

    public importa(): void {
        this.negociacoesService
            .obterNegociacoes()
            .then(lista => {
                return lista.filter(negociacaoDeHoje => {
                    return !this.negociacoes
                        .lista()
                        .some(negociacao => negociacao.compare(negociacaoDeHoje))
                })
            })
            .then(listaFiltrada => {
                for(let negociacao of listaFiltrada){
                    this.negociacoes.adiciona(negociacao)
                }
            })
            .then(() => { 
                this.atualizaView('Negociações buscadas da API com sucesso');
            })
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

    private atualizaView(message: string): void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update(message)
    }
}
