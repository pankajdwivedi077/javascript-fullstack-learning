// logger middleware

import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTp")
  use(req: Request, res: Response, next: NextFunction): void {
    const { method, url, ip } = req
    const userAgent = req.get("user-agent") || "unknown"
    this.logger.log(`
      [Incoming] ${method} ${url} ${ip} ${userAgent}
      `)
      req["startTime"] = Date.now()
      req.on("finish", ()=>{
        const duration = Date.now() - req["startTime"]
        const {statusCode} = res;
        if(statusCode>=500){
          this.logger.error(`
            [Response] -> ${method} ${url} ${statusCode} ${duration}
            `)
        }else if(statusCode >=400){
            this.logger.warn(`
            [Response] -> ${method} ${url} ${statusCode} ${duration}
            `)
        }else{
           this.logger.log(`
            [Response] -> ${method} ${url} ${statusCode} ${duration}
            `)
        }
      })
    next();
  }
}
