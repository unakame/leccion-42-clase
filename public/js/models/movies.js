const getMovies = (callback) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',_ => {
    if(xhr.status != 200) callback(new Erro("Error al obtener datos"));
    callback(null, xhr.response);
  });

  xhr.open('GET','api/movies');
  xhr.responseType = 'json';
  xhr.send();
}
