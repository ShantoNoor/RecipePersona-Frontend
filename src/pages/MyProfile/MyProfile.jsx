import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import General from "./General";
import { useState } from "react";
import Preferences from "./Preferences";

export default function MyProfile() {
  const [general, setGeneral] = useState(true);
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profie</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set preferences.
        </p>
      </div>
      <Separator />
      <div className="mx-auto grid w-full  items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <div className="grid gap-4 text-sm text-muted-foreground">
          <Link
            className={general ? "font-semibold text-primary" : ""}
            onClick={() => setGeneral(true)}
          >
            General
          </Link>
          <Link
            className={!general ? "font-semibold text-primary" : ""}
            onClick={() => setGeneral(false)}
          >
            Preferences
          </Link>
        </div>
        <div className="grid gap-6">
          {general ? <General /> : <Preferences />}
        </div>
      </div>
    </div>
  );
}
