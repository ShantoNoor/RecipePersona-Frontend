import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/utils";
import { PencilIcon } from "lucide-react";
import React, { useState } from "react";

export default function AvatarUpload({
  value,
  onChange,
  icon,
  rounded = "true",
}) {
  const [photo, setPhoto] = useState(null);
  const inputRef = React.useRef(null);

  const handleChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onChange?.(file);
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative size-52 lg:size-72">
      <Avatar className={cn("w-full h-full", !rounded && "rounded-none")}>
        <AvatarImage src={!photo ? value : photo} className="object-cover" />
        <AvatarFallback className={cn("bg-accent", !rounded && "rounded-none")}>
          {icon}
        </AvatarFallback>
      </Avatar>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full p-1 bg-accent-foreground/90 hover:bg-accent-foreground absolute bottom-0 right-0"
        onClick={(e) => {
          e.preventDefault();
          inputRef.current?.click();
        }}
      >
        <PencilIcon className="w-4 h-4 text-accent" />
      </Button>
      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="image/*"
      />
    </div>
  );
}
