import React from 'react';
import PropTypes from 'prop-types';
import useGetAuditLogsForPipeline from "hooks/workflow/pipelines/audit/useGetAuditLogsForPipeline";
import FilterContainer from "components/common/table/FilterContainer";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import PipelineAuditLogsTable from "components/workflow/pipelines/audit/PipelineAuditLogsTable";

export default function PipelineAuditLogsDisplayer(
  {
    pipelineId,
  }) {
  const {
    auditLogs,
    isLoading,
    loadData,
  } = useGetAuditLogsForPipeline(pipelineId);

  const getBody = () => {
    return (
      <PipelineAuditLogsTable
        auditLogs={auditLogs}
        isLoading={isLoading}
        loadDataFunction={loadData}
      />
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

PipelineAuditLogsDisplayer.propTypes = {
  pipelineId: PropTypes.string,
};