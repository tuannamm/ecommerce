import mongoose from "mongoose";
import os from "os";

const SECONDS_CHECK_OVERLOAD = Number(process.env.SECONDS_CHECK_OVERLOAD) ||  5000;

const countConnection = () => {
  const numConnection = mongoose.connections.length;
  return numConnection;
}

const checkOverload = () => {
setInterval(() => {
  const numConnection = countConnection();
  const numCores = os.cpus().length;
  const memoryUsage = process.memoryUsage().rss;
  const maxConnections= numCores * 5;

  console.log(`Active connections: ${numConnection}`);
  console.log(`Max connections: ${maxConnections}`);
  console.log(`Memory usage: ${memoryUsage}`);

  if (numConnection > maxConnections) {
    console.log("Overload detected");
  }

}, SECONDS_CHECK_OVERLOAD)
}

export { countConnection, checkOverload } ;