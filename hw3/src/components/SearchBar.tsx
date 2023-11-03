'use client'
import React, { useState, useRef } from 'react'
import { db } from "@/db";
import { actTable } from "@/db/schema";
import { like} from "drizzle-orm";
import useAct from '@/hook/useAct';
const SearchBar =  () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [arr, setArr] = useState<string[]>([])
    const {getAct} = useAct()
    
    const handleSearch = async () => {
        
      const searchTerm = inputRef.current?.value;
      if(!searchTerm){
        alert("Please input searchTerm")
        return;
      }
      
      const results = await getAct({title:searchTerm})
      let k = ["test"]
      for(let i=0; i<Object.keys(results["results"]).length;i++)
      {
        k.push(results["results"][i]["title"])
          
      }
      k = k.slice(1)
      console.log( k)
      setArr(k);
      
      
        
           
    };
  return (
    <div >
      <input
        type="text"
        placeholder="Search..."
        ref={inputRef}
      />

      <button onClick={handleSearch}>Search</button>
      {arr?.map((act:string) => (
          <div>{act}</div>
        ))}
    </div>
  )
}

export default SearchBar