import React, { useEffect, useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import customerSystemStatusActions from "./customer-system-status-actions";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import SystemStatusCard from "./SystemStatusCard";
import StatusLegend from "../../common/status/StatusLegend";

function CustomerSystemStatus() {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken, getUserRecord, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [customerSystemStatusData, setCustomerSystemStatusData] = useState(undefined);

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

    await getSystemStatuses();
  };

  const getSystemStatuses = async () => {
    const response = await customerSystemStatusActions.getSystemStatuses(getAccessToken);
    let data = response.data ? response.data : [];
    setCustomerSystemStatusData(data);
  }

  if (isLoading) {
    return (<LoadingDialog />);
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <div className="mt-3 max-content-width">
      <BreadcrumbTrail destination="customerSystemStatus" />
      <h5>Customer System Status</h5>
      <div>Listed below are Customer tools for Opsera.</div>
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
            {customerSystemStatusData && customerSystemStatusData.map((customerSystemStatus, key) => (
              <Col key={key} md={3} sm={6}>
                <SystemStatusCard systemStatus={customerSystemStatus}/>
              </Col>
            ))
            }
          </Row>
        </Col>
      </Row>
    </div>
  );
}


export default CustomerSystemStatus;