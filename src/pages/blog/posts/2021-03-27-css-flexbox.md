---
templateKey: blog-post
title: CSS Flexbox
date: 2021-03-27T16:31:19.383Z
description: Wpis prezentuje zastosowania układu CSS Flexbox. Przedstawiona w
  postaci animacji została tu część parametrów dotyczących kontenera flex
  pozwalających na sterowanie zachowaniem tego układu.
featuredpost: false
featuredimage: /img/blog-2021.03.27-00.png
tags:
  - frontend
  - css
  - flexbox
---
![Tytuł](/img/blog-2021.03.27-00.png "Tytuł")

CSS Flexbox umożliwia wygodne rozmieszczanie obiektów w jednowymiarowym układzie. Pozwala na elastyczne sterowanie rozkładem elementów w ramach kontenera. Ważną cechą tego układu jest jego zdolność dopasowywania się do zmieniających się warunków np.

* Rozmiaru kontenera.
* Liczby elementów znajdujących się w kontenerze.
* Rozmiaru poszczególnych elementów znajdujących się w kontenerze.

Dzięki temu nadaje się on dobrze do stylowania elementów stron ulegających częstym zmianom. Obecnie wiele stron internetowych wyświetla dane na podstawie odpowiedzi z API, dlatego na etapie projektowanie stylów CSS trudno przewidzieć to jaką liczbę elementów danego typu będziemy musieli wyświetlić na ekranie. Układ Flex sprawdzi się również bardzo dobrze w przypadkach wymagających zapewnienia responsywności strony i  wsparcia dla szerokiego zakresu rozdzielczości.

W celu skorzystania z układu CSS Flex należy na poziomie kontenera nadpisać domyślny układ (zazwyczaj block lub inline). Można to zrobić ustawiając wartość właściwości `display` na `flex`.

#### **`index.html`**

```html
<div class="parent flex-container">
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
</div>
```

#### **`styles.css`**

```css
.flex-container {
  display: flex;
}
```

Ważną właściwością układu CSS Flexbox jest `flex-direction`. określa ona kierunek i zwrot osi głównej (main axis), oraz osi poprzecznej (cross axis). Kierunki i zwroty danej osi wpływają na działanie części z pozostałych parametrów. Właściwość ta może przyjmować następujące wartości:

* `row` - (wartość domyślna) oznacza, że oś główna biegnie w kierunku poziomym od lewej do prawej, a oś poprzeczna w kierunku pionowym od góry do dołu.
* `row-reverse` - oznacza, że oś główna biegnie w kierunku poziomym od prawej do lewej, a oś poprzeczna w kierunku pionowym od góry do dołu.
* `column` - oznacza, że oś główna biegnie w kierunku pionowym od góry do dołu, a oś poprzeczna w kierunku poziomym od lewej do prawej.
* `column` - oznacza, że oś główna biegnie w kierunku pionowym od dołu do góry, a oś poprzeczna w kierunku poziomym od lewej do prawej.

![CSS flex-direction](/img/blog-2021.03.27-01.gif "CSS flex-direction")

Za sterowanie rozłożeniem elementów wzdłuż osi głównej odpowiada właściwość `justify-content`, w zależności od wybranej wartości nastąpi automatyczne dopasowanie odstępów poziomych np.

* `flex-start` - (wartość domyślna) elementy są wyrównane do początku osi głównej, cała pozostała wolna przestrzeń zostaje na końcu osi.
* `flex-end` - elementy są wyrównane do końca osi głównej, cała pozostała wolna przestrzeń zostaje na początku osi.
* `center` - elementy wyrównane są do środka osi głównej, pozostała wolna przestrzeń zostaje równo podzielona między początkiem i końcem osi.
* `space-between` - elementy są rozmieszczone między początkiem a końcem osi głównej z zachowaniem równego odstępu między poszczególnymi elementami.
* `space-around` - elementy sa rozmieszczone miedzy początkiem a końcem osi głównej z zachowaniem równego dostępu po obu stronach elementu.
* `space-evenly` - elementy sa rozmieszczone miedzy początkiem a końcem osi głównej z zachowaniem równego odstępu między początkiem/końcem osi i poszczególnymi elementami.

Za rozkład elementów wzdłuż osi poprzecznej odpowiada właściwość `align-items`, w zależności od wybranej wartości nastąpi automatyczne dopasowanie odstępów pionowych np.

* `stretch` - (wartość domyślna) elementy rozciągają się tak, aby wypełnić całe dostępne miejsce.
* `flex-start` - elementy umieszczane są na początku osi poprzecznej.
* `flex-end` - elementy umieszczane są na końcu osi poprzecznej.
* `center` - elementy umieszczane są na środku osi poprzecznej.

![CSS justify-content align-items](/img/blog-2021.03.27-02.gif "CSS justify-content align-items")

Reasumując: w tym wpisie przedstawiona została tylko część właściwości kontenera CSS Flex. Jednak są to właściwości, które powinny być wystarczające w większości prostych zastosowań. Sterowanie układem flex może odbywać się również na poziomie właściwości poszczególnych elementów, a nie tylko całego kontenera, jednak to nie zostało omówione w tym poście. W celu poznania dokładniejszej listy właściwości układu CSS Flexbox polecam warto zapoznać się z linkami ze źródeł.

Źródła:

* [MDN - Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
* [CSS Tricks - A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)