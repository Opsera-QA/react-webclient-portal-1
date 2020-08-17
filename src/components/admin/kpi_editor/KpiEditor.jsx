import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import KpiTable from "./KpiTable";
import KpiActions from "./kpi-editor-actions";
import NewKpiModal from "./NewKpiModal";
import LoadingDialog from "components/common/loading";
import AccessDeniedDialog from "components/common/accessDeniedInfo";

function KpiEditor() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [ pageLoading, setPageLoading ] = useState(true);
  const [ KpiList, setKpiList ] = useState([]);
  const [showTagModal, setShowTagModal] = useState(false);

  useEffect(() => {
    getRoles();
    getTags();
  }, []);

  const getTags = async () => {
    setPageLoading(true)
    const response = await KpiActions.getKpis(getAccessToken);
    console.log(response.data)
    setKpiList(response.data);
    setPageLoading(false)
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const onModalClose = () => {
    getTags();
    setShowTagModal(false);
  };  

  const createTag = () => {
    setShowTagModal(true);
  };

  if (!accessRoleData || pageLoading) {
    return (<LoadingDialog size="sm"/>);
  } else if (!accessRoleData.OpseraAdministrator || !accessRoleData.Administrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  } else {

    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
            <li className="breadcrumb-item">
              <Link to="/admin">Admin</Link>
            </li>
            <li className="breadcrumb-item active">KPI Editor</li>
          </ol>
        </nav>
          <div className="justify-content-between mb-1 d-flex">
            <h5>KPI Management</h5>
            <div className="text-right">
              <Button variant="primary" size="sm"
                      onClick={() => {
                        createTag();
                      }}>
                <FontAwesomeIcon icon={faPlus} className="mr-1"/>New KPI
              </Button>
              <br/>
            </div>
          </div>

          <div className="full-height">
            {KpiList && <KpiTable data={KpiList}/>}
          </div>

          {showTagModal ? <NewKpiModal
            showModal={showTagModal}
            onModalClose={onModalClose}/> : null}

      </div>
    );
  }

}


export default KpiEditor;