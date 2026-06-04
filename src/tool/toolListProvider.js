import { createContext, useState, useEffect } from "react";
import fetchHelper from "../fetchHelper";

export const ToolListContext = createContext();

function ToolListProvider({ children }) {
    const [toolList, setToolList] = useState([]);

    async function fetchToolList() {
        const response = await fetchHelper.tool.getAll({});
        if (response.ok) {
            setToolList(response.data);
        } else {
            console.error('Error fetching tool list:', response.status);
        }
    }
    useEffect(() => {
        fetchToolList();
 
   }, []);

    return (
        <ToolListContext.Provider value={{ toolList, fetchToolList }}>
            {children}
        </ToolListContext.Provider>
    );
};
export default ToolListProvider;