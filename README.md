# Lääkelista-sovellus

Kyseessä on web-sovellus, jonka tarkoituksena on mahdollistaa käyttäjälle oman lääkityslistan ylläpitäminen. Sovelluksessa käyttäjä voi lisätä lääkelistalleen käyttämänsä lääkkeet, niiden annostukset ja käyttötarkoitukset.

Projektin backend on toteutettu ASP.NET Corella ja tietokantana käytetään SQLitea. Lääkevalmisteiden perustiedot haetaan Fimean Perusrekisteri XML -aineistosta.

Frontend on toteutettu React/Typescript-pohjaisena. Ensimmäisessä versiossa käyttöliittymän ulkoasuun ei ole vielä kiinnitetty huomiota.


## Suunnitellut ominaisuudet

Tavoitteena on toteuttaa ainakin seuraavat ominaisuudet:

* Suomessa markkinoilla olevien lääkevalmisteiden hakeminen ja niiden tietojen näyttäminen
* Hakutulosten suodattaminen
* Hakutulosten sivutus (pagination)
* Käyttäjän oman lääkelistan luominen
* Lääkkeiden lisääminen käyttäjän lääkelistalle
* Lääkelistan lääkkeiden muokkaaminen ja poistaminen
* Käyttäjän lääkkeisiin liittyvien tietojen, kuten käyttötarkoituksen, annostuksen ja muistiinpanojen, tallentaminen
* Myyntiluvallisten lääkevalmisteiden suodattaminen Fimean aineiston perusteella
* Käyttäjien tunnistautuminen ja käyttäjäkohtaiset lääkelistat

## Tähän mennessä toteutettu

### Fimean rekisteri lääkevalmisteista

Backend lukee Fimean Perusrekisteri XML -aineistoa `XmlSerializer`-kirjaston avulla.

Fimean datasta käsitellään muun muassa:

* lääkevalmisteen nimi
* Fimean tunniste
* ATC-koodi ja ATC-nimi
* lääkemuoto
* antoreitti
* myyntiluvan haltija
* myyntiluvan numero
* myyntiluvan tila
* tieto siitä, onko kyseessä ihmisille tarkoitettu lääke

### Lääketietokanta

Lääkevalmisteet tallennetaan SQLite-tietokantaan `Medicine`-entiteettinä, joka sisältää seuraavat tiedot lääkevalmisteesta:

* `Id` - lääkevalmisteen yksilöivä tunniste
* `FimeaId` - Fimean oma tunniste valmisteelle
* `Name` - lääkevalmisteen nimi
* `ActiveIngredient` - vaikuttava aine
* `AtcCode` - ATC-koodi kansainvälisen ATC (Anatomical Therapeutic Chemical) -luokituksen mukaan
* `AtcName` - ATC-luokan nimi
* `DosageForm` - lääkemuoto
* `RouteOfAdministration` - antoreitti
* `MarketingAuthorisationHolder` - myyntiluvan haltija
* `AuthorisationNumber` - myyntiluvan numero
* `AuthorisationStatus` - myyntiluvan tila
* `IsHumanMedicine` - onko kyseessä ihmisille tarkoitettu lääkevalmiste

Lääkevalmisteiden tiedot luetaan Fimean datasta luokassa `FimeaImportService`.

### REST API

Lääkevalmisteille on toteutettu API, jonka avulla voidaan esimerkiksi:

* hakea lääkkeitä nimen, vaikuttavan aineen tai id:n perusteella
* luoda ja muokata lääkevalmisteita

Esimerkiksi:

```http
GET /api/medicines/search?name=burana
```

palauttaa Burana-nimellä löytyvät lääkevalmisteet.

### Paginointi

Lääkevalmisteiden listaus- ja hakutoimintoihin on toteutettu sivutus.

API palauttaa `PagedResult`-rakenteen, joka sisältää muun muassa:

* hakutulokset
* nykyisen sivun
* sivun koon
* tulosten kokonaismäärän

Esimerkiksi:

```text
Page: 1
PageSize: 20
TotalCount: 125
Items: 20
```

Tämä mahdollistaa nopeamman haun, kun kaikkia lääkevalmisteita ei tarvitse palauttaa yhdellä API-kutsulla.

### Käyttäjän lääkelista

Käyttäjän omia lääkkeitä varten on toteutettu `UserMedicine`-entiteetti.

`UserMedicine` yhdistää käyttäjän ja lääkevalmisteen sekä sisältää käyttäjän kyseiseen lääkkeeseen liittyviä tietoja::

* `UserId` - käyttäjän yksilöivä tunniste
* `MedicineId` - lääkevalmisteen yksilövä tunniste
* `Purpose` - lääkkeen käyttötarkoitus
* `Dosage` - lääkkeen annostus
* `Notes` - muita huomioita kyseiseen lääkitykseen liittyen

`UserMedicine` liittyy `Medicine`-entiteettiin Entity Framework Coren avulla.

Tietokannassa käyttäjän lääkkeet ovat omassa `UserMedicines`-taulussaan.

### UserMedicine API

Käyttäjän lääkelistan käsittelyyn on toteutettu:

* `UserMedicineService`
* `UserMedicinesController`
* `CreateUserMedicineRequest`
* `UpdateUserMedicineRequest`
* `UserMedicineResponse`

API tukee tällä hetkellä käyttäjän lääkkeiden:

* listaamista
* yksittäisen lääkkeen hakemista
* lisäämistä
* muokkaamista
* poistamista

### Entity Framework Core ja migraatiot

Tietokannan hallintaan käytetään Entity Framework Corea ja EF Core -migraatioita.


## Käyttöliittymän toiminnallisuus

Frontendissä käyttäjä on toistaiseksi kovakoodattu käyttäjäksi 1. Varsinaista kirjautumista ja käyttäjähallintaa ei ole vielä toteutettu, se tehdään myöhemmässä vaiheessa.

Hakuun liittyvät toiminnot:

* Lääkkeiden haku valmisteen nimen tai vaikuttavan aineen perusteella
* Hakutulosten näyttäminen listana
* Hakutulosten paginointi ja tieto hakutulosten kokonaismäärästä
* Ilmoitus, jos haku ei tuota tuloksia

Lääkelistaan liittyvät toiminnot:

* Lääkkeen lisäys käyttäjän omalle lääkelistalle (valmiste, käyttötarkoitus, annostus, muistiinpanot)
* Käyttäjän oman lääkelistan näyttäminen
* Mahdollisuus tarkastella yksittäisen lääkkeen tietoja tarkemmin
* Lääkelistalla olevan lääkkeen tietojen muokkaus
* Lääkkeen poisto omalta listalta


## Teknologiat

Backend:

* C#
* ASP.NET Core
* .NET 10
* Entity Framework Core
* SQLite
* REST API
* XML / `XmlSerializer`

Frontend:

* React
* TypeScript
* Vite
* REST API -yhteys backendiin

Data:

* Fimean Perusrekisteri XML https://fimea.fi/laakehaut_ja_luettelot/perusrekisteri-xml


## Projektin rakenne

Projektin rakenne on tällä hetkellä pääpiirteissään:

```text
laakelista/
├── backend/
│   └── Laakelista.Api/
│       ├── Controllers/
│       │   ├── FimeaController.cs
│       │   ├── MedicinesController.cs
│       │   └── UserMedicinesController.cs
│       ├── Data/
│       │   └── LaakelistaDbContext.cs
│       ├── DTOs/
│       │   ├── CreateMedicineRequest.cs
│       │   ├── CreateUserMedicineRequest.cs
│       │   ├── MedicineResponse.cs
│       │   ├── PagedResult.cs
│       │   ├── UpdateMedicineRequest.cs
│       │   ├── UpdateUserMedicineRequest.cs
│       │   └── UserMedicineResponse.cs
│       ├── Fimea/
│       │   ├── FimeaModels.cs
│       │   └── FimeaImportService.cs
│       ├── Migrations/
│       ├── Models/
│       │   ├── Medicine.cs
│       │   ├── User.cs
│       │   └── UserMedicine.cs
│       ├── Services/
│       │   ├── MedicineService.cs
│       │   └── UserMedicineService.cs
│       └── laakelista.db
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AddUserMedicineForm.tsx
    │   │   ├── EditUserMedicineForm.tsx
    │   │   ├── MedicineCard.tsx
    │   │   ├── UserMedicineCard.tsx
    │   │   └── UserMedicineList.tsx    
    │   ├── api.ts
    │   ├── types.ts
    │   ├── App.tsx
    │   └── ...
    └── ...
```


## Seuraavat kehitysvaiheet

* Käyttöliittymän ulkoasun parantaminen
* Käyttäjän ja käyttäjätilien toteuttaminen
* Käyttäjän tunnistaminen ja kirjautuminen


## Tekoälyn käyttö projektissa

Projektin toteutuksessa on hyödynnetty ChatGPT-tekoälyä ohjelmistokehityksen tukena. Tekoälyä on käytetty esimerkiksi projektin rakenteen ja teknisten ratkaisujen suunnitteluun, ongelmatilanteiden selvittämiseen sekä tämän yhteenvedon tuottamiseen. Lopullisesta toteutuksesta ja testaamista vastaan kuitenkin itse.