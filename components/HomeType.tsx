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
export type GetInputInventory = {
    product_input: {
        color_name: string,
        size: string
    }

}
export type InputUpdateInventory = {
    product_input: {
        color_name: string,
        size: string,
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
        search: string,
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
export type InputUser = {
    filter: {
        search: string,
        created_date:{
            min: string,
            max: string
        }
    },
    sort:{
        field: string,
        order: string
    }
}
export type InputCommentFilter = {
    filter: {
        search: string,
        comment_date:{
            min: string,
            max: string
        }
    },
    sort:{
        field: string,
        order: string
    }
}
export type InputCampaignFilter = {
    filter: {
        search: string,
        start_day:{
            min: string,
            max: string
        }
    },
    sort:{
        field: string,
        order: string
    }
}
export type InputSizeFilter = {
    filter: {
        search: string,
    }
}
export type InputColorFilter = {
    filter: {
        search: string,
    }
}
export type InputOrderFilter = {
    filter: {
        search: string,
        created_date:{
            min: string,
            max: string
        }
    },
    sort:{
        field: string,
        order: string
    },
    status: number
}
export type InputDiscountFilter = {
    filter: {
        search: string,
        start_day:{
            min: string,
            max: string
        }
    },
    sort:{
        field: string,
        order: string
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
    created_date: string,
    shipped_date: string,
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
        password: string
    }
}
export type InputUpdateUser = {
    user_input: {
        email: string,
        name: string,
        phone: string,
        address: string,
        username: string
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
export type InputBlockProduct = {
    id: number,
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
    name: string
    user_id: number,
    product_id: number,
    status: number
}
export type ProductName = {
    name: string
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
