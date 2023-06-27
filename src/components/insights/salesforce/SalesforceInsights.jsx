import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceInsightsOptionCardBase, {
  SALESFORCE_INSIGHTS_TYPES,
  SALESFORCE_INSIGHTS_TYPE_LABELS,
} from "components/insights/salesforce/SalesforceInsightsOptionCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import ScreenContainer from "../../common/panels/general/ScreenContainer";
import InsightsSubNavigationBar from "../InsightsSubNavigationBar";
import { useHistory } from "react-router-dom";

export default function SalesforceInsights() {
  const { toastContext } = useComponentStateReference();
  const history = useHistory();
  const handleFlowSelectionButton = (selectedFlow) => {
    switch (selectedFlow) {
      case SALESFORCE_INSIGHTS_TYPES.LOOKUP:
        history.push(`/insights/salesforce/lookup`);
        return;
      case SALESFORCE_INSIGHTS_TYPES.DEPENDENCY_ANALYSER:
        history.push(`/insights/salesforce/dependency-analyser`);
        return;
      default:
        return;
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={
        <InsightsSubNavigationBar currentTab={"salesforce"} />
      }
      breadcrumbDestination={"salesforce"}
    >
      <div className={"m-4"}>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={4}
          >
            <SalesforceInsightsOptionCardBase
              option={SALESFORCE_INSIGHTS_TYPES.LOOKUP}
              description={"Monitor and analyze detailed performance data, including pipeline runs, unit tests, and validation information, to view encapsulated data of component deployments in Salesforce Pipelines."}
              onClickFunction={handleFlowSelectionButton}
            />
            <div className={"d-md-block d-lg-block d-xl-none mb-2"} />
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={4}
          >
            <div className={"d-sm-block d-md-none d-lg-none d-xl-none mt-4"} />
            <SalesforceInsightsOptionCardBase
              option={SALESFORCE_INSIGHTS_TYPES.DEPENDENCY_ANALYSER}
              description={"Use this tool to identify dependencies in Apex classes, Lightning components, and more. It is helpful for reviewing dependencies and conducting impact analysis as needed."}
              onClickFunction={handleFlowSelectionButton}
            />
            <div className={"d-md-block d-lg-block d-xl-none mb-4"} />
          </Col>
        </Row>
      </div>
    </ScreenContainer>
  );
}