import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import JenkinsConfiguration from "./jenkins";
import JunitXunitStepConfiguration from "./junitXunit";
import SonarStepConfiguration from "./sonar";
import NPMStepConfiguration from "./npm";
import CommandLineStepConfiguration from "./commandLine";
import TeamCityStepConfiguration from "./teamCity";



function StepToolConfiguration( { data, editItem, parentCallback }) {
  const { plan } = data.workflow;
  const [stepTool, setStepTool] = useState();
  
  useEffect(() => {
    let stepIndex = getStepIndex(editItem.step_id);
    setStepTool(plan[stepIndex].tool);
  }, [editItem, data]);


  const getStepIndex = (step_id) => {
    let stepArrayIndex = plan.findIndex(x => x._id === step_id); 
    console.log(plan[stepArrayIndex].tool);
    return stepArrayIndex;
  };

  const callbackFunction = (tool) => {
    let stepArrayIndex = getStepIndex(editItem.step_id); 
    plan[stepArrayIndex].tool.configuration = tool.configuration;
    plan[stepArrayIndex].tool.threshold = tool.threshold;
    parentCallback(plan);
  };
  

  return (
    <div>
      <div className="text-muted m-1">Tools require configuration for individual workflow steps.  Please complete the fields below in order to 
      configure this pipeline. More help on tool configurations is available <Link to="/tools">here</Link>.</div>
          
      { typeof(stepTool) !== "undefined" ? 
        <div className="ml-1 mt-3">
          {editItem.tool_name.toLowerCase() === "jenkins" ? <JenkinsConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "junit/xunit" ? <JunitXunitStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "sonar" ? <SonarStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "command line" ? <CommandLineStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "npm" ? <NPMStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "teamcity" ? <TeamCityStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
        </div>
        : null }

    </div>
  );
}

StepToolConfiguration.propTypes = {
  data: PropTypes.object,
  editItem: PropTypes.object,
  parentCallback: PropTypes.func
};

export default StepToolConfiguration;