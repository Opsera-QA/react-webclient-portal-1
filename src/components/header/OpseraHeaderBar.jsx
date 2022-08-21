import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Navbar } from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import OpseraHeaderIcon from "components/header/OpseraHeaderIcon";
import OpseraHeaderAccountAuthenticationComponent from "components/header/OpseraHeaderAccountAuthenticationComponent";

export default function OpseraHeaderBar({ hideAuthComponents }) {
  const {
    headerNavigationBar,
  } = useContext(AuthContext);

  return (
    <Navbar>
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
