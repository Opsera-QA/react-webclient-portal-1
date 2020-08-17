import React, { useState, useEffect, useContext, useMemo } from "react";
import KpiSummaryPanel from "./KpiSummaryPanel";
import PropTypes from "prop-types";
import KpiDetailPanel from "./KpiDetailPanel";
import { Link, useParams } from "react-router-dom";
import KpiTagsActions from "../kpi-editor-actions";
import { AuthContext } from "contexts/AuthContext";
import ErrorDialog from "components/common/error";

function KpiDetailView() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [kpiData, setKpiData] = useState(undefined);
  const { id } = useParams();
  const [canDelete, setCanDelete] = useState(false);
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used

  useEffect(() => {
    getTag(id);
    getRoles();
  }, []);

  const getTag = async (tagId) => {
    const response = await KpiTagsActions.get(tagId, getAccessToken);
    setKpiData(response.data);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };


  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/admin/kpis">KPI Management</Link>
          </li>
          <li className="breadcrumb-item active">KPI</li>
        </ol>
      </nav>

      {/*TODO: Add isLoading pinwheel*/}
      {kpiData &&
      <div className="content-container content-card-1 max-content-width ml-2">
        <div className="pt-2 pl-2 content-block-header"><h5>KPI Configuration Details [{kpiData.name}]</h5></div>
        {error &&
        <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog></div>}
        <div>
          <div>
            <div>
              <KpiSummaryPanel kpiData={kpiData}/>
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
      }
    </>
  );
}

export default KpiDetailView;