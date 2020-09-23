import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

import { NewAppContext } from "./context";

function ConfigurationManagement(props) {

  const { data, setState, handleCancel } = useContext(NewAppContext);
  const { tools } = props;
  const [isChecked, setCheckbox] = useState({
    Ansible: tools.includes("Ansible") ? true : false,
    Chef: tools.includes("Chef") ? true : false,
    Puppet: tools.includes("Puppet") ? true : false,
  });

  useEffect(() => {
    console.log("tools use effect")
    setCheckbox({ 
      Ansible: false,
      Chef: false,
      Puppet: false,
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
      // but when cancel is clicked it still true here - needs to be fixed
      setCheckbox({ 
        ...isChecked, 
        [serviceType] : true
      });
      setState({
        open: true,
        category: "Configuration Management",
        service: serviceType,
      });
    }
  };

  return (
    <>
      <Card style={{ minWidth: "16rem" }}>
        <Card.Body className="text-center">
          <Card.Title>Configuration Management</Card.Title>
          <div>
            <div
              className={`newApp__service-logo ${tools.includes("Ansible") ? "newApp__service-logo--alredy-installed" : ""}`}
              onClick={() => selectCard("Ansible")}>
              <input type="checkbox"
                inline
                disabled={tools.includes("Ansible") ? true : false}
                checked={isChecked.Ansible && data["Ansible"]}
                className="newApp__checkbox"
                onClick={() => selectCard("Ansible")}
              />
              <img src={require("./imgs/ansible.png")} alt="Ansible" />
              <span className="newApp__service-title">Ansible</span>
            </div>

            <div
              className="newApp__service-logo newApp__service-logo--disabled"
            >
              <input type="checkbox"
                inline
                disabled={tools.includes("Chef") ? true : false}
                checked={isChecked.Chef && data["Chef"]}
                className="newApp__checkbox"
              />
              <img src={require("./imgs/chef.png")} alt="Chef" />
              <span className="newApp__service-title">Chef</span>
            </div>

            <div
              className="newApp__service-logo newApp__service-logo--disabled"
            >
              <input type="checkbox"
                inline
                disabled={tools.includes("Puppet") ? true : false}
                checked={isChecked.Puppet && data["Puppet"]}
                className="newApp__checkbox"
              />
              <img src={require("./imgs/puppet.png")} alt="Puppet"/>
              <span className="newApp__service-title">Puppet</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
} 

ConfigurationManagement.propTypes = {
  tools: PropTypes.array
};

export default ConfigurationManagement;