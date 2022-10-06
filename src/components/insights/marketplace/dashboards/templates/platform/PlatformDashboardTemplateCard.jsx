import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { faClipboard, faTag, faUsers } from "@fortawesome/pro-light-svg-icons";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";
import AddDashboardTemplateButton from "components/common/buttons/dashboards/AddDashboardButton";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";
import ActionBarDeletePlatformDashboardTemplateButton
  from "components/insights/marketplace/dashboards/templates/platform/ActionBarDeletePlatformDashboardTemplateButton";
import AddPlatformDashboardButton
  from "components/insights/marketplace/dashboards/templates/platform/AddPlatformDashboardButton";

// TODO: This needs to be rewritten, I only separated out the two types of dashboards but did not work on this
export default function PlatformDashboardTemplateCard(
  {
    dashboardTemplate,
    loadData,
  }) {
  // TODO: add images
  const getImage = () => {
    return null;
    // {/*<Card.Img variant="top"*/}
    // {/*  className="pt-2 pl-2 pr-2"*/}
    // {/*  src={kpi.thumbnailPath}*/}
    // {/*/>*/}
  };

  const getOwnerNameField = () => {
    if (dashboardTemplate?.owner_name) {
      return (
        <Card.Text>
          <span className="text-muted">
            {dashboardTemplate.owner_name}
          </span>
        </Card.Text>
      );
    }
  };

  const getDescriptionField = () => {
    if (dashboardTemplate?.description) {
      return (
        <Card.Text>
          <span className="overflow-text">
            {dashboardTemplate.description}
          </span>
        </Card.Text>
      );
    }
  };

  const getTagsField = () => {
    if (Array.isArray(dashboardTemplate?.tags) && dashboardTemplate.tags.length > 0) {
      return (
        <CustomBadgeContainer>
          {dashboardTemplate.tags.map((tag, i) => {
            return (
              <CustomBadge
                key={i}
                className={"mr-2 mb-1"}
                icon={faTag}
                badgeText={`${capitalizeFirstLetter(tag?.type)}: ${tag.value}`}
              />
            );
          })}
        </CustomBadgeContainer>
      );
    }
  };

  return (
    <Card>
      {getImage()}
      <Card.Body>
        <Card.Title>{dashboardTemplate.name}</Card.Title>
        {getDescriptionField()}
        {getOwnerNameField()}
        <CustomBadgeContainer>
          <CustomBadge icon={faUsers} className="mr-1 upper-case-first"
                       badgeText={dashboardTemplate.attributes?.persona} />
          <CustomBadge icon={faClipboard} className={"upper-case-first"} badgeText={dashboardTemplate.type} />
        </CustomBadgeContainer>
        {getTagsField()}
        <div className={"d-flex justify-content-between mt-3"}>
          <AddPlatformDashboardButton
            dashboardTemplateId={dashboardTemplate?._id}
          />
          <ActionBarDeletePlatformDashboardTemplateButton
            loadData={loadData}
            dashboardId={dashboardTemplate?._id}
            className={"mt-auto"}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

PlatformDashboardTemplateCard.propTypes = {
  dashboardTemplate: PropTypes.object,
  loadData: PropTypes.func,
};
