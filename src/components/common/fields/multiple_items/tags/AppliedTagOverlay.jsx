import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import TagBadge from "components/common/badges/tag/TagBadge";
import TagBadgeBase from "components/common/badges/tag/TagBadgeBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import React from "react";
function AppliedTagOverlay({
  className,
  children,
  kpiTags,
  dashboardTags,
  badgeClassName,
}) {
  const getDashboardTags = () => {
    return (
      <>
        <div className="dark-gray-text-primary font-inter-light-400 metric-block-header-text">
          {"# Dashboard Tags"}
        </div>
        {!Array.isArray(dashboardTags) || dashboardTags.length === 0 ? (
          <div className={className}>
            <TagBadgeBase
              className={badgeClassName}
              badgeText={`No Dashboard Tags Applied`}
            />
          </div>
        ) : (
          <CustomBadgeContainer>
            {dashboardTags.map((tag, index) => {
              if (typeof tag !== "string") {
                return (
                  // <div>
                  <TagBadge
                    className={"mr-2 mb-2"}
                    tag={tag}
                    key={index}
                  />
                  // </div>
                );
              }
            })}
          </CustomBadgeContainer>
        )}
      </>
    );
  };
  const getKPITags = () => {
    console.log(kpiTags, "**kpiTags");
    return (
      <>
        <div className="dark-gray-text-primary font-inter-light-400 metric-block-header-text">
          {"# Kpi Tags"}
        </div>
        {(!Array.isArray(kpiTags) || kpiTags.length) === 0 ? (
          <div className={className}>
            111
            <TagBadgeBase
              className={badgeClassName}
              badgeText={`No Kpi Tags Applied`}
            />
          </div>
        ) : (
          <CustomBadgeContainer>
            {kpiTags?.map((tag, index) => {
              if (typeof tag !== "string") {
                return (
                  <TagBadge
                    className={"mr-2 mb-2"}
                    tag={tag}
                    key={index}
                  />
                );
              }
            })}
          </CustomBadgeContainer>
        )}
      </>
    );
  };

  const getTagPopover = () => {
    return (
      <Row className="m-0">
        <Col
          xs={12}
          sm={12}
          key={`metric-build`}
        >
          {getDashboardTags()}
        </Col>
        <Col
          xs={12}
          sm={12}
          key={`metric-build`}
        >
          {getKPITags()}
        </Col>
      </Row>
    );
  };

  return (
    <TooltipWrapper
      innerText={getTagPopover()}
      title={"Applied Tags"}
      showCloseButton={false}
      className={"popover-filter"}
    >
      <div className={className}>{children}</div>
    </TooltipWrapper>
  );
}

AppliedTagOverlay.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  kpiTags: PropTypes.array,
  dashboardTags: PropTypes.array,
  badgeClassName: PropTypes.string,
};

export default AppliedTagOverlay;
