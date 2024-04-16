import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Card, CardContent, Grid } from "@material-ui/core";
import addNotification from "react-push-notification";
import axios from "axios";
import { BACKEND } from "../../constants";

const AreaSelector = () => {
  const [elakas, setElakas] = useState([]);
  const [rastas, setRastas] = useState([]);

  const timerValue = 10;
  const emergencyTimerValue = timerValue + 10;

  const [area, setArea] = useState(null);
  const [subArea, setSubArea] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [timer, setTimer] = useState(timerValue);
  const [emergencyTimer, setEmergencyTimer] = useState(emergencyTimerValue);
  const [regularInterval, setRegularInterval] = useState(null);
  const [emergencyInterval, setEmergencyInterval] = useState(null);
  const [displayTimer, setDisplayTimer] = useState("none");
  const [displayEmergencyTimer, setDisplayEmergencyTimer] = useState("none");

  useEffect(() => {
    fetchAreas();
    fetchSubAreas();
  }, [area]);

  const fetchAreas = async () => {
    const { data } = await axios.get(`${BACKEND}/areas/all`);
    setElakas(data.areaArr);
  };

  const fetchSubAreas = async () => {
    if (area) {
      const { data } = await axios.get(`${BACKEND}/areas/${area.label}`);
      setRastas(data.subAreaArr);
    }
  };

  const reportUnsafe = async () => {
    await axios.put(`${BACKEND}/areas/${area.id}/report-case`);
    await axios.put(`${BACKEND}/areas/subarea/${subArea.id}/report-case`);
  };

  const sendNotification = () => {
    addNotification({
      title: "Are you okay?",
      message:
        "Please respond within 60 seconds or emergency SOS will be initiated",
      duration: 60000,
      native: true, // when using native, your OS will handle theming.
    });
  };

  const dispatchHelp = async () => {
    try {
      const uid = localStorage.getItem("uid");
      const response = await axios.post(`${BACKEND}/users/help/${uid}`, {
        area: area.label,
        subArea: subArea.label,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          sendNotification();
          clearInterval(interval);
          setDisplayEmergencyTimer("block");
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
          dispatchHelp();
          return prevTimer;
        }
      });
    }, 1000);
    setEmergencyInterval(emergencyInterval); // Save interval ID
  };

  const handleButtonClick = () => {
    setTimer(timerValue);
    setEmergencyTimer(emergencyTimerValue);
    setDisplayEmergencyTimer("none");
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Autocomplete
              onChange={(e, newValue) => {
                e.preventDefault();
                setArea(newValue);
              }}
              id="controllable-states-demo"
              disabled={disabled}
              options={elakas}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select an area" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              disablePortal
              onChange={(e, newValue) => {
                e.preventDefault();
                setSubArea(newValue);
                setBtnDisabled(false);
              }}
              id="combo-box-demo"
              disabled={disabled}
              options={rastas}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Sub area" />
              )}
            />
          </Grid>
        </Grid>
        <br />
        <Button
          onClick={() => {
            reportUnsafe();
            startCountdown();
            startEmergencyCountdown();
            setDisplayTimer("block");
            setBtnDisabled(true);
            setDisabled(true);
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
          <Card
            style={{
              display: `${displayTimer}`,
            }}
          >
            <CardContent>
              <h2>You will be notified in {timer} second(s)</h2>
              <h2 style={{ display: `${displayEmergencyTimer}` }}>
                Initiating emergency SOS in {emergencyTimer} second(s)
              </h2>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  I am safe now
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
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
