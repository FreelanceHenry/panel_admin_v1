import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getAllProduct, getProducts } from "../Slices/Products/ProductSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

type Props = {};

export interface Products {
  products_id: Number;
  products_name: string;
  products_description: string;
  products_tiltle: string;
  products_total: number;
  products_img1: string;
  products_img2: string;
  products_img3: string;
  products_img4: string;
  categories_id: number;
  products_condiciones: string;
  color_id: number;
  stock: number;
  product_iva: number;
}

export interface User {
  userId: number;
  username: string;
  email: string;
  phone?: string;
  password: string;
  dni: string;
  rif: string;
  name?: string;
  address?: string;
  userTypeId: number;
}

const Products: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  return (
    <div className=" h-full w-full p-5  flex flex-col relative ">
      
      <div className="">
        {/* Render Actions Buttons */}
        <Button variant={"colorPrimary"}>
          <PlusIcon className="h-6 w-6 mr-2" />
          Agergar producto
        </Button>
      </div>
      <div className="">
        {/* Container Tablew */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Imagen 2</TableHead>
              <TableHead>Imagen 3</TableHead>
              <TableHead>IVA</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product, idx) => (
              <TableRow key={idx} className=" w-20 h-20">
                <TableCell className="font-medium">
                  {product?.products_name}
                </TableCell>
                <TableCell>
                  <img
                    src={product?.products_img1}
                    alt=""
                    width={100}
                    height={60}
                    className=" object-cover"
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={product?.products_img1}
                    alt=""
                    width={100}
                    height={100}
                    className=" object-cover"
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={product?.products_img1}
                    alt=""
                    width={100}
                    height={100}
                    className=" object-cover"
                  />
                </TableCell>
                <TableCell>{product?.product_iva ?? 0}</TableCell>
                <TableCell>{product?.stock}</TableCell>
                <TableCell>{product?.products_total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Products;
