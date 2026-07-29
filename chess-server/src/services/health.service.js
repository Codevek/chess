export function getHealthStatus() {

    throw new Error("Testing")
  return {
    success: true,
    message: "yep its working",
    uptime: process.uptime(),
  };
}
