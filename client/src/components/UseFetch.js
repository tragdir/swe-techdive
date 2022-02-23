import axios from "axios";
import React, {useState, useEffect} from "react";

export default function useFetch(url){
    const [isLoading, setIsLoading] = useState(true)
    const [itemInfo, setItemInfo] = useState(null);
    const [error, setError] = useState(null)

    useEffect(() => {
      async function getItem() {
          try {
              const response = await axios.get(`/api/${url}`);
              setItemInfo(response.data)
          } catch (e) {
              setError(e)
          } finally {
              setIsLoading(false)
          }
      }
    
      getItem()
      
    }, [url])
    
    return {itemInfo, isLoading, error, setItemInfo}
}