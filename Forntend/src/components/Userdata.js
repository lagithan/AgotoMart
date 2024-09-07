import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user_data, setuserdata] = useState({
        id: '',
        name: '',
        email: '',
        role: '',
        phonenumber:''
      });
      
    const [isregistered,setregister]=useState(false)

    return (
        <UserContext.Provider value={{ user_data, setuserdata,isregistered,setregister }}>
            {children}
        </UserContext.Provider>
    );
};
