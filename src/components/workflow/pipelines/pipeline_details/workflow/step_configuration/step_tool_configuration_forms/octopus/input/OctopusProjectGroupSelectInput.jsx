import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DialogToastContext } from 'contexts/DialogToastContext';
import { AuthContext } from 'contexts/AuthContext';
import SelectInputBase from 'components/common/inputs/select/SelectInputBase';
import OctopusStepActions from '../octopus-step-actions';
import axios from 'axios';

const OctopusProjectGroupSelectInput = ({ fieldName, dataObject, setDataObject, disabled, textField, valueField }) => {

    const toastContext = useContext(DialogToastContext);
    const { getAccessToken } = useContext(AuthContext);
    const [ placeholderText, setPlaceholderText ] = useState("Select Project Group");
    const [ projectGroups, setProjectGroups ] = useState([]);    
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

    }, [dataObject.getData("spaceName")]);

    const loadData = async (cancelSource = cancelTokenSource) => {
        if(dataObject.getData("spaceName") && dataObject.getData("spaceName") !== ""){
            try {
                setIsLoading(true);
                setProjectGroups([]);
                const response = await OctopusStepActions.getProjectGroups(dataObject.getData("octopusToolId"), dataObject.getData("spaceId"), getAccessToken, cancelSource);
                if(response && response.status === 200){
                    setProjectGroups(response.data.data);
                }
            } catch (error) {
                setPlaceholderText("No Project Groups found");
                console.error(error);
                toastContext.showServiceUnavailableDialog();
            } finally {
                setIsLoading(false);
            }
        }        
    };

    const setDataFunction = (fieldName, selectedOption) => {
        let newDataObject = {...dataObject};
        newDataObject.setData(fieldName, selectedOption.id);
        if(dataObject.getData("projectType") && dataObject.getData("projectType") === "CUSTOM"){
            newDataObject.setData("projectId", "");
        }
        setDataObject({...newDataObject});
    };

    return (
        <div>
            <SelectInputBase 
                fieldName={fieldName}
                dataObject={dataObject}
                setDataObject={setDataObject}
                selectOptions={projectGroups ? projectGroups : []}
                busy={isLoading}
                valueField={valueField}
                textField={textField}
                placeholderText={placeholderText}
                disabled={disabled || isLoading}
                setDataFunction={setDataFunction}               
            />
        </div>
    );
};

OctopusProjectGroupSelectInput.propTypes = {
    fieldName: PropTypes.string,
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
    textField: PropTypes.string,
    valueField: PropTypes.string,
};

OctopusProjectGroupSelectInput.defaultProps = {
    valueField: "id",
    textField: "name"
};

export default OctopusProjectGroupSelectInput;
