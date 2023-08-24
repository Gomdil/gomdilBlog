"use client"
import {signIn , useSession} from 'next-auth/react'
import styles from './page.module.css'
import {useRouter} from "next/navigation"


const handleSubmit = async (e)=>{
    e.preventDefault();
    const email = e.target[0].value
    const password = e.target[1].value
    signIn("credentials",{email,password,callbackUrl:"/dashboard"})
}

const Login = () => {
    const session = useSession();
    const router = useRouter();

    if (session.status === "loading"){
        return <p>Loadding...</p>
    }

    if (session.status === "authenticated"){
        router?.push("/dashboard");
    }

    return ( 
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>                
                <input type="text" placeholder="이메일" className={styles.input} required/>
                <input type="password" placeholder="비밀번호" className={styles.input} required/>
                <button className={styles.button}>로그인</button>                
            </form>      
            <button onClick={()=>signIn("google")}>Login with Google</button>
        </div>
     );
}
 
export default Login;