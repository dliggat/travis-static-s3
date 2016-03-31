#!/bin/bash

export PATH=$PATH:$HOME/.local/bin
echo "grunt" `which grunt`
echo "aws" `which aws`
grunt prepare_site
aws s3 sync _output/ s3://$S3_BUCKET --delete --region $AWS_REGION
