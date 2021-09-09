import React from "react";
import PropTypes from "prop-types";
import {Nav} from "react-bootstrap";

function VanitySetVerticalTabContainer({children, className, title}) {
  const getTitleBar = () => {
    if (title != null) {
      return (<div className="p-2 makeup-tree-title">{title}</div>);
    }
  };

  return (
    <div className={className}>
      <div className={"makeup-tree-container h-100 w-100"}>
        {getTitleBar()}
        <Nav variant={"pills"}>
          <div className={"h-100 w-100"}>
            <div className={"makeup-tree-container-body p-2"}>
              {children}
            </div>
          </div>
        </Nav>
      </div>
    </div>
  );
}

VanitySetVerticalTabContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  title: PropTypes.any,
};

export default VanitySetVerticalTabContainer;