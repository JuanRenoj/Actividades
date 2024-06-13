import React,{ useState, useCallback, lazy} from 'react'
import ModuleHeader from '../../components/containers/ModuleHeader'
import Tab from '../../components/tabs/Tab'
import OptionTab from '../../components/tabs/OptionTab'
const Actividad=lazy(()=>import("./LectoresActividad"))
const Grupo=lazy(()=>import("./Grupos"))
const Turno=lazy(()=>import("./LectoresTurno"))

function Lectores() {
    const [tabActive, setTabActive] = useState<string>("Actividad")

    const selectTab = (params:string) => {
      setTabActive(params)
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
    <ModuleHeader>
      <Tab>
        <OptionTab  tabActive={tabActive} onClick={selectTab} value='Actividad' nameTab='Actvidad'/>
        <OptionTab  tabActive={tabActive}  onClick={selectTab} value='Turno' nameTab='Turno'/>
        <OptionTab  tabActive={tabActive}  onClick={selectTab} value='Grupo' nameTab='Grupo'/>
      </Tab>
    </ModuleHeader>
    <Page />
      

    </>
  )
}

export default Lectores 