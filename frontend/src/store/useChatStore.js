import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSendingMessage: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res?.data });

            // Emit request to get updated online users
            const { socket } = useAuthStore.getState();
            socket?.emit("requestOnlineUsers");
        } catch (error) {
            console.log("Error in getUsers : ", error);
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
            console.log("Error in getMessages : ", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (formData) => {
        const { selectedUser, messages } = get();
        set({ isSendingMessage: true });
        try {
            const res = await axiosInstance.post(
                `/messages/send/${selectedUser._id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.log("Error in sendMessage : ", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isSendingMessage: false });
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser =
                newMessage?.senderId === selectedUser?._id;
            if (!isMessageSentFromSelectedUser) return;
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unSubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
