import Spinner from "@/components/Spinner";
import axiosPublic from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ViewRecipe = () => {
  const { _id } = useParams();

  const { data, error, isPending } = useQuery({
    queryKey: ["recipes", `_id=${_id}`],
    enabled: !!_id,
    queryFn: async () => {
      try {
        const result = await axiosPublic.get(`/recipes?_id=${_id}`);
        return result.data[0];
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    },
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div>{JSON.stringify(data, null, 2)}</div>
    </>
  );
};

export default ViewRecipe;
