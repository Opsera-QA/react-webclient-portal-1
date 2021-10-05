import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import NavLink from "react-bootstrap/NavLink";

function PipelineLink({pipelineId}) {
  return (
    <div>
      <NavLink href={`/workflow/details/${pipelineId}`} className="p-0">
        <span><FontAwesomeIcon icon={faDraftingCompass} className="pr-1"/>View Pipeline</span>
      </NavLink>
    </div>
  );
}

PipelineLink.propTypes = {
  pipelineId: PropTypes.string
};


export default PipelineLink;
