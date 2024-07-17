import React,{useState,useEffect, ChangeEvent, FormEvent} from 'react'
import CardActividad from '../../components/cards/CardActividad'

import { ToastContainer } from 'react-toastify'
import Alert from '../../util/Alert'
import "../../service/firebase";
import {getFirestore,collection, addDoc,getDocs} from 'firebase/firestore'

import { ActividadType, getDataActivity } from '../../interfaces/Activadad'
import { SortData } from '../../util/SortData';
import { SearchItem } from '../../util/SearchItem';
import Tab from '../../components/tabs/Tab';
import OptionTab from '../../components/tabs/OptionTab';
import DropDownSort from '../../components/dropdowns/DropDownSort';
import OptionSort from '../../components/dropdowns/OptionSort';
import DataContainer from '../../components/containers/DataContainer';
import SearchContainer from '../../components/containers/SearchContainer';
import InputSeacrch from '../../components/inputs/InputSeacrch';
import ModuleHeader from '../../components/containers/ModuleHeader';
import Data from '../../service/Data';
import ContainerButtonSort from '../../components/containers/ContainerButtonSort';
import CardTurnos from '../../components/cards/CardTurnos';
import { GrupoType } from '../../interfaces/Grupo';

import ModalDetail from '../../components/modal/ModalDetail';

function Activdad() {
  const db=getFirestore();
  const [showModal, setShowModal] = useState<boolean>(false)
  const TABLENAME="Turnos"
const [tabActive, setTabActive] = useState<string>("")
const [activityData, setActivityData] = useState<ActividadType[]>([]);
const [activityDataAux, setActivityDataAux] = useState<ActividadType[]>([]);
const [grupoLectores, setGrupoLectores] = useState<GrupoType[]>([])
const [grupoMinistros, setGrupoMinistros] = useState<GrupoType[]>([])
const [grupoMonaguillos, setGrupoMonaguillos] = useState<GrupoType[]>([])
const [Integrantes, setIntegrantes] = useState<string[]>([])
const [ASC, setASC] = useState<boolean>(false)
const [searchValue, setSearchValue] = useState<string>("")

  useEffect(()=>{
getActivity()
getGroupLectores();
getGroupMinistros();
getGroupMonaguillos();
  },[])
const getActivity = async():Promise<void> => {
  let result:[]=await Data.ViewData(TABLENAME) as unknown as any;
  if(result.length > 0){
    setActivityData(SortData(result,"fecha",true))
    setActivityDataAux(SortData(result,"fecha",true)) 
  return
  }
  setActivityData([])
  setActivityDataAux([]) 
}

const getGroupLectores = async():Promise<void> => {
  let result:[]=await Data.ViewData("Grupos") as unknown as any;
  console.log(result)
  if(result.length > 0){
      setGrupoLectores(result)      
  return
  }
  setGrupoLectores([])  
}
const getGroupMinistros = async():Promise<void> => {
  let result:[]=await Data.ViewData("GrupoMinistro") as unknown as any;
  console.log(result)
  if(result.length > 0){
      setGrupoMinistros(result)      
  return
  }
  setGrupoMinistros([])  
}
const getGroupMonaguillos = async():Promise<void> => {
  let result:[]=await Data.ViewData("GrupoMonaguillos") as unknown as any;
  console.log(result)
  if(result.length > 0){
      setGrupoMonaguillos(result)      
  return
  }
  setGrupoMonaguillos([])  
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
const onSubmit = (e:FormEvent<HTMLFormElement>) => {
  e.preventDefault();
}
const viewGroupDeatil = (ministrio:string, openModal:boolean, groupName:string) => {
  if(groupName !== undefined){
      let integrantres=getMiembros(ministrio,groupName) 
    setIntegrantes(integrantres as unknown as [])     
    setShowModal(openModal)
  }

}
const getMiembros = (ministerio:string,grupo:string) => {
  console.log(ministerio,grupo)
  switch(ministerio){
    case "Lectores":
      let lectores:string[]= [];
      grupoLectores.forEach((item)=>{
      
        if(item.nombre.toLowerCase()===grupo.toLowerCase()){
           console.log(item) 
       lectores= item.integrantres.split(",");
        }
      })
      return lectores
    case "Ministros":
      let ministro:string[]= [];
      grupoMinistros.forEach((item)=>{
        console.log(item)
        if(item.nombre.toLowerCase()===grupo.toLowerCase()){
       ministro= item.integrantres.split(",");
        }
      })
      return ministro;
      case "Monaguillos":
        let monaguillos:string[]= [];
      grupoMonaguillos.forEach((item)=>{
        console.log(item)
        if(item.nombre.toLowerCase()===grupo.toLowerCase()){
       monaguillos= item.integrantres.split(",");
        }
      })
      return monaguillos;
  }
  return []
}

  return (
    <>
    <ModuleHeader>
      <SearchContainer>
        <InputSeacrch value={searchValue} onChange={searchItem}/>
      </SearchContainer>      
      <Tab>
        <OptionTab nameTab='Todo' tabActive={tabActive} value='' onClick={searchItemTab}/>
   {/*      <OptionTab nameTab='Pendiente' tabActive={tabActive} value='Pendiente' onClick={searchItemTab}/>
        <OptionTab nameTab='Activo' tabActive={tabActive} value='Activo' onClick={searchItemTab}/> */}
      </Tab>
      <ContainerButtonSort>
      <DropDownSort>
        <OptionSort title='Nombre' column='nombre' onClick={sortData}/>
        <OptionSort title='Fecha' column='fecha' onClick={sortData}/>
        <OptionSort title='Lugar' column='lugar' onClick={sortData}/>
      </DropDownSort>
      </ContainerButtonSort>
    </ModuleHeader>
    <DataContainer>
      {activityData.length>0 ?
      activityData.map((item,index)=>(
         <CardTurnos key={index} item={item} onClick={viewGroupDeatil}>

         </CardTurnos>
      ))
      
      :
      null}

   </DataContainer>
   <ModalDetail setShow={setShowModal} show={showModal} onSubmit={onSubmit} title='Integrantes del grupo'>
    {
      Integrantes.length>0 ?
      Integrantes.map((item,index)=>(
        <label key={index}>{item}</label>
      ))
      
      :null
    }
   </ModalDetail>
    </>
  )
}

export default Activdad
