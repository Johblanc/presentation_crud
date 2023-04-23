import { TProduit } from "./TProduit"


export type TResponse<TData = any > = {
  statusCode : number,
  message : string ,
  timestamp : Date,
  path : string,
  data : TData
}