import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Navbar } from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import OpseraHeaderIcon from "components/header/OpseraHeaderIcon";
import OpseraHeaderAccountAuthenticationComponent from "components/header/OpseraHeaderAccountAuthenticationComponent";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function OpseraHeaderBar({ hideAuthComponents }) {
  const {
    headerNavigationBar,
  } = useContext(AuthContext);
  const {
    themeConstants,
  } = useComponentStateReference();

  return (
    <Navbar
      style={{
        backgroundColor: themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE,
      }}
    >
      <OpseraHeaderIcon />
      {headerNavigationBar}
      <OpseraHeaderAccountAuthenticationComponent
        hideAuthComponents={hideAuthComponents}
      />
    </Navbar>
  );
}

OpseraHeaderBar.propTypes = {
  hideAuthComponents: PropTypes.bool,
  userData: PropTypes.object,
};
