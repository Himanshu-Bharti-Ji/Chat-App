import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get('/messages/users');
            console.log('res.data.data', res?.data?.data)
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
            set({ messages: res?.data });
        } catch (error) {
            console.log('Error in getMessages : ', error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    // TODO: Optimise it later
    setSelectedUser: (selectedUser) => set({ selectedUser })
}))