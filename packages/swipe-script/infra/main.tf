terraform {
  required_providers {
    postgresql = {
      source  = "cyrilgdn/postgresql"
    }
    
    vercel = {
      source = "vercel/vercel"
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

# resource "postgresql_role" "user_name" {
#   name                = var.POSTGRES_USERNAME
#   login               = true
#   password            = var.POSTGRES_USER_PASSWORD
#   encrypted_password  = true
#   create_database     = true
#   create_role         = true
#   skip_reassign_owned = true
# }

resource "vercel_project" "mr-ss_web" {
  name      = "swipe-script"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "sjoerdvanbommel/monorepo"
  }
  root_directory = "packages/swipe-script/web"
  install_command = "pnpm i"
}