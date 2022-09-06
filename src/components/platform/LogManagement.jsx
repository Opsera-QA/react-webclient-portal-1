import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { 
  Card, 
  Form,
  OverlayTrigger,
  Popover,
  Tooltip } from "react-bootstrap";
import { NewAppContext } from "./context";

function LogManagement(props) {

  const { data, setState, handleCancel } = useContext(NewAppContext);
  const { tools, isEKS  } = props;

  const [isChecked, setCheckbox] = useState({
    ElasticSearch: tools.includes("ElasticSearch") ? true : false,
    LogStash: tools.includes("LogStash") ? true : false,
    Kibana: tools.includes("Kibana") ? true : false,
   
  });

  useEffect(() => {
    setCheckbox({ 
      ElasticSearch: false,
      Kibana: false,
      LogStash: false
    });
    if(tools.length > 0) {
      tools.map((tool) => {
        if(isChecked[tool] !== undefined) {
          setCheckbox({ 
            ...isChecked, 
            [tool] : true 
          });
        }
      });
    }
  }, [tools]);

  const selectCard = (serviceType) => {
    //On each click, check if it's already selected 
    if(isChecked[serviceType] ) {
      //de-select the checkbox
      setCheckbox({ 
        ...isChecked, 
        [serviceType] : false
      });
      //remove the entry from master dataset ( data from context here )
      // delete data[serviceType];
      handleCancel();
    }else {
      //If it's a new selection, select the checkbox, show the modal and update the dataset (data from context here )
      setCheckbox({ 
        ...isChecked, 
        [serviceType] : true
      });
      setState({
        open: true,
        category: "Log Management",
        service: serviceType,
      });
    }
  };

  return (
    <Card style={{ minWidth: "16rem" }}>
      <Card.Body className="text-center">
        <Card.Title>Log Management</Card.Title>
        <div>
        <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id={`tooltip-top`}>
                  For spinning up this tool, please contact <strong>support@opsera.io</strong>
                </Tooltip>
              }
            >
          <div 
            // className={`newApp__service-logo ${tools.includes("ElasticSearch") ? "newApp__service-logo--alredy-installed" : ""}`} 
            className="newApp__service-logo newApp__service-logo--disabledButAvailable"
            // onClick={() => selectCard("ElasticSearch")} 
            >
            <input type="checkbox"
              disabled={tools.includes("ElasticSearch") ? true : false}
              checked={isChecked.ElasticSearch && data["ElasticSearch"]}
              className="newApp__checkbox"
              // onClick={() => selectCard("ElasticSearch")}
            />
            <img src={"/img/tools/elastic-search.png"} />
            <span className="newApp__service-title">ElasticSearch</span>
          </div>
          </OverlayTrigger>

          <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id={`tooltip-top`}>
                  For spinning up this tool, please contact <strong>support@opsera.io</strong>
                </Tooltip>
              }
            >
          <div
            // className={`newApp__service-logo ${tools.includes("Kibana") ? "newApp__service-logo--alredy-installed" : !isEKS ? "newApp__service-logo--disabled" : ""}`}
            className="newApp__service-logo newApp__service-logo--disabledButAvailable"
            // onClick={() => selectCard("Kibana")}
          >
            <input type="checkbox"
              disabled={tools.includes("Kibana") ? true : false}
              checked={isChecked.Kibana && data["Kibana"]}
              className="newApp__checkbox"
              // onClick={() => selectCard("Kibana")}
            />
            <img src={"/img/tools/kibana.png"} />
            <span className="newApp__service-title">Kibana</span>
          </div>
          </OverlayTrigger>

          <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id={`tooltip-top`}>
                  For spinning up this tool, please contact <strong>support@opsera.io</strong>
                </Tooltip>
              }
          >
          <div
          //  className={`newApp__service-logo ${tools.includes("LogStash") ? "newApp__service-logo--alredy-installed" : !isEKS ? "newApp__service-logo--disabled" : ""}`}
          className="newApp__service-logo newApp__service-logo--disabledButAvailable"
          //  onClick={() => selectCard("LogStash")}
          >
            <input type="checkbox"
              disabled={tools.includes("LogStash") ? true : false}
              checked={isChecked.LogStash && data["LogStash"]}
              className="newApp__checkbox"
              // onClick={() => selectCard("LogStash")}
            />
            <img src={"/img/tools/log-stash.png"} />
            <span className="newApp__service-title">LogStash</span>
          </div>
          </OverlayTrigger>
        </div>
      </Card.Body>
    </Card>
  );
} 

LogManagement.propTypes = {
  tools: PropTypes.array,
  isEKS: PropTypes.bool,
};

export default LogManagement;
