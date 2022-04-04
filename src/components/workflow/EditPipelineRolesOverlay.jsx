import React from "react";
import PropTypes from "prop-types";
import EditRolesOverlay from "components/common/inline_inputs/roles/overlay/EditRolesOverlay";

function EditPipelineRolesOverlay(
  {
    pipelineModel,
    saveDataFunction,
    loadData,
  }) {

  return (
    <EditRolesOverlay
      model={pipelineModel}
      fieldName={"roles"}
      saveDataFunction={saveDataFunction}
      loadData={loadData}
    />
  );
}

EditPipelineRolesOverlay.propTypes = {
  pipelineModel: PropTypes.object,
  saveDataFunction: PropTypes.func,
  loadData: PropTypes.func,
};

export default EditPipelineRolesOverlay;


