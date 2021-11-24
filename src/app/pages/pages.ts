import { HomeComponent } from './home/component';
import { CodeOfConductComponent } from './code-of-conduct/component';
import { EventsComponent } from './events/component';
import { ContactComponent } from './contact/component';
import { LoginComponent } from './login/component';
import { FirstLoginComponent } from './first-login/component';
import { PeopleComponent } from './people/component';
import { ProfileComponent } from './profile/component';


// note: ordering of pages MATTERS here (they are listed in the menu in this same order)
export const Pages = [
    {
      route: '/home',
      public: false,
      title: 'Home', icon: 'home',
      component: HomeComponent,
    },
    {
      route: '/code-of-conduct',
      public: true,
      title: 'Code of Conduct', icon: 'assignment',
      component: CodeOfConductComponent,
    },
    {
      route: '/events',
      public: false,
      title: 'Events', icon: 'events',
      component: EventsComponent,
    },
    {
      route: '/contact',
      public: true,
      title: 'Contact', icon: 'email',
      component: ContactComponent,
    },
    {
      route: '/profile',
      public: false,
      title: 'My Profile', icon: null,
      component: ProfileComponent,
    },
    {
      route: '/login',
      public: true,
      title: null, icon: null,
      component: LoginComponent,
    },
    {
      route: '/login/first',
      public: false,
      title: null, icon: null,
      component: FirstLoginComponent
    },
    {
      route: '/people/:id',
      public: true,
      title: 'Community', icon: null,
      component: PeopleComponent,
    },
]
