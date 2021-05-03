//Lisätään kuuntelija ensimmäiselle nappulalle, joka vastaa uuden listan tehtävän lisäämisestä
$("#nappula1").click(function () {
  //Otetaan käyttäjän syöte ylös
  let syote = $( "#kentta" ).val();
  //Varmistetaan, että kentässä on tarpeeksi tekstiä ja jos ei ole, niin siitä huomautetaan
  if (syote == null || syote == "" || syote.length < 2) {
    $( "#kentta" ).css("border-color", "red");
    alert("Field must be filled.");
    return false;
  }
  let newElement = $( "<li class='list-group-item'>" + syote + "</li>" )
  newElement.appendTo( "#lista" );
  //Muutetaan kentän kehys takaisin taustan väriseksi siltä varalta, että se on nyt punainen
  $( "#kentta" ).css("border-color", "grey");
  //Tallennetaan lista selaimen muistiin
  localStorage.setItem("muistilista", $( "#lista" ).html());
  //Lisätään laskuri, jotta keskeneräisten tehtävien määrä kasvaa yhdellä
  laskuri();
});

//lisätää toiseen nappulaan kuuntelija, joka tuo listan kaikki tehtävät esille
$("#nappula2").click(function () {
  //Lasketaan yhteen kaikki listan tehtävät
  let lista = $( ".list-group-item" );
  //Tehdään looppi, joka muuttaa kaikki listan tehtävät näkyviksi
  for (i = 0; i < lista.length; i++) {
    $(lista[i]).slideDown("slow", function () {
    });
  }
});

//Lisätään kolmanteen nappulaan kuuntelija, joka näyttää vain keskeneräiset tehtävät
$("#nappula3").click(function () {
  //Tehdään lista kaikista tehtävistä, joilla on luokka "kesken"
  let lista1 = $( ".list-group-item" );
  //Tehdään looppi, jossa kaikki tehtävät joilla on luokka "kesken" muutetaan näkyviksi
  for (i = 0; i < lista1.length; i++) {
    $(lista1[i]).slideDown("slow", function () {
    });
  }
  //Tehdään lista, joka sisältää kaikki tehtävät, joilla on luokka "valmis"
  let lista2 = $( ".valmis" );
  //Tehdään looppi, jossa kaikki tehtävät joilla on luokka "valmis" muutetaan näkymättömiksi
  for (i = 0; i < lista2.length; i++) {
    $(lista2[i]).slideUp("slow", function () {
    });
  }
});

//Lisätään neljännelle nappulalle kuuntelija, joka näyttää vain valmiit tehtävät
$("#nappula4").click(function () {
  //Tehdään lista kaikista tehtävistä, joilla on luokka "kesken"
  let lista1 = $( ".list-group-item" );
  //Tehdään looppi, jossa kaikki tehtävät joilla on luokka "kesken" muutetaan näkymättömiksi
  for (i = 0; i < lista1.length; i++) {
    $(lista1[i]).slideUp("slow", function () {
    });
  }
  //Tehdään lista, joka sisältää kaikki tehtävät, joilla on luokka "valmis"
  let lista2 = $( ".valmis" );
  //Tehdään looppi, jossa kaikki tehtävät joilla on luokka "valmis" muutetaan näkyviksi
  for (i = 0; i < lista2.length; i++) {
    $(lista2[i]).slideDown("slow", function () {
    });
  }
});

//lisätään kuuntelija toiselle nappulalle, joka poistaa listan tehtävät kokonaan
$("#nappula5").click(function () {
  //Poistetaan lista selaimen muistista
  window.localStorage.removeItem("muistilista");
  //Tyhjennetään listan HTML-koodi
  $( "#lista" ).html("");
  //Listään laskuri tänne, jotta luku nollaantuu listan tyhjentyessä
  laskuri();
});

//lisätään kuuntelija listan tehtäviin, jolloin tehtävää painaessa sen luokkaan lisätään "valmis" ja uudestaan painaessa tämä luokka poistetaan
$("#lista").click(function (x) {
    if (x.target.tagName === "LI") {
        x.target.classList.toggle("valmis");
      }
      //Tallennetaan muutos tehtävän luokassa selaimen muistiin
      localStorage.setItem("muistilista", $("#lista").html());
      //lisätään laskuri tänne, jotta keskeneräisten tehtävien määrä päivittyy tehtävän luokan muuttuessa
      laskuri();
});

//Tehdään laskin joka kertoo montako listan tehtävää on vielä kesken
function laskuri() {
  //Valitaan kaikki listan tehtävät
  let kokonaismaara = $(".list-group-item");
  //Valitaan kaikki valmiit tehtävät
  let valmiitMaara = $(".valmis");
  //Tehdään muutuja, joka ottaa ylös kaikkien tehtävien ja valmiiden tehtävien erotuksen, eli keskeneräiset tehtävät
  let keskenMaara = kokonaismaara.length - valmiitMaara.length;
  //Asetetaan tämä muuttuja sille tarkoitettuun diviin
  $("#laskuri").html( "<button type='button' class='btn btn-primary' disabled data-bs-toggle='button' autocomplete='off'>Unfinished tasks: " + keskenMaara + "</button>" ); 
  //Tallennetaan tämän divin sisältö selaimen muistiin
  localStorage.setItem("laskurinMuisti", $("#laskuri").html());
}


//Asetetaan listan sisällöksi selaimen muistissa oleva lista
var muistilista = localStorage.getItem("muistilista");
$( "#lista" ).html( muistilista );

//Asetetaan laskurin numero selaimen muistista
var laskurinMuisti = localStorage.getItem("laskurinMuisti");
$( "#laskuri" ).html( laskurinMuisti );