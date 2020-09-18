---
templateKey: blog-post
title: "Co wybrać: renderowanie po stronie serwera, klienta, a może generator
  stron statycznych?"
date: 2020-09-15T11:37:30.749Z
description: Aktualnie dostępne narzędzia do tworzenie stron i aplikacji
  internetowych pozwalają nam wybrać z pośród kilku metod dostarczania treści do
  użytkownika. Jakie są najpopularniejsze metody,  czym się różnią, jakie są ich
  zalety i wady?
featuredpost: true
featuredimage: /img/blog-01-title.png
tags:
  - programowanie
  - frontend
  - seo
  - csr
  - ssr
  - generatory stron statycznych
---
![](https://lh3.googleusercontent.com/cXr_P41j6Q5StyYc626Q9kQHPU27KbL5q7B_g7vIghqf62PEte03pHYDpiBhcUCe6Hg1n1gB618TlW00uEeqnrYIfE0PYvrHLJHnoWagUf7KvE4Ac7ZhySwRUPHGmKLMtqZlDTJg)

Tworząc stronę internetową należy zastanowić się nie tylko nad tym jakie treści na niej zostaną umieszczone, ale również w jaki sposób będą one dostarczane użytkownikowi. Może wydawać się, że tego typu kwestie techniczne to sprawa drugorzędna, jednak wpływają one na dwa istotne aspekty:

1. **Pozycjonowanie w wynikach wyszukiwania.**\
   Optymalizowanie pod względem pozycjonowania w wynikach wyszukiwania (**SEO**) jest tematem bardzo szerokim i szczerze mówiąc brakuje mi obecnie kompetencji by dokładniej go omówić. Opiera się ono jednak na prostych mechanizmach, które można szybko zrozumieć i przynajmniej częściowo wykorzystać w celu poprawy zasięgu swojej strony. Aby dana strona miała szansę pojawić się w wynikach wyszukiwania musi zostać najpierw zeskanowana przez **crawler** (program, który systematycznie odwiedza dostępne w sieci adresy i analizuje ich treści). Następnie na podstawie parametrów takich jak:

* Treść
* Szybkość
* Przystosowane do urządzeń mobilnych
* Dostępność (accessibility)

Strona uzyskuje **zbiór haseł** - słów kluczowych po wpisaniu, których ma szansę pojawić się w wynikach wyszukiwania, oraz **wynik punktowy determinujący jej pozycję** względem innych stron o podobnej treści. Warto wspomnieć, że podczas takiego skanowania najważniejsza jest zawartość pliku html, a inne zasoby nie koniecznie muszą zostać w pełni. załadowane.\
\
Istnieją narzędzia pozwalające na wykonanie **audytu strony** i zidentyfikowanie obszarów wymagających poprawy - przykładem może być zintegrowany od pewnego czasu w Google DevTools - **Lighthouse**.

2. **Doświadczenia użytkownika (UX) na stronie (szczególnie przy pierwszym jej załadowaniu)**\
   Analizując doświadczenia użytkownika strony internetowej należy brać pod uwagę zarówno całą planowaną przez dewelopera ścieżkę, jak i **kilka pierwszych (najważniejszych) sekund**. To właśnie te kilka pierwszych sekund może zdecydować, czy użytkownik zostanie na stronie, czy opuści ją zanim dotrze do głównej treści. Dlatego należy starać się, aby pierwsze załadowanie strony wymagało pobrania jak najmniejszej paczki zasobów. Dalsza optymalizacja może odbywać się w oparciu o zebrane przy pomocy narzędzi do analizy informacje średniej o **głębokości sesji** (ilości stron odwiedzonych przez użytkownika podczas jednej sesji).

Istnieje wiele sposobów działania stron i aplikacji internetowych. W tym poście skupię się na nowoczesnych rozwiązaniach opartych o popularne frameworki frontendowe takie jak np. React, Angular, czy Vue. Większość tego typu narzędzi pozwala na korzystanie z różnych podejść do dostarczania treści użytkownikowi. Wśród najpopularniejszych z nich znajdują się:

* Renderowanie po stronie klienta (client-site rendering)
* Renderowanie po stronie serwera (server-site rendering)
* Generowanie stron statycznych

![](https://lh3.googleusercontent.com/V3clQpW4NLYqsMQ4-wOAyn3oelg_xBoOwBDAtuf5zWPKRYOy9M7g-cmL8ljdagNKYb-1fmSkvwHkcyeqACPG4ip_FzN2g89PlW2Ow9cnA608Eqa-zalPdb2T-1398zn6b0WL7fme "Schemat renderowania po stronie klienta.")

**Pierwszym** podejściem proponowanym przez twórców narzędzi do tworzenia stron internetowych to **SPA** (single-page-application) bazujących na jednym “pustym” pliku html i pliku js wprowadzającym zmiany w DOM już w przeglądarce internetowej użytkownika. To rozwiązanie zyskało ostatnio bardzo dużą popularność. Pozwala na wyeliminowanie konieczności przeładowywania strony w ramach jednej sesji, co za tym, idzie pozwala na zapewnienie użytkownikowi doświadczeń zbliżonych do korzystania z aplikacji natywnej. Po drugie jest to rozwiązanie pozwalające na proste tworzenie stron z dynamicznie zmieniającą się zawartością. Po trzecie hostowanie tego typu stron nie jest szczególnie wymagające - z punktu widzenia hostingu frontendowe zasoby strony nie różnią się zbytnio od stron statycznych. Wprowadzanie zmian w strukturze strony odbywa się po stronie klienta w odpowiedzi na dane otrzymane z API. To rozwiązanie posiada jednak pewne wady. Problemem stron renderowanych po stronie klienta jest optymalizacja pod względem pozycjonowania w wyszukiwarkach internetowych (**SEO**). Ze względu na to, że zazwyczaj plik html nie zawiera wiele treści analiza tego typu stron przez mechanizmy indeksujące wyszukiwarek internetowych może być utrudniona (istnieją co prawda sposoby pozwalające częściowo rozwiązać ten problem). Dodatkowo tego typu strony zazwyczaj wymagają wykonania znacznie większej liczby operacji przez przeglądarkę klienta, co teoretycznie nie powinno być dużym problemem, ale warto mieć ten fakt na uwadze. Z jednej strony ciągle obserwujemy rozwój specyfikacji sprzętu (zarówno w przypadku komputerów, jak i smartfonów) w przedziałach cen średnich i wysokich. Jednak w związku z tym na rynku pojawiają się również w znacznie niższych cenach modele z wcześniejszych lat - nie posiadające już tak imponującej specyfikacji, ale z ceną mogącą skusić wielu klientów (szczególnie jeżeli nie są to osoby śledzące dany rynek). Podobną tendencję można zauważyć w przypadku połączenia internetowego. Na obszarach, gdzie wcześniej była już łączność z internetem prawdopodobnie aktualnie jest ona jeszcze lepsza, jednak pojawiają się ona również na obszarach, na których nie była wcześniej dostępna. Tam jednak połączenie nie zawsze jest wystarczająco szybkie i stabilne jak na obecne standardy.

![](https://lh4.googleusercontent.com/0xZB9dbKKuzzGRdh8DIU68gX5Lon8Ov9Q2xLmcigfwBDSbuAqCYLF1Ihvh3AlgS6A-8VG02pwQ4v3ye9uDKKkCzzx3xnQvISTddahpy9f4juOtEhnU5fuu1XXXWwTqqjhh2ky272 "Zalety i wady renderowania po stronie klienta")

![](https://lh3.googleusercontent.com/rdhmMCn8Jb-WpUE2gDTLh5VdU-zw4GebC-gIsNtfu0VW3lrsjf6vRGoTAZgEq3oUvoN2yWDbT6BngAgAHoAE0qvkAkxgKkC_BXvwNSD083rYebHWbisjYDRUvycdDu2d_-356AHl "Schemat renderowania po stronie serwera")

**Innym** popularnym podejściem jest tworzenie stron **renderowanych po stronie serwera** aplikacji. Podejście to jest podobne do aplikacji webowych z okresu przed spopularyzowaniem framweorków frontendowych. Wcześniej jednak proces renderowania strony odbywał się poprzez wstrzykiwanie danych do template`u (np ejs) zazwyczaj w ramach tej samej aplikacji, która była odpowiedzialna za dostarczenie tych danych. Aktualne rozwiązania pozwalają odseparować backend od frontendu, co niesie za sobą wiele potencjalnych korzyści. W tym przypadku sam proces renderowania strony przez Javascript z “pustego” pliku html wygląda podobnie jak w przypadku SPA, z tą różnicą, że odbywa się on nie po stronie klienta, a na serwerze aplikacji. Pozwala to zachować zalety stron SPA związane z dużą elastycznością i możliwością renderowania treści na podstawie dynamicznie zmieniających się danych. Dodatkowo ze względu na to, że z punktu widzenia klienta dostarczane strony (pliki html) od razu zawierają pełną treść witryny korzystające z tego mechanizmu mogą być lepiej pozycjonowane w wynikach wyszukiwania od podobnych stron renderowanych po stronie klienta. Wadą tego typu rozwiązania jest to, że ze względu na zawartość stron generowaną na serwerze i przesyłaną do klienta w oddzielnych plikach html tracimy możliwość zapewnienia użytkownikowi doświadczeń zbliżonych do tych znanych z aplikacji natywnych. Dodatkowo przeniesienie renderowania na serwer z jednej strony odciąża przeglądarkę klienta, ale wymaga wyboru hostingu pozwalającego na dynamiczne renderowanie stron na serwerze. Wraz ze zwiększeniem ruchu na stronie koszt utrzymania serwera o wydajności zapewniającej zadowalająca wydajność może wzrosnąć.

![](https://lh4.googleusercontent.com/G5L2HcEbcurKjobymzH6kaYBsHSF_HRSZmetdOdLusz7ftKBptqkU2HGHuuYddwkZpzJMbc39FYoO1kgQKTbVw96zihGZ4rmSKSITIUQx8miM5uXG1SwWn5i0Lv53KPhHofMpydf "Zalety i wady renderowania po stronie serwera")

![](https://lh4.googleusercontent.com/h3EeDmkJ5wRQr7GNDJhIGuBQN66HIT8Nuv7e_bapw_rhlfULXri6XnBKpXZzql1CRP0_ahdcU4_YXJbUk9L8G4B0V5ERH8T9yI8U2oldH_XJN31IKzdSO1bs4uqcxd8WKoNwvC-_ "Schemat strony statycznej")

**Ostatnim** omówionym w tym poście podejściem jest korzystanie z **generatorów stron statycznych**. W przypadku tego typu rozwiązań efekt końcowy jak wskazuje nazwa jest zbliżony do strony statycznej. Gotowe pliki html z pełną treścią są przechowywane na serwerze i wysyłane w odpowiedzi na zapytania użytkownika. Pozwala to na poprawienie SEO witryny przy zachowaniu możliwości korzystania z taniego hostingu. Jednak w przeciwieństwie do tradycyjnego podejścia, gdzie każda strona musiała zostać stworzona ręcznie przez programistę, generatory stron statycznych pozwalają na pracę przy pomocy danego frameworku i wybranego źródła danych. Sama praca nad projektem jest więc bardzo zbliżona do poprzednich metod, a różnica w ostatecznym działaniu strony wynika ze zmian zachodzących podczas budowania aplikacji. Generatory stron statycznych podczas budowania nie tworzą jednego pliku html, który jest dopiero później przekształcany przez aplikacją Javascript, a oddzielne pliki html dla każdej podstrony. Tworzone w ten sposób strony nalał mogą korzystać z wielu przydatnych rozwiązań powstałych w oparciu o bazowe frameworki (np. aplikacja Gatsby.js może korzystać z rozszerzeń do Reacta). Takie rozwiązanie pozwala czerpać z wielu zalet stron statycznych przy zachowaniu narzędzi ułatwiających zarządzanie zawartością strony. Posiada ono jednak pewien mankament. Wprowadzenie zmian na stronie wymaga nie tylko wprowadzenia zmian w bazowym źródle danych, ale również ponownego zbudowania aplikacji, więc nie będzie to dobre rozwiązanie dla witryn z dynamicznie zmieniającą się zawartością. W przypadku, gdy nie zależy nam na częstym zmienianiu danych wyświetlanych na stronie można zdecydować się na przechowywanie treści w repozytorium projektu (na przykład w formacie **markdown**). Istnieją rozwiązania pozwalające znacznie ułatwić zarządzanie nawet dużą ilością danych przechowywanych w ten sposób. Takie podejście określane jest stosem technologicznym **JAM** (JavaScript, API, Markdown).

![](https://lh6.googleusercontent.com/AC_MXnaCBsgPl5ZGs0XxgNJKkRafXG2Cl6T1ld4-kAtqDVH2qDIDpp7RSRYXRgS3n0s0EGA1q2GTLmYLD5SjUEB0iOh6ucHybtUcOiOkbzZuZiKK4O6ZtRxURIfwnSB4we2Xt10Q "Zalety i wady strony statycznej")

**Reasumując**: popularne obecnie narzędzia do tworzenia stron internetowych dają nam możliwość wyboru spośród różnych metod dostarczania treści do użytkownika. Każda z tych metod posiada zalety i wady. Wyboru należy dokonać w oparciu o treści publikowane na stronie i grupę docelowych odbiorców. Niezależnie od publikowanych treści i grupy docelowej warto korzystać z narzędzi audytujących stronę, które wskazują problemy i proponujących usprawnienia w obszarach takich jak optymalizacja SEO, dostępność i wydajność.

Źródła:

1. **Academind** - Dynamic Websites vs Static Pages vs Single Page Apps (SPAs) - <https://www.youtube.com/watch?v=Kg0Q_YaQ3Gk>
2. **Academind** - SPAs vs MPAs/MVC - Are Single Page Apps always better? - <https://www.youtube.com/watch?v=F_BYg2QGsC0>
3. **Snipcart** - SPA SEO: A Single-Page App Guide to Google’s 1st Page - <https://snipcart.com/spa-seo>