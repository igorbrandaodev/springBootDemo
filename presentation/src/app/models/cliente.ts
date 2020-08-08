export class Cliente {

    public Cliente(usuario: string, senha: string) {
        this.usuario = usuario;
        this.senha = senha;
    }
    nome: string;
    usuario: string;
    senha: string;
    dataCadastro: Date;
}
