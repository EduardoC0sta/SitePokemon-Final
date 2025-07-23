import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Pelucia } from './pages/pelucia/pelucia';
import { Tcg } from './pages/tcg/tcg';
import { Carrinho } from './pages/carrinho/carrinho';
import { Cadastro } from './pages/cadastro/cadastro';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { Produto } from './pages/produto/produto';

export const routes: Routes = [
    // Rotas com layout padrão (sticky)
    { path: 'home', component: Home },
    { path: 'pelucia', component: Pelucia },
    { path: 'tcg', component: Tcg },
    { path: 'produto/:id', component: Produto },

    // Rotas com o layout SIMPLES (header não-fixo)
    { path: 'carrinho', component: Carrinho, data: { layout: 'simple' } },
    { path: 'cadastro', component: Cadastro, data: { layout: 'simple' } },

    // Rota do DASHBOARD (Protegida e com layout próprio)
    {
        path: 'dashboard',
        component: DashboardLayout,
        canActivate: [authGuard],
        data: { layout: 'dashboard' },
        children: [
            { path: '', component: Dashboard }
        ]
    },

    // Redirecionamentos
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];
