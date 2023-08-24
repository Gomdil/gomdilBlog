"use client"
import React ,{useState} from "react";
import styles from './page.module.css'
import Link from "next/link";
import {useRouter} from 'next/navigation';

const Register = () => {

    const [err,setErr] = useState(false);

    const router = useRouter()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const name = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value

        try{      
            const res = await fetch("/api/auth/register",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json",
                },
                body:JSON.stringify({
                    name,email,password
                })
            })    
            res.status === 201 && router.push("/dashboard/login?success=Acount has been Created")
        }catch(err){
            setErr(Ture)
        }
        
    }

    return ( 
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" placeholder="이름" className={styles.input} required/>
                <input type="text" placeholder="이메일" className={styles.input} required/>
                <input type="password" placeholder="비밀번호" className={styles.input} required/>
                <button className={styles.button}>회원가입</button>                
            </form>       
            {err && "에러입니다."}     
            <Link href="/dashboard/login">기존 계정으로 로그인</Link>
        </div>
     );
}
 
export default Register;