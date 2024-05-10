import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import axiosPublic from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeIcon, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "@/components/Image";
import { Separator } from "@/components/ui/separator";
import Title from "@/components/Title";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionCard = motion(Card);

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { PageHeaderHeading } from "@/components/ui/page-header";

const MyFavorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filterData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["favorites", `author=${user?._id}`],
    enabled: !!user,
    queryFn: async () => {
      try {
        const result = await axiosPublic.get(`/favorites?author=${user._id}`);
        console.log(result.data);
        setFilterData(result.data);
        return result.data;
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    },
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  if (data.length === 0) {
    return (
      <PageHeaderHeading className="text-white mt-8">
        You have not added any recipes to your favorites
      </PageHeaderHeading>
    );
  }

  return (
    <>
      <Title>My Favorite Recipes</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {filterData
          ?.slice(currentPage * itemsPerPage, itemsPerPage * (currentPage + 1))
          .map((recipe, idx) => (
            <MotionCard
              key={recipe._id}
              className="flex flex-col overflow-hidden rounded-lg shadow-md"
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
              <div
                onClick={() => navigate(`/view-recipe/${recipe._id}`)}
                className="cursor-pointer flex-1 relative"
              >
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
              </div>
              <div className="px-4">
                <Separator />
              </div>
              <CardFooter className="flex flex-wrap justify-end p-4">
                <div className="space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/view-recipe/${recipe._id}`)}
                  >
                    <EyeIcon className="size-4 text-primary" />
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash className="size-4 text-primary" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your recipe and remove the recipe from the
                          database.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={() => {
                            toast.promise(
                              axiosPublic.delete(`/favorites/${user._id}-${recipe._id}`),
                              {
                                loading: "Deleting recipe, Please wait ...",
                                success: () => {
                                  refetch();
                                  return "Recipe deleted successfully";
                                },
                                error: (err) => {
                                  toast.error("Failed to delete recipe");
                                  return err.message;
                                },
                              }
                            );
                          }}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardFooter>
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

export default MyFavorites;
