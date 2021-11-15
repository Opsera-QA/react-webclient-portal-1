import React, {useContext} from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import {AuthContext} from "contexts/AuthContext";
import templateActions from "components/admin/template_editor/template-actions";

function PipelineTemplateRoleAccessInput({fieldName, dataObject, setDataObject, disabled, visible}) {
  const { getAccessToken } = useContext(AuthContext);

  const saveData = async (newRoles) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, newRoles);
    let response = await templateActions.updateTemplate(dataObject, getAccessToken);
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
      dataObject={dataObject}
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
  fieldName: "access"
};

export default PipelineTemplateRoleAccessInput;