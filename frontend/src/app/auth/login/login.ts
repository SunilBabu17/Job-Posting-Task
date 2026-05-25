import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  loginForm !: FormGroup;
  constructor(public authService:AuthService,public fb:FormBuilder,public router:Router){
    this.loginForm = this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required]]
    })
  }
  ngOnInit(): void {

  }
  onReset(){
    this.loginForm.reset();
  }
  onSubmit(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value).subscribe({
        next: (res) => {
          console.log(res)
          if(res.success){
            this.authService.setSession(res.data,res.token);
            this.router.navigate(['/home'])
          }else{
            alert(res.message)
          }
        },
        error: (err:any) => {
          console.log(err);
          alert('Internal Server Error')
        }
      })
    }
  }
}
