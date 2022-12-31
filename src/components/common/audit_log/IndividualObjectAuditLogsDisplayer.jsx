import React from 'react';
import PropTypes from 'prop-types';
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import UserActivityAuditLogTableBase from "components/common/audit_log/UserActivityAuditLogTableBase";
import {screenContainerHeights} from "components/common/panels/general/screenContainer.heights";
import UserActivityAuditLogFilterSidebarBase from "components/common/audit_log/UserActivityAuditLogFilterSidebarBase";
import SideBySideViewBase from "components/common/tabs/SideBySideViewBase";
import InfoContainer from "components/common/containers/InfoContainer";

export default function IndividualObjectAuditLogsDisplayer(
  {
    auditLogFilterModel,
    setAuditLogFilterModel,
    auditLogs,
    isLoading,
    loadData,
    setSelectedAuditLogId,
    titleText,
  }) {
  const getTable = () => {
    return (
      <UserActivityAuditLogTableBase
        auditLogs={auditLogs}
        isLoading={isLoading}
        loadDataFunction={loadData}
        setSelectedActivityLogId={setSelectedAuditLogId}
        filterModel={auditLogFilterModel}
        setFilterModel={setAuditLogFilterModel}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <UserActivityAuditLogFilterSidebarBase
        userActivityAuditLogFilterModel={auditLogFilterModel}
        setUserActivityAuditLogFilterModel={setAuditLogFilterModel}
        isLoading={isLoading}
        loadDataFunction={loadData}
      />
    );
  };

  const getBody = () => {
    return (
      <SideBySideViewBase
        minimumHeight={`calc(${screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT} - 2px)`}
        maximumHeight={`calc(${screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT} - 2px)`}
        leftSideView={getVerticalTabContainer()}
        leftSideMinimumWidth={"320px"}
        overflowXBodyStyle={"none"}
        rightSideView={getTable()}
      />
    );
  };

  return (
    <InfoContainer
      minimumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
      maximumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
      overflowY={""}
      isLoading={isLoading}
      titleText={`${titleText} Audit Logs`}
      titleIcon={faShieldCheck}
      loadDataFunction={loadData}
      filterDto={auditLogFilterModel}
      setFilterDto={setAuditLogFilterModel}
    >
      {getBody()}
    </InfoContainer>
  );
}

IndividualObjectAuditLogsDisplayer.propTypes = {
  auditLogFilterModel: PropTypes.object,
  setAuditLogFilterModel: PropTypes.func,
  auditLogs: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  setSelectedAuditLogId: PropTypes.func,
  titleText: PropTypes.string,
};
