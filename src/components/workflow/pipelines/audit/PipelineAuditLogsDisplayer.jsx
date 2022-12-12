import React, {useState} from 'react';
import PropTypes from 'prop-types';
import useGetAuditLogsForPipeline from "hooks/workflow/pipelines/audit/useGetAuditLogsForPipeline";
import FilterContainer from "components/common/table/FilterContainer";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import UserActivityAuditLogTableBase from "components/common/audit_log/UserActivityAuditLogTableBase";
import PipelineAuditLogSummaryPanel from "components/workflow/pipelines/audit/PipelineAuditLogSummaryPanel";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import InlineUserFilterSelectInput from "components/common/filters/ldap/owner/InlineUserFilterSelectInput";
import PipelineAuditLogActionsVerticalTabContainer
  from "components/workflow/pipelines/audit/PipelineAuditLogActionsVerticalTabContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";

export default function PipelineAuditLogsDisplayer(
  {
    pipelineId,
  }) {
  const [selectedActivityLogId, setSelectedActivityLogId] = useState(undefined);
  const {
    pipelineAuditLogFilterModel,
    setPipelineAuditLogFilterModel,
    auditLogs,
    isLoading,
    loadData,
  } = useGetAuditLogsForPipeline(pipelineId);

  const getInlineFilters = () => {
    return (
      <InlineUserFilterSelectInput
        fieldName={"user"}
        loadDataFunction={loadData}
        filterModel={pipelineAuditLogFilterModel}
        className={"mr-2"}
      />
    );
  };

  const getTable = () => {
    return (
      <UserActivityAuditLogTableBase
        auditLogs={auditLogs}
        isLoading={isLoading}
        loadDataFunction={loadData}
        setSelectedActivityLogId={setSelectedActivityLogId}
        filterModel={pipelineAuditLogFilterModel}
        setFilterModel={setPipelineAuditLogFilterModel}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <PipelineAuditLogActionsVerticalTabContainer
        pipelineAuditLogFilterModel={pipelineAuditLogFilterModel}
        isLoading={isLoading}
        loadData={loadData}
      />
    );
  };

  const getBody = () => {
    return (
      <TabAndViewContainer
        verticalTabContainer={getVerticalTabContainer()}
        currentView={getTable()}
      />
    );
  };

  if (isMongoDbId(pipelineId) !== true) {
    return null;
  }

  if (isMongoDbId(selectedActivityLogId) === true) {
    return (
      <div>
        <PipelineAuditLogSummaryPanel
          pipelineId={pipelineId}
          auditLogId={selectedActivityLogId}
        />
        <BackButtonBase
          backButtonFunction={() => setSelectedActivityLogId(undefined)}
        />
      </div>
    );
  }

  return (
    <FilterContainer
      isLoading={isLoading}
      title={"Pipeline Audit Logs"}
      titleIcon={faShieldCheck}
      body={getBody()}
      loadData={loadData}
      filterDto={pipelineAuditLogFilterModel}
      setFilterDto={setPipelineAuditLogFilterModel}
      inlineFilters={getInlineFilters()}
    />
  );
}

PipelineAuditLogsDisplayer.propTypes = {
  pipelineId: PropTypes.string,
};