interface Actividad{
    id?:string
    nombre:string,
    lugar:string,
    fecha:string,
    hora:string
    estado:string
}
export type{Actividad as ActividadType}

export const getDataActivity=(id:string,nombre:string,lugar:string,fecha: string,hora:string,estado:string):Actividad=>{
    if (id!=="") {
        let actividad:Actividad={
            id:id,
            nombre:nombre,
            lugar:lugar,
            fecha:fecha,
            hora:hora,
            estado:estado

        }
        return actividad
    }
    let actividad:Actividad={        
        nombre:nombre,
        lugar:lugar,
        fecha:fecha,
        hora:hora,
        estado:estado

    }
    return actividad
}