import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatStepperModule, MatRadioModule,
  MatCardModule, MatButtonModule, MatInputModule, MatNativeDateModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { InputFileComponent } from './input-file/input-file.component';
import { ByteFormatPipe } from './byte-format.pipe';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { JwtModule } from '@auth0/angular-jwt';
import { OrderService } from './order.service';
import { OrdersComponent } from './orders/orders.component';
import { IncorpComponent } from './incorp/incorp.component';
import { IncorpClgComponent } from './incorp-clg/incorp-clg.component';
import { ClgFormsComponent } from './clg-forms/clg-forms.component';
import { AddDirectorDialogComponent } from './add-director-dialog/add-director-dialog.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ClgSignDocumentsComponent } from './clg-sign-documents/clg-sign-documents.component';
import { IncorpStatusComponent } from './incorp-status/incorp-status.component';
import { EntityProfileComponent } from './entity-profile/entity-profile.component';
import { NgUploaderModule } from 'ngx-uploader';
import { PaymentComponent } from './payment/payment.component';
import { AuditFormsComponent } from './audit-forms/audit-forms.component';
import { RegistrationCompleteComponent } from './registration-complete/registration-complete.component';
import { AuditCompleteComponent } from './audit-complete/audit-complete.component';
import { AuditPaymentComponent } from './audit-payment/audit-payment.component';
import {IncorpStepperService} from './incorp-stepper.service';
import {MatMenuModule} from '@angular/material/menu';
import { AuditPaymentPaidOffComponent } from './audit-payment-paid-off/audit-payment-paid-off.component';
import { EntityinfoSubmitComponent } from './entityinfo-submit/entityinfo-submit.component';
import { ClgIntroductionComponent } from './clg-introduction/clg-introduction.component';
import { DirectorDocumentsFormComponent } from './director-documents-form/director-documents-form.component';
import {MatSliderModule} from '@angular/material/slider';
import {LegalIntroductionComponent} from './legal-introduction/legal-introduction.component';
import { LegalCartComponent } from './legal-cart/legal-cart.component';
import { LegalCheckoutComponent } from './legal-checkout/legal-checkout.component';
import { LegalWhitepaperComponent } from './legal-whitepaper/legal-whitepaper.component';
import { LegalKycComponent } from './legal-kyc/legal-kyc.component';
import { LegalSuccessComponent } from './legal-success/legal-success.component';
import {MatTableModule} from '@angular/material';
import { RenewalIntroductionComponent } from './renewal-introduction/renewal-introduction.component';
import { RenewalCartComponent } from './renewal-cart/renewal-cart.component';
import { RenewalCheckoutComponent } from './renewal-checkout/renewal-checkout.component';
import { AnnualEntityinfoComponent } from './annual-entityinfo/annual-entityinfo.component';
import { RenewalSignComponent } from './renewal-sign/renewal-sign.component';
import { RenewalSubmitBizfileComponent } from './renewal-submit-bizfile/renewal-submit-bizfile.component';
import { RenewalDirResoComponent } from './renewal-dir-reso/renewal-dir-reso.component';
import { RenewalSuccessComponent } from './renewal-success/renewal-success.component';
import { EditDirectorComponent } from './edit-director/edit-director.component';
import { PteSgIntroductionComponent } from './pte-sg-introduction/pte-sg-introduction.component';
import { PteSgFormsComponent } from './pte-sg-forms/pte-sg-forms.component';
import { PteSgCartComponent } from './pte-sg-cart/pte-sg-cart.component';
import { PteSgCheckoutComponent } from './pte-sg-checkout/pte-sg-checkout.component';
import { PteSgSignComponent } from './pte-sg-sign/pte-sg-sign.component';
import { PteSgStatusComponent } from './pte-sg-status/pte-sg-status.component';
import { PteSgSuccessComponent } from './pte-sg-success/pte-sg-success.component';
import { PteRegistrationSelectionComponent } from './pte-registration-selection/pte-registration-selection.component';
import { AddPteMemberDialogComponent } from './add-pte-member-dialog/add-pte-member-dialog.component';
import {IncorpService} from './incorp.service';
import { PteMembersFormsComponent } from './pte-members-forms/pte-members-forms.component';
import { PteBviIntroductionComponent } from './pte-bvi-introduction/pte-bvi-introduction.component';
import { PteBviFormsComponent } from './pte-bvi-forms/pte-bvi-forms.component';
import { PteBviCartComponent } from './pte-bvi-cart/pte-bvi-cart.component';
import { PteBviCheckoutComponent } from './pte-bvi-checkout/pte-bvi-checkout.component';
import { PteBviSignComponent } from './pte-bvi-sign/pte-bvi-sign.component';
import { PteBviStatusComponent } from './pte-bvi-status/pte-bvi-status.component';
import { PteBviSuccessComponent } from './pte-bvi-success/pte-bvi-success.component';
import { PteBviMembersFormsComponent } from './pte-bvi-members-forms/pte-bvi-members-forms.component';
import { AddBviMenberDialogComponent } from './add-bvi-menber-dialog/add-bvi-menber-dialog.component';

export function getToken() {
  return localStorage.getItem('access_token');
}



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    CartComponent,
    InputFileComponent,
    ByteFormatPipe,
    LoginComponent,
    SignupComponent,
    OrdersComponent,
    IncorpComponent,
    IncorpClgComponent,
    ClgFormsComponent,
    AddDirectorDialogComponent,
    InvoiceComponent,
    ClgSignDocumentsComponent,
    IncorpStatusComponent,
    EntityProfileComponent,
    PaymentComponent,
    AuditFormsComponent,
    RegistrationCompleteComponent,
    AuditCompleteComponent,
    AuditPaymentComponent,
    AuditPaymentPaidOffComponent,
    EntityinfoSubmitComponent,
    ClgIntroductionComponent,
    DirectorDocumentsFormComponent,
    LegalIntroductionComponent,
    LegalCartComponent,
    LegalCheckoutComponent,
    LegalWhitepaperComponent,
    LegalKycComponent,
    LegalSuccessComponent,
    RenewalIntroductionComponent,
    RenewalCartComponent,
    RenewalCheckoutComponent,
    AnnualEntityinfoComponent,
    RenewalSignComponent,
    RenewalSubmitBizfileComponent,
    RenewalDirResoComponent,
    RenewalSuccessComponent,
    EditDirectorComponent,
    PteSgIntroductionComponent,
    PteSgFormsComponent,
    PteSgCartComponent,
    PteSgCheckoutComponent,
    PteSgSignComponent,
    PteSgStatusComponent,
    PteSgSuccessComponent,
    PteRegistrationSelectionComponent,
    AddPteMemberDialogComponent,
    PteMembersFormsComponent,
    PteBviIntroductionComponent,
    PteBviFormsComponent,
    PteBviCartComponent,
    PteBviCheckoutComponent,
    PteBviSignComponent,
    PteBviStatusComponent,
    PteBviSuccessComponent,
    PteBviMembersFormsComponent,
    AddBviMenberDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatStepperModule,
    NgUploaderModule,
    MatMenuModule,
    MatSliderModule,
    MatTableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:5000', 'api-stg.satori.works', 'api.satori.works' ]
      }
    })
  ],
  providers: [
    AuthService,
    OrderService,
    IncorpStepperService,
    IncorpService
  ],
  entryComponents: [
    AddDirectorDialogComponent,
    AddPteMemberDialogComponent,
    AddBviMenberDialogComponent,
    PaymentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
