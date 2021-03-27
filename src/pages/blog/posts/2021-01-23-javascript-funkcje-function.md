---
templateKey: blog-post
title: JavaScript - funkcje (Function).
date: 2021-01-23T13:30:34.704Z
description: Funkcje w JavaScript są przedstawicielem złożonego typu danych.
  Pozwalają na wykonywanie procedur i operacji na danych. Wynikiem wykonania
  funkcji może być zwrócona przez nią wartość i/lub efekt uboczny.
featuredpost: false
featuredimage: /img/blog-2021.01.23-00.png
tags:
  - programowanie
  - frontend
  - javascript
  - funkcje
---
![Tytuł](/img/blog-2021.01.23-00.png "Tytuł")

JavaScript pozwala na tworzenie funkcji za pomocą różnych składni np.

* Deklaracja funkcji 
* Wyrażenie funkcyjne
* Funkcja strzałkowa

Deklaracja funkcji:

#### **`javascript`**

```javascript
function myFunctionName(functionParameter) {
  if (typeof functionParameter !== "string") {
    throw new TypeError("Function parameter must be a string");
  }

  console.log(`Hello ${functionParameter}!`);
  return `Goodbye ${functionParameter}.`;
}

const valueFromFunction = myFunctionName("Tom");
// Hello Tom!
console.log(valueFromFunction);
// Goodbye Tom.
```

Wyrażenie funkcyjne:

#### **`javascript`**

```javascript
const myFunctionName = function (functionParameter) {
  if (typeof functionParameter !== "string") {
    throw new TypeError("Function parameter must be a string");
  }

  console.log(`Hello ${functionParameter}!`);
  return `Goodbye ${functionParameter}.`;
};

const valueFromFunction = myFunctionName("Tom");
// Hello Tom!
console.log(valueFromFunction);
// Goodbye Tom.
```

Funkcja strzałkowa:

#### **`javascript`**

```javascript
const myFunctionName = (functionParameter) => {
  if (typeof functionParameter !== "string") {
    throw new TypeError("Function parameter must be a string");
  }

  console.log(`Hello ${functionParameter}!`);
  return `Goodbye ${functionParameter}.`;
};

const valueFromFunction = myFunctionName("Tom");
// Hello Tom!
console.log(valueFromFunction);
// Goodbye Tom.
```

Składnia strzałkowa jest bardzo przydatna w przypadku krótkich funkcji. Dla nich skrócenie kodu jest najbardziej widoczne. W przypadku funkcji jednoliniowych zwracających zwracających wartość możliwe jest pominiecie zarówno nawiasów jak i słowa kluczowego `return`.

#### **`javascript`**

```javascript
const square = (number) => number ** 2;

const valueFromFunction = square(2);
console.log(valueFromFunction);
// 4
```

Korzystając z funkcji strzałkowych należy pamiętać, że nie tworzą one własnego kontekstu `this`. W związku z tym nie mogą być wykorzystywane jako konstruktor nowego obiektu.

Składnia wyrażenia funkcyjnego wygląda bardzo podobnie do składni deklaracji funkcji z tą różnicą, że wyrażenie funkcyjne przypisuje funkcję anonimową (nie posiadająca nazwy) jako wartość zmiennej. Jednak zachowanie tych funkcji może się znacząco różnić. Ma to związek z tzw. windowaniem (ang. hoisting). Deklaracje funkcji w JavaScript są przenoszone na górę swojego zasięgu (ang. scope). Powoduje to, że mogą zostać wywołane zanim zostaną zadeklarowane. Stwierdzenie to nie odnosi się do funkcji korzystających ze składni wyrażenia funkcyjnego. 

W związku z tym taki kod (korzystający z deklaracji funkcji) zadziała:

#### **`javascript`**

```javascript
functionDeclaration();
// Hello there!

function functionDeclaration() {
  console.log("Hello there!");
}
```

A bardzo podobny kod bazujący na wyrażeniu funkcyjnym wyrzuci wyjątek:

#### **`javascript`**

```javascript
functionExpression();
// ReferenceError: Cannot access 'functionExpression' before initialization

const functionExpression = function () {
  console.log("Hello there!");
};
```

Funkcje posiadające wiele parametrów wymagają podczas ich wywoływania przekazania równie dużej liczby argumentów. Dodatkowo konieczne jest zachowanie odpowiedniej ich kolejności. 

#### **`javascript`**

```javascript
const printPostInfo = function (title, publishedAt, author, description) {
  console.log(`
  Wpis: "${title}" - ${publishedAt}
  Autor: "${author}"
  ---
  ${description}
  `);
};

const title = "JavaScript - funkcje (Function).";
const publishedAt = "2021-01-23";
const author = "Łukasz Zieliński";
const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

printPostInfo(title, publishedAt, author, description);
//   Wpis: "JavaScript - funkcje (Function)." - 2021-01-23
//   Autor: "Łukasz Zieliński"
//   ---
//   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Takie funkcje nie są dobrą praktyką. Wpływają one negatywnie na czytelność kodu. Dodatkowo w języku dynamicznie typowanym takim jak JavaScript trudniej o narzędzia, które pozwoliłyby podczas wywoływania funkcji poznać oczekiwane przez nią parametry. Dlatego w przypadku funkcji z większą liczba parametrów warto opakować je w obiekt. Potrzebne parametry można odzyskać z obiektu poprzez destrukturyzacje. Pozwoli to rozwiązać problem z koniecznością podawania argumentów w odpowiedniej kolejności, a samo wywołanie funkcji będzie wyglądało czyściej.

#### **`javascript`**

```javascript
const printPostInfo = function (post) {
  const { title, publishedAt, author, description } = post;
  console.log(`
    Wpis: "${title}" - ${publishedAt}
    Autor: "${author}"
    ---
    ${description}
    `);
};

const title = "JavaScript - funkcje (Function).";
const publishedAt = "2021-01-23";
const author = "Łukasz Zieliński";
const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
let post = { author, description, publishedAt, title };

printPostInfo(post);
    // Wpis: "JavaScript - funkcje (Function)." - 2021-01-23
    // Autor: "Łukasz Zieliński"
    // ---
    // Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Przy okazji omawiania funkcji w JavaScript warto poświęcić część uwagi terminowi **czystej funkcji** (ang. pure function). Wywodzi się on z programowania funkcyjnego i odnosi do funkcji, która:

* Jest zależna tylko od swoich parametrów wejściowych (nie bazuje na zmiennych spoza swojego zakresu).
* Modyfikuje wartości tylko ze swojego zakresu (nie modyfikuje zmiennych spoza swojego zakresu).
* Nie posiada efektów ubocznych (np. nie drukuje informacji w konsoli).
* Dla tych samych argumentów zawsze zwraca ten sam wynik.

#### **`javascript`**

```javascript
let pureCountTotal = (itemPrices, shipping) => {
  let sum = (first, second) => first + second;
  return itemPrices.reduce(sum, shipping);
};

let itemPrices = [10, 5, 25];
const shipping = 5;

const total = pureCountTotal(itemPrices, shipping);
console.log(total);
// 45
```

Przedstawiona wyżej `pureCountTotal` jest właśnie przykładem czystej funkcji. Zwracany przez nią rezultat zależy jedynie od wartości argumentów przekazanych podczas jej wywoływania. Dodatkowo podczas wywołania nie modyfikuje ona żadnych zmiennych spoza swojego zakresu, ani nie posiada żadnego efektu obocznego (drukowanie wartości w konsoli wykonywane jest poza samą funkcją). Jej przeciwieństwem jest funkcja przedstawiona poniżej:

#### **`javascript`**

```javascript
let impureCountTotal = (itemPrices) => {
  let sum = (first, second) => first + second;
  total = itemPrices.reduce(sum, shipping);
  console.log(`Total: ${total}`);
};

let total;
let itemPrices = [10, 5, 25];
const shipping = 5;

impureCountTotal(itemPrices);
// Total: 45
console.log(total);
// 45
```

W przypadku `impureCountTotal` można zauważyć naruszenie wszystkich wcześniej odpisanych cech czystej funkcji:

* Rezultat jej wykonania zależny jest od oraz wartości pola `shipping`.
* Podczas wykonania funkcji modyfikowana jest wartość pola `total`.
* Wywołanie funkcji prowadzi do efektu ubocznego (pojawienie się tekstu w konsoli).
* Wywołanie funkcji z takimi samymi argumentami nie zawsze musi przynieść taki sam rezultat - wynika to z wykorzystania wartości pola `shipping`.

Jak widać dwa powyższe przykłady pomimo rozwiązywania tego samego problemu (obliczenia sumy cen produktów z przesyłką) znacząco się różnią. O ile w kontekście krótkiego fragmentu kodu nie ma to tak dużego znaczenia, to podczas pracy z bardziej złożoną aplikacją podejście funkcyjne pozwoli na uzyskanie czytelniejszego i łatwiejszego w testowaniu kodu. W rezultacie takie podejście może zmniejszyć ryzyko wprowadzania błędów do systemu podczas jego modyfikacji.

Podczas omawiania funkcji w JavasCript wato zwrócić uwagę na **funkcje wyższego rzędu** (ang. higher-order function), czyli takie, które są w stanie przyjmować/zwracać inne funkcje. Przykładami funkcji przyjmujących jako parametr inne funkcje mogą być dostępne dla obiektów dziedziczących po `Array` funkcje: `map`, `filter` i `reduce`. Przykładem funkcji zwracającej inną funkcję może być przedstawiona poniżej `createSignature`, która przyjmuje imię i zwraca funkcję doklejającą wcześniej podane imię jako podpis.

#### **`javascript`**

```javascript
const createSignature = function (name) {
  return function (statement) {
    return `${statement} - ${name}`;
  };
};

const signAsJohn = createSignature("John");
const greeting = "Hello!";
const johnsGreeting = signAsJohn(greeting);

console.log(johnsGreeting);
// Hello! - John
```

Reasumując: funkcje w JavaScript są specjalnym typem obiektów. Pozwalają one na opakowywanie operacji na danych i procedur w re-używalne bloki. Istnieją rożne sposoby deklarowania funkcji, w zależności od wybranego sposobu jej zachowanie może się różnić. Podczas pracy z funkcjami warto przynajmniej w pewnym stopniu kierować się zasadami programowania funkcyjnego, gdyż potencjalnie mogą one wpłynąć pozytywnie na jakość kodu. Funkcję przyjmującą, lub zwracająca inna funkcję nazywa się funkcją wyższego rzędu.

Źródła:

* [Fireship.io - Functions](https://fireship.io/courses/javascript/beginner-js-functions/)
* [Learning Functional Programming with JavaScript - Anjana Vakil - JSUnconf](https://www.youtube.com/watch?v=e-5obm1G_FY)
* [Web technology for developers > JavaScript > JavaScript reference > Standard built-in objects > Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)