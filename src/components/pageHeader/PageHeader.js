import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const PageHeader = () => {
    return(
        <>
            <div className={styles.wrapper}>
                <Link className={styles.link} href={`/`}>
                    <div className={styles.logo_wrapper}>                     
                        {/* <Image src="" alt="Logo" width={30} height={30}/> */}
                        <div>Forum</div>
                    </div>
                </Link>
                <ul className={styles.navbar}>
                    <li>
                        <Link className={styles.link} href={`/`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.link} href={`/`}>
                        Create new
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.link} href={`/`}>
                        SignUp
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.link} href={`/`}>
                        LogIn
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default PageHeader;