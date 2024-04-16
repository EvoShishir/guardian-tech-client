import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { BACKEND } from "../../constants";

const Cases = () => {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    const { data } = await axios.get(`${BACKEND}/areas/all`);
    // Sort areas based on cases
    const sortedAreas = data.areas.sort((a, b) => b.cases - a.cases);
    setAreas(sortedAreas);
  };

  const handleClick = (area) => {
    navigate(`${area.name}`);
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
              {areas?.map((area, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleClick(area);
                      }}
                    >
                      {area.name}
                    </Button>
                  </TableCell>
                  <TableCell>{area.cases}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
};

export default Cases;
