import { getHealthStatus } from "../services/health.service.js"

export function healthCheck(req, res){
    const health = getHealthStatus()
    res.send(health)
}