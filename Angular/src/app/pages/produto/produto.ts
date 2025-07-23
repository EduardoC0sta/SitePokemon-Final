import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto.html',
  styleUrls: ['./produto.css']
})
export class Produto implements OnInit {
  produto: any = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const produtoId = this.route.snapshot.paramMap.get('id');

    if (produtoId) {
      this.productService.getProdutoPorId(+produtoId).subscribe({
        next: (data) => {
          this.produto = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar produto:', err);
          this.error = true;
          this.loading = false;
        }
      });
    }
  }
}