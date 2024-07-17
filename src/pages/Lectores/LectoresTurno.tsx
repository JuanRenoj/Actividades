import React,{ChangeEvent, FormEvent, useState,useEffect} from 'react'
import Modal from '../../components/modal/Modal'
import TextInput from '../../components/inputs/TextInput'
import { ToastContainer, toast } from 'react-toastify'
import Alert from '../../util/Alert'
import "../../service/firebase";
import {getFirestore,collection, addDoc,getDocs} from 'firebase/firestore'

import { getDataTurnoLector, TurnoType } from '../../interfaces/Turno'
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
import { GrupoType } from '../../interfaces/Grupo'
import CardTurno from '../../components/cards/CardTurno'
import SubDropDown from '../../components/dropdowns/SubDropDown'
import DropDownButton from '../../components/dropdowns/DropDownButton'
import ContainerSelect from '../../components/containers/ContainerSelect'
import ContainerButtonSort from '../../components/containers/ContainerButtonSort'
import SelectGruop from '../../components/inputs/SelectGruop'
import InputSelect from '../../components/inputs/InputSelect'
import { Actividades } from '../../util/Strings'


function LectoresActividad() {
    const TABLENAME="Turnos"
    const MINISTERIO="Lectores"
    const db=getFirestore();
    const [showModal, setShowModal] = useState<boolean>(false)
    const [id, setId] = useState<string>("")
    const [nombre, setNombre] = useState<string>("")
    const [lugar, setLugar] = useState<string>("")
    const [fecha, setFecha] = useState<string>("")
    const [estado, setEstado] = useState<string>("")
    const [encargado, setEncargado] = useState<string>("")
    const [hora, setHora] = useState<string>("")
    const [title, setTitle] = useState<string>("Agregar Nueva Turno")
    const [action, setAction] = useState<string>("new")
    const [turnoData, setTurnoData] = useState<TurnoType[]>([]);
    const [turnoDataAux, setTurnoDataAux] = useState<TurnoType[]>([]);
    const [searchValue, setSearchValue] = useState<string>("")
    const [sortByColumn, setSortByColumn] = useState<string>("")
    const [sortByStatus, setSortByStatus] = useState<string>("")
    const [groupData, setGroupData] = useState<GrupoType[]>([]);
    const [groupDataAux, setGroupDataAux] = useState<GrupoType[]>([]);
    
    const [ASC, setASC] = useState<boolean>(false)

    useEffect(() => {
        getGroup();
        getTurno()
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
        const handleEncargado = (e:ChangeEvent<HTMLInputElement>) => {
          setEncargado(e.target.value)
        }
        
        const handleEstado = (e:ChangeEvent<HTMLInputElement>) => {
          let value=e.target.value
          if(value.length <=25){
              setEstado(e.target.value)
          }
        
        }
        const handleFecha = (e:ChangeEvent<HTMLInputElement>) => {
          setFecha(e.target.value)
        }

        const getGroup = async():Promise<void> => {
          let result:[]=await Data.ViewData("Grupos") as unknown as any;
          if(result.length > 0){
              setGroupData(SortData(result,"nombre",true))
              setGroupDataAux(SortData(result,"nombre",true)) 
          return
          }
          setGroupData([])
          setGroupDataAux([]) 
       
       }
     const getTurno = async():Promise<void> => {
        let result:[]=await Data.ViewData(TABLENAME) as unknown as any;
        if(result.length > 0){
            setTurnoData(SortData(result,"fecha",true))
            setTurnoDataAux(SortData(result,"fecha",true)) 
        return
        }
        setTurnoData([])
        setTurnoDataAux([]) 
     
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
           let result=await Data.InsertNew(getDataTurnoLector(nombre,lugar,fecha,hora,encargado,estado),TABLENAME);
           if(result){
              Alert.SuccessInsert();
              clearInputs()
              await getTurno()
              return
           }
            Alert.ErrorInsert();         
        }
        const updateActivity =async ():Promise<void> => {
          let result=await Data.UpdateItem(getDataTurnoLector(nombre,lugar,fecha,hora,encargado,estado),TABLENAME,id)
          if(result){
            Alert.SuccessUpdate();
            clearInputs()
            await getTurno()
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
          setEncargado("")
          setEstado("")
          setAction("new")
          setTitle("Ingresar Nueva Turno")
        }
        
        const searchItem = (e:ChangeEvent<HTMLInputElement>) => {
          setSearchValue(e.target.value)
          setTurnoData(SearchItem(turnoDataAux,e.target.value));
        }
        const sortItemColumn = (column:string) => {
          setSortByColumn(column)
          setTurnoData(SortData(turnoData,column as keyof TurnoType,ASC))
          setASC(!ASC)
        }
        const searchItemStatus = (estado:string) => {
          setSortByStatus(estado)
          setTurnoData(SearchItem(turnoDataAux,estado))
         
        }
        
        const openEditModal = (params:TurnoType) => {    
          setId(params.id!)
          setNombre(params.nombre);
          setLugar(params.lugar)
          setFecha(params.fecha)
          setHora(params.hora)
          setEstado(params.estado)
          setEncargado(params.lectores!)
          setAction("update")
          setShowModal(true)     
          setTitle("Actualizar Turno")     
        }
        const openConfirmDelete=(params:TurnoType)=>{
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
            await getTurno()
            return
          }
          Alert.ErrorDelete();
        }
        
        const selectEncargado = (encargado:string) => {
          setEncargado(encargado)
        }
        const selectActividad = (actividad:string) => {
          setNombre(actividad)
        }
        
        
      return (
        <>
        <ToastContainer/>
        <Modal show={showModal} setShow={setShowModal} onSubmit={handelSubmit} title={title} >
         {/*    <TextInput value={nombre} onChange={handleNombre} label='Actividad' type='text' required/> */}
            <InputSelect item={Actividades} onChange={handleNombre} onClick={selectActividad} value={nombre} label='Seleccionar o agregar actividad' required />
            <TextInput value={lugar} onChange={handleLugar} label='Lugar' type='text' required/>
            <TextInput value={fecha} onChange={handleFecha} label='Fecha' type='date' required/>
            
            <TextInput value={hora} onChange={handleHora} label='Hora' type='time' required/>
            <SelectGruop item={groupData} onClick={selectEncargado} onChange={handleEncargado} value={encargado} label='Seleccionar o ingresar encargado' required />  
            <TextInput value={estado} onChange={handleEstado} label='Observacion' type='text' required/>
        </Modal>
       
        <ModuleHeader>
            <SearchContainer>
                <InputSeacrch value={searchValue} onChange={searchItem} />
                <ButtonAdd title='+' onClick={setShowModal} showModal={showModal}/>
            </SearchContainer>
            <Tab>
                <OptionTab tabActive={sortByStatus} value='' nameTab='Todo' onClick={searchItemStatus} />
               {/*  <OptionTab tabActive={sortByStatus} value='Activo' nameTab='Activo' onClick={searchItemStatus} />
                <OptionTab tabActive={sortByStatus} value='Pendiente' nameTab='Pendiente' onClick={searchItemStatus} />
            */} 
            </Tab>
            <ContainerButtonSort>
            <DropDownSort>
                <OptionSort title='Nombre' column='nombre' onClick={sortItemColumn}/>
                <OptionSort title='Fecha' column='fecha' onClick={sortItemColumn}/>
                <OptionSort title='Encargado' column='encargados' onClick={sortItemColumn}/>
            </DropDownSort>
            </ContainerButtonSort>
        </ModuleHeader>
   
       <SubDataContainer>
        {turnoData.length>0 ?
        
         turnoData.map((item,index)=>(
         <CardTurno item={item} key={index} type="lectores">
            <ButtonDelete<TurnoType> item={item} onClick={openConfirmDelete} />
            <ButtonEditar<TurnoType> item={item}  onClick={openEditModal} />
            
         </CardTurno>
         ))
        :null
         
        }
       </SubDataContainer>
          
    
        </>
      )
    }
    

export default LectoresActividad
