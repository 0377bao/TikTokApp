import Home from '~/Pages/Home';
import Following from '~/Pages/Following';
import Profile from '~/Pages/Profile';
import { HeaderOnly } from '~/components/Layout';
import routes from '~/config/routes';

const publicPages = [
    { path: routes.root, component: Home },
    { path: routes.following, component: Following, layout: HeaderOnly },
    { path: routes.profile, component: Profile, layout: HeaderOnly },
];

const privatePages = [];

export { publicPages, privatePages };
