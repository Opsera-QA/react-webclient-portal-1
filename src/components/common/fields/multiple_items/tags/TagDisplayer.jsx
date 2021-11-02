import React from "react";
import PropTypes from "prop-types";
import {faSearch, faTag} from "@fortawesome/pro-light-svg-icons";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";
import IconBase from "components/common/icons/IconBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function TagDisplayer({tags, className, showNoTagsAppliedBadge}) {
  const getTagPopover = () => {
    if (Array.isArray(tags) && tags.length > 0) {
      return (
        <CustomBadgeContainer>
          {tags.map((tag, index) => {
            if (typeof tag !== "string") {
              return (
                // <div>
                  <CustomBadge
                    badgeText={
                      <span>
                        <span className="mr-1">
                          {capitalizeFirstLetter(tag.type)}:
                        </span>
                        {capitalizeFirstLetter(tag.value)}
                      </span>
                    }
                    icon={faTag}
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
          <span>
            <span className="mr-1 badge badge-light group-badge">
              <IconBase icon={faTag} className={"mr-1"}/>
              No Tags Applied
            </span>
          </span>
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
          <span>
            <span className="mr-1 badge badge-light group-badge">
              <IconBase icon={faSearch} className={"mr-1"}/>
              {tags.length} Tag{tags.length !== 1 ? "s" : ""} Applied
            </span>
          </span>
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