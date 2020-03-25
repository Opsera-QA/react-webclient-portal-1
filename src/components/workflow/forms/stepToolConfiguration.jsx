import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import JenkinsConfiguration from "./jenkins";
import JunitStepConfiguration from "./junit";
import XunitStepConfiguration from "./xunit";
import SonarStepConfiguration from "./sonar";
import NPMStepConfiguration from "./npm";
import CommandLineStepConfiguration from "./commandLine";
import TeamCityStepConfiguration from "./teamCity";
import GcpDeployStepConfiguration from "./gcp-deploy";
import AwsDeployStepConfiguration from "./aws-deploy";
import JmeterStepConfiguration from "./jmeter";
import SeleniumStepConfiguration from "./selenium";
import TwistlockStepConfiguration from "./twistlock";



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
      <h6 className="upper-case-first ml-1">{typeof(stepTool) !== "undefined" ? stepTool.tool_identifier : null}</h6>
      <div className="text-muted m-1">Tools require configuration for individual workflow steps.  Please complete the fields below in order to 
      configure this pipeline. More help on tool configurations is available <Link to="/tools">here</Link>.</div>
          
      { typeof(stepTool) !== "undefined" ? 
        <div className="ml-1 mt-3">
          {editItem.tool_name.toLowerCase() === "jenkins" ? <JenkinsConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "junit" ? <JunitStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "xunit" ? <XunitStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "sonar" ? <SonarStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "command-line" ? <CommandLineStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "npm" ? <NPMStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "teamcity" ? <TeamCityStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "jmeter" ?  <JmeterStepConfiguration data={stepTool} parentCallback={callbackFunction} />: null }
          {editItem.tool_name.toLowerCase() === "selenium" ? <SeleniumStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "twistlock" ? <TwistlockStepConfiguration data={stepTool} parentCallback={callbackFunction} />: null }
          {editItem.tool_name.toLowerCase() === "aws-deploy" ? <AwsDeployStepConfiguration  data={stepTool} parentCallback={callbackFunction} /> : null }
          {editItem.tool_name.toLowerCase() === "gcp-deploy" ? <GcpDeployStepConfiguration data={stepTool} parentCallback={callbackFunction} /> : null }
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