import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "react-bootstrap";
import { formatDistanceToNowStrict } from "date-fns";
import {faWrench} from "@fortawesome/pro-light-svg-icons";
import {capitalizeFirstLetter, hasStringValue} from "components/common/helpers/string-helpers";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";
import ViewChartDetailsButton from "components/common/buttons/dashboards/ViewChartDetailsButton";
import {faList} from "@fortawesome/pro-solid-svg-icons";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function MarketplaceChartCard(
  {
    kpi,
    dashboardId,
    toolIdentifiers,
  }) {
  const kpiTools = DataParsingHelper.parseNestedArray(kpi, "tools", []);
  const parsedToolIdentifiers = DataParsingHelper.parseArray(toolIdentifiers, []);

  const getChartImage = () => {
    const imageUrl = kpi?.thumbnailPath;

    if (imageUrl && imageUrl !== "") {
      return (
        <Card.Img variant="top" className="pt-2 px-2" src={kpi.thumbnailPath} />
      );
    }
  };

  const getToolsField = () => {
    if (kpiTools.length > 0 && parsedToolIdentifiers.length > 0) {
      return (
        <CustomBadgeContainer>
          {kpi.tools.map((tool, index) => {

            if (index > 8) {
              return;
            }

            return (
              <CustomBadge
                key={index}
                badgeText={getToolIdentifierName(tool)}
                className={"mr-2 mb-1"}
                icon={faWrench}
              />
            );
          })}
        </CustomBadgeContainer>
      );
    }
  };

  const getToolIdentifierName = (toolIdentifier) => {
    if (parsedToolIdentifiers.length > 0 && hasStringValue(toolIdentifier)) {
      const foundToolIdentifier = parsedToolIdentifiers.find((identifier) => toolIdentifier === identifier?.identifier);

      if (foundToolIdentifier) {
        return foundToolIdentifier?.name;
      }

      return capitalizeFirstLetter(toolIdentifier);
    }
  };

  const getCategoriesField = () => {
    if (kpi.category?.length > 0) {
      return (
        <CustomBadgeContainer>
          {kpi.category.map((category, index) => {

            if (index > 8) {
              return;
            }

            return (<CustomBadge key={index} badgeText={capitalizeFirstLetter(category)} className={"mr-2 mb-1"} icon={faList} />);
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
  dashboardId: PropTypes.string,
  toolIdentifiers: PropTypes.array,
};
