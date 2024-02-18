import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FindCpfService } from '../../services/find-cpf.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  city: any;
  bairro: any;
  state: any;
  validBairro: boolean = !0;
  validForm: boolean = !0;

  constructor(
    private cpf: FindCpfService,
    private cdr: ChangeDetectorRef,
    private user: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}


  protected form = this.fb.group({
    name: ['', [Validators.required]],
    cep: ['', [Validators.required, Validators.minLength(8)]],
    phone: ['', [Validators.required, Validators.minLength(11)]],
    city: ['', [Validators.required]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    bairro: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    state: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
    const getCEP = this.form.get('cep');

    getCEP?.valueChanges.subscribe((value: any) => {
      if (getCEP.valid) {
        this.cpf.getCEP(value).subscribe((data: any) => {
          if (data.erro) {
            this.city = '';
            this.bairro = '';
            this.state = '';
          } else {
            const { localidade, bairro, uf } = data;

            this.city = localidade;
            this.validBairro = bairro;
            this.bairro = bairro;
            this.state = uf;
          };
          this.cdr.detectChanges();
        });
      }
    });
  }

  protected submitForm() {
    const email = this.form.get('email')?.value,
          hasUser = this.user.getUserByEmail(email as string);

    hasUser.subscribe(existsUser => {
      const userCreation = this.user.createUser(this.form.value as User);

      if (existsUser) {
        this.user.setExists(existsUser as User);
        this.user.setRedirect('/login');
        this.router.navigate(['/login']);
      } else {
        userCreation.subscribe(user => {
          this.user.setSigned(user as User);
          this.router.navigate(['/']);
        });
      };
    });
  }

  protected goToLogin() {
    this.user.setRedirect('/login');
    this.router.navigate(['/login']);
  }
}
