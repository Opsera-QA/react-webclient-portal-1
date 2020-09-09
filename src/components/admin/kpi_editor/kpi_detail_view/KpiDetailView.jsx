import React, { useState, useEffect, useContext, useMemo } from "react";
import KpiSummaryPanel from "./KpiSummaryPanel";
import KpiDetailPanel from "./KpiDetailPanel";
import { Link, useParams } from "react-router-dom";
import KpiTagsActions from "../kpi-editor-actions";
import { AuthContext } from "contexts/AuthContext";
import ErrorDialog from "components/common/status_notifications/error";
import Model from "../../../../core/data_model/model";
import kpiMetaData from "./kpi-form-fields";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import {faFileInvoice} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function KpiDetailView() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [kpiData, setKpiData] = useState(undefined);
  const { id } = useParams();
  const [canDelete, setCanDelete] = useState(false);
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used

  useEffect(() => {
    getRoles();
  }, []);

  const getKpi = async (tagId) => {
    const response = await KpiTagsActions.get(tagId, getAccessToken);
    setKpiData(new Model(response.data, kpiMetaData, false));
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getKpi(id);
    }
  };

  return (
    <>
      <BreadcrumbTrail destination={"kpiDetailView"}/>
      <div className="content-container content-card-1 max-content-width ml-2">
        <div className="pt-2 pl-2 content-block-header">
          <h5><FontAwesomeIcon icon={faFileInvoice} fixedWidth className="mr-1" />KPI Configuration Details [{kpiData && kpiData.name}]</h5>
        </div>
        {error &&
        <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog></div>}
        <div>
          <div>
            <div>
              <KpiSummaryPanel kpiData={kpiData} setKpiData={setKpiData}/>
            </div>
            <div>
              <KpiDetailPanel
                setKpiData={setKpiData}
                kpiData={kpiData}
                canDelete={canDelete}/>
            </div>
          </div>
        </div>
        <div className="content-block-footer" />
      </div>
    </>
  );
}

export default KpiDetailView;