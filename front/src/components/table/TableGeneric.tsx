import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TableHeaderType } from "../orders/types";

type Props<T extends Record<string, any>> = {
  TableHeaders: TableHeaderType[];
  data: T[];
};

const TableGeneric = <T extends Record<string, any>>({
  TableHeaders,
  data,
}: Props<T>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {TableHeaders.map((head, i) => (
            <TableHead key={i} className="w-[100px]">
              {head.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <TableRow key={index}>
              {Object.values(item).map((value, i) => (
                <TableCell key={i}>{value}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableCell colSpan={TableHeaders.length}>
            <p>No se encontraron datos</p>
          </TableCell>
        )}
      </TableBody>
    </Table>
  );
};

export default TableGeneric;
