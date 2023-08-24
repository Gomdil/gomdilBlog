import Image from "next/image";
import styls from "./page.module.css"

const Footer = () => {    
    return ( 
        <div className={styls.container}>
            <div>@2023 gomdil. All rights reserved.</div>
            <div className={styls.social}>              
                <Image src="/1.png"  width={15} height={15} className={styls.icon} alt="gomdil dev facebook"/>
                <Image src="/2.png"  width={15} height={15} className={styls.icon} alt="gomdil dev"/>
                <Image src="/3.png"  width={15} height={15} className={styls.icon} alt="gomdil dev"/>
                <Image src="/4.png"  width={15} height={15} className={styls.icon} alt="gomdil dev"/>                            
            </div>
        </div>
     );
}
 
export default Footer;