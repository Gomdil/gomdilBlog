import Image from "next/image";
import Hero from "public/hero.png";
import styls from "./page.module.css"
import Button from "../components/Button/Button";
import pool from '../utils/db';


// function queryPromise(queryString) {  
// 	return new Promise((resolve, reject) => {  
// 		connection.query(queryString, (error, results) => {  
// 			if (error) {  
// 				return reject(error);  
// 			}  
// 			resolve(results);  
// 		});  
// 	});  
// }


export default async function Home() {
  

  //DB Query 
  const getdate = async (queryString)=>{ 
    try {      
      const [rows] = await pool.execute(queryString);          
      return rows;
    } catch (error){
      return [error];
    }
  }  


  const queryString = "SELECT * FROM board"
  const rows = await getdate(queryString);  
  //const queryString = "SELECT * FROM board limit 1";
  //const rows = await queryPromise(queryString);  
  console.log(rows)    	

  return (
    <div className={styls.container}>
      <div className={styls.item}>
        <h1 className={styls.title}>Better design for your digital products.</h1>
        <p className={styls.desc}>Turning your Idea Reality. We bring together the teams from the global tech industry.</p>
        <Button url="/portfolio" text="See Our Work"/>         
      </div>
      <div className={styls.item}>
        <Image src={Hero} alt="" className={styls.img}/>
      </div>
    </div>
  )
}

