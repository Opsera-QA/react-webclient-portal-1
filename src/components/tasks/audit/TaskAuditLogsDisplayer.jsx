import React from 'react';
import PropTypes from 'prop-types';
import useGetAuditLogsForTask from "hooks/audit_logs/tasks/useGetAuditLogsForTask";
import FilterContainer from "components/common/table/FilterContainer";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import UserActivityAuditLogTableBase from "components/common/audit_log/UserActivityAuditLogTableBase";
import InlineUserFilterSelectInput from "components/common/filters/ldap/owner/InlineUserFilterSelectInput";
import {screenContainerHeights} from "components/common/panels/general/screenContainer.heights";

export default function TaskAuditLogsDisplayer(
  {
    taskId,
    setSelectedAuditLogId,
  }) {
  const {
    taskAuditLogFilterModel,
    setTaskAuditLogFilterModel,
    auditLogs,
    isLoading,
    loadData,
  } = useGetAuditLogsForTask(taskId);

  const getInlineFilters = () => {
    return (
      <InlineUserFilterSelectInput
        fieldName={"user"}
        loadDataFunction={loadData}
        filterModel={taskAuditLogFilterModel}
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
        filterModel={taskAuditLogFilterModel}
        setFilterModel={setTaskAuditLogFilterModel}
      />
    );
  };

  // const getVerticalTabContainer = () => {
  //   return (
  //     <TaskAuditLogActionsVerticalTabContainer
  //       taskAuditLogFilterModel={taskAuditLogFilterModel}
  //       isLoading={isLoading}
  //       loadData={loadData}
  //     />
  //   );
  // };
  //
  // const getBody = () => {
  //   return (
  //     <TabAndViewContainer
  //       minimumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
  //       maximumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
  //       verticalTabContainer={getVerticalTabContainer()}
  //       currentView={getTable()}
  //     />
  //   );
  // };

  if (isMongoDbId(taskId) !== true) {
    return null;
  }

  return (
    <FilterContainer
      minimumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
      maximumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
      isLoading={isLoading}
      title={"Task Audit Logs"}
      titleIcon={faShieldCheck}
      body={getTable()}
      loadData={loadData}
      filterDto={taskAuditLogFilterModel}
      setFilterDto={setTaskAuditLogFilterModel}
      inlineFilters={getInlineFilters()}
    />
  );
}

TaskAuditLogsDisplayer.propTypes = {
  taskId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};