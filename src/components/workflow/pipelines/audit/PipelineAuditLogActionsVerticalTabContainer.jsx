import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import auditLogActionConstants from "@opsera/definitions/constants/audit-logs/actions/auditLogAction.constants";

//TODO: Wire up constants when I get access to JFrog again
export default function PipelineAuditLogActionsVerticalTabContainer(
  {
    isLoading,
    pipelineAuditLogFilterModel,
    loadData,
  }) {
  const handleTabClick = (tab) => {
    if (pipelineAuditLogFilterModel?.getData("action") !== tab) {
      pipelineAuditLogFilterModel?.setData("action", tab);
      loadData(pipelineAuditLogFilterModel);
    }
  };

  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        tabText={"All Actions"}
        tabName={""}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.CREATE}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.CREATE}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.UPDATE}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.UPDATE}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.DELETE}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.DELETE}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.OWNERSHIP_TRANSFER}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.OWNERSHIP_TRANSFER}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.COPY}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.COPY}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.DEPLOY}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.DEPLOY}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.PUBLISH}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.PUBLISH}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.EDIT_ACCESS_ROLES}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.EDIT_ACCESS_ROLES}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      {/*<VanitySetVerticalTab*/}
      {/*  tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.UPDATE_RUNTIME_SETTINGS}*/}
      {/*  tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.UPDATE_RUNTIME_SETTINGS}*/}
      {/*  disabled={isLoading}*/}
      {/*  handleTabClick={handleTabClick}*/}
      {/*  activeTab={pipelineAuditLogFilterModel?.getData("action")}*/}
      {/*/>*/}
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.START}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.START}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.WEBHOOK_START}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.WEBHOOK_START}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.RESUME}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.RESUME}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.STOP}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.STOP}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.RESET}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.RESET}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.APPROVAL}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.APPROVAL}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
      <VanitySetVerticalTab
        tabText={auditLogActionConstants.USER_ACTIVITY_LOG_ACTION_LABELS.DENIAL}
        tabName={auditLogActionConstants.USER_ACTIVITY_LOG_ACTIONS.DENIAL}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineAuditLogFilterModel?.getData("action")}
      />
    </VanitySetVerticalTabContainer>
  );
}

PipelineAuditLogActionsVerticalTabContainer.propTypes = {
  isLoading: PropTypes.bool,
  pipelineAuditLogFilterModel: PropTypes.object,
  loadData: PropTypes.func,
};