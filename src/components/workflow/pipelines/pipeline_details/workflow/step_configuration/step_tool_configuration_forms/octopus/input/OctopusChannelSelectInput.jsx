import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DialogToastContext } from 'contexts/DialogToastContext';
import { AuthContext } from 'contexts/AuthContext';
import SelectInputBase from 'components/common/inputs/select/SelectInputBase';
import OctopusStepActions from '../octopus-step-actions';
import axios from 'axios';

const OctopusChannelSelectInput = ({ fieldName, dataObject, setDataObject, disabled, textField, valueField }) => {

    const toastContext = useContext(DialogToastContext);
    const { getAccessToken } = useContext(AuthContext);
    const [ placeholderText, setPlaceholderText ] = useState("");
    const [ channels, setChannels ] = useState([]);    
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

    }, []);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            setChannels([]);
            const response = await OctopusStepActions.getChannels(dataObject.getData("octopusToolId"), dataObject.getData("spaceId"), dataObject.getData("projectId"), getAccessToken, cancelSource);
            if(response && response.status === 200){
                setChannels(response.data.data);
            }
        } catch (error) {
            setPlaceholderText("No octopus channels found");
            console.error(error);
            toastContext.showServiceUnavailableDialog();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <SelectInputBase 
                fieldName={fieldName}
                dataObject={dataObject}
                setDataObject={setDataObject}
                selectOptions={channels ? channels : []}
                busy={isLoading}
                valueField={valueField}
                textField={textField}
                placeholderText={placeholderText}
                disabled={disabled || isLoading || !dataObject.getData("projectId") || dataObject.getData("projectId") === ""}
            />
        </div>
    );
};

OctopusChannelSelectInput.propTypes = {
    fieldName: PropTypes.string,
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
    textField: PropTypes.string,
    valueField: PropTypes.string,
};

OctopusChannelSelectInput.defaultProps = {
    valueField: "id",
    textField: "name"
};

export default OctopusChannelSelectInput;
