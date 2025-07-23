import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Produto {
  id: number;
  nome: string;
  regiao: string;
  preco: number;
  precoAntigo?: number;
  imagem: string;
  link: string;
}

@Component({
  selector: 'app-tcg',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink ],
  templateUrl: './tcg.html',
  styleUrls: ['./tcg.css']
})
export class Tcg implements OnInit {

  todosOsProdutos: Produto[] = [
    { id: 201, nome: 'Deck Cynthia', regiao: 'sinnoh', preco: 310.00, imagem: 'img/cynthia-deck-tcg.png', link: '/produto' },
    { id: 202, nome: 'Booster Pack Scarlet e Violet (4 Packs)', regiao: 'paldea', preco: 80.00, imagem: 'img/bosterpack-paldea.jpg', link: '/produto' },
    { id: 203, nome: 'Deck Miraidon', regiao: 'paldea', preco: 270.00, imagem: 'img/miraidon-deck-tcg.jpg', link: '/produto' },
    { id: 204, nome: 'Deck Marnie', regiao: 'galar', preco: 280.00, precoAntigo: 350.00, imagem: 'img/marnie-deck-tcg.png', link: '/produto' },
    { id: 205, nome: 'Booster Pack Reshiram (10 packs)', regiao: 'unova', preco: 150.00, imagem: 'img/bosterpack-reshiran.jpg', link: '/produto' }
  ];

  produtosExibidos: Produto[] = [];
  opcoesDeFiltro = [
    { nome: 'Kanto', valor: 'kanto', selecionado: false },
    { nome: 'Johto', valor: 'johto', selecionado: false },
    { nome: 'Hoenn', valor: 'hoenn', selecionado: false },
    { nome: 'Sinnoh', valor: 'sinnoh', selecionado: false },
    { nome: 'Unova', valor: 'unova', selecionado: false },
    { nome: 'Kalos', valor: 'kalos', selecionado: false },
    { nome: 'Alola', valor: 'alola', selecionado: false },
    { nome: 'Galar', valor: 'galar', selecionado: false },
    { nome: 'Paldea', valor: 'paldea', selecionado: false }
  ];
  ordenacaoAtual: string = 'relevancia';

  constructor() { }

  ngOnInit(): void {
    this.aplicarFiltrosEOrdenacao();
  }

  aplicarFiltrosEOrdenacao(): void {
    let produtosProcessados = [...this.todosOsProdutos];

    // Aplique os filtros de região
    const regioesSelecionadas = this.opcoesDeFiltro
      .filter(opcao => opcao.selecionado)
      .map(opcao => opcao.valor);

    if (regioesSelecionadas.length > 0) {
      produtosProcessados = produtosProcessados.filter(produto =>
        regioesSelecionadas.includes(produto.regiao)
      );
    }

    // ordenação à lista já filtrada
    if (this.ordenacaoAtual === 'price-asc') {
      // Ordena do menor para o maior preço
      produtosProcessados.sort((a, b) => a.preco - b.preco);
    } else if (this.ordenacaoAtual === 'price-desc') {
      // Ordena do maior para o menor preço
      produtosProcessados.sort((a, b) => b.preco - a.preco);
    }

    this.produtosExibidos = produtosProcessados;
  }

  // Remover filtro ao clicar na tag
  removerFiltro(filtro: any): void {
    filtro.selecionado = false;
    this.aplicarFiltrosEOrdenacao();
  }
}
