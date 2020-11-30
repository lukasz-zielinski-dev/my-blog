---
templateKey: blog-post
title: Podstawy Gatsby.js część 3. - Netlify i Netlify CMS.
date: 2020-11-29T23:53:36.583Z
description: >
  W tym wpisie przedstawię narzędzie do zarządzania treścią przechowywaną w
  źródłach projektu - Netlify CMS wraz z przykładową konfiguracją dla projektu
  Gatsby.js. Pozwoli ono odseparować proces wprowadzania zmian w treściach
  publikowanych na stronie od zmian o charakterze programistycznym. Dodatkowo ze
  względu na wygodna konfiguracje CMS`a w oparciu o usługę hostingowa Netlify
  przedstawię również proces publikacji strony na Netlify.
featuredpost: true
featuredimage: /img/blog-2020.11.29-00.jpg
tags:
  - Gatsby.js
  - Netlify
  - Netlify CMS
  - markdown
---
![Tytuł](/img/blog-2020.11.29-00.jpg "Tytuł")

Netlify CMS to oprogramowanie open source stworzone przez firmę Netlify w celu umożliwienia wygodnego zarządzania treściami publikowanymi na witrynach wykorzystujących generatory stron statycznych. Nie jest ono częścią usługi związanej z hostingiem Netlify, jednak bardzo dobrze z nim współpracuje. Dlatego w ramach tego wpisu oprócz konfiguracji samego CMS`a skupię się również na procesie publikacji strony za pomocą hostingu Netlify. Przedstawiony tu proces będzie dotyczył publikacji strony z projektu przechowywanego na Github.

Na początku należy założyć konto w usłudze [Netlify](https://www.netlify.com/). Następnie należy wybrać opcję "New site from Git".

![Nowa strona](/img/blog-2020.11.29-01.jpg "Nowa strona")

Wybrać swojego dostawcę usługi, zalogować się i wskazać repozytorium. Na tym etapie można ustawić kilka parametrów takich jak: 

* Branch, z którego chcemy publikować treści.
* Polecenie budujące projekt.
* Folder do którego publikowany będzie gotowy projekt.

Jeżeli wszystkie opcje są ustawione prawidłowo można je zatwierdzić klikając "Deploy site".

![Nowa strona](/img/blog-2020.11.29-02.jpg "Nowa strona")

Po zakończeniu tego kroku nasza strona powinna być dostępna w sieci. Warto jednak w tym momencie wykonać kilka czynności, które umożliwią wygodne korzystanie z Netlify CMS. Na początku można przejść do zakładki "Site settings" i w panelu "Identity" wybrać opcję "Enable Identity".

![Konfiguracja Netlify - Identity](/img/blog-2020.11.29-03.jpg "Konfiguracja Netlify - Identity")

Po włączeniu usługi Identity pojawi się kilka opcji jej konfiguracji na początku warto przejść do opcji "Registration" i zmienić ją na "Invite only". Dzięki temu ograniczymy dostęp do naszego CMS'a tylko do osób zaproszonych.

![Konfiguracja Netlify - Registration](/img/blog-2020.11.29-04.jpg "Konfiguracja Netlify - Registration")

Dodatkowo warto przejść do zakładki "Services" i wybrać opcje "Enable Git Gateway" - która umożliwi CMS'owi wprowadzanie zmian w źródłach projektu przechowywanych na zewnętrznym repozytorium.

![Konfiguracja Netlify - Enable Git Gateway](/img/blog-2020.11.29-05.jpg "Konfiguracja Netlify - Enable Git Gateway")

Po skonfigurowaniu usługi Netlify możemy założyć sobie konto przechodząc do panelu "Identity" i wybierając opcje "Invite user".

![Netlify - Invite User](/img/blog-2020.11.29-06.jpg "Netlify - Invite User")

**Uwaga** na tym etapie (przed skonfigurowaniem Netlify CMS w projekcie Gatsby.js i wypchnięciem zmian na zewnętrzne repozytorium) dokończenie zakładania nowego konta nie będzie możliwe.

W celu dodania Netlify CMS do projektu Gatsby.js należy dodać dwie zależności: `netlify-cms-app`  i `gatsby-plugin-netlify-cms`.

#### **`node`**

```shell
npm install --save netlify-cms-app gatsby-plugin-netlify-cms 
```

Dodatkowo warto dodać plugin `gatsby-remark-copy-linked-files` - nie jest on wymagany, ale przyda się jeżeli zdecydujemy się na przechowywania grafik w źródłach projektu, a nie jako odnośniki do zewnętrznych zasobów.

#### **`node`**

```shell
npm install --save gatsby-remark-copy-linked-files
```

Po zainstalowaniu pluginów należy zadeklarować je w pliku konfiguracyjnym projektu. Na tym etapie zdecydowałem się również na zmianę nazwy folderu przechowującego pliki z postami z 'data' na 'content'.

#### **`gatsby-config.js`**

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        // zmieniona ścieżka 
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // nowy plugin
        plugins: [
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [],
            },
          },
        ],
      },
    },
    // nowy plugin
    `gatsby-plugin-netlify-cms`,
  ],
}
```

W powyższym przykładzie:

* Zmieniłem ścieżkę w konfiguracji pluginu `gatsby-source-filesystem`.
* Dodałem plugin `gatsby-remark-copy-linked-files` jako rozszerzenie wcześniej zadeklarowanego pluginu `gatsby-transformer-remark`. Odpowiada on za kopiowanie do folderu `static` plików, do których odniesienia znajdują się w plikach markdown. Dzięki temu ostatecznie utworzony plik html nie będzie próbował odwoływać się do nie istniejącego zasobu.
* Dodałem plugin `gatsby-plugin-netlify-cms`.

Dla pluginu `gatsby-plugin-netlify-cms` stworzyłem plik konfiguracyjny:

#### **`static\admin\config.yml`**

```yaml
backend:
  name: git-gateway
  branch: master

media_folder: static
public_folder: /

collections:
  - name: "blog"
    label: "Blog"
    folder: "content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    path: "{{title}}/index"
    editor:
      preview: false
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Description", name: "description", widget: "string" }
      - { label: "Body", name: "body", widget: "markdown" }
```

W sekcji `backend` zadeklarowałem sposób w jaki CMS będzie miał dostęp do plików źródłowych projektu (git-gateway) i branch, na którym będzie operował (master). Ta konfiguracja jest odpowiednia dla projektów hostowanych przy pomocy Netlify, w przypadku innego hostingu konfiguracja ulegnie zmianie.

Pole `media_folder` odpowiada za lokalizację do której będą trafiały uploadowane przez nas pliki (w przypadku obrazków z postów wartość ta zostaje jednak nadpisana przez lokalizacje pliku z postem - dlatego korzystam z pluginu `gatsby-remark-copy-linked-files`).

Pole `public_folder` określa w jaki sposób będą adresowane zasoby w plikach markdown. Aktualnie będą one wskazywane bezpośrednio np. 

#### **`test.md`**

```markdown
![husky](blog-husky.jpg "husky")
```

Ostatnią deklaracją w pliku są kolekcje, którymi CMS będzie zarządzał. W tym przypadku jest to jedna kolekcja nazwana 'blog' przechowywana w folderze `content/blog/[tytul-wpisu]` wraz z obrazkami wykorzystywanymi w pliku markdown. Każdy obiekt tej kolekcji posiada cztery pola:

* title - tytuł uzupełniany przy pomocy pola tekstowego (widget: "string").
* date - datę publikacji uzupełnianą przy pomocy kontrolki daty i czasu (widget: "datetime").
* description - opis uzupełniany przy pomocy pola tekstowego (widget: "string").
* body - treść pliku markdown uzupełnianą przy pomocy edytora markdown (widget: "markdown").

W pliku `gatsby-node.js` zmodyfikowałem ścieżkę 'slug' - przy obecnej konfiguracji CMS'a przedrostek /blog będzie dodawany automatycznie ze względu na strukturę folderów zadeklarowana w konfiguracji CMS (`static\admin\config.yml`).

#### **`gatsby-node.js`**

```javascript
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      // usunięty przedrostek /blog
      value: `${slug}`,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
```

Po wypchnięciu tych zmian na zewnętrzne repozytorium można przystąpić do dokończenia zakładania konta zarządzającego CMS'em. Na tym etapie powinniśmy już otrzymać link umożliwiający potwierdzenie założenia konta. Po zakończeniu tej procedury będziemy mogli korzystać z panelu administracyjnego Netlify CMS. Będzie on dostępny pod adresem: *`[adres naszej strony]/admin`*.

![Netlify CMS](/img/blog-2020.11.29-07.jpg "Netlify CMS")

Po wejściu do panelu administracyjnego powinniśmy mieć możliwość zarządzania zdefiniowanymi kolekcjami. Wybierając opcję "New Blog" przejdziemy do ekranu umożliwiającego dodanie nowego wpisu:

![Netlify CMS](/img/blog-2020.11.29-08.jpg "Netlify CMS")

Po uzupełnieniu wszystkich wymaganych pól możemy opublikować post. Spowoduje to automatyczne wykonanie akcji commit i push na naszym repozytorium. W połączeniu z domyślnymi ustawianiami hostingu Netlify wywoła to akcję automatycznego zbudowania i opublikowania nowego projektu.

Reasumując: powyższy wpis przedstawia konfigurację hostingu Netlify i Netlify CMS pozwalająca na wygodne zarządzanie treścią publikowaną na stronie. Netlify CMS jest narzędziem niezależnym od hostingu Netlify, jednak bardzo dobrze z nim współpracującym.

Strona dostępna jest pod adresem: <https://gatsby-poligon-testowy.netlify.app/>

Wraz z pojawianiem się kolejnych wpisów z tej serii stan strony może różnić się od przedstawionego w tym poście.

Źródła projektu dostępne są pod adresem: <https://github.com/lukasz-zielinski-dev/gatsby-starter-example>

Źródła:

* [Netlify CMS - dokumentacja](https://www.netlifycms.org/docs/intro/)