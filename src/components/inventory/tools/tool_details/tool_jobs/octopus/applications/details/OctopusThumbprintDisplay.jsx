import React, { useEffect, useContext, useState, useRef } from "react";
import PropTypes from 'prop-types';
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import { Col } from "react-bootstrap";
import OctopusActions from "../../octopus-actions";
import LoadingIcon from "components/common/icons/LoadingIcon";

function OctopusThumbprintDisplay ({dataObject, setDataObject, toolData, className}) {
    
    const { getAccessToken } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);    
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [thumbprintLoading, setThumbprintLoading] = useState(false);
    const isMounted = useRef(false);

    useEffect(() => {
        if (cancelTokenSource) {
          cancelTokenSource.cancel();
        }
    
        const source = axios.CancelToken.source();
        setCancelTokenSource(source);
        isMounted.current = true;
        
        fetchIisThumbprint(cancelTokenSource);
    
        return () => {
          source.cancel();
          isMounted.current = false;
        };
    
    }, []); 

    const fetchIisThumbprint = async (cancelSource = cancelTokenSource) => {    
        setThumbprintLoading(true);
        const response = await OctopusActions.fetchIisThumbprint(toolData._id, getAccessToken, cancelSource);    
        if(response.data.status === 200){
          let newDataObject = dataObject;
          newDataObject.setData("thumbprint", response.data.message.thumbprint);
          setDataObject({ ...newDataObject });
        }else {
          toastContext.showLoadingErrorDialog(response.data.message);
        }
        setThumbprintLoading(false);
    };

    return (
      <>
        {thumbprintLoading ? (<span className="ml-4"><LoadingIcon className={"mr-1"}/></span>) : (
          <Col lg={12} className={className}>
              <TextFieldBase dataObject={dataObject} fieldName={"thumbprint"}/>
              <small className="form-text text-muted">
                  Please Note: You must configure this thumbprint in your host machine to save this target
              </small>
          </Col>
        )}
      </>              
    );
}

OctopusThumbprintDisplay.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    toolData: PropTypes.object,
    className: PropTypes.string
};

export default OctopusThumbprintDisplay;
