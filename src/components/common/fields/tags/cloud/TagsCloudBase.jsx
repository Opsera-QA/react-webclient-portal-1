import React, {useContext} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiceD20, faExclamationCircle, faTag, faWrench} from "@fortawesome/pro-light-svg-icons";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function TagsCloudBase({ tagsWithUsage, onTagClick, className, getTooltip }) {

  const getTagCloud = () => {
    return (
      <div className="item-field">
        {tagsWithUsage.map((tagWithUsage) => {
          const tag = tagWithUsage?.tag;
          return (
            <TooltipWrapper innerText={getTooltip(tagWithUsage)} key={tag?._id}>
              <span className="mx-1 mb-1 badge badge-light tag-badge pointer" style={getDynamicBadgeStyle(tagWithUsage)} onClick={() => {onTagClick(tag)}}>
                <span><FontAwesomeIcon icon={faTag} fixedWidth className="mr-1"/>{`${capitalizeFirstLetter(tag?.type)}: ${tag?.value}`}</span>
                <span><FontAwesomeIcon icon={faDiceD20} fixedWidth className="ml-3 mr-1"/>{tagWithUsage?.pipeline_usage_count}</span>
                <span><FontAwesomeIcon icon={faWrench} fixedWidth className="mx-1"/>{tagWithUsage?.tool_usage_count}</span>
              </span>
            </TooltipWrapper>
          );
        })}
      </div>
    );
  };

  const getDynamicBadgeStyle = (tagWithUsage) => {
    const highestCount = Number.parseInt(tagsWithUsage[0]?.total_usage_count);

    if (highestCount === 0) {
      return null;
    }

    let opacity = Number.parseInt(tagWithUsage.total_usage_count) / highestCount;
    return {opacity: opacity / 2 + .5};
  };

  // TODO: pass in no tags message
  if (tagsWithUsage == null || tagsWithUsage.length === 0) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No Tags Found</span>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {getTagCloud()}
    </div>
  );
}

TagsCloudBase.propTypes = {
  tagsWithUsage: PropTypes.array,
  onTagClick: PropTypes.func,
  className: PropTypes.string,
  getTooltip: PropTypes.func
};

export default TagsCloudBase;