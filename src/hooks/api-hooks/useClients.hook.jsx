import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios.instance";

export const useClientList = () => {
  return useQuery({
    queryKey: ["clientList"],
    queryFn: async () => {
      const response = await api.get("/clients");
      return response?.data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useClientListMutate = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const response = await api.post(`/clients`, body);
      return response?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["clientList"] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};
