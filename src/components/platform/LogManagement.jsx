import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card, Form } from "react-bootstrap";
import { NewAppContext } from "./context";

function LogManagement(props) {

  const { data, setState } = useContext(NewAppContext);
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
      delete data[serviceType];
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
          <div 
            className={`newApp__service-logo ${tools.includes("ElasticSearch") ? "newApp__service-logo--alredy-installed" : ""}`} 
            onClick={() => selectCard("ElasticSearch")} >
            <input type="checkbox"
              inline
              disabled={tools.includes("ElasticSearch") ? true : false}
              checked={isChecked.ElasticSearch && data["ElasticSearch"]}
              className="newApp__checkbox"
              onClick={() => selectCard("ElasticSearch")}
            />
            <img src={require("./imgs/elastic-search.png")} />
            <span className="newApp__service-title">ElasticSearch</span>
          </div>

          <div
            className={`newApp__service-logo ${tools.includes("Kibana") ? "newApp__service-logo--alredy-installed" : !isEKS ? "newApp__service-logo--disabled" : ""}`}
            onClick={() => selectCard("Kibana")}
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("Kibana") ? true : false}
              checked={isChecked.Kibana && data["Kibana"]}
              className="newApp__checkbox"
              onClick={() => selectCard("Kibana")}
            />
            <img src={require("./imgs/kibana.png")} />
            <span className="newApp__service-title">Kibana</span>
          </div>

          <div
            className="newApp__service-logo newApp__service-logo--disabled"
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("LogStash") ? true : false}
              checked={isChecked.LogStash && data["LogStash"]}
              className="newApp__checkbox"
            />
            <img src={require("./imgs/log-stash.png")} />
            <span className="newApp__service-title">LogStash</span>
          </div>
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
