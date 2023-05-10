export type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    thumb: string,
    status: number,
    hot: number,
    category_id: number,
    campaign_id: number,
    discount_id: number,
    import_date: string,
    update_date: string,
    favorite: number,
    priority: number
}
export type InputUpdateProduct = {
    product_input: {
        name: string,
        description: string,
        price: number,
        thumb: string,
        hot: number,
        category_id: number,
        campaign_id: number,
        discount_id: number,
        priority: number
    }

}
export type Category = {
    id: number,
    categoryName: string,
    sku: string,
    status: number,
}
export type Color = {
    id: number,
    name: string,
    status: number,
}
export type Size = {
    id: number,
    size: string,
    status: number,
}
export type InputInventory = {
    product_input: {
        size_id: number,
        color_id: number,
        quantity: number
    }

}
export type InputCampaign = {
    campaign_input: {
        name: string,
        thumb: string,
        end_day: string,
        campaign_description: string
    }

}
export type InputDiscount = {
    discount_input: {
        discount_code: string,
        discount_type: string,
        discount_value: number,
        end_day: string
    }

}
export type InputCategory = {
    category_input: {
        name: string,
        status: number
    }

}
export type Discount = {
        id: number
        discount_code: string,
        discount_type: string,
        discount_value: number,
        start_day: string,
        end_day: string,
        status: number

}
export type Campaign = {
    id: number,
    name: string,
    sku: string,
    thumb: string,
    start_day: string,
    end_day: string,
    status: number,
    campaign_description: string
}

export type InputProduct = {
    filter: {
        product_id: number[],
        category_id: number[],
        campaign_id:number[],
        price:{
            min: number,
            max: number
        },
        import_date:{
            min: string,
            max: string
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
    quantity: number,
    size_id: number,
    color_id: number,
    product_id: number
}
export type InputDeleteProduct = {
    ids: number[]
}
export type Order = {
    id: number,
    name: string,
    email: string,
    address: string,
    phone: string,
    ship_name: string,
    method_delivery: string,
    user_id: number,
    shipping_fee: number,
    status: number,
    total_price: number
}
export type OrderProduct = {
    id: number,
    order_id: number,
    product_id: number,
    price: number,
    quantity: number,
    color: string,
    size: string,
    name: string,
    thumb: string,
}
export type User = {
    id: number,
    username: string,
    email: string,
    password: string,
    name: string,
    phone: string,
    address: string,
    created_date: string,
    role: string,
    status: number,
    birth_date: string
}
export type InputInsertUser = {
    user_input: {
        email: string,
        name: string,
        phone: string,
        address: string,
        username: string,
        password: string,
        role: string
    }
}
export type InputUpdateUser = {
    user_input: {
        email: string,
        name: string,
        phone: string,
        address: string,
        username: string,
        role: string
    }
}
export type InputComment = {
    comment_input: {
        id: number,
        content: string,
        rating: number,
        comment_date: string,
        user_id: number,
        product_id: number,
        username: string,
        status: number
    }
}
export type InputChildComment = {
    comment_input: {
        content: string,
        comment_id: number
    }
}
export type InputBlockUser = {
    ids: number[],
    status: number
}
export  type InputLogin = {
    username: string,
    password: string
}
export type Contact = {
    id: number,
    email: string,
    name: string,
    message: string,
    subject: string,
    status: number,
    phone: string,
    created_date: string
}
export type Comments = {
    id: number,
    content: string,
    rating: number,
    comment_date: string,
    username: string,
    user_id: number,
    product_id: number,
    status: number
}
export type Month = {
    year: number,
    month: number
}
export type CreatedDate = {
    year: number,
    month: number,
    day: number
}
