import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_SOCKET_URL : '/'

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    onlineUsers: [],

    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res?.data });
            get().connectSocket();
        } catch (error) {
            console.log('Error in checkAuth : ', error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res?.data });
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            console.log('Error in signup : ', error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res?.data });
            toast.success("Login successfully");
            get().connectSocket();
        } catch (error) {
            console.log('Error in login : ', error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logout successfully");
            get().disconnectSocket();
        } catch (error) {
            console.log('Error in logout : ', error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    },

    updateProfile: async (profilePic) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', profilePic);
            set({ authUser: res?.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log('Error in updateProfile : ', error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser?._id
            }
        })
        socket.connect();
        set({ socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },

}))