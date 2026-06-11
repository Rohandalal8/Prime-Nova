import React, {createContext, useState} from 'react';
import { useDispatch } from 'react-redux';
import { loadCartForUser } from '../redux/cartSlice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('userInfo'));
        } catch (error) {
            return null;
        }
    });
    const dispatch = useDispatch();

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('userInfo', JSON.stringify(userData));
        dispatch(loadCartForUser(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        dispatch(loadCartForUser(null));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
