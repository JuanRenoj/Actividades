import React,{ useState, useCallback, lazy} from 'react'
import ModuleHeader from '../../components/containers/ModuleHeader'
import Tab from '../../components/tabs/Tab'
import OptionTab from '../../components/tabs/OptionTab'
const Actividad=lazy(()=>import("./CorosActividad"))
const Turno=lazy(()=>import("./CorosTurnos"))

function Coros() {
    const [tabActive, setTabActive] = useState<string>("Actividad")

    const selectTab = (params:string) => {
      setTabActive(params)
    }

    const Page =useCallback( ():JSX.Element => {
      switch(tabActive){
        case "Actividad":
          return <Actividad/>
     
        case "Turno":
          return <Turno/>
      }
      return <></>
    },[tabActive])
    
  return (
    <>
    <ModuleHeader>
      <Tab>
        <OptionTab  tabActive={tabActive} onClick={selectTab} value='Actividad' nameTab='Actividad'/>
        <OptionTab  tabActive={tabActive}  onClick={selectTab} value='Turno' nameTab='Turno'/>
     
      </Tab>
    </ModuleHeader>
    <Page />
      

    </>
  )
}

export default Coros 