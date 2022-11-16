import React from "react";
import PropTypes from "prop-types";

function SiteRolePermissionsField({ model }) {
  const getGroupPermissionText = () => {
    switch (model?.getData("externalSyncGroup")) {
      case "Admin":
        return (`
        Administrators have full system access, allowing them to perform all actions on Toolchain, Pipelines, and Tool Registry. 
        In Pipelines, an Administrator can perform all actions on the pipeline just as if they were the Owner of the Pipeline. 
        Owner of a Pipeline equally is the same as an Administrator of that Pipeline.
        `);
      case "Power User":
        return (`
          Power Users have limited access in the Pipelines. 
          These users can view all Pipelines, they can change settings on a Pipeline step and run the Pipeline. 
          They cannot change the flow or design of pipeline. 
          They can duplicate a Pipeline and view the Templates as well.
        `);
      case "Everyone":
        return (`
        Users have limited access in the Pipelines. 
        They can only run the Pipeline and view the log activity. 
        They cannot make any changes. 
        `);
    }
  };

  if (model == null) {
    return <></>;
  }

  return (
    <div className="m-3 p-3 text-muted italic pipeline-task-message">
      {getGroupPermissionText()}
    </div>
  );
}

SiteRolePermissionsField.propTypes = {
  model: PropTypes.object,
};

export default SiteRolePermissionsField;