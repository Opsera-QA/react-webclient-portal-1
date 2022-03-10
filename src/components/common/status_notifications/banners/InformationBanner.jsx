import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import BannerBase from "components/common/status_notifications/banners/BannerBase";

function InformationBanner ({ informationMessage, removeBanner, id }) {
  const [messageBody, setMessageBody] = useState(undefined);

  useEffect(() => {
    setMessageBody(informationMessage);
  }, [informationMessage]);

  const clearInformationMessage = () => {
    removeBanner(id);
  };

  return (
    <BannerBase
      bannerClassName={"w-100 py-3  info-block top-dialog-block"}
      bannerMessage={messageBody}
      removeBannerFunction={clearInformationMessage}
    />
  );
}

InformationBanner.propTypes = {
  informationMessage: PropTypes.string,
  removeBanner: PropTypes.func,
  id: PropTypes.string,
};

export default InformationBanner;