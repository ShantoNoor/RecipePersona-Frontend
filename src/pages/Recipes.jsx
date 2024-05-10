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
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const MotionCard = motion(Card);

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import minutesToHoursAndMinutes from "@/utils/minutesToHoursAndMinutes";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

const cuisines = [
  "all",
  "popular",
  "italian",
  "chinese",
  "indian",
  "mexican",
  "japanese",
];

const Recipes = () => {
  const navigate = useNavigate();
  const [disableNavigation, setDisableNavigation] = useState(false);

  const [filterData, setFilterData] = useState([]);

  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("all");
  const [cookTime, setCookTime] = useState(0);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filterData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const { data, error, isPending } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      try {
        const result = await axiosPublic.get(`/recipes`);
        setFilterData(result.data);
        return result.data;
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    },
  });

  useEffect(() => {
    if (data) {
      let fr = [...data];

      if (search) {
        fr = fr.filter((recipe) =>
          recipe.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (cuisine !== "all") {
        if (cuisine === "popular") {
          fr.sort((a, b) => b.averageRating - a.averageRating);
        } else {
          fr = fr.filter(
            (recipe) => recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
          );
        }
      }

      if (cookTime) {
        fr = fr.filter((recipe) => recipe.cookTime <= cookTime);
      }

      setFilterData(fr);
      setCurrentPage(0);
    }
  }, [data, search, setSearch, cuisine, setCuisine, cookTime, setCookTime]);

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Title>Recipes</Title>
      <div className="mb-8 space-y-6">
        <Input
          type="search"
          placeholder="Search recipe here ... "
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        <div className="mt-3 space-y-2">
          <h2>Filter Recipes by Cuisine</h2>
          <Select
            value={cuisine}
            onValueChange={(value) => {
              setDisableNavigation(true);
              setCuisine(value);
              setTimeout(() => {
                setDisableNavigation(false);
              }, 500);
            }}
            defaultValue={cuisine[0]}
          >
            <SelectTrigger className="capitalize">
              <SelectValue
                placeholder="Select a cuisine"
                className="text-muted"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {cuisines.map((cuisine) => (
                  <SelectItem
                    key={cuisine}
                    value={cuisine}
                    className="capitalize"
                  >
                    {cuisine}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-3 space-y-2">
          <h2>
            Filter Recipes by CookTime: {minutesToHoursAndMinutes(cookTime)}
          </h2>
          <Slider
            min={0}
            max={200}
            step={1}
            value={[cookTime]}
            onValueChange={(value) => setCookTime(value[0])}
            className="w-full"
          />
        </div>

        <div className="mt-6 text-center">
          <Button
            size="sm"
            onClick={() => {
              setSearch("");
              setCuisine("all");
              setCookTime(0);
              setCurrentPage(0);
            }}
          >
            Clear Filter
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {filterData
          ?.slice(currentPage * itemsPerPage, itemsPerPage * (currentPage + 1))
          .map((recipe, idx) => (
            <MotionCard
              key={recipe._id}
              onClick={() =>
                !disableNavigation && navigate(`/view-recipe/${recipe._id}`)
              }
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
              <CardContent className="p-4 relative">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  className="object-cover aspect-square w-full mb-4 rounded-md"
                />
                <MotionCard
                  className="absolute top-5 right-5 px-2 py-1 rounded bg-primary capitalize text-white"
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
                    <span>{recipe.averageRating || 0}</span>
                  </span>
                </MotionCard>
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

      <Pagination>
        <PaginationContent>
          {[...Array(totalPages).keys()].map((page) => (
            <PaginationItem
              className="cursor-pointer"
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              <PaginationLink isActive={currentPage === page}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default Recipes;
