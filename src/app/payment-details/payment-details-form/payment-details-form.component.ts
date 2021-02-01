import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent implements OnInit {

  constructor(public service: PaymentDetailService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.service.formData.paymentDetailId==0)
    this.InsertForm(form);
    else
    this.updatedata(form);
  }

  InsertForm(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      res =>{
        this.resetForm(form);
       this.service.refreshList();
        this.toastr.success('Submitted sucessfully','Payment Detail Registered');
      },
      err=>{
        console.log(err);
      }
      )
  }

  updatedata(form:NgForm)
  {
    this.service.putPaymentDetail().subscribe(
      res =>{
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated sucessfully','Payment Detail udpated');
      },
      err=>{
        console.log(err);
      }
      )
  }

  resetForm(form:NgForm)
  {
    form.form.reset();
    this.service.formData=new PaymentDetail();
  }

}
