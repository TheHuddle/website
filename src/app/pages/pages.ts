import { HomeComponent } from './home/home.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';

export const Pages = [
    {
      route: '/home',
      title: 'Home',
      component: HomeComponent,
    },
    {
      route: '/code-of-conduct',
      title: 'Code of Conduct',
      component: CodeOfConductComponent,
    },
    {
      route: '/events',
      title: 'Events',
      component: EventsComponent,
    },
    {
      route: '/contact',
      title: 'Contact',
      component: ContactComponent,
    },
]
