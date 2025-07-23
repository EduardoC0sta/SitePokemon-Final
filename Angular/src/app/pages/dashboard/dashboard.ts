import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';

interface Produto {
  id: number;
  sku: string;
  nome: string;
  regiao: string;
  preco: number;
  precoAntigo?: number;
  imagem: string;
  estoque: number;
  emEstoque: boolean;
  emDestaque: boolean;
  categoria: string;
  descricaoCurta: string;
  descricaoLonga: string;
  tags: string[];
  avaliacoes: { usuario: string; nota: number; comentario: string; }[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  todosOsProdutos: Produto[] = [];
  produtoSelecionado: Produto | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getTodosOsProdutos().subscribe((produtos: Produto[]) => {
      this.todosOsProdutos = produtos;
    });
  }

  onProdutoSelecionado(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const produtoId = parseInt(selectElement.value, 10);
    this.produtoSelecionado = this.todosOsProdutos.find(p => p.id === produtoId) || null;
  }

}
