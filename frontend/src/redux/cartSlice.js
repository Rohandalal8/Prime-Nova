import {createSlice} from '@reduxjs/toolkit';

const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem('userInfo'));
    } catch (error) {
        return null;
    }
};

const getCartOwnerId = (user = getStoredUser()) => user?._id || user?.id || user?.email || 'guest';
const getCartStorageKey = (user) => `cartItems:${getCartOwnerId(user)}`;

const readStoredCart = (user) => {
    try {
        return JSON.parse(localStorage.getItem(getCartStorageKey(user))) || [];
    } catch (error) {
        return [];
    }
};

const persistCart = (cartItems) => {
    localStorage.setItem(getCartStorageKey(), JSON.stringify(cartItems));
    localStorage.removeItem('cartItems');
};

const initialState = {
    cartItems: readStoredCart(),
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
            persistCart(state.cartItems);
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((x) => getItemId(x) !== itemId);
            persistCart(state.cartItems);
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem(getCartStorageKey());
            localStorage.removeItem('cartItems');
        },
        loadCartForUser: (state, action) => {
            state.cartItems = readStoredCart(action.payload);
        }
    },
});

export const { addToCart, removeFromCart, clearCart, loadCartForUser } = cartSlice.actions;
export default cartSlice.reducer;
