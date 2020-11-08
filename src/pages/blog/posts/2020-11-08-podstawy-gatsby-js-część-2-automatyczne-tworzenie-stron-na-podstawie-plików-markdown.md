---
templateKey: blog-post
title: Podstawy Gatsby.js część 2. - automatyczne tworzenie stron na podstawie
  plików markdown.
date: 2020-11-08T12:53:49.720Z
description: W tym wpisie omówię jak w prosty sposób można skonfigurować projekt
  Gatsby.js, tak  aby podczas budowania projektu automatycznie generować nowe
  strony na podstawie plików markdown.
featuredpost: true
featuredimage: /img/blog-2020.11.08-00.png
tags:
  - generatory stron statycznych
  - Gatsby.js
  - React.js
  - GraphQL
  - JAM
  - markdown
---
![Tytuł](/img/blog-2020.11.08-00.png "Tytuł")

W poprzednim wpisie z tej serii przedstawiłem proces tworzenia prostej strony przy pomocy Gatsby.js, oraz wyświetlenie danych z plików markdown. Był to bardzo uproszczony przykład. Co prawda posty renderowały się automatycznie na podstawie plików markdown i dodanie kolejnego wpisu na wymagało jedynie dodania kolejnego pliku i ponownego zbudowania aplikacji. Problemem jednak było to, że wszystkie posty wyświetlały się na jednej stronie, a nie na na osobnych podstronach jak ma to miejsce w większości blogów. Takie rozwiązanie mogłoby być dobre dla strony będącej spisem wszystkich postów, ale nie sprawdzi do prezentacji pełnej treści wpisów. W celu rozwiązania tego problemu należy tworzyć oddzielne strony dla każdego posta zapisanego w pliku markdown.

W tym celu będzie trzeba wykonać kilka czynności:

* Podczas budowania aplikacji wyciągnąć wszystkie pliki markdown z postami.
* Dla każdego posta strwożyć unikatowy identyfikator (slug).
* Dla każdego posta wygenerować nową stronę pod adresem definiowanym przez slug.

Wszystkie dane zaczytywane do projektu Gatsby.js są w postaci węzłów (z ang. node). Gatsby udostępnia API do interakcji z tymi węzłami. Metoda `onCreateNode` jak wskazuje nazwa jest wywoływana w momencie tworzenia nowego węzła i pozwala na wchodzenie w interakcje z nim. Dzięki temu można modyfikować tworzone automatycznie węzły wywołujące tę metodę, albo tworzyć nowe węzły na ich podstawie. Aby z niej skorzystać należy stworzyć plik **`gatsby-node.js`** i zaimplementować w nim metodę `onCreateNode`. Na początek niech wyświetla ona w konsoli typy importowanych węzłów:

#### **`gatsby-node.js`**

```js
exports.onCreateNode = ({ node }) => {
  console.log(`Node created of type "${node.internal.type}"`)
}
```

Przy obecnej strukturze projektu, w której są zaimportowane dwa pliki markdown z postami odpowiedź konsoli po rozpoczęciu budowania projektu powinna wyglądać następująco:

#### **`node`**

```node
Node created of type "SitePage"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "SitePlugin"
Node created of type "Site"
Node created of type "SiteBuildMetadata"
Node created of type "Directory"
Node created of type "File"
Node created of type "File"
Node created of type "MarkdownRemark"
Node created of type "MarkdownRemark"
```

Jak widać jako dwa ostatnie wpisy zostały zalogowane węzły typu `MarkdownRemark`. To właśnie na nich będziemy bazować, dlatego musimy zmodyfikować naszą funkcję tak aby działała tylko dla tego typu węzła.

#### **`gatsby-node.js`**

```js
exports.onCreateNode = ({ node }) => {
  if (node.internal.type === `MarkdownRemark`) {
    console.log(node.internal.type)
  }
}
```

Po tej zmianie odpowiedź konsoli ograniczyła sie do dwóch wpisów:

#### **`node`**

```node
Node created of type "MarkdownRemark"
Node created of type "MarkdownRemark"
```

Teraz można przejść do stworzenia adresu każdej z podstron, który będzie bazował na nazwie pliku. Najłatwiej będzie skorzystać z metody `createFilePath` udostępnianej przez plugin `gatsby-source-filesystem`.

#### **`gatsby-node.js`**

```js
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    console.log(createFilePath({ node, getNode }))
  }
}
```

#### **`node`**

```node
/another-test-markdown/     
/test-markdown/
```

Dzięki temu uzyskaliśmy gotowe slug'i generowane automatycznie dla każdego posta zapisanego w pliku markdown. Teraz można skorzystać z funkcji `createNodeField` pozwalającej dodać pole do węzła (ang. node). W tym przypadku adres wygenerowany na podstawie nazwy pliku poprzedziłęm członem "/blog" Dodane w ten sposób pole będzie później dostępne w tym węźle z poziomu zapytań GraphQL.

#### **`gatsby-node.js`**

```js
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: `/blog${slug}`,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
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
  console.log(JSON.stringify(result, null, 4))
}
```

Dane wyciągnięte przy pomocy zapytania GraphQL wyglądają w ten sposób:

#### **`node`**

```node
{
    "data": {
        "allMarkdownRemark": {
            "edges": [
                {
                    "node": {
                        "fields": {
                            "slug": "/blog/another-test-markdown/"
                        }
                    }
                },
                {
                    "node": {
                        "fields": {
                            "slug": "/blog/test-markdown/"
                        }
                    }
                }
            ]
        }
    }
}
```

Odpowiednio mapując te dane można podczas budowania aplikacji automatycznie stworzyć dla nich oddzielne strony implementując metodę `createPages` i wywołując w niej dla pobranych plików markdown funkcję `createPage`.

#### **`gatsby-node.js`**

```js
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: `/blog${slug}`,
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

Jak widać w powyższym przykładzie dla każdego pliku markdown tworzona jest strona ze ścieżką odpowiadającą wcześniej wygenerowanemu slug'owi `path: node.fields.slug`, na podstawie szablonu blog-post.js ``component: path.resolve(`./src/templates/blog-post.js`)`` z przekazanym parametrem slug `context: { slug: node.fields.slug }` (będzie on potrzebny, aby z poziomu szablonu posta móc wyciągnąć za pomocą graphQL plik markdown odpowiadający tej stronie).

#### **`blog-post.js`**

```js
import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"

const StyledPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledPostHeader = styled.h1`
  width: 800px;
  font-size: 42px;
`

const StyledPostContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  & > p > img {
    width: 100%;
  }
`

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <StyledPostContainer>
        <StyledPostHeader>
          <span>{post.frontmatter.title}</span>
          <span> </span>
          <span>{post.frontmatter.date}</span>
        </StyledPostHeader>
        <StyledPostContent dangerouslySetInnerHTML={{ __html: post.html }} />
      </StyledPostContainer>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
      }
    }
  }
`
```

W szablonie strony posta pobieramy plik markdown przy pomocy GraphQL. W przeciwieństwie do przykładu z pierwszej części serii, gdzie pobieraliśmy wszystkie pliki, tu pobierany jest plik z odpowiednią wartością pola slug. Oryginalne pliki nie posiadają tego parametru, jednak został on dodany w czasie budowania projektu. Następnie podobnie jak w pierwszej części serii wyświetlamy pobrane dane: tytuł i datę, oraz renderujemy treść pliku markdown w postaci html. Dzięki temu po odwiedzeniu adresów: localhost:8000/blog/test-markdown/ i localhost:8000/blog/another-test-markdown/ można zobaczyć wyreperowaną treść plików, każdy na osobnej stronie.

![Pierwszy post](/img/blog-2020.11.08-01.png "Pierwszy post")
![Drugi post](/img/blog-2020.11.08-02.png "Drugi post")

Brakuje jeszcze możliwości łatwego dotarcia do tych treści. W tym momencie można to zrobić wpisując odpowiedni adres w pasku przeglądarki. Za spis wszystkich postów posłuży nam strona przygotowana w pierwszej części serii zawierająca do tej pory wszystkie posty. Wystarczy wprowadzić w jej szablonie kilka niewielkich modyfikacji. Na początku zmienię jej nazwę z `foo.js` na `blog.js` oraz zaktualizuję linkowanie z górnej belki. Zmiana nazwy pliku z szablonem przełoży sie również na zmianę adresu pod którym strona będzie dostępna.

#### **`blog.js`**

```js
import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

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
        <h1>Najnowsze wpisy:</h1>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug}>
              <h2>
                {node.frontmatter.title} - {node.frontmatter.date}
              </h2>
            </Link>
            <hr />
          </div>
        ))}
      </StyledContainer>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
```

Po wprowadzeniu takich zmian w starym szablonie uzyskaliśmy prosty spis wszystkich postów pozwalający na nawigację do automatycznie wygenerowanych podstron postów. Dzięki takiemu skonfigurowani projektu dodanie kolejnych wpisów to tylko kwestia dodania nowych plików markdown i ponownego zbudowania projektu.

![Nawigacja między stronami](/img/blog-2020.11.08-03.gif "Nawigacja między stronami")

Strona dostępna jest pod adresem: <https://gatsby-poligon-testowy.netlify.app/>

Wraz z pojawianiem się kolejnych wpisów z tej serii stan strony może różnić się od przedstawionego w tym poście.

Źródła projektu dostępne są pod adresem: <https://github.com/lukasz-zielinski-dev/gatsby-starter-example>

Źródła:

* [Gatsby.js Tutorial 7. Programmatically Create Pages from Data](https://www.gatsbyjs.com/tutorial/part-seven/)