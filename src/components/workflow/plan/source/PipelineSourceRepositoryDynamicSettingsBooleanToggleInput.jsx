import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import useGetFeatureFlags from "hooks/platform/useGetFeatureFlags";
import {pipelineTypeConstants} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import IconBase from "components/common/icons/IconBase";
import {faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function PipelineSourceRepositoryDynamicSettingsBooleanToggleInput(
  {
    className,
    model,
    setModel,
    pipelineType,
  }) {
  const {
    enabledServices,
  } = useGetFeatureFlags();

  const getDynamicText = () => {
    if (pipelineType == null) {
      return (
        <div className={"d-flex mb-1 warning-text-alt"}>
          <div><IconBase icon={faTriangleExclamation} className={"mr-1"} /></div>
          {`Please set the Pipeline's Type to Software Development (SDLC) to enable this feature.`}
        </div>
      );
    }

    if (pipelineType !== pipelineTypeConstants.PIPELINE_TYPES.SOFTWARE_DEVELOPMENT) {
      return (
        <div className={"d-flex mb-1 warning-text-alt"}>
          <div><IconBase icon={faTriangleExclamation} className={"mr-1"} /></div>
          This feature is currently only available for Software Development (SDLC) Pipelines.
        </div>
      );
    }

    if (hasStringValue(model?.getData("repoId")) !== true) {
      return (
        <div className={"d-flex mb-1 warning-text-alt"}>
          <div><IconBase icon={faTriangleExclamation} className={"mr-1"} /></div>
          This feature requires a Git repository to be set to be enabled.
        </div>
      );
    }
  };

  const getInfoText = () => {
    return (
      <div>
        {getDynamicText()}
        Dynamic Settings allow the user running a pipeline to change supported values in the pipeline at runtime.
        When this is enabled, a user will get a prompt to change the Git Branch for this pipeline before it starts,
        allowing them to target different branches without having to edit the pipeline.
        <div className={"mt-1"}>
          <b>
            Please note, any user who can run this pipeline can switch the branch ONLY. Do not
            enable this feature if you do not want users being able to change what branch this pipeline runs
            against.
          </b>
        </div>
      </div>
    );
  };

  const helpText = () => {
    return (
      <div>
        {getDynamicText()}
        <div>
          Please note, the Git repository is required for this feature to work, but webhooks do not need to be enabled.
        </div>
      </div>
    );
  };

  if (enabledServices?.dynamicSettings !== true) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader
        className={"text-muted mt-3"}
        subheaderText={"Dynamic Settings"}
      />
      <BooleanToggleInput
        dataObject={model}
        setDataObject={setModel}
        fieldName={"dynamicSettings"}
        customInfoText={getInfoText()}
        helpTooltip={helpText()}
        disabled={
          pipelineType !== pipelineTypeConstants.PIPELINE_TYPES.SOFTWARE_DEVELOPMENT
          || hasStringValue(model?.getData("repoId")) !== true
        }
      />
    </div>
  );
}

PipelineSourceRepositoryDynamicSettingsBooleanToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  pipelineType: PropTypes.string,
};