import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { MongoError } from 'mongodb'
import { Response, Request } from 'express'


@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    switch (exception.code) {
      case 11000:
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: exception.message,
            error: exception.name,
          })
    }
  }
}