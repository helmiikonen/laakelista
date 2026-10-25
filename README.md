# Lääkelista-sovellus

Kyseessä on web-sovellus, jonka tarkoituksena on mahdollistaa käyttäjälle oman lääkityslistan ylläpitäminen. Sovelluksessa kirjautunut käyttäjä voi lisätä lääkelistalleen käyttämänsä lääkkeet, niiden annostukset ja käyttötarkoitukset, sekä muokata tilinsä asetuksia kuten käyttäjänimeä ja salasanaa, ja poistaa tallennetut lääkkeensä sekä käyttäjätilinsä.

Projektin backend on toteutettu ASP.NET Corella ja tietokantana käytetään SQLitea. Lääkevalmisteiden tiedot haetaan Fimean Perusrekisteri XML -aineistosta.

Frontend on toteutettu React/Typescript-pohjaisena ja käyttöliittymäelementteihin ja tyyleihin on käytetty Material UI-kirjastoa. 

Sovellus on edelleen työn alla ja seuraavana kehitysvaiheena on käyttöliittymän ulkoasun ja käytettävyyden parantaminen. Myöhemmin on tarkoituksena siirtää sovellus palvelimelle ja julkaista verkossa.


## Ominaisuudet

* Käyttäjätilin luominen sekä sisään- ja uloskirjautuminen
* Käyttäjäkohtainen lääkelista, joka näkyy vain kirjautuneelle käyttäjälle
* Lääkkeiden hakeminen Fimean lääketiedoista lääkkeen kauppanimen tai (englanninkielisen) vaikuttavan aineen perusteella
* Lääkkeiden lisääminen omalle listalle
* Omien lääkkeiden tietojen tarkastelu, muokkaaminen ja poistaminen
* Lääkekohtaisten käyttötarkoitusten, annostusten ja lisätietojen tallentaminen
* Käyttäjätunnuksen ja salasanan vaihtaminen
* Lääkelistan tyhjennys
* Käyttäjätilin poisto

## Tietoturva ja tietosuoja

### Käyttäjätiedot

Käyttäjä kirjautuu sovellukseen itse valitsemallaan käyttäjätunnuksella ja salasanalla. Rekisteröitymisen yhteydessä käyttäjälle luodaan yksilöllinen tunniste (ID), jonka perusteella sovellus yhdistää käyttäjän hänen tallentamaansa lääkelistaan.

Sovellus tallentaa käyttäjätilin tiedot (käyttäjätunnus ja ID) sekä käyttäjän henkilökohtaiselle lääkelistalle lisäämät tiedot, kuten lääkkeet, käyttötarkoitukset, annostukset ja mahdolliset lisätiedot. Käyttäjäkohtaiset lääkelistat tallennetaan tietokantaan.

Sovellus ei edellytä käyttäjän oikean nimen tai muiden suoraan henkilöllisyyden paljastavien tietojen antamista. Käyttäjä vastaa kuitenkin itse siitä, millaisia tietoja hän kirjoittaa käyttäjätunnukseensa ja lääkelistan lisätietoihin.

Kirjautuneella käyttäjällä on mahdollisuus poistaa käyttäjätilinsä, jolloin myös hänen tallentamansa lääkitystiedot poistuvat tietokannasta. Käyttäjätilin poisto edellyttää salasanan syöttämistä.

### Salasanojen käsittely

Käyttäjätunnusten ja salasanojen hallintaan käytetään ASP.NET Core Identity -kirjastoa. Salasanoja ei tallenneta tietokantaan selväkielisinä. Identity tallentaa salasanat turvallisina tiivisteinä (password hashes), joiden avulla salasana voidaan tarkistaa kirjautumisen yhteydessä paljastamatta alkuperäistä salasanaa.

Kirjautuneen käyttäjän tunnistamiseen käytetään autentikointievästettä. Backend tarkistaa kirjautumisen ja rajaa käyttäjän lääkelistan toiminnot kyseisen käyttäjän omiin tietoihin.

### Käyttäjien tietojen erottaminen

Backend tunnistaa käyttäjän kirjautumistiedon perusteella. Lääkelistan hakemisessa, lisäämisessä, muokkaamisessa ja poistamisessa käyttäjän tunniste otetaan palvelimen vahvistamasta kirjautumistilasta. Näin käyttäjä ei voi tavallisten API-pyyntöjen avulla valita toisen käyttäjän tunnistetta ja käsitellä tämän lääkelistaa.


## Teknologiat

Backend:

* C#
* ASP.NET Core Web API
* ASP.NET Core Identity
* Entity Framework Core
* SQLite
* REST API
* XML / `XmlSerializer`

Frontend:

* React
* TypeScript
* Vite
* REST API -yhteys backendiin
* Material UI


## Fimea-aineiston tuonti

Sovellus käyttää Fimean Perusrekisteri XML -aineistoa lääkkeiden perustietojen lähteenä.

XML-tiedosto sijoitetaan backend-projektissa hakemistoon:

``backend/Laakelista.Api/FimeaData/perusrekisteri.xml``

Aineistoa ei ole kuitenkaan tallennettu GitHub-repositorioon, koska XML-tiedosto on hyvin suuri.

Aineisto löytyy internetistä osoitteesta ``https://fimea.fi/laakehaut_ja_luettelot/perusrekisteri-xml``


## Sovelluksen käynnistäminen kehitysympäristössä

### Backend

Siirry backend-projektin kansioon:

``cd backend/Laakelista.Api``

Käynnistä sovellus:

``dotnet run``

Backend käynnistyy paikallisesti ASP.NET Coren määrittämään osoitteeseen, oletuksena ``http://localhost:5027``.

### Frontend

Siirry frontend-kansioon:

``cd frontend``

Asenna riippuvuudet:

``npm install``

Käynnistä kehityspalvelin:

``npm run dev``

Frontend käynnistyy Viten kehityspalvelimelle, oletuksena osoitteeseen ``http://localhost:5173``.



## Tekoälyn käyttö projektissa

Projektin toteutuksessa on hyödynnetty ChatGPT-tekoälyä ohjelmistokehityksen tukena. Tekoälyä on käytetty esimerkiksi projektin rakenteen ja teknisten ratkaisujen suunnitteluun, ongelmatilanteiden selvittämiseen sekä tämän yhteenvedon tuottamiseen. Lopullisesta toteutuksesta ja testaamista vastaan kuitenkin itse.