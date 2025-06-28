import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser]= useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"))

    const [credit, setCredit] = useState(null);
    const backendUrl = "https://imagify-text-to-image-generator-using-ai.onrender.com"
    
    const navigate = useNavigate(); 
    const loadCredits = async() => {
        try {
            const {data} = await axios.get(backendUrl+ "/api/user/credits", {headers:{token}})
            if(data.success) {
                setCredit(data.credits);
                setUser(data.user);
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    const generateImage = async (prompt) => {
         try {
            const {data} = await axios.post(backendUrl + "/api/image/generate-image", {prompt}, {headers: {token}}) 
            console.log(data);
            if(data.success) {
                loadCredits();
                return data.resultImage
            } else {
                toast.error(data.message)
                loadCredits();
                if(data.creditBalance === 0){
                   navigate("/buy")
                }
            }
         } catch (error) {
            toast.error(error.message);
         }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
    }

    useEffect ( () => {
      if(token) {
        loadCredits();
      }
    }, [token])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, logout, generateImage, loadCredits
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider
