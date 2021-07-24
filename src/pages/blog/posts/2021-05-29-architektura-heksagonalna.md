---
templateKey: blog-post
title: Architektura heksagonalna.
date: 2021-05-29T14:36:41.210Z
description: Wpis ma za zadanie omówienie podstawowych założeń architektury heksagonalnej.
featuredpost: false
featuredimage: /img/blog-2021.05.29-00.png
tags:
  - programowanie
  - backend
  - architektura
---
![Tytuł](/img/blog-2021.05.29-00.png "Tytuł")

Podczas rozwijania projektu należy liczyć się z koniecznością adaptacji do zmieniających się wymagań. Zmiany mogą być wymuszane przez kwestie techniczne. Przykładem takiego czynnika może być zmiana api w nowej wersji wykorzystywanego narzędzia. Innym źródłem zmian są wymagania biznesowe. Szczególnie w przypadku młodych projektów wymagania biznesowa mogą dynamicznie ewoluować. W takich przypadkach zadaniem programisty jest dostosowanie aktualnej logiki do nowych wymagań. Czasami tego typu zmiany będą sprzeczne z dotychczas przyjmowanymi założeniami i mogą wymagać większych zmian w kodzie aplikacji. W takich przypadkach pojawia się ryzyko wprowadzania błędów regresji. Rozwiązaniem tego problemu może być zapewnienie dobrego pokrycia testami, ale to nie zawsze jest proste, szczególnie w przypadkach gdy logika biznesowa opiera się w dużym stopniu na stanie systemu i innych serwisów.

![Poplątana architektura aplikacji](/img/blog-2021.05.29-01.png "Poplątana architektura aplikacji")

Rozwiązaniem tych problemów może być architektura heksagonalna. Z założenia pozwala ona na separację logiki biznesowej (tego co mamy zrobić) od szczegółów implementacji technicznych (w jaki sposób to robimy). Pozwala to na wygodne wprowadzanie zmian dotyczących aspektów technicznych, które są odseparowane od logiki biznesowej aplikacji. Dodatkowo daje to możliwość łatwiejszego testowania logiki biznesowej, która sama w sobie nie jest zależna od szczegółów technicznych.

![Architektura heksagonalna](/img/blog-2021.05.29-02.png "Architektura heksagonalna")

Architektura heksagonalna nazywana również architekturą portów i adapterów zakłada odseparowanie logiki biznesowej od technicznych szczegółów implementacji (sposobu komunikacji, framework'ów, baz danych). Logika biznesowa nie powinna posiadać zależności od tych szczegółów. Komunikacja między logiką biznesową a obszarami odpowiedzialnymi za implementację zagadnień technicznych powinna odbywać się za pośrednictwem portów.

![Porty i adaptery](/img/blog-2021.05.29-03.png "Porty i adaptery")

Porty stanowią miejsce w którym logika biznesowa styka się z pozostałą częścią aplikacji. Pozwalają one zarówno na transfer informacji z zewnątrz do domeny jak i w drugą stronę. Z założenia określają jedynie sposób komunikacji (np. poprzez zdefiniowanie interfejsu), nie wiedzą o konkretnej implementacji - adapterach.

Adaptery mają za zadanie przekształcenie i dostosowanie informacji w taki sposób, aby umożliwić komunikacje między logiką biznesową a pozostałymi elementami aplikacji (REST api/baza danych/message broker/integracja z innym systemem/implementacja mechanizmu wysyłania powiadomień). W zależności od obsługiwanego kierunku wyróżnia się adaptery wejścia i wyjścia. Adaptery wejścia (primary) mają za zadnie tłumaczenie informacji przychodzących z zewnątrz do domeny, tak, aby plasowały do zdefiniowanego przez port interfejsu. Adaptery wyjścia (secondary) dostosowują sposób przekazywanej informacji zdefiniowany przez port do tego wymaganego przez elementy zewnętrzne (np. mogą tłumaczyć model danych z domeny na model warstwy persystencji i zapisywać go).

![Porty i adaptery](/img/blog-2021.05.29-04.png "Porty i adaptery")

Dzięki takiemu podejściu jest możliwe uzyskanie warstwy logiki biznesowej niezależnej do framework'a, ani konkretnego szczegółu implementacji. Takie strukturyzowanie kodu może wymagać na początku większego nakładu pracy, a w trakcie jego rozwijania dyscypliny. Jednak korzyści płynące z architektury heksagonalnej powinny to zrekompensować. Kod biznesowy niezależny od szczegółów implementacji, ani od framework'ów powinien być łatwy w testowaniu. Zmiana implementacji dowolnego z szczegółów technicznych powinna dotykać tylko obszaru konkretnego adaptera odpowiedzialnego za to zadanie.

Reasumując: w poście zostały przedstawione podstawowe założenia architektury heksagonalnej. Stosowanie takiego sposobu organizacji kodu jak większość "dobrych praktyk" wymaga pewnego nakładu pracy i dyscypliny, jednak przynosi korzyści podczas dalszego rozwijania projektu. W jednym z kolejnych wpisów postaram się przedstawić analizę prostego projektu wykorzystującego tę architekturę.

Źródła:

* [blog.allegro.tech - Hexagonal Architecture by example - a hands-on introduction](https://blog.allegro.tech/2020/05/hexagonal-architecture-by-example.html)
* [jivimberg.io - Hexagonal Architecture on Spring Boot](https://jivimberg.io/blog/2020/02/01/hexagonal-architecture-on-spring-boot/)
* [Robert Cecil Martin - Czysta architektura.](https://lubimyczytac.pl/ksiazka/4852556/czysta-architektura-struktura-i-design-oprogramowania-przewodnik-dla-profesjonalistow)