import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { authenticateUser } from "../api/user";
import { useNavigate } from "react-router-dom";

export function UserLogin() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await authenticateUser({ userName, password });
    if (result?.message === "success") {
      toast.success("Login successful");
      localStorage.setItem("userName", result?.user?.userName);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error('Email or password error')
    }
  };

  return (
    <div className="flex justify-center items-center p-32">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your user name and password
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

          <Button className="mt-6" fullWidth onClick={handleLogin}>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              onClick={()=> navigate('/register')}
            >
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
