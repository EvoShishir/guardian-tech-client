import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Card, CardContent } from "@material-ui/core";
import addNotification from "react-push-notification";

const AreaSelector = () => {
  const elaka = ["Mohammadpur", "Lalbagh", "Dhanmondi"];
  const rasta = ["tajmahal road", "nurjahan road", "town hall"];

  const [area, setArea] = useState(null);
  const [subArea, setSubArea] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [timer, setTimer] = useState(300);
  const [emergencyTimer, setEmergencyTimer] = useState(360);
  const [regularInterval, setRegularInterval] = useState(null);
  const [emergencyInterval, setEmergencyInterval] = useState(null);

  console.log(area);
  console.log(subArea);

  const sendNotification = () => {
    addNotification({
      title: "Are you okay?",
      message:
        "Please respond within 60 seconds or emergency SOS will be initiated",
      duration: 60000,
      native: true, // when using native, your OS will handle theming.
    });
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          // sendNotification();
          clearInterval(interval);
          return prevTimer;
        }
      });
    }, 1000);
    setRegularInterval(interval); // Save interval ID
  };

  const startEmergencyCountdown = () => {
    const emergencyInterval = setInterval(() => {
      setEmergencyTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          // Handle emergency action here
          clearInterval(emergencyInterval);
          return prevTimer;
        }
      });
    }, 1000);
    setEmergencyInterval(emergencyInterval); // Save interval ID
  };

  const handleButtonClick = () => {
    setTimer(300);
    setEmergencyTimer(360);
  };

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
      <div style={{ margin: "auto" }}>
        <Autocomplete
          onChange={(e, newValue) => {
            e.preventDefault();
            setArea(newValue);
            setDisabled(false);
          }}
          id="controllable-states-demo"
          options={elaka}
          sx={{ width: 700 }}
          renderInput={(params) => (
            <TextField {...params} label="Select an area" />
          )}
        />
        <br />
        <Autocomplete
          disablePortal
          onChange={(e, newValue) => {
            e.preventDefault();
            setSubArea(newValue);
            setBtnDisabled(false);
          }}
          id="combo-box-demo"
          disabled={disabled}
          options={rasta}
          sx={{ width: 700 }}
          renderInput={(params) => <TextField {...params} label="Sub area" />}
        />
        <br />
        <Button
          onClick={() => {
            startCountdown();
            startEmergencyCountdown();
          }}
          fullWidth
          disabled={btnDisabled}
          variant="contained"
          color="secondary"
          style={{ margin: "auto" }}
        >
          I feel unsafe
        </Button>
        <div>
          <br />
          <Card>
            <CardContent>
              <h2>You will be notified in {timer} second(s)</h2>
              <h2>Initiating emergency SOS in {emergencyTimer} second(s)</h2>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={btnDisabled}
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  I am safe now
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={btnDisabled}
                  onClick={() => {
                    clearInterval(regularInterval);
                    clearInterval(emergencyInterval);
                    handleButtonClick();
                    startCountdown();
                    startEmergencyCountdown();
                  }}
                >
                  Still Feeling Unsafe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AreaSelector;
