import React from 'react';
import PropTypes from 'prop-types';
import useGetAuditLogsForInstructions from "hooks/audit_logs/instructions/useGetAuditLogsForInstructions";
import FilterContainer from "components/common/table/FilterContainer";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import UserActivityAuditLogTableBase from "components/common/audit_log/UserActivityAuditLogTableBase";
import InlineUserFilterSelectInput from "components/common/filters/ldap/owner/InlineUserFilterSelectInput";
import {screenContainerHeights} from "components/common/panels/general/screenContainer.heights";

export default function InstructionsAuditLogsDisplayer(
  {
    instructionsId,
    setSelectedAuditLogId,
  }) {
  const {
    instructionsAuditLogFilterModel,
    setInstructionsAuditLogFilterModel,
    auditLogs,
    isLoading,
    loadData,
  } = useGetAuditLogsForInstructions(instructionsId);

  const getInlineFilters = () => {
    return (
      <InlineUserFilterSelectInput
        fieldName={"user"}
        loadDataFunction={loadData}
        filterModel={instructionsAuditLogFilterModel}
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
        filterModel={instructionsAuditLogFilterModel}
        setFilterModel={setInstructionsAuditLogFilterModel}
      />
    );
  };

  // const getVerticalTabContainer = () => {
  //   return (
  //     <InstructionsAuditLogActionsVerticalTabContainer
  //       instructionsAuditLogFilterModel={instructionsAuditLogFilterModel}
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

  if (isMongoDbId(instructionsId) !== true) {
    return null;
  }

  return (
    <FilterContainer
      minimumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
      maximumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
      isLoading={isLoading}
      title={"Instructions Audit Logs"}
      titleIcon={faShieldCheck}
      body={getTable()}
      loadData={loadData}
      filterDto={instructionsAuditLogFilterModel}
      setFilterDto={setInstructionsAuditLogFilterModel}
      inlineFilters={getInlineFilters()}
    />
  );
}

InstructionsAuditLogsDisplayer.propTypes = {
  instructionsId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};