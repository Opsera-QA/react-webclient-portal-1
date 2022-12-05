import React from 'react';
import PropTypes from 'prop-types';
import useGetAuditLogsForPipeline from "hooks/workflow/pipelines/audit/useGetAuditLogsForPipeline";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

export default function PipelineAuditLogsDisplayer(
  {
    pipelineId,
  }) {
  const {
    auditLogs,
    isLoading,
  } = useGetAuditLogsForPipeline(pipelineId);

  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
        />
      );
    }

    return (
      <div>
        {JSON.stringify(auditLogs)}
      </div>
    );
  };

  if (pipelineId == null) {
    return null;
  }

  return (
    <div className={"p-3"}>
      {getBody()}
    </div>
  );
}

PipelineAuditLogsDisplayer.propTypes = {
  pipelineId: PropTypes.string,
};