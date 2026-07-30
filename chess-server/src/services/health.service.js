export function getHealthStatus() {

    // throw new Error("Testing")
  return {
    success: true,
    message: "mf",
    uptime: process.uptime(),
  };
}
