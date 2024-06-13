import React,{useState,useEffect, ChangeEvent} from 'react'
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

function Activdad() {
  const db=getFirestore();
  const TABLENAME="Actividad"
const [tabActive, setTabActive] = useState<string>("")
const [activityData, setActivityData] = useState<ActividadType[]>([]);
const [activityDataAux, setActivityDataAux] = useState<ActividadType[]>([]);
const [ASC, setASC] = useState<boolean>(false)
const [searchValue, setSearchValue] = useState<string>("")

  useEffect(()=>{
getActivity()
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
    <ModuleHeader>
      <SearchContainer>
        <InputSeacrch value={searchValue} onChange={searchItem}/>
      </SearchContainer>      
      <Tab>
        <OptionTab nameTab='Actividades' tabActive={tabActive} value='' onClick={searchItemTab}/>
        <OptionTab nameTab='Pendiente' tabActive={tabActive} value='Pendiente' onClick={searchItemTab}/>
        <OptionTab nameTab='Activo' tabActive={tabActive} value='Activo' onClick={searchItemTab}/>
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
         <CardActividad key={index} item={item}/>
      ))
      
      :
      null}

   </DataContainer>
    </>
  )
}

export default Activdad
