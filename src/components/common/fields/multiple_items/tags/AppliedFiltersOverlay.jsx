import React from "react";
import PropTypes from "prop-types";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import FiltersBadge from "components/common/badges/tag/FiltersBadge";

function AppliedFiltersOverlay({ tags, className, children }) {
  const getTagPopover = () => {
    if (Array.isArray(tags.svp) && tags.svp.length > 0) {
      return (
        <CustomBadgeContainer>
          
          {tags.svp.length > 0 && <div>SVP</div>}
          {tags.svp.map((tag, index) => {
            if (typeof tag == "string") {
              return (
                // <div>
                <FiltersBadge className={"mr-2"} tag={tag} key={index} />
                // </div>
              );
            }
          })}
          {tags.vp2.length > 0 && <div>VP2</div>}
          {tags.vp2.map((tag, index) => {
            if (typeof tag == "string") {
              return (
                // <div>
                <FiltersBadge className={"mr-2"} tag={tag} key={index} />
                // </div>
              );
            }
          })}
          {tags.vp1.length > 0 && <div>VP1</div>}
          {tags.vp1.map((tag, index) => {
            if (typeof tag == "string") {
              return (
                // <div>
                <FiltersBadge className={"mr-2"} tag={tag} key={index} />
                // </div>
              );
            }
          })}
          {tags.director.length > 0 && <div>Director</div>}
          {tags.director.map((tag, index) => {
            if (typeof tag == "string") {
              return (
                // <div>
                <FiltersBadge className={"mr-2"} tag={tag} key={index} />
                // </div>
              );
            }
          })}
          {tags.application.length > 0 && <div>Application</div>}
          {tags.application.map((tag, index) => {
            if (typeof tag == "string") {
              return (
                // <div>
                <FiltersBadge className={"mr-2"} tag={tag} key={index} />
                // </div>
              );
            }
          })}
          {tags.action.length > 0 && <div>Action</div>}
          {tags.action.map((tag, index) => {
            if (typeof tag == "string") {
              return (
                // <div>
                <FiltersBadge className={"mr-2"} tag={tag} key={index} />
                // </div>
              );
            }
          })}
        </CustomBadgeContainer>
      );
    }
  };

  if (!Array.isArray(tags.svp) || tags.svp.length === 0) {
    return null;
  }

  return (
    <TooltipWrapper
      innerText={getTagPopover()}
      placement={"bottom"}
      title={"Applied Filters"}
      showCloseButton={false}
      className={"popover-filter"}
    >
      <div className={className}>{children}</div>
    </TooltipWrapper>
  );
}

AppliedFiltersOverlay.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default AppliedFiltersOverlay;
