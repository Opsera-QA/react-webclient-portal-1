import React from 'react';
import PropTypes from 'prop-types';
import FilterContainer from "components/common/table/FilterContainer";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import UserActivityAuditLogTableBase from "components/common/audit_log/UserActivityAuditLogTableBase";
import InlineUserFilterSelectInput from "components/common/filters/ldap/owner/InlineUserFilterSelectInput";
import PipelineAuditLogActionsVerticalTabContainer
  from "components/workflow/pipelines/audit/PipelineAuditLogActionsVerticalTabContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";
import {screenContainerHeights} from "components/common/panels/general/screenContainer.heights";
import useGetAuditLogsForTool from "hooks/audit_logs/registry/tools/useGetAuditLogsForTool";

export default function ToolAuditLogsDisplayer(
  {
    toolId,
    setSelectedAuditLogId,
  }) {
  const {
    toolAuditLogFilterModel,
    setToolAuditLogFilterModel,
    auditLogs,
    isLoading,
    loadData,
  } = useGetAuditLogsForTool(toolId);

  const getInlineFilters = () => {
    return (
      <InlineUserFilterSelectInput
        fieldName={"user"}
        loadDataFunction={loadData}
        filterModel={toolAuditLogFilterModel}
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
        filterModel={toolAuditLogFilterModel}
        setFilterModel={setToolAuditLogFilterModel}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <PipelineAuditLogActionsVerticalTabContainer
        pipelineAuditLogFilterModel={toolAuditLogFilterModel}
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

  if (isMongoDbId(toolId) !== true) {
    return null;
  }

  return (
    <FilterContainer
      minimumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
      maximumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
      isLoading={isLoading}
      title={"Tool Audit Logs"}
      titleIcon={faShieldCheck}
      body={getTable()}
      loadData={loadData}
      filterDto={toolAuditLogFilterModel}
      setFilterDto={setToolAuditLogFilterModel}
      inlineFilters={getInlineFilters()}
    />
  );
}

ToolAuditLogsDisplayer.propTypes = {
  toolId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};