import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { IncorpComponent } from './incorp/incorp.component';
import { IncorpClgComponent } from './incorp-clg/incorp-clg.component';
import { ClgFormsComponent } from './clg-forms/clg-forms.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ClgSignDocumentsComponent } from './clg-sign-documents/clg-sign-documents.component';
import { IncorpStatusComponent } from './incorp-status/incorp-status.component';
import { EntityProfileComponent } from './entity-profile/entity-profile.component';
import { AuditFormsComponent } from './audit-forms/audit-forms.component';
import { RegistrationCompleteComponent } from './registration-complete/registration-complete.component';
import { AuditCompleteComponent } from './audit-complete/audit-complete.component';
import { AuditPaymentComponent } from './audit-payment/audit-payment.component';
import { AuditPaymentPaidOffComponent } from './audit-payment-paid-off/audit-payment-paid-off.component';
import {EntityinfoSubmitComponent} from './entityinfo-submit/entityinfo-submit.component';
import {ClgIntroductionComponent} from './clg-introduction/clg-introduction.component';
import {LegalIntroductionComponent} from './legal-introduction/legal-introduction.component';
import {LegalCartComponent} from './legal-cart/legal-cart.component';
import {LegalCheckoutComponent} from './legal-checkout/legal-checkout.component';
import {LegalWhitepaperComponent} from './legal-whitepaper/legal-whitepaper.component';
import {LegalKycComponent} from './legal-kyc/legal-kyc.component';
import {LegalSuccessComponent} from './legal-success/legal-success.component';
import {RenewalIntroductionComponent} from './renewal-introduction/renewal-introduction.component';
import {RenewalCartComponent} from './renewal-cart/renewal-cart.component';
import {RenewalCheckoutComponent} from './renewal-checkout/renewal-checkout.component';
import {AnnualEntityinfoComponent} from './annual-entityinfo/annual-entityinfo.component';
import {RenewalDirResoComponent} from './renewal-dir-reso/renewal-dir-reso.component';
import {RenewalSignComponent} from './renewal-sign/renewal-sign.component';
import {RenewalSubmitBizfileComponent} from './renewal-submit-bizfile/renewal-submit-bizfile.component';
import {RenewalSuccessComponent} from './renewal-success/renewal-success.component';
import {PteSgIntroductionComponent} from './pte-sg-introduction/pte-sg-introduction.component';
import {PteSgCartComponent} from './pte-sg-cart/pte-sg-cart.component';
import {PteSgFormsComponent} from './pte-sg-forms/pte-sg-forms.component';
import {PteSgCheckoutComponent} from './pte-sg-checkout/pte-sg-checkout.component';
import {PteSgSignComponent} from './pte-sg-sign/pte-sg-sign.component';
import {PteSgStatusComponent} from './pte-sg-status/pte-sg-status.component';
import {PteSgSuccessComponent} from './pte-sg-success/pte-sg-success.component';
import {PteRegistrationSelectionComponent} from './pte-registration-selection/pte-registration-selection.component';
import {PteBviIntroductionComponent} from './pte-bvi-introduction/pte-bvi-introduction.component';
import {PteBviFormsComponent} from './pte-bvi-forms/pte-bvi-forms.component';
import {PteBviCartComponent} from './pte-bvi-cart/pte-bvi-cart.component';
import {PteBviCheckoutComponent} from './pte-bvi-checkout/pte-bvi-checkout.component';
import {PteBviSignComponent} from './pte-bvi-sign/pte-bvi-sign.component';
import {PteBviStatusComponent} from './pte-bvi-status/pte-bvi-status.component';
import {PteBviSuccessComponent} from './pte-bvi-success/pte-bvi-success.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'entityinfo', component: EntityinfoSubmitComponent },
  { path: 'annual-entityinfo', component: AnnualEntityinfoComponent },
  { path: 'plc-selection', component: PteRegistrationSelectionComponent },
  { path: 'order/:orderId/profile', component: EntityProfileComponent },
  {
    path: 'order',
    component: IncorpComponent,
    children: [
      {
        path: 'clg/:orderId',
        component: IncorpClgComponent,
        children: [
          {
            path: 'introduction',
            component: ClgIntroductionComponent
          },
          {
            path: 'form',
            component: ClgFormsComponent
          },
          {
            path: 'cart',
            component: CartComponent
          },
          {
            path: 'invoice',
            component: InvoiceComponent
          },
          {
            path: 'sign',
            component: ClgSignDocumentsComponent
          },
          {
            path: 'status',
            component: IncorpStatusComponent
          },
          {
            path: 'success',
            component: RegistrationCompleteComponent
          }
        ]
      },
      {
        path: 'audit/:orderId',
        component: IncorpClgComponent,
        children: [
          {
            path: 'form',
            component: AuditFormsComponent
          },
          {
            path: 'checkout-down',
            component: AuditPaymentComponent
          },
          {
            path: 'checkout-paid-off',
            component: AuditPaymentPaidOffComponent
          },
          {
            path: 'complete',
            component: AuditCompleteComponent
          }
        ]
      },
      {
        path: 'legal_arch/:orderId',
        component: IncorpClgComponent,
        children: [
          {
            path: 'introduction',
            component: LegalIntroductionComponent
          },
          {
            path: 'cart',
            component: LegalCartComponent
          },
          {
            path: 'checkout',
            component: LegalCheckoutComponent
          },
          {
            path: 'whitepaper',
            component: LegalWhitepaperComponent
          },
          {
            path: 'kyc',
            component: LegalKycComponent
          },
          {
            path: 'success',
            component: LegalSuccessComponent
          }
        ]
      },
      {
        path: 'annual_renewal/:orderId',
        component: IncorpClgComponent,
        children: [
          {
            path: 'introduction',
            component: RenewalIntroductionComponent
          },
          {
            path: 'cart',
            component: RenewalCartComponent
          },
          {
            path: 'checkout',
            component: RenewalCheckoutComponent
          },
          {
            path: 'sign_contract',
            component: RenewalSignComponent
          },
          {
            path: 'submit_bizfile',
            component: RenewalSubmitBizfileComponent
          },
          {
            path: 'sign_dir_reso',
            component: RenewalDirResoComponent
          },
          {
            path: 'success',
            component: RenewalSuccessComponent
          }
        ]
      },
      {
        path: 'plc_singapore/:orderId',
        component: IncorpClgComponent,
        children: [
          {
            path: 'introduction',
            component: PteSgIntroductionComponent
          },
          {
            path: 'form',
            component: PteSgFormsComponent
          },
          {
            path: 'cart',
            component: PteSgCartComponent
          },
          {
            path: 'invoice',
            component: PteSgCheckoutComponent
          },
          {
            path: 'sign',
            component: PteSgSignComponent
          },
          {
            path: 'status',
            component: PteSgStatusComponent
          },
          {
            path: 'success',
            component: PteSgSuccessComponent
          }
        ]
      },
      {
        path: 'plc_bvi/:orderId',
        component: IncorpClgComponent,
        children: [
          {
            path: 'introduction',
            component: PteBviIntroductionComponent
          },
          {
            path: 'form',
            component: PteBviFormsComponent
          },
          {
            path: 'cart',
            component: PteBviCartComponent
          },
          {
            path: 'invoice',
            component: PteBviCheckoutComponent
          },
          {
            path: 'sign',
            component: PteBviSignComponent
          },
          {
            path: 'status',
            component: PteBviStatusComponent
          },
          {
            path: 'success',
            component: PteBviSuccessComponent
          }
        ]
      },
    ]
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
