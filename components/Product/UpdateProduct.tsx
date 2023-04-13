import {Category, Product} from "@/components/HomeType";
interface Props{
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    productActive: Product,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    categories: Category[],
    callbackFn: (cate: any, index: number) => JSX.Element
}
export function UpdateProduct(props: Props) {
    return <div>
        <p className="font-bold ml-5">UPDATE PRODUCT DETAIL</p>
        <form onSubmit={props.onSubmit}>
            <div className="input-product">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={props.productActive.name}
                    onChange={props.onChange}
                />
            </div>
            <div className="input-product">
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={props.productActive.price}
                    onChange={props.onChange}
                />
            </div>
            <div className="input-product">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={props.productActive.description}
                    onChange={props.onChange}
                />
            </div>
            <div className="input-product">
                <label htmlFor="category">Category:</label>
                <select id="category" name="category" onChange={props.onChange}>
                    {props.categories.map(props.callbackFn)}
                </select>
            </div>
            <button type="submit" className="rounded-md bg-violet-700 text-white p-2 mr-2 mt-2 ml-5">Update Product
            </button>
        </form>
    </div>;
}