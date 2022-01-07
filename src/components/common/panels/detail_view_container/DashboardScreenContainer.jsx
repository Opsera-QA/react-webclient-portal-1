import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import TitleBar from "components/common/fields/TitleBar";
import {getBreadcrumb, getParentBreadcrumb} from "components/common/navigation/trails";
import ScreenContainerBodyLoadingDialog
  from "components/common/status_notifications/loading/ScreenContainerBodyLoadingDialog";
import TitleActionBarContainer from "components/common/actions/TitleActionBarContainer";
import PublishDashboardToPrivateCatalogIcon
  from "components/common/icons/dashboards/PublishDashboardToPrivateCatalogIcon";
import PublishDashboardToPublicMarketplaceIcon
  from "components/common/icons/dashboards/PublishDashboardToPublicMarketplaceIcon";
import ToggleSettingsIcon from "components/common/icons/details/ToggleSettingsIcon";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import FavoriteInput from "components/common/inputs/boolean/FavoriteInput";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import DashboardEditorPanel from "components/insights/dashboards/dashboard_details/DashboardEditorPanel";
import DashboardViewer from "components/insights/dashboards/dashboard_details/DashboardViewer";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import AddKpiIcon from "components/common/icons/metrics/AddKpiIcon";

function DashboardScreenContainer(
  {
    tab,
    dashboardModel,
    setDashboardModel,
    isLoading,
    loadData,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [breadcrumb] = useState(getBreadcrumb("dashboardDetails"));
  const [parentBreadcrumb] = useState(getParentBreadcrumb("dashboardDetails"));
  const [activeTab, setActiveTab] = useState(tab  === "settings" ? tab : "viewer");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const handleClose = async () => {
    setActiveTab("viewer");
  };

  const handleDelete = async () => {
    return await dashboardsActions.deleteDashboardV2(getAccessToken, cancelTokenSource, dashboardModel);
  };

  const getTitleActionBar = () => {
    if (activeTab !== "settings") {
      return (
        <TitleActionBarContainer>
          <AddKpiIcon
            className={"mr-3"}
            dashboardModel={dashboardModel}
            kpis={dashboardModel?.getData("configuration")}
          />
          <PublishDashboardToPrivateCatalogIcon
            dashboardData={dashboardModel}
            className={"mr-3"}
          />
          <PublishDashboardToPublicMarketplaceIcon
            dashboardData={dashboardModel}
            className={"mr-3"}
          />
          <ToggleSettingsIcon
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </TitleActionBarContainer>
      );
    }
  };

  const getActionBar = () => {
    if (dashboardModel != null && activeTab === "settings") {
      return (
        <div className="mb-1">
          <ActionBarContainer>
            <div/>
            <div className="d-inline-flex float-right">
              <FavoriteInput dataObject={dashboardModel} setDataObject={setDashboardModel} fieldName={"isFavorite"}/>
              <ActionBarDeleteButton2
                relocationPath={"/insights"}
                dataObject={dashboardModel}
                handleDelete={handleDelete}
              />
            </div>
          </ActionBarContainer>
        </div>
      );
    }

    return null;
  };


  const getTitleBar = () => {
    const activeField = dashboardModel?.getActiveField();
    return (
      <TitleBar
        isLoading={isLoading}
        parentBreadcrumb={parentBreadcrumb}
        titleIcon={breadcrumb?.icon}
        title={dashboardModel?.getDetailViewTitle()}
        inactive={activeField ? dashboardModel?.getData(activeField) === false : false}
        titleActionBar={activeTab !== "settings" ? getTitleActionBar() : undefined}
      />
    );
  };

  const getBody = () => {
    if (isLoading) {
      return (
        <ScreenContainerBodyLoadingDialog />
      );
    }

    if (activeTab === "settings") {
      return (
        <div>
          {getActionBar()}
          <div>
            <DashboardEditorPanel
              dashboardData={dashboardModel}
              setDashboardData={setDashboardModel}
              handleClose={handleClose}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={"shaded-container"}>
        {getActionBar()}
        <div>
          <DashboardViewer
            dashboardModel={dashboardModel}
            setDashboardModel={setDashboardModel}
            breadcrumbDestination={"dashboardDetails"}
            managementViewLink={"/insights"}
            managementTitle={"Dashboards"}
            type={"Dashboard"}
            loadData={loadData}
          />
        </div>
      </div>
    );
  };

  if (!isLoading && dashboardModel == null) {
    return (
      <AccessDeniedContainer
        navigationTabContainer={<InsightsSubNavigationBar currentTab={"dashboardViewer"} />}
      />
    );
  }

  return (
    <div className="max-content-width ml-2 max-content-height scroll-y" style={{ overflowX: "hidden" }}>
      <div className="mb-3">
        {<InsightsSubNavigationBar currentTab={"dashboardViewer"} />}
      </div>
      <div>
        <div className="px-2 dashboard-container-header chart-header-name-text title-text-header-1">
          {getTitleBar()}
        </div>
        <div className={tab === "settings" ? `detail-container-body` : `detail-container-body dashboard-screen-container-body mb-2`}>
          {getBody()}
        </div>
      </div>
    </div>
  );
}

DashboardScreenContainer.propTypes = {
  tab: PropTypes.string,
  dashboardModel: PropTypes.object,
  setDashboardModel: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
};

export default DashboardScreenContainer;