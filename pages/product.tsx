
import Link from "next/link";
import Layout from "@/components/Layout";
import {useState} from "react";
import {Product} from "@/components/HomeType";
export default function Product(){
    const [products, setProducts] = useState<Product[]>([])
    return (
        // eslint-disable-next-line react/jsx-no-undef
    <Layout>
        <table border={1}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) => (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                        <Link href={`/admin/products/${product.id}`}>
                            <button>
                                Edit
                            </button>
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </Layout>

    );
}