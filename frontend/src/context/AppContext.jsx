// src/context/AppContext.jsx
import { createContext } from 'react';


const AppContext = createContext({
    currentRoute: '',
    setCurrentRoute: () => {},
    data: {},
    auth: { isAuthenticated: false, token: null },
    setAuth: () => {},
});
export default AppContext;
