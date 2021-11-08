import React from "react";
import PropTypes from "prop-types";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import TagBadge from "components/common/badges/tag/TagBadge";
import TagBadgeBase from "components/common/badges/tag/TagBadgeBase";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";

function TagDisplayer({tags, className, showNoTagsAppliedBadge}) {
  const getTagPopover = () => {
    if (Array.isArray(tags) && tags.length > 0) {
      return (
        <CustomBadgeContainer>
          {tags.map((tag, index) => {
            if (typeof tag !== "string") {
              return (
                // <div>
                <TagBadge
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
    if (showNoTagsAppliedBadge === true) {
      return (
        <div className={className}>
          <span className="item-field">
            <TagBadgeBase
              badgeText={"No Tags Applied"}
            />
          </span>
        </div>
      );
    }

    return null;
  }

  return (
    <TooltipWrapper
      innerText={getTagPopover()}
      title={"Tags"}
      showCloseButton={false}
      className={"popover-filter"}
    >
      <div className={className}>
        <span className="item-field">
          <SpyglassBadge
            badgeText={`${tags.length} Tag${tags.length !== 1 ? "s" : ""} Applied`}
          />
        </span>
      </div>
    </TooltipWrapper>
  );
}

TagDisplayer.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
  showNoTagsAppliedBadge: PropTypes.bool,
};

export default TagDisplayer;