import { createContext } from "react";
import { TProduit } from "../Produits/Types/TProduit";



export const ProduitsContext = createContext({
  produits : [] as TProduit[],
  setProduits: (value: TProduit[]) => {},
});