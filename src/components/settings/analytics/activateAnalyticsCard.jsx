import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DetailScreenTitleBar from "../../common/panels/detail_view_container/DetailScreenTitleBar";
import { faChartNetwork } from "@fortawesome/pro-light-svg-icons";

function AnalyticsProfileSettings() {
  const history = useHistory();

  const goToAnalytics = () => {
    history.push(`/settings/analytics-profile`);
  };

  return (
    <>
      <div className="content-container content-card-analytics">
        <div className="pt-2 pl-2 content-block-header">
          <h5>
            <DetailScreenTitleBar titleIcon={faChartNetwork} title={"Activate Opsera Analytics"} />
          </h5>
        </div>
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
