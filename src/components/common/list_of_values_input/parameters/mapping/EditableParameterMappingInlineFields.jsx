import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import EditableParameterMappingHeaderField
  from "components/common/list_of_values_input/parameters/mapping/EditableParameterMappingHeaderField";
import EditableParameterMappingInlineField
  from "components/common/list_of_values_input/parameters/mapping/EditableParameterMappingInlineField";
import PipelineStepSaveEnvironmentVariablesBooleanToggle
  from "components/common/list_of_values_input/parameters/pipeline/PipelineStepSaveEnvironmentVariablesBooleanToggle";

export default function EditableParameterMappingInlineFields(
  {
    model,
    setModel,
    disabled,
    fieldName,
    customParametersFieldName,
    showSaveEnvironmentVariablesToggle,
  }) {
  const environmentVariables = DataParsingHelper.parseArray(fieldName);

  const deleteParameterFunction = (index) => {
    const currentData = model?.getArrayData(fieldName);
    currentData.splice(index, 1);
    model.setData(fieldName, currentData);
    setModel({...model});
  };

  if (environmentVariables.length > 0) {
    return (
      <div className={"mb-3"}>
        <div className={"d-flex justify-content-between"}>
          <div>
            <H5FieldSubHeader
              subheaderText={"Global Parameters"}
            />
          </div>
          <div className={"d-flex"}>
            <PipelineStepSaveEnvironmentVariablesBooleanToggle
              setModel={setModel}
              model={model}
              disabled={disabled}
              className={"my-auto mr-2"}
              visible={showSaveEnvironmentVariablesToggle === true}
              environmentVariablesFieldName={fieldName}
              customParametersFieldName={customParametersFieldName}
            />
          </div>
        </div>
        <div
          className={"content-container-border"}
          style={{
            overflowY: "hidden",
          }}
        >
          <EditableParameterMappingHeaderField/>
          {environmentVariables.map((parameter, index) => {
            return (
              <EditableParameterMappingInlineField
                disabled={disabled}
                parameter={parameter}
                deleteParameterFunction={deleteParameterFunction}
                index={index}
                key={index}
              />
            );
          })}
        </div>
        <hr/>
      </div>
    );
  }

  return (
    <div className={"mb-3"}>
      <div>
        <H5FieldSubHeader
          subheaderText={"Global Parameters"}
        />
      </div>
      <div
        className={"content-container-border mb-3"}
        style={{
          overflowY: "hidden",
        }}
      >
        <CenteredContentWrapper minHeight={"50px"}>
          <div>No Global Parameters have been added yet</div>
        </CenteredContentWrapper>
      </div>
      <hr/>
    </div>
  );
}

EditableParameterMappingInlineFields.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  showSaveEnvironmentVariablesToggle: PropTypes.bool,
  customParametersFieldName: PropTypes.bool,
};

EditableParameterMappingInlineFields.defaultProps = {
  fieldName: "environmentVariables",
};
