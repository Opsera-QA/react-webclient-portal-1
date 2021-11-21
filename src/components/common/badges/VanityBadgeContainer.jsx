import React  from "react";
import PropTypes from "prop-types";

function VanityBadgeContainer({children}) {
  return (
    <div className="item-field">
      {children}
    </div>
  );
}

VanityBadgeContainer.propTypes = {
  children: PropTypes.any
};

export default React.memo(VanityBadgeContainer);