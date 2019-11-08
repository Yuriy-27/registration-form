import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { MatFormFieldModule, MatInputModule} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ToUpperCaseDirective } from './registration-form/upperCase.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogWindowComponent } from './dialog-window/dialog-window.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    ToUpperCaseDirective,
    DialogWindowComponent
  ],
  entryComponents: [DialogWindowComponent],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
