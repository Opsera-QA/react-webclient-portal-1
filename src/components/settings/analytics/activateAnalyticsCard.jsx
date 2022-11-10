import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { faChartNetwork } from "@fortawesome/pro-light-svg-icons";
import TitleBar from "components/common/fields/TitleBar";
import { DialogToastContext } from "contexts/DialogToastContext";

function AnalyticsProfileSettings() {
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);

  const goToAnalytics = () => {
    history.push(`/settings/analytics-profile`);
  };

  return (
    <>
      <div className="content-container content-card-analytics">
        <div className={"pl-2 content-block-header title-text-header-2 d-flex"}>
          <div className={"my-auto w-100"}>
            <TitleBar titleIcon={faChartNetwork} title={"Activate Opsera Analytics"} />
          </div>
        </div>
        {toastContext.getInlineBanner()}
        <div className="p-3 shaded-container">
          <Card.Text>
            Please activate Opsera Analytics by visiting our analytics profile settings page using the link below:
          </Card.Text>
          <Button
            onClick={() => {
              goToAnalytics();
            }}
            variant="primary"
          >
            Analytics Settings
          </Button>
        </div>
        <div className="content-block-footer" />
      </div>
      <br />
    </>
  );
}

export default AnalyticsProfileSettings;
