import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

const Home = () => {
  const { signOut } = useAuth();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          toast.success("Event has been created");
          toast.success("Event has been created2");
        }}
      >
        Show Toast
      </Button>

      <Button
        onClick={async () => {
          await signOut();
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default Home;
