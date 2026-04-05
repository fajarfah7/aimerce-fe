import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function ProductPage() {
  return (
    <>
      <div className="flex items-baseline">
        <div>
          <h2 className="text-xl font-semibold mb-6">Product List</h2>
        </div>
        <div>
          <Link href={"/account/product/add"}>
            <Button>Add</Button>
          </Link>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>LTP-LN-15AKP10</TableCell>
            <TableCell>Lenovo Legion 5</TableCell>
            <TableCell>Rp. 30.000.000</TableCell>
            <TableCell>10</TableCell>
            <TableCell>ACTIVE</TableCell>
            <TableCell>Detail</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>LTP-LN-15IAX9E</TableCell>
            <TableCell>Lenovo LOQ Essential</TableCell>
            <TableCell>Rp. 12.700.000</TableCell>
            <TableCell>10</TableCell>
            <TableCell>ACTIVE</TableCell>
            <TableCell>Detail</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>LTP-HP-V15</TableCell>
            <TableCell>HP Victus 15</TableCell>
            <TableCell>Rp. 12.300.000</TableCell>
            <TableCell>10</TableCell>
            <TableCell>ACTIVE</TableCell>
            <TableCell>Detail</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>RAM-KN-RAMKN8DDR4-8</TableCell>
            <TableCell>RAM Kingston DDR4 8GB</TableCell>
            <TableCell>Rp. 900.000</TableCell>
            <TableCell>10</TableCell>
            <TableCell>ACTIVE</TableCell>
            <TableCell>Detail</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>RAM-KN-RAMKN8DDR4-16</TableCell>
            <TableCell>RAM Kingston DDR4 16GB</TableCell>
            <TableCell>Rp. 2.000.000</TableCell>
            <TableCell>10</TableCell>
            <TableCell>ACTIVE</TableCell>
            <TableCell>Detail</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
