import React from "react";
import PropTypes from "prop-types";
import { Navbar } from "react-bootstrap";

export default function OpseraHeaderIcon() {
  const getOpseraIcon = () => {
    // put new icon?
    // return (
    //   <img
    //     alt={"Opsera Inc."}
    //     src={"/img/logos/opsera-logo-temp.png"}
    //     width={"148"}
    //     height={"78"}
    //     className={"d-inline-block align-top mx-3"}
    //   />
    // );

    return (
      <img alt="Opsera Inc."
           src="/img/logos/opsera_logo_white_horizontal_240_42.png"
           width="240"
           height="42"
           className="d-inline-block align-top ml-3"
      />
    );
  };

  return (
    <Navbar.Brand href="/">
      {getOpseraIcon()}
    </Navbar.Brand>
  );
}

OpseraHeaderIcon.propTypes = {};
