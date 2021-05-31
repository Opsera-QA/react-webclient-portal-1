import React,{useState} from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import {  OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/pro-light-svg-icons";
import  JsonInput  from  "components/common/inputs/object/JsonInput";
import DockerSecretsInput from "../DockerSecretsInput";
import _ from "lodash";

function JenkinsStepConfDocker({ dataObject, setDataObject }) {

	const [deleteDockerSecrets, setDeleteDockerSecrets] = useState(false);  
	if (dataObject.data.buildType != 'docker') {
		return null;
	}
	const renderPopOver=()=>{
		{/* docker params optional */} 
		return(                 
			<OverlayTrigger
				trigger="click"
				rootClose
				placement="left"
				overlay={
					<Popover id="popover-basic" style={{ maxWidth: "500px" }}>
						<Popover.Title as="h3">Build Arguments</Popover.Title>

						<Popover.Content>
							<div className="text-muted mb-2">
								Enter Runtime Build arguments as a key value pair JSON. You can add any number of runtime arguments to the
								JSON Object. Sample: {" { Key1: Value1, Key2: value2 }"}
							</div>
						</Popover.Content>
					</Popover>
				}
			>
				<FontAwesomeIcon
					icon={faEllipsisH}
					className="fa-pull-right pointer pr-1"
					onClick={() => document.body.click()}
				/>
			</OverlayTrigger>);
	};
	return (
		<div className={"mb-3"}>
			<TextInputBase disabled={false} fieldName={'dockerName'} dataObject={dataObject} setDataObject={setDataObject} />
			<TextInputBase disabled={false} fieldName={'dockerTagName'} dataObject={dataObject} setDataObject={setDataObject} />
			<TextInputBase disabled={false} fieldName={'dockerPath'} dataObject={dataObject} setDataObject={setDataObject} />
			{renderPopOver()}
			<JsonInput fieldName={'buildArgs'} dataObject={dataObject} setDataObject={setDataObject} />
			<DockerSecretsInput 
				setDataObject={setDataObject} 
				dataObject={dataObject}
				deleteDockerSecrets={deleteDockerSecrets}
				setDeleteDockerSecrets={setDeleteDockerSecrets}
				addSecret={deleteDockerSecrets || _.isEmpty(dataObject.data.dockerBuildPathJson)}
			/>  
		</div>
	);
}

JenkinsStepConfDocker.propTypes = {
	fieldName: PropTypes.string,
	dataObject: PropTypes.object,
	setDataObject: PropTypes.func,
	disabled: PropTypes.bool,
};



export default JenkinsStepConfDocker;
