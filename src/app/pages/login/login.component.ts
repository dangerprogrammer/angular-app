import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  wrongPassword: boolean = !1;
  noUser: boolean = !1;

  constructor(
    private cdr: ChangeDetectorRef,
    private user: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const prevValues = JSON.parse(this.user.getExists() as string);

    if (prevValues) {
      this.email = prevValues.email;
      this.password = prevValues.password;
      this.cdr.detectChanges();
    };
  }

  protected form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  protected submitLogin() {
    const loginEmail = this.form.get('email')?.value,
          loginPassword = this.form.get('password')?.value,
          hasUser = this.user.getUserByEmail(loginEmail as string);

    hasUser.subscribe((user) => user ? (user.email == loginEmail && (() => {
      if (user.password == loginPassword) {
        this.user.setSigned(user as User);
        this.router.navigate(['/']);
      } else {
        this.wrongPassword = !0;
      };
    })()) : (() => this.noUser = !0)());
  }

  protected goToSignup() {
    this.user.setRedirect('/sign-up');
    this.router.navigate(['/sign-up']);
  }
}
