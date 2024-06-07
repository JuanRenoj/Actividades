export function SearchItem<T>(data: T[], search: string): T[] {
    return data.filter((obj) => {
      const filteredData = (Object.keys(obj!) as Array<keyof typeof obj>).some((value) => {
        const val = obj[value];
        return (
          typeof val === "string" && val.toLowerCase().includes(search.toLowerCase())
        );
      });
      return filteredData;
    });
  } 
 