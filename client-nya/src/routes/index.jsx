import MainLayout from '@layouts/MainLayout';
import BePremium from '@pages/BePremium';
import ChangePassword from '@pages/ChangePassword';
import EditMeme from '@pages/EditMeme';
import EditProfile from '@pages/EditProfile';

import Home from '@pages/Home';
import Login from '@pages/Login';
import MemeDetail from '@pages/MemeDetail';
import NotFound from '@pages/NotFound';
import Profile from '@pages/Profile';
import Register from '@pages/Register';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: true,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    protected: true,
    component: MemeDetail,
    layout: MainLayout,
  },
  {
    path: '/editMeme/:id',
    name: 'EditMeme',
    protected: true,
    component: EditMeme,
    layout: MainLayout,
  },
  {
    path: '/profile',
    name: 'Profile',
    protected: true,
    component: Profile,
    layout: MainLayout,
  },
  {
    path: '/editProfile',
    name: 'EditProfile',
    protected: true,
    component: EditProfile,
    layout: MainLayout,
  },
  {
    path: '/changePassword',
    name: 'ChangePassword',
    protected: true,
    component: ChangePassword,
    layout: MainLayout,
  },
  {
    path: '/bePremium',
    name: 'BePremium',
    protected: true,
    component: BePremium,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
