import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

function Monitoring(props) {

  const { data, setState } = useContext(NewAppContext);
  const { tools } = props;
  const [isChecked, setCheckbox] = useState({
    Nagios: tools.includes("Nagios") ? true : false,
    ZooKeeper: tools.includes("ZooKeeper") ? true : false
  });

  useEffect(() => {
    setCheckbox({ 
      Nagios: false,
      ZooKeeper: false
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
        category: "Monitoring",
        service: serviceType,
      });
    }
  };


  return (
    <Card style={{ minWidth: "16rem" }}>
      <Card.Body className="text-center">
        <Card.Title>Monitoring</Card.Title>
          
        <div>
          <div
            className={`newApp__service-logo ${tools.includes("Nagios") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("Nagios"),
                category: "Monitoring",
                service: "Nagios",
              })
            }
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("Nagios") ? true : false}
              checked={isChecked.Nagios}
              className="newApp__checkbox"
              onClick={() => selectCard("Nagios")}
            />
            <img src={require("./imgs/nagios.png")} />
            <span className="newApp__service-title">Nagios</span>
          </div>

          <div
            className="newApp__service-logo newApp__service-logo--disabled"
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("ZooKeeper") ? true : false}
              checked={isChecked.ZooKeeper}
              className="newApp__checkbox"
            />
            <img src={require("./imgs/zookeeper.png")} />
            <span className="newApp__service-title">ZooKeeper</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
} 

Monitoring.propTypes = {
  tools: PropTypes.array
};

export default Monitoring;