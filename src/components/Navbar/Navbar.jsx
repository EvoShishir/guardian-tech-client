import React from "react";
import { Button, Dropdown, Space } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const items = [
    {
      label: <a href="/login">Login</a>,
      key: "0",
    },
    {
      label: <a href="/sign-up">Sign Up</a>,
      key: "1",
    },
    {
      label: <a href="/contacts">Contacts</a>,
      key: "2",
    },
    {
      label: <a href="/logout">Logout</a>,
      key: "3",
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
        width: "1000px",
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
