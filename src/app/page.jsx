import Image from "next/image";
import Hero from "public/hero.png";
import styls from "./page.module.css"
import Button from "../components/Button/Button";

export default async function Home() {
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

