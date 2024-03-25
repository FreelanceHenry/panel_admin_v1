import React, { MouseEvent, useEffect, useId, useState } from "react";
import { Input } from "./ui/input";
import image from "../assets/logo-4.png";
import {
  HomeIcon,
  ClipboardDocumentIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  ArchiveBoxIcon,
  FolderPlusIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  currentPageActive,
  postCurrentPage,
} from "../Slices/SidebarMenu/SideBarSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { session, Logout } from "../Slices/Auth/AuthSlice";

type Props = {
  children: React.ReactNode;
};

interface ButtonActions {
  id: string;
  name: string;
  href?: string;
  action?: () => void;
  icon?: JSX.Element;
}

const Dashboard: React.FC<Props> = ({ children }) => {
  const [page, setPage] = useState<string>("/");
  const user = useAppSelector(session);
  const navigate = useNavigate();
  const pageSelected = useAppSelector(currentPageActive);
  const dispatch = useAppDispatch();

  const [ButtonPage, setButtonPage] = useState<ButtonActions[]>([
    {
      id: useId(),
      name: "Inicio",
      href: "/",
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      id: useId(),
      name: "Ordenes",
      href: "/Ordenes",
      icon: <FolderPlusIcon className="h-6 w-6" />,
    },
    {
      id: useId(),
      name: "Productos",
      href: "/Productos",
      icon: <ArchiveBoxIcon className="h-6 w-6" />,
    },
    {
      id: useId(),
      name: "Usuarios",
      href: "/Usuarios",
      icon: <UsersIcon className="h-6 w-6" />,
    },
    {
      id: useId(),
      name: "Inventario",
      href: "/Inventario",
      icon: <ClipboardDocumentIcon className="h-6 w-6" />,
    },
    {
      id: useId(),
      name: "Cerrar Session",
      action: () => {
        dispatch(Logout());
        navigate("/");
      },
      icon: <ArrowUturnLeftIcon className="h-6 w-6" />,
    },
  ]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setPage(e.target.name);
  };
  useEffect(() => {
    dispatch(postCurrentPage(page));
    page === "/" && navigate("/");
  }, [page, pageSelected]);

  return (
    <div className="flex  w-full h-[100vh] p-3  flex-col items-center ">
      {/* CONTAINER */}

      <div className="flex  w-full h-full ">
        {/* BOTTOM CONTAINER */}
        {/* SIDEBAR */}
        <div className="flex  flex-col w-[15rem]  h-full   justify-between select-none">
          <div className=" flex gap-3 ml-4 items-center">
            <img src={image} alt="" width={50} height={50} />
            <div className="text-1xl font-extrabold">OBPS</div>
          </div>
          <div className="flex flex-2 h-full ">
            <ul className=" flex flex-col items-center justify-start gap-8 mt-16  p-3  ">
              {ButtonPage?.map((b) => (
                <li
                  key={b?.id}
                  className={`${
                    page === b.href
                      ? "bg-[#5d60ef] text-white rounded-[8px] transition-all ease-in-out "
                      : "text-gray-500"
                  } w-full h-10   justify-start`}
                >
                  <Link to={`${b?.href}`}>
                    <Button
                      className="flex gap-4"
                      onClick={!b.action ? handleClick : b.action}
                      name={b?.href}
                    >
                      {b.icon}
                      {b?.name}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className=" h-80 flex   items-center justify-center ">
            <div className=" relative h-44 w-44 flex items-center justify-center flex-col text-black gap-5 bg-gradient-to-br from-indigo-600 rounded-[10px]">
              <h4 className="text-sm">Muy Pronto Version PRO</h4>
            </div>
          </div>
        </div>
        <div className="flex  w-full h-full flex-col">
          {/* TOP CONTAINER*/}
          <div className="flex items-center  h-[3rem] justify-between p-4 m-2">
            <div className="flex rounded-2xl  p-5 text-black">
              {/* LOGOTIPO */}
              <h1 className="  ">
                Bienvenido,{" "}
                <span className="font-bold text-1xl">{user?.username}</span>{" "}
              </h1>
            </div>
            <div className="w-[400px] h-10 ">
              {/* SEARCH BAR */}

              <div className="flex h-full w-full rounded-[8px] p-2 bg-gray-100 items-center justify-between ">
                <MagnifyingGlassIcon className="h-6 w-6  font-bold  text-[#5d60ef] cursor-pointer" />
                <Input type="text" className=" border-none " />
              </div>
            </div>
            <div className="">
              {/* OPTIONS */}
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className=" h-full w-full flex items-center justify-center overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
