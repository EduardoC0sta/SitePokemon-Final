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
  selector: 'app-pelucia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './pelucia.html',
  styleUrls: ['./pelucia.css']
})
export class Pelucia implements OnInit {

  todosOsProdutos: Produto[] = [
    { id: 101, nome: 'Pelúcia Wooper', regiao: 'johto', preco: 200.00, precoAntigo: 250.00, imagem: 'img/wopper-plush.jpg', link: '/produto' },
    { id: 102, nome: 'Pelúcia Pikachu Clássico', regiao: 'kanto', preco: 270.00, imagem: 'img/pikachu-plush.jpg', link: '/produto' },
    { id: 103, nome: 'Pelúcia Mimikyu', regiao: 'alola', preco: 260.00, imagem: 'img/mimikyu-plush.jpg', link: '/produto' },
    { id: 104, nome: 'Pelúcia Flutter Mane', regiao: 'paldea', preco: 300.00, imagem: 'img/fluttermane-plush.jpg', link: '/produto' },
    { id: 105, nome: 'Pelúcia Pikachu Kimono', regiao: 'kanto', preco: 290.00, imagem: 'img/pikachu-plush-kimono.jpg', link: '/produto' }
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
    let produtosFiltrados: Produto[];

    // Aplique os filtros de região
    const regioesSelecionadas = this.opcoesDeFiltro
      .filter(opcao => opcao.selecionado)
      .map(opcao => opcao.valor);

    if (regioesSelecionadas.length === 0) {
      produtosFiltrados = [...this.todosOsProdutos];
    } else {
      produtosFiltrados = this.todosOsProdutos.filter(produto =>
        regioesSelecionadas.includes(produto.regiao)
      );
    }

    // ordenação à lista já filtrada
    switch (this.ordenacaoAtual) {
      case 'price-asc':
        // Ordena do menor para o maior preço
        produtosFiltrados.sort((a, b) => a.preco - b.preco);
        break;
      case 'price-desc':
        // Ordena do maior para o menor preço

        produtosFiltrados.sort((a, b) => b.preco - a.preco);
        break;
    }

    this.produtosExibidos = produtosFiltrados;
  }

  // Remover filtro ao clicar na tag
  removerFiltro(filtro: any): void {
    filtro.selecionado = false;
    this.aplicarFiltrosEOrdenacao();
  }
}
