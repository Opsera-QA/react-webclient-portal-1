import React, {useContext, useEffect, useRef, useState} from "react";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from 'prop-types';
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import AWSActionsHelper
  from "components/common/list_of_values_input/tools/aws/aws-actions-helper";
import EbsSolutionStackVersionInput from "./EbsSolutionStackVersionInput";

function EbsSolutionStackInput({dataObject, setDataObject, disabled}) {
    const { getAccessToken } = useContext(AuthContext);
    const [stackList, setStackList] = useState([]);
    const [stackKeyList, setStackKeyList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

    useEffect(() => {
        if (cancelTokenSource) {
          cancelTokenSource.cancel();
        }
    
        const source = axios.CancelToken.source();
        setCancelTokenSource(source);
        isMounted.current = true;
    
        loadData(source).catch((error) => {
          if (isMounted?.current === true) {
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
          await loadStackList(cancelSource);
        }
        catch (error) {
          if (isMounted?.current === true) {
            console.error(error);
            setErrorMessage("Could Not Load stackList");
          }
        }
        finally {
          if (isMounted?.current === true ) {
            setIsLoading(false);
          }
        }
      };
    
    const loadStackList = async (cancelSource = cancelTokenSource) => {
        const response  = await AWSActionsHelper.getStackList(dataObject.getData("awsToolConfigId"), getAccessToken, cancelSource);
       
        if (isMounted?.current === true && response?.data) {
            setStackKeyList(Object.keys(response?.data?.data));
            setStackList(response?.data?.data);
        }
    };

    const setDataFunction = (fieldName, value) => {
        let newDataObject = dataObject;
        newDataObject.setData("platform", value);
        newDataObject.setData("solutionStackName", "");
        newDataObject.setData("customDockerCompose", false);
        newDataObject.setData("dockerComposeScriptId", "");
        setDataObject({...newDataObject});
    };

    return (
        <>
            <SelectInputBase
                setDataObject={setDataObject}
                setDataFunction={setDataFunction}
                dataObject={dataObject}
                filter={"contains"}
                selectOptions={stackKeyList}
                fieldName={"platform"}
                disabled={disabled || isLoading}
            />
            {dataObject.getData("platform") && 
                <EbsSolutionStackVersionInput 
                    setDataObject={setDataObject}
                    dataObject={dataObject}
                    stackList={stackList}
                />
            }
        </>  
    );
}

EbsSolutionStackInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
};

export default EbsSolutionStackInput;

