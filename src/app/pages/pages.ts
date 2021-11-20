import { HomeComponent } from './home/home.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';

export const Pages = [
    {
      route: '/home',
      title: 'Home',
      public: false,
      icon: 'home',
      component: HomeComponent,
    },
    {
      route: '/code-of-conduct',
      title: 'Code of Conduct',
      public: true,
      icon: 'assignment',
      component: CodeOfConductComponent,
    },
    {
      route: '/events',
      title: 'Events',
      public: false,
      icon: 'events',
      component: EventsComponent,
    },
    {
      route: '/contact',
      title: 'Contact',
      public: true,
      icon: 'email',
      component: ContactComponent,
    },
]
