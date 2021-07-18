---
templateKey: blog-post
title: Angular - Reactive forms.
date: 2021-07-18T13:21:17.243Z
description: Wpis skupia się na jednej z popularnych metod implementacji
  formularzy w aplikacjach tworzonych za pomocą framework-a Angular - Reactive
  forms.
featuredpost: true
featuredimage: /img/blog-2021.06.12-00.png
tags:
  - programowanie
  - frontend
  - angular
  - reactive forms
  - angular materials
  - formularz
---
![Angular - Reactive forms](/img/blog-2021.06.12-00.png)

Formularze stanowią znaczącą część wielu aplikacji internetowych. W zależności od projektu nad którym pracujemy stopień ich skomplikowania może się różnić. W projektach wymagających tworzenia formularzy posiadających bardziej złożoną logikę biznesową i walidacje warto rozważyć zastosowanie rozwiązań ułatwiającego to zadane. Przykładem takiego narzędzia dla fremework'a Angular są Reactive forms. Jest to rozwiązanie pozwalające implementację formularzy sterowanych modelami (model-driven). Są one dobrym wyborem w przypadku tworzenia bardziej skomplikowanych struktur. Alternatywą dla tego podejścia są formularze oparte na szablonie html (template-driven) jest to rozwiązanie znacznie prostsze pozwalające na szybkie tworzenie niewielkich formularzy. Jest to jednak podejście odgraniczone w stosunku do Reactive forms.

Reactive forms bazują na czterech kluczowych elementach:

* FormControl
* FormGroup
* FormArray

Struktura, wartości i walidacje poszczególnych elementów wchodzących w skład formularza mogą być dynamicznie modyfikowane i walidowane. W ramach przykładu postanowiłem przygotować formularz zamówienia burgera. Powinien on spełniać następujące wymagania:

* Pozwala wybrać rodzaj bułki.
* Pozwala wybrać od jednego do trzech kotletów (dla opcji mięsnych można osobno wybrać stopień wysmażenia).
* Pozwala wybrać od zera do pięciu dodatków z możliwością wskazania.
* Wszystkie pola muszą być wypełnione przed przesłaniem formularza.

W celu stworzenia formularza wygenerowałem nowy projekt o nazwie `burger-order-form` przy pomocy Angular CLI:

#### **`terminal`**

```shell
ng new burger-order-form
```

W ramach tego projektu zdecydowałem się skorzystać z biblioteki komponentów [Angular Material](https://material.angular.io/). Pozwoli to znacząco oszczędzić czas potrzebny na przygotowywanie elementów UI i zapewnić spójność.

#### **`terminal`**

```shell
ng add @angular/material
```

Po zainstalowania biblioteki Angular Material przygotowałem folder na współdzielony kod (co prawda w przypadku tej aplikacji trudno będzie mówić o współdzieleniu, gdyż będzie składął się ona z jednego formularza). W folderze wygenerowałem moduł `material` odpowiedzialny za import poszczególnych modułów biblioteki i udostępnianie ich innym modułom aplikacji.

#### **`terminal`**

```shell
cd src\app
mkdir shared
cd shared
ng g m material --flat
```

Na początku z poziomu modułu `MaterialModule` zaimportowałem moduł `Material card` i wyeksportowałem go. Importu elementów biblioteki można było dokonać z poziomu głównego modułu aplikacji `AppModule`, jednak taka organizacja importów może okazać się wygodniejsza w przypadku dalszego rozwijania tego projektu. Na chwile obecną moduł `MaterialModule` wygląda następująco:

#### **`src\app\shared\material.module.ts`**

```typescript
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";

const materialModules = [MatCardModule];

@NgModule({
  declarations: [],
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MaterialModule {}
```

Jest on importowany przez moduł `AppModule`.

#### **`src\app\app.module.ts`**

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./shared/material.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Dzięki temu z poziomu komponentów należących do modułu `AppModule` można korzystać z zaimportowanych elementów biblioteki Angular Material (na razie jest to jedynie Material card, później będę dodawał tu inne importy). Wstępnie przygotowałem układ strony z kartą, która będzie docelowo zawierała formularz, oraz tłem pasującym do tematu. Jako tło wykorzystałem zdjęcie autorstwa [Jonathan'a Borba](https://unsplash.com/@jonathanborba) z portalu [Unsplash](https://unsplash.com/s/photos/fast-food).

#### **`src\app\app.component.html`**

```html
<div id="page-container">
  <div id="form-container">
    <mat-card class="semi-transparent-bg">
      <mat-card-header>
        <mat-card-title>Place your order</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div>[FORM GOES HERE!]</div>
      </mat-card-content>
    </mat-card>
  </div>

  <mat-card id="contribution" class="semi-transparent-bg">
    Photo by
    <a
      href="https://unsplash.com/@jonathanborba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      >Jonathan Borba</a
    >
    on
    <a
      href="https://unsplash.com/s/photos/fast-food?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      >Unsplash</a
    >
  </mat-card>
</div>
```

#### **`src\app\app.component.css`**

```css
#page-container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  background-image: url("../assets/jonathan-borba-8l8Yl2ruUsg-unsplash.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#form-container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#contribution {
  align-self: flex-end;
}

.semi-transparent-bg {
  background-color: rgba(255, 255, 255, 0.75);
}
```

Pozwoliło uzyskać to taki rezultat:

![Układ strony](/img/blog-2021.06.12-01.jpg)

Po wstępnym przygotowaniu szablonu strony można przejść do implementacji samego formularza. W tym celu wygenerowałem nowy komponent formularza:

#### **`terminal`**

```shell
cd src\app
mkdir components
cd components
ng g c burger-form
```

Podczas przygotowywania wstępnego widoku formularza korzystałem z kolejnych komponentów Angular Material, w związku z czym w module `MaterialModule` dodałem dodatkowe moduły (`MatButtonModule`, `MatListModule` `MatDividerModule`, `MatIconModule`). Przy pomocy zaimportowanych komponentów przygotowałem wstępny szablon formularza:

#### **`src\app\burger-form.component.html`**

```html
<mat-list>
  <!-- BUN -->
  <div mat-subheader>Bun</div>
  <div>[FORM CONTROLS GOES HERE!]</div>
  <!-- BURGERS -->
  <mat-divider></mat-divider>
  <div mat-subheader>
    Burgers
    <button mat-icon-button color="primary">
      <mat-icon>add</mat-icon>
    </button>
  </div>
  <div>[FORM CONTROLS GOES HERE!]</div>
  <!-- TOPPINGS -->
  <mat-divider></mat-divider>
  <div mat-subheader>
    Toppings
    <button mat-icon-button color="primary">
      <mat-icon>add</mat-icon>
    </button>
  </div>
  <div>[FORM CONTROLS GOES HERE!]</div>
</mat-list>
<button id="submit-btn" mat-raised-button color="primary">Submit</button>
```

#### **`src\app\burger-form.component.css`**

```css
#submit-btn {
  margin-top: 20px;
  width: 100%;
}
```

Tak przygotowanym komponent osadziłem w pliku `src\app\burger-form.component.html`

#### **`src\app\app.component.html`**

```html
<div id="page-container">
  <div id="form-container">
    <mat-card class="semi-transparent-bg">
      <mat-card-header>
        <mat-card-title>Place your order</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-burger-form></app-burger-form>
      </mat-card-content>
    </mat-card>
  </div>

  <mat-card id="contribution" class="semi-transparent-bg">
    Photo by
    <a
      href="https://unsplash.com/@jonathanborba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      >Jonathan Borba</a
    >
    on
    <a
      href="https://unsplash.com/s/photos/fast-food?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      >Unsplash</a
    >
  </mat-card>
</div>
```

Na tym etapie rezultat wyglądał tak:

![Układ formularza](/img/blog-2021.06.12-02.jpg)

Każda z sekcji formularza będzie bazowała na kontrolkach pozwalających na wybór opcji z pre-definiowanej listy:

* Typ bułki
* Typ kotleta i stopień wyszarzenia
* Dodatek

Sekcja dotyczące kotletów i dodatków będą posiadały możliwość dostosowania liczby występującej w nich kontrolek. W celu implementacji takiego mechanizmu można skorzystać z biblioteki `Reactive Forms`. Pozwala ona na wygodne tworzenie interaktywnych formularzy.

W celu skorzystania z mechanizmów dostępnych w ramach `Reactive Forms` należy zaimportować w nim moduł `ReactiveFormsModule`. Dzięki temu w modelu komponentu można zadeklarować strukturę formularza i obsłużyć jego dynamiczna modyfikację i walidację. Ostatecznie komponent formularza prezentował się w ten sposób:

#### **`src\app\burger-form.component.html`**

```html
<mat-list id="order-form" [formGroup]="orderForm">
  <!-- BUN -->
  <div mat-subheader><p class="section-header">Bun</p></div>
  <div class="form-row">
    <app-custom-select-control
      class="form-control"
      formControlName="bunType"
      label="Select bun type"
      [selectableOptions]="burgerFormConfiguration.bunOptions"
    ></app-custom-select-control>
  </div>

  <!-- BURGERS -->
  <div [ngClass]="{ 'error-section': burgersArrayErrorMsg }" mat-subheader>
    <p class="section-header">Burgers</p>
    <button mat-icon-button color="primary" (click)="addBurger()">
      <mat-icon>add_circle</mat-icon>
    </button>
    <p class="error-message">{{ burgersArrayErrorMsg }}</p>
  </div>
  <div formArrayName="burgers">
    <div *ngFor="let burger of burgerControls; let index = index">
      <div class="form-row" [formGroupName]="index">
        <app-custom-select-control
          class="form-control"
          formControlName="type"
          label="Select burger type"
          [selectableOptions]="burgerFormConfiguration.burgerTypeOptions"
        ></app-custom-select-control>
        <app-custom-select-control
          class="form-control"
          [ngClass]="{ hidden: burger.controls.degreeOfDoneness.disabled }"
          formControlName="degreeOfDoneness"
          label="Select degree of doneness"
          [selectableOptions]="
            burgerFormConfiguration.burgerDegreeOfDonenessOptions
          "
        ></app-custom-select-control>
        <button
          class="delete-button"
          mat-icon-button
          color="warn"
          (click)="deleteBurger(index)"
        >
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </div>
  </div>

  <!-- TOPPINGS -->
  <div [ngClass]="{ 'error-section': toppingsArrayErrorMsg }" mat-subheader>
    <p class="section-header">Toppings</p>
    <button mat-icon-button color="primary" (click)="addTopping()">
      <mat-icon>add_circle</mat-icon>
    </button>
    <p class="error-message">{{ toppingsArrayErrorMsg }}</p>
  </div>
  <div formArrayName="toppings">
    <div *ngFor="let topping of toppingControls; let index = index">
      <div class="form-row">
        <!-- <input class="form-control" [formControlName]="index" /> -->
        <app-custom-select-control
          class="form-control"
          [formControlName]="index"
          label="Select topping"
          [selectableOptions]="burgerFormConfiguration.toppingOptions"
        ></app-custom-select-control>
        <button
          class="delete-button"
          mat-icon-button
          color="warn"
          (click)="deleteTopping(index)"
        >
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </div>
  </div>
  <!-- SUBMIT -->
  <button
    id="submit-btn"
    mat-raised-button
    color="primary"
    (click)="submitForm()"
  >
    Submit
  </button>
  <div *ngIf="isSendingForm" class="spinner-overlay">
    <mat-spinner color="primary"></mat-spinner>
  </div>
</mat-list>
```

#### **`src\app\burger-form.component.css`**

```css
.section-header {
  font-size: 16px;
}

.form-row {
  height: 60px;
  width: 480px;
  display: flex;
}

.form-control {
  flex: auto;
}

.error-section {
  background-color: rgba(255, 0, 0, 0.1);
  border-radius: 5px;
}

.error-message {
  color: #ff0000;
  margin-left: auto;
}

.hidden {
  opacity: 0;
}

.delete-button {
  align-self: center;
}

#submit-btn {
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
}

.spinner-overlay {
  background-color: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### **`src\app\components\burger-form\burger-form.component.ts`**

```typescript
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import {
  BurgerFormConfiguration,
  loadDefaultBurgerFormConfiguration,
} from "src/app/data/burger-form-configuration";
import { BurgerType } from "src/app/data/burger-type.enum";
import { CustomValidators } from "src/app/shared/custom-validators";

@Component({
  selector: "app-burger-form",
  templateUrl: "./burger-form.component.html",
  styleUrls: ["./burger-form.component.css"],
})
export class BurgerFormComponent implements OnInit {
  burgerFormConfiguration: BurgerFormConfiguration;
  orderForm: FormGroup;
  isSendingForm = false;

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
    this.burgerFormConfiguration = loadDefaultBurgerFormConfiguration();
  }

  private initializeForm(): void {
    this.orderForm = new FormGroup({
      bunType: new FormControl(null, Validators.required),
      burgers: new FormArray(
        [],
        [CustomValidators.minLengthArray(1), CustomValidators.maxLengthArray(3)]
      ),
      toppings: new FormArray(
        [],
        [CustomValidators.minLengthArray(1), CustomValidators.maxLengthArray(5)]
      ),
    });

    this.addBurger();
    this.addTopping();
  }

  // BURGERS SECTION
  get burgerControls(): AbstractControl[] {
    return this.burgerArray.controls;
  }

  private get burgerArray(): FormArray {
    return this.orderForm.controls.burgers as FormArray;
  }

  addBurger(): void {
    const newBurgersGroup = this.createBurgersGroup();
    const newBurgersGroupControls = newBurgersGroup.controls;

    newBurgersGroupControls.type.valueChanges.subscribe((value: any) => {
      this.handleBurgerTypeValueChange(
        value,
        newBurgersGroupControls.degreeOfDoneness
      );
    });

    (this.burgerArray as FormArray).controls.push(newBurgersGroup);
    this.burgerArray.updateValueAndValidity();
  }

  private createBurgersGroup(): FormGroup {
    return new FormGroup({
      type: new FormControl(null, Validators.required),
      degreeOfDoneness: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
    });
  }

  private handleBurgerTypeValueChange(
    newValue: BurgerType,
    degreeOfDonenessControl: AbstractControl
  ): void {
    const meatOptions = [BurgerType.BEEF, BurgerType.BEEF_ANGUS];
    if (meatOptions.includes(newValue)) {
      degreeOfDonenessControl.enable();
    } else {
      degreeOfDonenessControl.setValue(null);
      degreeOfDonenessControl.disable();
    }
  }

  deleteBurger(index: number): void {
    this.burgerControls.splice(index, 1);
    this.burgerArray.updateValueAndValidity();
  }

  // TOPPINGS SECTION
  get toppingControls(): AbstractControl[] {
    return this.toppingArray.controls;
  }

  private get toppingArray(): FormArray {
    return this.orderForm.controls.toppings as FormArray;
  }

  addTopping(): void {
    const topping = this.createToppingControl();
    this.toppingControls.push(topping);
    this.toppingArray.updateValueAndValidity();
  }

  private createToppingControl(): FormControl {
    return new FormControl(null, Validators.required);
  }

  deleteTopping(index: number): void {
    this.toppingControls.splice(index, 1);
    this.toppingArray.updateValueAndValidity();
  }

  // ERRORS
  get burgersArrayErrorMsg(): string | null {
    const errors = this.burgerArray.errors;
    return this.arrayErrorMsg(errors);
  }

  get toppingsArrayErrorMsg(): string | null {
    const errors = this.toppingArray.errors;
    return this.arrayErrorMsg(errors);
  }

  private arrayErrorMsg(errors: ValidationErrors): string | null {
    const minLengthError = errors?.minLengthArray;
    if (minLengthError) {
      return `Please choose at least ${minLengthError} position.`;
    }

    const maxLengthError = errors?.maxLengthArray;
    if (maxLengthError) {
      return `Please choose at most ${maxLengthError} positions.`;
    }

    return null;
  }

  // SUBMIT
  submitForm(): void {
    this.burgerArray.updateValueAndValidity();
    this.toppingArray.updateValueAndValidity();

    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.isSendingForm = true;
    console.log(this.orderForm.value);
  }
}
```

Podczas inicjalizacji (metoda `ngOnInit()`) komponentu wykonywane są dwie ważne akcje:

* Definicja struktury danych formularza - na tym etapie definiowany jest obiekt nadrzędny typu `FormGroup` o nazwie `orderForm`. Jego reprezentacją w szablonie html będzie element z atrybutem `[formGroup]="orderForm"`. W jego wnętrzu znajdują się trzy obiekty:

  * `bunType` - typu `FormControl`. Obiekt odpowiedzialny za reprezentacje fragmentu modelu danych formularza dotyczących wyboru typu bułki. Podczas definicji podawana jest jago początkowa wartości `null` i walidator `Validators.required`. Jego reprezentacją w szablonie html będzie element z atrybutem `formControlName="bunType"`.
  * `burgers` - typu `FormArray`. Obiekt odpowiedzialny za reprezentację fragmentu modelu danych formularza dotyczącego wyboru listy kotletów. Podczas definicji podawana jest jago początkowa wartości `[]` (później zawartość tej listy będzie modyfikowana przez metody `addBurger()` i `deleteBurger()`). Wewnątrz tej listy będą znajdowały się obiekty typu `FormGroup` z kontrolkami (`FormControl`) o nazwach `type` i `degreeOfDoneness`. Długość listy elementów zawartych w tym obiekcie jest walidowana przez walidatory `CustomValidators.minLengthArray(1)` i `CustomValidators.maxLengthArray(3)` umieszczone w pliku `src\app\shared\custom-validators.ts`. Reprezentacją tej listy w szablonie html jest element z atrybutem `formArrayName="burgers"`, każda kolejna grupa kontrolek to zagnieżdżony w nim element element z atrybutem `[formGroupName]="index"`, a poszczególne kontrolki to dalej zagnieżdżone elementy z atrybutami `formControlName="type"` i `formControlName="degreeOfDoneness"`.
  * `toppings` - typu `FormArray`. Obiekt odpowiedzialny za reprezentację fragmentu modelu danych formularza dotyczącego wyboru listy dodatków. Podczas definicji podawana jest jago początkowa wartości `[]` (później zawartość tej listy będzie modyfikowana przez metody `addTopping()` i `deleteTopping`). Wewnątrz tej listy będą znajdowały sie kontrolki (`FormControl`). Długość listy elementów zawartych w tym obiekcie jest walidowana przez walidatory `CustomValidators.minLengthArray(1)` i `CustomValidators.maxLengthArray(5)`.Reprezentacją tej listy w szablonie html jest element z atrybutem `formArrayName="toppings"`, każda kontrolka to zagnieżdżony w nim element z atrybutem `[formControlName]="index"`.
* Definicja opcji wyboru dla poszczególnych kontrolek - jest to krok zapewniający przeniesienie konfiguracji opcji wyboru poszczególnych kontrolek poza komponent samego formularza. Całą konfiguracja wykonywana jest w pliku `src\app\data\burger-form-configuration.ts` przechorowującym strukturę danych, builder ułatwiający jej konstruowanie i funkcję tworzącą domyślną konfigurację.

Walidatory zdefiniowane na potrzeby sprawdzania liczby wybranych kotletów i dodatków są funkcjami wyższego rzędu (higher order functions) zwracającymi już sparametryzowane funkcje walcujące:

#### **`src\app\shared\custom-validators.ts`**

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  static minLengthArray(min: number): ValidatorFn | null {
    return (c: AbstractControl): ValidationErrors => {
      if (c.value.length >= min) {
        return null;
      }
      return { minLengthArray: min };
    };
  }

  static maxLengthArray(max: number): ValidatorFn | null {
    return (c: AbstractControl): ValidationErrors => {
      if (c.value.length <= max) {
        return null;
      }
      return { maxLengthArray: max };
    };
  }
}
```

Dane możliwe do wyboru w ramach kontrolek formularza definiowane są w klasie `BurgerFormConfiguration`. Obiekt konfiguracji tworzony jest przy pomocy budowniczego `BurgerFormConfigurationBuilder`, a sama definicja opcji wyboru poszczególnych kontrolek tworzona jest w funkcji `loadDefaultBurgerFormConfiguration()`:

```typescript
import { BunType } from "./bun-type.enum";
import { BurgerType } from "./burger-type.enum";
import { DegreeOfDoneness } from "./degree-of-doneness.enum";
import { SelectableOption } from "./selectable-option";
import { ToppingType } from "./topping-type.enum";

export class BurgerFormConfiguration {
  bunOptions: Array<SelectableOption>;
  burgerTypeOptions: Array<SelectableOption>;
  burgerDegreeOfDonenessOptions: Array<SelectableOption>;
  toppingOptions: Array<SelectableOption>;
}

export class BurgerFormConfigurationBuilder {
  private configuration: BurgerFormConfiguration;

  static new(): BurgerFormConfigurationBuilder {
    return new BurgerFormConfigurationBuilder();
  }

  private constructor() {
    this.configuration = new BurgerFormConfiguration();
  }

  public setBunOptions(
    bunOptions: Array<SelectableOption>
  ): BurgerFormConfigurationBuilder {
    this.configuration.bunOptions = bunOptions;
    return this;
  }

  public setBurgerTypeOptions(
    burgerTypeOptions: Array<SelectableOption>
  ): BurgerFormConfigurationBuilder {
    this.configuration.burgerTypeOptions = burgerTypeOptions;
    return this;
  }

  public setBurgerDegreeOfDonenessOptions(
    burgerDegreeOfDonenessOptions: Array<SelectableOption>
  ): BurgerFormConfigurationBuilder {
    this.configuration.burgerDegreeOfDonenessOptions =
      burgerDegreeOfDonenessOptions;
    return this;
  }

  public setToppingOptions(
    toppingOptions: Array<SelectableOption>
  ): BurgerFormConfigurationBuilder {
    this.configuration.toppingOptions = toppingOptions;
    return this;
  }

  public build(): BurgerFormConfiguration {
    this.validate();
    return this.configuration;
  }

  private validate(): void {
    if (!this.configuration.bunOptions) {
      throw new Error("Bun options are required!");
    }
    if (!this.configuration.burgerTypeOptions) {
      throw new Error("Burger type options are required!");
    }
    if (!this.configuration.burgerDegreeOfDonenessOptions) {
      throw new Error("Burger degree of doneness options are required!");
    }
    if (!this.configuration.toppingOptions) {
      throw new Error("Topping options are required!");
    }
  }
}

export function loadDefaultBurgerFormConfiguration(): BurgerFormConfiguration {
  const bunTypeOptions = [
    SelectableOption.of(BunType.PLAIN, "Plain"),
    SelectableOption.of(BunType.SESAME_SEED, "Sesame seed"),
    SelectableOption.of(BunType.POTATO, "Potato"),
  ];

  const burgerTypeOptions = [
    SelectableOption.of(BurgerType.BEEF, "Beef"),
    SelectableOption.of(BurgerType.BEEF_ANGUS, "Beef angus"),
    SelectableOption.of(BurgerType.VEGGIE, "Veggie"),
  ];

  const burgerDegreeOfDonenessOptions = [
    SelectableOption.of(DegreeOfDoneness.RARE, "Rare"),
    SelectableOption.of(DegreeOfDoneness.MEDIUM_RARE, "Medium rare"),
    SelectableOption.of(DegreeOfDoneness.MEDIUM, "Medium"),
    SelectableOption.of(DegreeOfDoneness.MEDIUM_WELL, "Medium well"),
    SelectableOption.of(DegreeOfDoneness.WELL, "Well"),
  ];

  const toppingOptions = [
    SelectableOption.of(ToppingType.BACON, "Bacon"),
    SelectableOption.of(ToppingType.CHEDDAR, "Cheddar"),
    SelectableOption.of(ToppingType.BBQ, "BBQ"),
    SelectableOption.of(ToppingType.JALAPENO, "Jalapeno"),
    SelectableOption.of(ToppingType.CARAMELIZED_ONION, "Caramelized onion"),
    SelectableOption.of(ToppingType.HUMMUS, "Hummus"),
  ];

  return BurgerFormConfigurationBuilder.new()
    .setBunOptions(bunTypeOptions)
    .setBurgerTypeOptions(burgerTypeOptions)
    .setBurgerDegreeOfDonenessOptions(burgerDegreeOfDonenessOptions)
    .setToppingOptions(toppingOptions)
    .build();
}
```

W ramach formularza występuje jeden typ kontrolki - select. Został on wydzielony do osobnego komponentu w celu uniknięcia powtórzeń w szablonie. Spowodowało to jednak pewną komplikacje utrudniająca korzystanie z mechanizmu `Reactive Forms`, który wymaga odpowiedniego oznaczania input-u w celu wiązania jego wartości z modelem danych (atrybuty `formGroup="name"`/`formArray="name"`/`formControl="name"`). Po przeniesieniu kontrolek do oddzielnego komponentu html-owe input-y zostały ukryte wewnątrz nowego komponentu. Aby udostępnić je na zewnątrz z poziomu komponentu kontrolki należało zaimplementować interfejs `ControlValueAccessor`.

#### **`src\app\components\custom-select-control\custom-select-control.component.ts`**

```typescript
import { Component, forwardRef, Input, Optional } from "@angular/core";
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgForm,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { SelectableOption } from "src/app/data/selectable-option";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-custom-select-control",
  templateUrl: "./custom-select-control.component.html",
  styleUrls: ["./custom-select-control.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectControlComponent),
      multi: true,
    },
  ],
})
export class CustomSelectControlComponent implements ControlValueAccessor {
  matcher = new MyErrorStateMatcher();

  value: any;

  @Input() label: string;
  @Input() selectableOptions: Set<SelectableOption>;
  @Input() formControlName: string;

  disabled = false;
  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(@Optional() private controlContainer: ControlContainer) {}

  get control(): AbstractControl {
    return this.controlContainer.control.get(String(this.formControlName));
  }

  // ControlValueAccessor
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
```

#### **`src\app\components\custom-select-control\custom-select-control.component.html`**

```html
<mat-form-field appearance="outline">
  <mat-label>{{ label }}</mat-label>
  <mat-select matInput [formControl]="control" [errorStateMatcher]="matcher">
    <mat-option *ngFor="let option of selectableOptions" [value]="option.key"
      >{{ option.description }}
    </mat-option>
  </mat-select>
</mat-form-field>
```

#### **`src\app\components\custom-select-control\custom-select-control.component.css`**

```css
mat-form-field {
  width: 100%;
}
```

Takie rozwiązanie pozwoliło na wydzielenie kontrolki do oddzielnego komponentu z jednoczesnym zachowaniem możliwości operowania na niej przy pomocy mechanizmu `Reactive Forms` w przejrzysty sposób.

Ostatecznie formularz dział i wygląda w taki sposób:

![Formularz](/img/blog-2021.07.18-03.png)

![Formularz - animacja](/img/blog-2021.07.18-04.gif)

Dostęp do wartości formularza można uzyskać z poziomu komponentu przy wywołując: `this.orderForm.value`. Przykładowy wynik dla takiego formularza może wyglądać tak:

```json
{
  "bunType": "SESAME_SEED",
  "burgers": [
    { "type": "BEEF_ANGUS", "degreeOfDoneness": "MEDIUM_RARE" },
    { "type": "BEEF_ANGUS", "degreeOfDoneness": "MEDIUM_RARE" }
  ],
  "toppings": ["BACON", "CHEDDAR", "BBQ", "JALAPENO"]
}
```

Część kodu wykorzystywanego w ramach tego projektu (definicje enum-ów, importy) nie została tu przedstawiona. Cały kod można znaleźć na GitHub pod [tym linkiem](https://github.com/lukasz-zielinski-dev/burger-order-form).

Reasumując: pomimo stosunkowo prostych założeń zrealizowanie projektu wymagało napisania dużej ilości kodu. Mechanizm `Reactive Forms` posiada wiele możliwości i gotowych rozwiązań, jednak obsługa formularza przy jego pomocy może nadal wymagać sporo pracy. Wiele elementów związanych z własnymi walidacjami i obsługą specjalnych komponentów kontrolek może jednak zostać wykonana raz w ramach projektu i używana przy kolejnych formularzach. Pracując przy projekcie, który prawdopodobnie będzie wymagał stworzenia wielu złożonych formularzy warto już na początku zadbać o przygotowanie mechanizmów ułatwiających ich implementację.

Źródła:

* [angular.io - Introduction to forms in Angular](https://angular.io/guide/forms-overview)