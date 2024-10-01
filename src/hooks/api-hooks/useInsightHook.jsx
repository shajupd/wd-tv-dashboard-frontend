import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios.instance";

export const useInsightList = () => {
  return useQuery({
    queryKey: ["insightList"],
    queryFn: async () => {
      const response = await api.get("/insights");
      return response?.data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useInsightListMutate = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const response = await api.post(`/insights`, body);
      return response?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["insightList"] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};

export const useInsightBulkAdd = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const response = await api.post(`/insights/bulk`, body);
      return response?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["insightList"] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};

export const useInsightRemove = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/insights/${id}`);
      return response?.data;
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["insightList"] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};
