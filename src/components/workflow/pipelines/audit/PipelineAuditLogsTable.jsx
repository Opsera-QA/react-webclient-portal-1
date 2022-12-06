import React from 'react';
import PropTypes from 'prop-types';
import useGetAuditLogsForPipeline from "hooks/workflow/pipelines/audit/useGetAuditLogsForPipeline";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import FilterContainer from "components/common/table/FilterContainer";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";

export default function PipelineAuditLogsTable(
  {
    pipelineId,
  }) {
  const {
    auditLogs,
    isLoading,
    loadData,
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
    <FilterContainer
      isLoading={isLoading}
      title={"Pipeline Audit Logs"}
      titleIcon={faShieldCheck}
      body={getBody()}
      loadData={loadData}
    />
  );
}

PipelineAuditLogsTable.propTypes = {
  pipelineId: PropTypes.string,
};