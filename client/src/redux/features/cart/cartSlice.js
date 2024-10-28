import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    products: [],
    selectedProducts: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.05,
    grandTotal: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find(product => product._id === action.payload._id)
            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 })
            } else {
                console.log("Items already added")
            }

            state.selectedProducts = setSelectedProducts(state)
            state.totalPrice = setTotalPrice(state)
            state.tax = setTax(state)
            state.grandTotal = setGrandTotal(state)
        },

        updateCartQuantity: (state, action) => {
            state.products = state.products.map(product => {
                if (product._id === action.payload.id) {
                    if (action.payload.type === "increment") {
                        product.quantity += 1
                    } else if (action.payload.type === "decrement") {
                        if (product.quantity > 1) {
                            product.quantity -= 1
                        }
                    }
                }
                return product
            })

            state.selectedProducts = setSelectedProducts(state)
            state.totalPrice = setTotalPrice(state)
            state.tax = setTax(state)
            state.grandTotal = setGrandTotal(state)
        },
        removeFromCart: (state,action) => {
            state.products= state.products.filter(pro=>pro._id !== action.payload.id)
            state.selectedProducts = setSelectedProducts(state)
            state.totalPrice = setTotalPrice(state)
            state.tax = setTax(state)
            state.grandTotal = setGrandTotal(state)
          
        },
        clearCart: (state) => {
            state.products = []
            state.selectedProducts = 0
            state.totalPrice = 0
            state.tax = 0
            state.grandTotal =0
    }
}
})

// Utility Functions

export const setSelectedProducts = (state) => state.products.reduce((total, product) => {
    return Number(total + product.quantity)
}, 0)

export const setTotalPrice = (state) => state.products.reduce((total, product) => {
    return Number(total + product.quantity * product.price)
}, 0)

export const setTax = (state) => setTotalPrice(state) * state.taxRate

export const setGrandTotal = (state) => {
    return setTotalPrice(state) + setTax(state)
}

export const { addToCart, updateCartQuantity,removeFromCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;