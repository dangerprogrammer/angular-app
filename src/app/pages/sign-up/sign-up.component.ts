import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private fb = inject(FormBuilder);

  protected form = this.fb.group({
    name: ['', [Validators.required]],
    cep: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    state: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  protected printForm() {
    console.log(this.form.value);
  }
}
