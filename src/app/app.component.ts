import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  couponId: string='';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   this.couponId = params['couponId'];
    //   console.log('Data received:', this.couponId);
    //   // Use this.couponId as needed
    // });
  }
}
