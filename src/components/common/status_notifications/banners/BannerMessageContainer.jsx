import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function BannerMessageContainer({ bannerMessages }) {
  const [currentBannerMessages, setCurrentBannerMessages] = useState(DataParsingHelper.parseArray(bannerMessages, []));
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const parsedBannerMessages = DataParsingHelper.parseArray(bannerMessages, []);
    setCurrentBannerMessages([...bannerMessages]);
    setCurrentIndex(parsedBannerMessages.length - 1);
  }, [bannerMessages]);

  const getNavigation = () => {
    return (
      <div>
        <span>{currentIndex} of {currentBannerMessages.length}</span>
      </div>
    );
  };

  if (!Array.isArray(currentBannerMessages) || currentBannerMessages.length === 0 || currentIndex < 0) {
    return null;
  }

  return (
    <div>
        {currentBannerMessages[currentIndex]?.bannerMessage}
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