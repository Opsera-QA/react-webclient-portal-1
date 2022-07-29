import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import BoomiActions from "../boomi.actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

function EnvironmentSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool, idField}) {
    const toastContext = useContext(DialogToastContext);
    const [environments, setEnvs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const { getAccessToken } = useContext(AuthContext);
    const [placeholder, setPlaceholderText] = useState("Select Environment");
    const [errorMessage, setErrorMessage] = useState("");



    useEffect(() => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel();
        }

        const source = axios.CancelToken.source();
        setCancelTokenSource(source);
        isMounted.current = true;
        if (!disabled) {
            loadData(source).catch((error) => {
                if (isMounted?.current === true) {
                    throw error;
                }
            });
        }

        return () => {
            source.cancel();
            isMounted.current = false;
        };
    }, [tool, disabled]);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            await loadEnvs(cancelSource);
        }
        catch (error) {
            setErrorMessage(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const loadEnvs = async (cancelSource = cancelTokenSource) => {
        try {
            let res = await BoomiActions.getEnvironments(
              dataObject,
              getAccessToken,
              cancelSource,
            );
            if (res && res?.data && res?.data?.length > 0) {
              //remove selected environment if present for migrate step
              if (fieldName === "targetEnvironmentName") {
                const index = res?.data.findIndex(
                  (x) => x?.name === dataObject?.getData("environmentName"),
                );
                if (index !== undefined) res?.data?.splice(index, 1);
              }
              setEnvs(res?.data);
              return;
            }
            setEnvs([]);
            if (!isLoading && (environments == null || environments.length === 0)) {
                setPlaceholderText("No Boomi Environment found");
                setErrorMessage("No Boomi Environment found");
            }
        } catch (error) {
            if (!isLoading && (environments == null || environments.length === 0)) {
                setPlaceholderText("Boomi Environment information is missing or unavailable!");
                setErrorMessage("Boomi Environment information is missing or unavailable!");
            }
            console.error(error);
        }
    };

    const setDataFunction = async (fieldName, value) => {
        let newDataObject = dataObject;
        newDataObject.setData(fieldName, value.name);
        newDataObject.setData(idField, value.id);
        setDataObject({ ...newDataObject });
    };

    const clearDataFunction = async (fieldName, value) => {
        let newDataObject = dataObject;
        newDataObject.setData(fieldName, "");
        newDataObject.setData(idField, "");
        setDataObject({ ...newDataObject });
    };


    return (
        <div>
            <SelectInputBase
                fieldName={fieldName}
                dataObject={dataObject}
                setDataObject={setDataObject}
                setDataFunction={setDataFunction}
                clearDataFunction={clearDataFunction}
                selectOptions={environments}
                busy={isLoading}
                valueField={valueField}
                error={errorMessage}
                textField={textField}
                placeholderText={placeholder}
                disabled={disabled || isLoading}
            />
        </div>
    );
}

EnvironmentSelectInput.propTypes = {
    fieldName: PropTypes.string,
    idField: PropTypes.string,
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
    textField: PropTypes.string,
    valueField: PropTypes.string,
    tool: PropTypes.string
};

EnvironmentSelectInput.defaultProps = {
    valueField: "name",
    textField: "name",
    fieldName: "environmentName",
    idField : "environmentId"

};

export default EnvironmentSelectInput;
