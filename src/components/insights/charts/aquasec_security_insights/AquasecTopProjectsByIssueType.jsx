import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import IconBase from "components/common/icons/IconBase";
import { ICON_FROM_TREND } from "./constants";

const AquasecTopProjectsByIssueType = ({ type, projects, projectsToDisplay }) => {
  if (!Array.isArray(projects) || projects.length === 0) {
    return null;
  }

  const topIssues = projects.slice(0, projectsToDisplay);

  return (
    <HorizontalDataBlocksContainer
      title={`Top Project with ${type} Issues`}
      borderColor={type}
    >
      {topIssues.map(({ projectTotalIssuesTrend: trend, coverityStreamName: name }, index) => {
        const { icon, color, title } = ICON_FROM_TREND[trend];
        return (
          <Row
            className="p-1 pl-2"
            key={index}
          >
            <Col lg={12}>
              {trend && (
                <IconBase
                  icon={icon}
                  iconColor={color}
                  iconTitle={title}
                />
              )}
              <span className="pl-1">{name}</span>
            </Col>
          </Row>
        );
      })}
    </HorizontalDataBlocksContainer>
  );
};

AquasecTopProjectsByIssueType.propTypes = {
  type: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      // TODO: most likely need to ensure these fields are updated
      projectTotalIssuesTrend: PropTypes.string,
      coverityStreamName: PropTypes.string
    })
  ).isRequired,
  projectsToDisplay: PropTypes.number
};

AquasecTopProjectsByIssueType.defaultProps = {
  projectsToDisplay: 1
};

export default AquasecTopProjectsByIssueType;