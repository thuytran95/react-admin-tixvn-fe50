import {
 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Pagination } from "@material-ui/lab";
import React from "react";

export default function StickyHeadTable() {

  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="">Mã Lich Chiếu</TableCell>
              <TableCell className="" align="left">
                Hệ thông rạp
              </TableCell>
              <TableCell className="" align="left">
                Cụm Rạp
              </TableCell>
              <TableCell className="" align="left">
                Ngày giờ chiếu
              </TableCell>

              <TableCell className="" align="left">
                Thời lượng phim
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                Action
              </TableCell>
              <TableCell className="" align="left">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={10} color="primary"   />
    </div>
  );
}
