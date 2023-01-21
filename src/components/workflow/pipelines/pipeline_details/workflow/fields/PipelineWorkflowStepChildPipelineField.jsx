import React from "react";
import PropTypes from "prop-types";
import PipelineWorkflowItemFieldBase
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemFieldBase";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useGetPipelineById from "hooks/workflow/pipelines/useGetPipelineById";
import IconBase from "components/common/icons/IconBase";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import {pipelineHelper} from "components/workflow/pipeline.helper";

// TODO: Make overlay to show more details without needing to visit pipeline screen
export default function PipelineWorkflowStepChildPipelineField(
  {
    step,
  }) {
  const childPipelineId = DataParsingHelper.parseNestedMongoDbId(step, "tool.configuration.pipelineId");
  const {
    isLoading,
    pipeline,
  } = useGetPipelineById(childPipelineId);

  const getValue = () => {
    if (pipeline) {
      return (
        <div className={"d-flex"}>
          <IconBase
            isLoading={isLoading}
            className={"mr-1"}
          />
          <div>{pipeline?.name}</div>
          <CopyToClipboardIconBase
            className={"ml-2"}
            copyString={pipelineHelper.getDetailViewLink(childPipelineId)}
            copyText={"Copy link to Child Pipeline"}
          />
        </div>
      );
    }

    return (
      <div className={"d-flex"}>
        <IconBase
          isLoading={isLoading}
          className={"mr-1"}
        />
        <div>{childPipelineId}</div>
        <CopyToClipboardIconBase
          className={"ml-2"}
          copyString={pipelineHelper.getDetailViewLink(childPipelineId)}
          copyText={"Copy link to Child Pipeline"}
        />
      </div>
    );
  };

  if (isMongoDbId(childPipelineId) !== true) {
    return null;
  }

  return (
    <PipelineWorkflowItemFieldBase
      className={"pl-1 pt-1"}
      icon={faDraftingCompass}
      label={"Child Pipeline"}
      value={getValue()}
    />
  );
}

PipelineWorkflowStepChildPipelineField.propTypes = {
  step: PropTypes.object,
};
