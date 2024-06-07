import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
class Alert{
SuccessInsert(){
    toast.success('Se ingreso de manera correcta', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      
        });
}
SuccessUpdate(){
    toast.success('Se Actualizo de manera correcta', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      
        });  
}
SuccessDelete(){
    toast.success('Se Elimino de manera correcta', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      
        });
}
ErrorInsert(){
    toast.error('Algo salio mal, no se pudo insertar', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      
        });
}
ErrorUpdate(){
    toast.error('Algo salio mal, no se pudo actualizar', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      
        }); 
}
ErrorDelete(){
    toast.error('Algo salio mal, no se pudo eliminar', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      
        });
}
}
export default new Alert;