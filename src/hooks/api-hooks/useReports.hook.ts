import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios.instance";

export const useClientScoreHistory = () => {
    return useQuery({
        queryKey: ["clientScoreHistory"],
        queryFn: async () => {
            const response = await api.get("/report/scoreHistory");
            return response?.data;
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
};
