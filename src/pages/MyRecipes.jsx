import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import axiosPublic from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getTimeAgoString from "@/utils/getTimeAgoString";
import { Button } from "@/components/ui/button";
import { EyeIcon, Pencil, Trash } from "lucide-react";
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

const MyRecipes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["recipes", `author=${user?._id}`],
    enabled: !!user,
    queryFn: async () => {
      try {
        const result = await axiosPublic.get(`/recipes?author=${user._id}`);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((recipe) => (
          <Card
            key={recipe._id}
            className="flex flex-col overflow-hidden rounded-lg shadow-md"
          >
            <div onClick={() => navigate(`/view-recipe/${recipe._id}`)} className="cursor-pointer flex-1">
              <CardHeader className="flex flex-row gap-4 items-center">
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
              <CardContent className="">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  className="object-cover aspect-square w-full mb-4 "
                />
                <CardTitle className="mb-1 text-xl font-semibold">
                  {recipe.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {recipe.instructions.length > 184
                    ? `${recipe.instructions.substring(0, 184)} ...`
                    : recipe.instructions}
                </CardDescription>
              </CardContent>
            </div>
            <CardFooter className="flex flex-wrap justify-end">
              <div className="space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/view-recipe/${recipe._id}`)}
                >
                  <EyeIcon className="size-4 text-primary" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/update-recipe/${recipe._id}`)}
                >
                  <Pencil className="size-4 text-primary" />
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
                            axiosPublic.delete(`/recipes/${recipe._id}`),
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
          </Card>
        ))}
      </div>
    </>
  );
};

export default MyRecipes;
