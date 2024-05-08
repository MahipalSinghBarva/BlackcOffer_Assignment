import axios from "axios"
import React, {Children, createContext, useContext, useEffect, useState} from "react"

const DataContext = createContext()

export const useData = () => useContext(DataContext)

export const DataProvider = ({children}) =>{
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:8080/getData");
          setData(res.data);
        } catch (err) {
          console.log("Error fetching data", err);
        }
      }
      return(
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
      )
}