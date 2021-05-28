import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function JenkinsStepConfNewBranch({ dataObject, setDataObject, disabled }) {
    
	const jobType = dataObject.data.jobType;
	
	const handleCreateNewBranchFlag = (e) => {
		const checked = e.targed.checked;
		let newDataObject = { ...dataObject };
		newDataObject.setData('isNewBranch', checked);
    if(!checked) {
			newDataObject.setData('branch', "");
			newDataObject.setData('gitBranch',"");
			newDataObject.setData('hasUpstreamBranch', "");
			newDataObject.setData('upstreamBranch', "");
    }
		setDataObject({ ...newDataObject });
		return;
  };

	const handleUpstreamBranchChange =(val)=>{
		let newDataObject ={...dataObject};
		newDataObject.setData('hasUpstreamBranch',val);
		setDataObject({ ...newDataObject });
	};
	const renderUpstreamBranchInput=()=>{
		if(dataObject.data.hasUpstreamBranch){
				return(
					<>
						abc
					</>
				);
		}
		return null;
	};
	
	const renderBranchNameInput=()=>{
		if(dataObject.data.isNewBranch){
			//Branch Name
			return ( 
			<>
			<TextInputBase 	disabled={false} 	fieldName={'gitBranch'} 	dataObject={dataObject} 	setDataObject={setDataObject}/>
			<Form.Group controlId="isNewBranch">
          <Form.Check inline
            type="checkbox"
            label={"Use an upstream branch?"}
            id={`hasUpstreamBranch`}
            checked={dataObject.data.hasUpstreamBranch}
            onChange={(e) => handleUpstreamBranchChange(e.target.checked)}
          />
          <Form.Text className="text-muted">Configure an upstream/source branch. The Files will be overwritten when pushing the artifacts.
            If no upstream branch is configured, then the new Artifact branch is created as an Orphan branch, having only the artifact files and no commit history. </Form.Text>
        </Form.Group>
				{renderUpstreamBranchInput()}
			</>);
		}
		return null;
	};

	if(jobType === 'SFDC PUSH ARTIFACTS'){
		return(
			<>
			<Form.Group controlId="isNewBranch">
        <Form.Check inline
          type="checkbox"
          label={"Create a new backup branch?"}
          id={`newBranch`}
          checked={dataObject.data.isNewBranch}
          onChange={handleCreateNewBranchFlag}
        />
        <Form.Text className="text-muted">Creates a new branch and push the artifacts.</Form.Text>
      </Form.Group>
			{renderBranchNameInput()}
			</>
		);
	}

    return null;
}

JenkinsStepConfNewBranch.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  jenkinsList: PropTypes.any,
};


export default JenkinsStepConfNewBranch;
