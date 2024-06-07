import React,{useState,useEffect, ChangeEvent} from 'react'
import CardActividad from '../../components/cards/CardActividad'

import { ToastContainer } from 'react-toastify'
import Alert from '../../util/Alert'
import "../../service/firebase";
import {getFirestore,collection, addDoc,getDocs} from 'firebase/firestore'

import { ActividadType, getDataActivity } from '../../interfaces/Activadad'
import { SortData } from '../../util/SortData';
import { SearchItem } from '../../util/SearchItem';

function Activdad() {
  const db=getFirestore();
const [openSort, setOpenSort] = useState<boolean>(false)
const [tabActive, setTabActive] = useState<string>("")

const [activityData, setActivityData] = useState<ActividadType[]>([]);
const [activityDataAux, setActivityDataAux] = useState<ActividadType[]>([]);
const [ASC, setASC] = useState<boolean>(false)
const [searchValue, setSearchValue] = useState<string>("")
const [searchTab, setSearchTab] = useState<string>("")
  useEffect(()=>{
getActivity()
  },[])
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
const sortData = (column:string) => {
  setActivityData(SortData(activityDataAux,column as keyof ActividadType,ASC))
  setASC(!ASC)
}
const searchItem = (e:ChangeEvent<HTMLInputElement>) => {
  setSearchValue(e.target.value)
  setActivityData(SearchItem(activityDataAux,e.target.value))
}
const searchItemTab = (estado:string) => {
  setTabActive(estado)
  setActivityData(SearchItem(activityDataAux,estado))
}


  return (
    <>
    <div className='div-header'>
      <div className='div-search'>
        <div className='div-input-search'>
            <i className='bx bx-search icon-search'></i>
            <input type='search'className='input-search' value={searchValue} onChange={searchItem} />
        </div>      
        <button className='btn-secondary'>+</button>
      </div>
      <div className='div-tabs'>
        <span className={`${tabActive==="" ? "tab-active":""}`} onClick={()=>searchItemTab("")}>Actividedes</span>
        <span className={`${tabActive==="Pendiente" ? "tab-active":""}`} onClick={()=>searchItemTab("Pendiente")}>Pendientes</span>
        <span className={`${tabActive==="Pasada" ? "tab-active":""}`} onClick={()=>searchItemTab("Pasada")}>Pasadas</span>
        <span className={`${tabActive==="Activo" ? "tab-active":""}`} onClick={()=>searchItemTab("Activo")}>Activo</span></div>
      <div className='div-sort'>
        <div className={`${openSort ? "close-sort  open-sort":"close-sort"}`}>
          <div className='menu-sort'>
            <span onClick={()=>sortData("nombre")}>Nombre</span>
            <span onClick={()=>sortData("fecha")}>Fecha</span>
            <span onClick={()=>sortData("lugar")}>Lugar</span>
           
          </div>
        </div>
        
        <i className='bx bx-sort-z-a' onClick={()=>setOpenSort(!openSort)}></i>
      </div>      
    </div>
    <div className='container-data'>    
      {activityData.length>0 ?
      activityData.map((item,index)=>(
         <CardActividad key={index} item={item}/>
      ))
      
      :
      null}
   </div>
    </>
  )
}

export default Activdad
