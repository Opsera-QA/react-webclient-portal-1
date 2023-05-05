import React from "react";
import PropTypes from "prop-types";
import {faRss, faStar} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import IconBase from "components/common/icons/IconBase";
import {faStar as faStarSolid} from "@fortawesome/pro-solid-svg-icons";

function SubscriptionIconBase({ handleSubscription, isSubscribed, showText, className, isLoading }) {

  const getHelpText = () => {
    if (showText) {
      return <span className="ml-1">{isSubscribed === true ? "Following" : "Not Following"}</span>;
    }
  };

  const getClassNames = () => {
    let classNames = "pointer";

    if (isSubscribed === true) {
      classNames += " opsera-yellow";
    }

    return classNames;
  };

  if (handleSubscription == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={getClassNames()} onClick={() => {handleSubscription();}}>
        <ButtonTooltip innerText={isSubscribed === true ? "Click to Unfollow" : "Click to Follow"}>
          <span>
            <IconBase
              isLoading={isLoading}
              className={"my-auto"}
              icon={isSubscribed === true ? faStarSolid : faStar}
              iconSize={"lg"}
            />
            {getHelpText()}
          </span>
        </ButtonTooltip>
      </div>
    </div>
  );
}

SubscriptionIconBase.propTypes = {
  handleSubscription: PropTypes.func,
  showText: PropTypes.bool,
  isSubscribed: PropTypes.bool,
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

export default SubscriptionIconBase;