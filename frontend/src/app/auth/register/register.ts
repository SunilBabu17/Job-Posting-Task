import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm !: FormGroup;
  constructor(public authService:AuthService,public fb:FormBuilder,public router:Router){
    this.registerForm = this.fb.group({
      username:["",[Validators.required]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required]]
    })
  }
  ngOnInit(): void {

  }
  onReset(){
    this.registerForm.reset();
  }
  onSubmit(){
    this.registerForm.markAllAsTouched();
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe({
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
