import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartNetwork, faDraftingCompass, faExclamationCircle, faEye, faTag, faWrench} from "@fortawesome/pro-light-svg-icons";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";

function TagsCloudBase({ tagsWithUsage, onTagClick, className, getTooltip, subscribedTagIds, isLoading, subscribingToTag }) {
  const getSubscribedEye = (subscribed) => {
    if (subscribed) {
      return (<span><FontAwesomeIcon icon={faEye} fixedWidth className={"mx-1"}/></span>);
    }
  };

  const getTagCloud = () => {
    return (
      <div className="custom-badge-field">
        {tagsWithUsage.map((tagWithUsage) => {
          const tag = tagWithUsage?.tag;
          const subscribed = subscribedTagIds?.includes(tag._id);
          let classNames;

          if (subscribed) {
            classNames = "mr-3 mb-2 custom-badge subscribed-tag-badge pointer";
          }
          else {
            classNames = "mr-3 mb-2 custom-badge pointer";
          }

          return (
            <TooltipWrapper innerText={getTooltip(tagWithUsage)} key={tag?._id}>
              <span className={classNames} style={getDynamicBadgeStyle(tagWithUsage)} onClick={() => {handleClick(tag);}}>
                <span><IconBase icon={faTag} isLoading={subscribingToTag === tag?._id} className={"mr-1"} />{`${capitalizeFirstLetter(tag?.type)}: ${tag?.value}`}</span>
                <span className="ml-3"><FontAwesomeIcon icon={faDraftingCompass} fixedWidth className="mr-1"/>{tagWithUsage?.pipeline_usage_count}</span>
                <span className="ml-2"><FontAwesomeIcon icon={faWrench} fixedWidth className="mr-1"/>{tagWithUsage?.tool_usage_count}</span>
                <span className="ml-2"><FontAwesomeIcon icon={faChartNetwork} fixedWidth className="mr-1"/>{tagWithUsage?.dashboard_usage_count}</span>
                {getSubscribedEye(subscribed)}
              </span>
            </TooltipWrapper>
          );
        })}
      </div>
    );
  };

  const handleClick = (tag) => {
    if (!isLoading && tag?._id !== subscribingToTag) {
      onTagClick(tag);
    }
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
    );
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
  getTooltip: PropTypes.func,
  subscribedTagIds: PropTypes.array,
  isLoading: PropTypes.bool,
  subscribingToTag: PropTypes.string
};

export default TagsCloudBase;