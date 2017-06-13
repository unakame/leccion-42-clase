const levelup = require('levelup');
const leveldown = require('leveldown');
const data = require('./movies');


leveldown.destroy('./data', function (err){ console.log('BD destruida')})

const db = levelup('./data', {valueEnconding: 'json'});

data.movies.forEach((movie) => {
  const id = movie.nombre.split(" ").join("-");
  do.put(id,movie,(err) => {
    console.log('pelicula: '+ movie.nombre + 'importada');
  });
});
