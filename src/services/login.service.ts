import { DynamoDB } from "aws-sdk";
import { comparePassword } from "../utils/password.util";
import { generateToken } from "../utils/jwt.util";

const dynamo = new DynamoDB.DocumentClient();
const USERS_TABLE = "Users";

interface LoginInput {
  email: string;
  password: string;
}

export async function loginUser({ email, password }: LoginInput) {
    
  const result = await dynamo.get({
    TableName: USERS_TABLE,
    Key: { email }, 
  }).promise();

  if (!result.Item) {
    throw new Error("Invalid credentials");
  }

  const user = result.Item;

  const isValid = await comparePassword(password, user.password);
  
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({ id: user.id });

  return {
    message: "Login exitoso",
    token,
  };
}
