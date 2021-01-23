---
templateKey: blog-post
title: JavaScript - tablice (Array).
date: 2021-01-02T10:20:35.074Z
description: Tablice w JavaScript są specjalnym typem obiektów - posortowaną
  listą, w której kluczami są liczby całkowite.
featuredpost: false
featuredimage: /img/blog-2021.01.02-00.jpg
tags:
  - programowanie
  - frontend
  - javascript
  - dane
---
![Tablice](/img/blog-2021.01.02-00.jpg "Tablice")

Klucze tablicy (Array) w JavaScript są ograniczone do liczb całkowitych i w większości przypadków ich nadawanie odbywa się automatycznie. Wartościami przechowywanymi w tablicach może być dowolny typ prosty (String, Number, BigInt, Boolean, Symbol, undefined, null), lub złożony (Object, Array, Function) -  oznacza to, że w tablicy można przechowywać inne tablice.

W celu stworzenia tablicy można skorzystać z następującej składni:

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];
```

Dostęp do elementów tablicy można uzyskać poprzez odwołanie się do odpowiedniego klucza. Domyślnie klucze są kolejnymi liczbami całkowitymi nadawanymi zaczynając od zera. W celu wskazania wybieranego klucza tablicy należy umieścić go w nawiasie kwadratowym po nazwie tablicy. Jeżeli chcemy poznać długość tablicy możemy skorzystać z właściwości `length` (nie musi być ona równa liczbie elementów znajdujących się w tablicy), natomiast metoda `toString()` pozwoli na wyświetlenie elementów tablicy oddzielnych przecinkami.

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];

console.log(tags[0]);
// js
console.log(tags[1]);
// frontend
console.log(tags[2]);
// programing
console.log(tags.length);
// 3
console.log(tags.toString());
// js,frontend,programing
```

Przydatną cechą tablic jest możliwość wygodnego wykonywania operacji na wszystkich jej elementach. Można robić to na kilka sposobów np.

* Pętla `for`:

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];

for (let index = 0; index < tags.length; index++) {
  console.log(tags[index]);
}
// js
// frontend
// programing
```

* Pętla `for...in`:

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];

for (const index in tags) {
  console.log(tags[index]);
}
// js
// frontend
// programing
```

* Pętla `for...of`:

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];

for (const tag of tags) {
  console.log(tag);
}
// js
// frontend
// programing
```

Pętle `for...in` i `for...of` wyglądaj podobnie jednak posiadają pewną różnicę w działaniu, która uwidacznia się po ręcznym dodaniu do tablicy pola. Pętla `for...in` operuje na wszystkich kluczach obiektu (również tych, które były by pominięte w przypadku pętli `for...of`).

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];

tags[3] = "super";
tags.specialTag = "special";

for (const index in tags) {
  console.log(tags[index]);
}
// js
// frontend
// programing
// super
// special

for (const tag of tags) {
  console.log(tag);
}
// js
// frontend
// programing
// super
```

* Metoda `Array.prototype.forEach()`:

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];

tags.forEach((tag) => {
  console.log(tag);
});
// js
// frontend
// programing
```

Obiekt `Array` udostępnia cztery metody pozwalające na dodawania/usuwanie elementów z początka/końca tablicy:

* `Array.prototype.push()` - dodawanie elementu do końca tablicy. Wartością zwracaną przez tę metodę jest nowa długość tablicy.

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];

tags.push("last");
// 4
console.log(tags.toString());
// js,frontend,programing,last
```

* `Array.prototype.pop()` - usuwanie elementu z końca tablicy. Wartością zwracaną przez tę metodę jest usunięty element, lub `undefined` (dla pustej tablicy).

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];

console.log(tags.pop());
// programing
console.log(tags.toString());
// js,frontend
console.log(tags.pop());
// frontend
console.log(tags.pop());
// js
console.log(tags.pop());
// undefined
```

* `Array.prototype.unshift()` - dodawanie elementu na początku tablicy. Wartością zwracaną przez tę metodę jest nowa długość tablicy.

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];

console.log(tags.unshift("first"));
// 2
console.log(tags.toString());
// first,js,frontend,programing
```

* `Array.prototype.shift()` - usuwanie elementu z początku tablicy. Wartością zwracaną przez tę metodę jest usunięty element, lub `undefined` (dla pustej tablicy).

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];

console.log(tags.shift());
// js
console.log(tags.toString());
// frontend,programing
console.log(tags.shift());
// frontend
console.log(tags.shift());
// programing
console.log(tags.shift());
// undefined
```

Tablice jako przedstawiciel typu danych złożonych przypisywane są po referencji, a nie wartkości. W celu skopiowania wartości tablicy można skorzystać np. z operatora rozwinięcia (ang. spread operator) `...`

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];
let tagsReferenceCopy = tags;
let tagsValueCopy = [...tags];

console.log(tags === tagsReferenceCopy);
// true
console.log(tags === tagsValueCopy);
// false

tagsReferenceCopy.push("reference");
tagsValueCopy.push("value");

console.log(tags.toString());
// js,frontend,programing,reference
console.log(tagsReferenceCopy.toString());
// js,frontend,programing,reference
console.log(tagsValueCopy.toString());
// js,frontend,programing,value
```

Jak pokazuje powyższy przykład podczas edycji pierwszej kopii tablicy zmianom uległ obiekt również bazowy - wynika to z tego, że oba pola `tags` i `tagsReferenceCopy` wskazują na ten sam obiekt tablicy. 

Tablice posiadają jeszcze kilka wbudowanych metod  podobnych do juz pokazanego `Array.prototype.forEach()`. Wśród takich metod znajdują się np.

* `Array.prototype.filter()` - przyjmuje jako parametr funkcję filtrującą, która wykonywana jest dla każdego elementu tablicy. W odpowiedzi zwracana jest nowa tablica zawierająca tylko elementy, dla których funkcja filtrująca zwróciła wartkość `true`. Nie modyfikuje ona tablicy na której jest wywoływana.

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];
let longTags = tags.filter((tag) => tag.length > 7);

tags.forEach((tag) => console.log(tag));
// js
// frontend
// programing
longTags.forEach((tag) => console.log(tag));
// frontend
// programing
```

* `Array.prototype.map()` - przyjmuje jako parametr funkcję przekształcającą, która wykonywana jest dla każdego elementu tablicy. W odpowiedzi zwracana jest nowa tablica zawierająca rezultaty zwrócone przez funkcję przekształcającą. Nie modyfikuje ona tablicy na której jest wywoływana.

#### **`javascript`**

```javascript
let tags = ["js", "frontend", "programing"];
let tagsUppercase = tags.map((tag) => tag.toUpperCase());

tags.forEach((tag) => console.log(tag));
// js
// frontend
// programing
tagsUppercase.forEach((tag) => console.log(tag));
// JS
// FRONTEND
// PROGRAMING
```

* `Array.prototype.reduce()` - przyjmuje jako parametr funkcję redukująca i opcjonalną wartość początkową na podstawie których zwracana jest pojedyńcza wartość. Nie modyfikuje ona tablicy na której jest wywoływana.

#### **`javascript`**

```javascript
let prices = [10, 5, 200];
const calculateTotal = function calculateTotal(accumulator, currentValue) {
  return accumulator + currentValue;
};
const shipping = 5;

const total = prices.reduce(calculateTotal, shipping);
console.log(total);
// 220
```

Wyżej opisane metody można łączyć w łańcuchy pozwalające na zwięzły zapis szeregu operacji wykonywanych na danych z tablicy. Przykładem może być przedstawiony niżej kod mający za zadanie obliczenie sumy pól powierzchni dostępnych plakatów. 

#### **`javascript`**

```javascript
let smallPoster = {
  available: true,
  width: 80,
  height: 40,
  title: "Small poster",
};

let mediumPoster = {
  available: true,
  width: 160,
  height: 90,
  title: "Medium poster",
};

let largePoster = {
  available: true,
  width: 340,
  height: 200,
  title: "Large poster",
};

let unavailablePoster = {
  available: false,
  width: 100,
  height: 100,
  title: "Unavailable poster",
};

let posters = [smallPoster, mediumPoster, largePoster, unavailablePoster];
const calculateArea = function calculateArea(poster) {
  return poster.width * poster.height;
};
const calculateTotal = function calculateTotal(accumulator, currentValue) {
  return accumulator + currentValue;
};

const availablePostersTotalArea = posters
  .filter((poster) => poster.available)
  .map(calculateArea)
  .reduce(calculateTotal);

console.log(availablePostersTotalArea);
// 85600
```

Uzyskany wynik (85600) był efektem trzech następujących po sobie operacji:

* `Array.prototype.filter()` - odrzucenie niedostępnych i przekazanie dalej pozostałych plakatów:

  \[smallPoster, mediumPoster, largePoster]
* `Array.prototype.map()` - wyznaczenie pól powierzchni pozostałych plakatów:

  \[80\*40, 160\*90, 340*200]

  \[3200, 14400, 68000]
* `Array.prototype.reduce()` - zsumowanie uzyskanych pól.

  3200 + 14400 + 68000 = 85600

Reasumując: tablice w JavaScript są przydatnym typem obiektów pozwalającym na wygodne przechowywanie danych i wykonywanie na nich przekształceń. W poście została przedstawiona jedynie część metod udostępnianych przez obiekt Array. Więcej przydatnych informacji na temat tablic można znaleźć np. w dokumentacji MDN (2. link źródeł).

Źródła:

* [You Don't Know JS Yet: Get Started](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started)
* [Web technology for developers > JavaScript > JavaScript reference > Standard built-in objects > Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [Web technology for developers > JavaScript > JavaScript Guide > Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)