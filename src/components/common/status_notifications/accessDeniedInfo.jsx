import React from "react";
import PropTypes from "prop-types";


function AccessDeniedDialog (roleData) {
  return (
    <div className="mt-1 mb-3">
      <div className="error-text">
        Access Denied!  You do not have permissions to access this resource.
      </div>
    </div>
  );
}

AccessDeniedDialog.propTypes = {
  roleData: PropTypes.object
};
export default AccessDeniedDialog;