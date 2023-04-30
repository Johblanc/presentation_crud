import { useContext, useState } from "react";
import { TProduit } from "../Types/TProduit";
import { BASEURL } from "../../Constants/base_url";
import { TResponse } from "../Types/TResponse";
import { NO_PRODUIT } from "../../Constants/NoProduit";
import { DEFAULT_PRODUIT } from "../../Constants/DefaultProduit";
import { ProduitsContext } from "../../Contexts/ProduitsContext";

export function ProduitNew( props : {
  setProduit : (value : TProduit ) => void
}) {
  const { setProduit} = props ;
  
  const {produits, setProduits} = useContext(ProduitsContext);

  const [item, setItem] = useState<TProduit>(DEFAULT_PRODUIT);

  const itemHandlerTextuel = (value: string) => {
    const newItem = { ...item };
    newItem.nom = value;
    setItem(newItem);
  };

  const itemHandlerNumeric = (key: "prix" | "quantite", value: number) => {
    const newItem = { ...item };
    newItem[key] = value;
    /* 
    if (key === "prix"){
      newItem.prix = value
    } else {
      newItem.quantite = value
    }
     */
    setItem(newItem);
  };

  const createNewProduit = async () => {
    const {id, ...leReste } = item
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(leReste)
    };
    
    const response = await fetch(`${BASEURL}products`, options)
    const responseJSON : TResponse<TProduit> = await response.json()

    const newProduits = [...produits] ;
    const newProduit = responseJSON.data ;
    newProduits.push(newProduit) ;
    setProduits(newProduits)
    setProduit(newProduit)
  
  }

  return (
    <div className="bg-info rounded p-2 m-1">
      <div>
        <label htmlFor="produitNom"> Nom : </label>
        <input
          name="produitNom"
          type="text"
          defaultValue={item.nom}
          onChange={(e) => itemHandlerTextuel(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="produitPrix"> Prix : </label>
        <input
          name="produitPrix"
          type="number"
          min={0}
          defaultValue={item.prix}
          onChange={(e) => itemHandlerNumeric("prix", Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="produitQuantite"> Quantité : </label>
        <input
          name="produitQuantite"
          type="number"
          defaultValue={item.quantite}
          onChange={(e) =>
            itemHandlerNumeric("quantite", Number(e.target.value))
          }
        />
      </div>
      <button onClick={()=>{setProduit(NO_PRODUIT)}}>Annuler la création</button>
      <button onClick={createNewProduit}>Enregister</button>
    </div>
  );
}
