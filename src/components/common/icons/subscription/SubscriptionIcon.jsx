import React from "react";
import PropTypes from "prop-types";
import {faRss} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import IconBase from "components/common/icons/IconBase";

function SubscriptionIconBase({ handleSubscription, isSubscribed, showText, className, isLoading }) {

  const getHelpText = () => {
    if (showText) {
      return <span className="ml-1">{isSubscribed === true ? "Subscribed" : "Not Subscribed"}</span>;
    }
  };

  const getClassNames = () => {
    let classNames = "pointer";

    if (isSubscribed === true) {
      classNames += " success-button-color";
    }

    return classNames;
  };

  if (handleSubscription == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={getClassNames()} onClick={() => {handleSubscription();}}>
        <ButtonTooltip innerText={isSubscribed === true ? "Click to Unsubscribe" : "Click to Subscribe"}>
          <span>
            <IconBase
              isLoading={isLoading}
              className={"my-auto"}
              icon={faRss}
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