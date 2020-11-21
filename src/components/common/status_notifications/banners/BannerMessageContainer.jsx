import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function BannerMessageContainer({ bannerMessages }) {
  const [currentBannerMessages, setCurrentBannerMessages] = useState(bannerMessages);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    setCurrentBannerMessages(bannerMessages);
    setCurrentIndex(bannerMessages.lastIndex);
  }, [bannerMessages]);

  const getNavigation = () => {
    return (
      <div>
        <span>{currentIndex} of {currentBannerMessages.length}</span>
      </div>
    );
  };

  if (currentBannerMessages == null || currentBannerMessages.length === 0) {
    return null;
  }

  return (
    <div>
        {currentBannerMessages[currentIndex].bannerMessage}
      {/*<div>*/}
      {/*  {getNavigation()}*/}
      {/*</div>*/}
    </div>
  );
}

BannerMessageContainer.propTypes = {
  bannerMessages: PropTypes.array,
};

export default BannerMessageContainer;