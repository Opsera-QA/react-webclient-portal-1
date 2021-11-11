import React, {useContext, useState, useEffect, useRef} from "react";
import Model from "core/data_model/model";
import {useParams} from "react-router-dom";
import FavoriteInput from "components/common/inputs/boolean/FavoriteInput";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import ActionBarShowJsonButton from "components/common/actions/buttons/ActionBarShowJsonButton";
import DashboardEditorPanel from "components/insights/dashboards/dashboard_details/DashboardEditorPanel";
import DashboardViewer from "components/insights/dashboards/dashboard_details/DashboardViewer";
import TitleActionBarContainer from "components/common/actions/TitleActionBarContainer.jsx";
import ToggleSettingsIcon from "components/common/icons/details/ToggleSettingsIcon.jsx";
import axios from "axios";
import PublishDashboardToPrivateCatalogIcon
  from "components/common/icons/dashboards/PublishDashboardToPrivateCatalogIcon";
import PublishDashboardToPublicMarketplaceIcon
  from "components/common/icons/dashboards/PublishDashboardToPublicMarketplaceIcon";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import DashboardScreenContainer from "components/common/panels/detail_view_container/DashboardScreenContainer";

function DashboardDetailView() {
  const {tab, id} = useParams();
  const [activeTab, setActiveTab] = useState(tab  === "settings" ? tab : "viewer");
  const toastContext = useContext(DialogToastContext);
  const [dashboardData, setDashboardData] = useState(undefined);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      await getRoles(cancelSource);
    } catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getDashboard(cancelSource);
    }
  };

  const getDashboard = async (cancelSource = cancelTokenSource) => {
    const response = await dashboardsActions.getDashboardByIdV2(getAccessToken, cancelSource, id);

    if (isMounted.current === true && response?.data) {
      setDashboardData(new Model(response.data, dashboardMetadata, false));
    }
  };

  const handleDelete = async () => {
    return await dashboardsActions.delete(dashboardData, getAccessToken);
  };

  const handleClose = async () => {
    setActiveTab("viewer");
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        {accessRoleData?.OpseraAdministrator === true && <ActionBarShowJsonButton dataObject={dashboardData} />}
        <div/>
        <div className="d-inline-flex float-right">
          <FavoriteInput dataObject={dashboardData} setDataObject={setDashboardData} fieldName={"isFavorite"}/>
          <ActionBarDeleteButton2
            relocationPath={"/insights"}
            dataObject={dashboardData}
            handleDelete={handleDelete}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const getTitleActionBar = () => {
    return (
      <TitleActionBarContainer>
        <PublishDashboardToPrivateCatalogIcon dashboardData={dashboardData} className={"mr-3"} />
        <PublishDashboardToPublicMarketplaceIcon dashboardData={dashboardData} className={"mr-3"} />
        <ToggleSettingsIcon activeTab={activeTab} setActiveTab={setActiveTab}/>
      </TitleActionBarContainer>
    );
  };

  if (activeTab === "settings") {
    return (
      <DashboardScreenContainer
        breadcrumbDestination={"dashboardDetails"}
        metadata={dashboardMetadata}
        dataObject={dashboardData}
        navigationTabContainer={<InsightsSubNavigationBar currentTab={"dashboardViewer"} />}
        isLoading={isLoading}
        actionBar={getActionBar()}
        detailPanel={<DashboardEditorPanel dashboardData={dashboardData} setDashboardData={setDashboardData} handleClose={handleClose}/>}
      />
    );
  }

  return (
    <DashboardScreenContainer
      dataObject={dashboardData}
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"dashboardViewer"} />}
      breadcrumbDestination={"dashboardDetails"}
      isLoading={isLoading}
      metadata={dashboardMetadata}
      titleActionBar={getTitleActionBar()}
      detailPanel={<DashboardViewer
        dashboardData={dashboardData}
        breadcrumbDestination={"dashboardDetails"}
        managementViewLink={"/insights"}
        managementTitle={"Dashboards"}
        type={"Dashboard"}
      />}
      />
  );
}

export default DashboardDetailView;