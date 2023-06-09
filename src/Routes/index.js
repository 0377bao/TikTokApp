import Home from '~/Pages/Home';
import Following from '~/Pages/Following';
import Profile from '~/Pages/Profile';
import { HeaderOnly } from '~/components/Layout';

const publicPages = [
    { path: '/', component: Home },
    { path: '/following', component: Following, layout: HeaderOnly },
    { path: '/profile/:nickname', component: Profile, layout: HeaderOnly },
];

const privatePages = [];

export { publicPages, privatePages };
