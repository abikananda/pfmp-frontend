import { Injectable } from '@angular/core';
import { AppVersion } from '../../environments/version';


@Injectable({
  providedIn: 'root'
})
export class VersionService {
  getVersion() {
    return AppVersion.version;
  }
}
