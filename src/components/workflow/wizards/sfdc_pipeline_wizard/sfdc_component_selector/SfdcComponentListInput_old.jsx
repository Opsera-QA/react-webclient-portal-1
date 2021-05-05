import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import LoadingDialog from "components/common/status_notifications/loading";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import axios from "axios";
import {faCheck, faSquare} from "@fortawesome/pro-light-svg-icons";

const SfdcComponentListInput_old = ({
  sfdcToolId,
  isProfiles,
  setSelectedComponentTypes,
  selectedComponentTypes,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [componentTypes, setComponentTypes] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  Moment.locale("en");
  momentLocalizer();

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
  }, [isProfiles, sfdcToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);
      if(sfdcToolId) {
        const response = await sfdcPipelineActions.getComponentTypesV2(getAccessToken, cancelSource, sfdcToolId, isProfiles);
        if (isMounted?.current === true && response?.data) {
          setComponentTypes(response.data);
        }
      }
    } catch (error) {
      console.error("Error getting API Data: ", error);

      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const handleCheckAllClickComponentTypes = () => {
    setSelectedComponentTypes(componentTypes.filter((obj)=>{return obj.enabled;}).map(({ name }) => name));
  };

  const handleUnCheckAllClickComponentTypes = () => {
    setSelectedComponentTypes([]);
  };

  const renderTooltip = (message, props) => (
    <Tooltip id="button-tooltip" style={{"zIndex": 1500}} {...props}>
      {message.length > 0 ? message : "No file extension found."}
    </Tooltip>
  );

  const handleComponentCheck = (e) => {
    const newValue = e.target.name;
    // console.log("selected value: " ,newValue)
    if (e.target.checked) {
      setSelectedComponentTypes((selectedComponentTypes) => [...selectedComponentTypes, newValue]);
    } else {
      setSelectedComponentTypes(selectedComponentTypes.filter((item) => item !== newValue));
    }
  };

  return (
    <>
      <div className="w-100 d-flex justify-content-end">
        <Button variant="secondary" size="sm" className="mr-2" onClick={handleCheckAllClickComponentTypes}>
          <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1"/>
          Check All
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="mr-2"
          onClick={handleUnCheckAllClickComponentTypes}
        >
          <FontAwesomeIcon icon={faSquare} fixedWidth className="mr-1"/>
          Uncheck All
        </Button>
      </div>

      <div className="mx-2">
        <div className="text-muted">Select Components:</div>
        <div>
          <div className="d-flex flex-wrap">
            {loading ? (
              <LoadingDialog size="sm"/>
            ) : (
              <>
                {typeof componentTypes === "object" &&
                componentTypes.map((item, idx) => (
                  <div key={idx} className="p-2 w-25">
                    <OverlayTrigger
                      placement="right"
                      // delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip(item.value)}
                    >
                              <span>
                                <Form.Check
                                  inline
                                  disabled={!item.enabled}
                                  type={"checkbox"}
                                  label={item.name}
                                  name={item.name}
                                  id={item.name}
                                  checked={selectedComponentTypes.includes(item.name)}
                                  onChange={handleComponentCheck}
                                />
                              </span>
                    </OverlayTrigger>
                  </div>

                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

SfdcComponentListInput_old.propTypes = {
  sfdcToolId: PropTypes.string,
  isProfiles: PropTypes.bool,
  setSelectedComponentTypes: PropTypes.func,
  selectedComponentTypes: PropTypes.array,
};

export default SfdcComponentListInput_old;
