import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormStep } from '../../assets/shared/form-step';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Country, State, City, CountriesService } from '../../assets/shared/countries.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';



const Step: FormStep[] = [
  new FormStep(1, 'Basic Details'),
  new FormStep(2, 'Second Step'),
  new FormStep(3, 'Third Step'),
  new FormStep(4, 'Final Step')
];

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit, OnDestroy {

  selectedValue: string;
  countryControlSubscription: Subscription;
  stateControlSubscription: Subscription;
  steps: FormStep[] = Step;
  currentStep: FormStep;
  countries: ReadonlyArray<Country>;
  states: ReadonlyArray<State>;
  cities: ReadonlyArray<City>;
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private countriesService: CountriesService, public dialog: MatDialog) {
    this.currentStep = this.steps[0];
    this.countries = this.countriesService.getCountries();
    this.states = [];
    this.cities = [];
    this.buildForm();
    this.initFormSubscriptions();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.countryControlSubscription) {
      this.countryControlSubscription.unsubscribe();
    }
    if (this.stateControlSubscription) {
      this.stateControlSubscription.unsubscribe();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogWindowComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.registrationForm.reset();
      }
    });
  }

  private buildForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[а-яёіїА-ЯЁІЇ]+')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('[а-яёіїА-ЯЁІЇ]+')]],
      // tslint:disable-next-line:max-line-length
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,4}'), Validators.maxLength(50)]],
      userId: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('[a-zA-Z_]+')]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^380\d{2} \d{3}-\d{2}-\d{2}$/)]],
      refCode: ['', Validators.pattern('[a-zA-Z0-9]{10}')]
    });
  }

  getFirstNameErrors() {
    return this.registrationForm.controls.firstName.hasError('minlength') ? 'Enter more than 1 characters' :
      this.registrationForm.controls.firstName.hasError('maxlength') ? 'Enter less than 50 characters' :
        this.registrationForm.controls.firstName.hasError('required') ? 'You must enter a value' :
          this.registrationForm.controls.firstName.hasError('pattern') ? 'Use Cyrillic' :
            '';
  }

  getLastNameErrors() {
    return this.registrationForm.controls.lastName.hasError('minlength') ? 'Enter more than 1 characters' :
      this.registrationForm.controls.lastName.hasError('maxlength') ? 'Enter less than 50 characters' :
        this.registrationForm.controls.lastName.hasError('required') ? 'You must enter a value' :
          this.registrationForm.controls.lastName.hasError('pattern') ? 'Use Cyrillic' :
            '';
  }

  getEmailErrors() {
    return this.registrationForm.controls.email.hasError('pattern') ? 'Not a valid email' :
      this.registrationForm.controls.email.hasError('maxlength') ? 'Enter less than 255 characters' :
        this.registrationForm.controls.email.hasError('required') ? 'You must enter a value' :

          '';
  }

  getUserIdErrors() {
    return this.registrationForm.controls.userId.hasError('minlength') ? 'Enter more than 5 characters' :
      this.registrationForm.controls.userId.hasError('maxlength') ? 'Enter less than 30 characters' :
        this.registrationForm.controls.userId.hasError('required') ? 'You must enter a value' :
          this.registrationForm.controls.userId.hasError('pattern') ? 'Use only Latin letters and "_"' :
            '';
  }

  getPhoneErrors() {
    return this.registrationForm.controls.phone.hasError('required') ? 'You must enter your phone number' :
      this.registrationForm.controls.phone.hasError('pattern') ? 'Not a valid number' :
        '';
  }

  getRefCodeErrors() {
    return this.registrationForm.controls.refCode.hasError('pattern') ? 'Enter 10 characters using Latin letters and numbers' :
      '';
  }

  private initFormSubscriptions() {
    this.countryControlSubscription = this.registrationForm.controls.country.valueChanges.subscribe((selectedCountry) => {
      console.log(selectedCountry);
      if (selectedCountry == null) {
        this.registrationForm.controls.state.setValue(null);
      } else {
        this.states = this.countriesService.getStates(selectedCountry);
        console.log(this.states);
      }
    });

    this.stateControlSubscription = this.registrationForm.controls.state.valueChanges.subscribe((selectedState) => {
      const countryId = this.registrationForm.controls.country.value;
      if (selectedState == null && countryId == null) {
        this.registrationForm.controls.city.setValue(null);
      } else {
        this.cities = this.countriesService.getCities(countryId, selectedState);
      }
    });
  }

  changeStep(param) {
    const index = this.steps.findIndex(step => step === this.currentStep);
    if (this.currentStep != null && this.currentStep !== undefined) {
      this.currentStep = this.steps[index + param];
    }
    if (param === -1 && index === 0) {
      this.currentStep = this.steps[0];
    }
    if (param === +1 && index === this.steps.length - 1) {
      this.currentStep = this.steps[this.steps.length - 1];
    }
  }
}

