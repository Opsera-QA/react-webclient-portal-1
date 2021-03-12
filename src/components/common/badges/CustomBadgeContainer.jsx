import React  from "react";
import PropTypes from "prop-types";

function CustomBadgeContainer({children}) {
  return (
    <div className="custom-badge-field">
      {children}
    </div>
  );
}

CustomBadgeContainer.propTypes = {
  children: PropTypes.any
};

export default React.memo(CustomBadgeContainer);