import React from "react";
import PropTypes from "prop-types";
import { Navbar } from "react-bootstrap";
import OpseraHeaderIcon from "components/header/OpseraHeaderIcon";
import OpseraHeaderAccountAuthenticationComponent from "components/header/OpseraHeaderAccountAuthenticationComponent";
import useComponentStateReference from "hooks/useComponentStateReference";
import LandingHeaderNavigationBar from "components/landing/v2/LandingHeaderNavigationBar";

export default function OpseraHeaderBar({ hideAuthComponents }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  return (
    <Navbar
      className={"py-2 px-3 w-100"}
      style={{
        backgroundColor: themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE,
      }}
    >
      <div className={"w-100 d-flex justify-content-between"}>
        <OpseraHeaderIcon/>
        <LandingHeaderNavigationBar/>
        <OpseraHeaderAccountAuthenticationComponent
          hideAuthComponents={hideAuthComponents}
        />
      </div>
    </Navbar>
  );
}

OpseraHeaderBar.propTypes = {
  hideAuthComponents: PropTypes.bool,
  userData: PropTypes.object,
};
