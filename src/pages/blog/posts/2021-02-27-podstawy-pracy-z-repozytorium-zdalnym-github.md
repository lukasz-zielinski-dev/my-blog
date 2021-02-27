---
templateKey: blog-post
title: Podstawy pracy z repozytorium zdalnym GitHub.
date: 2021-02-27T14:42:30.688Z
description: Wpis skupiony na podstawach pracy z repozytorium zdalnym git-a.
  Przedstawia proces założenia nowego zdalnego repozytorium na GitHub-ie,
  połączenie go z repozytorium lokalnym i podstawy pracy.
featuredpost: true
featuredimage: /img/blog-2021.02.27-00.png
tags:
  - narzędzia programisty
  - git
  - github
---
![Tytuł](/img/blog-2021.02.27-00.png "Tytuł")

W tym wpisie skupie się na pracy ze zdalnym repozytorium kodu.

> **Zdalne repozytorium kodu** - miejsce dostępne przez Internet (albo np. sieć wewnętrzną organizacji) pozwalające na przechowywanie źródeł projektu. Zdalne repozytoria w zależności od nadanych uprawnień pozwalają użytkownikowi na operacje takie jak pobieranie/aktualizowanie przechowywanych na nich danych.

Obecnie na rynku istnieje kilka firm dostarczających produkty/usługi związane ze zdalnymi repozytoriami. Wśród najpopularniejszych znajdują się np.

* Bitbucket
* GitHub
* GitLab

Posiadają one zarówno plany darmowe, jak i płatne. Jednak z perspektywy użytkowania osobistego opcje darmowe są zazwyczaj w zupełności wystarczające. Przykłady przedstawione w ramach tego wpisu będą bazowały na usłudze GitHub, jednak w przypadku innych dostawców nie powinny występować znaczące różnice (pomijając różnicę w interfejsach użytkownika).

Aby rozpocząć pracę z GitHub-em należy na początku założyć darmowe konto na stronie [github.com/join](https://github.com/join). Na tym etapie można też skonfigurowanie klucz SSH (zgodnie z [tymi](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) instrukcjami) - nie jest to konieczne, jednak jeżeli często korzystamy z tego samego komputera, to nie będziemy musieli każdorazowo logować się podczas wykonywania operacji na repozytorium zdalnym. Następnie można przejść na swój profil i stworzyć nowe repozytorium zdalne.

![Nowe repozytorium zdalne](/img/blog-2021.02.27-01.png "Nowe repozytorium zdalne")

Podczas zakładania nowego repozytorium na GitHub-ie należy podać kilka informacji:

* **Właściciela repozytorium** - w przypadku projektów personalnych będzie to nasze konto, natomiast podczas pracy z zespołem może być to inne konto z zespołu.
* **Nazwa** - identyfikator repozytorium. W przypadku nazw składających się z kilku członów są one zazwyczaj łączone w konwencji kebab-case (wyrazy-łączone-myślnikami).
* **Prywatność repozytorium (publiczne/prywatne)** - parametr determinujący, czy repozytorium będzie widoczne dla wszystkich użytkowników portalu, czy tylko dla wskazanych w ustawieniach repozytorium. W przypadku repozytorium publicznego wszyscy użytkownicy mogą przeglądać i pobierać znajdujący się w nim kod, ale nie oznacza to, ze mogą wprowadzać zmiany w tym repozytorium zdalnym.
* **Automatycznie wygenerowane pliki** - sekcja ta pozwala na automatyczne wygenerowanie plików: 

  * `README.md` - opis projektu.
  * `.gitignore` - pliki ignorowane przez git-a (przydatne np. przy pracy z narzędziami takimi jak npm).
  * Licencja - dokument opisujący w jaki sposób można korzystać z treści zawartych w tym repozytorium.

![Parametry nowego repozytorium](/img/blog-2021.02.27-02.png "Parametry nowego repozytorium")

Po utworzeniu zdalnego repozytorium zostajemy przeniesieni na stronę ze wskazówkami dotyczącymi dalszego postępowania. Na tym ekranie można wybrać jeden z protokołów (https/ssh) co wpływa na aktualizację instrukcji znajdujących się poniżej. Przedstawione instrukcje pozwalają na:

* Stworzenie nowego repozytorium lokalnego z linii poleceń.
* Wypchnięcie istniejącego repozytorium lokalnego z linii poleceń.
* Zaimportowanie kodu z innego repozytorium.

![Porady GitHub](/img/blog-2021.02.27-03.png "Porady GitHub")

W tym przypadku będę pracował z repozytorium lokalnym, które powstało w ramach poprzedniego wpisu, więc zdecyduje się na opcję drugą. Na początku należy w repozytorium lokalnym wskazać adres repozytorium zdalnego. Jedno repozytorium lokalne może być połączone z wieloma repozytoriami zdalnymi, dlatego każdemu z takich połączeń nadaje się dodatkowo identyfikującą je nazwę. Najpopularniejszą nazwą repozytorium zdalnego jest `origin`.

Jeżeli dla danego repozytorium lokalnego chcemy sprawdzić listę podpiętych repozytoriów zdalnych możemy przejść do jego lokalizacji i wykonać polecenie `git remote`. W tym przypadku ze względu na brak podpiętych repozytoriów zdalnych nie zwróci ono żadnej odwiedzi. W celu dodania repozytorium zdalnego należy wykonać polecenie `git remote add [nazwa zdalnego repozytorium] [adres zdalnego repozytorium]`. Po dodaniu repozytorium zdalnego ponowne wykonanie polecenia `git remote` powinno zwrócić jego nazwę, a wykonanie tego polecenia z dodatkowa flagą `git remote -v` dodatkowo wyświetli jego adres.

![Wskazanie repozytorium zdalnego](/img/blog-2021.02.27-04.png "Wskazanie repozytorium zdalnego")

Po dodaniu adresu zdalnego repozytorium do repozytorium lokalnego można wypchnąć tam kod przy pomocy polecenia `git push [nazwa zdalnego repozytorium] [nazwa zdalnego branch-a]`. W tym przypadku zdecydowałem się na wypchnięcie lokalnych branch-y **master** i **develop** na nowo utworzone pod takimi samymi nazwami branch-e zdalne.

![Wypchnięcie kodu na repozytorium zdalne](/img/blog-2021.02.27-05.png "Wypchnięcie kodu na repozytorium zdalne")

> **Push** - akcja polegająca na przesłaniu zmian (commit-ów) z repozytorium lokalnego do repozytorium zdalnego.

Po przejściu na stronę repozytoria zdalnego można zauważyć, że pojawiła się już w nim zawartość dwóch wcześniej wspomnianych branch-y.

![Projekt wypchnięty na repozytorium zdalne](/img/blog-2021.02.27-06.png "Projekt wypchnięty na repozytorium zdalne")

Dodatkowo dla każdego z tych branch-y możemy podejrzeć historię commit-ów. Wynika z niej, że branch master zawiera tylko jeden commit wstępny, natomiast branch develop posiada dodatkowe cztery commit-y. W celu wyrównania stanu branch-a **master** do stanu branch-a **develop** można wykonać lokalnie merge, jednak w przypadku pracy z repozytorium zdalnym możemy skorzystać z opcji wykonania **pull request-a**.

> **Pull request** - proces mający na celu wprowadzenie zmian znajdujących się na pewnym branch-u do innego branch-a (często będącego źródłem dla tego pierwszego). Zazwyczaj udział w nim bierze autor zmian i inne osoby, które w ramach **code review** sprawdzają zmiany i mogą sugerować ewentualne usprawnienia.

![Nowy pull request](/img/blog-2021.02.27-07.png "Nowy pull request")

Po wybraniu opcji stworzenia nowego pull request-a i wskazaniu branch-a źródłowego i docelowego można podejrzeć commit-y, które zostaną z-merge-owane w ramach tej akcji.  Dodatków można podejrzeć wynikowe zmiany jakie zostaną wprowadzone w kodzie.

Gotowy pull request zazwyczaj przechodzi przez proces code review, w którym jest on analizowany i proponowane są ewentualne usprawniania. Po pomyślnym przejściu procesu można wykonać merge.

![Merge pull request-a](/img/blog-2021.02.27-08.png "Merge pull request-a")

Zdalne repozytorium pozwala na utworzenie repozytoriom lokalnego na podstawione swojego stanu. Jest to możliwe dzięki wykonaniu polecenia `git clone [adres zdalnego repozytorium]`. Dzięki temu rozpoczęcie pracy nad projektem na innym komputerze powinno byc relatywnie bezproblemowe. 

> **Clone** - akcja tworząca nowe repozytorium lokalne będące kopią wskazanego repozytorium źródłowego.

![Klonowanie repozytorium zdalnego](/img/blog-2021.02.27-09.png "Klonowanie repozytorium zdalnego")

W wyniku sklonowania repozytorium zdalnego powstało nowe repozytorium lokalne. Należy jednak zauważyć, że zawiera ono jedynie branch **master** ustawiony w repozytorium zdalnym jako domyślny. W celu utworzenia lokalnej kopii innego branch-a zdalnego można wykonać polecenie `git checkout -b [nazwa nowego branch-a lokalnego] [źródłowego branch-a zdalnego]`. Listę zdalnych branch-y można podejrzeć wykonując polecenie `git branch -r`.

![Tworzenie lokalnej kopii branch-a zdalnego](/img/blog-2021.02.27-10.png "Tworzenie lokalnej kopii branch-a zdalnego")

Aktualnie oba repozytoria lokalne połączone są z tym samym repozytorium zdalnym. Umożliwia to synchronizowanie kodu między nimi. W ramach przykładu:

* Wprowadzę zmiany na branch-u **develop** w aktualnym repozytorium lokalnym.
* Wypchnę je na repozytorium zdalne.
* Pobiorę je na na pierwszym repozytorium lokalnym.

Z poziomu drugiego repozytorium lokalnego wprowadziłem zmiany w pliku **index.html**, po czym stworzyłem z nimi commit, który ostatecznie wypchnąłem na branch **develop** w repozytoriom zdalnym. Zmiany te zostały uwzględnione w repozytorium zdalnym, jednak nie zostały automatycznie wprowadzone w pierwszym repozytorium lokalnym.

![Wypchniecie zmian na repozytorium zdalne](/img/blog-2021.02.27-11.png "Wypchniecie zmian na repozytorium zdalne")

Po powrocie do pierwszego repozytorium lokalnego i podejrzeniu dwóch ostatnich commit-ów na branch-u **develop** można zauważyć, ze zmiany wykonane w drugim repozytorium lokalnym, które zostały wypchnięte na repozytorium zdalne nie zostały tu automatycznie uwzględnione. Należy je pobrać. W celu pobrania zmian z branch-a repozytorium zdalnego na aktualnie aktywny branch lokalny można wykonać polencie `git pull [nazwa repozytorium zdalnego] [nazwa branch-a zdalnego]`.

> **Pull** - akcja polegająca na pobraniu zmian z repozytorium zdalnego i wprowadzeniu ich w repozytorium lokalnym.

![Pobranie zmian z repozytorium zdalnego](/img/blog-2021.02.27-12.png "Pobranie zmian z repozytorium zdalnego")

Gdy nad jednym projektem równolegle pracuje kilka osób mogą pojawić się tzw. **konflikty**. Mają one miejsce w sytuacji, gdy próbujemy połączyć zmiany dotyczące tego samego fragmentu kodu.

> **Konflikt** - sytuacja występująca podczas próby łączenia zmian z dwóch oddzielnych branch-y zawierających zmiany, które są trudne do automatycznego połączenia. Na przykład zmiany w tych samych linijkach kodu, albo edycja pliku na jednym branch-u, a usunięcie go na drugim.

W celu przedstawienia takiego konfliktu w pierwszym repozytorium lokalnym wykonam commit ze zmianą tekstu przycisku i wypchnę go na repozytorium zdalne. Natomiast w drugim repozytorium zmienię klasę tego samego przycisku i również spróbuję wypchnąć tę zmianę na repozytorium zdalne.

![Wypchnięcie nowego commit-a na repozytorium zdalne](/img/blog-2021.02.27-13.png "Wypchnięcie nowego commit-a na repozytorium zdalne")

Po tak wprowadzonych zmianach na stronie widać dodatkowy napis w pierwszym przycisku:

![Zmiana tekstu](/img/blog-2021.02.27-14.png "Zmiana tekstu")

Następnie przeszedłem do drugiego repozytorium lokalnego i dla tego samego przycisku dodałem klasę css. Specjalnie przed tym nie pobrałem zmian z repozytorium zdalnego.

![Commit zmiany tekstu](/img/blog-2021.02.27-15.png "Commit zmiany tekstu")

W wyniku tego przycisk dostał nowe style, ale nie miał dodatkowego tekstu.

![Dodanie klasy](/img/blog-2021.02.27-16.png "Dodanie klasy")

W celu połączenia zmian z dwóch źródeł zdecydowałem się z poziomu drugiego repozytorium lokalnego pobrać zmiany z repozytorium zdalnego. Na tym etapie wystąpił konflikt.

![Konflikt](/img/blog-2021.02.27-17.png "Konflikt")

Teraz po przejściu do pliku **index.html** można zauważyć, że pojawiły się w nim zmiany z dwóch commit-ów, jednak nie zostały połączone w spójną całość, tylko oddzielone i specjalnie oznaczone.

#### **`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello git [from 2nd local repo]!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <div id="page-wrapper">
      <div id="top-nav">
<<<<<< HEAD
        <a class="nav-link primary-link" href="">First</a>
======
        <a class="nav-link" href="">First [text from 1st local repo]</a>
>>>>>> c7734823e478ad6c82acb351f375c92aae93692e
        <a class="nav-link" href="">Second</a>
        <a class="nav-link" href="">Third</a>
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

W związku z tym na stronie pojawiły się dwa warianty pierwszego przycisku. Jeden ze zmiana  tekstu, a drugi z dodatkowa klasą. Dodatkowo pomiędzy nimi wyświetlają się znaki dodane przez git-a. Strona co prawda nadal się wyświetla, ale uzyskany rezultat znacznie odbiega od oczekiwań.

![Automatycznie połączone zmiany](/img/blog-2021.02.27-18.png "Automatycznie połączone zmiany")

W takiej sytuacji należy ręcznie rozwiązać konflikt. Trzeba wtedy zdecydować, które zmiany powinny znaleźć się w ostatecznie wersji. W tym przypadku są to zmiany z obu commit-ów. Ostatecznie uzyskany kod wygląda następująco.

#### **`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello git [from 2nd local repo]!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <div id="page-wrapper">
      <div id="top-nav">
        <a class="nav-link primary-link" href=""
          >First [text from 1st local repo]</a
        >
        <a class="nav-link" href="">Second</a>
        <a class="nav-link" href="">Third</a>
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

W wyniku takich zmian na stronie pojawiła się znowu jedna wersja przycisku, która poosiada zarówno zmieniony tekst jaki i dodatkową klasę css.

![Ręcznie rozwiązany konflikt](/img/blog-2021.02.27-19.png "Ręcznie rozwiązany konflikt")

Po wprowadzeniu takich zmian, można je wypchnąć na branch zdalny.

![Rozwiązanie konfliktu](/img/blog-2021.02.27-20.png "Rozwiązanie konfliktu")

Reasumując: w tym wpisie zostały przedstawione podstawy pracy ze zdalnym repozytorium git-a takie jak:

* Utworzenie konta i repozytorium zdalnego na portalu GitHub
* Sprawdzenie aktualnie podpiętych repozytoriów zdalnych `git remote` / `git remote -v`
* Dodanie podpięcie nowego repozytorium zdalnego `git remote add [nazwa zdalnego repozytorium] [adres zdalnego repozytorium]`
* Wypychanie zmian na repozytorium zdalne `git push [nazwa zdalnego repozytorium] [nazwa zdalnego branch-a]`
* Klonowanie zdalnego repozytorium `git clone [adres zdalnego repozytorium]`
* Wyświetlenie listy branch-y ze zdalnego repozytorium `git branch -r`
* Tworzenie lokalnego branch-a na podstawie branch-a zdalnego `git checkout -b [nazwa nowego branch-a lokalnego] [źródłowego branch-a zdalnego]`
* Aktualizacja stanu aktywnego branch-a lokalnego na podstawie stanu branch-a zdalnego `git pull [nazwa repozytorium zdalnego] [nazwa branch-a zdalnego]`

Praca ze zdalnym repozytorium daje wiele korzyści np.

* Może pełnić rolę kopi zapasowej
* Umożliwia wygodne przenoszenie projektu miedzy komputerami
* Pozwala na wygodne udostępnianie kodu
* Umożliwia równoległe rozwijanie projektu przez wiele osób
* Pozwala na integrację z systemami zewnętrznymi i automatyczne wykonywanie akcji (np. wystawienie wersji aplikacji) po aktualizacji danego branch-a zdalnego

Źródła:

* [git-scm - Documentation](https://git-scm.com/docs)