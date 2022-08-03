import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import TagBadge from "components/common/badges/tag/TagBadge";
import TagBadgeBase from "components/common/badges/tag/TagBadgeBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import React from "react";

// TODO: Rewrite
function AppliedMetricTagBadgeOverlay({
  className,
  children,
  kpiTags,
  dashboardTags,
  badgeClassName,
}) {
  const getAppliedDashboardTagsBadge = () => {
    const dashboardTagsCount = Array.isArray(dashboardTags) && dashboardTags.length ? dashboardTags.length : 0;

    if (dashboardTagsCount === 0) {
      return (
        <>
          <div className="dark-gray-text-primary font-inter-light-400 metric-block-header-text">
            {`${dashboardTagsCount} Dashboard Tags`}
          </div>
          <div className={className}>
            <TagBadgeBase
              className={badgeClassName}
              badgeText={`No Dashboard Tags Applied`}
            />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="dark-gray-text-primary font-inter-light-400 metric-block-header-text">
          {`${dashboardTagsCount} Dashboard Tags`}
        </div>
          <CustomBadgeContainer>
            {dashboardTags.map((tag, index) => {
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
      </>
    );
  };

  const getKpiTags = () => {
    const kpiTagsCount = Array.isArray(kpiTags) && kpiTags.length ? kpiTags.length : 0;

    if (kpiTagsCount === 0) {
      return (
        <>
          <div className="dark-gray-text-primary font-inter-light-400 metric-block-header-text">
            {`${kpiTagsCount} KPI Tags`}
          </div>
          <div className={className}>
            <TagBadgeBase
              className={badgeClassName}
              badgeText={`No KPI Tags Applied`}
            />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="dark-gray-text-primary font-inter-light-400 metric-block-header-text">
          {`${kpiTagsCount} KPI Tags`}
        </div>
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
          {getAppliedDashboardTagsBadge()}
        </Col>
        <Col
          xs={12}
          sm={12}
          key={`metric-build`}
        >
          {getKpiTags()}
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

AppliedMetricTagBadgeOverlay.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  kpiTags: PropTypes.array,
  dashboardTags: PropTypes.array,
  badgeClassName: PropTypes.string,
};

export default AppliedMetricTagBadgeOverlay;
