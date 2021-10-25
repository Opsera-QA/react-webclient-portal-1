import React  from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import {useHistory} from "react-router-dom";

function PageLinkCard({link, linkText, icon, visible, className, pageDescription}) {
  let history = useHistory();

  const handlePageLink = () => {
    history.push(link);
  };

  if (visible === false) {
    return null;
  }

  return (
    <div className={className}>
      <div className={'mb-3 page-link-card'} onClick={handlePageLink}>
        <div className={"page-link-card-body d-flex p-2"}>
          <IconBase iconSize={"2x"} icon={icon} fixedWidth className="page-link-card-icon p-2 mr-3 mb-auto"/>
          <div>
            <div className={"mr-3 page-link-card-title-text"}>{linkText}</div>
            <div className={"text-muted mt-1"}>{pageDescription}</div>
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
  pageDescription: PropTypes.string,
};

export default PageLinkCard;