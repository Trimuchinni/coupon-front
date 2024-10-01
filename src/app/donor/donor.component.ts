import { Component, OnInit } from '@angular/core';
import { CouponServiceService } from '../coupon-service.service';
import { Coupon } from '../DTO/Coupon';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication-service.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']

})
export class DonorComponent implements OnInit {

  constructor(private couponServiceService: CouponServiceService,private route: ActivatedRoute,private auth:AuthenticationService) { }
  couponCode: string = '';
  couponDate: string = '';
  couponId: string = '';
  buttonClicked: boolean = false;
  submittedTetx:string = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.couponId = params['couponId'];
      // Use this.couponId as needed
    });
    if(this.couponId != ''){
      this.auth.setAuthenticatedUser(true);
    }
    else
    {
      this.auth.setAuthenticatedUser(false);
    }
  }
  formatDate(event: Event) {
    const selectedDate = new Date((event.target as HTMLInputElement).value);
    if (!isNaN(selectedDate.getTime())) { // Check if valid date
      this.couponDate = selectedDate.toISOString().slice(0, 10);
      // console.log('Formatted Date:', this.couponDate.toISOString().slice(0, 10)); // Output formatted date
    } else {
      console.error('Invalid date selected');
    }
  }

  coupon: Coupon = {couponCode: '', couponDate: '', fedexId: '', status: ''};  
 

  postCoupon() {
    if(this.couponCode != '' && this.couponDate != ''){
      this.coupon.couponCode = this.couponCode;
      this.coupon.couponDate = this.couponDate;
      this.coupon.fedexId = this.couponId;
      console.log(this.couponId);
      this.coupon.status = "Active";


      this.couponServiceService.postCoupon(this.coupon).subscribe(
        (response) => {
          console.log('Data received:', response);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
      this.buttonClicked = true;
      this.submittedTetx = 'Coupon submitted successfully';
      this.couponCode='';
    }
    else{
      this.buttonClicked = true;
      this.submittedTetx = 'Please enter valid coupon code and date';
    }
  }
}
