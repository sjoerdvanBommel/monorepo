terraform {
  required_providers {
    postgresql = {
      source = "cyrilgdn/postgresql"
    }
    
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.15.3"
    }
  }

  required_version = ">= 1.0.0"

  backend "s3" {
    bucket = "mr-ss-terraform-state"
    key    = "terraform_state"
    region = "eu-west-2"
  }
}

// Providers
provider "aws" {
  region     = var.AWS_REGION
  access_key = var.AWS_ACCESS_KEY
  secret_key = var.AWS_SECRET_KEY
}

provider "postgresql" {
  host            = aws_db_instance.mr-ss-db-instance.address
  port            = var.POSTGRES_PORT
  database        = var.POSTGRES_DB_NAME
  username        = var.POSTGRES_USERNAME
  password        = var.POSTGRES_DB_PASSWORD
  sslmode         = "require"
  connect_timeout = 15
  superuser       = false
}

provider "vercel" {
  api_token = var.VERCEL_API_TOKEN
}

// Postgres Database
resource "aws_security_group" "mr-ss-security-group" {
  name = "mr-ss-security-group"

  ingress {
    from_port   = var.POSTGRES_PORT
    to_port     = var.POSTGRES_PORT
    protocol    = "tcp"
    description = "PostgreSQL"
    cidr_blocks = ["0.0.0.0/0"] // >
  }

  ingress {
    from_port        = var.POSTGRES_PORT
    to_port          = var.POSTGRES_PORT
    protocol         = "tcp"
    description      = "PostgreSQL"
    ipv6_cidr_blocks = ["::/0"] // >
  }
}

resource "aws_db_instance" "mr-ss-db-instance" {
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "12.16"
  instance_class         = "db.t2.micro"
  identifier             = var.POSTGRES_IDENTIFIER
  db_name                = var.POSTGRES_DB_INSTANCE_NAME
  username               = var.POSTGRES_USERNAME
  password               = var.POSTGRES_DB_PASSWORD
  publicly_accessible    = true
  parameter_group_name   = "default.postgres12"
  vpc_security_group_ids = [aws_security_group.mr-ss-security-group.id]
  skip_final_snapshot    = true
}

// S3 bucket
resource "aws_s3_bucket" "mr-ss-bucket" {
  bucket                = "mr-ss-bucket-staging"
}

resource "aws_s3_bucket_versioning" "mr-ss-bucket-versioning" {
  bucket = aws_s3_bucket.mr-ss-bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_ownership_controls" "mr-ss-bucket-ownership-controls" {
  bucket = aws_s3_bucket.mr-ss-bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "mr-ss-bucket-public-access" {
  bucket = aws_s3_bucket.mr-ss-bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "mr-ss-bucket-acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.mr-ss-bucket-ownership-controls,
    aws_s3_bucket_public_access_block.mr-ss-bucket-public-access,
  ]

  bucket = aws_s3_bucket.mr-ss-bucket.id
  acl    = "public-read"
}

data "aws_iam_policy_document" "allow_public_read_access" {
  statement {
    principals {
      type            = "*"
      identifiers     = ["*"]
    }
    effect            = "Allow"
    actions = [
                        "s3:GetObject",
    ]
    resources = [
                        aws_s3_bucket.mr-ss-bucket.arn,
                        "${aws_s3_bucket.mr-ss-bucket.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "allow_public_read_access" {
  bucket = aws_s3_bucket.mr-ss-bucket.id
  policy = data.aws_iam_policy_document.allow_public_read_access.json
}

// Vercel project
resource "vercel_project" "mr-ss_web" {
  name                        = "swipe-script"
  framework                   = "nextjs"
  root_directory              = "packages/swipe-script/web"
  install_command             = "pnpm i"
  serverless_function_region  = "lhr1"
  environment = [
    {
      key                       = "DATABASE_URL"
      value                     = "postgresql://${var.POSTGRES_USERNAME}:${var.POSTGRES_DB_PASSWORD}@${aws_db_instance.mr-ss-db-instance.endpoint}/${var.POSTGRES_DB_NAME}"
      target                    = ["preview"]
    },
    {
      key                       = "AWS_BUCKET"
      value                     = aws_s3_bucket.mr-ss-bucket.bucket
      target                    = ["preview"]
    },
    {
      key                       = "AWS_REGION"
      value                     = var.AWS_REGION
      target                    = ["preview"]
    }
  ]
}

resource "vercel_project_domain" "mr-ss_web-staging-domain" {
  project_id = vercel_project.mr-ss_web.id
  domain     = "swipe-script-staging.vercel.app"
  git_branch = "staging"
}