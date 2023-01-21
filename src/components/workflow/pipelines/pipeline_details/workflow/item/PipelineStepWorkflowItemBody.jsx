import React from "react";
import PropTypes from "prop-types";
import {
  faCodeBranch,
} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineWorkflowItemActionField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemActionField";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelineWorkflowItemFieldBase
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemFieldBase";
import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";
import {pipelineStepMetadataConstants} from "components/workflow/pipelines/pipelineStepMetadata.constants";
import ChildPipelinePipelineStepWorkflowItemBody
  from "components/workflow/plan/step/child/ChildPipelinePipelineStepWorkflowItemBody";
import PipelineWorkflowStepIdField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowStepIdField";
import PipelineWorkflowStepToolIdentifierField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowStepToolIdentifierField";

// TODO: Use the workflow item step field instead of hardcoding these for consistency,
//  wire up fields based on the tool identifier (pull through metadata based on dynamic field type set)
export default function PipelineStepWorkflowItemBody(
  {
    pipeline,
    step,
    toolIdentifier,
    loadPipeline,
  }) {
  // TODO: In the long term we should stamp which field in the metadata should correspond to this,
  //  so we can capture cases where they're saved in different fields
  const getRepositoryField = () => {
    const repository = DataParsingHelper.parseNestedString(step, "tool.configuration.repository");

    if (repository) {
      return (
        <PipelineWorkflowItemFieldBase
          className={"pl-1 pt-1"}
          icon={faCodeBranch}
          label={"Repository"}
          value={repository}
        />
      );
    }
  };

  // TODO: In the long term we should create separate workflow panels per step identifier
  //  the short term solution is to stamp which field in the metadata should correspond to this,
  //  so we can capture cases where they're saved in different fields
  //  For now, we will fall back to checking for the first relevant field which might be inaccurate.
  const getBranchField = () => {
    const stepConfiguration = DataParsingHelper.parseNestedObject(step, "tool.configuration", {});
    const metadata = pipelineStepMetadataConstants.getMetadataForIdentifier(toolIdentifier?.identifier);
    const dynamicSettingsBranchField = metadataConstants.getDynamicTypeSettingField(metadata, metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH);

    if (dynamicSettingsBranchField) {
      const branch = DataParsingHelper.parseNestedString(stepConfiguration, dynamicSettingsBranchField?.id);

      if (hasStringValue(branch) === true) {
        return (
          <PipelineWorkflowItemFieldBase
            className={"pl-1 pt-1"}
            icon={faCodeBranch}
            label={"Branch"}
            value={branch}
          />
        );
      }
    }

    const branch = stepConfiguration.branch || stepConfiguration.gitBranch || stepConfiguration.defaultBranch;

    if (hasStringValue(branch) === true) {
      return (
        <PipelineWorkflowItemFieldBase
          className={"pl-1 pt-1"}
          icon={faCodeBranch}
          label={"Branch"}
          value={branch}
        />
      );
    }
  };


  if (pipeline == null || step == null) {
    return null;
  }

  const getBody = () => {
    switch (toolIdentifier?.identifier) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.CHILD_PIPELINE:
        return (
          <ChildPipelinePipelineStepWorkflowItemBody
            toolIdentifier={toolIdentifier}
            pipeline={pipeline}
            step={step}
          />
        );
    }

    return (
      <>
        <PipelineWorkflowStepIdField
          step={step}
        />
        <PipelineWorkflowStepToolIdentifierField
          toolIdentifier={toolIdentifier}
        />
        <PipelineWorkflowItemActionField
          pipelineStep={step}
          pipeline={pipeline}
          loadPipelineFunction={loadPipeline}
        />
        {getRepositoryField()}
        {getBranchField()}
      </>
    );
  };

  return (
    <div
      style={{
        minHeight: "46px",
      }}
    >
      {getBody()}
    </div>
  );
}

PipelineStepWorkflowItemBody.propTypes = {
  pipeline: PropTypes.object,
  step: PropTypes.object,
  toolIdentifier: PropTypes.object,
  loadPipeline: PropTypes.func,
};