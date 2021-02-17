import React, {useContext, useState, useEffect, useRef} from "react";
import Model from "core/data_model/model";
import {useHistory} from "react-router-dom";
import {useParams} from "react-router-dom";
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
import axios from "axios";

function DashboardDetailView() {
  const {tab, id} = useParams();
  const [activeTab, setActiveTab] = useState(tab  === "settings" ? tab : "viewer");
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const [dashboardData, setDashboardData] = useState(undefined);
  const {getAccessToken} = useContext(AuthContext);
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
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      await getDashboard(cancelSource);
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

  const getDashboard = async (cancelSource = cancelTokenSource) => {
    const response = await dashboardsActions.getDashboardByIdV2(getAccessToken, cancelSource, id);

    if (isMounted.current === true && response?.data) {
      setDashboardData(new Model(response.data, dashboardMetadata, false));
    }
  };

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
      isLoading={isLoading}
      metadata={dashboardMetadata}
    >
      <DashboardViewer
        dashboardData={dashboardData}
        breadcrumbDestination={"dashboardDetails"}
        managementViewLink={"/insights/dashboards"}
        managementTitle={"Dashboards"}
        type={"Dashboard"}
      />
    </ScreenContainer>
  )
}

export default DashboardDetailView;