import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/pro-light-svg-icons";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import LoadingIcon from "components/common/icons/LoadingIcon";

function SubscriptionIconBase({ handleSubscription, isSubscribed, showText, className, isLoading }) {

  const getHelpText = () => {
    if (showText) {
      return <span className="ml-1">{isSubscribed ? "Subscribed" : "Not Subscribed"}</span>
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
      <div className={getClassNames()} onClick={() => {handleSubscription()}}>
        <ButtonTooltip innerText={isSubscribed ? "Click to Unsubscribe" : "Click to Subscribe"}>
          <span>
            <FontAwesomeIcon icon={faEye} fixedWidth />
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