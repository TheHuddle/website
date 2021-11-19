import { HomeComponent } from './home/home.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';

export const Pages = [
    {
      route: '/home',
      title: 'Home',
      public: false,
      component: HomeComponent,
    },
    {
      route: '/code-of-conduct',
      title: 'Code of Conduct',
      public: true,
      component: CodeOfConductComponent,
    },
    {
      route: '/events',
      title: 'Events',
      public: false,
      component: EventsComponent,
    },
    {
      route: '/contact',
      title: 'Contact',
      public: true,
      component: ContactComponent,
    },
]
