import React, {useState} from 'react';

function Formulario ({datosConsultas}) {


    //state del componente. ESTE ES EL STATEY EL setSTATE
    // BUSQUEDA ES IGUAL AL STATE Y GUARDARbusqueda es igual al this.setstate

    const [busqueda,guardarBusqueda]= useState({
        ciudad:'',
        pais:''
    })
    const handleChange= e=>{
        //cambiar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
      
    }

    const consultarClima= e => {
        e.preventDefault();
        // pasar el satate busqueda al component principal que es App
        datosConsultas(busqueda);
    }

    return(
        <form
        onSubmit={consultarClima}
        >

            <div className='input-field col s12' >
                <input
                type='text'
                name='ciudad'
                id='ciudad'
                onChange={handleChange}
                />
                <label htmlFor='ciudad'>Ciudad:</label>
            </div>
            <div className='input-field col s12'>
                <select onChange={handleChange} name='pais'>
                    <option value=''>Selecciona  tu pais</option>
                    <option value='US'>Estados Unidos</option>
                    <option value='MX'>Mexico</option>
                    <option value='AR'>Argentina</option>
                    <option value='CO'>Colombia</option>
                    <option value='CR'>COSTA Rica</option>
                    <option value='ES'>España</option>
                    <option value='PE'>Peru</option>
                </select>
            </div>

            <div className='input-field col s12'>
                <input type='submit' className='waves-effect waves-light btn-large btn-block yellow accent-4' value='Buscar Clima' />
            </div>
        </form>
    )
    
}

export default Formulario;