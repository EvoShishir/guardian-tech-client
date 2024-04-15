import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import image1 from "/mohammadpur.jpg";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

const SingleArea = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "1000px",
          margin: "auto",
          gap: "10px",
        }}
      >
        <div>
          <img
            style={{
              maxWidth: "700px",
            }}
            src={image1}
            alt=""
          />
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Street</TableCell>
                <TableCell>Number of Cases</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Tajmahal Road</TableCell>
                <TableCell>10</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nurjahan Road</TableCell>
                <TableCell>15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ring Road</TableCell>
                <TableCell>8</TableCell>
              </TableRow>
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </TableContainer>
        <h2>Reported cases in Mohammadpur: 69</h2>
      </div>
    </>
  );
};

export default SingleArea;
