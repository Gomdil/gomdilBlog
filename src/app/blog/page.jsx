import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';


async function getData(){
   const res = await fetch('http://localhost:3000/api/posts',{
      cache :"no-store"
   });

   if (!res.ok){
      throw new Error('에러이지롱');
   }

   return res.json();
}

const Blog = async () => {
   const data = await getData();
   return ( 
        <div className={styles.mainContainer}>
            {data.map((item)=>(
               <Link key={item.intIdx} href={`/blog/${item.intIdx}`} className={styles.container}>
                  <div className={styles.imageContainer}>
                     <Image
                     src={item.img}
                     alt=""
                     width={400}
                     height={250}
                     className={styles.image}
                     />
                  </div>
                  <div className={styles.content}>
                     <h1 className={styles.title}>{item.TITLE}</h1>
                     <p className={styles.desc}>{item.DES}</p>
                  </div>
               </Link>
            ))}

        </div>
     );
}
 
export default Blog;