//********** Imports **********//
import MessageResponse from "./MessageResponse";

//********** Message **********//
export default interface ErrorResponse extends MessageResponse {
  stack?: string;
}
