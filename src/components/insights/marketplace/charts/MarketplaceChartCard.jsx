import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "react-bootstrap";
import { formatDistanceToNowStrict } from "date-fns";
import {faWrench} from "@fortawesome/pro-light-svg-icons";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";
import ViewDashboardDetailsButton from "components/common/buttons/dashboards/ViewChartDetailsButton";

export default function MarketplaceChartCard({ kpi, dashboardId }) {
  const getChartImage = () => {
    const imageUrl = kpi?.thumbnailPath;

    if (imageUrl && imageUrl !== "") {
      return (
        <Card.Img variant="top" className="pt-2 px-2" src={kpi.thumbnailPath} />
      );
    }
  }

  return (
    <Card>
      {getChartImage()}
      <Card.Body>
      <Card.Title>{kpi.name}</Card.Title>
        <Card.Text>
          <span className="overflow-text">
            {kpi.description}
          </span>
        </Card.Text>

        <CustomBadgeContainer>
          {kpi.tools.map((tool, index) => {

            if (index > 8) {
              return;
            }

            return (<CustomBadge key={index} badgeText={capitalizeFirstLetter(tool)} className={"mr-2 mb-1"} icon={faWrench} />);
          })}
        </CustomBadgeContainer>
          <div className={"mt-3 justify-content-between d-flex"}>
            <ViewDashboardDetailsButton dashboardId={dashboardId} marketplaceChart={kpi} />
            <small className="text-muted mt-auto">Last updated {formatDistanceToNowStrict(new Date(kpi.updatedAt))} ago.</small>
          </div>
      </Card.Body>
    </Card>
  )
}

MarketplaceChartCard.propTypes = {
  kpi: PropTypes.object,
  dashboardId: PropTypes.string
};
