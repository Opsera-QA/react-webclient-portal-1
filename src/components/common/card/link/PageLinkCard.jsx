import React  from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import {useHistory} from "react-router-dom";

function PageLinkCard({link, linkText, icon, visible, className}) {
  let history = useHistory();

  const handlePageLink = () => {
    history.push(link);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={className}>
      <div className={'my-3 page-link-card'} onClick={handlePageLink}>
        <div className={"d-flex"}>
          <IconBase iconSize={"2x"} icon={icon} fixedWidth className="ml-1 mr-3 my-auto"/>
          <div>
            <div className={"mr-3 page-link-card-title-text"}>{linkText}</div>
            <div className={"text-muted mt-1"}>This would be a description of the screen</div>
          </div>
        </div>
      </div>
    </div>
  );
}

PageLinkCard.propTypes = {
  linkText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.object,
  visible: PropTypes.bool,
  className: PropTypes.string,
};

PageLinkCard.defaultProps = {
  visible: true
};

export default PageLinkCard;