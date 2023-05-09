import React,{useState} from 'react'



//Lista de las carreras que existen
const Listar = () => {
    const carreras = ['Ing. en Sistemas', 'Ing. en Quimica', 'Lic. en Administracion', "Ing. en TIC'S",
        'Ing. en Civil', 'Ing. en Logistica', 'Ing. en Electrica', 'Ing. en Mecatronica']  

//Hooks
    const [alumnos, setAlumnos] = useState([]) //lista de los datos de alumno con sus datos
    const [matricula, setMatricula] = useState('')
    const [nombre, setNombre] = useState('')
    const [carrera, setCarrera] = useState('')
    const [imagen, setImagen] = useState()
    const [funcion, setFunciones] = useState('Registrar') //Boton para registrar y guardar cambios 

    const handleMatriculachanged=(event)=>{setMatricula(event.target.value)}
    const handleNombrechanged=(event)=>{setNombre(event.target.value)}
    const handleCarrerachanged=(event)=>{setCarrera(event.target.value)}
    const handleImagenchanged=(event)=>{const file=event.target.files[0]
        setImagen(file)}

    const submirForm=(event)=>{
        event.preventDefault() //los datos ya se mandan por eso se pone el prevent
        if(funcion == 'Registrar'){
            const indice = alumnos.findIndex((alumno)=>alumno.matricula==matricula)
            if(indice==-1){
                window.confirm("ALUMNO REGISTRADO CON EXITO")
                const objeto={matricula:matricula, nombre:nombre, carrera:carrera, imagen:imagen}
                setAlumnos([...alumnos,objeto]) 
                limpiar()
            }else{
                window.confirm("ESTA MATRICULA YA EXISTE...!!")
            }

        }else{
             const indice=alumnos.findIndex((alumno)=>alumno.matricula === matricula)
             const datosActualizar=alumnos[indice]
             datosActualizar.nombre=nombre
             datosActualizar.carrera=carrera

             if(imagen!=null){
                datosActualizar.imagen=imagen

             }
             const copia=[...alumnos]
             copia[indice]=datosActualizar
             setAlumnos(copia)
             setFunciones('Registrar')
             const matr=document.getElementById('matricula')
             matr.disabled=false
            limpiar()
        }
    }

    const eliminar=(indice)=>{
        setAlumnos(alumnos.filter((_,index)=>index!==indice));
    }

    const editar=(datos)=>{
        const matr=document.getElementById('matricula')
        matr.disabled=true
        setFunciones('Guardar')
        setMatricula(datos.matricula)
        setNombre(datos.nombre)
        setCarrera(datos.carrera)
        setImagen(datos.imagen)
    }

    const limpiar=()=>{
        setMatricula('') //llevan comillas simple porque hace referencia a que este se encuentra vacio 
        setNombre('')
        setCarrera('')
        setImagen(null) //en caso de la imagen lleva null para que no se retorne 
    }

  return (
    <>
    <h1>Registro Alumnos</h1>
    <br></br>
    <form onSubmit={submirForm}> {/*Formulario donde mandaran a llamar los hooks correspondientes */}
        <label>Matricula<br></br>
        <input type='tex' onChange={handleMatriculachanged} value={matricula} id='matricula'/></label>
        <label>Nombre <br></br>
        <input type='tex' onChange={handleNombrechanged} value={nombre} required/></label>

        <select onChange={handleCarrerachanged} value={carrera} required>
            <option selected>Selecciona carrera</option>
            {carreras.map((carr,index)=>{
                return <option key={index}>{carr}</option>
            })}
        </select> 

        <input type='file' accept='image/*' onChange={handleImagenchanged} ref={imagen} required/> 

        <button type='submit' class='btn btn-success'>{funcion}</button>
    </form>

    <br></br>
    <h2>Tabla Alumnos</h2>
    <br></br>
    <div className='container'>
        <div class='row'>
            <div class='col'>
        <table className='table table-striped'> {/*Se genera la tbla con los correspondientes encabezados*/}
            <thead>
                <tr>
                    <th>Matricula</th>
                    <th>Nombre</th>
                    <th>Carrera</th>
                    <th>Foto</th>
                    <th>Funciones</th>
                    
                </tr>
            </thead>
            <tbody>
                {alumnos.map((alumno,index)=>(
                    <tr>
                        <td>{alumno.matricula}</td>
                        <td>{alumno.nombre}</td>
                        <td>{alumno.carrera}</td>
                        <td>{alumno.imagen ? <img width={100} src={URL.createObjectURL(alumno.imagen)} alt='Foto'/> : ''}</td>
                        <td>
                        <button type='button' class='btn btn-warning' onClick={()=>editar(alumno)}>Editar</button>
                        {" "} {" "}
                        <button type='button' class='btn btn-danger' onClick={()=>eliminar(index)}>Eliminar</button>
                     
                        </td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
    </div>
    </>
  )
}

export default Listar