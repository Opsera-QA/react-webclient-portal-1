import React, {useState} from 'react';
import PropTypes from 'prop-types';
import useGetAuditLogsForPipeline from "hooks/workflow/pipelines/audit/useGetAuditLogsForPipeline";
import FilterContainer from "components/common/table/FilterContainer";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import UserActivityAuditLogTableBase from "components/common/audit_log/UserActivityAuditLogTableBase";
import PipelineAuditLogSummaryPanel from "components/workflow/pipelines/audit/PipelineAuditLogSummaryPanel";

export default function PipelineAuditLogsDisplayer(
  {
    pipelineId,
  }) {
  const [selectedActivityLogId, setSelectedActivityLogId] = useState(undefined);
  const {
    auditLogs,
    isLoading,
    loadData,
  } = useGetAuditLogsForPipeline(pipelineId);

  const getBody = () => {
    return (
      <UserActivityAuditLogTableBase
        auditLogs={auditLogs}
        isLoading={isLoading}
        loadDataFunction={loadData}
        setSelectedActivityLogId={setSelectedActivityLogId}
      />
    );
  };

  if (isMongoDbId(pipelineId) !== true) {
    return null;
  }

  if (isMongoDbId(selectedActivityLogId) === true) {
    return (
      <PipelineAuditLogSummaryPanel
        pipelineId={pipelineId}
        auditLogId={selectedActivityLogId}
      />
    );
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