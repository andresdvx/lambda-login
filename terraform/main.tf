provider "aws" {
  region = "us-west-1"
}

resource "aws_iam_role" "lambda_exec_role_login" {
  name = "lambda_exec_role_login"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_policy" "lambda_policy_login" {
  name        = "lambda_policy_login"
  description = "leer en DynamoDB para validar usuario y contraseña"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "dynamodb:GetItem"
        ],
        Effect   = "Allow",
        Resource = "*" ,
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attach_login" {
  role       = aws_iam_role.lambda_exec_role_login.name
  policy_arn = aws_iam_policy.lambda_policy_login.arn
}

resource "aws_lambda_function" "lambda_login" {
  function_name = "lambda_login"
  role          = aws_iam_role.lambda_exec_role_login.arn
  handler       = "handler.handler"
  runtime       = "nodejs18.x"
  timeout       = 10
  filename      = "../dist/lambda-login.zip"

  source_code_hash = filebase64sha256("../dist/lambda-login.zip")
  depends_on = [aws_iam_role_policy_attachment.lambda_policy_attach_login]
}

output "login_lambda_arn" {
  value = aws_lambda_function.lambda_login.arn
}
