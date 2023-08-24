import { NextResponse } from "next/server";
import pool from '../../../../utils/db';


const getdate = async (queryString , value )=>{ 
    try {      
      const [rows] = await pool.execute(queryString,value);                
      return rows;
    } catch (error){
      return [error];
    }
  }  

export const GET = async (request , {params}) =>{
    const {id} = params;    
     try{
         const queryString = "SELECT * FROM POSTS WHERE intIdx = ? limit 1 ";
         const values = [id];
         const post  = await getdate(queryString , values)           
         const posts = JSON.stringify(post)   

         if (posts.length === 2 ) {
          return new NextResponse('Row null' ,{status:500})
         }
                       
         return new NextResponse(posts ,{status:200})
     }catch(err){
         return new NextResponse("Database Error",{status:500})
     }
    
}


export const DELETE  = async (request , {params}) =>{
  const id = params.id;   
  console.log("paramid:",id) 
   try{
       const queryString = "DELETE FROM POSTS WHERE intIdx = ? ";
       const values = id;       
       const res = await pool.execute(queryString,[values]); 
       console.log("res:",res)
       return new NextResponse("PostDeleted",{status:201})
   }catch(err){
       return new NextResponse("Database Error",{status:500})
   }  
}