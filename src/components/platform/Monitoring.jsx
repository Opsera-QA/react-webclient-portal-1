import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

function Monitoring(props) {

  const { data, setState, handleCancel } = useContext(NewAppContext);
  const { tools, isEKS } = props;
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
            onClick={() => selectCard("Nagios")}
          >
            <input type="checkbox"
              disabled={tools.includes("Nagios") ? true : false}
              checked={isChecked.Nagios && data["Nagios"]}
              className="newApp__checkbox"
              onClick={() => selectCard("Nagios")}
            />
            <img src={"/img/tools/nagios.png"} />
            <span className="newApp__service-title">Nagios</span>
          </div>

          <div
            className="newApp__service-logo newApp__service-logo--disabled"
          >
            <input type="checkbox"
              disabled={tools.includes("ZooKeeper") ? true : false}
              checked={isChecked.ZooKeeper && data["ZooKeeper"]}
              className="newApp__checkbox"
            />
            <img src={"/img/tools/zookeeper.png"} />
            <span className="newApp__service-title">ZooKeeper</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
} 

Monitoring.propTypes = {
  tools: PropTypes.array,
  isEKS: PropTypes.bool,
};

export default Monitoring;