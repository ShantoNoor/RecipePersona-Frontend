import { forwardRef, useState } from "react";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = forwardRef(({ ...props }, ref) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input ref={ref} type={show ? "text" : "password"} {...props} />
      <span
        className="absolute top-[.35rem] right-2 cursor-pointer"
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? <EyeOff /> : <Eye />}
      </span>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
