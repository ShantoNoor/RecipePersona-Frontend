import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Home = () => {
  return (
    <Button
      variant="outline"
      onClick={() => toast.success("Event has been created")}
    >
      Show Toast
    </Button>
  );
};

export default Home;
