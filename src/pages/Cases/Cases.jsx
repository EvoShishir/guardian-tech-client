import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Cases = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`1`);
  };

  return (
    <div>
      <Navbar />
      <section style={{ textAlign: "center" }}>
        <h1>Cases in different areas</h1>
        <TableContainer
          component={Paper}
          style={{
            margin: "auto",
            maxWidth: "600px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Area</TableCell>
                <TableCell>Cases</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Button onClick={handleClick}>Mohammadpur</Button>
                </TableCell>
                <TableCell>69</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Button onClick={handleClick}>Some Other Area</Button>
                </TableCell>
                <TableCell>45</TableCell>
              </TableRow>
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
};

export default Cases;
