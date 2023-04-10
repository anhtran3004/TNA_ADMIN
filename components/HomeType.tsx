export type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    category: string[]
}
export type InputProduct = {
    filter: {
        product_id: number[],
        category_id: number[],
        price:{
            min: number,
            max: number
        }
    },
    sort: {
        field: string,
        order: string
    },
    pagination:{
        page: number,
        perPage: number
    }

}