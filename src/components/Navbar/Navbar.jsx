import React from "react";
import { Button, Dropdown, Space } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Navbar = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("accessToken");
        localStorage.removeItem("uid");
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };

  const items = [
    {
      label: <a href="/contacts">Contacts</a>,
      key: "0",
    },
    {
      label: <a onClick={handleLogout}>Logout</a>,
      key: "1",
      danger: true,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        margin: "auto",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1000px",
      }}
    >
      <a href="/" style={{ textDecoration: "none", color: "black" }}>
        <h1>
          Guardian<span style={{ color: "darkorange" }}>Tech.</span>
        </h1>
      </a>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <a href="/cases" style={{ textDecoration: "none" }}>
          <b>Reported Cases</b>
        </a>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <Button>
            <a
              onClick={(e) => e.preventDefault()}
              style={{ cursor: "pointer" }}
            >
              <AccountCircleIcon fontSize="small" />
            </a>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
