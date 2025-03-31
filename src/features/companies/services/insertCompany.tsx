import supabase from "@/utils/supabase/client";
import { CompanySupabase } from "../data/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const insertCompany = async (newCompany: {
  newCompany: Pick<CompanySupabase, "company_name">;
}): Promise<CompanySupabase> => {
  const { data, error } = await supabase
    .schema("enum")
    .from("companies")
    .insert([newCompany.newCompany])
    .select("*")
    .single();

  if (error) {
    console.error("Error inserting company:", error);
    throw new Error(error.message);
  }

  return data; 
};

export const useInsertCompanyMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: insertCompany,
    onSuccess: (data) => {
      console.log("Company inserted successfully:", data);
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast({
        variant: "default",
        title: '데이터 삽입 성공!',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    },
    onError: (error) => {
      throw new Error(`${error}`);
      // console.error("Error inserting company:", error);
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
  };
};
