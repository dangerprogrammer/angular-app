import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { signedGuard } from './guard/signed.guard';
import { loggedGuard } from './guard/logged.guard';
import { HomeComponent } from './pages/home/home.component';
import { userGuard } from './guard/user.guard';
import { UserComponent } from './pages/home/user/user.component';

export const routes: Routes = [
    { path: 'sign-up', component: SignUpComponent, canActivate: [loggedGuard, signedGuard] },
    { path: 'login', component: LoginComponent, canActivate: [loggedGuard] },
    { path: '', component: HomeComponent, canActivate: [userGuard] },
    { path: 'users/:user-id', component: UserComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];