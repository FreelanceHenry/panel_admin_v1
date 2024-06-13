import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  OptionsTable,
  TableHeaderType,
} from "../orders/types";

type Props<T extends Record<string, any>> = {
  TableHeaders: TableHeaderType[];
  data: T[];
  options?: OptionsTable;
};

const TableGeneric = <T extends Record<string, any>>({
  TableHeaders,
  data,
  options,
}: Props<T>) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <Table className="w-full h-full">
      <TableHeader className="bg-[#5d60ef] border-t-2 text-white w-full">
        <TableRow className="w-full justify-between">
          {TableHeaders.map((head, i) => (
            <TableHead key={i} className="w-54 border-r-[2px] rounded-lg">
              {head.header}
            </TableHead>
          ))}
          {options?.action?.length && <TableHead>Opciones</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {data.length > 0 ? (
          data.map((item, index) => (
            <React.Fragment key={index}>
              <TableRow className="w-full h-full">
                {Object.values(item).map((value, i) => (
                  <TableCell
                    key={i}
                    className="border-r-[3px] border-b-[3px] border-white"
                    onClick={() => (i === 0 ? handleRowClick(index) : null)}
                  >
                    {value}
                  </TableCell>
                ))}
                {options?.action &&
                  options?.action.length &&
                  options?.action.map((ac, i) => (
                    <TableCell
                      key={i}
                      className=" flex items-center border-r-[1px] border-b-[3px] border-white"
                    >
                      {ac.componentAction()}
                    </TableCell>
                  ))}
              </TableRow>
              {options?.Expansive?.isExpansive && expandedRow === index && (
                <TableRow>
                  <TableCell
                    colSpan={
                      TableHeaders.length + (options?.action?.length ? 1 : 0)
                    }
                    className="bg-white w-full"
                  >
                    {options.Expansive.componentToogleView(item)}
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={TableHeaders.length}>
              <p>No se encontraron datos</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableGeneric;
