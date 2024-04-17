import { Separator } from "@/components/ui/separator";

const ProfileSection = ({ title, subtitle = "" }) => {
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
        <Separator />
      </div>
    </>
  );
};

export default ProfileSection;
