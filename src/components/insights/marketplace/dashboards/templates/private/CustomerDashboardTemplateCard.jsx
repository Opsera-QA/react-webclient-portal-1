import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { faClipboard, faTag, faUsers } from "@fortawesome/pro-light-svg-icons";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";
import ActionBarDeleteCustomerDashboardTemplateButton
  from "components/insights/marketplace/dashboards/templates/private/ActionBarDeleteCustomerDashboardTemplateButton";
import AddCustomerDashboardButton
  from "components/insights/marketplace/dashboards/templates/private/AddCustomerDashboardButton";

// TODO: This needs to be rewritten, I only separated out the two types of dashboards but did not work on this
export default function CustomerDashboardTemplateCard(
  {
    dashboardTemplate,
    loadData,
  }) {
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
      <Card.Body>
        <Card.Title>{dashboardTemplate.name}</Card.Title>
        {getDescriptionField()}
        <CustomBadgeContainer>
          <CustomBadge icon={faUsers} className="mr-1 upper-case-first"
                       badgeText={dashboardTemplate.attributes?.persona} />
          <CustomBadge icon={faClipboard} className={"upper-case-first"} badgeText={dashboardTemplate.type} />
        </CustomBadgeContainer>
        {getTagsField()}
        <div className={"d-flex justify-content-between mt-3"}>
          <AddCustomerDashboardButton
            dashboardTemplateId={dashboardTemplate?._id}
          />
          <ActionBarDeleteCustomerDashboardTemplateButton
            loadData={loadData}
            dashboardId={dashboardTemplate?._id}
            ownerId={dashboardTemplate?.creator}
            className={"mt-auto"}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

CustomerDashboardTemplateCard.propTypes = {
  dashboardTemplate: PropTypes.object,
  loadData: PropTypes.func,
};
