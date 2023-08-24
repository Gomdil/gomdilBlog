"use client"
import { useSession  } from "next-auth/react"
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import useSWR from 'swr';
import Image from 'next/image';


const Dashboard = () => {  

    const session = useSession();
    const router = useRouter();
    const fetcher = (...args) => fetch(...args).then(res=>res.json())
    const {data , err ,mutate , isLoading } = useSWR(`/api/posts?username=${session.data?.user.name}`,fetcher)    

    if (session.status === "loading"){
        return <p>Loading...</p>
    }

    if (session.status === "unauthenticated"){       
        router?.push('/dashboard/login')
    }
    
    //console.log(session)

    const handleDelete = async (id) =>{       
        try{
            await fetch(`/api/posts/${id}`,{
                method : "DELETE"
            })
            mutate();
        } catch(err){
            console.log(err)
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const title = e.target[0].value;
        const desc = e.target[1].value;
        const img = e.target[2].value;
        const content = e.target[3].value;
        
        try {
            await fetch("/api/posts",{
                method:"POST",
                body : JSON.stringify({
                    title,desc,img,content,username:session.data.user.name,
                })
            });
            mutate();
            e.target.reset();
        } catch(err){
            console.log(err)
        }

    }
   
    
    if (session.status === "authenticated"){
        return ( 
            <div className={styles.container}>
                <div className={styles.posts}>
                    {isLoading ? "Loading..." : data?.map((post)=>(
                        <div className={styles.post} key={post.intIdx}>
                            <div className={styles.imtContainer}>
                                <Image src={post.img} alt="" width={200} height={200} fill={false}/>
                            </div>                    
                            <h2 className={styles.postTitle}>{post.TITLE}</h2>
                            <span className={styles.delete} onClick={()=>handleDelete(post.intIdx)}>X</span>
                        </div>
                    ))}
                </div>
                <form className={styles.new} onSubmit={handleSubmit}>
                    <h1>Add New POst</h1>
                    <input type="test" placeholder="title" className={styles.input}/>
                    <input type="test" placeholder="desc" className={styles.input}/>
                    <input type="test" placeholder="Image" className={styles.input}/>
                    <textarea className={styles.textArea} placeholder="content" cols="3" rows="5">
                    </textarea>
                    <button className={styles.button}>전송</button>
                </form>
            </div>
        );
    }
}
 
export default Dashboard;