import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";

function PipelineWelcomeView () {
  const history = useHistory();

  const goToPipelineCatalog = () => {
    history.push(`/workflow/catalog/library`);
  };

  return (
    <div className="mx-3">
      <div className="h5 mb-3 mt-4">Welcome to Opsera&apos;s Declarative Pipelines!</div>

      <div className="row mx-n2 mt-1 pl-2">
        <div className="col-md-1 px-2 landing-content-module">
          <img alt="OpsERA"
               src="/img/pipeline.png"
               style={{ width:"auto", height:"150px" }}
               className="d-inline-block align-top ml-2"
          />
        </div>
        <div className="col-md-6 px-2 text-muted pt-5">
          Opsera&apos;s Advanced Orchestration Technology combined with our robust tools experience will enable you to build and manage various continuous integration
          and delivery as well as unique policy based pipelines saving you time and resources!
        </div>
        <div className="col-md px-2 text-muted" />
      </div>

      <div className="row mx-n2 mt-4" style={{ maxWidth:"620px" }}>
        <div className="col-md px-2 landing-content-module">
          <div className="text-muted mb-3">
            At this time you do not have any pipelines configured for this section.  Please visit the Catalog in order to add a workflow template to your pipeline.</div>
            <Button variant="success" className="px-2" onClick={() => goToPipelineCatalog("catalog")}>
              <FontAwesomeIcon icon={faPlay} className="mr-1" fixedWidth/>Get Started!</Button>
        </div>
      </div>
    </div>
  );
}

PipelineWelcomeView.propTypes = {
  setActiveTab: PropTypes.func
};

export default PipelineWelcomeView;