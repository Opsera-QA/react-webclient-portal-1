import React  from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import OptionCardBase from "components/common/card/option/OptionCardBase";

function PageLinkCard({link, linkText, icon, visible, className, pageDescription}) {
  let history = useHistory();

  const onClickFunction = () => {
    history.push(link);
  };

  const getBody = () => {
    return (
      <div>
        <div className={"mr-3 page-link-card-title-text"}>{linkText}</div>
        <div className={"text-muted mt-1"}>{pageDescription}</div>
      </div>
    );
  };

  if (visible === false) {
    return null;
  }

  return (
    <OptionCardBase
      className={className}
      body={getBody()}
      onClickFunction={onClickFunction}
      visible={visible}
      icon={icon}
    />
  );
}

PageLinkCard.propTypes = {
  linkText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.object,
  visible: PropTypes.bool,
  className: PropTypes.string,
  pageDescription: PropTypes.string,
};

export default PageLinkCard;