import React from "react";
import PropTypes from "prop-types";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import NavLink from "react-bootstrap/NavLink";
import IconBase from "components/common/icons/IconBase";

function PipelineLink({pipelineId}) {
  return (
    <div>
      <NavLink href={`/workflow/details/${pipelineId}`} className="p-0">
        <span><IconBase icon={faDraftingCompass} className={"pr-1"}/>View Pipeline</span>
      </NavLink>
    </div>
  );
}

PipelineLink.propTypes = {
  pipelineId: PropTypes.string
};


export default PipelineLink;
