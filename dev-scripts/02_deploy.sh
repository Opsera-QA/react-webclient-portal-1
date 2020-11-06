#!/bin/bash
KEY_PATH=/Users/toddbarczak/Documents/OpsERA/Keys/current/ec2OpsERA.cer
PROD_JUMPOFF=10.0.1.230

scp -i $KEY_PATH remote-script.sh ec2-user@$PROD_JUMPOFF:/tmp/deploy-react.sh
echo "uploaded script"
ssh -T -i $KEY_PATH ec2-user@$PROD_JUMPOFF '
ls -lrth /tmp/deploy-react.sh
scp -i /home/ec2-user/keys/ec2OpsERA.pem /tmp/deploy-react.sh ec2-user@10.0.2.49:/tmp/deploy-react.sh
    ssh -T -i /home/ec2-user/keys/ec2OpsERA.pem ec2-user@10.0.2.49 "
        chmod +x /tmp/deploy-react.sh
        /tmp/deploy-react.sh
        rm /tmp/deploy-react.sh"
'
