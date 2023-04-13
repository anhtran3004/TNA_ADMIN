export type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    thumb: string,
    status: number,
    hot: number,
    import_date: string,
    update_date: string,
    favorite: number,
    priority: number
}
export type Category = {
    id: number,
    categoryName: string,
    sku: string,
    status: number,
}
export type Campaign = {
    id: number,
    name: string,
    sku: string,
    start_day: string,
    end_day: string,
    status: number,
    campaign_description: string
}
export type Discount = {
    id: number,
    discount_code: string,
    discount_type: string,
    discount_value: number,
    start_day: string,
    end_day: string,
    status: number,
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
export type Inventory ={
    id: number,
    name: string,
    size: string,
    quantity: number
}
export type InputDeleteProduct = {
    ids: number[]
}
