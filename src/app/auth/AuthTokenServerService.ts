import { HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { NGXLoggerServerService } from "ngx-logger";
import { TokenStorageService } from "./token-storage.service";

@Injectable()
export class AuthTokenServerService extends NGXLoggerServerService {
    tokenService = inject(TokenStorageService);
    protected override alterHttpRequest(httpRequest: HttpRequest<object>): HttpRequest<object> {
        // Alter httpRequest by adding auth token to header 
        // httpRequest = httpRequest.clone({
        //     setHeaders: {
        //         ['Authorization']: 'Bearer ' + this.tokenService.getToken(),
        //     },
        // });
        return httpRequest;
    }
}