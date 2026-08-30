import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import type { UserRegisteredEvent } from "../user-events.service";

@Injectable()
export class UserRegisteredListner{

    private readonly logger = new Logger(UserRegisteredListner.name);

    @OnEvent("user.registered")
    hadleUserRegisterEvent(event:UserRegisteredEvent):void{
        const { user, timeStamp } = event
        this.logger.log(`welocome ${user.email}`)
    }

}