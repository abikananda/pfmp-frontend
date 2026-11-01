export interface NavigationItem {
  id: string;
  title: string;
  featureName: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'manual-lending',
    title: 'Manual Lending & Stocks',
    featureName: 'manual_lending',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        featureName: 'manual_lending',
        type: 'item',
        url: '/app/manual_lending/dashboard',
        classes: 'nav-item',
        icon: 'feather icon-home',
        exactMatch: true
      },
      {
        id: 'investment-manage',
        title: 'Manage Investment',
        featureName: 'manual_lending',
        type: 'item',
        url: '/app/manual_lending/uploadReport',
        classes: 'nav-item',
        icon: 'feather icon-settings',
        exactMatch: true
      }
    ]
  },
  {
    id: 'fixed-investment',
    title: 'Fixed Investments',
    featureName: 'fixed_investment',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        featureName: 'fixed_investment',
        type: 'item',
        url: '/app/fixed_investment/dashboard',
        classes: 'nav-item',
        icon: 'feather icon-home',
        exactMatch: true
      },
      {
        id: 'fixed-investment-manage',
        title: 'Manage Investment',
        featureName: 'fixed_investment',
        type: 'item',
        url: '/app/fixed_investment/manage-investment',
        classes: 'nav-item',
        icon: 'feather icon-settings',
        exactMatch: true
      }
    ]
  },
  {
    id: 'other-account-tracking',
    title: 'Other Account Tracking',
    featureName: 'other_account_tracking',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        featureName: 'other_account_tracking',
        type: 'item',
        url: '/app/other_account/dashboard',
        classes: 'nav-item',
        icon: 'feather icon-home',
        exactMatch: true
      },
      {
        id: 'account-manage',
        title: 'Manage Account',
        featureName: 'other_account_tracking',
        type: 'item',
        url: '/app/other_account/manage',
        classes: 'nav-item',
        icon: 'feather icon-settings',
        exactMatch: true
      }
    ]
  }
];
