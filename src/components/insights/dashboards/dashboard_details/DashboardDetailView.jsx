import React, {useContext, useState, useEffect} from "react";
import Model from "core/data_model/model";
import {useHistory} from "react-router-dom";
import {useParams} from "react-router-dom";
import LoadingDialog from "components/common/status_notifications/loading";
import {faArrowLeft, faAnalytics, faCogs} from "@fortawesome/pro-light-svg-icons";
import FavoriteInput from "components/common/inputs/boolean/FavoriteInput";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import DashboardEditorPanel from "components/insights/dashboards/dashboard_details/DashboardEditorPanel";
import DashboardViewer from "components/insights/dashboards/dashboard_details/DashboardViewer";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import ScreenContainer from "components/common/panels/general/ScreenContainer";

function DashboardDetailView() {
  const {tab, id} = useParams();
  const [activeTab, setActiveTab] = useState("viewer");
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const [dashboardData, setDashboardData] = useState(undefined);
  const {getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getDashboard();
    if (tab) {
      setActiveTab(tab);
    }
  }

  const handleTabClick = (tabSelection) => async e => {
    e.preventDefault();

    if (tabSelection === "dashboards") {
      history.push(`/insights/dashboards`);
      return;
    }

    setActiveTab(tabSelection);

    if (tab !== tabSelection) {
      history.push(`/insights/dashboards/${id}/${tabSelection}`);
    }
  };

  const getDashboard = async () => {
    try {
      const response = await dashboardsActions.get(id, getAccessToken);
      if (response?.data) {
        setDashboardData(new Model(response.data, dashboardMetadata, false));
      }
    } catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (<LoadingDialog size="md" message={"Loading dashboard..."}/>);
  }

  const handleDelete = async () => {
    return await dashboardsActions.delete(dashboardData, getAccessToken);
  }

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div/>
        <div className="d-inline-flex float-right">
          <FavoriteInput dataObject={dashboardData} setDataObject={setDashboardData} fieldName={"isFavorite"}/>
          <ActionBarDeleteButton2
            relocationPath={"/insights/dashboards"}
            dataObject={dashboardData}
            handleDelete={handleDelete}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const getTabView = () => {
    if (activeTab === "viewer") {
      return (
        <DashboardViewer
          dashboardData={dashboardData}
          breadcrumbDestination={"dashboardDetails"}
          managementViewLink={"/insights/dashboards"}
          managementTitle={"Dashboards"}
          type={"Dashboard"}
        />
      );
    }
    if (activeTab === "settings") {
      return (
        <DetailScreenContainer
          breadcrumbDestination={"dashboardDetails"}
          metadata={dashboardMetadata}
          dataObject={dashboardData}
          isLoading={isLoading}
          actionBar={getActionBar()}
          detailPanel={<DashboardEditorPanel dashboardData={dashboardData} setDashboardData={setDashboardData}/>}
        />
      );
    }
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab tabName={"dashboards"} icon={faArrowLeft} tabText={"Dashboards"} handleTabClick={handleTabClick}
                       activeTab={activeTab}/>
        <NavigationTab tabName={"viewer"} icon={faAnalytics} tabText={"Viewer"} handleTabClick={handleTabClick}
                       activeTab={activeTab}/>
        <NavigationTab tabName={"settings"} icon={faCogs} tabText={"Settings"} handleTabClick={handleTabClick}
                       activeTab={activeTab}/>
      </NavigationTabContainer>
    )
  };

  if (activeTab === "settings") {
    return (
      <DetailScreenContainer
        breadcrumbDestination={"dashboardDetails"}
        metadata={dashboardMetadata}
        dataObject={dashboardData}
        navigationTabContainer={getNavigationTabContainer()}
        isLoading={isLoading}
        actionBar={getActionBar()}
        detailPanel={<DashboardEditorPanel dashboardData={dashboardData} setDashboardData={setDashboardData}/>}
      />
    );
  }

  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={"dashboardDetails"}
      metadata={dashboardMetadata}
    >
      {getTabView()}
    </ScreenContainer>
  )
}

export default DashboardDetailView;