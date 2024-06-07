import React,{ChangeEvent, FormEvent, useState,useEffect} from 'react'
import Modal from '../../components/modal/Modal'
import TextInput from '../../components/inputs/TextInput'
import { ToastContainer } from 'react-toastify'
import Alert from '../../util/Alert'
import "../../service/firebase";
import {getFirestore,collection, addDoc,getDocs} from 'firebase/firestore'

import { ActividadType, getDataActivity } from '../../interfaces/Activadad'

function Lectores() {
  const db=getFirestore();
    const [showModal, setShowModal] = useState<boolean>(false)
    const [nombre, setNombre] = useState<string>("")
    const [lugar, setLugar] = useState<string>("")
    const [fecha, setFecha] = useState<string>("")
    const [estado, setEstado] = useState<string>("")
    const [hora, setHora] = useState<string>("")
    const [title, setTitle] = useState<string>("Agregar Nueva Actividad")
    const [action, setaAtion] = useState<string>("new")
    const [activityData, setActivityData] = useState<ActividadType[]>([]);
    const [activityDataAux, setActivityDataAux] = useState<ActividadType[]>([]);

    useEffect(() => {
    getActivity()
    }, []);

    const handleNombre = (e:ChangeEvent<HTMLInputElement>) => {
      setNombre(e.target.value)
    }
    const handleLugar = (e:ChangeEvent<HTMLInputElement>) => {
      setLugar(e.target.value)
    }
    const handleHora = (e:ChangeEvent<HTMLInputElement>) => {
      setHora(e.target.value)
    }
    const handleEstado = (e:ChangeEvent<HTMLInputElement>) => {
      setEstado(e.target.value)
    }
    const handleFecha = (e:ChangeEvent<HTMLInputElement>) => {
      setFecha(e.target.value)
    }
    
 const getActivity = async():Promise<void> => {
   try {
    let querySnapshot=await getDocs(collection(db,"Actividad"));
    console.log(querySnapshot)
    let temporalResult:any=[];
    querySnapshot.forEach((doc)=>{
      console.log(doc.data())
      temporalResult.push(doc.data())
    })
    setActivityData(temporalResult)
    setActivityDataAux(temporalResult)
    console.log(temporalResult)
   } catch (error) {
    setActivityData([])
    setActivityDataAux([])
    console.log(error)
    
   }
 }
 

    const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
      if (action==="new") {
        insertActivity();
        return
      }
       updateActivity();
      
    }
    const insertActivity = async():Promise<void> => {
      try {
        let result=await addDoc(collection(db,"Actividad"),
        getDataActivity(
          "",
          nombre,
          lugar,
          fecha,
          hora,
          estado
        ))
        Alert.SuccessInsert();
        clearInputs()
        await getActivity()
      } catch (error) {
        Alert.ErrorInsert();
        console.log(error)
      }
    }
    const updateActivity =async ():Promise<void> => {
      
    }
    const clearInputs = () => {
      setNombre("");
      setLugar("")
      setFecha("")
      setHora("")
      setEstado("")
      
    }
    
    
    
  return (
    <>
    <ToastContainer/>
    <Modal show={showModal} setShow={setShowModal} onSubmit={handelSubmit} title={title} >
    <TextInput value={nombre} onChange={handleNombre} label='Nombre' type='text' required/>
    <TextInput value={lugar} onChange={handleLugar} label='Lugar' type='text' required/>
    <TextInput value={fecha} onChange={handleFecha} label='Fecha' type='date' required/>
    <TextInput value={hora} onChange={handleHora} label='Hora' type='time' required/>
    <TextInput value={estado} onChange={handleEstado} label='Estado' type='text' required/>
    </Modal>
    <div onClick={()=>setShowModal(!showModal)}>
          Lectores
    </div>
   <div>
    {activityData.length>0 ?
    
     activityData.map((item,index)=>(
      <ul key={index}>
      <li>{item.nombre}</li>
      <li>{item.lugar}</li>
      <li>{item.hora}</li>
      <li>{item.estado}</li>
      <li>{item.fecha}</li>
      
      
      </ul>
     ))
    :null
     
    }
   </div>
      

    </>
  )
}

export default Lectores 