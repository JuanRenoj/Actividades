import React,{ChangeEvent, FormEvent, useState,useEffect} from 'react'
import Modal from '../../components/modal/Modal'
import TextInput from '../../components/inputs/TextInput'
import { ToastContainer, toast } from 'react-toastify'
import Alert from '../../util/Alert'
import "../../service/firebase";
import {getFirestore,collection, addDoc,getDocs} from 'firebase/firestore'

import { GrupoType, getDataGrupo } from '../../interfaces/Grupo'
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
import CardGrupo from '../../components/cards/CardGrupo'
import ContainerButtonSort from '../../components/containers/ContainerButtonSort'


function Grupos() {
    const TABLENAME="GrupoMonaguillos"
    const MINISTERIO="Lectores"
    const db=getFirestore();
    const [showModal, setShowModal] = useState<boolean>(false)
    const [id, setId] = useState<string>("")
    const [nombre, setNombre] = useState<string>("")
    const [integrantes, setIntegrantes] = useState<string>("")
    const [title, setTitle] = useState<string>("Agregar Nuevo Grupo")
    const [action, setAction] = useState<string>("new")
    const [groupData, setGroupData] = useState<GrupoType[]>([]);
    const [groupDataAux, setGroupDataAux] = useState<GrupoType[]>([]);
    const [searchValue, setSearchValue] = useState<string>("")
    const [sortByColumn, setSortByColumn] = useState<string>("")
    const [sortByStatus, setSortByStatus] = useState<string>("")    
    const [ASC, setASC] = useState<boolean>(false)

    useEffect(() => {
        getGroup()
        }, []);
    
        const handleNombre = (e:ChangeEvent<HTMLInputElement>) => {
          setNombre(e.target.value)
        }
        const handleLugar = (e:ChangeEvent<HTMLInputElement>) => {
          setIntegrantes(e.target.value)
        }
       
        
     const getGroup = async():Promise<void> => {
        let result:[]=await Data.ViewData(TABLENAME) as unknown as any;
        if(result.length > 0){
            setGroupData(SortData(result,"nombre",true))
            setGroupDataAux(SortData(result,"nombre",true)) 
        return
        }
        setGroupData([])
        setGroupDataAux([]) 
     
     }
     
    
        const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
          if (action==="new") {
            insertNewData();
            return
          }
           updateData();
          
        }
        const insertNewData = async():Promise<void> => {
           let result=await Data.InsertNew(getDataGrupo(nombre,integrantes),TABLENAME);
           if(result){
              Alert.SuccessInsert();
              clearInputs()
              await getGroup()
              return
           }
            Alert.ErrorInsert();         
        }
        const updateData =async ():Promise<void> => {
          let result=await Data.UpdateItem(getDataGrupo(nombre,integrantes),TABLENAME,id)
          if(result){
            Alert.SuccessUpdate();
            clearInputs()
            await getGroup()
            return
          }
          Alert.ErrorUpdate()
        }
        const clearInputs = () => {
          setId("")
          setNombre("");
          setIntegrantes("")
          setAction("new")
          setTitle("Agregar Nuevo Grupo")
        }
        
        const searchItem = (e:ChangeEvent<HTMLInputElement>) => {
          setSearchValue(e.target.value)
          setGroupData(SearchItem(groupDataAux,e.target.value));
        }
        const sortItemColumn = (column:string) => {
          setSortByColumn(column)
          setGroupData(SortData(groupData,column as keyof GrupoType,ASC))
          setASC(!ASC)
        }
        const searchItemStatus = (estado:string) => {
          setSortByStatus(estado)
          setGroupData(SearchItem(groupDataAux,estado))
         
        }
        
        const openEditModal = (params:GrupoType) => {    
          setId(params.id!)
          setNombre(params.nombre);
          setIntegrantes(params.integrantres)
          setTitle("Actualizar Grupo")
          setAction("update")
          setShowModal(true)          
        }
        const openConfirmDelete=(params:GrupoType)=>{
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
            await getGroup()
            return
          }
          Alert.ErrorDelete();
        }
        
        
      return (
        <>
        <ToastContainer/>
        <Modal show={showModal} setShow={setShowModal} onSubmit={handelSubmit} title={title} >
            <TextInput value={nombre} onChange={handleNombre} label='Nombre' type='text' required/>
            <TextInput value={integrantes} onChange={handleLugar} label='Integrantes (* separar  los nombre por medio de la coma)' type='text' required/>           
        </Modal>
       
        <ModuleHeader>
            <SearchContainer>
                <InputSeacrch value={searchValue} onChange={searchItem} />
                <ButtonAdd title='+' onClick={setShowModal} showModal={showModal}/>
            </SearchContainer>
            <Tab>
                <OptionTab tabActive={sortByStatus} value='' nameTab='Todo' onClick={searchItemStatus} />
               {/*  <OptionTab tabActive={sortByStatus} value='Activo' nameTab='Activo' onClick={searchItemStatus} />
                <OptionTab tabActive={sortByStatus} value='Pendiente' nameTab='Pendiente' onClick={searchItemStatus} /> */}
            </Tab>
            <ContainerButtonSort>
            <DropDownSort>
                <OptionSort title='Nombre' column='nombre' onClick={sortItemColumn}/>
                {/* <OptionSort title='Fecha' column='fecha' onClick={sortItemColumn}/> */}
            </DropDownSort>
            </ContainerButtonSort>
        </ModuleHeader>
   
       <SubDataContainer>
        {groupData.length > 0 ?
        
         groupData.map((item,index)=>(
         <CardGrupo item={item} key={index} >
            <ButtonDelete<GrupoType> item={item} onClick={openConfirmDelete} />
            <ButtonEditar<GrupoType> item={item}  onClick={openEditModal} />
            
         </CardGrupo>
         ))
        :null
         
        }
       </SubDataContainer>
          
    
        </>
      )
    }
    

export default Grupos
