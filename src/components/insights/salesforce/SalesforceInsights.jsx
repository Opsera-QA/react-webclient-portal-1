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

export default function SalesforceInsights() {
  const { toastContext } = useComponentStateReference();

  const handleFlowSelectionButton = (selectedFlow) => {
    console.log(selectedFlow);
    return;
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
              description={"Salesforce Lookup"}
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
              description={"Dependency Analyser"}
              onClickFunction={handleFlowSelectionButton}
            />
            <div className={"d-md-block d-lg-block d-xl-none mb-4"} />
          </Col>
        </Row>
      </div>
    </ScreenContainer>
  );
}
