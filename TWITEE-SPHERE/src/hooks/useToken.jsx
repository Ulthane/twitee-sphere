import { Navigate } from "react-router-dom";
import route from "../routes/route";

export const useToken = () => {
    // Récupère le token
    const getToken = () => {
        return sessionStorage.getItem('token');
    }

    // Ajoute le token
    const setToken = (token) => {
        sessionStorage.setItem('token', token);
    }

    // Retire le token et redirige vers la page de login
    const logout = () => {
        sessionStorage.removeItem('token');
        Navigate(route.LOGIN);
    }

    return {
        getToken,
        setToken,
        logout
    }
}