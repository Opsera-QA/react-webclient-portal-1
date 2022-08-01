import React from "react";
import PropTypes from "prop-types";
import OpseraHeaderIcon from "temp-library-components/icon/opsera/OpseraHeaderIcon";

function FreeTrialSignupHeader({ className }) {
  return (
    <div className={className}>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <OpseraHeaderIcon />
      </div>
      <div
        style={{
          fontSize: "32px",
          fontWeight: 700,
          fontFamily: "Inter",
          textAlign: "center",
        }}
      >
        Welcome to Opsera
      </div>
      <div
        style={{
          fontSize: "16px",
          fontWeight: 400,
          fontFamily: "Inter",
          textAlign: "center",
        }}
      >
        Free Trial Experience
      </div>
    </div>
  );
}

FreeTrialSignupHeader.propTypes = {
  className: PropTypes.string,
};

export default FreeTrialSignupHeader;
