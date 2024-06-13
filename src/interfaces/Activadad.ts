interface Actividad{
    id?:string
    nombre:string,
    lugar:string,
    fecha:string,
    hora:string
    estado:string
}
export type{Actividad as ActividadType}

export const getDataActivity=(nombre:string,lugar:string,fecha: string,hora:string,estado:string):Actividad=>{
    let actividad:Actividad={        
        nombre:nombre,
        lugar:lugar,
        fecha:fecha,
        hora:hora,
        estado:estado

    }
    return actividad
}