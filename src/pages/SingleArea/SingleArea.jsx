import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { BACKEND } from "../../constants";
import { useParams } from "react-router-dom";

const SingleArea = () => {
  const [cases, setCases] = useState([]);
  const [areaName, setAreaName] = useState();
  const [areaCases, setAreaCases] = useState();
  const [imageURL, setImageURL] = useState();

  const { area } = useParams();

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    const { data } = await axios.get(`${BACKEND}/areas/${area}`);
    // Sort cases based on the number of cases
    const sortedCases = data.subAreas.sort((a, b) => b.cases - a.cases);
    setCases(sortedCases);
    setImageURL(sortedCases[0].area.imgLink);
    setAreaName(capitalize(data.subAreas[0].area.name));
    setAreaCases(sortedCases[0].area.cases);
  };

  // Function to capitalize the first letter of a string
  const capitalize = (str) => {
    // Check if the string is defined
    if (str && typeof str === "string" && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "";
  };

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
            src={imageURL}
            alt=""
          />
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Street</TableCell>
                <TableCell>Cases</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cases?.map((singleCase, index) => (
                <TableRow key={index}>
                  <TableCell>{capitalize(singleCase.name)}</TableCell>
                  <TableCell>{singleCase.cases}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <h2>
          Reported cases in {capitalize(areaName)}: {areaCases}
        </h2>
      </div>
    </>
  );
};

export default SingleArea;
