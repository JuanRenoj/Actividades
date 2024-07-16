import { ItemDatesType } from "../interfaces/ItemDates"

export const ItemDate=(date:string):ItemDatesType=>{
 
let newDate=new Date(date)

let item:ItemDatesType={
    day:date.split("-")[2],
    /* dayName:newDate.toLocaleString("es-GT",{weekday:"long"}),
    monthName:newDate.toLocaleString("es-GT",{month:"long"}), */
    dayName:getDayName(newDate.getDay()),
    monthName:getMonthName(newDate.getMonth()),
    year:newDate.getFullYear().toString(),
}
return item
}

function getDayName(index:number):string{
    let days=["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
    return days[index]
}
function getMonthName(index:number):string{
    let months=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]   
    return months[index]
}
function getDayFromDate(date:string):string{
    let day=""
    let newdate=new Date(date);
    day=newdate.getDay().toString() 
    return day  
}
function getYearFromDate(date:string):string{
    let day=""
    let newdate=new Date(date);
    day=newdate.getFullYear().toString() 
    return day  
}