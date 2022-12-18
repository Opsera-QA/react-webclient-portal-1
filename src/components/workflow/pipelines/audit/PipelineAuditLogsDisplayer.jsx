import React, {useState} from 'react';
import PropTypes from 'prop-types';
import useGetAuditLogsForPipeline from "hooks/audit_logs/pipelines/useGetAuditLogsForPipeline";
import FilterContainer from "components/common/table/FilterContainer";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import UserActivityAuditLogTableBase from "components/common/audit_log/UserActivityAuditLogTableBase";
import InlineUserFilterSelectInput from "components/common/filters/ldap/owner/InlineUserFilterSelectInput";
import PipelineAuditLogActionsVerticalTabContainer
  from "components/workflow/pipelines/audit/PipelineAuditLogActionsVerticalTabContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";
import {screenContainerHeights} from "components/common/panels/general/screenContainer.heights";

export default function PipelineAuditLogsDisplayer(
  {
    pipelineId,
    setSelectedAuditLogId,
  }) {
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
        setSelectedActivityLogId={setSelectedAuditLogId}
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
        minimumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
        maximumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
        verticalTabContainer={getVerticalTabContainer()}
        currentView={getTable()}
      />
    );
  };

  if (isMongoDbId(pipelineId) !== true) {
    return null;
  }

  return (
    <FilterContainer
      minimumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
      maximumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
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
  setSelectedAuditLogId: PropTypes.func,
};