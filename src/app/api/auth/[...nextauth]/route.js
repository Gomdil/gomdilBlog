import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import pool from '../../../../utils/db'


const getdate = async (queryString , value )=>{ 
  try {      
    const [rows] = await pool.execute(queryString,value);                
    return rows;
  } catch (error){
    return [error];
  }
}  


const handler =  NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id:"credentials",
      name:"credentials",
      async authorize(credentials){
        try {
          const queryString = "SELECT * FROM USER WHERE email = ? limit 1 ";
          const values = [credentials.email];
          const user  = await getdate(queryString , values)           
          //const user = JSON.stringify(posts)
          
          
          console.log('출력값',user);

          if (user.length === 2 ) {
            throw new Error("user not found!");
          } else {

            console.log('입력값',credentials.password);
            console.log('비교값',user[0].password);

            const isPasswordCheck = await bcrypt.compare(
              credentials.password,
              user[0].password
            );

            if (isPasswordCheck) {
              console.log("결과값:",typeof user[0])                            
              const returnUser = {id:user[0].intIdx , intidx : user[0].intIdx.toString() , email : user[0].email , name:user[0].NAME}
              console.log(returnUser)
              return returnUser            
            } else {
              throw new Error("Wrong Password!");
            }
          }
          //password check 
         //return posts
        } catch(err) {
          throw new Error(err.message)
        }
      }
    })
  ],
   pages :{
     error:"/dashboard/login",
   }
})

export {handler as GET , handler as POST}