export function SortData<T,k extends keyof T>(data:T[],colum:k,ASC:boolean):T[]{
    if(ASC){
        let sorted=data.sort((a,b)=> a[colum] > b[colum] ? 1 : - 1)
        return sorted
    }
    let sorted=data.sort((a,b)=> a[colum] < b[colum] ? 1 : - 1)
        return sorted
}