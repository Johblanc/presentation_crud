import { useContext, useState } from "react";
import { TProduit } from "../Types/TProduit";
import { BASEURL } from "../../Constants/base_url";
import { TResponse } from "../Types/TResponse";
import { NO_PRODUIT } from "../../Constants/NoProduit";
import { ProduitsContext } from "../../Contexts/ProduitsContext";

export function ProduitUpdate( props : {
  produit : TProduit,
  setProduit : ( value : TProduit ) => void,
  setInModif : (value: boolean) => void,
}) {
  const {produit, setProduit, setInModif} = props ;

  const [item, setItem] = useState<TProduit>({...produit});

  const {produits, setProduits } = useContext(ProduitsContext)

  const itemHandlerTextuel = (value: string) => {
    const newItem = { ...item };
    newItem.nom = value;
    setItem(newItem);
  };

  const itemHandlerNumeric = (key: "prix" | "quantite", value: number) => {
    const newItem = { ...item };
    newItem[key] = value;
    setItem(newItem);
  };
  

  const updateProduit = async () => {
    const options = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    };
    
    const response = await fetch(`${BASEURL}products/${item.id}`, options) ;
    const responseJSON : TResponse<TProduit> = await response.json() ;
    const newProduit = responseJSON.data ;

    const newProduits = [...produits].map(elmProduit => {
      if(elmProduit.id === newProduit.id) {
        return newProduit ;
      } ;
      return elmProduit ;
    })

    setProduits(newProduits) ;
    setProduit(newProduit) ;
    setInModif(false) ;
  }

  return (
    <form>
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
    <button onClick={
      (event) => {
        event.preventDefault();
        updateProduit()
      }
    }
    >
      Enregistrer
      </button>
    </form>
  )
}
