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
import ProfileSection from "./MyProfile/ProfileSection";
import Title from "@/components/Title";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

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
    <>
      <Title>{recipe.name}</Title>
      <article className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-6 md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 md:col-span-2"
        >
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
                  • Cooking Time: {minutesToHoursAndMinutes(recipe.cookTime)}
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
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                  },
                }}
                className="absolute left-0 right-0 top-[65%] bottom-0 bg-transparent backdrop-blur-xl backdrop-opacity-75 rounded-xl"
              />
            </div>
            <div className="flex justify-center items-center gap-2 flex-wrap absolute top-4 right-4">
              <MotionCard
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.15 * 0,
                  },
                }}
                whileHover={{
                  translateY: -10,
                }}
                whileTap={{
                  translateY: -5,
                }}
                className="px-2 py-1 rounded bg-primary text-capitalize text-white"
              >
                # {recipe.category}
              </MotionCard>
              <MotionCard
                className="px-2 py-1 rounded bg-primary text-capitalize text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.15 * 1,
                  },
                }}
                whileHover={{
                  translateY: -10,
                }}
                whileTap={{
                  translateY: -5,
                }}
              >
                # {recipe.cuisine}
              </MotionCard>
              {recipe.video && (
                <Link to={recipe.video} target="_blank">
                  <MotionCard
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: 0.15 * 2,
                      },
                    }}
                    whileHover={{
                      translateY: -10,
                    }}
                    whileTap={{
                      translateY: -5,
                    }}
                    className="px-2 py-1 rounded bg-primary cursor-pointer text-white underline"
                  >
                    # Video
                  </MotionCard>
                </Link>
              )}
            </div>

            <div className="leading-relaxed font-semibold -mt-[35%] p-4 relative space-y-6">
              <div className="block lg:hidden !text-white">
                <ShowIngredients recipe={recipe} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                  },
                }}
                className="space-y-4 text-foreground lg:text-white"
              >
                <h2 className="text-2xl font-bold tracking-tight">
                  Instructions
                </h2>
                <Separator />
                {recipe.instructions.split("\n").map((line, idx) => {
                  return (
                    line.trim() !== "" && (
                      <MotionCard
                        key={idx}
                        className="overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                            delay: 0.15 * idx,
                          },
                        }}
                      >
                        <CardContent className="flex items-stretch p-0">
                          <CardHeader className="bg-accent font-black text-primary p-4 flex justify-center">
                            <CardTitle>{idx + 1}</CardTitle>
                          </CardHeader>
                          <CardDescription className="font-extrabold text-foreground p-4">
                            {line}
                          </CardDescription>
                        </CardContent>
                      </MotionCard>
                    )
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block"
        >
          <ShowIngredients recipe={recipe} />
        </motion.div>
      </article>
    </>
  );
};

export default ViewRecipe;

function ShowIngredients({ recipe }) {
  return (
    <div className="space-y-3">
      <ProfileSection title={`Ingredients (${recipe.ingredients.length})`} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
        {recipe.ingredients.map((ingredient, idx) => (
          <MotionCard
            key={idx}
            className="flex flex-row items-stretch overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            // viewport={{ once: true }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.15 * idx,
              },
            }}
          >
            <CardHeader className="p-0 w-10 flex justify-center items-center bg-accent text-primary">
              <CardTitle>{idx + 1}</CardTitle>
            </CardHeader>
            <CardContent className="flex p-0 gap-4">
              <div className="flex flex-row gap-4 items-center">
                <Image
                  src={`http://www.themealdb.com/images/ingredients/${ingredient.name}.png`}
                  className="object-cover size-16 shadow p-1 rounded-none size-15"
                />
              </div>
              <div className="flex flex-col justify-center gap-[.15rem]">
                <span>{ingredient.name}</span>
                <Separator />
                <span>
                  Measure:{" "}
                  <span className="text-primary">{ingredient.measure}</span>
                </span>
              </div>
            </CardContent>
          </MotionCard>
        ))}
      </div>
    </div>
  );
}
