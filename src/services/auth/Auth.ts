import api from "@/lib/axios";

export const login = async (payload: any) => {
    const response = await api.post("/login", payload);
    return response.data;
};