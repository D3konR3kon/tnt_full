import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  userForm: any = {
    name: null,
    email: null,
    password: null,
    img: null,
  }

  isSuccessful = false
  isSignUpFailed = false
  errorMessage = ''
  imagePreview: any;

  

  constructor(private router: Router, private location : Location, private authService: AuthService) { }
  
  ngOnInit(): void {
    
  }
  fileSelect(event: any){
    //this.url = event.target.files[0]
    if (event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.imagePreview = event.target.result;
      }
    }
  }

  onSubmit(): void {
    const { name, email, password, img } = this.userForm

    this.authService.register(name, email, password, img)
      .subscribe({
        next: data => {
          console.log(data)
          this.isSuccessful = true
          this.isSignUpFailed = false
        },
        error: err => {
          this.errorMessage = err.error.message
          this.isSignUpFailed = true
        }
      })
      this.router.navigate(['/home'])
  }
}
