#!/bin/bash

export AWS_ACCESS_KEY_ID=key_aws1
export AWS_SECRET_ACCESS_KEY=key_aws1
export AWS_DEFAULT_REGION=eu-central-1
export AWS_ENDPOINT_URL=http://localhost:4566

sleep 5

echo "AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID"
echo "AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY"
echo "AWS_DEFAULT_REGION: $AWS_DEFAULT_REGION"
echo "AWS_ENDPOINT_URL: $AWS_ENDPOINT_URL"

# Crée le bucket S3 si celui-ci n'existe pas
awslocal s3api head-bucket --bucket mes-fichiers 2>/dev/null || awslocal s3 mb s3://mes-fichiers
