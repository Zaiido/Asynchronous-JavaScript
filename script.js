const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e61007edfdmsh4197945bb216112p1ff9c1jsne2d3fa5e61c8",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

let uniqueAlbumsArray = [];
let songsArray = [];

const fetchPerArtist = () => {
  let artistsArray = ["Pink Floyd", "Daft Punk", "Metallica"];
  for (let artist of artistsArray) {
    getInfos(artist);
  }
};

let rowNumber = 0;
const buildList = (songs, artist) => {
  rowNumber++;
  let bodyNode = document.querySelector("body");
  bodyNode.innerHTML += `
    <div class="container">
        <h2 class="text-center my-5">${artist}</h2>
        <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-${rowNumber}"> </div>
    </div>`;
  let rowNode = document.querySelector(`.row-${rowNumber}`);
  for (let song of songs) {
    if (uniqueAlbumsArray.includes(song.album.title) === false) {
      uniqueAlbumsArray.push(song.album.title);
    }

    songsArray.push(song.title);

    rowNode.innerHTML += `
        <div class="my-4 px-1">
            <div class="card border-0 rounded-0">
                <img src="${song.album.cover_big}" class="card-img-top rounded-0" alt="Album Cover">
                <div class="card-body bg-dark text-light mt-2">
                    <h5 class="card-title truncate">${song.title}</h5>
                </div>
            </div>
        </div>`;
  }
};

const handleError = (err) => {
  let bodyNode = document.querySelector("body");
  bodyNode.innerHTML = `
    <div class="container mt-4">
        <div class="alert alert-danger" role="alert">
            ${err}
        </div>
    </div>`;
};

const getInfos = (artist) => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      buildList(data.data, artist);
    })
    .catch((err) => {
      handleError(err);
    });
};

const uniqueAlbumsNumber = () => {
  console.log(uniqueAlbumsArray.length);
};

const songTitlesList = () => {
  let ulNode = document.querySelector(".modal-body ul");
  for (let song of songsArray) {
    ulNode.innerHTML += `<li>${song}</li>`;
  }
};

window.onload = fetchPerArtist;
