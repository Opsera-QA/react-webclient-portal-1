import React from "react";
import PropTypes from "prop-types";

export default function FreeTrialSignupHeader({ className }) {
  return (
    <div className={"darkBackgroundText pt-2 pb-4"}>
      <h2 style={{ textAlign: "center" }}>{`Let's get started!`}</h2>
    </div>
  );
}

FreeTrialSignupHeader.propTypes = {
  className: PropTypes.string,
};