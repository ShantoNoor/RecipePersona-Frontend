import Spinner from "@/components/Spinner";
import axiosPublic from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getTimeAgoString from "@/utils/getTimeAgoString";
import { useNavigate } from "react-router-dom";
import Image from "@/components/Image";
import { Separator } from "@/components/ui/separator";
import Title from "@/components/Title";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const Recipes = () => {
  const navigate = useNavigate();

  const { data, error, isPending } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      try {
        const result = await axiosPublic.get(`/recipes`);
        return result.data;
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    },
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Title>Recipes</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((recipe, idx) => (
          <MotionCard
            key={recipe._id}
            onClick={() => navigate(`/view-recipe/${recipe._id}`)}
            className="flex flex-col overflow-hidden rounded-lg shadow-md cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.15 * idx,
              },
            }}
            whileHover={{
              translateY: -10,
            }}
            whileTap={{
              translateY: -5,
            }}
          >
            <CardHeader className="flex flex-row gap-4 items-center p-4">
              <Avatar>
                <AvatarImage
                  src={recipe.author.photo}
                  className="object-cover w-12 h-12 rounded-full shadow"
                />
                <AvatarFallback>{recipe.author.name}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col space-y-1">
                <span className="text-sm font-semibold">
                  {recipe.author.name}
                </span>
                <span className="text-xs">
                  {getTimeAgoString(recipe.createdAt)}
                </span>
              </div>
            </CardHeader>
            <div className="px-4">
              <Separator />
            </div>
            <CardContent className="p-4">
              <Image
                src={recipe.image}
                alt={recipe.name}
                className="object-cover aspect-square w-full mb-4 rounded-md"
              />
              <CardTitle className="mb-1 text-xl font-semibold">
                {recipe.name}
              </CardTitle>
              <CardDescription className="text-sm">
                {recipe.instructions.length > 100
                  ? `${recipe.instructions.substring(0, 100)} ...`
                  : recipe.instructions}
              </CardDescription>
            </CardContent>
          </MotionCard>
        ))}
      </div>
    </>
  );
};

export default Recipes;
