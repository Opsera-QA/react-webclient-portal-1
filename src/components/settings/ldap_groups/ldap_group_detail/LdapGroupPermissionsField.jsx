import React from "react";
import PropTypes from "prop-types";

function LdapGroupPermissionsField({ dataObject }) {

  const getGroupPermissionText = () => {
    switch (dataObject.getData("externalSyncGroup")) {
      case "Admin":
        return (`
        Administrators have full system access, allowing them to perform all actions on Toolchain, Pipelines, Tool Registry, and Tool Registry. 
        In Pipelines, an Administrator can perform all actions on the pipeline just as if they were an Owner. 
        Owner of pipelines equally is the same as an administrator of that pipeline.
        `);
      case "Power User":
        return (`
          Power Users have limited access in the Pipelines today. 
          These users can view all pipelines, they can change settings on a pipeline step and run the pipeline. 
          They can duplicate a pipeline and view the templates.
        `);
      case "Everyone":
        return (`
        Users have limited access in the Pipelines today. 
        They can only run the pipeline and view the log activity. 
        They cannot make any changes. 
        This should also applied to Tool Registry but that has not been implemented yet.
        `);
    }
  };

  if (dataObject == null || dataObject.getData("groupType") !== "Role") {
    return <></>;
  }

  return (
    <div className="m-3 p-3 text-muted italic pipeline-task-message">
      {getGroupPermissionText()}
    </div>
  );
}

LdapGroupPermissionsField.propTypes = {
  dataObject: PropTypes.object,
};



export default LdapGroupPermissionsField;