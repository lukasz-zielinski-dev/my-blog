---
templateKey: blog-post
title: Podstawy Gatsby.js cz.1 - struktura projektu, pobieranie danych przy
  pomocy GraphQL, tworzenie stron na podstawie plików markdown.
date: 2020-09-27T13:00:00.000Z
description: Jak stworzyć pierwszy projekt w Gatsby.js? Jak poruszać się po
  strukturze projektu, korzystać z narzędzi znanych z React.js i plugów
  Gatsbt.js w celu stworzenia strony pobierającej dane z plików markdown?
featuredpost: true
featuredimage: /img/blog-2020.09.27-00.png
tags:
  - generatory stron statycznych
  - Gatsby.js
  - React.js
  - GraphQL
  - JAM
  - markdown
---
![Strona](/img/blog-2020.09.27-00.png "Strona")

W pierwszym poście na tym blogu pisałem o popularnych sposobach tworzenia stron internetowych. Jednym z przedstawionych tam podejść były generatory stron statycznych. W tym poście postaram się przyjrzeć dokładniej generatorowi stron statycznych opartemu o React.js - Gatsby.js. W tym wpisie omówię:

* Główne założenia i technologie, na których opiera się Gatsby.js
* Strukturę startowego projektu
* Tworzenie nowych stron w Gatsby.js i linkowanie między nimi
* Korzystanie z bibliotek znanych z React.js
* Korzystanie z pluginów Gatsby.js
* Pobieranie danych przy pomocy GraphQL
* Przetwarzanie i wyświetlanie sformatowanych treści z plików markdown na stronie



Gatsby jest generatorem stron statycznych, co oznacza, że podczas budowania aplikacji na każdą podstronę generowany jest oddzielny plik html. Gotowe pliki pliki są następnie przechowywane na serwerze i wysyłane w odpowiedzi na zapytania dotyczące danej podstrony. Słowo “statyczny” odnosi się tu jedynie do sposobu generowania plików html, a nie do samego sposobu działania strony. Co prawda strony tworzone w oparciu o Gatsby\`ego są przechowywane na serwerze i przesyłane do klienta jak proste strony statyczne. Jednak tak naprawdę są to aplikacje budowane z pomocą React\`a dzięki czemu mamy możliwość wprowadzania zmian w DOM na podstawie dynamicznie zmieniających się danych z API. W przypadku stron tworzonych za pomocą Gatsby`ego część pracy związana z wygenerowaniem treści pliku html na podstawie szablonów i danych ze źródeł zewnętrznych wykonywana jest jeden raz w trakcie budowania projektu, a nie każdorazowo przy zapytaniu skierowanym na dany adres. Pozwala to odciążyć przeglądarkę użytkownika (w stosunku do stron CSR) lub serwer aplikacji (w stosunku do stron SSR).



W trybie deweloperskim, oraz podczas budowania aplikacji Gatsby korzysta z środowiska Node.js. Daje to duże możliwości. Podczas pobierania danych do wygenerowania stron oprócz korzystania z różnego rodzaju headless CMS`ów mamy możliwość wybrania zasobów przechowywanych lokalnie na przykład plików w formacie csv, albo markdown. Pozwala to na tworzenie aplikacje w stosie technologicznym JAM z plikami markdown przechowywanymi w repozytorium.



Dzięki wykorzystywaniu Node`a Gatsby ma możliwość uzyskania dostępu do różnych źródeł danych. W celu wyszukiwania i filtrowania danych wykorzystywany jest GraphQL. Jest to standard pozyskiwania danych, który w ostatnim czasie zyskuje dużą popularność. Adresuje on wady standardu REST i proponuje rozwiązania zapewniające większą elastyczność.



Ważnym aspektem pracy z Gatsby.js są dostępne pluginy pozwalające w bardzo prosty i efektywny sposób rozwiązać wiele problemów występujących podczas tworzenia strony. Dzięki temu tworzenie stron w oparciu o Gatsby. js jest bardzo szybkie i intuicyjne. W dalszej części wpisu postaram się przedstawić przykładowy proces tworzenia strony w oparciu o pliki markdown z wykorzystaniem popularnych bibliotek znanych z Reacta.



Przed przystąpieniem do pracy z Gatsby`m należy zainstalować (o ile ich już nie posiadamy) dwa programy:

* Node.js <https://nodejs.org/>
* Git <https://git-scm.com/downloads>



Następnie przy pomocy linii poleceń (np. Git Bash) należy zainstalować gatsby-cli

```shell
npm install -g gatsby-cli
```

Następnie należy skopiować projekt startowy:

```shell
gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
```

W tym momencie starter projektu Gatsby.js powinien zostać już skopiowany na nasz dysk. Po wejściu do katalogu projektu zobaczymy taką strukturę:

![Struktura folderów](/img/blog-2020.09.27-01.png "Struktura folderów")

Podczas pracy z projektem najważniejsze będą:

* **\public** - folder, w którym po wykonaniu polecenia “gatsby build” pojawi się gotowa aplikacja
* **\src\pages** - folder, w którym przechowywane są szablony stron
* **\static** - folder do przechowywania zasobów statycznych
* **gatsby-config.js** - główny plik konfiguracyjny projektu



Po uruchomieniu wersji deweloperskiej aplikacji

```shell
gatsby develop
```

powinniśmy zobaczyć tak wyglądającą odpowiedź:

![Odpowiedź konsoli po uruchomieniu aplikacji](/img/blog-2020.09.27-02.png "Odpowiedź konsoli po uruchomieniu aplikacji")

Na jej końcu są dwa linki dwa linki:

* <http://localhost:8000/> - prowadzący do aplikacji
* [http://localhost:8000/___graphql](http://localhost:8000/___graphql) - prowadzący do GraphQL`owego eksploratora zasobów



Kliknięcie w pierwszy link przekierowuje do strony startowej:

![Strona startowa](/img/blog-2020.09.27-03.png "Strona startowa")

Odpowiedzialny za nią jest plik **src\pages\index.js**

```javascript
src\pages\index.js
 
import React from "react"
 
export default function Home() {
  return <div>Hello world!</div>
}
 

```

Próbując odwiedzić inny adres np <http://localhost:8000/foo> otrzymamy stronę 404:

![Strona 404](/img/blog-2020.09.27-04.png "Strona 404")

W celu dodania nowej strony - tak, aby obsłużyć na przykład zapytania skierowane na adres <http://localhost:8000/foo> należy dodać nowy szablon strony. Strona będzie dostępna pod adresem odpowiadającym nazwie pliku, więc w tym przypadku powinniśmy stworzyć nowy plik: **src\pages\foo.js**:

```javascript
src\pages\foo.js
 
import React from "react"
 
export default function Foo() {
  return <div>Foo page!</div>
}
 
```

Teraz odwiedzając adres <http://localhost:8000/foo> zamiast strony 404 otrzymamy:

![Strona foo](/img/blog-2020.09.27-05.png "Strona foo")

Po stworzeniu drugiej strony można dodać możliwość przechodzenia pomiędzy nimi. W tym celu można użyć zawartego w Gatsbym komponentu **Link**. Wystarczy zaimportować go w pliku z szablonem strony i skorzystać z tego komponentu w następujący sposób:

```javascript
src\pages\foo.js

import React from "react"
import { Link } from "gatsby"
 
export default function Foo() {
  return (
    <>
      <div>Foo page!</div>
      <button>
        <Link to="/">Go to index</Link>
      </button>
    </>
  )
}
 
```

```javascript
src\pages\index.js

import React from "react"
import { Link } from "gatsby"
 
export default function Home() {
  return (
    <>
      <div>Hello world!</div>
      <button>
        <Link to="/foo">Go to foo page page</Link>
      </button>
    </>
  )
}
 
```

Dzięki temu użytkownik uzyska możliwość przechodzenia między podstronami.

![Linkowanie między stronami](/img/blog-2020.09.27-06-link.gif "Linkowanie między stronami")

Teraz, gdy strona posiada podstawowe funkcje można zająć się poprawą jej wyglądu. Przydatne w tym celu mogą okazać się znane z React`a biblioteki komponentów: **Material-UI** i biblioteki ułatwiającej zarządzanie stylami komponentów: **Styled Component**s W celu instalacji tych narzędzi należy wykonać następujące komendy:

```shell
npm install @material-ui/core --save

npm install @material-ui/icons --save

npm install styled-components --save
```

Strona posiada możliwość przechodzenia między podstronami. Dobrym miejscem do umieszczenia tego typu akcji może być **górna belka**. Jest to komponent, który będzie powtarzał się na wszystkich podstronach w związku z czym warto go **wydzielić do osobnego szablonu**. Przy okazji można stworzyć **style globalne** zapewniające minimalną wysokość i usuwające margines i padding z body:

```javascript
src\components\GlobalStyles.js
 
import { createGlobalStyle } from 'styled-components';
 
const GlobalStyles = createGlobalStyle`
  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
`;
 
export default GlobalStyles;

```

Komponent zawierający górną belkę nawigacji opakowujący wszystkie strony wygląda następująco:

```javascript
src\components\Layout.js
 
import React from "react"
import { Link } from "gatsby"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import FilterVintageIcon from "@material-ui/icons/FilterVintage"
import Button from "@material-ui/core/Button"
import styled from "styled-components"
 
import GlobalStyles from "../components/GlobalStyles"
 
const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`
const StyledTitle = styled.h1`
  flex-grow: 1;
`
const StyledContent = styled.div`
  min-height: 100%;
  margin: 0;
  padding: 0;
  flex-grow: 1;
`
const Layout = ({ children }) => {
  return (
    <StyledWrapper>
      <GlobalStyles />
      <AppBar position="static">
        <Toolbar>
          <StyledTitle>
            <StyledLink to="/">Gatsby - poligon testowy</StyledLink>
          </StyledTitle>
          <StyledLink to="/foo">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FilterVintageIcon />}
            >
              Foo
            </Button>
          </StyledLink>
        </Toolbar>
      </AppBar>
      <StyledContent>{children}</StyledContent>
    </StyledWrapper>
  )
}
 
export default Layout

```

W celu poprawy wyglądu do strony można na przykład dodać grafiki ze strony [undraw.co](https://undraw.co/).

Obie strony (index i foo) zostały zapakowałem w wcześniej przygotowany komponent i wstępne ostylowane:

```javascript
src\pages\index.js
 
import React from "react"
import styled from "styled-components"
 
import Layout from "../components/Layout"
import welcomeImage from "../../static/undraw_welcome_cats_thqn.png"
 
const StyledWelcomeImage = styled.div`
  background-image: url(${welcomeImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
 
  width: 70vw;
  min-height: calc(619/1129*70vw);
 
  margin: 50px auto;
`
 
export default function Home() {
  return (
    <Layout>
        <StyledWelcomeImage></StyledWelcomeImage>
    </Layout>
  )
}
 
```

```javascript
src\pages\foo.js
 
import React from "react"
import Layout from "../components/Layout"
 
import styled from "styled-components"
 
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
 
export default function Foo() {
  return (
    <Layout>
      <StyledContainer>
        <h1>Foo page!</h1>
      </StyledContainer>
    </Layout>
  )
}

```

Tak wyglądał uzyskany rezultat:

![Górna belka nawigacji](/img/blog-2020.09.27-07-ui.gif "Górna belka nawigacji")

Po wstępnym ostylowaniu stron przyszedł czas by zająć się tworzeniem zawartości strony w oparciu o pliki markdown. Pliki będą przechowywane w źródłach projektu, więc potrzebny będzie dostęp do nich z poziomu aplikacji. Dodatkowo konieczne będzie przekształcenie treści pliku markdown tak, aby można było umieścić ją w szablonie html. Przydatne będą pluginy **gatsby-source-filesystem** i **gatsby-transformer-remark**. W celu ich instalacji, należy w linii poleceń wpisać następujące komendy:

```shell
npm install gatsby-source-filesystem --save

npm install gatsby-transformer-remark --save
```

Po instalacji należy również dodać odpowiednie wpisy w pliku konfiguracyjnym wskazujące wykorzystywane pluginy, oraz definiujące lokalizację plików:

```javascript
gatsby-config.js
 
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/data/`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}

```

Po zainstalowaniu pluginów i wskazaniu ich w konfiguracji aplikacji stworzyłem dwa pliki markdown i umieściłem je we wskazanym w konfiguracji folderze:

```markdown
data\test-markdown.md
 
---
title: "Testowy plik markdown"
date: "2020-09-25"
---
 
## Hej!
 
To testowy plik **markdown**.
Dzięki pluginowi `gatsby-transformer-remark` jego zawartość zostanie zamieniona w html.
 
 - Lista
 - testowa
 
~~Nieaktualne~~
 
![Photo by Charles Deluvio](https://images.unsplash.com/photo-1530041539828-114de669390e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)
 
*Photo by Charles Deluvio from [https://unsplash.com](https://unsplash.com/photos/lJJlaUWYrPE)*

```

```markdown
data\another-test-markdown.md
 
---
title: "Kolejny plik markdown"
date: "2020-09-26"
---
 
## Witaj znowu!
 
To drugi testowy plik **markdown**.
 
![Photo by Charles Deluvio](https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)
 
*Photo by Liudmyla Denysiuk from [https://unsplash.com](https://unsplash.com/photos/iJ9o00UeAWk)*
 
```

Z poziomu szablonu strony “foo” za pomocą GraphQL pobrałem posortowane po dacie wszystkie pliki markdown ze wskazanej w konfiguracji lokalizacji. Następnie otrzymane dane z plików markdown (przetransformowane do html`a) wstrzyknąłem do szablonu strony:

```javascript
src\pages\foo.js
 
import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
 
import styled from "styled-components"
 
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
 
export default function Foo({ data }) {
  return (
    <Layout>
      <StyledContainer>
        <h1>Foo page!</h1>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3>
              {node.frontmatter.title}{" "}
              <span>
                — {node.frontmatter.date}
              </span>
            </h3>
            <div dangerouslySetInnerHTML={{ __html: node.html}} />
            <hr />
          </div>
        ))}
      </StyledContainer>
    </Layout>
  )
}
 
export const query = graphql`
  query {
    allMarkdownRemark(sort: {order: ASC, fields: frontmatter___date}) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
          }
          html
        }
      }
    }
  }
`

```

Ostatecznie uzyskany efekt wygląda następująco:

![Strona generowana na podstawie plików markdown](/img/blog-2020.09.27-08-md.gif "Strona generowana na podstawie plików markdown")

Strona dostępna jest pod adresem:

<https://gatsby-poligon-testowy.netlify.app/>

Wraz z pojawianiem się kolejnych wpisów z tej serii stan strony może różnić się od przedstawionego w tym poście.



Źródła projektu dostępne są pod adresem:\
<https://github.com/lukasz-zielinski-dev/gatsby-starter-example>



Na tym kończę część pierwszą przedstawienia Gatsby.js, w części drugiej postaram się dokładniej omówić:

* Tworzenie oddzielnych stron pew plik markdown.
* Pobieranie danych z lokalnych plików csv
* Integrację z zewnętrznym API



Źródła:

* GraphQL - <https://www.howtographql.com>
* Dokumentacja Gatsby.js - <https://www.gatsbyjs.com/tutorial>