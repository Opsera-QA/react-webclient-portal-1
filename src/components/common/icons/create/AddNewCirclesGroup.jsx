import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function AddNewCirclesGroup(
  {
    data
  }) {

  if (data == null) {
    return null;
  }

  const circles = [];
  for (var i = 0; i <= data.length - 1; i++) {
    circles.push(<i style={{color:data[i].color, fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i>);
  }

  return (
    <span>
      {circles}
    </span>
  );
}

AddNewCirclesGroup.propTypes = {
  data: PropTypes.any,
};

export default React.memo(AddNewCirclesGroup);