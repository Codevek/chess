import { getHealthStatus } from "../services/health.service.js"

export function healthCheck(req, res){
    const health = getHealthStatus()
    res.status(200).json(health)
}