import { Injectable } from '@angular/core';
import { Carrinho } from 'src/app/models/carrinho';

const KEY = 'authToken';
const refreshToken = 'refreshToken';

@Injectable({
	providedIn: 'root'
})
export class TokenService {

	constructor() { }

	// Token
	setToken(token: string) {
		window.localStorage.setItem(KEY, token);
	}

	getToken() {
		return window.localStorage.getItem(KEY);
	}

	deleteToken() {
		window.localStorage.removeItem(KEY);
		window.localStorage.removeItem('userID');
	}

	hasToken() {
		return !!this.getToken();
	}

	// Usuário
	setUserId(id: string) {
		window.localStorage.setItem('userID', id);
	}

	getUserId() {
		return window.localStorage.getItem('userID');
	}

	// Carrinho
	setCarrinho(carrinho: any) {
		window.localStorage.setItem('carrinho', JSON.stringify(carrinho));
	}

	deleteCarrinho() {
		window.localStorage.removeItem('carrinho');
	}

	getCarrinho() {
		return window.localStorage.getItem('carrinho');
	}

	// Carrinho Payload
	setCarrinhoPayload(carrinhoPayload: any) {
		window.localStorage.setItem('carrinhoPayload', JSON.stringify(carrinhoPayload));
	}

	deleteCarrinhoPayload() {
		window.localStorage.removeItem('carrinhoPayload');
	}

	getCarrinhoPayload() {
		return window.localStorage.getItem('carrinhoPayload');
	}

}
