import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FreeTrialLaunchSalesforceWorkflowWizardOverlay
  from "components/wizard/free_trial/workflows/flows/salesforce/FreeTrialLaunchSalesforceWorkflowWizardOverlay";

const EXTERNAL_LINKS = {
  YOUTUBE_CHANNEL: "https://youtube.com/channel/UCJJFTWPkGfK8Kq4nPbNAtaQ",
  LINKEDIN: "https://www.linkedin.com/company/opsera/",
  FACEBOOK: "https://www.facebook.com/opseraio/",
  TWITTER: "https://twitter.com/opseraio",
  SALESFORCE_APPEXCHANGE: "https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3u00000PGa51EAD",
};

export default function SoftwareDevelopmentSalesforceLandingWidget({ className }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchWorkflowCreationWizard = () => {
    toastContext.showOverlayPanel(
      <FreeTrialLaunchSalesforceWorkflowWizardOverlay
      />,
    );
  };

  const handleClick = (url) => e => {
    //window.location.href = url;
    window.open(url, "_blank");
  };

  return (
    <div className={className} style={{ minHeight: "150px", width: "90%" }}>

      <Row className={"m-3"}>
        <Col style={{ textAlign: "center" }}>
          <TooltipWrapper
            innerText={"Get started with Salesforce on Opsera!"}
            placement={"bottom"}
          >
            <div className={"pointer focusText"}
                 onClick={launchWorkflowCreationWizard}>
              <img alt="Get started with Salesforce on Opsera!"
                   src="/img/salesforce/salesforce_logo_white_475x332.png"
                   width="220"
                   height="154"
                   style={{ marginRight: "10px" }}
              />
              Get Started by clicking here!
            </div>
          </TooltipWrapper>
        </Col>
        <Col>

          <div className={"h-100"} style={{ textAlign: "center", paddingTop: "50px", paddingLeft: "50px" }}>
            <TooltipWrapper
              innerText={"Opsera is available on Salesforce AppExchange!"}
              placement={"bottom"}
            >
              <div>
                <span className={"focusText"}>Opsera On</span>
                <img alt="Opsera is available on Salesforce AppExchange!"
                     src="/img/salesforce/salesforce_appexchange_240x80.png"
                     width="240"
                     height="80"
                     onClick={handleClick(EXTERNAL_LINKS.SALESFORCE_APPEXCHANGE)}
                     className={"pointer"}
                />
              </div>
            </TooltipWrapper>
          </div>
        </Col>
      </Row>


    </div>
  );
}

SoftwareDevelopmentSalesforceLandingWidget.propTypes = {
  className: PropTypes.string,
};