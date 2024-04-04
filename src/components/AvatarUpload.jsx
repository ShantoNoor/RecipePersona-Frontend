import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon, User2Icon } from "lucide-react";
import React, { useState } from "react";

export default function AvatarUpload({ value, onChange }) {
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
    <div className="relative w-40 h-40">
      <Avatar className="w-full h-full">
        <AvatarImage src={!photo ? value : photo} className="object-cover" />
        <AvatarFallback className="bg-accent">
          <User2Icon className="w-16 h-16" />
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
