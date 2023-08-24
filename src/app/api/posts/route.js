import { NextResponse } from "next/server";
import pool from '../../../utils/db';


const getdate = async (queryString)=>{ 
    try {      
      const [rows] = await pool.execute(queryString);          
      return rows;
    } catch (error){
      return [error];
    }
  }  

export const GET = async (request) =>{
    const url = new URL(request.url)
    const username = url.searchParams.get("username");
    try{
        const queryString = "SELECT * FROM POSTS ORDER BY intIdx DESC";
        const post  = await getdate(queryString)
        const posts = JSON.stringify(post)        
        return new NextResponse(posts,{status:200})
    }catch(err){
        return new NextResponse("Database Error",{status:500})
    }    
}

export const POST = async (request) =>{
  const {title,desc,img,content,username } = await request.json();  
  try {
      const query = "INSERT INTO POSTS (TITLE , DES , img , content , username ) VALUES (?,?,?,?,?)"
      const res = pool.execute(query,[title,desc,img,content,username])
      return new NextResponse("User has been created",{status:201})
  } catch(err){
      return new NextResponse(err.message,{status:500})
  }

}