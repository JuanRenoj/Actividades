import React,{ReactNode, Suspense, lazy, useCallback, useState} from 'react'
import Header from './Header'
import SideBar from './SideBar'

const Activdad=lazy(()=>import("../activdad/Actividad"));
const Lectores=lazy(()=>import("../ministerio/Lectores"));

function Home() {
    const [open, setOpen] = useState<boolean>(false);
    const [center, setCenter] = useState<string>("Actividad");
    const [titlePage, setTitlePage] = useState<string>("")

    const Center = useCallback(
      ():JSX.Element => {
      
      switch(center){
        case "Actividad":
            setTitlePage(center)
          return <Activdad/>
        case "Lectores":
          setTitlePage(center)
          return <Lectores/>
      }
      return <div></div>
    }
   ,[center])
    

  return (
    <>
      <Header open={open} setOpen={setOpen} titlePage={titlePage}/>
      <SideBar open={open} setOpen={setOpen} center={center} setCenter={setCenter} />
      <div className='center'>
       <Suspense fallback={<div>Cargando...</div>}>
      <Center/>
      </Suspense>
      </div>
    </>
  )
}

export default Home
