import { ToString } from '../contracts/logavel.js';
import { Negociacao } from './negociacao.js';

export class Negociacoes implements ToString {
    private negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    lista(): readonly Negociacao[] {
        return this.negociacoes;
    }

    toString(): string {
        return JSON.stringify(this.negociacoes, null, 2)
    }
}
