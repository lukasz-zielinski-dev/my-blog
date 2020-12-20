---
templateKey: blog-post
title: JavaScript - typy i struktury danych.
date: 2020-12-20T13:06:18.524Z
description: JavaScript jest językiem dynamicznie typowanym - oznacza to, że na
  różnych etapach działania aplikacji do danej zmiennej mogą być przypisane
  różna typy danych. W tym poście postaram się przedstawić typy danych
  występujące w tym języku.
featuredpost: true
featuredimage: /img/blog-2020.12.20-00.jpg
tags:
  - programowanie
  - frontend
  - javascript
  - dane
---
![Tytuł](/img/blog-2020.12.20-00.jpg "Tytuł")

JavaScript pozwala na operowanie na kilku typach danych:

* Typy proste (primitives)

  * Tekst (String)
  * Liczby (Number i BigInt)
  * Wartość logiczna (Boolean)
  * Symbol
* Typy złożone - obiekty (Object) w tym:

  * Tablice (Array)
  * Funkcje (Function)

Dodatkowo występują dwa typy reprezentujące pusty stan:

* undefined
* null

Wartości tekstowe **String** w JavaScript odpowiadają za przechowywanie sekwencji znaków. Tekst może byc ograniczony jednym z trzech znaków:

* ' (pojedynczy cudzysłów)
* " (podwójny cudzysłów)
* ` (odwrócony apostrof)

np:

#### **`javascript`**

```javascript
console.log("Hello World!");      
// Hello World!
console.log('Hello World!');      
// Hello World!
console.log(`Hello World!`);      
// Hello World!
```

Pojedyńczy cudzysłów i podwójny cudzysłów działają bardzo podobnie - jedyna różnica pojawia się gdy w tekście chcemy użyć jednego z tych znaków np:

> Gatsby said "Hello World!"

albo

> Gatsby said 'Hello World!'

W sytuacji, gdy w tekście chcemy wykorzystać znak ograniczający cały tekst należy poprzedzić go znakiem ucieczki w postaci ukośnika wstecznego (backslash):

#### **`javascript`**

```javascript
console.log("Gatsby said \"Hello World!\"");      
// Gatsby said "Hello World!"
console.log('Gatsby said "Hello World!"');       
// Gatsby said "Hello World!"

console.log("Gatsby said 'Hello World!'");        
// Gatsby said 'Hello World!'
console.log('Gatsby said \'Hello World!\'');        
// Gatsby said 'Hello World!'
```

Teksty ograniczone znakiem odwróconego apostrofu pozwalają na interpolację stringów (template literals) - jest to szczególnie przydatne, gdy chcemy stworzyć szablon tekstu zawierający fragmenty zależne od innych wartości. Przed wprowadzaniem tego trzeba było stosować dodawanie wartości tekstowych, co przy długich tekstach nie było wygodne.

#### **`javascript`**

```javascript
const firstName = "Gatsby";
console.log("Hello " + firstName + "!");
// Hello Gatsby!
console.log(`Hello ${firstName}!`);
// Hello Gatsby!
```

Dodatkowo odwrócony apostrof pozwala na zapisywanie tekstu w wielu liniach bez konieczności korzystania z specjalnych znaków `\n`. Dzięki temu tekst zapisany w kodzie aplikacji jest wizualnie bardziej zbliżony do tego wynikowego.

#### **`javascript`**

```javascript
console.log("First line. \nSecond line.");
// First line.
// Second line.
console.log(`
First line.
Second line.
`);
// First line.
// Second line.
```

W momencie gdy mamy zamiar korzystać z tekstów dzielnych na wiele wierszy, lub takich budowanych w oparciu o inne zmienne warto wybierać odwrócony apostrof. Dla prostych zastosowań nie ma większego znaczenia, czy wybierzemy pojedynczy, czy podwójny cudzysłów, jednak ze względów estetycznych w ramach danego projektu należy zachować konsekwencję.

Wartości liczbowe w JavaScript odzwierciedlane są przez typy **Number**. Służy on do przechowywania liczb całkowitych jak i zmiennoprzecinkowych. 

#### **`javascript`**

```javascript
console.log(1);
// 1
console.log(0.999999999999);
// 0.999999999999
```

Zarówno w przypadku liczb całkowitych jak i zmiennoprzecinkowych dokładność zachowywana przez ten typ jest ograniczona. Po jej przekroczeniu działanie programu może odbiegać od naszych oczekiwań.

#### **`javascript`**

```javascript
console.log(0.99999999999999999);
// 1
console.log(1 === 0.99999999999999999);
// true
```

W przypadku liczb całkowitych bezpieczny zakres w którym można operować przy pomocy typu Number mieści się od -9007199254740991 do 9007199254740991. Jeżeli mamy zamiar wykorzystywać większe wartościach należy wybrać typ **BigInt**.

#### **`javascript`**

```javascript
console.log(Number.MAX_SAFE_INTEGER);
// 9007199254740991
console.log(Number.MIN_SAFE_INTEGER);
// -9007199254740991

console.log(Number.MAX_SAFE_INTEGER === Number.MAX_SAFE_INTEGER + 1);
// false
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2);
// true
```

JavaScript pozwala na wykonywanie wielu standardowych działań matematycznych jak np:

* dodawanie
* odejmowanie
* dzielenie
* podnoszenie do potęgi
* dzielenie
* resztę z dzielenia

#### **`javascript`**

```javascript
console.log(41 + 0.9);
// 41.9
console.log(123 - 23);
// 100
console.log(123 * 23);
// 2829
console.log(2 ** 10);
// 1024
console.log(42 / 4);
// 10.5
console.log(42 % 4);
// 2
```

W javaScript występują zarówno plus jak i minus zero, jednak obie wartości są traktowane jako równe.

#### **`javascript`**

```javascript
console.log(0);
// 0
console.log(+0);
// 0
console.log(-0);
// -0

console.log(+0 === -0);
// true
```

Zależność ta nie sprawdza się jednak w przypadku plus i minus nieskończoności - wartości powstałych w wyniku dzielenia liczby przez jedno z dostępnych zer.

#### **`javascript`**

```javascript
console.log(42 / 0);
// Infinity
console.log(42 / +0);
// Infinity
console.log(42 / -0);
// -Infinity

console.log(Infinity === -Infinity);
// false
```

W skutek próby wykonania operacji matematycznej na danych nie będących liczbami (i takich, których JavaScript nie jest w stanie skonwertować na liczby) wynikiem operacji może być wartość `Nan` (Not A Number). Podczas sprawdzania takich przypadków należy korzystać z funkcji `isNaN`, gdyż porównanie dwóch wartości tego typu przy pomocy operatorów `===` i `==` nie zadziała.

#### **`javascript`**

```javascript
console.log("five" * 2);
// NaN
const notANumber = Number.NaN;
console.log(notANumber);
// NaN
console.log(notANumber === Number.NaN);
// false
console.log(notANumber === notANumber);
// false
console.log(notANumber == notANumber);
// false
console.log(isNaN(notANumber));
// true
```

Wartości logiczne (true i false) w JavaScript odzwierciedlane są przez typ **Boolean**. Pozwalają na sterowanie instrukcjami warunkowymi np:

#### **`javascript`**

```javascript
if (true) {
  console.log("Hi!");
}
// Hi! 
// [kod wewnątrz bloku if został wykonany]

if (false) {
  console.log("Hello");
}
// [brak komunikatu - kod wewnątrz bloku if nie został wykonany!]
```

Do odzwierciedlania wartości unikalnych w JavaScript służy typ **Symbol**. Do stworzenia symbolu służy funkcja Symbol(\[desc]), która opcjonalnie przyjmuje parametr pełniący rolę opisu symbolu. Nie zależnie od podanego opisu (lub jego braku) każdorazowe wywołanie funkcji Symbol() zwraca unikatowy obiekt (nawet jeżeli opisy podane podczas tworzenia symbolu były identyczne).

#### **`javascript`**

```javascript
const symbol = Symbol();
const symbolTwo = Symbol(2);
const symbolFoo = Symbol("foo");
const anotherSymbolFoo = Symbol("foo");

console.log(symbol);
// Symbol()
console.log(symbolTwo);
// Symbol(2)
console.log(symbolFoo);
// Symbol(foo)
console.log(anotherSymbolFoo);
// Symbol(foo)

console.log(symbol === symbolTwo);
// false
console.log(symbolFoo === anotherSymbolFoo);
// false
```

Typy złożone w JavaScript to obiekty - **Object** (w tym ich specjalne typy tablice - **Array**  i funkcje - **Function**).

Obiekty pozwalają na przechowywanie wartości pod kluczami umożliwiającymi dostęp do nich np:

#### **`javascript`**

```javascript
let post = {
  number: 10,
  featured: true,
  title: "JavaScript - typy i struktury danych.",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

console.log(post.number);
// 10
console.log(post.featured);
// true
console.log(post.title);
// JavaScript - typy i struktury danych.
console.log(post.body);
// Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

Tablice są specjalnym typem obiektu - takim, w którym klucze są liczbami.

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];
console.log(tags[0]);
console.log(tags[1]);
console.log(tags[2]);
```

Funkcje są specjalnym typem obiektu, którego zadaniem nie jest przechowywanie danych, a wykonywanie na nich operacji operacji.

#### **`javascript`**

```javascript
const sayHello = function sayHello() {
  console.log("Hello!");
};

sayHello();
// Hello!
```

Dzięki słowu kluczowemu `return` funkcje mogą zwracać wartości.

#### **`javascript`**

```javascript
const getGreeting = function getGreeting() {
  return "Hello!";
};

console.log(getGreeting());
// Hello!
```

Mogą też przyjmować parametry, na podstawie których będą wykonywały akcje:

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];

const printArrayElements = function printArrayElements(array) {
  for (element of array) {
    console.log(element);
  }
};

printArrayElements(tags);
// js
// frontend
// programing
```

Łącząc obiekty i funkcje można uzyskać struktury pozwalające na przechowywanie danych i wykonywanie czynności w oparciu o nie:

#### **`javascript`**

```javascript
let post = {
  number: 10,
  featured: true,
  title: "JavaScript - typy i struktury danych.",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  tags: ["js", "frontend", "programing"],

  printInfo: function printInfo() {
    console.log(`
Post #${this.number} - ${this.title}
${this.title}
---
${this.body}
    `);
  },
  printTags: function printTags() {
    console.log("Tags:");
    for (tag of this.tags) {
      console.log(tag);
    }
  },
};

post.printInfo();
// Post #10 - JavaScript - typy i struktury danych.
// JavaScript - typy i struktury danych.
// ---
// Lorem ipsum dolor sit amet, consectetur adipiscing elit.
post.printTags();
// Tags:
// js
// frontend
// programing
```

Puste wartości w JavaScript reprezentowane są przez typy null i undefined. Wartość undefined jest automatycznie przypisywana do zadeklarowanych zmiennych i argumentów funkcji. Wartość null oznacza celowy brak wartości.

Reasumując w porównaniu do innych popularnych języków liczba dostępnych w JavaScript typów danych nie wydaje się być duża. Jednak posiadają one pewne ograniczenia i nieoczywiste zachowania. Problem ten staje się jeszcze bardziej zauważalny gdy chcemy wykonywać operacje na rożnych typach danych. 

Źródła:

* [You Don't Know JS Yet: Get Started](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started)
* [Web technology for developers > JavaScript > JavaScript Guide > Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types)