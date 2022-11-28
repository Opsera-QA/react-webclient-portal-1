import React, {useContext} from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import {AuthContext} from "contexts/AuthContext";
import pipelineTemplateActions from "components/admin/pipeline_templates/pipelineTemplate.actions";

export default function PipelineTemplateRoleAccessInput({fieldName, dataObject, setDataObject, disabled, visible}) {
  const { getAccessToken } = useContext(AuthContext);

  const saveData = async (newRoles) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, newRoles);
    let response = await pipelineTemplateActions.updateTemplate(dataObject, getAccessToken);
    setDataObject({...newDataObject});
    return response;
  };

  const getNoDataMessage = () => {
    return (
      <span>No Role Access Configurations Applied. All users can see or edit this {dataObject?.getType()}.</span>
    );
  };

  return (
    <RoleAccessInlineInputBase
      fieldName={fieldName}
      model={dataObject}
      disabled={disabled}
      visible={visible}
      saveData={saveData}
      noDataMessage={getNoDataMessage()}
    />
  );
}

PipelineTemplateRoleAccessInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

PipelineTemplateRoleAccessInput.defaultProps = {
  fieldName: "roles"
};