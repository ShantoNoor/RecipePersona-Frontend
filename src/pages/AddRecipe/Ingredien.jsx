import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utils/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import ingredients from "./data/ingredients.json";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const Ingredien = ({ form, idx }) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={`ingredients.${idx}.name`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between capitalize",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? ingredients.find(
                        (ingredient) => ingredient === field.value
                      )
                    : "Select a ingredient"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 z-10">
              <Command>
                <CommandInput placeholder="Search ingredient..." />
                <CommandEmpty>No ingredient found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-72 w-full rounded-md border">
                    {ingredients.map((ingredient) => (
                      <CommandItem
                        value={ingredient}
                        key={ingredient}
                        onSelect={() => {
                          form.setValue(`ingredients.${idx}.name`, ingredient);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            ingredient === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {ingredient}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Ingredien;
