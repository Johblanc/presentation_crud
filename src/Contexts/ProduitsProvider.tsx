import { useState } from "react";
import { ProduitsContext } from "./ProduitsContext";
import { TProduit } from "../Produits/Types/TProduit";


/*  */
export function ProduitsProvider(props : {children : JSX.Element | JSX.Element[]}){

  const [produits, setProduits] = useState<TProduit[]>([])

  return (
    
    <ProduitsContext.Provider value ={{produits, setProduits}}>

      {props.children}

    </ProduitsContext.Provider>
  )
}