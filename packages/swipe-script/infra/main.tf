terraform {
  required_providers {
    postgresql = {
      source = "cyrilgdn/postgresql"
    }
    
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.4"
    }
  }

  required_version = ">= 1.0.0"

  backend "s3" {
    bucket = "mr-ss-terraform-state"
    key    = "terraform_state"
    region = "eu-west-2"
  }
}

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

// POSTGRES
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

resource "vercel_project" "mr-ss_web" {
  name                        = "swipe-script"
  framework                   = "nextjs"
  root_directory              = "packages/swipe-script/web"
  install_command             = "pnpm i"
  serverless_function_region  = "lhr1"
  environment = [{
    key                       = "DATABASE_URL"
    value                     = "postgresql://${var.POSTGRES_USERNAME}:${var.POSTGRES_DB_PASSWORD}@${aws_db_instance.mr-ss-db-instance.endpoint}/${var.POSTGRES_DB_NAME}"
    target                    = ["preview"]
  }]
}

resource "vercel_project_domain" "mr-ss_web-staging-domain" {
  project_id = vercel_project.mr-ss_web.id
  domain     = "swipe-script-staging.vercel.app"
  git_branch = "staging"
}