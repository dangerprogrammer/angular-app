import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FindCpfService } from '../../services/find-cpf.service';

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

  constructor(private cpf: FindCpfService, private cdr: ChangeDetectorRef) {}

  private fb = inject(FormBuilder);

  protected form = this.fb.group({
    name: ['', [Validators.required]],
    cep: ['', [Validators.required]],
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

  protected printForm() {
    console.log(this.form);
  }
}
