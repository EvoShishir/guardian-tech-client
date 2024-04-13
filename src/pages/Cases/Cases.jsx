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

const Cases = () => {
  return (
    <div>
      <Navbar />
      <section style={{ textAlign: "center" }}>
        <h1>Cases in different areas</h1>
        <TableContainer
          component={Paper}
          style={{ margin: "auto", maxWidth: "600px" }}
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
                  <Button onClick={() => console.log("Mohammadpur clicked")}>
                    Mohammadpur
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => console.log("Cases for Mohammadpur clicked")}
                  >
                    69
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Button
                    onClick={() => console.log("Some Other Area clicked")}
                  >
                    Some Other Area
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      console.log("Cases for Some Other Area clicked")
                    }
                  >
                    45
                  </Button>
                </TableCell>
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
