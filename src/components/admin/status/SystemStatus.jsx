import React, { useEffect, useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import systemStatusActions from "./system-status-actions";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import SystemStatusCard from "./SystemStatusCard";
import StatusLegend from "../../common/status/StatusLegend";

function SystemStatus() {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken, getUserRecord, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [systemStatusData, setSystemStatusData] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
    if (userRoleAccess.OpseraAdministrator) {
      await getSystemStatuses();
    }
  };

  const getSystemStatuses = async () => {
    const response = await systemStatusActions.getSystemStatuses(getAccessToken);
    let data = response.data && response.data.message ? response.data.message : [];
    setSystemStatusData(data);
  }

  console.log(systemStatusData);

  if (isLoading) {
    return (<LoadingDialog />);
  }

  if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <div className="mt-3 max-content-width">
      <BreadcrumbTrail destination="systemStatus"/>
      <h5>System Status</h5>
      <div>Listed below are system tools for Opsera.</div>
      <Row>
        <Col sm={12} className="p-0">
          <Row>
            <Col sm={6}/>
            <Col sm={6}>
              <StatusLegend/>
            </Col>
          </Row>
        </Col>
        <Col sm={12} className="status-table p-3">
          <Row>
            {systemStatusData && systemStatusData.map((systemStatus, key) => (
              systemStatus.instance && systemStatus.instance[0] && systemStatus.instance[0].status ?
              <Col key={key} md={3} sm={6}>
                <SystemStatusCard systemStatus={systemStatus}/>
              </Col> : null
            ))
            }
          </Row>
        </Col>
      </Row>
    </div>
  );
}


export default SystemStatus;