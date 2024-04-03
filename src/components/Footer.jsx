import { UtensilsCrossed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="mb-4">
      <Separator orientation="horizontal" className="mb-4" />
      <div className="mx-auto items-center justify-between md:flex">
        <div
          className="inline-flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <UtensilsCrossed />
          <span className="ml-4 text-lg font-bold">Recipe Persona</span>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm font-medium text-foreground">
            © 2024 Recipe Persona. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
