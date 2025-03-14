import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get('/messages/users');
            set({ users: res?.data?.data });
        } catch (error) {
            console.log('Error in getUsers : ', error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res?.data?.data });
        } catch (error) {
            console.log('Error in getMessages : ', error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data?.data] })
        } catch (error) {
            console.log('Error in sendMessage : ', error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    },

    // TODO: Optimise it later
    setSelectedUser: (selectedUser) => set({ selectedUser })
}))