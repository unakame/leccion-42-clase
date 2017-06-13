const express    = require('express');
const bodyParser = require('body-parser');
const levelup    = require('levelup');

const app        = express();
const db         = levelup('./data', {valueEnconding: 'json'});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

const router = express.Router();

 //ejemplo Hello World de node express

/*app.get('/', function(req,res){
  res.send('Hello World!');
});*/

// En EcmaScript6
router.get('/', (req,res) => {
  res.json({message: 'Hola soy el API de cinelaboratoria'});
});

router.post('/movies',(req,res) =>{
  //console.log(req.body);  //body es donde viene el formulario/mensaje
  //la-momia
     const id= req.body.nombre.toLowerCase().split(" ").join("-");
     db.put(id,req.body,(err)=>{
      if(err) return res.json({message: "Hubo un error al guardar los datos"});//primer paramettro KEY segundo REGISTRO tercero es el callback qe se da cuando el REGISTRO se mando (asi sea erronea)
     });
     res.json({message: "La película se grabó con éxito"});
});

router.get('/movies',(req,res) =>{
  let movies = [];
  db.createValueStream().on('data', (data) =>{
      movies.push(data);
  }).on('end', _ =>{
     res.json(movies);
  });
});

router.get('/movies:id',(req,res) =>{
  if(req.params.id){
    db.get(req.params.id,(err,movie) =>{
      if(err) return res.json({message: "hubo un error al obtener"});
      res.json(movie);
    });
  }

});



app.use('/api',router);

//para usar el 3000 por default , esta constante es como un if/else
const port = process.env.PORT || 3000;

app.listen(3000, () =>{
  console.log('El server está corriendo en el '+port+'!');
});
