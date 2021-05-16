---
templateKey: blog-post
title: Jak stworzyć swoją własną bibliotekę przy pomocy Angular'a?
date: 2021-05-16T11:08:53.787Z
description: Wpis przedstawia proces stworzenia przykładowego środowiska
  pozwalającego na rozwijanie własnej biblioteki komponentów, oraz sposób jej
  wykorzystania z poziomu oddzielnego projektu.
featuredpost: true
featuredimage: /img/blog-2021.05.15-00.png
tags:
  - programowanie
  - frontend
  - angular
  - biblioteka
---
![Tytuł](/img/blog-2021.05.15-00.png "Tytuł")

Nowoczesne frameworki frontend'owe promują tworzenie komponentów. Takie podejście pozwala na oszczędność czasu, oraz zapewnienie spójności wyglądu i zachowania powtarzających się elementów aplikacji. Stworzenie zestawu komponentów na początku pracy z nowym projektem może wymagać pewnej inwestycji czasu, jednak o ile dobrze zidentyfikowaliśmy często wykorzystywane elementy inwestycja ta powinna się zwrócić.

Czasami zdarza się tak, że dane zestawy komponentów powtarzają się w ramach kilku aplikacji. W takim przypadku występuje potrzeba współdzielenia części kodu między tymi projektami. Do rozwiązania takiego problemu można podejść na kilka sposobów:

* **Ręcznie kopiując pliki komponentów do poszczególnych projektów** - jest to najprostsze rozwiązanie. Może sprawdzić się w przypadku małej liczby współdzielonych komponentów i przy założeniu, że spójność  komponentów pomiędzy poszczególnymi aplikacjami nie jest krytyczna. Dzięki takiemu podejściu nie wprowadzamy dodatkowych zależności do projektu, ale istnieje ryzyko, że podczas rozwijania poszczególnych aplikacji utracona zostanie spójność. Rozwiązania nie do końca zgodne z zasadą DRY, ale w przypadku małej liczby komponentów i niewielkich projektów może okazać się wystarczające.
* **Skorzystanie z narzędzi pozwalających na wydzielanie komponentów** - przykładem takiego rozwiązania może być [bit](https://bit.dev). Jest to narzędzie pozwalające na wygodne współdzielenie kodu między wieloma projektami. Jeśli pracujemy nad dynamicznie zmieniającymi się aplikacjami z dużą liczbą współdzielonych komponentów może być to świetny wybór. Należy jednak liczyć się tu z tym że jest to rozwiązanie płatne (występuje co prawda plan darmowy, ale raczej nie jest on wystarczający do zastosowań komercyjnych), a dodatkowo decydujemy się na uzależnienie projektów od dostawy usługi.
* **Stworzenie własnej biblioteki** - Angular pozwala na tworzenie bibliotek, które mogą być później wykorzystywane w innych projektach. Rozwiązanie to może na początku wymagać pewnego nakładu pracy na ręczne wydzielenie komponentów i integracje biblioteki do projektów. Ostatecznie jednak pozwala na znacznie łatwiejsze zachowanie spójności komponentów w poszczególnych projektach, a dodawanie następnych projektów bazujących na takiej bibliotece nie powinno wymagać od programisty dużego nakładu pracy. Dodatkowo rozwiązanie to pozwala na rozwijanie prywatnych wewnętrznych bibliotek komponentów bez konieczności płacenia za dodatkowe narzędzia i uzależniania sie od kolejnego zewnętrznego narzędzia.

W tym poście skupię się na ostatnim z przedstawionych rozwiązań. Nacisk będzie tu położony na konfiguracje środowiska pozwalającego na rozwijanie i wygodne testowania własnej biblioteki, a nie na tworzenie bardziej złożonych komponentów bazujących na dodatkowych zewnętrznych zależnościach.

Na początku za pomocą Angular CLI wygenerowałem nowy projekt `library-workspace` (bez samej aplikacji `--create-application=false`). Następnie wewnątrz projektu wygenerowałem bibliotekę `my-library` i projekt pomocniczy `my-library-playground` mający na celu umożliwienie szybkiej weryfikacji zmian wprowadzanych w komponentach biblioteki.

#### **`terminal`**

```shell
ng new library-workspace --create-application=false

cd library-workspace/

ng generate library my-library

ng generate application my-library-playground --style=sass
```

W bibliotece zostały automatycznie wygenerowane:

* Moduł - `MyLibraryModule`
* Serwis - `MyLibraryService`
* Komponent - `MyLibraryComponent`

W ramach prezentacji przygotowałem bardzo prosty komponent, przyjmujący jeden parametr wejściowy i wyświetlający na jego podstawie wiadomość.

#### **`projects\my-library\src\lib\my-library.component.ts`**

```typescript
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-my-library',
  template: `
    <div class="container">
      <div class="welcome-card">{{ welcomeMessage }}</div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        justify-content: center;
      }
      .welcome-card {
        background-color: #ccffcc;
        padding: 10px;
        margin: 10px;
        border-radius: 10px;
        font-size: 24px;
      }
    `,
  ],
})
export class MyLibraryComponent implements OnInit {
  @Input() name: string;
  welcomeMessage: string;

  constructor() {}

  ngOnInit(): void {
    this.welcomeMessage = `Hello ${this.name || 'Stranger'}!`;
  }
}
```

Komponent jest eksportowany przez `MyLibraryModule`. Jest to jednak eksport jedynie w kontekście modułu Angular'owego, a nie samej biblioteki. Wystarcza to jednak, aby móc z niego skorzystać z poziomu projektu `my-library-playground`.

#### **`projects\my-library\src\lib\my-library.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { MyLibraryComponent } from './my-library.component';

@NgModule({
  declarations: [
    MyLibraryComponent
  ],
  imports: [
  ],
  exports: [
    MyLibraryComponent
  ]
})
export class MyLibraryModule { }
```

W projekcie `my-library-playground` w automatycznie wygenerowanym module `AppModule` można zaimportować elementy biblioteki poprzez odwołanie się do ścieżki.

#### **`projects\my-library-playground\src\app\app.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// my-library
import { MyLibraryModule } from '../../../my-library/src/lib/my-library.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MyLibraryModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Teraz w ramach modułu `AppModule` z projektu `my-library-playground` można korzystać z modułu `MyLibraryModule` (i eksportowanych przez niego elementów). Pozwala to wstępnie zweryfikować wygląd i zachowanie komponentów biblioteki bez potrzeby jej budowania.

#### **`projects\my-library-playground\src\app\app.component.html`**

```html
<lib-my-library></lib-my-library>
<lib-my-library name="Word"></lib-my-library>
```

Po uruchomieniu projektu `my-library-playground` poprzez wykonanie polecenia `ng serve` można sprawdzić działanie komponentu z biblioteki:

![Podgląd komponentów biblioteki](/img/blog-2021.05.15-01.png "Podgląd komponentów biblioteki")

Jest to rozwiązanie wygodne podczas rozwijania biblioteki, ale nie jako docelowy sposób współdzielenia kodu. W tym celu należy zbudować bibliotekę i pobrać ją z poziomu projektu zewnętrznego. Przed przystąpieniem do tego procesu należy zadbać, o to, aby wszystkie potrzebne pliki zostały zawarte w deklaracji eksportów biblioteki. W tym przypadku jest to plik `public-api.ts` wskazany w konfiguracji biblioteki `ng-package.json`.

#### **`projects\my-library\ng-package.json`**

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/my-library",
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}
```

#### **`projects\my-library\src\public-api.ts`**

```typescript
/*
 * Public API Surface of my-library
 */

export * from './lib/my-library.service';
export * from './lib/my-library.component';
export * from './lib/my-library.module';
```

W tym przykładzie korzystam z automatycznie wygenerowanego komponentu, więc nie ma potrzeby modyfikowania tych plików. Jednak podczas dodawania nowych elementów do biblioteki należy pamiętać nie tylko o eksportowaniu ich z modułu, ale także deklaracji jako elementy eksportowane z biblioteki.

W celu zbudowania biblioteki wystarczy wykonać polecenie:

#### **`terminal`**

```shell
ng build my-library
```

Pliki zostaną umieszczone w folderze wskazanym w pliku `ng-package.json` w tym przypadku `dist\my-library`. Jest to praktycznie gotowa biblioteka, jednak należy ją udostępnić innym projektom. Można zrobić to na przykład przez repozytorium npm, jednak ja zdecydowałem się na repozytorium GitHub. Pliki zbudowanej biblioteki przeniosłem do lokalnego repozytorium git'a i wypchnąłem na repozytorium zdalne GitHub (dostępne pod adresem: <https://github.com/lukasz-zielinski-dev/library-build>).

Następnie z poziomu nowego projektu wykonałem polecenie:

#### **`terminal`**

```shell
npm i --save git+https://github.com/lukasz-zielinski-dev/library-build.git#master
```

Nie rożni się ono zbytnio od standardowej instalacji pakietu z npm. Do adresu repozytorium należy dodać przedrostek `git+`. Dodatkowo można np. wskazać konkretny branch - w tym przypadki `#master`.

Wykonanie polecenia powoduje pobranie biblioteki do folderu `node_modules` i dodanie wpisu w `package.json`.

#### **`package.json`**

```json
  "dependencies": {
    ...
    "my-library": "git+https://github.com/lukasz-zielinski-dev/library-build.git#master",
  },
```

Od teraz istniej możliwość zaimportowania komponentów biblioteki z tego projektu.

#### **`src\app\app.module.ts`**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// my-lib
import { MyLibraryModule } from 'my-library';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MyLibraryModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### **`src\app\app.component.html`**

```html
<h1>Example project!</h1>
<lib-my-library name="Word"></lib-my-library>
```

Ostatecznie uzyskany efekt wygląda podobnie do tego z projektu `my-library-playground`.

![Wykorzystanie biblioteki w zewnętrznym projekcie](/img/blog-2021.05.15-02.png "Wykorzystanie biblioteki w zewnętrznym projekcie")

Reasumując: dzielenie własnego kodu między oddzielnymi aplikacjami jest problemem, który można rozwiązać na wiele sposobów. W zależności od danego przypadku, liczby dzielonych elementów, intensywności rozwoju biblioteki należy wybrać inne rozwiązanie. W przedstawionym przykładzie nie występowała konieczność zarządzania zależnościami biblioteki, ten problem postaram się przedstawić w jednym z późniejszych wpisów.

Repozytoria:

* [Biblioteka - workspace](https://github.com/lukasz-zielinski-dev/library-workspace)
* [Biblioteka - build](https://github.com/lukasz-zielinski-dev/library-build)
* [Projekt wykorzystujący bibliotekę](https://github.com/lukasz-zielinski-dev/library-usage-example)