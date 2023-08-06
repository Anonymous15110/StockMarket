import Depot from '../views/Depot';
import Market from '../views/Market';
import Quests from '../views/Quests';
import Loan from '../views/Loan';
export interface AppRoute {
    path: string;
    name: string;
    icon?: string;
    // tslint:disable-next-line no-any
    component?: any;
    upgrade?: boolean;
    redirect?: boolean;
    to?: string;
}

const appRoutes: AppRoute[] = [
    { path: '/depot', name: 'Depot', icon: 'pe-7s-wallet', component: Depot },
    { path: '/market', name: 'Market', icon: 'pe-7s-graph1', component: Market },
    { path: '/quests', name: 'Quests', icon: 'pe-7s-note2', component: Quests },
    { path: '/loan', name: 'Loans', icon: 'pe-7s-note2', component: Loan },
    { path: '/', name: 'Depot', redirect: true, to: '/login' },
];

export default appRoutes;