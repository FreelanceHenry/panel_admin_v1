import React, { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getAllProduct, getProducts } from "../Slices/Products/ProductSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import useModal from "@/hooks/useModal";
import imageDefault from '@/assets/images.jpg'
import { DataModal } from "@/components/modals/types";

interface Props {}

const Products: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);

  const { openModal } = useModal();
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const data: DataModal[] = [
    {
      id: 1,
      title: "Agregar Producto",
      inputs: [
        {
          name: "nombre",
          type: "text",
          placeholder: "Nombre del producto",
          validate: true,
        },
        {
          name: "precio",
          type: "number",
          placeholder: "Precio",
          validate: true,
        },
        {
          name: "descripcion",
          type: "text",
          placeholder: "Descripción",
          validate: true,
        },
        {
          name: "Inventario",
          type: "number",
          placeholder: "Inventario",
          validate: true,
        },
        {
          name: "Imagen",
          type: "file",
          placeholder: "Imagen",
          validate: true,
        },
      ],
      footer: "Guardar",
    },
  ];

  return (
    <div className="h-full w-full p-5 flex flex-col relative">
      <div>
        <Button
          variant="colorPrimary"
          onClick={() => openModal && openModal(data, '/api/v1/products/add', 'product')}
        >
          <PlusIcon className="h-6 w-6 mr-2" />
          Agregar producto
        </Button>
      </div>
      <div>
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
              <TableRow key={idx} className="w-20 h-20">
                <TableCell className="font-medium">
                  {product?.products_name}
                </TableCell>
                <TableCell>
                  <img
                    src={product?.products_img1 ?? imageDefault}
                    alt=""
                    width={100}
                    height={60}
                    className="object-cover"
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={product?.products_img1 ?? imageDefault }
                    alt=""
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={product?.products_img1 ?? imageDefault}
                    alt=""
                    width={100}
                    height={100}
                    className="object-cover"
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
