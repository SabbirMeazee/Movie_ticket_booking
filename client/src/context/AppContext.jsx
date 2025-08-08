// client/src/context/AppContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [shows, setShows] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const { user } = useUser();
    const { getToken } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const fetchIsAdmin = async () => {
        try {
            const { data } = await axios.get('/api/admin/is-admin', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });
            setIsAdmin(data.isAdmin);
            if (!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/');
                toast.error('You are not authorized to access admin dashboard');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchShows = async () => {
        try {
            const { data } = await axios.get('/api/show/all');
            if (data.success) {
                if (!data.shows || data.shows.length === 0) {
                    toast.error("No shows available right now.");
                }
                setShows(data.shows || []);
            } else {
                toast.error(data.message || "Failed to fetch shows");
            }
        } catch (error) {
            console.error("fetchShows error:", error);
            toast.error("Server error while fetching shows");
        }
    };

    const fetchFavoriteMovies = async () => {
        try {
            const { data } = await axios.get('/api/user/favorites', {
                headers: { Authorization: `Bearer ${await getToken()} ` }
            });
            if (data.success) {
                setFavoriteMovies(data.movies);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchShows();
    }, []);

    useEffect(() => {
        if (user) {
            fetchIsAdmin();
            fetchFavoriteMovies();
        }
    }, [user]);

    const value = {
        axios,
        fetchIsAdmin,
        user,
        getToken,
        navigate,
        isAdmin,
        shows,
        favoriteMovies,
        fetchFavoriteMovies
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
