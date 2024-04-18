import Image from "@/components/Image";
import Spinner from "@/components/Spinner";
import { Separator } from "@/components/ui/separator";
import axiosPublic from "@/hooks/useAxios";
import minutesToHoursAndMinutes from "@/utils/minutesToHoursAndMinutes";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileSection from "./MyProfile/ProfileSection";

const ViewRecipe = () => {
  const { _id } = useParams();

  const {
    data: recipe,
    error,
    isPending,
  } = useQuery({
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

  const updatedAt = new Date(recipe?.updatedAt);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = updatedAt.toLocaleDateString("en-US", options);

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <article className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-12">
      <div className="space-y-6 md:col-span-2">
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
              {recipe.name}
            </h1>
            <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center">
              <div className="flex items-center md:space-x-2">
                <Image
                  src={recipe.author.photo}
                  alt={recipe.author.name}
                  className="w-4 h-4 border rounded-full"
                />
                <p className="text-sm">
                  {recipe.author.name} • {formattedDate}
                </p>
              </div>
              <div className="flex-shrink-0 mt-3 text-sm md:mt-0 relative">
                <Separator
                  className="absolute -left-7"
                  orientation="vertical"
                />
                Cooking Time: {minutesToHoursAndMinutes(recipe.cookTime)}
              </div>
            </div>
          </div>
        </div>
        <Separator />

        <div className="mx-auto relative">
          <div className="relative">
            <Image
              className="rounded-xl object-cover w-full aspect-square"
              src={recipe.image}
              alt={recipe.name}
            />
            <div className="absolute left-0 right-0 top-[75%] bottom-0 bg-transparent backdrop-blur-xl backdrop-opacity-75 rounded-xl" />
          </div>
          <div className="flex justify-center items-center gap-2 flex-wrap absolute top-4 right-4">
            <Card className="px-2 py-1 rounded bg-primary text-capitalize text-white">
              # {recipe.category}
            </Card>
            <Card className="px-2 py-1 rounded bg-primary text-capitalize text-white">
              # {recipe.cuisine}
            </Card>
            {recipe.video && (
              <Link to={recipe.video}>
                <Card className="px-2 py-1 rounded bg-primary cursor-pointer text-white underline">
                  # Video
                </Card>
              </Link>
            )}
          </div>

          <div className="space-y-4 leading-relaxed font-semibold -mt-[25%] p-4 relative text-white">
            <h2 className="text-2xl font-bold tracking-tight">Instructions</h2>
            <Separator className="bg-white" />
            {recipe.instructions.split("\n").map((line, idx) => (
              <Card key={idx} className="overflow-hidden">
                <CardContent className="flex items-center p-0 gap-4">
                  <CardHeader className="bg-accent font-black text-primary">
                    <CardTitle>{idx + 1}</CardTitle>
                  </CardHeader>
                  <CardDescription className="font-extrabold text-foreground">
                    {line}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <ProfileSection title={`Ingredients (${recipe.ingredients.length})`} />
        {recipe.ingredients.map((ingredient, idx) => (
          <Card key={idx} className="flex flex-row">
            <CardHeader className="flex flex-row gap-4 items-center p-4">
              <Avatar className="rounded-none size-16">
                <AvatarImage
                  src={`http://www.themealdb.com/images/ingredients/${ingredient.name}.png`}
                  className="object-cover size-16 shadow"
                />
                <AvatarFallback className="rounded-none size-16">
                  {ingredient.name}
                </AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="flex flex-col py-8 px-4 gap-1 text-center">
              <span>{ingredient.name}</span>
              <Separator />
              <span>
                Measure:{" "}
                <span className="text-primary">{ingredient.measure}</span>
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </article>
  );
};

export default ViewRecipe;
