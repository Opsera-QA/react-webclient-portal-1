import React from "react";
import PropTypes from "prop-types";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import TagBadge from "components/common/badges/tag/TagBadge";

function AppliedTagBadgeOverlay(
  {
    tags,
    className,
    children,
  }) {
  const getTagPopover = () => {
    if (Array.isArray(tags) && tags.length > 0) {
      return (
        <CustomBadgeContainer>
          {tags.map((tag, index) => {
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

AppliedTagBadgeOverlay.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default AppliedTagBadgeOverlay;