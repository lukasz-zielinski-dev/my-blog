---
templateKey: blog-post
title: Przykład REST API z wykorzystaniem Spring Data JPA i Spring Data REST
date: 2021-08-21T15:44:05.947Z
description: "W tym wpisie postaram się przedstawić, jak przy pomocy Spring Data
  REST można szybko stworzyć proste REST API. "
featuredpost: true
featuredimage: /img/blog-2021.08.21-00.png
tags:
  - backend
  - rest
  - api
  - spring jpa
  - spring data rest
---
![Grafika tytułowa](/img/blog-2021.08.21-00.png "Grafika tytułowa")

### Wstępne założenia i przygotowanie projektu.

W ramach wpisu postaram się przedstawić proces tworzenia REST API przy pomocy **Spring Data JPA** i **Spring Data REST**. Stworzone na potrzeby tego wpisu API będzie udostępniało dwa powiązane zasoby:

* Użytkownik — zasób reprezentujący użytkownika aplikacji, zawierający informacje:

  * Unikalny identyfikator
  * Nazwa
  * Email
  * Lista treningów
* Trening — zasób reprezentujący trening użytkownika zawierający informacje:

  * Unikalny identyfikator
  * Data
  * Typ (siła | wytrzymałość | mobilność)
  * Opis
  * Użytkownik

Na początku przy pomocy **Spring Initializr** wygenerowałem nowy projekt Spring Boot Java 11 + Maven z kilkoma dodatkowymi zależnościami:

* H2 Database
* Spring Data JPA
* Rest Repositories
* Rest Repositories HAL Explorer
* Lombok

Na tym etapie pom projektu wyglądał tak:

#### **`pom.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.3</version>
    <relativePath/> <!-- lookup parent from repository -->
  </parent>
  <groupId>pl.zielinski.lukasz</groupId>
  <artifactId>spring-data-rest-example</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>spring-data-rest-example</name>
  <description>Demo project for Spring Boot</description>
  <properties>
    <java.version>11</java.version>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-rest</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.data</groupId>
      <artifactId>spring-data-rest-hal-explorer</artifactId>
    </dependency>

    <dependency>
      <groupId>com.h2database</groupId>
      <artifactId>h2</artifactId>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <optional>true</optional>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
          <excludes>
            <exclude>
              <groupId>org.projectlombok</groupId>
              <artifactId>lombok</artifactId>
            </exclude>
          </excludes>
        </configuration>
      </plugin>
    </plugins>
  </build>

</project>
```

### Modle obiektów

Po wygenerowaniu projektu przygotowałem dwie klasy odpowiedzialne za reprezentacje głównych zasobów udostępnianych w ramach api (użytkowników i treningów):

#### **`src/main/java/pl/zielinski/lukasz/springdatarestexample/User.java`**

```java
package pl.zielinski.lukasz.springdatarestexample;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class User {
  @Id
  @GeneratedValue
  private long id;

  @Column(unique = true)
  private String name;

  @Column(nullable = false, unique = true)
  private String email;

  @OneToMany(mappedBy = "user")
  private List<Workout> workouts;
}
```

#### **`src/main/java/pl/zielinski/lukasz/springdatarestexample/Workout.java`**

```java
package pl.zielinski.lukasz.springdatarestexample;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Workout {
  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false)
  private LocalDate date;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private WorkoutType type;

  @Column(length = 1024)
  private String description;

  @ManyToOne(optional = false)
  private User user;
}
```

#### **`src/main/java/pl/zielinski/lukasz/springdatarestexample/WorkoutType.java`**

```java
package pl.zielinski.lukasz.springdatarestexample;

public enum WorkoutType {
    STRENGTH,
    HYPERTROPHY,
    ENDURANCE,
    MOBILITY
}
```

### Repozytoria

W celu umożliwienia wykonywania operacji na zasobach przy pomocy **Spring Data REST** stworzyłem dla nich repozytoria i dodałem do nich odpowiednią adnotację. Podczas definicji repozytoriów zdecydowałem się na rozszerzenie interfejsu `PagingAndSortingRepository<T, ID>` (dodającego do `CrudRepository<T, ID>` sortowanie i paginację). W celu oznaczenia repozytoriów jako udostępniane przez **Spring Data REST** dodałem do nich adnotacje `@RepositoryRestResource`.

#### **`src/main/java/pl/zielinski/lukasz/springdatarestexample/UserRepository.java`**

```java
package pl.zielinski.lukasz.springdatarestexample;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
}
```

#### **`src/main/java/pl/zielinski/lukasz/springdatarestexample/UserRepository.java`**

```java
package pl.zielinski.lukasz.springdatarestexample;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "workouts", path = "workouts")
public interface WorkoutRepository extends PagingAndSortingRepository<Workout, Long> {
}
```

### Przeglądarka HAL

![HAL](/img/blog-2021.08.21-01.png "HAL")

> **HAL**
> (**H**ypertext **A**pplication **L**anguage)
> Ciągle opracowywany standard opisujący sposób nawigowania miedzy zasobami udostępnianymi w ramach API. Opisuje sposób definicji zasobów w formatach JSON i XML. Skupia się na dwóch typach danych: zasobach i linkach.
>
> > [Hypertext Application Language - From Wikipedia, the free encyclopedia](https://en.wikipedia.org/wiki/Hypertext_Application_Language)

Po uruchomieniu tak przygotowanego projektu i wpisaniu jego adresu w pasku przeglądarki (w moim przypadku jest to domyślny adres http://localhost:8080/) wyświetlona zostaje **przeglądarka HAL** umożliwiająca eksplorowanie udostępnianych zasobów i linków. Jest ona dostępna dzięki dodanej na początku zależności `spring-data-rest-hal-explorer`.

![Przeglądarka HAL](/img/blog-2021.08.21-04.png "Przeglądarka HAL")

W panelu **Links** znajdują się trzy pozycje:

* workouts
* users
* profile

Dwie pierwsze pozycje dotyczą udostępnianych przez **Spring Data REST** zasobów. Po wejściu w zakładkę **workouts** można, zobaczyć taki rezultat (pustą kolekcję) dodatkowo widać tu wsparcie dla paginacji wynikające z zastosowanego repozytorium:

![Przeglądarka HAL](/img/blog-2021.08.21-05.png "Przeglądarka HAL")

### ALPS

![ALPS](/img/blog-2021.08.21-02.png "ALPS")

> **ALPS** (**A**pplication-**L**evel **P**rofile **S**emantics) - format danych służący do definiowania prostych opisów zasobów aplikacji. Posiada złożoność zbliżoną do mikroformatów HTML. Dzięki wykorzystaniu uniwersalnych sposobów reprezentacji danych (HTML, HAL, Collection+JSON, Siren itp.) umożliwia ich przedstawianie w sposób niezależny od technologii wykorzystywanej do implementacji danej aplikacji.
>
> > [Application-Level Profile Semantics (ALPS) - M. Amundsen, L. Richardson, M. Foster](https://docs.spring.io/spring-data/rest/docs/current/reference/html/#reference)

Trzecia pozycja odpowiada za przechowywanie opisu struktury zasobów i udostępnianych akcji formacie ALPS. Profil zasobów **workouts** wygląda w ten sposób:

#### **`Response Body`**

```json
{
  "alps": {
    "version": "1.0",
    "descriptor": [
      {
        "id": "workout-representation",
        "href": "http://localhost:8080/profile/workouts",
        "descriptor": [
          {
            "name": "date",
            "type": "SEMANTIC"
          },
          {
            "name": "type",
            "type": "SEMANTIC",
            "doc": {
              "format": "TEXT",
              "value": "STRENGTH, HYPERTROPHY, ENDURANCE, MOBILITY"
            }
          },
          {
            "name": "description",
            "type": "SEMANTIC"
          },
          {
            "name": "user",
            "type": "SAFE",
            "rt": "http://localhost:8080/profile/users#user-representation"
          }
        ]
      },
      {
        "id": "get-workouts",
        "name": "workouts",
        "type": "SAFE",
        "descriptor": [
          {
            "name": "page",
            "type": "SEMANTIC",
            "doc": {
              "format": "TEXT",
              "value": "The page to return."
            }
          },
          {
            "name": "size",
            "type": "SEMANTIC",
            "doc": {
              "format": "TEXT",
              "value": "The size of the page to return."
            }
          },
          {
            "name": "sort",
            "type": "SEMANTIC",
            "doc": {
              "format": "TEXT",
              "value": "The sorting criteria to use to calculate the content of the page."
            }
          }
        ],
        "rt": "#workout-representation"
      },
      {
        "id": "create-workouts",
        "name": "workouts",
        "type": "UNSAFE",
        "descriptor": [],
        "rt": "#workout-representation"
      },
      {
        "id": "update-workout",
        "name": "workout",
        "type": "IDEMPOTENT",
        "descriptor": [],
        "rt": "#workout-representation"
      },
      {
        "id": "get-workout",
        "name": "workout",
        "type": "SAFE",
        "descriptor": [],
        "rt": "#workout-representation"
      },
      {
        "id": "patch-workout",
        "name": "workout",
        "type": "UNSAFE",
        "descriptor": [],
        "rt": "#workout-representation"
      },
      {
        "id": "delete-workout",
        "name": "workout",
        "type": "IDEMPOTENT",
        "descriptor": [],
        "rt": "#workout-representation"
      }
    ]
  }
}
```

### Kolekcje, zasoby, powiązania i wspierane metody HTTP

Żądania wysyłane do api mogą odwoływać się do **kolekcji**, **zasobów** albo **powiązań**. To, do której grupy odwołuje się żądanie, jest determinowane przez jego adres. Dodatkowo w zależności od wskazywanej grupy żądania mogą wspierać różne metody HTTP: 

* **Kolekcja** (np. http://localhost:8080/workouts)

  * GET — zwraca wszystkie zasoby z kolekcji. Jeśli udostępnione repozytorium wspiera paginacje i sortowanie te funkcje są również obsługiwane przez api.
  * HEAD — pozwala sprawdzić, czy kolekcja jest dostępna bez konieczności jej pobierania.
  * POST — dodaje do kolekcji nowy zasób na podstawie przesłanej reprezentacji.
* **Zasób** (np. http://localhost:8080/workouts/2)

  * GET — zwraca reprezentacje wskazanego zasobu.
  * HEAD — pozwala sprawdzić, czy zasób jest dostępny bez konieczności pobierania go.
  * PUT — zastępuje dane wskazanego zasobu zgodnie z przesłaną reprezentacją.
  * PATCH — zastępuje część danych wskazanego zasobu zgodnie z przesłaną reprezentacją.
  * DELETE — usuwa wskazany zasób.
* **Powiązanie** (np. http://localhost:8080/users/1/workouts)

  * GET — zwraca zasób (zasoby) wynikający ze wskazywanego powiązania.
  * PUT — przypisuje powiązanie do przesłanego w żądaniu zasobu.
  * POST — dodaje przesłany w żądaniu zasób do powiązania. Metoda wspierana tylko dla powiązań wskazujących na kolekcję, a nie na pojedynczy zasób. 
  * DELETE — usuwa wskazane powiązanie między zasobami.

### Proste przykłady interakcji z API

Przykłady wykorzystania części z wyżej opisanych możliwych żądań przedstawiłem poniżej:

#### Tworzenie nowego zasobu

Dodawanie nowych obiektów jest możliwe poprzez wysłanie żądania typu **POST** zawierającego reprezentację tworzonego obiektu w ciele body na adres `[adres api]/[nazwa-kolekcji]`. 

Dla tworzonego w ramach tego wpisu api akcja dodania nowego zasobu użytkownika może wyglądać w ten sposób:

#### **`REQUEST`**

```http
POST /users HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Content-Length: 76

{
    "name": "Abraham Kris",
    "email": "Valerie_Daniel35@gmail.com"
}
```

W odpowiedzi na to żądanie serwer odesłał odpowiedź z kodem **201 Created** i takim obiektem w body:

#### **`RESPONSE BODY`**

```json
{
  "name": "Abraham Kris",
  "email": "Valerie_Daniel35@gmail.com",
  "_links": {
    "self": {
      "href": "http://localhost:8080/users/1"
    },
    "user": {
      "href": "http://localhost:8080/users/1"
    },
    "workouts": {
      "href": "http://localhost:8080/users/1/workouts"
    }
  }
}
```

Oprócz danych nowo utworzonego obiektu serwer zwrócił linki wskazujące na ten zasób oraz na kolekcję treningów przypisanych do tego użytkownika.

#### **`REQUEST`**

```http
GET /users/1/workouts HTTP/1.1
Host: localhost:8080
```

Na razie kolekcja treningów użytkownika jest pusta i przejście na ten adres zwraca odpowiedź z kodem **200 OK** i takim body:

#### **`RESPONSE BODY`**

```json
{
    "_embedded": {
        "workouts": []
    },
    "_links": {
        "self": {
            "href": "http://localhost:8080/users/1/workouts"
        }
    }
}
```

#### Tworzenie nowego zasobu ze wskazaniem na powiązany zasób

W celu dodania treningu i przypisania go do stworzonego w poprzednim kroku użytkownika należy wysyłać żądanie analogiczne do tego tworzącego użytkownika. Jedyną nową kwestią w tym przypadku jest sposób wskazania użytkownika, którego dotyczy dany trening. Robi się to poprzez podanie adresu tego zasobu, jak pokazano poniżej:

#### **`REQUEST`**

```http
POST /workouts HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Content-Length: 249

{
    "date": "2021-08-14",
    "type": "HYPERTROPHY",
    "description": "Perspiciatis et voluptatem rerum accusantium. Enim esse nisi. Et modi eveniet repellat ipsam non quo vel distinctio modi.",
    "user": "http://localhost:8080/users/1"
}
```

Podobnie jak w przypadku dodawania zasobu użytkownika tak i teraz podczas dodawania zasobu treningu zwrócona przez serwer odpowiedź ma kod **201 Created**. W body odpowiedzi znajdowały się dane nowo stworzonego zasobu treningu wraz z linkami wskazującymi na ten zasób i powiązany zasób użytkownika:

#### **`RESPONSE BODY`**

```json
{
  "date": "2021-08-14",
  "type": "HYPERTROPHY",
  "description": "Perspiciatis et voluptatem rerum accusantium. Enim esse nisi. Et modi eveniet repellat ipsam non quo vel distinctio modi.",
  "_links": {
    "self": {
      "href": "http://localhost:8080/workouts/2"
    },
    "workout": {
      "href": "http://localhost:8080/workouts/2"
    },
    "user": {
      "href": "http://localhost:8080/workouts/2/user"
    }
  }
}
```

Teraz ponowne odwiedzenie adresu zwracającego treningi dodanego wczesnej użytkownika zwraca odpowiedź z body wskazującym dodany później zasób treningu.

#### **`REQUEST`**

```http
GET /users/1/workouts HTTP/1.1
Host: localhost:8080
```

#### **`RESPONSE BODY`**

```json
{
  "_embedded": {
    "workouts": [
      {
        "date": "2021-08-14",
        "type": "HYPERTROPHY",
        "description": "Perspiciatis et voluptatem rerum accusantium. Enim esse nisi. Et modi eveniet repellat ipsam non quo vel distinctio modi.",
        "_links": {
          "self": {
            "href": "http://localhost:8080/workouts/2"
          },
          "workout": {
            "href": "http://localhost:8080/workouts/2"
          },
          "user": {
            "href": "http://localhost:8080/workouts/2/user"
          }
        }
      }
    ]
  },
  "_links": {
    "self": {
      "href": "http://localhost:8080/users/1/workouts"
    }
  }
}
```

#### Modyfikacja zasobu (PATCH)

Oprócz dodawania i wyświetlania zasobów możliwe jest też ich modyfikowanie metodami PUT i PATCH. Na przykład zmiana opisu treningu z wykorzystaniem metody PATCH może wyglądać w ten sposób:

#### **`REQUEST`**

```http
PATCH /workouts/2 HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Content-Length: 55

{
    "description": "Description changed by PATCH"
}
```

Body tego żądania zawierało jedynie ten fragment reprezentacji zasobu, który ulegał zmianie (pole description). Przesyłanie jedynie fragmentu reprezentacji modyfikowanego zasobu jest charakterystyczne dla metody PATH. 

Zwrócona przez serwer odpowiedź posiadała kod 200 OK i body zawierające reprezentację stanu zasobu po modyfikacji wraz z linkami do powiązanych zasobów:

#### **`RESPONSE BODY`**

```json
{
    "date": "2021-08-14",
    "type": "HYPERTROPHY",
    "description": "Description changed by PATCH",
    "_links": {
        "self": {
            "href": "http://localhost:8080/workouts/2"
        },
        "workout": {
            "href": "http://localhost:8080/workouts/2"
        },
        "user": {
            "href": "http://localhost:8080/workouts/2/user"
        }
    }
}
```

#### Modyfikacja zasobu (PUT)

Do modyfikacji zasobu można również wykorzystać metodę PUT. W tym przypadku konieczne jest jednak przesłanie w body żądania pełnej reprezentacji zasobu, a nie jedynie modyfikowanych elementów.

#### **`REQUEST`**

```http
PUT /workouts/2 HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Content-Length: 151

{
    "date": "2021-08-14",
    "type": "MOBILITY",
    "description": "Description changed by PUT",
    "user": "http://localhost:8080/users/1"
}
```

Sama odpowiedź uzyskana po modyfikacji zasobu z wykorzystaniem metody PUT jest analogiczna do tej uzyskanej po modyfikacji metodą PATCH (kod: 200 OK, body z reprezentacją obiektu po modyfikacji).

#### **`RESPONSE`**

```json
{
    "date": "2021-08-14",
    "type": "MOBILITY",
    "description": "Description changed by PUT",
    "_links": {
        "self": {
            "href": "http://localhost:8080/workouts/2"
        },
        "workout": {
            "href": "http://localhost:8080/workouts/2"
        },
        "user": {
            "href": "http://localhost:8080/workouts/2/user"
        }
    }
}
```

#### Usuwanie zasobu

Dodatkowo na konkretnym zasobie można użyć metody DELETE, która jak wskazuje nazwa, usuwa go:

#### **`REQUEST`**

```http
DELETE /workouts/2 HTTP/1.1
Host: localhost:8080
```

W tym przypadku dostaniemy odpowiedź bez body z kodem 204 No Content, a obiekt o identyfikatorze wskazanym w adresie żądania nie będzie już dłużej dostępny.

#### Sortowanie i paginacja

Ze względu na wsparcie paginacji i sortowania w wykorzystywanych repozytoriach (dzięki rozszerzeniu interfejsu `PagingAndSortingRepository`) podczas wyświetlania listy zasobów danej kolekcji można dodatkowo podać parametry związane z tymi sortowaniem i paginacją. Te parametry można umieścić w adresie żądania. Przykładowo odwołując się do kolekcji użytkowników w celu:

* wyświetlenie 9. strony 
* listy podzielonej na strony zawierające po 5 elementów
* posortowanej odwrotnie po polu email

W adresie zapytania należy dodatkowo przekazać parametry:

* page=8 (8, ponieważ strony są liczone od 0, a nie 1)
* size=5
* sort=email,desc

#### **`REQUEST`**

```http
GET /users?page=8&size=5&sort=email,desc HTTP/1.1
Host: localhost:8080
```

W odpowiedzi na takie zapytanie serwer zwraca odpowiednią stronę kolekcji użytkowników:

#### **`RESPONSE BODY`**

```json
{
    "_embedded": {
        "users": [
            {
                "name": "Charlie Braun",
                "email": "Deanna.Bradtke@yahoo.com",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/131"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/131"
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/131/workouts"
                    }
                }
            },
            {
                "name": "Cody Stehr Jr.",
                "email": "Darrel.McGlynn96@hotmail.com",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/221"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/221"
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/221/workouts"
                    }
                }
            },
            {
                "name": "Ms. Jack Zieme",
                "email": "Colby14@yahoo.com",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/56"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/56"
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/56/workouts"
                    }
                }
            },
            {
                "name": "Lowell Hagenes Jr.",
                "email": "Clement.Ferry@yahoo.com",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/86"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/86"
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/86/workouts"
                    }
                }
            },
            {
                "name": "Garry Langosh",
                "email": "Carmelo83@hotmail.com",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/66"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/66"
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/66/workouts"
                    }
                }
            }
        ]
    },
    "_links": {
        "first": {
            "href": "http://localhost:8080/users?page=0&size=5&sort=email,desc"
        },
        "prev": {
            "href": "http://localhost:8080/users?page=7&size=5&sort=email,desc"
        },
        "self": {
            "href": "http://localhost:8080/users?page=8&size=5&sort=email,desc"
        },
        "next": {
            "href": "http://localhost:8080/users?page=9&size=5&sort=email,desc"
        },
        "last": {
            "href": "http://localhost:8080/users?page=9&size=5&sort=email,desc"
        },
        "profile": {
            "href": "http://localhost:8080/profile/users"
        }
    },
    "page": {
        "size": 5,
        "totalElements": 50,
        "totalPages": 10,
        "number": 8
    }
}
```

#### Wyszukiwanie

Aby zawęzić listę uzyskanych wyników na podstawie pewnego kryterium, można stworzyć specjalne wyszukiwanie. W tym celu należy w repozytorium zasobu dodać metodę odpowiedzialną za zwrócenie listy zasobów na podstawie przekazanych parametrów.

#### **`RESPONSE BODY`**

```java
package pl.zielinski.lukasz.springdatarestexample;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    Page<User> findAllByEmailContains(String emailPattern, Pageable pageable);
}
```

Po zdefiniowaniu takiej metody w repozytorium zasobu **Spring Data REST** automatycznie udostępni ją w postaci endpoint-u, z którego można korzystać podobnie do tego wyświetlającego wszystkie zasoby kolekcji. W tym przypadku wyszukanie użytkowników, których email zawiera frazę „gmail”, może wyglądać w ten spsób:

#### **`REQUEST`**

```http
GET /users/search/findAllByEmailContains?emailPattern=gmail&page=0&size=5&sort=email,asc HTTP/1.1
Host: localhost:8080
```

#### **`RESPONSE BODY`**

```json
{
    "_embedded": {
        "users": [
            {
                "name": "Lora Farrell",
                "email": "Adeline.Schuppe@gmail.com",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/241"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/241"
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/241/workouts"
                    }
                }
            },
            {
                "name": "Jasmine Dicki",
                "email": "Alfonzo26@gmail.com",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/41"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/41"
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/41/workouts"
                    }
                }
            },
            {
                "name": "Rosa Wilkinson MD",
                "email": "Arnaldo.Gerlach3@gmail.com",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/211"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/211"
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/211/workouts"
                    }
                }
            },
            {
                "name": "Ellis Kohler",
                "email": "Bonnie.Runolfsdottir@gmail.com",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/71"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/71"
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/71/workouts"
                    }
                }
            },
            {
                "name": "Aubrey Jacobson",
                "email": "Cara_Stehr@gmail.com",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/136"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/136"
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/136/workouts"
                    }
                }
            }
        ]
    },
    "_links": {
        "first": {
            "href": "http://localhost:8080/users/search/findAllByEmailContains?emailPattern=gmail&page=0&size=5&sort=email,asc"
        },
        "self": {
            "href": "http://localhost:8080/users/search/findAllByEmailContains?emailPattern=gmail&page=0&size=5&sort=email,asc"
        },
        "next": {
            "href": "http://localhost:8080/users/search/findAllByEmailContains?emailPattern=gmail&page=1&size=5&sort=email,asc"
        },
        "last": {
            "href": "http://localhost:8080/users/search/findAllByEmailContains?emailPattern=gmail&page=2&size=5&sort=email,asc"
        }
    },
    "page": {
        "size": 5,
        "totalElements": 13,
        "totalPages": 3,
        "number": 0
    }
}
```

Mechanizm ten nie jest ograniczony jedynie do zapytań konstruowanych automatycznie przez JPA na podstawie nazwy metody. Może być również wykorzystywany w przypadku bardziej złożonych zapytań korzystających z adnotacji `@Query`.

#### Projekcje

We wcześniejszych przykładach przesyłana reprezentacja zasobu była dokładnym odzwierciedleniem jegop faktycznego stanu. Nie zawsze jest to pożądane. Dostępny w ramach **Spring Data REST** mechanizm projekcji umożliwia zmodyfikowanie przesyłanej reprezentacji zasobu bez konieczności modyfikacji struktury samego zasobu. Przykładowo można stworzyć projekcje, która podczas pobierania danych użytkownika wyświetli od razu jego treningi:

#### **`src/main/java/pl/zielinski/lukasz/springdatarestexample/WithWorkouts.java`**

```java
package pl.zielinski.lukasz.springdatarestexample;

import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "withWorkouts", types = {User.class})
interface WithWorkouts {
  String getName();

  String getEmail();

  List<Workout> getWorkouts();
}
```

Teraz podczas odczytu danych użytkownika można opcjonalnie wskazać tę projekcję i w odpowiedzi otrzymać reprezentację z zagnieżdżonymi treningami, a nie jedynie linkiem do nich:

#### **`REQUEST`**

```http
GET /users/2?projection=withWorkouts HTTP/1.1
Host: localhost:8080
```

#### **`RESPONSE BODY`**

```json
{
    "name": "Eugene Green",
    "email": "Olaf_Christiansen90@hotmail.com",
    "workouts": [
        {
            "date": "2021-08-16",
            "type": "ENDURANCE",
            "description": "Et dolores aut voluptatibus voluptas odit laborum aut sunt non. Itaque eius id officiis amet distinctio."
        },
        {
            "date": "2021-08-13",
            "type": "ENDURANCE",
            "description": "Enim aspernatur optio in iste suscipit ipsa delectus id. Sunt veniam rerum beatae autem. Qui amet est nobis. Aliquam vel consequatur dolorem ut. Perspiciatis accusamus autem."
        },
        {
            "date": "2021-08-15",
            "type": "HYPERTROPHY",
            "description": "Non autem numquam sapiente quia tempora necessitatibus quisquam et. Molestiae velit cumque ad blanditiis et architecto ut est reprehenderit."
        }
    ],
    "_links": {
        "self": {
            "href": "http://localhost:8080/users/2"
        },
        "user": {
            "href": "http://localhost:8080/users/2{?projection}",
            "templated": true
        },
        "workouts": {
            "href": "http://localhost:8080/users/2/workouts"
        }
    }
}
```

W celu stworzenia projekcji, która będzie stosowana domyślnie dla danej kolekcji, należy dodatkowo wskazać ją w adnotacji repozytorium. Automatycznie stosowana projekcja dodająca do reprezentacji użytkownika licznik treningów może wyglądać w ten sposób:

#### **`src/main/java/pl/zielinski/lukasz/springdatarestexample/WithWorkoutsCount.java`**

```java
package pl.zielinski.lukasz.springdatarestexample;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withWorkoutsCount", types = {User.class})
interface WithWorkoutsCount {
  String getName();

  String getEmail();

  @Value("#{target.workouts.size()}")
  Integer getWorkoutsCount();
}
```

#### **`src/main/java/pl/zielinski/lukasz/springdatarestexample/UserRepository.java`**

```java
package pl.zielinski.lukasz.springdatarestexample;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "users", path = "users", excerptProjection = WithWorkoutsCount.class)
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    Page<User> findAllByEmailContains(String emailPattern, Pageable pageable);
}
```

Teraz zapytanie zwracające listę użytkowników automatycznie korzysta z tej formy reprezentacji zasobu użytkownika.

#### **`REQUEST`**

```http
GET /users HTTP/1.1
Host: localhost:8080
```

#### **`RESPONSE BODY`**

```json
{
    "_embedded": {
        "users": [
            {
                "name": "Dr. Clinton Stokes",
                "email": "Quinton.Powlowski@gmail.com",
                "workoutsCount": 2,
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/1"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/1{?projection}",
                        "templated": true
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/1/workouts"
                    }
                }
            },
            {
                "name": "Dominic O'Kon",
                "email": "Merle_Adams18@gmail.com",
                "workoutsCount": 3,
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/4"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/4{?projection}",
                        "templated": true
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/4/workouts"
                    }
                }
            },
            {
                "name": "Alexandra Bechtelar V",
                "email": "Melody_Ortiz33@yahoo.com",
                "workoutsCount": 1,
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/users/8"
                    },
                    "user": {
                        "href": "http://localhost:8080/users/8{?projection}",
                        "templated": true
                    },
                    "workouts": {
                        "href": "http://localhost:8080/users/8/workouts"
                    }
                }
            }
        ]
    },
    "_links": {
        "self": {
            "href": "http://localhost:8080/users"
        },
        "profile": {
            "href": "http://localhost:8080/profile/users"
        },
        "search": {
            "href": "http://localhost:8080/users/search"
        }
    },
    "page": {
        "size": 20,
        "totalElements": 3,
        "totalPages": 1,
        "number": 0
    }
}
```

#### Event-y

Przedstawiony wczesnej mechanizm projekcji umożliwia ingerencję w proces odczytu danych. W celu rozszerzenia akcji zmieniających stan przechowywanych zasobów można skorzystać z mechanizmu event-ów. W przypadku, gdy istnieje potrzeba modyfikacji udostępnianych przez **Spring Data REST** akcji można skorzystać z mechanizmu event-ów publikowanych przez Spring Data REST. Wystarczy stworzyć klasę z adnotacją `@RepositoryEventHandler`, która będzie zarządzana przez Spring-a (np. poprzez dodanie adnotacji `@Component`). Wewnątrz tej klasy można definiować metody przyjmujące obiekt zasobu z odpowiednimi adnotacjami:

* @HandleBeforeCreate
* @HandleAfterCreate
* @HandleBeforeSave
* @HandleAfterSave
* @HandleBeforeLinkSave
* @HandleAfterLinkSave
* @HandleBeforeLinkDelete
* @HandleAfterLinkDelete
* @HandleBeforeDelete
* @HandleAfterDelete

Tak zdefiniowane metody zostaną wywołane podczas akcji wskazanej przy pomocy adnotacji dla obiektu wskazanego jako parametr wejściowy. Przykład logujący dane obiektu treningu przed i po zapisaniu może wyglądać w ten sposób:

#### **`src/main/java/pl/zielinski/lukasz/springdatarestexample/WorkoutEventHandler.java`**

```java
package pl.zielinski.lukasz.springdatarestexample;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler
public class WorkoutEventHandler {
    Logger logger = LoggerFactory.getLogger(WorkoutEventHandler.class);

    @HandleBeforeCreate
    public void beforeCreate(Workout workout) {
        logger.info("Before creating workout {}", workout.toString());
    }

    @HandleAfterCreate
    public void afterCreate(Workout workout) {
        logger.info("After creating workout {}", workout.toString());
    }

}
```

#### **`LOGI`**

```
2021-08-21 12:52:25.487  INFO 15684 --- [nio-8080-exec-3] p.z.l.s.WorkoutEventHandler              : Before creating workout Workout(id=null, date=2021-08-13, type=HYPERTROPHY, description=Aliquam dolorum et tempora at nisi deserunt. Recusandae sapiente ullam veniam odit quo nulla delectus. Dolores ea tenetur velit nam rerum et rerum., user=User(id=1, name=Felipe Padberg, email=Xzavier.McClure@yahoo.com))
2021-08-21 12:52:25.502  INFO 15684 --- [nio-8080-exec-3] p.z.l.s.WorkoutEventHandler              : After creating workout Workout(id=2, date=2021-08-13, type=HYPERTROPHY, description=Aliquam dolorum et tempora at nisi deserunt. Recusandae sapiente ullam veniam odit quo nulla delectus. Dolores ea tenetur velit nam rerum et rerum., user=User(id=1, name=Felipe Padberg, email=Xzavier.McClure@yahoo.com))
```

Podpinanie się przed/po wykonaniu określonych akcji na zasobach pozwala na rozszerzenie możliwości API bazującego na Spring Data REST. Jednak nie daje takiej swobody jak ręcznie zdefiniowany endpoint.

Źródła:

* [Spring Data REST Reference Guide](https://docs.spring.io/spring-data/rest/docs/current/reference/html/#reference)
* [Application-Level Profile Semantics (ALPS) - M. Amundsen, L. Richardson, M. Foster](https://docs.spring.io/spring-data/rest/docs/current/reference/html/#reference)
* [Hypertext Application Language - From Wikipedia, the free encyclopedia](https://en.wikipedia.org/wiki/Hypertext_Application_Language)