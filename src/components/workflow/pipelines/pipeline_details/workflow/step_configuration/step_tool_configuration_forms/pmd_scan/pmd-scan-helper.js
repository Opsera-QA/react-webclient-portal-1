const PMDScanHelper = {};

const RULE_LIST = [
    {"name": "Best Practices", "value":"bestPracticeThreshold"},
    {"name": "Code Style", "value":"codeStyleThreshold"},
    {"name": "Design", "value":"designThreshold"},
    {"name": "Error Prone", "value":"errorProneThreshold"},
    {"name": "Security", "value":"securityThreshold"},
  ];

PMDScanHelper.constructQualityGate = async(pmdConfig) => { 
   let qualityGate = [];

   RULE_LIST.map((rule) => {
    let obj = {
        "rule": rule.name,
        "threshold": pmdConfig[rule.value]
    };
    qualityGate.push(obj);
   });
   return qualityGate;
};


export default PMDScanHelper;