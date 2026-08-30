import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserEventsService } from './user-events.service';
import { UserRegisteredListner } from './listeners/user.registered.listerner';

@Module({
    imports: [
        EventEmitterModule.forRoot({
            global: true,
            wildcard: false,
            maxListeners: 15,
            verboseMemoryLeak: true 
        })
    ],
    providers: [
        UserEventsService, UserRegisteredListner
    ],
    exports: [UserEventsService]
})
export class EventsModule {
    
}
