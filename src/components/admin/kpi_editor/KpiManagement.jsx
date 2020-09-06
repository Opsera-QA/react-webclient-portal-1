import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import KpiTable from "./KpiTable";
import KpiActions from "./kpi-editor-actions";
import NewKpiModal from "./NewKpiModal";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import {getLoadingErrorDialog} from "../../common/toasts/toasts";

function KpiManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [kpiList, setKpiList] = useState([]);
  const [showKpiModal, setShowKpiModal] = useState(false);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getRoles();
  }, []);

  const getKpis = async () => {
    setIsLoading(true);
    try {
      const response = await KpiActions.getKpis(getAccessToken);
      setKpiList(response.data);
    }
    catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
    setIsLoading(false);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getKpis();
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.OpseraAdministrator || !accessRoleData.Administrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <div className="max-content-width">
      <BreadcrumbTrail destination={"kpiManagement"}/>
      {showToast && toast}
      <h5>KPI Management</h5>
      <div className="text-muted">Listed below are registered charts for the Analytics platform. Each chart or KPI
        corresponds to a data point in the analytics platform.
      </div>
      <div className="text-right my-1">
        <Button variant="primary" size="sm"
                onClick={() => {
                  setShowKpiModal(true);
                }}>
          <FontAwesomeIcon icon={faPlus} className="mr-1"/>New KPI
        </Button>
      </div>
      <div className="full-height">
        {kpiList && <KpiTable data={kpiList} isLoading={isLoading}/>}
      </div>
      <NewKpiModal showModal={showKpiModal} setShowModal={setShowKpiModal} loadData={getKpis}/>
    </div>
  );
}


export default KpiManagement;