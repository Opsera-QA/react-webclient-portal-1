import React from "react";
import PropTypes from "prop-types";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import TagBadge from "components/common/badges/tag/TagBadge";

function AppliedTagOverlay({tags, className, children}) {
  const getTagPopover = () => {
    if (Array.isArray(tags) && tags.length > 0) {
      return (
        <CustomBadgeContainer>
          {tags.map((tag, index) => {
            if (typeof tag !== "string") {
              return (
                // <div>
                <TagBadge
                  className={"mr-2"}
                  tag={tag}
                  key={index}
                />
                // </div>
              );
            }
          })}
        </CustomBadgeContainer>
      );
    }
  };

  if (!Array.isArray(tags) || tags.length === 0) {
    return null;
  }


  return (
    <TooltipWrapper
      innerText={getTagPopover()}
      title={"Applied Tags"}
      showCloseButton={false}
      className={"popover-filter"}
    >
      <div className={className}>
        {children}
      </div>
    </TooltipWrapper>
  );
}

AppliedTagOverlay.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default AppliedTagOverlay;