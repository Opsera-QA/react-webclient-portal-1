import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import PipelineTaskJsonPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskJsonPanel";
import PipelineTaskSummaryPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanel";
import PipelineTaskConsoleLogPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskConsoleLogPanel";
import ConsoleLogTab from "components/common/tabs/detail_view/ConsoleLogTab";
import OverlayTabPanelContainer from "components/common/panels/general/OverlayTabPanelContainer";
import PipelineTaskRunConfigurationSummaryPanel, {
  RUN_CONFIGURATION_SUMMARY_SUPPORTED_TOOL_IDENTIFIERS
} from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskRunConfigurationSummaryPanel";
import CustomTab from "components/common/tabs/CustomTab";
import {faFile, faShield} from "@fortawesome/pro-light-svg-icons";
import PipelineTaskAuditLogSummaryPanel, {
  AUDIT_LOG_SUMMARY_SUPPORTED_TOOL_IDENTIFIERS
} from "components/workflow/pipelines/activity/PipelineTaskAuditLogSummaryPanel";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function PipelineTaskTabPanel({ pipelineTaskData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getActionSpecificTab = () => {
    switch (pipelineTaskData?.action) {
      case ("console output"):
        return (
          <ConsoleLogTab
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
        );
    }
  };

  const getIdentifierSpecificTabs = () => {
    const apiResponseStepIdentifier = pipelineTaskData?.api_response?.stepIdentifier;

    if (
      RUN_CONFIGURATION_SUMMARY_SUPPORTED_TOOL_IDENTIFIERS.includes(pipelineTaskData?.tool_identifier)
      || RUN_CONFIGURATION_SUMMARY_SUPPORTED_TOOL_IDENTIFIERS.includes(apiResponseStepIdentifier,
      )) {
      return (
        <CustomTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Run Configuration"}
          tabName={"configuration"}
          icon={faFile}
        />
      );
    }

    // const auditLogRecordId = DataParsingHelper.parseNestedMongoDbId(pipelineTaskData, "api_response.auditRecordId");
    //
    // if (auditLogRecordId) {
    //   return (
    //     <CustomTab
    //       handleTabClick={handleTabClick}
    //       activeTab={activeTab}
    //       tabText={"Runtime Settings Audit Log"}
    //       tabName={"audit"}
    //       icon={faShield}
    //     />
    //   );
    // }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        {getIdentifierSpecificTabs()}
        {getActionSpecificTab()}
        <JsonTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <PipelineTaskSummaryPanel
            pipelineTaskData={pipelineTaskData}
            setActiveTab={setActiveTab}
          />
        );
      case "configuration":
        return (
          <PipelineTaskRunConfigurationSummaryPanel
            pipelineTaskData={pipelineTaskData}
          />
        );
      case "audit":
        return (
          <PipelineTaskAuditLogSummaryPanel
            pipelineTaskData={pipelineTaskData}
          />
        );
      case "log":
        return (
          <PipelineTaskConsoleLogPanel
            pipelineTaskData={pipelineTaskData}
          />
        );
      case "json":
        return (
          <PipelineTaskJsonPanel
            pipelineTaskData={pipelineTaskData}
          />
        );
      default:
        return null;
    }
  };

  if (pipelineTaskData == null) {
    return null;
  }

  return (
    <OverlayTabPanelContainer
      currentView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

PipelineTaskTabPanel.propTypes = {
  pipelineData: PropTypes.object,
  pipelineTaskData: PropTypes.object,
};

export default PipelineTaskTabPanel;


