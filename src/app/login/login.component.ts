import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface GoogleUser {
  getId(): string;
  getName(): string;
  getEmail(): string;
  getImageUrl(): string;
  getBasicProfile(): {
    getId: () => string;
    getName: () => string;
    getEmail: () => string;
    getImageUrl: () => string;
  };
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  email:string='';

  ngOnInit() {
    // Expose the method to the global scope
    (window as any).onGoogleSignIn = this.onGoogleSignIn.bind(this);
  }

    validateEmail() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (emailRegex.test(this.email)) {
        const domain = this.email.split('@')[1];
        if (domain === 'fedex.com') {
          // Email is valid and domain is "fedex.com"
          // Email is valid and domain is "fedex.com"
          console.log('Email is valid and domain is "fedex.com"');
          // Route the page to AppComponent
          // You can use Angular's Router module to navigate to a different component
          // Assuming you have imported the Router module, you can use the navigate method to navigate to the AppComponent
          // For example:
          // import { Router } from '@angular/router';
          // constructor(private router: Router) {}
          // ...
          this.router.navigate(['/home'], { queryParams: { couponId: this.email } }); // Replace '/' with the route path of your AppComponent
        } else {
          // Email is valid but domain is not "fedex.com"
          console.log('Email is valid but domain is not "fedex.com"');
        }
      } else {
        // Email is not valid
        console.log('Email is not valid');
      }
    }
    onGoogleSignInk(googleUser: any) {
      console.log('Google user:');
    }

    onGoogleSignIn(googleUser: any) {
      console.log('Google user:');
      const profile = googleUser.getBasicProfile();
      const user = {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl()
      };
      console.log('User:', user);

      localStorage.setItem('user', JSON.stringify(user)); // Store user details in local storage
      // Redirect or perform further actions
    }
}
