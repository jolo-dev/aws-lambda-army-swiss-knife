import MyStack from "./MyStack";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App) {
  new MyStack(app, "my-stack");

  // Add more stacks
}
