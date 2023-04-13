import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import customerSystemStatusActions from "components/settings/customer_system_status/customer-system-status-actions";
import StatusLegend from "components/common/status/StatusLegend";
import SystemStatusCard from "components/admin/status/SystemStatusCard";
import useComponentStateReference from "hooks/useComponentStateReference";

function CustomerSystemStatus() {
  const [isLoading, setIsLoading] = useState(true);
  const [customerSystemStatusData, setCustomerSystemStatusData] = useState(undefined);
  const {
    toastContext,
    getAccessToken,
    isOpseraAdministrator,
    isSiteAdministrator,
    isPowerUser,
  } = useComponentStateReference();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      if (isOpseraAdministrator !== true && isSiteAdministrator !== true && isPowerUser !== true) {
        return;
      }

      setIsLoading(true);
      await getSystemStatuses();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
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

  if (isOpseraAdministrator !== true && isSiteAdministrator !== true && isPowerUser !== true) {
    return null;
  }

  return (
    <ScreenContainer
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