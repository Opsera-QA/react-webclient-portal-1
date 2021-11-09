import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "react-bootstrap";
import { formatDistanceToNowStrict } from "date-fns";
import {faWrench} from "@fortawesome/pro-light-svg-icons";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";
import ViewChartDetailsButton from "components/common/buttons/dashboards/ViewChartDetailsButton";
import {faList} from "@fortawesome/pro-solid-svg-icons";

export default function MarketplaceChartCard({ kpi, dashboardId }) {
  const getChartImage = () => {
    const imageUrl = kpi?.thumbnailPath;

    if (imageUrl && imageUrl !== "") {
      return (
        <Card.Img variant="top" className="pt-2 px-2" src={kpi.thumbnailPath} />
      );
    }
  };

  const getToolsField = () => {
    if (kpi.tools?.length > 0) {
      return (
        <CustomBadgeContainer>
          {kpi.tools.map((tool, index) => {

            if (index > 8) {
              return;
            }

            return (<CustomBadge key={index} badgeText={capitalizeFirstLetter(tool)} className={"mr-2 mb-1"} icon={faWrench} />);
          })}
        </CustomBadgeContainer>
      );
    }
  };

  const getCategoriesField = () => {
    if (kpi.category?.length > 0) {
      return (
        <CustomBadgeContainer>
          {kpi.category.map((tool, index) => {

            if (index > 8) {
              return;
            }

            return (<CustomBadge key={index} badgeText={capitalizeFirstLetter(tool)} className={"mr-2 mb-1"} icon={faList} />);
          })}
        </CustomBadgeContainer>
      );
    }
  };

  return (
    <Card className={"marketplace-chart-card"}>
      {getChartImage()}
      <Card.Body>
        <Card.Title>{kpi.name}</Card.Title>
        <Card.Text>
          <span className="overflow-text">
            {kpi.description}
          </span>
        </Card.Text>
        {getToolsField()}
        {getCategoriesField()}
        <div className={"mt-3 justify-content-between d-flex"}>
          <ViewChartDetailsButton
            dashboardId={dashboardId}
            marketplaceChart={kpi}
            className={"mr-3"}
          />
          <div className={"mt-auto"}>
            <small className="text-muted">
              Last updated {formatDistanceToNowStrict(new Date(kpi.updatedAt))} ago.
            </small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

MarketplaceChartCard.propTypes = {
  kpi: PropTypes.object,
  dashboardId: PropTypes.string
};
