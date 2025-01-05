import { createContext, useEffect, useState } from "react";
import axios from "axios";


const ItemContext= createContext();

export const ItemProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);

    const getList = async (endPoint, callBack) => {
        const { data } = await axios.get(endPoint);
        callBack(data);
    };

    useEffect(()=>{
        getList("api/menu-items", setMenuItems);
    },[]);

    return (
        <ItemContext.Provider value={{ menuItems, setMenuItems, getList }}>
            {children}
        </ItemContext.Provider>
    );

};
