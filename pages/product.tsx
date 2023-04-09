// import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import Link from "next/link";
export default function Product(){
    const products = [];
    return (
        // <Table>
        //     <Thead>
        //         <Tr>
        //             <Th>ID</Th>
        //             <Th>Name</Th>
        //             <Th>Description</Th>
        //             <Th>Price</Th>
        //             <Th>Action</Th>
        //         </Tr>
        //     </Thead>
        //     <Tbody>
        //         {products.map((product) => (
        //             <Tr key={product.id}>
        //                 <Td>{product.id}</Td>
        //                 <Td>{product.name}</Td>
        //                 <Td>{product.description}</Td>
        //                 <Td>{product.price}</Td>
        //                 <Td>
        //                     <Link href={`/admin/products/${product.id}`}>
        //                         <Button size="sm" colorScheme="blue">
        //                             Edit
        //                         </Button>
        //                     </Link>
        //                 </Td>
        //             </Tr>
        //         ))}
        //     </Tbody>
        // </Table>
        <table>
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
                                <Button size="sm" colorScheme="blue">
                                    Edit
                                </Button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}