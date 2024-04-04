import { Separator } from "@radix-ui/react-dropdown-menu";

const ProfileSection = ({ title, subtitle = "", children }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
};

export default ProfileSection;
