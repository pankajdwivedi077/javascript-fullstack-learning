import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"

@Injectable()
export class LoginInterceptor implements NestInterceptor{

  private readonly logger = new Logger(LoginInterceptor.name)

  // context -> contains request and response object
  //next -> route handler executes
  intercept(context: ExecutionContext, next: CallHandler): Observable<any>  {
      const request = context.switchToHttp().getRequest()
      const { method, url, body, query, params } = request
      const userAgent = request.get("user-agent") || "unknown"
      const userId = request?.user?.id || "unauthenticated"
      this.logger.log(`
        [${method} ${url} ${userId} ${userAgent}]`
    )
    const startTime =Date.now()
    // tap operator allows us to perform side effect
    return next.handle().pipe(

        tap({
            next: (data)=> {
                const endTime = Date.now();
                const duration = endTime - startTime
                this.logger.log(    
                    `[${method} ${url} ${duration}]`
                )
            },
            error: (error)=>{
                const endTime = Date.now()
                const duration = endTime - startTime
                  this.logger.log(    
                    `[${method} ${url} ${duration} errorMessage ${error.message}]`
                )
            }
        })
    )
  }

}