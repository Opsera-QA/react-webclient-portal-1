import React, {useContext} from "react";
import BreadcrumbPageLink from "components/common/links/BreadcrumbPageLink";
import Row from "react-bootstrap/Row";
import {AuthContext} from "contexts/AuthContext";

function UserReports() {
  const { isSassUser, featureFlagHideItemInProd } = useContext(AuthContext);

  if (featureFlagHideItemInProd() || isSassUser() !== false) {
    return null;
  }

  return (
    <Row className="ml-3">
      <BreadcrumbPageLink breadcrumbDestination={"groupMembershipReport"}/>
      <BreadcrumbPageLink breadcrumbDestination={"pipelineOwnershipReport"}/>
      <BreadcrumbPageLink breadcrumbDestination={"toolOwnershipReport"}/>
      <BreadcrumbPageLink breadcrumbDestination={"taskOwnershipReport"}/>
      <BreadcrumbPageLink breadcrumbDestination={"consolidatedUserReport"}/>
    </Row>
  );
}

export default UserReports;

