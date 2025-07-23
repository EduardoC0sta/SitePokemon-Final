import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

// Validadores (sem alteração)
export function senhasIguaisValidator(control: AbstractControl): ValidationErrors | null {
  const senha = control.get('senha');
  const confirmarSenha = control.get('confirmarSenha');
  return senha && confirmarSenha && senha.value !== confirmarSenha.value ? { senhasNaoCoincidem: true } : null;
}
export function nomeCompletoValidator(control: AbstractControl): ValidationErrors | null {
  const nome = control.value as string;
  return nome && nome.trim().includes(' ') ? null : { nomeIncompleto: true };
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class Cadastro implements OnInit {
  cadastroForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, nomeCompletoValidator]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [ Validators.required, Validators.minLength(6), Validators.pattern('^.*[!@#$%^&*(),.?":{}|<>].*$') ]],
      confirmarSenha: ['', Validators.required],
      // 1. ADICIONE O NOVO CAMPO DE CONTROLE AQUI
      aceiteLgpd: [false, Validators.requiredTrue]
    }, { validators: senhasIguaisValidator });
  }

  get f() { return this.cadastroForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.cadastroForm.invalid) {
      console.log("Formulário inválido:", this.cadastroForm.errors);
      return;
    }

    this.authService.cadastrar(this.cadastroForm.value).subscribe({
      next: (response) => {
        console.log('Cadastro bem-sucedido!', response);
        alert('Conta criada com sucesso! Você será redirecionado para a página inicial.');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
        alert(err.error.message || 'Ocorreu um erro ao tentar criar a conta.');
      }
    });
  }
}
