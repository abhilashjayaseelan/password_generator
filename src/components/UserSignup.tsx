import { Card, Input, Button, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { registerUser } from "../api/user";
import { useNavigate } from "react-router-dom";

export function UserRegister() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    const result = await registerUser({ userName, password });
    console.log(result)
    if (result.message === "user created successfully") {
      toast.success("User created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error("try another id");
    }
  };

  return (
    <div className="flex justify-center items-center p-32">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={handleSignUp}>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a
              href="#"
              onClick={() => navigate("/login")}
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
