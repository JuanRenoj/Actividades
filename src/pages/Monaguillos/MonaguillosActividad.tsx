import React,{ChangeEvent, FormEvent, useState,useEffect} from 'react'
import Modal from '../../components/modal/Modal'
import TextInput from '../../components/inputs/TextInput'
import { ToastContainer, toast } from 'react-toastify'
import Alert from '../../util/Alert'
import "../../service/firebase";
import {getFirestore,collection, addDoc,getDocs} from 'firebase/firestore'

import { ActividadType, getDataActivity } from '../../interfaces/Activadad'
import SubDataContainer from '../../components/containers/SubDataContainer'
import CardActividad from '../../components/cards/CardActividad'
import ModuleHeader from '../../components/containers/ModuleHeader'
import SearchContainer from '../../components/containers/SearchContainer'
import { SearchItem } from '../../util/SearchItem'
import { SortData } from '../../util/SortData'
import InputSeacrch from '../../components/inputs/InputSeacrch'
import ButtonAdd from '../../components/buttons/ButtonAdd'
import DropDownSort from '../../components/dropdowns/DropDownSort'
import OptionSort from '../../components/dropdowns/OptionSort'
import Tab from '../../components/tabs/Tab'
import OptionTab from '../../components/tabs/OptionTab'
import LabelTitle from '../../components/labels/LabelTitle'
import Data from '../../service/Data'
import CardActividadEdit from '../../components/cards/CardActividadEdit'
import ButtonEditar from '../../components/buttons/ButtonEditar'
import ButtonDelete from '../../components/buttons/ButtonDelete'

import Confirm from '../../components/containers/Confirm'
import ContainerButtonSort from '../../components/containers/ContainerButtonSort'
import InputSelect from '../../components/inputs/InputSelect'
import { Actividades } from '../../util/Strings'

function MonaguillosActividad() {
    const TABLENAME="ActivityMonaguillos"
    const MINISTERIO="Lectores"
    const db=getFirestore();
    const [showModal, setShowModal] = useState<boolean>(false)
    const [id, setId] = useState<string>("")
    const [nombre, setNombre] = useState<string>("")
    const [lugar, setLugar] = useState<string>("")
    const [fecha, setFecha] = useState<string>("")
    const [estado, setEstado] = useState<string>("")
    const [hora, setHora] = useState<string>("")
    const [title, setTitle] = useState<string>("Agregar Nueva Actividad")
    const [action, setAction] = useState<string>("new")
    const [activityData, setActivityData] = useState<ActividadType[]>([]);
    const [activityDataAux, setActivityDataAux] = useState<ActividadType[]>([]);
    const [searchValue, setSearchValue] = useState<string>("")
    const [sortByColumn, setSortByColumn] = useState<string>("")
    const [sortByStatus, setSortByStatus] = useState<string>("")
    
    const [ASC, setASC] = useState<boolean>(false)

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
        let result:[]=await Data.ViewData(TABLENAME) as unknown as any;
        if(result.length > 0){
            setActivityData(SortData(result,"fecha",true))
            setActivityDataAux(SortData(result,"fecha",true)) 
        return
        }
        setActivityData([])
        setActivityDataAux([]) 
     
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
           let result=await Data.InsertNew(getDataActivity(nombre,lugar,fecha,hora,estado),TABLENAME);
           if(result){
              Alert.SuccessInsert();
              clearInputs()
              await getActivity()
              return
           }
            Alert.ErrorInsert();         
        }
        const updateActivity =async ():Promise<void> => {
          let result=await Data.UpdateItem(getDataActivity(nombre,lugar,fecha,hora,estado),TABLENAME,id)
          if(result){
            Alert.SuccessUpdate();
            clearInputs()
            await getActivity()
            return
          }
          Alert.ErrorUpdate()
        }
        const clearInputs = () => {
          setId("")
          setNombre("");
          setLugar("")
          setFecha("")
          setHora("")
          setEstado("")
          setAction("new")
          setTitle("Ingresar Nueva Actividad")
        }
        
        const searchItem = (e:ChangeEvent<HTMLInputElement>) => {
          setSearchValue(e.target.value)
          setActivityData(SearchItem(activityDataAux,e.target.value));
        }
        const sortItemColumn = (column:string) => {
          setSortByColumn(column)
          setActivityData(SortData(activityData,column as keyof ActividadType,ASC))
          setASC(!ASC)
        }
        const searchItemStatus = (estado:string) => {
          setSortByStatus(estado)
          setActivityData(SearchItem(activityDataAux,estado))
         
        }
        
        const openEditModal = (params:ActividadType) => {    
          setId(params.id!)
          setNombre(params.nombre);
          setLugar(params.lugar)
          setFecha(params.fecha)
          setHora(params.hora)
          setEstado(params.estado)
          setAction("update")
          setShowModal(true)     
          setTitle("Actualizar Actividad")     
        }
        const openConfirmDelete=(params:ActividadType)=>{
          toast(<Confirm id={params.id!} onDelete={deleteDataItem} closeToast={()=>{}} />,{
            autoClose:10000,
            position:"top-center"
          })
        }
        const deleteDataItem = async(params:string) => {
          console.log(params)
          let result=await  Data.DeleteData(TABLENAME,params!);
          if(result){
            Alert.SuccessDelete();           
            await getActivity()
            return
          }
          Alert.ErrorDelete();
        }
        
        const selectNombre = (nombre:string) => {
          setNombre(nombre)
          
        }
        
        
      return (
        <>
        <ToastContainer/>
        <Modal show={showModal} setShow={setShowModal} onSubmit={handelSubmit} title={title} >
            {/* <TextInput value={nombre} onChange={handleNombre} label='Nombre' type='text' required/> */}
            <InputSelect item={Actividades} onChange={handleNombre} onClick={selectNombre} value={nombre} label='Seleccionar o agregar actividad' required />
            <TextInput value={lugar} onChange={handleLugar} label='Lugar' type='text' required/>
            <TextInput value={fecha} onChange={handleFecha} label='Fecha' type='date' required/>
            <TextInput value={hora} onChange={handleHora} label='Hora' type='time' required/>
            <TextInput value={estado} onChange={handleEstado} label='Observación' type='text' required/>
        </Modal>
       
        <ModuleHeader>
            <SearchContainer>
                <InputSeacrch value={searchValue} onChange={searchItem} />
                <ButtonAdd title='+' onClick={setShowModal} showModal={showModal}/>
            </SearchContainer>
            <Tab>
                <OptionTab tabActive={sortByStatus} value='' nameTab='Todo' onClick={searchItemStatus} />
                {/* <OptionTab tabActive={sortByStatus} value='Activo' nameTab='Activo' onClick={searchItemStatus} />
                <OptionTab tabActive={sortByStatus} value='Pendiente' nameTab='Pendiente' onClick={searchItemStatus} /> */}
            </Tab>
            <ContainerButtonSort>
            <DropDownSort>
                <OptionSort title='Nombre' column='nombre' onClick={sortItemColumn}/>
                <OptionSort title='Fecha' column='fecha' onClick={sortItemColumn}/>
            </DropDownSort>
            </ContainerButtonSort>
        </ModuleHeader>
   
       <SubDataContainer>
        {activityData.length>0 ?
        
         activityData.map((item,index)=>(
         <CardActividadEdit item={item} key={index} >
            <ButtonDelete<ActividadType> item={item} onClick={openConfirmDelete} />
            <ButtonEditar<ActividadType> item={item}  onClick={openEditModal} />
            
         </CardActividadEdit>
         ))
        :null
         
        }
       </SubDataContainer>
          
    
        </>
      )
    }
    

export default MonaguillosActividad
