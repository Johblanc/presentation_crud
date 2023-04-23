import { TProduit } from "../Types/TProduit";


export function ProduitView (props : { item : TProduit }) {

  const {id,nom,prix,quantite} = props.item ;

  
  return (
    <div className="bg-info rounded p-2 m-1">
      <p> id : {id}</p>
      <p> nom : {nom}</p>
      <p> prix : {prix}</p>
      <p> quantite : {quantite}</p>
    </div>
  )
}