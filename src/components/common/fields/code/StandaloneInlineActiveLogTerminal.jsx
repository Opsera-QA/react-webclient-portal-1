import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faComputerClassic} from "@fortawesome/pro-light-svg-icons";
import FieldTitleBar from "components/common/fields/FieldTitleBar";
import InputContainer from "components/common/inputs/InputContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";

function StandaloneInlineActiveLogTerminal({logs, title, errorMessage, className, isLoading, noDataMessage}) {
  const isMounted = useRef(false);
  const [formattedLogs, setFormattedLogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    isMounted.current = true;

    setFormattedLogs([]);
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, [logs]);

  const loadData = async () => {
    try {
      setFormattedLogs(logs);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };


  const getBody = () => {
    if (isLoading === true) {
      return (
        <div className={"h-100 w-100 d-flex"}>
          <div className={"m-auto w-100"}>
            <LoadingDialog size={"sm"} message={"Loading Data"} />
          </div>
        </div>
      );
    }

    if (errorMessage != null && errorMessage !== "") {
      return (
        <div className={"h-100 w-100 d-flex"}>
          <div className={"m-auto w-100"}>
            <ErrorDialog error={errorMessage}/>
          </div>
        </div>
      );
    }

    if (error != null && error !== "") {
      return (
        <div className={"h-100 w-100 d-flex"}>
          <div className={"m-auto w-100"}>
            <ErrorDialog error={error}/>
          </div>
        </div>
      );
    }

    if (logs == null || !Array.isArray(logs) || logs.length === 0) {
      return (
        <div className={"h-100 w-100 d-flex"}>
          <div className={"m-auto w-100"}>
            {noDataMessage}
          </div>
        </div>
      );
    }

    return (formattedLogs);
  };

  return (
    <InputContainer className={className}>
      <div className="object-properties-input">
        <div className="content-container">
          <FieldTitleBar customTitle={title} icon={faComputerClassic} isLoading={isLoading} />
          <div className={"console-text"} style={{height: "500px", maxHeight: "500px", overflowY: "auto"}}>
            {getBody()}
          </div>
        </div>
      </div>
    </InputContainer>
  );
}

StandaloneInlineActiveLogTerminal.propTypes = {
  logs: PropTypes.any,
  title: PropTypes.string,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  noDataMessage: PropTypes.string,
};

export default StandaloneInlineActiveLogTerminal;