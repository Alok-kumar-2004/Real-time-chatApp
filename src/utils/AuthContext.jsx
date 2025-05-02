import React, { createContext, useContext, useEffect, useState } from 'react'
import { account } from '../appWriteConfig'
import { useNavigate } from 'react-router-dom'
import { ID } from 'appwrite'

const AuthContext = createContext()


export const AuthProvider = ({children}) =>{

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const navigate = useNavigate()
    useEffect(()=>{
        getUserOnLoad()
    },[])

    const getUserOnLoad = async() =>{
        try {
            const accountDetails = await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }
    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()

        try{
            // console.log(credentials);
            const response  =  await account.createEmailPasswordSession(credentials.email , credentials.password)
            console.log(response);
            const accountDetails = await account.get()
            setUser(accountDetails)

            navigate('/')
        }catch(error){
            console.error(error);
        }
    }

    const handleUserLogout = async () =>{
        account.deleteSession('current')
        setUser(null)
    }

    const handleRegister = async(e,credentials) =>{
        e.preventDefault()
        console.log("Handle Register triggred !",credentials);

        if(credentials.password1 !== credentials.password2){
            alert('Password did not match')
            return;
        }
            try {
                let response  = await account.create(
                    ID.unique(),
                    credentials.email,
                    credentials.password1,
                    credentials.name
                )

                console.log(response);

                await account.createEmailPasswordSession(
                    credentials.email,
                    credentials.password1
                )
                
                let accountDetails = await account.get()
                setUser(accountDetails)
                navigate('/')
            } catch (error) {
                console.log(error);
            }
        }

    const contextData={
        user,
        handleUserLogin,
        handleUserLogout,
        handleRegister
    }

    return <AuthContext.Provider value={contextData}>
        {
            loading ? <p>loading....</p> : children
        }
        </AuthContext.Provider>
        
}
export const useAuth =() =>{
    return useContext(AuthContext)
}
export default AuthContext