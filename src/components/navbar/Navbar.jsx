"use client"
import Link from "next/link";
import styls from "./page.module.css"
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle'
import {useSession ,signOut} from 'next-auth/react'
const links  = [
    {
        id:1,
        title:"Home",
        url:"/",
    },
    {
        id:2,
        title:"Portfolio",
        url:"/portfolio",
    },
    {
        id:3,
        title:"Blog",
        url:"/blog",
    },
    {
        id:4,
        title:"About",
        url:"/about",
    },
    {
        id:5,
        title:"Contact",
        url:"/contact",
    },
    {
        id:6,
        title:"Dashboard",
        url:"/dashboard",
    },    
]


const Navbar = () => {
    const session = useSession();
    return ( 
        <div className={styls.container}>
            <Link href="/" className={styls.logo}>Gomdil</Link>
            <div className={styls.links}>
                <DarkModeToggle/>
                {links.map((item)=>(
                    <Link key={item.id} href={item.url} className={styls.link}>
                        {item.title}
                    </Link>                                                   
                ))}

                {session.status === "authenticated"  && (
                    <button 
                    className={styls.logout}
                    onClick={signOut}>Logout</button>
                    )              
                }
               
            </div>

        </div>
     );
}
 
export default Navbar;