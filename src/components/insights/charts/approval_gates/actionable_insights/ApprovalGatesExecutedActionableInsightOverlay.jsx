import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import ApprovalGatesActionableInsightTable from "./ApprovalGatesActionableInsightTable";
import ApprovalGatesExecutedDataBlocks from "./data_blocks/ApprovalGatesExecutedDataBlocks";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import ApprovalGatesApprovalTab from "./tabs/ApprovalGatesApprovalTab";
import { faCodePullRequest, faDraftingCompass } from "@fortawesome/free-solid-svg-icons";
import ApprovalGatesRejectTab from "./tabs/ApprovalGatesRejectTab";

function ApprovalGatesExecutedActionableInsightOverlay({ kpiConfiguration, dashboardData, request }) {
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFilterModel] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, genericChartFilterMetadata, false)
  );
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [listOfPipelines, setListOfPipelines] = useState(undefined);
  const [activeTab, setActiveTab] = useState("approval");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = {
        "data": {
          "connectedAssets": {
            "tool": "opsera",
            "data": [
              {
                "_id": "6041c72c0d4024c7b670b13b",
                "pipeline_name": "Hello World example",
              },
              {
                "_id": "6041c72c0d4024c7b670b13e",
                "pipeline_name": "Hello Pipeline 2",
              }
            ],
            "status": 200,
            "status_text": "OK"
          }
        }
      };
      let dataObject = response?.data ? response?.data?.connectedAssets?.data : [];
      if (isMounted?.current === true && dataObject) {
        setListOfPipelines(dataObject);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getTabs = () => {
    if (activeTab == "approval") {
      return ( 
        <ApprovalGatesApprovalTab
          isLoading={isLoading}
          listOfPipelines={listOfPipelines}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          loadData={loadData}
          icon={faDraftingCompass}
        />
      );
    } else if (activeTab == "reject") {
      return (
        <ApprovalGatesRejectTab
          isLoading={isLoading}
          listOfPipelines={listOfPipelines}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          loadData={loadData}
          icon={faDraftingCompass}
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
              tabText={"Approval"}
              handleTabClick={handleTabClick}
              tabName={"approval"}
          />
          <CustomTab
              activeTab={activeTab}
              tabText={"Reject"}
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
      titleText={`Approval Gates`}
      showToasts={true}
      titleIcon={faTable}
      isLoading={false}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        <ApprovalGatesExecutedDataBlocks
          dashboardData={dashboardData}
        />
      </div>
        {listOfPipelines && (
          <div className={"p-3"}>
            <TabPanelContainer currentView={getTabs()} tabContainer={getTabContainer()} />
          </div>)}
    </FullScreenCenterOverlayContainer>
  );
}

ApprovalGatesExecutedActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  request: PropTypes.string,
};

export default ApprovalGatesExecutedActionableInsightOverlay;
