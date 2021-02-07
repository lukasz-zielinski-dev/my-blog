---
templateKey: blog-post
title: System kontroli wersji GIT. Podstawy pracy z repozytorium lokalnym.
date: 2021-02-07T16:51:12.185Z
description: Znajomość podstaw pracy z systemem kontroli wersji jest jedną z
  umiejętności, którą powinna posiąść każda osoba ucząca się programowania. W
  przypadku małych projektów osobistych umożliwia ona bardziej swobodną i
  efektywną pracę. Natomiast w przypadku większych projektów umożliwia sprawne
  zdążanie równolegle wprowadzanymi zmianami.
featuredpost: true
featuredimage: /img/blog-2021.02.06-00.png
tags:
  - narzędzia programisty
  - git
---
![Tytuł](../014-git/exports/blog-2021.02.06-00.png "Tytuł")

Praca nad projektem nie ogranicza się jedynie do implementacji rozwiązań problemów biznesowych. Ważne jest umiejętne zarządzanie stanem kodu i wprowadzanymi w nim zmianami. W przypadku małych projektów osobistych, nad którymi pracuje jedna osoba problem ten nie jest tak zauważalny. Jednak wraz z rozwojem projektu i wzrostem liczby osób nad nim pracujących skala tego problemu staje się znacznie większa. Na szczęście zagadnienie to jest na tyle uniwersalne, że narzędzia do jego rozwiązywania są bardzo dobrze rozwinięte i ogólnodostępne. Takie narzędzia nazywane są **systemami kontroli wersji**. Wśród najpopularniejszych systemów kontroli wersji znajdują się między innymi:

* GIT
* SVN
* CVS

> **System kontroli wersji** - oprogramowanie pozwalające na zarządzanie zmianami wprowadzanymi do kodu źródłowego aplikacji. Pozwala na równoległe rozwijanie alternatywnych wersji kodu, łącznie zmian w spójną całość, oraz wycofywanie zmian będących wynikiem błędu.

W tym wpisie skupię się na pracy z GIT-em.

W celu rozpoczęcia pracy z GIT-em na początku należy udać się na [stronę](https://git-scm.com/downloads) i zainstalować go na swoim komputerze. W zależnością od systemu operacyjnego na którym pracujemy proces może przebiegać nieco inaczej.

Po zainstalowaniu GIT-a na komputerze można zacząć wykorzystywać go do zarządzania zmianami w wprowadzanymi do projektu. W celu przedstawienia tego procesu stworzyłem nowy projekt składający się z pliku `index.html` wraz z podpiętym arkuszem stylów `styles.css` i grafiką `Git-Logo-2Color.png` wykorzystywana jako tło jednego z elementów.

#### **`./index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello git!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="centered-content">
    <h1>Hello</h1>
    <img id="git-logo" src="Git-Logo-2Color.png" alt="git logo" />
  </body>
</html>
```

#### **`./styles.css`**

```css
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");

:root {
  --primary: #f34f29;
  --secondary: #3d2d00;
  --light: #f0f0f0;
}

html,
body {
  height: 100%;
  width: 100%;
  background-color: var(--light);
  margin: 0;
  padding: 0;
}

.centered-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-family: "Roboto", sans-serif;
  font-size: 144px;
  color: var(--secondary);
}

#git-logo {
  height: 150px;
  margin-left: 20px;
}
```

Efekt otwarcia pliku `index.html` przy pomocy przeglądarki internetowej wygląd tak:

![Pierwsza wersja strony](/img/blog-2021.02.06-01.png "Pierwsza wersja strony")

Aby móc zarządzać projektem za pomocą git-a należy zainicjalizować w nim lokalne repozytorium. Można to zrobić za przy pomocy wiersza poleceń. W pokazanym poniżej przykładzie korzystam z narzędzia **GitBash**. Równie dobrze może być to inny terminal, albo narzędzie pozwalające na pracę z gitem przy pomocy interfejsu granicznego. 

Po przejściu do lokalizacji projektu i próbie sprawdzania aktualnego stanu lokalnego repozytorium przy pomocy polecenia `git status` git zwraca błąd wynikający z tego, że lokalne repozytorium git-a nie istnieje w tej (ani żadnej z nadrzędnych) lokalizacji.

> **Lokalne repozytorium** - obszar na dysku podlegający systemowi kontroli wersji. 

Lokalne repozytorium git-a dla danego projektu można zainicjalizować przy pomocy polecenia `git init`. Po wykonaniu tej akcji ponowne wywołanie polecenia `git status` zwraca kilka informacji:

* Branch na którym aktualnie pracujemy (master).
* Brak wykonanych do tej pory commit-ów.
* Trzy nieśledzone do tej pory pliki.
* Brak plików wskazanych do za-commit-owania.

![Komendy git-a](/img/blog-2021.02.06-02.png "Komendy git-a")

W celu stworzenie nowego commit-a zawierającego wprowadzone do tej pory zmiany należy wskazać te pliki przy pomocy komendy `git add [względne ścieżki plików]`, lub `git add .` w celu dodania wszystkich plików.

![Komendy git-a](/img/blog-2021.02.06-03.png "Komendy git-a")

Teraz pliki zostały przeniesione do poczekalni, jednak sam commit nie został jeszcze wykonany. W celu wykonania commit-a należy wykonać polecenie `git commit -m [opis commit-a]`.
W tym momencie zmiany zostały zapisane w formie commit-a. Listę commit-ów można podejrzeć wpisując polecenie `git log`. 

![Komendy git-a](/img/blog-2021.02.06-04.png "Komendy git-a")

Każdy commit posiada swój identyfikator w tym przypadku jest to **3d5c928ac1e3b6f8f075620ca381600c928ab0c1**. Przy pomocy tego identyfikatora można wskazać commit w przypadku operacji, które tego wymagają. Przykładem takiej operacji jest podejrzenie zawartości commit-a przy pomocy polecenia `git show [id commit-a]`

> **Commit** - operacja zapisu zmian dokonanych na repozytorium wraz z opisem i unikalnym identyfikatorem. 

![Komendy git-a](/img/blog-2021.02.06-05.png "Komendy git-a")

Do tej pory wszystkie pokazywane operacje były wykonywane na branch-u **master**. Jednak praca z gitem zazwyczaj opiera się na zarządzaniu kilkoma brachami. W celu sprawdzenia branchy występujących w naszym lokalnym repozytorium należy wpisać w konsoli polecenie `git branch`.
W celu stworzenia nowego branch-a na podstawie aktualnego należy wpisać polecenie `git branch [nazwa nowego branch-a]`. Następnie można na niego przejść przy pomocy polecenia `git checkout [nazwa istniejącego branch-a]`. Alternatywnie można skorzystać ze skróconej sładki i za pomocą polecenia `git checkout -b [nazwa nowego brach-a]` strwożyć nowy branch i od razu na niego przejść. 

> **Branch** - stan kodu zapisywany jako odniesienie do ostatniego commit-a. 

![Komendy git-a](/img/blog-2021.02.06-06.png "Komendy git-a")

Zmiany wprowadzane na jednym branch-u nie wpływają na inne branch-e. Dlatego po wprowadzaniu i z-commit-owaniu zmian na branch-u **feature/top-navbar** będą one występowały tylko tam. Branch-e **develop** i **master** będą w takim stanie w jakim je pozostawaliśmy w momencie przełączania się na inny branch. Dlatego po wprowadzaniu i z-commit-owaniu zmian na branch-u **feature/top-navbar** będą one dostępne tylko z poziomu tego branch-a:

#### **`./index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello git!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <div id="page-wrapper">
      <div id="top-nav">
        <a class="nav-link" href="">First</a>
        <a class="nav-link" href="">Second</a>
        <a class="nav-link primary-link" href="">Primary</a>
      </div>
      <div id="main-content">
        <h1>Hello</h1>
        <img id="git-logo" src="Git-Logo-2Color.png" alt="git logo" />
      </div>
    </div>
  </body>
</html>
```

#### **`./styles.css`**

```css
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");

:root {
  --primary: #f34f29;
  --secondary: #3d2d00;
  --light: #f0f0f0;
  --dark: #3d3d3d;
}

html,
body {
  height: 100%;
  width: 100%;
  background-color: var(--light);
  margin: 0;
  padding: 0;
}

#page-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#top-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 125px;
  width: 100%;
  background-color: var(--dark);
}

#main-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-link {
  font-family: "Roboto", sans-serif;
  font-size: 36px;
  text-decoration: none;
  border: 4px solid var(--light);
  border-radius: 10px;
  padding: 10px;
  color: var(--light);
}

.nav-link.primary-link {
  border-color: var(--primary);
  color: var(--primary);
}

h1 {
  font-family: "Roboto", sans-serif;
  font-size: 144px;
  color: var(--secondary);
}

#git-logo {
  height: 150px;
  margin-left: 20px;
}
```

![Komendy git-a](/img/blog-2021.02.06-07.png "Komendy git-a")

![Druga wersja strony](/img/blog-2021.02.06-08.png "Druga wersja strony")

Jednak po przejściu na brach **develop** powrócimy do stanu z pierwszego commit-a. W celu wprowadzania zmian na branch develop można wykonać polecenie `git merge [nazwa branch-a]`.

> **Merge** - operacja łączenia zmian z commit-ów pochodzących z różnych branchy.

![Komendy git-a](/img/blog-2021.02.06-09.png "Komendy git-a")

W ten sposób zmiany wprowadzone na branch-u **feature/top-navbar** zostały wprowadzone również na branch-u develop. 

Dużą zaletą git-a jest to, że pozwala na wygodne odwracanie zmian. W zależności od tego z jak dawna pochodzi commit, który chcemy cofnąć do tego tematu można podejść na rożne sposoby np:

* Reset branch-a do danego commit-a poprzedzającego zły commit.
* Wykonanie commit-a odwracającego zmiany.

Reset branch-a do danego commit-a jest wygodnym podejściem, jednak możemy wykonać go w przypadku, gdy chcemy cofnąć ostatni/e commit/y i wiemy, że nikt inny nie pracuje na tym branch-u. Załóżmy, że do aktualnego stanu develop-a został dodany commit modyfikujący kolory zdefiniowane w arkuszach stylów:

![Komendy git-a](/img/blog-2021.02.06-10.png "Komendy git-a")

Jednak ostatecznie wybrane kolory nie okazały się najlepsze...

![Trzecia wersja strony](/img/blog-2021.02.06-11.png "Trzecia wersja strony")

Zmiany te były wykonane w ostatnim commit-cie, a dodatkowo nikt inny nie pracuje nad tym projektem, wiec bezpiecznie można zrestartować branch do stanu z poprzedniego commit-a. Można zrobić to przy pomocy komendy `git reset --hard [id commit-a]`. Wykonanie polecenia z flagą `--hard` spowoduje natychmiastowy powrót branch-a do stanu ze wskazanego commit-a. Z jednej strony jest to wygodne gdyż nie powoduje zaśmiecania historii commit-ów. Z drugiej strony należy zachować ostrożność, aby nie stracić ważnych zmian.

![Komendy git-a](/img/blog-2021.02.06-12.png "Komendy git-a")

Alternatywnym podejściem może być wykonanie commit-a odwracającego zmiany. W ten sposób git automatycznie przygotuje zmiany przeciwne do tych wprowadzonych we wskazanym commit-cie i stworzy z nich nowy commit. Jest to podejście bardziej elastyczne i bezpieczne, jednak nie pozwala na zachowanie tak czystej historii commit-ów jak wcześniejszy sposób. Można zrobić to wykonując polecenie `git revert [id commit-a do wycofania]`

![Komendy git-a](/img/blog-2021.02.06-13.png "Komendy git-a")

Ręczne wpisywanie poleceń w konsoli git-a nie jest jest jedynym sposobem na pracę z tym systemem kontroli wersji. Obecnie istnieje wiele narzędzi pozwalających na zarządzanie gitem za pomocą interfejsu graficznego. Przykładami mogą byc narzędzia zintegrowane w Visual Studio Code, albo Intellij.

Reasumując: w tym wpisie zostały przedstawione podstawy pracy z lokalnym repozytorium git-a takie jak:

* Inizcjalizowanie nowego lokalnego repozytorium `git init`
* Sprawdzania aktualnego stanu lokalnego repozytorium `git status`
* Wskazywanie pliku/ów do z-commit-owania `git add [względne ścieżki plików]`
* Wskazywanie wszystkich zmodyfikowanych plików do z-commit-owania `git add .`
* Tworzenie nowego commit-a `git commit -m [opis commit-a]`
* Wyświetlanie listy commit-ów `git log`
* Podglądanie zawartości commit-a `git show [id commit-a]`
* Wyświetlanie listy branchy `git branch`
* Tworzenie nowego branch-a `git branch [nazwa nowego branch-a]`
* Zmiana brancha `git checkout [nazwa istniejącego branch-a]`
* Tworzenie nowego branch-a i przejcie na niego `git checkout -b [nazwa nowego brach-a]`
* Merge zmian z innego branch-a na aktualny `git merge [nazwa branch-a]`
* Twarde resetowanie branch-a do danego commit-a `git reset --hard [id commit-a]`
* Wycofywanie zmian za pomocą commit-a odwracającego `git revert [id commit-a do wycofania]`

Reprezentują one jedynie niewielki wycinek możliwości jakie daje nam git, jednak pozwalają już na w miarę sprawne zarządzanie zmianami wprowadzanymi w lokalnym repozytorium i w razie potrzeby umożliwiają wygodne wycofywanie błędów. Obecnie istnieje wiele narzędzi pozwalających na pracę z git-em przy pomocy interfejsu graficznego (np. Visual Studio Code), a nie linii poleceń.

Źródła:

* [git-scm - Documentation](https://git-scm.com/docs)
* [Wikipedia - Version control](https://en.wikipedia.org/wiki/Version_control)