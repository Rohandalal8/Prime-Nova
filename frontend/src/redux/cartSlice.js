import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

const getItemId = (item) => item?.productId || item?._id;
const getMaxQty = (item) => Number.isFinite(item?.stock) ? item.stock : undefined;
const getCappedQty = (qty, maxQty) => {
    if (!Number.isFinite(maxQty)) {
        return Math.max(1, qty || 1);
    }

    return Math.max(1, Math.min(qty || 1, maxQty));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const itemId = getItemId(item);
            const maxQty = getMaxQty(item);
            const existingItem = state.cartItems.find((x) => getItemId(x) === itemId);
            const requestedQty = item.qty || existingItem?.qty || 1;
            const normalizedQty = getCappedQty(requestedQty, maxQty ?? existingItem?.stock);
            const normalizedItem = {
                ...item,
                productId: itemId,
                _id: itemId,
                stock: item.stock ?? existingItem?.stock,
                qty: normalizedQty,
            };
            if (existingItem) {
                state.cartItems = state.cartItems.map((x) => {
                    if (getItemId(x) !== itemId) {
                        return x;
                    }

                    return {
                        ...x,
                        ...normalizedItem,
                        qty: normalizedQty,
                        stock: normalizedItem.stock ?? x.stock,
                    };
                });
            } else {
                state.cartItems = [...state.cartItems, normalizedItem];
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((x) => getItemId(x) !== itemId);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        }
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;