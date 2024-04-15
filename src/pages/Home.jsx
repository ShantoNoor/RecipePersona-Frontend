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
} from "lucide-react";

import { motion } from "framer-motion";

const imgs = [
  "https://www.themealdb.com/images/media/meals/xrysxr1483568462.jpg",
  "https://www.themealdb.com/images/media/meals/t8mn9g1560460231.jpg",
  "https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg",
  "https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg",
  "https://www.themealdb.com/images/media/meals/1529444113.jpg",
  "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg",
  "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg",
  "https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg",
  "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
  "https://www.themealdb.com/images/media/meals/uttupv1511815050.jpg",
  "https://www.themealdb.com/images/media/meals/1525876468.jpg",
  "https://www.themealdb.com/images/media/meals/1525873040.jpg",
];

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

const Home = () => {
  return (
    <>
      <div className="bg-[url(https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/10/14/FN_ingredient-substitutions_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1634257696464.jpeg)] bg-no-repeat bg-cover bg-center md:p-10 rounded-xl">
        <PageHeader className="relative">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 0.75, height: "auto" }}
            className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl absolute inset-0 md:inset-4 lg:inset-12"
          />
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.5,
              },
            }}
            className="z-[1] flex flex-col gap-1 items-center justify-center"
          >
            <PageHeaderHeading className="text-white">
              RecipePersona
            </PageHeaderHeading>
            <PageHeaderDescription className="text-zinc-100">
              Your Personalized Recipe Guide. Discover delicious recipes, get
              recipe recommendations based on your preferences.
            </PageHeaderDescription>
            <PageHeaderDescription className="text-zinc-100">
              Find it. Make it. Share it.
            </PageHeaderDescription>
            <PageActions className="flex flex-col md:flex-row gap-1 items-center justify-center">
              <Button>View Recipes</Button>
              <Button variant="outline">Get Recommendations</Button>
            </PageActions>
          </motion.div>
        </PageHeader>
      </div>

      <div className="space-y-4 mt-8">
        <div>
          <h1 className="text-3xl font-semibold">Popular Recipes</h1>
          {/* <p  <h3 className="text-lg font-medium">
            This are the most loved Recipes.
          </h3>
         className="text-sm text-muted-foreground">Popular Recipes</p> */}
        </div>
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
          <CarouselContent className="-ml-2 md:-ml-4 mx-auto">
            {imgs.map((img, idx) => (
              <CarouselItem
                key={idx}
                className="flex min-w-[350px] md:min-w-auto basis-1/2 md:basis-1/4 lg:basis-1/6 pl-2 md:pl-4 items-center justify-center p-6 cursor-pointer"
              >
                <div className="border-secondary rounded-[var(--radius)] border overflow-hidden">
                  <div className="overflow-hidden">
                    <Image
                      src={img}
                      className="h-auto w-auto object-cover transition-all aspect-square hover:scale-110"
                    />
                  </div>
                  <div className="space-y-1 text-sm p-2">
                    <h3 className="font-medium leading-none">Title</h3>
                    <p className="text-xs text-muted-foreground">SubTitle</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </Carousel>
      </div>

      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-semibold">Our Features</h1>
          {/* <p  <h3 className="text-lg font-medium">
            This are the most loved Recipes.
          </h3>
         className="text-sm text-muted-foreground">Popular Recipes</p> */}
        </div>
        <Separator />

        <div className="flex gap-4 flex-wrap justify-center">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="min-w-[325px] hover:-translate-y-1 transition-transform duration-300"
            >
              <CardHeader>
                <CardTitle className="mx-auto">{feature.icon}</CardTitle>
              </CardHeader>
              <CardContent className="mx-auto text-center flex items-center justify-center gap-2">
                <CheckCheckIcon className="size-5" />
                <p>{feature.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
