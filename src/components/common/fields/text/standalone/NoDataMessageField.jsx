import React from "react";
import PropTypes from "prop-types";

function NoDataMessageField({message}) {
  return (
    <div className={"h-100 w-100"}>
      <div className="w-100 info-text text-center p-5">
        <span>{message}</span>
      </div>
    </div>
  );
}

NoDataMessageField.propTypes = {
  message: PropTypes.string,
};

export default NoDataMessageField;