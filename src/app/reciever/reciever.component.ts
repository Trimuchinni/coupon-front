import { Component, OnInit } from '@angular/core';
import { CouponServiceService } from '../coupon-service.service';
import { Coupon } from '../DTO/Coupon';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reciever',
  templateUrl: './reciever.component.html',
  styleUrls: ['./reciever.component.css']
})
export class RecieverComponent implements OnInit {

  constructor(private couponServiceService: CouponServiceService,private route: ActivatedRoute) { }


  coupons:Coupon[] = [];
  couponId: string = '';
  coupon: Coupon = {couponCode: '', couponDate: '', fedexId: '', status: ''};
  retrievedCoupon: Coupon = {couponCode: '', couponDate: '', fedexId: '', status: ''};
  ngOnInit(): void {
    this.couponServiceService.getReciever().subscribe(
      (response) => {
        console.log('Data received:', response);
        this.coupons = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    this.route.queryParams.subscribe(params => {
      this.couponId = params['couponId'];
      // Use this.couponId as needed
    });
  }

  refreshCoupons(){
    this.couponServiceService.getReciever().subscribe(
      (response) => {
        console.log('Data received:', response);
        this.coupons = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  handleButtonClick(coupon:Coupon) {
    console.log('Coupon clicked:', );
    this.couponServiceService.getCouponById(coupon).subscribe(
      (response) => {
        console.log('Data received:', response);
        this.retrievedCoupon = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
      
    if(this.retrievedCoupon.status != "Dead"){
    coupon.status = "Dead";
    this.coupon.status = "Dead";
    this.coupon.couponCode = coupon.couponCode;
    this.coupon.couponDate = coupon.couponDate;
    this.coupon.fedexId = this.couponId;
    
    this.couponServiceService.postCoupon(this.coupon).subscribe(
      (response) => {
        console.log('Data received:', response);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    }
  }

}
