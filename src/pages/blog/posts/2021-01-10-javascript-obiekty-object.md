---
templateKey: blog-post
title: JavaScript - obiekty (Object).
date: 2021-01-10T12:40:26.650Z
description: Obiekty w JavaScript są przedstawicielem złożonego typu danych.
  Pozwalają na organizowanie danych w strukturze klucz - wartość.
featuredpost: false
featuredimage: /img/blog-2021.01.10-00.png
tags:
  - programowanie
  - frontend
  - javascript
  - dane
---
![Tytuł](/img/blog-2021.01.10-00.png "Tytuł")

Klucze obiektu w JavaScript muszą dać zamienić sie na na typ prosty `String`. Wartościami przechowywanymi w obiektach mogą być dowolne typy proste (String, Number, BigInt, Boolean, Symbol, undefined, null), lub złożone (Object, Array, Function) - obiekt może zwierać w sobie inne obiekty. W JavaScript obiekt można stworzyć na kilka sposobów np.

* Składnia literałowa (literal syntax)

#### **`javascript`**
```javascript
let post = {
  number: 12,
  featured: true,
  title: "JavaScript - obiekty (Object).",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  tags: ["js", "frontend", "programing"],
};
```

* Konstruktor

#### **`javascript`**
```javascript
let post = new Object();
post.number = 12;
post.featured = true;
post.title = "JavaScript - obiekty (Object).";
post.body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
post.tags = ["js", "frontend", "program"];
```

* Metoda statyczna

#### **`javascript`**
```javascript
let post = Object.create({
  number: 12,
  featured: true,
  title: "JavaScript - obiekty (Object).",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  tags: ["js", "frontend", "programing"],
});
```

W przypadku częstego tworzenia obiektów posiadających taką samą strukturę korzystanie z notacji literałowej, lub przypisywania pól obiektu już po jego stworzeniu nie jest zbyt efektywne. Warto stworzyć wtedy funkcję będącą konstruktorem dla tego typu obiektów. Instancjonowanie nowego obiektu za pomocy konstruktora wymaga użycia słowa kluczowego `new`.

#### **`javascript`**
```javascript
function Post(title, content) {
  this.createdAt = new Date();
  this.title = title;
  this.content = content;
  this.printInfo = function printInfo() {
    console.log(
      `
      Post z dnia: ${this.createdAt.toLocaleDateString()}
      ${this.title}
      ${this.content}
      `
    );
  };
}

let arraysPost = new Post("Tablice w JavaScript", "Lorem ipsum dolor sit");
let objectsPost = new Post("Obiekty w JavaScript", "Lorem ipsum dolor sit");

arraysPost.printInfo();
// Post z dnia: 2021-1-9
// Tablice w JavaScript
// Lorem ipsum dolor sit

objectsPost.printInfo();
// Post z dnia: 2021-1-9
// Obiekty w JavaScript
// Lorem ipsum dolor sit
```

Dostęp, dodawanie lub modyfikowanie wartości obiektu może odbywać się poprzez podanie wartości klucza po kropce, lub w nawiasie kwadratowym jako `String`. Pierwsze podejście jest możliwe w przypadku kluczy będących ciągłym tekstem nie zaczynającym się od cyfry. W przypadku składni z kwadratowym nawiasem klucz nie musi spełniać tych wymagań.

#### **`javascript`**
```javascript
let post = {
  number: 12,
  featured: true,
  title: "JavaScript - obiekty (Object).",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  tags: ["js", "frontend", "programing"],
  "1stKey": 1,
  "second key": "second",
}

console.log(post["title"]);
// JavaScript - obiekty (Object).
console.log(post["1stKey"]);
// 1
console.log(post["second key"]);
// second

console.log(post.title);
// JavaScript - obiekty (Object).
console.log(post.1stKey);
// SyntaxError
console.log(post.second key);
// SyntaxError

post["description"] =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// [Prawidłowy kod]
post["3rdKey"] = 3;
// [Prawidłowy kod]
post["fourth key"] = "fourth";
// [Prawidłowy kod]

post.summary =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// [Prawidłowy kod]
post.5thKey = 5;
// SyntaxError
post.sixth key = "sixth";
// SyntaxError
```

Od ES6 podczas tworzenia obiektu przy pomocy notacji literałowej (literal syntax) możliwe jest stosowanie skróconego zapisu, który pozwala zastąpić:

#### **`javascript`**
```javascript
const title = "Obiekty w JavaScript.";
const createdAt = "2021-01-09";

let post = {
  title: title,
  createdAt: createdAt,
};

console.log(post);
// { title: 'Obiekty w JavaScript.', createdAt: '2021-01-09' }
```

skrócona wersją:

#### **`javascript`**
```javascript
const title = "Obiekty w JavaScript.";
const createdAt = "2021-01-09";

let post = {
  title,
  createdAt,
};

console.log(post);
// { title: 'Obiekty w JavaScript.', createdAt: '2021-01-09' }
```

Kolejnym elementem składni wprowadzonym w ES6, przydatnym w pracy z obiektami jest operator rozwinięcia (ang. spread operator) `...`. Pozwala on na kopiowanie wartości obiektu, a nie tylko referencji jak dzieje się to przy standardowym przypisaniu z użyciem operatora `=`.

#### **`javascript`**
```javascript
let post = {
  title: "Obiekty w JavaScript.",
  createdAt: "2021-01-09",
  tags: ["js", "frontend", "programing"],
};
let postReferenceCopy = post;
let postValueCopy = { ...post };

console.log(post === postReferenceCopy);
// true
console.log(post === postValueCopy);
// false
console.log(post.tags === postValueCopy.tags);
// true

postValueCopy.title = "Obiekty w JavaScript. [kopia]";
postValueCopy.tags.pop();
console.log(post);
// {
//   title: 'Obiekty w JavaScript.',
//   createdAt: '2021-01-09',
//   tags: [ 'js', 'frontend' ]
// }
```

Jak widać w powyższym przykładzie operator rozwinięcia pozwolił na skopiowanie wartości pól obiektu, a nie tylko przypisanie referencji. Należy jednak zachować ostrożność w przypadku obiektów zawierających pola będące wartościami złożonymi (Object, Array, Function) - tak jak pole `tags` z powyższego przykładu. W przypadku tego typu pól kopiowane są ich referencje, a nie wartości.

Pokazany wcześniej przykład tworzenia obiektu przy pomocy metody statycznej nie przedstawia w pełni możliwości tego podejścia. W przypadku, gdy jako argument metody zostanie przekazany pewien obiekt staje się on prototypem dla nowo tworzonego obiektu. Dzięki temu z poziomu nowego obiektu (poprzez łańcuch prototypów) możliwy jest dostęp do pól obiektu będącego jego prototypem. Zasięg tej zależności nie ogranicza się do jednego poziomu, ale może być "przesłonięty" jeżeli nowy obiekt posiada pole o takiej samej nazwie jak jego prototyp.

#### **`javascript`**
```javascript
let publication = Object.create({});
publication.createdAt = "2021-01-09";

let post = Object.create(publication);
post.tags = ["js", "frontend", "programing"];
post.description = "Obiekty w JavaScript.";

let blogPost = Object.create(post);
blogPost.content = "Lorem ipsum dolor sit amet, consectetur";

let instagramPost = Object.create(post);
instagramPost.images = ["img_1.png", "img_2.png", "img_3.png"];
instagramPost.description = "Więcej informacji w nowym wpisie na blogu.";

console.log(publication);
// { createdAt: '2021-01-09' }
console.log(post);
// {
//   tags: [ 'js', 'frontend', 'programing' ],
//   description: 'Obiekty w JavaScript.'
// }
console.log(blogPost);
// { content: 'Lorem ipsum dolor sit amet, consectetur' }
console.log(instagramPost);
// {
//   images: [ 'img_1.png', 'img_2.png', 'img_3.png' ],
//   description: 'Więcej informacji w nowym wpisie na blogu.'
// }

console.log(blogPost.content);
// Lorem ipsum dolor sit amet, consectetur
console.log(blogPost.tags);
// [ 'js', 'frontend', 'programing' ]
console.log(blogPost.description);
// Obiekty w JavaScript.
console.log(blogPost.createdAt);
// 2021-01-09

console.log(instagramPost.images);
// [ 'img_1.png', 'img_2.png', 'img_3.png' ]
console.log(instagramPost.tags);
// [ 'js', 'frontend', 'programing' ]
console.log(instagramPost.description);
// Więcej informacji w nowym wpisie na blogu.
console.log(instagramPost.createdAt);
// 2021-01-09
```

Powyższy przykład pokazuje obiekt `publication` posiadający pole `createdAt` i prototyp w postaci pustego obiektu `{}`. Kolejnym obiektem jest `post` posiadający pola `tags` i `description` oraz prototyp w postaci obiektu `publication`. Najniżej są obiekty `blogPost` i `instagramPost`. Obiekt `blogPost` posiada zdefiniowane pole `content`, natomiast obiekt `instagramPost` ma pola `images` i `description`.

W wyniku tak zbudowanego łańcucha prototypów z poziomu obiektów `blogPost` i `instagramPost` można uzyskać dostęp do pól obiektu `post` (wyjątkiem jest próba uzyskania wartości pola `description` z poziomu obiektu `instagramPost` - obiekt ten posiada własne pole o takiej nazwie, które przesłania pole prototypu).

Obiekty pozwalają nie tylko na przechowywanie danych, ale także na wykonywanie operacji dzięki zawartym w nich funkcjom. Funkcja zawarta w obiekcie nazywana jest metodą. Metody mogą być definiowane przy pomocy standardowej deklaracji funkcji, lub jako funkcje strzałkowe (arrow functions). 

#### **`javascript`**
```javascript
let johny = {
  sayHello: function sayHello() {
    console.log("Hello!");
  },
  sayGoodbye: () => console.log("Goodbye."),
};

johny.sayHello();
// Hello!
johny.sayGoodbye();
// Goodbye.
```

Zachowanie metody w niektórych przypadkach może się różnić w zależności od tego w jaki sposób została ona zadeklarowana. Różnice będą występowały dla metod odwołujących się do słowa kluczowego `this`. W przypadku metody korzystającej ze standardowej deklaracji funkcji słówko `this` będzie odnosiło się do obiektu, który zawiera tę metodę. W przypadku metody stworzonej przy pomocy funkcji strzałkowej słówko `this` będzie odnosiło się do kontekstu globalnego.

#### **`javascript`**
```javascript
let user = {
  firstName: "Louie",
  secondName: "Anderson",

  printFirstName: function printFirstName() {
    console.log(this.firstName);
  },
  printSecondName: () => console.log(this.secondName),
};

user.printFirstName();
// Louie
user.printSecondName();
// undefined
```

Reasumując: obiekty są złożonym typem danych. Pozwalają na przechowywanie w strukturze klucz - wartość rożnych typów danych. Funkcje definiowane jako pola obiektu nazywane sa metodami. Metody pozwalają obiektom nie tylko na przechowywanie danych, ale także na wykonywanie na nich operacji. Dzięki łańcuchowi prototypów z poziomu obiektu można uzyskać dostęp do pól i metod, które nie sa w nim zdefiniowane, ale występuje w jego łańcuchu prototypów.

Źródła:
* [Fireship.io - Objects](https://fireship.io/courses/javascript/beginner-js-objects/)
* [Web technology for developers > JavaScript > JavaScript reference > Standard built-in objects > Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [You Don't Know JS Yet: Get Started](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started)
