import Image from "next/image";
import Link from "next/link";
// @ts-ignore
const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link href="/dashboard">
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
                            <Link href="/campaign">
                                <p>Campaign</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/order">
                                <p>Order</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Image src="/header/logo-tna-shop.png" alt="Logo" width={140} height={95} />
            </header>
            <main>{children}</main>
        </div>
    )
}

export default Layout;