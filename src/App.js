import React ,{useState, useEffect}from 'react';
import './App.css';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';



function App() {

  const [ciudad,  guardarCiudad]=useState('');
  const [pais, guardarPais]= useState('');
  const [error, guardarError]= useState(false);
  const [resultado, guardarResultado]= useState({});

  useEffect(()=>{
    // PREVENIR EJECUSION
    if(ciudad==='') return;

     // vamos a consultar a la API
  const consultarAPI= async() =>{

    const appId='a5eb0650151ad8f36d593ee70b6157a8';

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    // consultar la url
    const respuesta= await fetch(url);
    const resultado= await respuesta.json();

    guardarResultado(resultado);

}

    consultarAPI();
  },[ciudad, pais]);

  const datosConsultas= datos =>{
    //validar que ambos campos esten
    if(datos.ciudad ===''|| datos.pais ===''){
      // un error
      guardarError(true);
      return;
    }
    //ciudad  y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

    //se carga un componente condicional
    let componente;
    if(error){
      //hay un error, mostrarlo
      componente=<Error mensaje='ambos campos son obligatorios'/>
      // si la ciudad no  existe, error
    }else if(resultado.cod==='404'){
      componente=<Error mensaje='La ciudad no existe en nuestro registro'/>
    }
    else{
      //mostrar el clima
      componente=<Clima
      resultado={resultado}
      />;
    }

  return(
    <div className='App'>
      <Header
      titulo='Clima React App'
      />

      <div className='contenedor-form' >
        <div className='container'>
          <div className='row'>
            <div className='col s12 m6'>
              <Formulario
              datosConsultas={datosConsultas}
              />
            </div>
            <div className='col s12 m6' >
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default App;
