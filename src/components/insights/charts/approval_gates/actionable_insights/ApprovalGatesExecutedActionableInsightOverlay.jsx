import React, { useEffect, useContext, useState, useRef } from "react";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import ApprovalGatesExecutedDataBlocks from "./data_blocks/ApprovalGatesExecutedDataBlocks";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import ApprovalGatesApprovalTab from "./tabs/ApprovalGatesApprovalTab";
import { faDraftingCompass } from "@fortawesome/free-solid-svg-icons";
import ApprovalGatesRejectTab from "./tabs/ApprovalGatesRejectTab";
import { useHistory } from "react-router-dom";

function ApprovalGatesExecutedActionableInsightOverlay({
  kpiConfiguration,
  dashboardData,
  request,
  metrics,
}) {
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...genericChartFilterMetadata.newObjectFields },
      genericChartFilterMetadata,
      false,
    ),
  );
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  
  const [activeTab, setActiveTab] = useState("approval");

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const onRowSelect = (id) =>{
    closePanel();
    history.push(`/workflow/details/${(id)}/summary`);
  };

  const getTabs = () => {
    if (activeTab == "approval") {
      return (
        <ApprovalGatesApprovalTab
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          icon={faDraftingCompass}
          action="approve"
          onRowSelect={onRowSelect}
        />
      );
    } else if (activeTab == "reject") {
      return (
        <ApprovalGatesRejectTab
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          icon={faDraftingCompass}
          action="reject"
          onRowSelect={onRowSelect}

        />
      );
    }
  };

  const handleTabClick = (tabSelection) => (e) => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer styling={"metric-detail-tabs"}>
        <CustomTab
          activeTab={activeTab}
          tabText={"Pipeline Runs Approved"}
          handleTabClick={handleTabClick}
          tabName={"approval"}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Pipeline Runs Rejected"}
          handleTabClick={handleTabClick}
          tabName={"reject"}
        />
      </CustomTabContainer>
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Approval Gates - Total Approvals Executed`}
      showToasts={true}
      titleIcon={faTable}
      isLoading={false}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        <ApprovalGatesExecutedDataBlocks metrics={metrics} />
      </div>
      
        <div className={"p-3"}>
          <TabPanelContainer
            currentView={getTabs()}
            tabContainer={getTabContainer()}
          />
        </div>
      
    </FullScreenCenterOverlayContainer>
  );
}

ApprovalGatesExecutedActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  request: PropTypes.string,
  metrics: PropTypes.object,
};

export default ApprovalGatesExecutedActionableInsightOverlay;
