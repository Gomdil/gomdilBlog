import Image from 'next/image';
import styles from './page.module.css';
import {notFound} from 'next/navigation';

async function getData(id){
    const res = await fetch(`http://localhost:3000/api/posts/${id}`,{
       cache :"no-store"
    });
 
    if (!res.ok){
       return notFound()
    }
 
    return res.json();
 }

 export async function generateMetadata({ params }) {
    const post = await getData(params.id)
    return {
      title: post[0].TITLE,
      description : post[0].TITLE
    }
  }


const  Post = async ({params}) => {
    const data = await getData(params.id);
    console.log(data)
    return ( 
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.info}>
                    <h1 className={styles.title}>
                       {data[0].TITLE}
                    </h1>
                    <p className={styles.desc}>
                        {data[0].DES}
                    </p>
                    <div className={styles.author}>
                        <Image
                            src={data[0].img}
                            alt=""
                            width={40}
                            height={40}
                            className={styles.avatar}
                        />
                        <span className={styles.username}>gomdil</span>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src={data[0].img}
                        alt=""
                        fill={true}
                        className={styles.Image}
                    />
                </div>
            </div>
            <div className={styles.content}>
                <p className={styles.text}>
                {data[0].content}
                </p>
            </div>
        </div>
     );
}
 
export default Post;