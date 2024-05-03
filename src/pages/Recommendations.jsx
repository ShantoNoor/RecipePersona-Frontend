import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import axiosPublic from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import getTimeAgoString from "@/utils/getTimeAgoString";
import { Separator } from "@/components/ui/separator";
import Image from "@/components/Image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useState } from "react";
const MotionCard = motion(Card);

const Recommendations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, error, isPending } = useQuery({
    queryKey: ["recommendations", `${user?._id}`],
    enabled: !!user,
    queryFn: async () => {
      try {
        const result = await axiosPublic.get(`/recommendations/${user?._id}`);
        return result.data;
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    },
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {data?.slice(currentPage * itemsPerPage, itemsPerPage * (currentPage + 1)).map((recipe, idx) => (
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

export default Recommendations;
