import Home from '~/Pages/Home';
import Following from '~/Pages/Following';
import Profile from '~/Pages/Profile';
import { HeaderOnly } from '~/layouts';
import config from '~/config';

const publicPages = [
    { path: config.routes.root, component: Home },
    { path: config.routes.following, component: Following, layout: HeaderOnly },
    { path: config.routes.profile, component: Profile, layout: HeaderOnly },
];

const privatePages = [];

export { publicPages, privatePages };
