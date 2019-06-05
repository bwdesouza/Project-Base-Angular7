import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertDialog } from '../alert-dialog/alert-dialog.component';
import { LoginService } from 'src/app/services/login.service';
import { Credencial } from 'src/app/models/Credencial';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private loginService: LoginService) {
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.createForm();
  }

  openDialog(texto, titulo): void {
    const dialogRef = this.dialog.open(AlertDialog, {
      width: '250px',
      data: { texto: texto, titulo: titulo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSubmit() {
    const controls = this.form.controls;
    let mensagemErro = '';
    /** check form */
    if (this.form.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      mensagemErro = 'Preencha os campos obrigatórios!';
      this.openDialog(mensagemErro, 'Olá Prezado');
      return;
    }

    let email = controls['email'].value.split('@')[1];
    if (email == undefined || email.indexOf('.') == -1) {
      controls['email'].markAsTouched();

      mensagemErro = 'Email digitado está inválido. Por favor, digite um Email válido!';
      this.openDialog(mensagemErro, 'Olá Prezado');
      return;
    }

    let credencial = new Credencial();
    credencial.email = controls['email'].value;
    credencial.senha = controls['senha'].value;
    
    this.loginService.login(credencial).subscribe(res => {
      this.openDialog('Login realizado com sucesso!', 'Sucesso!');
    }, error => {
      if (error.error.errors[0].message != undefined && error.error.errors[0].message != '') {
        let mensagemErro = error.error.errors[0].message;
        this.openDialog(mensagemErro, 'Erro!');
      }
      else {
        this.openDialog('Ocorreu algo de errado ao realizar seu login!', 'Erro!');
      }
    });

  }

  implementandoFuncao(){    
    this.openDialog('Espere só mais um pouquinho, logo logo está função estará pronta =D', 'Informação');
  }

}
