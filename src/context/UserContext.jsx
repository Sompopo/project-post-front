import { createContext, useContext, useState, useEffect } from "react";
import { saveFileRequest, deleteFileRequest, signatureRequest } from "../api/cloud";
import {
    createUserDataRequest,
    updateUserDataRequest,
    getUserDataRequest,
    deletePhotoRequest
} from "../api/user";

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
}

export function UserDataProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [errors, setErrors] = useState([]);

    const createUserData = async (user) => {
        try {
            const res = await createUserDataRequest(user);
            console.log(res.data);
            setUserData(res.data);
        } catch (error) {
            setErrors([error.response.data.message]);
        }
    }

    const updateUserData = async (id, user) => {
        try {
            const res = await updateUserDataRequest(id, user);
            setUserData(res.data);
        } catch (error) {
            setErrors([error.response.data.message]);
        }
    };

    const getUserData = async () => {
        try {
            const res = await getUserDataRequest();
            setUserData(res.data);
        } catch (error) {
            setErrors([error.response.data.message]);
        }
    }

    const delete_photo = async (id, data) => {
        try {
            const res = await deletePhotoRequest(id, data);
            setUserData(res.data);
        } catch (error) {
            //setErrors(error.response.data);
            console.error(error.response.data);
        }
    }

    const save_file = async (data) => {
        try {
            const res = await saveFileRequest(data);  
            let imageUrl = res.data.secure_url;
            console.log(imageUrl)
            return imageUrl;
        } catch (error) {
            console.error("Error uploading image", error);
        }
    }

    const delete_file = async (data) => {
        try {
            const res = await deleteFileRequest(data);  
            console.log("Image delete",res.data)
        } catch (error) {
            console.error("Error uploading image", error);
        }
    }

    const signature_file = async (data) => {
        try {
            const res = await signatureRequest(data); 
            //console.log(res.data)
            return res.data;
        } catch (error) {
            console.error("Error uploading image", error);
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <UserContext.Provider
            value={{
                userData,
                getUserData,
                createUserData,
                updateUserData,
                setUserData,
                save_file,
                delete_photo,
                delete_file,
                signature_file,
                errors
            }}>
            {children}
        </UserContext.Provider>
    );
}