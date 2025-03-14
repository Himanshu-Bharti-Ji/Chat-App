import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data?.data });
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
            set({ authUser: res.data });
            toast.success("Account created successfully");
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
    }

}))