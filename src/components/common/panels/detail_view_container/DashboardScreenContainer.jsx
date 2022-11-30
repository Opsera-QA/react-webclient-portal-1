import React, {useState} from "react";
import PropTypes from "prop-types";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import ScreenContainerTitleBar from "components/common/fields/ScreenContainerTitleBar";
import {getBreadcrumb, getParentBreadcrumb} from "components/common/navigation/trails";
import ScreenContainerBodyLoadingDialog
  from "components/common/status_notifications/loading/ScreenContainerBodyLoadingDialog";
import TitleActionBarContainer from "components/common/actions/TitleActionBarContainer";
import PublishCustomerDashboardIcon
  from "components/insights/marketplace/dashboards/templates/private/publish/PublishCustomerDashboardIcon";
import PublishPlatformDashboardIcon
  from "components/insights/marketplace/dashboards/templates/platform/PublishPlatformDashboardIcon";
import ToggleSettingsIcon from "components/common/icons/details/ToggleSettingsIcon";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import DashboardEditorPanel from "components/insights/dashboards/dashboard_details/DashboardEditorPanel";
import DashboardViewer from "components/insights/dashboards/dashboard_details/DashboardViewer";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import AddKpiIcon from "components/common/icons/metrics/AddKpiIcon";
import EditDashboardFiltersIcon from "components/common/icons/metrics/EditDashboardFiltersIcon";
import TransferDashboardOwnershipButton
  from "components/common/buttons/insights/ownership/TransferDashboardOwnershipButton";
import DashboardSubscriptionIcon from "components/common/icons/subscription/DashboardSubscriptionIcon";
import useComponentStateReference from "hooks/useComponentStateReference";
import EditDashboardDateIcon from "../../icons/metrics/EditDashboardDateIcon";

function DashboardScreenContainer(
  {
    tab,
    dashboardModel,
    setDashboardModel,
    isLoading,
    loadData,
  }) {
  const [breadcrumb] = useState(getBreadcrumb("dashboardDetails"));
  const [parentBreadcrumb] = useState(getParentBreadcrumb("dashboardDetails"));
  const [activeTab, setActiveTab] = useState(tab  === "settings" ? tab : "viewer");
  const {
    cancelTokenSource,
    getAccessToken,
  } = useComponentStateReference();

  const handleClose = async () => {
    setActiveTab("viewer");
  };

  const handleDelete = async () => {
    return await dashboardsActions.deleteDashboardV2(
      getAccessToken,
      cancelTokenSource,
      dashboardModel,
    );
  };

  const getSettingsIcon = () => {
    if (dashboardModel?.canUpdate() === true) {
      return (
        <ToggleSettingsIcon
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className={"ml-3"}
        />
      );
    }
  };

  const getTitleActionBar = () => {
    if (activeTab !== "settings") {
      return (
        <TitleActionBarContainer>
          <TransferDashboardOwnershipButton
            className={"ml-3"}
            dashboardModel={dashboardModel}
          />
          <AddKpiIcon
            className={"ml-3"}
            dashboardModel={dashboardModel}
            kpis={dashboardModel?.getData("configuration")}
          />
          <PublishCustomerDashboardIcon
            dashboardModel={dashboardModel}
            className={"ml-3"}
          />
          <EditDashboardDateIcon
            dashboardModel={dashboardModel}
            setDashboardModel={setDashboardModel}
            loadData={loadData}
            className={"ml-3"}
          />
          <PublishPlatformDashboardIcon
            dashboardId={dashboardModel?.getMongoDbId()}
            className={"ml-3"}
          />
          <EditDashboardFiltersIcon
            dashboardModel={dashboardModel}
            setDashboardModel={setDashboardModel}
            loadData={loadData}
            className={"ml-3"}
          />
          {getSettingsIcon()}
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
              <DashboardSubscriptionIcon
                dashboardModel={dashboardModel}
                dashboardId={dashboardModel?.getMongoDbId()}
                className={"mr-2"}
                pullSubscriptionStatus={true}
              />
              <ActionBarDeleteButton2
                relocationPath={"/insights"}
                dataObject={dashboardModel}
                handleDelete={handleDelete}
                visible={dashboardModel?.canDelete() === true}
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
      <ScreenContainerTitleBar
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
    <div className={"max-content-width"} style={{ overflowX: "hidden" }}>
      <div className="mb-3">
        <InsightsSubNavigationBar currentTab={"dashboardViewer"} />
      </div>
      <div>
        <div className={"px-2 dashboard-container-header chart-header-name-text title-text-header-1 d-flex"}>
          <div className={"w-100 my-auto"}>
            {getTitleBar()}
          </div>
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