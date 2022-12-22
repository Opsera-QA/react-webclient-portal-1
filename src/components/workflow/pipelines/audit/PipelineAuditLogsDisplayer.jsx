import React, {useState} from 'react';
import PropTypes from 'prop-types';
import useGetAuditLogsForPipeline from "hooks/audit_logs/pipelines/useGetAuditLogsForPipeline";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import UserActivityAuditLogTableBase from "components/common/audit_log/UserActivityAuditLogTableBase";
import {screenContainerHeights} from "components/common/panels/general/screenContainer.heights";
import UserActivityAuditLogFilterSidebarBase from "components/common/audit_log/UserActivityAuditLogFilterSidebarBase";
import SideBySideViewBase from "components/common/tabs/SideBySideViewBase";
import InfoContainer from "components/common/containers/InfoContainer";

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
      <UserActivityAuditLogFilterSidebarBase
        userActivityAuditLogFilterModel={pipelineAuditLogFilterModel}
        setUserActivityAuditLogFilterModel={setPipelineAuditLogFilterModel}
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

  if (isMongoDbId(pipelineId) !== true) {
    return null;
  }

  return (
    <InfoContainer
      minimumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
      maximumHeight={screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT}
      overflowY={""}
      isLoading={isLoading}
      titleText={"Pipeline Audit Logs"}
      titleIcon={faShieldCheck}
      loadDataFunction={loadData}
      filterDto={pipelineAuditLogFilterModel}
      setFilterDto={setPipelineAuditLogFilterModel}
    >
      {getBody()}
    </InfoContainer>
  );
}

PipelineAuditLogsDisplayer.propTypes = {
  pipelineId: PropTypes.string,
  setSelectedAuditLogId: PropTypes.func,
};