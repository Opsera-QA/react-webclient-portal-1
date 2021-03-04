import React from 'react';
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTag} from "@fortawesome/pro-light-svg-icons";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import AddDashboardTemplateButton from "components/common/buttons/dashboards/AddDashboardButton";

export default function DashboardTemplateCard({ dashboardTemplate, catalog }) {
  // TODO: add images
  const getImage = () => {
    return null;
    // {/*<Card.Img variant="top"*/}
    // {/*  className="pt-2 pl-2 pr-2"*/}
    // {/*  src={kpi.thumbnailPath}*/}
    // {/*/>*/}
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

  const getPersonaField = () => {
    if (dashboardTemplate.attributes?.persona) {
      return (

        <div className="tags">
          <span className="tag">{dashboardTemplate.attributes?.persona}</span>
        </div>
      );
    }
  };

  const getTagsField = () => {
    if (Array.isArray(dashboardTemplate?.tags) && dashboardTemplate.tags.length > 0) {
      return (
        <div className="item-field">
          {dashboardTemplate.tags.map((tag, i) => {
            return (
              <span key={i} className="mx-1 mb-1 badge badge-light tag-badge">
              <FontAwesomeIcon icon={faTag} fixedWidth className="mr-1"/>{`${capitalizeFirstLetter(tag?.type)}: ${tag.value}`}
              </span>
            );
         })}
        </div>
      );
    }
  };

  return (
    <Card className="marketplace-card">
      {getImage()}
      <Card.Body>
      <Card.Title>{dashboardTemplate.name}</Card.Title>
        {getDescriptionField()}
        {getPersonaField()}
        {getTagsField()}
        <AddDashboardTemplateButton catalog={catalog} dashboardTemplate={dashboardTemplate} className={"mt-3"} />
      </Card.Body>
    </Card>
  )
}

DashboardTemplateCard.propTypes = {
  dashboardTemplate: PropTypes.object,
  catalog: PropTypes.string
};
