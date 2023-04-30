import { useContext, useEffect, useState } from "react";
import { TProduit } from "../Types/TProduit";
import { ProduitUpdate } from "./ProduitUpdate";
import { BASEURL } from "../../Constants/base_url";
import { TResponse } from "../Types/TResponse";
import { ProduitsContext } from "../../Contexts/ProduitsContext";
import { NO_PRODUIT } from "../../Constants/NoProduit";

export function ProduitView(
  props: { 
    item: TProduit ,
    setProduit : (value : TProduit) => void
  }
) {

  const {item , setProduit : setItem} = props ;

  const [ produit, setProduit] = useState({...item}) ;

  const [inModif, setInModif] = useState(false) ;

  const {produits, setProduits} = useContext(ProduitsContext);

  useEffect(()=>{setProduit({...item})},[item]) ;
  useEffect(()=>{setInModif(false)},[produit]) ;

  const deleteProduit = async () => {
    const options = {method: 'DELETE'};

    const response  = await fetch(`${BASEURL}products/${produit.id}`, options)
    const responseJSON : TResponse<TProduit> = await response.json() ;
    if (responseJSON.statusCode === 200) {
      const newProduits = [...produits].filter(item => item.id !== produit.id ) ;
      setProduits(newProduits) ;
      setItem(NO_PRODUIT)

    }
    
  }

  return (
    <div className="bg-info rounded p-2 m-1">
      { !inModif && 
        <div>
        <p> id : {produit.id}</p>
        <p> nom : {produit.nom}</p>
        <p> prix : {produit.prix}</p>
        <p> quantite : {produit.quantite}</p>
      </div>
      }
      {inModif && <ProduitUpdate produit={produit} setProduit={setProduit} setInModif={setInModif} />}
      { !inModif && <button onClick={deleteProduit}>Supprimer</button>}
      <button onClick={() => setInModif(!inModif)}>{ inModif ? "Annuler" : "Modifier"}</button>
    </div>
  );
}
