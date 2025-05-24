import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { loginUser } from "./services/login.service";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent):Promise<APIGatewayProxyResult> => {
  try {

    const body = JSON.parse(event.body || "{}");
    const response = await loginUser(body);
    
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };

  } catch (err: any) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
