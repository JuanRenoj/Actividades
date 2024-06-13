import { ItemDatesType } from "../interfaces/ItemDates"

export const ItemDate=(date:string):ItemDatesType=>{
 
let newDate=new Date(date)

let item:ItemDatesType={
    day:date.split("-")[2],
    dayName:newDate.toLocaleString("es-GT",{weekday:"long"}),
    monthName:newDate.toLocaleString("es-GT",{month:"long"}),
    year:newDate.getFullYear().toString(),
}
return item
}

function getDayName(date:string):string{
    let dayName=""
    let newDate=new Date(date);
    dayName=newDate.toLocaleDateString("es-GT",{weekday:"long"})
    return dayName
}
function getMonthName(date:string):string{
    let nomthName=""
    let newDate=new Date(date);
    nomthName=newDate.toLocaleDateString("es-GT",{month:"long"})
    return nomthName
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