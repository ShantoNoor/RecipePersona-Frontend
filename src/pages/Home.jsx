import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
} from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import {
  CheckCheckIcon,
  ChefHat,
  Flame,
  HeartPulseIcon,
  Search,
  Star,
  StarIcon,
} from "lucide-react";

import { motion } from "framer-motion";
import Title from "@/components/Title";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "@/hooks/useAxios";
import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <Search />,
    text: "Search by Ingredient or Cuisine",
  },
  {
    icon: <HeartPulseIcon />,
    text: "Find Recipes You'll Love",
  },
  {
    icon: <Flame />,
    text: "Filter by Dietary Needs",
  },
  {
    icon: <Star />,
    text: "Save Your Favorites",
  },
  {
    icon: <ChefHat />,
    text: "Upload Your Own Creations",
  },
];

const MotionCard = motion(Card);

const Home = () => {
  const navigate = useNavigate();

  const { data, error, isPending } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      try {
        const result = await axiosPublic.get(`/home`);
        return result.data;
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    },
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Title>Home</Title>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`bg-[url("https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/10/14/FN_ingredient-substitutions_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1634257696464.jpeg")] bg-no-repeat bg-cover bg-center md:p-10 rounded-lg`}
      >
        <PageHeader className="relative">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 0.75, height: "auto" }}
            className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-lg absolute inset-0 md:inset-4 lg:inset-12"
          />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="z-[1] flex flex-col gap-1 items-center justify-center"
          >
            <PageHeaderHeading className="text-white">
              Recipe Persona
            </PageHeaderHeading>
            <PageHeaderDescription className="text-zinc-100">
              Your Personalized Recipe Guide. Discover delicious recipes, get
              recipe recommendations based on your preferences.
            </PageHeaderDescription>
            <PageHeaderDescription className="text-zinc-100">
              Find it. Make it. Share it.
            </PageHeaderDescription>
            <PageActions className="flex flex-col md:flex-row gap-1 items-center justify-center">
              <Button onClick={() => navigate("/recipes")}>View Recipes</Button>
              <Button
                onClick={() => navigate("/recommendations")}
                variant="outline"
              >
                Get Recommendations
              </Button>
            </PageActions>
          </motion.div>
        </PageHeader>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="space-y-4 my-8"
      >
        <h1 className="text-3xl font-semibold">Popular Recipes</h1>
        <Separator />

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          {isPending ? (
            <Spinner />
          ) : (
            <CarouselContent className="-ml-2 md:-ml-4 mx-auto">
              {data.map((recipe, idx) => (
                <CarouselItem
                  key={idx}
                  onClick={() => navigate(`/view-recipe/${recipe._id}`)}
                  className="flex min-w-[350px] md:min-w-auto basis-1/2 md:basis-1/4 lg:basis-1/6 pl-2 md:pl-4 items-center justify-center p-6 cursor-pointer"
                >
                  <div className="border-secondary rounded-lg overflow-hidden border">
                    <div className="overflow-hidden relative">
                      <Image
                        src={recipe.image}
                        className="h-auto w-auto object-cover transition-all aspect-square hover:scale-110"
                      />
                      <MotionCard
                        className="absolute top-3 right-3 px-2 py-1 rounded bg-primary capitalize text-white"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                            delay: 0.15 * idx,
                          },
                        }}
                      >
                        <span className="flex justify-center items-center gap-1">
                          <StarIcon className="size-5" />{" "}
                          <span>{recipe.averageRating}</span>
                        </span>
                      </MotionCard>
                    </div>
                    <div className="space-y-1 text-sm p-2">
                      <h3 className="font-medium leading-none">
                        {recipe.name}
                      </h3>
                      <p className="text-xs text-muted-foreground capitalize">
                        {recipe.cuisine || "unknown"}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </Carousel>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-semibold">Our Features</h1>
        <Separator />

        <div className="flex gap-4 flex-wrap justify-center">
          {features.map((feature, idx) => (
            <MotionCard
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              whileInView={{
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
              className="min-w-[300px] md:min-w-[325px] shadow-none hover:shadow-md hover:shadow-accent"
            >
              <CardHeader>
                <CardTitle className="mx-auto">{feature.icon}</CardTitle>
              </CardHeader>
              <CardContent className="mx-auto text-center flex items-center justify-center gap-2">
                <CheckCheckIcon className="size-5" />
                <p>{feature.text}</p>
              </CardContent>
            </MotionCard>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Home;
