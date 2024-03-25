import { isLogin } from "../Slices/Auth/AuthSlice";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAppDispatch } from "../hooks";
import { EyeIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";

type Props = {};

const Login = () => {

  const dispatch = useAppDispatch()
  const [viewPassword, setViewPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

      dispatch(isLogin(userData.username, userData.password));
  
  };

  return (
    <div className="flex items-center justify-center   h-full w-full">
      <div className=" h-full w-full ">
        <div className="relative w-full h-full">
          <img
            src="https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2284501_1280.jpg"
            alt=""
            className="object-cover w-full h-full shadow-transparent  "
          />
          <span className="bg-gradient-to-r from-black to-blue-500/30  absolute w-full h-full top-0 "></span>
        </div>
      </div>
      <div className=" p-5 h-full w-full flex  flex-col items-center justify-center  bg-gradient-to-r from-white to-[#5d60ef]/60 ">
        <div className="p-3 w-[600px] h-[300px] ">
          <form
            action="submit"
            className="flex gap-4 flex-col items-center justify-center "
          >
            <div className="flex w-full flex-col gap-3 items-center">
              <Label id="UserName" className="  w-[300px] items-end">
                Usuario
              </Label>
              <Input
                id="UserName"
                type="text"
                name="username"
                onChange={handleChange}
                autoComplete='current-username'
                className="rounded-xl w-[300px]"
              />
            </div>
            <div className="flex w-full flex-col gap-3 items-center">
              <Label id="Password" className="w-[300px]">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="Password"
                  name="password"
                  onChange={handleChange}
                  type={viewPassword ? "text" : "password"}
                  className=" rounded-xl w-[300px] "
                  autoComplete='current-password'
                />
                <EyeIcon
                  onClick={() => setViewPassword(!viewPassword)}
                  className="w-5 h-5 absolute top-[10px] cursor-pointer  right-3"
                />
              </div>
            </div>
            <div className="flex">
              <div className="">
                <Button variant={"colorPrimary"} onClick={handleClick}>
                  Ingresar
                </Button>
              </div>
              <div className="">
                <Button>Registrarse</Button>
              </div>
            </div>
          </form>
          <div className="flex flex-col mt-8 items-center gap-3">
            <hr className=" border-black w-8 h-1" />
            <img
              className="w-7 h-7"
              src="https://static.vecteezy.com/system/resources/thumbnails/012/871/371/small/google-search-icon-google-product-illustration-free-png.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
