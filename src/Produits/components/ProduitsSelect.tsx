import { useContext, useEffect, useState } from "react";
import { BASEURL } from "../../Constants/base_url";
import { TResponse } from "../Types/TResponse";
import { TProduit } from "../Types/TProduit";
import { ProduitView } from "./ProduitView";
import { ProduitNew } from "./ProduitNew";
import { DEFAULT_PRODUIT } from "../../Constants/DefaultProduit";
import { NO_PRODUIT } from "../../Constants/NoProduit";
import { ProduitsContext } from "../../Contexts/ProduitsContext";

export function ProduitsSelect() {
  const {produits, setProduits} = useContext(ProduitsContext);
  const [produit, setProduit] = useState<TProduit>(NO_PRODUIT);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASEURL}products`);
      const responseJSON: TResponse<TProduit[]> = await response.json();
      setProduits(responseJSON.data);
    };
    fetchData();
  }, []);

  const selectProduit = produits.map((item, i) => {
    return (
      <button
        key={i}
        className="bg-secondary rounded p-2 m-1"
        onClick={() => {
          setProduit(item);
        }}
      >
        {item.nom}
      </button>
    );
  });


  
  return (
    <div>
      <div className="bg-primary rounded p-2 m-1">
        <div>{selectProduit}</div>
        <button onClick={()=>{setProduit(DEFAULT_PRODUIT)}}>Nouveau Produit</button>
      </div>
      {produit.id > 0 && <ProduitView item={produit} setProduit={setProduit} />}
      {produit.id === -1 && (
        <div>
          <ProduitNew setProduit={setProduit} />
        </div>
      )}
    </div>
  );
}
