import React  from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function PageLinkCard({link, linkText, icon, visible, className}) {
  if (!visible) {
    return null;
  }

  return (
    <div className={className}>
      <div className={'my-3 page-link-card'}>
        <div className={"d-flex"}>
          <IconBase iconSize={"2x"} icon={icon} fixedWidth className="mr-3"/>
          <div>
            <div className={"mr-3"}>{linkText}</div>
            <div className={"text-muted ml-2"}>This would be a description of the screen</div>
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