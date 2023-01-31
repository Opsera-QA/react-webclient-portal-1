import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import {faSync} from "@fortawesome/pro-light-svg-icons";
import ParameterSelectListHeaderField
  from "components/common/list_of_values_input/parameters/legacy/ParameterSelectListHeaderField";
import ParameterSelectListInlineField
  from "components/common/list_of_values_input/parameters/legacy/ParameterSelectListInlineField";
import PipelineStepSaveEnvironmentVariablesBooleanToggle
  from "components/common/list_of_values_input/parameters/pipeline/PipelineStepSaveEnvironmentVariablesBooleanToggle";

export default function GlobalParameterFields(
  {
    model,
    setModel,
    disabled,
    fieldName,
    allowTerraformParametersSync,
    environmentVariablesFieldName,
    plan,
    showSaveEnvironmentVariablesToggle,
  }) {
  const customParameters = DataParsingHelper.parseArray(model?.getData(fieldName), []);

  // TODO: I feel like we should remove this altogether and instead have it be a button on the pipeline step instead.
  const syncTerraformStepCustomParameters = () => {
    const terraformStep = plan.find((step) => step._id === model?.getData("terraformStepId"));
    const terraformStepCustomParameters = DataParsingHelper.parseNestedArray(terraformStep, "tool.configuration.customParameters", []);
    const currentParameters = model?.getArrayData("customParameters");
    const filtered = [];

    for (let index in currentParameters) {
      if (!currentParameters[index]?.outputKey) {
        filtered.push(currentParameters[index]);
      }
    }

    model.setData("customParameters", [...terraformStepCustomParameters, ...filtered]);
    setModel({...model});
  };

  const getTerraformStepParameterSyncButton = () => {
    if (allowTerraformParametersSync !== true) {
      return;
    }

    const parsedPlan = DataParsingHelper.parseArray(plan, []);
    const terraformStep = plan.find((step) => step._id === model?.getData("terraformStepId"));

    if (terraformStep != null && parsedPlan.length > 0 && isMongoDbId(model?.getData("terraformStepId")) === true) {
      return (
        <OverlayIconBase
          overlayBody={"Sync Terraform Output Parameters"}
          icon={faSync}
          className={"ml-2 my-auto"}
          onClickFunction={() => syncTerraformStepCustomParameters()}
        />
      );
    }
  };

  const deleteCustomParameter = (index) => {
    const currentData = model?.getArrayData(fieldName);
    currentData.splice(index, 1);
    model.setData(fieldName, currentData);
    setModel({...model});
  };

  if (customParameters.length > 0) {
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
              environmentVariablesFieldName={environmentVariablesFieldName}
              customParametersFieldName={fieldName}
            />
            {getTerraformStepParameterSyncButton()}
          </div>
        </div>
        <div
          className={"content-container-border"}
          style={{
            overflowY: "hidden",
          }}
        >
          <ParameterSelectListHeaderField/>

          {customParameters.map((parameter, index) => {
            return (
              <ParameterSelectListInlineField
                disabled={disabled}
                parameter={parameter}
                deleteParameterFunction={deleteCustomParameter}
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

  GlobalParameterFields.propTypes = {
    model: PropTypes.object,
    setModel: PropTypes.func,
    fieldName: PropTypes.string,
    disabled: PropTypes.bool,
    plan: PropTypes.array,
    allowTerraformParametersSync: PropTypes.bool,
    environmentVariablesFieldName: PropTypes.string,
    showSaveEnvironmentVariablesToggle: PropTypes.bool,
  };
