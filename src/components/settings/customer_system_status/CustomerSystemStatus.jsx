import React, { useEffect, useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import customerSystemStatusActions from "components/settings/customer_system_status/customer-system-status-actions";
import StatusLegend from "components/common/status/StatusLegend";
import SystemStatusCard from "components/admin/status/SystemStatusCard";

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

      if (userRoleAccess?.PowerUser || userRoleAccess?.Administrator || userRoleAccess?.OpseraAdministrator) {
        await getSystemStatuses();
      }
    }
  };

  const getSystemStatuses = async () => {
    const response = await customerSystemStatusActions.getSystemStatuses(getAccessToken);
    let data = response?.data ? response.data : [];
    setCustomerSystemStatusData(data);
  };

  const getBody = () => {
    // TODO: When wiring up getBody, style
    if (customerSystemStatusData == null || customerSystemStatusData.length === 0) {
      return (<div className="p-5">Could not pull system statuses</div>);
    }

    return (
      customerSystemStatusData.map((customerSystemStatus, key) => (
          <Col key={key} md={3} sm={6}>
            <SystemStatusCard systemStatus={customerSystemStatus}/>
          </Col>
        )
      )
    );
  };

  if (!accessRoleData) {
    return (<LoadingDialog />);
  }

  return (
    <ScreenContainer
      accessDenied={!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator}
      breadcrumbDestination={"customerSystemStatus"}
      pageDescription={`View the current system status for Customer Tools`}
      isLoading={isLoading}
    >
      <Row className="p-3">
        <Col sm={12} className="p-0">
          <Row>
            <Col sm={6}/>
            <Col sm={6}>
              <StatusLegend/>
            </Col>
          </Row>
        </Col>
        <Col sm={12} className="status-table p-3">
          {/*TODO: Wire up getBody when query is properly working*/}
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
    </ScreenContainer>
  );
}


export default CustomerSystemStatus;