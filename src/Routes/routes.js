import Home from '~/Pages/Home';
import Following from '~/Pages/Following';
import Profile from '~/Pages/Profile';
import { HeaderOnly } from '~/layouts';
import config from '~/config';
import Live from '~/Pages/Live/Live';
import Explore from '~/Pages/Explore/Explore';

const publicPages = [
    { path: config.routes.root, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.profile, component: Profile, layout: HeaderOnly },
];

const privatePages = [];

export { publicPages, privatePages };
