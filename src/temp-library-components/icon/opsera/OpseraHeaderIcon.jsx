import React from "react";
import PropTypes from "prop-types";

// TODO: Rename to something better
function OpseraHeaderIcon({ className }) {
  return (
    <div className={className}>
      <img
        alt={"Opsera Inc. Logo"}
        src={"/img/logos/opsera-logo-temp.png"}
        width={"148"}
        height={"78"}
      />
    </div>
  );
}

OpseraHeaderIcon.propTypes = {
  className: PropTypes.string,
};

export default OpseraHeaderIcon;
