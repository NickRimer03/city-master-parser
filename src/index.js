function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function degToDMS(deg) {
  const d = Math.trunc(deg);
  const m = Math.trunc((deg - d) * 60);

  return { d, m, s: ((deg - d) * 60 - m) * 60 };
}

function DMSToDeg({ d, m, s }) {
  return d + m / 60 + s / 3600;
}

function findCity(cities, cityName) {
  return cities.filter(({ a }) => a.includes(cityName));
}

function firstLetterUp(name) {
  return name[0].toUpperCase() + name.slice(1);
}

function DegToRad(deg) {
  return (deg * Math.PI) / 180;
}

function getDistance(oldLa, oldLo, newLa, newLo) {
  const R = 6371;
  const ola = DegToRad(oldLa);
  const olo = DegToRad(oldLo);
  const nla = DegToRad(newLa);
  const nlo = DegToRad(newLo);
  const d = Math.acos(Math.sin(ola) * Math.sin(nla) + Math.cos(ola) * Math.cos(nla) * Math.cos(olo - nlo));

  return R * d;
}

function getStartLetter(cityname) {
  const forbidden = ["ь", "ъ", "ы", " ", "-", "'"];
  let i = 1;
  let lastLetter = "";
  do {
    lastLetter = cityname[cityname.length - i++];
  } while (forbidden.includes(lastLetter));

  return lastLetter.toUpperCase();
}

function getCoords() {
  return "";
}

const cityname = document.getElementById("cityname");
const cityok = document.getElementById("cityok");

const xhr = new XMLHttpRequest();

xhr.open("GET", "../bundle/cities500.json");
xhr.send();
xhr.onloadend = () => {
  if (xhr.status != 200) {
    console.log(`${xhr.status}: ${xhr.statusText}`);
  } else {
    console.clear();
    cityname.focus();

    const cityJSON = JSON.parse(xhr.responseText);
    const rndCity = cityJSON[getRandom(0, cityJSON.length - 1)];
    const rndCityName = rndCity.a[0];
    const lastLatitude = rndCity.la;
    const lastLongitude = rndCity.lo;
    const namedCities = [rndCityName];
    let distanceRun = 0;
    let nextStartLetter = getStartLetter(rndCityName);
    console.log(`Игра начинается в городе ${firstLetterUp(rndCityName)} в координатах ${getCoords()}`);
    console.log(`Назовите следующий пункт путешествия на букву '${nextStartLetter}'`);

    cityok.onclick = () => {
      const name = cityname.value.toLowerCase();
      const Name = firstLetterUp(name);

      if (name[0] === nextStartLetter.toLowerCase()) {
        const cities = findCity(cityJSON, name);
        if (cities.length) {
          if (!namedCities.includes(name)) {
            namedCities.push(name);
            const distances = [];
            cities.forEach(city => {
              console.log(city);
              distances.push(getDistance(lastLatitude, lastLongitude, city.la, city.lo));
            });
            if (distances.length === 1) {
              console.log(`Перемещаемся в город ${Name} в координаты ${getCoords()}`);
            } else {
              console.log(`Найдено ${cities.length} городов с именем ${Name}`);
            }
            const currentDistance = Math.min(...distances);
            distanceRun += currentDistance;
            console.log(`Вы прошли ${Math.trunc(distanceRun)} км`);
            nextStartLetter = getStartLetter(name);
            console.log(`Назовите следующий пункт путешествия на букву '${nextStartLetter}'`);
          } else {
            console.log(`City ${Name} was already named.`);
          }
        } else {
          console.log(`Nothing found: ${Name}`);
        }
      } else {
        console.log(`You city name have to start with the letter '${nextStartLetter}'`);
      }
    };
  }
};
