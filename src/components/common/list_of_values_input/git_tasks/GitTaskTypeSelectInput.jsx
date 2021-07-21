import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../contexts/AuthContext";

// disabling metric selection for now
export let notificationTypes = [
  {name: "SFDC Org sync", value: "sync-sfdc-repo"},
  {name: "SFDC Branch Structuring", value: "sync-branch-structure"},
  {name: "GIT to GIT Sync", value: "sync-git-branches"}
];
// TODO: Remove the disabled items from here when done
function GitTaskTypeSelectInput({ fieldName, dataObject, setDataObject, disabled, setDataFunction, placeholderText }) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);
  const envIsProd = featureFlagHideItemInProd();

  useEffect(() => {
  if (!envIsProd) {
    notificationTypes = [
      {name: "SFDC Org sync", value: "sync-sfdc-repo"},
      {name: "SFDC Branch Structuring", value: "sync-branch-structure"},
      {name: "GIT to GIT Sync", value: "sync-git-branches"},
      { name: "Create AWS ECS Cluster", value: "ecs_cluster_creation" },
      { name: "Create AWS ECS Service", value: "ecs_service_creation" }
    ];
  }
}, []);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={notificationTypes}
      setDataFunction={setDataFunction}
      placeholderText={placeholderText}
      valueField="value"
      textField="name"
      disabled={disabled}
    />
  );
}

GitTaskTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

GitTaskTypeSelectInput.defaultProps = {
  fieldName: "type",
  placeholderText: "Select Task Type"
};

export default GitTaskTypeSelectInput;