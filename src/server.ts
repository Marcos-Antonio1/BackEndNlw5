 import express, { response } from 'express';


 const app = express();

 app.get("/",(request,response)=>{
    return response.json({message:"Olá Server"});
 })

 app.post('/'),(request,response)=>{
     return response.json({message:"Cadastro Realizado com sucesso"})
 }
 app.listen(3333,()=>console.log("SERVER UP"));