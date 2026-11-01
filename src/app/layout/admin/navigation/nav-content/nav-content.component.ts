import { Component, OnInit } from '@angular/core';
import { NavigationItems, NavigationItem } from '../navigation';
import { FeatureToggleService } from '../../../../services/feature-toggle.service';
import { VersionService } from '../../../../services/version.service';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {
  enabledFeatures: string[] = [];
  appVersion = '';
  navigations: NavigationItem[] = [];
  constructor(
    private versionService: VersionService,
    private featureToggleService: FeatureToggleService
  ) {
    this.navigations = NavigationItems;
  }

  ngOnInit() {
    this.appVersion = this.versionService.getVersion();
    this.featureToggleService.getEnabledFeatures().subscribe({
      next: (features) => {
        console.log("Features received:", features);
        this.enabledFeatures = features;
      },
      error:(error) => {
        console.error('Error fetching features:', error);
      }
    });
  }

  isFeatureEnabled(feature: string): boolean {
    return this.enabledFeatures.includes(feature);
  }
}
