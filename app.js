// const searchSong =async () => {
//     const searchInput = document.getElementById("search-field").value;
//     const url = `https://api.lyrics.ovh/suggest/${searchInput}`
//    const Response = await fetch(url);
//         const data=await Response.json();
//          displaySong(data.data)
// }
const searchSong = () => {
    const searchInput = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/${searchInput}`
    fetch(url)
        .then(Response => Response.json())
        .then(data => displaySong(data.data))
        .catch(Error=> catchError("Something wrong",Error))
}
const displaySong = song => {
    // console.log(song)
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML =''
    song.forEach(song => {
        const songDive = document.createElement('div')
        songDive.className = "single-result row align-items-center my-3 p-3"
        songDive.innerHTML = `
       <div class="col-md-9">
       <img src="${song.artist.picture_small}" alt="">
       <h3 class="lyrics-name">${song.title}</h3>
       <p class="author lead">Album by <span>${song.artist.name}</span></p>
       <audio controls>
       <source src="${song.preview}" type="audio/mpeg">
       </audio>
       </div>
       <div class="col-md-3 text-md-right text-center">
       <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
       </div>`;
        songContainer.appendChild(songDive);
    });
    document.getElementById("search-field").value =""
}
// const getLyrics = async (artist,title)=>{
//     const url =` https://api.lyrics.ovh/v1/${artist}/${title}`
//     const Response = await fetch(url);
//     const data = await Response.json();
//     displayLyrics(data.lyrics);
// }
const getLyrics = (artist,title)=>{
    const url =` https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(Response => Response.json())
    .then(data=>displayLyrics(data.lyrics))
    .catch(error=>displayLyrics(error));
    
}

const displayLyrics = lyrics=>{
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerText = lyrics;
    if(lyrics =="" || lyrics == null || lyrics==[]){
        alert("Sorry!! Lyrics Can't Find")
    }
   
}
 
const catchError = error =>{
    const errorMessage = document.getElementById("errorMessage")
    errorMessage.innerText = error;
}