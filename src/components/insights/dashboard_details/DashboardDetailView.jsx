import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Model from "../../../core/data_model/model";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faAnalytics, faCogs } from "@fortawesome/pro-light-svg-icons";
import DashboardViewer from "./DashboardViewer";
import DashboardEditorPanel from "./DashboardEditorPanel";
import DetailScreenContainer from "../../common/panels/detail_view_container/DetailScreenContainer";
import dashboardsActions from "../dashboards-actions";
import dashboardMetadata from "../dashboard-metadata";
import ActionBarContainer from "../../common/actions/ActionBarContainer";
import ActionBarDeleteButton2 from "../../common/actions/buttons/ActionBarDeleteButton2";
import FavoriteInput from "../../common/inputs/FavoriteInput";

function DashboardDetailView() {
    const { tab, id } = useParams();
    const [activeTab, setActiveTab] = useState("viewer");
    const history = useHistory();
    const toastContext = useContext(DialogToastContext);
    const [dashboardData, setDashboardData] = useState(undefined);
    const { getAccessToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getDashboard();
        if (tab) {
            setActiveTab(tab);
          }
      }, []);

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
          console.log(response);
          if (response != null && response.data) {
            setDashboardData(new Model(response.data, dashboardMetadata, false));
          }
        } catch (error) {
          if (!error?.error?.message?.includes(404)) {
            toastContext.showLoadingErrorDialog(error);
          }
        }
        finally {
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
          <FavoriteInput dataObject={dashboardData} setDataObject={setDashboardData} fieldName={"isFavorite"} /> 
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
        breadcrumbDestination={"dashboardViewer"}
        managementViewLink={"/insights/dashboards"}
        managementTitle={"Dashboards"}
        type={"Dashboard"}
        />
        );
      }
      if (activeTab === "settings") {
        return (
        <DetailScreenContainer
        breadcrumbDestination={"dashboardViewer"}
        title={dashboardData != null ? `${dashboardData.getData("name")}` : undefined}
        managementViewLink={"/insights/dashboards"}
        managementTitle={"Dashboards"}
        type={"Dashboard"}
        titleIcon={faAnalytics}
        dataObject={dashboardData}
        isLoading={isLoading}
        activeField={"active"}
        actionBar={getActionBar()}
        detailPanel={<DashboardEditorPanel dashboardData={dashboardData} setDashboardData={setDashboardData} /> }
      />
        );
      }
    };

    return (
      <div>
        <div className="title-text-5 mb-2">{dashboardData != null ? `${dashboardData.getData("name")}` : undefined}</div>
          <div className="alternate-tabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className={"nav-link"} href="#" onClick={handleTabClick("dashboards")}>
                     <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>Dashboards</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (activeTab === "viewer" ? "active" : "")} href="#" onClick={handleTabClick("viewer")}>
                  <FontAwesomeIcon icon={faAnalytics} className="mr-2"/>Viewer</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (activeTab === "settings" ? "active" : "")} href="#" onClick={handleTabClick("settings")}>
                  <FontAwesomeIcon icon={faCogs} className="mr-2"/>Settings</a>
              </li>
            </ul>
          </div>
          {getTabView()}
      </div>
    )
}

export default DashboardDetailView;