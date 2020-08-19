import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

function Kubernetes(props) {

  const { data, setState } = useContext(NewAppContext);
  const { tools } = props;
  const [isChecked, setCheckbox] = useState({
    Anchore: tools.includes("Anchore") ? true : false,
    Argocd: tools.includes("Argocd") ? true : false,
    Spinnaker: tools.includes("Spinnaker") ? true : false,
  });

  useEffect(() => {
    setCheckbox({ 
      Anchore: false,
      Argocd: false,
      Spinnaker: false,
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
        <Card.Title>Kubernetes</Card.Title>
          
        <div>
          <div
            className={`newApp__service-logo ${tools.includes("Anchore") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("Anchore"),
                category: "Monitoring",
                service: "Anchore",
              })
            }
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("Anchore") ? true : false}
              checked={isChecked.Anchore}
              className="newApp__checkbox"
              onClick={() => selectCard("Anchore")}
            />
            <img src={require("./imgs/anchore.png")} />
            <span className="newApp__service-title">Anchore</span>
          </div>



          <div
            className={`newApp__service-logo ${tools.includes("Argocd") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("Argocd"),
                category: "Monitoring",
                service: "Argocd",
              })
            }
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("Argocd") ? true : false}
              checked={isChecked.Argocd}
              className="newApp__checkbox"
              onClick={() => selectCard("Argocd")}
            />
            <img src={require("./imgs/argocd.png")} />
            <span className="newApp__service-title">Argocd</span>
          </div>



          <div
            className={`newApp__service-logo ${tools.includes("Spinnaker") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("Spinnaker"),
                category: "Monitoring",
                service: "Spinnaker",
              })
            }            
          >
            <input type="checkbox"
              inline
              disabled={tools.includes("Spinnaker") ? true : false}
              checked={isChecked.Spinnaker}
              className="newApp__checkbox"
              onClick={() => selectCard("Spinnaker")}
            />
            <img src={require("./imgs/spinnaker.png")} />
            <span className="newApp__service-title">Spinnaker</span>
          </div>
        </div>


      </Card.Body>
    </Card>
  );
} 

Kubernetes.propTypes = {
  tools: PropTypes.array
};

export default Kubernetes;