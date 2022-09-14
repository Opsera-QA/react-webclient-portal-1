import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";


function ContainerScan(props) {

  const { data, setState, handleCancel } = useContext(NewAppContext);
  const { tools, isEKS } = props;
  const [isChecked, setCheckbox] = useState({
    Anchore: tools.includes("Anchore") ? true : false,
   });

  useEffect(() => {
    setCheckbox({ 
      Anchore: false,  
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
        category: "ContainerScan",
        service: serviceType,
      });
    }
  };


  return (
    <Card style={{ minWidth: "16rem" }}>
      <Card.Body className="text-center">
        <Card.Title>Container Scan</Card.Title>
          
          <div
            className={`newApp__service-logo ${tools.includes("Anchore") ? "newApp__service-logo--alredy-installed" : !isEKS ? "newApp__service-logo--disabled" : ""}`}
            onClick={() => selectCard("Anchore")}
          >
            <input type="checkbox"
              disabled={tools.includes("Anchore") ? true : false}
              checked={isChecked.Anchore && data["Anchore"]}
              className="newApp__checkbox"
              onClick={() => selectCard("Anchore")}
            />
            <img src={"/img/tools/anchore.png"} />
            <span className="newApp__service-title">Anchore</span>
          </div>

      </Card.Body>
    </Card>
  );
} 

ContainerScan.propTypes = {
  tools: PropTypes.array,
  isEKS: PropTypes.bool,
};

export default ContainerScan;