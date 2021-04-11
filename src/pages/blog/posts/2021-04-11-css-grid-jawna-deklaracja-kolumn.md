---
templateKey: blog-post
title: CSS Grid - jawna deklaracja kolumn.
date: 2021-04-11T09:15:20.116Z
description: Wpis skupia się na podstawach układu CSS Grid. Przedstawia część
  jego wraz z animowanym przykładem. Omówiony tu został przykład standardowego
  rozmieszczenia elementów na stronie - tzw. "Holy Grail".
featuredpost: true
featuredimage: /img/blog-2021.04.10-00.png
tags:
  - frontend
  - css
  - grid
  - layout
---
![Tytuł](/img/blog-2021.04.10-00.png "Tytuł")

Grid jest modułem CSS dedykowanym do stylowania dwuwymiarowych układów. Pozwala na pozycjonowanie elementów względem rzędów i kolumn. Umożliwia definiowanie układów bazujących na jawnej definicji kolumn (liczba/szerokość kolumn z góry ustalone), jak i na niejawnej (liczba/szerokość kolumn wyliczane dynamicznie). Przykład z tego wpisu będzie skupiał się na jawnej deklaracji kolumn.

![Animacja](/img/blog-2021.04.10-01.gif "Animacja")

W celu przedstawienia przykładu przygotowałem wstępnie pliki `index.html` i  `style.css`. Zawierają one już wymagane elementy i wstępne stylowanie. Nie został jeszcze w nich zastosowany układ CSS Grid, w związku z czym poszczególne elementy są ułożone jeden pod drugim.

#### **`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="style.css" />
    <title>CSS Grid</title>
  </head>
  <body>
    <div id="main-container">
      <div id="top-bar" class="centered-big-text">Top bar</div>
      <div id="side-nav" class="centered-big-text">Side nav</div>
      <div id="main-content" class="centered-big-text">Main content</div>
      <div id="footer" class="centered-big-text">Footer</div>
    </div>
  </body>
</html>
```

#### **`style.css`**

```css
:root {
  --red-orange: #f6511d;
  --honey-yellow: #ffb400;
  --carolina-blue: #00a6ed;
  --apple-green: #7fb800;
  --prussian-blue: #0d2c54;
}

html,
body,
#main-container {
  margin: 0;
  padding: 0;
  height: 100%;
}

.centered-big-text {
  font-size: 32px;
  font-weight: bold;
  color: var(--prussian-blue);
  display: flex;
  justify-content: center;
  align-items: center;
}

#top-bar {
  background-color: var(--red-orange);
}

#side-nav {
  background-color: var(--honey-yellow);
}

#main-content {
  background-color: var(--carolina-blue);
}

#footer {
  background-color: var(--apple-green);
}
```

![Wstępny layout](/img/blog-2021.04.10-02.jpg "Wstępny layout")

Rozłożenie elementów za pomocą układu CSS Grid będzie wymagała trzech kroków:

* Zastosowanie układu w kontenerze `display`.
* Zdefiniowaniom nazw poszczególnych obszarów `grid-area`.
* Zdefiniowanie rozmieszczenia obszarów w ramach kontenera `grid-template-areas`

Po wykonaniu tych kroków style wyglądają następująco:

#### **`style.css`**

```css
:root {
  --red-orange: #f6511d;
  --honey-yellow: #ffb400;
  --carolina-blue: #00a6ed;
  --apple-green: #7fb800;
  --prussian-blue: #0d2c54;
}

html,
body,
#main-container {
  margin: 0;
  padding: 0;
  height: 100%;
}

.centered-big-text {
  font-size: 32px;
  font-weight: bold;
  color: var(--prussian-blue);
  display: flex;
  justify-content: center;
  align-items: center;
}

#main-container {
  display: grid;
  grid-template-areas:
    "top-bar    top-bar       top-bar"
    "side-nav   main-content  ."
    "footer     footer        footer";
}

#top-bar {
  background-color: var(--red-orange);
  grid-area: top-bar;
}

#side-nav {
  background-color: var(--honey-yellow);
  grid-area: side-nav;
}

#main-content {
  background-color: var(--carolina-blue);
  grid-area: main-content;
}

#footer {
  background-color: var(--apple-green);
  grid-area: footer;
}
```

![CSS Grid](/img/blog-2021.04.10-03.jpg "CSS Grid")

Uzyskany efekt przypomina kształtem standardowy układ elementów na stronie internetowej, jednak wymiary poszczególnych elementów nie sa odpowiednie. Domyślnie układ CSS Grid dzieli obszar na rzędy i kolumny o równych rozmiarach. W celu nadpisania tego zachowania można skorzystać z właściwości `grid-template-columns` i  `grid-template-rows` zdefiniowanych w kontenerze.

#### **`style.css`**

```css
#main-container {
  display: grid;
  grid-template-areas:
    "top-bar    top-bar       top-bar"
    "side-nav   main-content  ."
    "footer     footer        footer";
  grid-template-columns: 2fr 9fr 1fr;
  grid-template-rows: 75px auto 50px;
}
```

Podczas definicji rozmiaru kolumn i wierszy można korzystać z różnych kombinacji jednostek i funkcji pomocniczych. W przepadku, gdy kilka następujących po sobie kolumn/wierszy posiada taki sam rozmiar zastosować funkcję `repeat`

![CSS Grid + definicja rozmiarów kolumn i wierszy](/img/blog-2021.04.10-04.jpg "CSS Grid + definicja rozmiarów kolumn i wierszy")

Reasumując: Powyższy post przedstawił jedno z przykładowych zastosowań modułu CSS grid - stały dwuwymiarowy układ elementów na stronie. W celu zapewnienia responsywności takiego układu można skorzystać z MediaQuery zdefiniowanych dla rożnych rozdzielczości.

Źródła:

* [MDN - Grids](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids)
* [CSS Tricks - A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)