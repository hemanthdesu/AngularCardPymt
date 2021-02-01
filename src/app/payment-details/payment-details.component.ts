import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService,public toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(SelectRecord:PaymentDetail)
  {
    this.service.formData=Object.assign({},SelectRecord);
  }

  onDelete(id:number)
  {
    if(confirm("Are you sure you want to delete")){
    this.service.DeletePaymentDetail(id)
    .subscribe(
      res=>{
          this.service.refreshList();
          this.toastr.error('Deleted sucessfully','Payment Detail Deleted');
      },
      err=>{
          console.log(err);
      }
    )
  }
}
}
