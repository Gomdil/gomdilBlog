import bcrypt from "bcryptjs"
import pool from "../../../../utils/db"
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const {name , email , password } = await request.json();  
    const hashedPassword =  await bcrypt.hash(password,5);
    try {
        const query = "INSERT INTO USER (NAME,email,PASSWORD) VALUES (?,?,?)"
        const res = pool.execute(query,[name,email,hashedPassword])
        return new NextResponse("User has been created",{status:201})
    } catch(err){
        return new NextResponse(err.message,{status:500})
    }
}