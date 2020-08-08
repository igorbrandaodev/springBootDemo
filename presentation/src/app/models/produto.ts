import { Estoque } from './estoque';

export class Produto{
    id:number;
    nome: string;
    descricao: string;
    valor: number;
    estoque: Estoque;
}