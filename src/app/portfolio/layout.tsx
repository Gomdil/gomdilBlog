import styles from './page.module.css'
const Layout = ({children}) => {
    return ( 
        <div>
            <h1 className={styles.mainTitle}>Our Works</h1>
            {children}
        </div>
     );
}
 
export default Layout;
<div>
    <h1>Our Works</h1>
</div>