FROM localstack/localstack:latest
RUN export AWS_ACCESS_KEY_ID=key_aws1
RUN export AWS_SECRET_ACCESS_KEY=key_aws1
RUN export AWS_ENDPOINT_URL=http://localhost:4566
RUN awslocal s3api head-bucket --bucket mes-fichiers 2>/dev/null || awslocal s3 mb s3://mes-fichiers
