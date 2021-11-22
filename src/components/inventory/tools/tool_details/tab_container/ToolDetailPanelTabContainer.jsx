import React from "react";

import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import ToolJobsTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolJobsTab";
import ToolVaultTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolVaultTab";
import ToolAccountsTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolAccountsTab";
import ToolLogsTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolLogsTab";
import ToolAttributesTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolAttributesTab";
import ToolApplicationsTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolApplicationsTab";
import ToolRepositoriesTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolRepositoriesTab";
import ToolConnectionTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolConnectionTab";
import ToolProjectsTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolProjectsTab";
import ToolS3BucketsTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolS3BucketsTab";
import ToolAzureStorageTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolAzureStorageTab";
import ToolUsageTab from "components/inventory/tools/tool_details/tab_container/tabs/ToolUsageTab";

function ToolDetailPanelTabContainer({ toolModel, handleTabClick, activeTab }) {
  return (
    <CustomTabContainer>
      <SummaryToggleTab
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
      <ToolAttributesTab
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      />
      <ToolVaultTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolConnectionTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolJobsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolAccountsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolLogsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolApplicationsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolRepositoriesTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolProjectsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolS3BucketsTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolAzureStorageTab
        toolModel={toolModel}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <ToolUsageTab
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
    </CustomTabContainer>
  );
}

ToolDetailPanelTabContainer.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolDetailPanelTabContainer;


