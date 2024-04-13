import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@material-ui/core";

const AreaSelector = () => {
  const area = ["---", "Mohammadpur", "Lalbagh", "Dhanmondi"];

  const [value, setValue] = React.useState(area[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);

  console.log(value);
  //   console.log(inputValue);

  const subarea = ["tajmahal road", "nurjahan road", "town hall"];

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Where are you located?</h2>
      <div>
        <Autocomplete
          value={value}
          onChange={(e, newValue) => {
            e.preventDefault();
            setValue(newValue);
            setDisabled(false);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={area}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select an area" />
          )}
        />
        <br />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          disabled={disabled}
          options={subarea}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Sub area" />}
        />
        <br />
        <Button fullWidth variant="contained" color="primary">
          I feel unsafe
        </Button>
      </div>
    </section>
  );
};

export default AreaSelector;
