import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DialogToastContext } from 'contexts/DialogToastContext';
import { AuthContext } from 'contexts/AuthContext';
import SelectInputBase from 'components/common/inputs/select/SelectInputBase';
import OctopusStepActions from '../octopus-step-actions';
import axios from 'axios';

const OctopusProjectSelectInput = ({ fieldName, dataObject, setDataObject, disabled, textField, valueField }) => {

    const toastContext = useContext(DialogToastContext);
    const { getAccessToken } = useContext(AuthContext);
    const [ placeholderText, setPlaceholderText ] = useState("Select Octopus Project");
    const [ projects, setProjects ] = useState([]);    
    const [ isLoading, setIsLoading ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ cancelTokenSource, setCancelTokenSource ] = useState(undefined);
    const isMounted = useRef(false);
    
    
    useEffect(() => {
        if(cancelTokenSource){
            cancelTokenSource.cancel();
        }

        const source = axios.CancelToken.source();
        setCancelTokenSource(source);
        isMounted.current = true;

        setErrorMessage("");

        loadData(source).catch((error) => {
            if(isMounted?.current === true){
                throw error;
            }
        });

        return () => {
            source.cancel();
            isMounted.current = false;
        };

    }, [dataObject.getData("projectGroupId")]);

    const loadData = async (cancelSource = cancelTokenSource) => {
        if(dataObject.getData("projectGroupId") && dataObject.getData("projectGroupId") !== ""){
            try {
                setIsLoading(true);
                setProjects([]);
                const response = await OctopusStepActions.getProjectsV2(dataObject.getData("octopusToolId"), dataObject.getData("spaceId"), dataObject.getData("projectGroupId"), getAccessToken, cancelSource);
                if(response && response.status === 200){
                    setProjects(response.data.data);
                }
            } catch (error) {
                setPlaceholderText("No Projects found");
                console.error(error);
                toastContext.showServiceUnavailableDialog();
            } finally {
                setIsLoading(false);
            }
        }
    };

    const setDataFunction = (fieldName, selectedOption) => {
        let newDataObject = {...dataObject};
        newDataObject.setData("projectId", selectedOption.id);
        newDataObject.setData("deploymentProcessId", selectedOption.deploymentProcessId);
        newDataObject.setData("lifecycleId", selectedOption.lifecycleId);
        newDataObject.setData("tenantedDeploymentMode", selectedOption.tenantedDeploymentMode);
        newDataObject.setData("channelId", "");
        newDataObject.setData("tenantId", "");
        setDataObject({...newDataObject});
    };

    const clearDataFunction = (fieldName) => {
        let newDataObject = {...dataObject};
        newDataObject.setData("projectId", "");
        newDataObject.setData("deploymentProcessId", "");
        newDataObject.setData("lifecycleId", "");
        newDataObject.setData("tenantedDeploymentMode", "");
        newDataObject.setData("channelId", "");
        newDataObject.setData("tenantId", "");
        setDataObject({...newDataObject});
    };

    return (
        <div>
            <SelectInputBase 
                fieldName={fieldName}
                dataObject={dataObject}
                setDataObject={setDataObject}
                selectOptions={projects ? projects : []}
                busy={isLoading}
                valueField={valueField}
                textField={textField}
                placeholderText={placeholderText}
                disabled={disabled || isLoading}
                setDataFunction={setDataFunction}
                clearDataFunction={clearDataFunction}
            />
        </div>
    );
};

OctopusProjectSelectInput.propTypes = {
    fieldName: PropTypes.string,
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
    textField: PropTypes.string,
    valueField: PropTypes.string,
};

OctopusProjectSelectInput.defaultProps = {
    valueField: "id",
    textField: "name"
};

export default OctopusProjectSelectInput;
