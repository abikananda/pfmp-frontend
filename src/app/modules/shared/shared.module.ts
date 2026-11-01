// Angular Import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// project import
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CardComponent } from './components/card/card.component';
import { DataFilterPipe } from './filter/data-filter.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';

// third party
import { NgScrollbarModule } from 'ngx-scrollbar';
// import 'hammerjs';
// import 'mousetrap';

// bootstrap import
import { NgbDropdownModule, NgbNavModule, NgbModule, NgbPopoverModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from '../../layout/admin/admin.component';
import { NavBarComponent } from '../../layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from '../../layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from '../../layout/admin/nav-bar/nav-right/nav-right.component';
import { NavCollapseComponent } from '../../layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavContentComponent } from '../../layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from '../../layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from '../../layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavigationComponent } from '../../layout/admin/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from './components/avatar/avatar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    BreadcrumbComponent,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
    NgScrollbarModule,
    RouterModule,
    NgbPopoverModule,
    NgbProgressbarModule

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    BreadcrumbComponent,
    DataFilterPipe,
    SpinnerComponent,
    AvatarComponent,
    NgbModule,
    NgbDropdownModule,
    NgbNavModule,
    NgScrollbarModule
  ],
  declarations: [DataFilterPipe, SpinnerComponent, AvatarComponent, AdminComponent, NavBarComponent, NavLeftComponent, NavRightComponent, NavContentComponent,
    NavItemComponent,
    NavigationComponent,
    NavCollapseComponent,
    NavGroupComponent]
})
export class SharedModule { }
