import React from "react";
import PropTypes from "prop-types";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useGetPipelineNameById from "hooks/workflow/pipelines/useGetPipelineNameById";
import IconBase from "components/common/icons/IconBase";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import {pipelineHelper} from "components/workflow/pipeline.helper";

export default function PipelineIdFieldBase(
  {
    pipelineId,
    className,
  }) {
  const {
    isLoading,
    pipeline,
  } = useGetPipelineNameById(pipelineId);

// TODO: Make overlay to show more details without needing to visit pipeline screen
  // const getToolInfoOverlay = () => {
  //   if (isMongoDbId(toolId) && toolName) {
  //     return (
  //       <RegistryToolInfoOverlay
  //         selectedToolId={toolId}
  //         loadData={loadData}
  //         isLoading={isLoading}
  //         isMounted={isMounted}
  //         // model={model}
  //       />
  //     );
  //   }
  // };

  if (isMongoDbId(pipelineId) !== true) {
    return null;
  }

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
          copyString={`${process.env.REACT_APP_OPSERA_CLIENT_ROOT_URL}${pipelineHelper.getDetailViewLink(pipelineId)}`}
          copyText={"Copy link to Pipeline"}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <IconBase
          isLoading={isLoading}
          className={"mr-1"}
        />
        <div>{pipelineId}</div>
        <CopyToClipboardIconBase
          className={"ml-2"}
          copyString={`${process.env.REACT_APP_OPSERA_CLIENT_ROOT_URL}${pipelineHelper.getDetailViewLink(pipelineId)}`}
          copyText={"Copy link to Pipeline"}
        />
      </div>
    </div>
  );
}

PipelineIdFieldBase.propTypes = {
  pipelineId: PropTypes.string,
  className: PropTypes.string,
};
