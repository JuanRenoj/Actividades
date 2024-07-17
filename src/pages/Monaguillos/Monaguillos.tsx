import React,{ useState, useCallback, lazy} from 'react'
import ModuleHeader from '../../components/containers/ModuleHeader'
import Tab from '../../components/tabs/Tab'
import OptionTab from '../../components/tabs/OptionTab'
import { accessToPage } from '../../util/Strings'
import { toast, ToastContainer } from 'react-toastify'
import DialogInput from '../../components/containers/DialogInput'
import Alert from '../../util/Alert'
const Actividad=lazy(()=>import("./MonaguillosActividad"))
const Grupo=lazy(()=>import("./Grupos"))
const Turno=lazy(()=>import("./MonaguillosTurno"))

function Monaguillos() {
    const [tabActive, setTabActive] = useState<string>("Actividad")

    const selectTab = (tab:string) => {
    
        setTabActive(tab)
    }
   

    const Page =useCallback( ():JSX.Element => {
      switch(tabActive){
        case "Actividad":
          return <Actividad/>
        case "Grupo":
          return <Grupo/>
        case "Turno":
          return <Turno/>
      }
      return <></>
    },[tabActive])
    
  return (
    <>
    <ToastContainer/>
    <ModuleHeader>
      <Tab>
        <OptionTab  tabActive={tabActive} onClick={selectTab} value='Actividad' nameTab='Actividad'/>
        <OptionTab  tabActive={tabActive}  onClick={selectTab} value='Turno' nameTab='Turno'/>
        <OptionTab  tabActive={tabActive}  onClick={selectTab} value='Grupo' nameTab='Grupo'/>
      </Tab>
    </ModuleHeader>
    <Page />
      

    </>
  )
}

export default Monaguillos 