import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; 
import { Coupon } from './DTO/Coupon';


@Injectable({
  providedIn: 'root'
})
export class CouponServiceService {

  constructor(private httpService:HttpClient) { }

  params = new HttpParams()
    .set('date', this.formatDate(new Date()));
    

  formatDate(date: Date): string {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
  
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
  getReciever(){
    return this.httpService.get<Coupon[]>("http://localhost:8181/coupon",{params:this.params}).pipe(
      map((response: Coupon[]) => {
        return response.map(item => ({ couponCode: item.couponCode, fedexId: item.fedexId, status: item.status, couponDate: item.couponDate}));
      })
    );
  }

  postCoupon(coupon:Coupon){
    return this.httpService.post("http://localhost:8181/coupon",coupon, { responseType: 'text' });
  }

  getCouponById(coupon:Coupon)
  {
    return this.httpService.get<Coupon>("http://localhost:8181/couponId",{params:new HttpParams().set('couponCode',coupon.couponCode)});
  }

}
