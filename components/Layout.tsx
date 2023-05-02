import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect} from "react";
// @ts-ignore
const Layout = ({ children }) => {
    const router = useRouter();
    function logout(){
        localStorage.removeItem('accessToken');
        router.push('/login').then();
    }
    useEffect(() =>{
        const token = localStorage.getItem('accessTokenAdmin');
        if(!token){
            router.push('/login').then();
        }
    }, [])
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link href="/">
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/product">
                                <p>Product</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/category">
                                <p>Category</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/color">
                                <p>Color</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/size">
                                <p>Size</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/campaign">
                                <p>Campaign</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/user">
                                <p>User</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/order">
                                <p>Order</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact">
                                <p>Contact</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/comment">
                                <p>Comment</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/discount">
                                <p>Discount</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="d-flex align-items-center font-bold text-2xl cursor-pointer">
                    <div className="text-white" onClick={logout}>Logout</div>
                    <Image src="/header/logo-tna-shop.png" alt="Logo" width={140} height={95} />

                </div>
            </header>
            <main>{children}</main>
        </div>
    )
}

export default Layout;