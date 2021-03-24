import React from "react";
import PropTypes from "prop-types";

function TitleComponent({title}) {
  return (<div className="h4 mt-3 mb-4">{title}</div>);
}

TitleComponent.propTypes = {
  title: PropTypes.string,
};

export default TitleComponent;