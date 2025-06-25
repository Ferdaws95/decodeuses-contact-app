import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { ContactList } from './contact-list/contact-list';
import { ContactDetail } from './contact-detail/contact-detail';
import { ContactEmail } from './contact-email/contact-email';
import { ContactFavoris } from './contact-favoris/contact-favoris';



export const routes: Routes = [
     {
        path:'', component: Dashboard , title : 'Home 🏠' , data:{isMenu: true}
    },
    {
        path:'contact-list', component: ContactList , title:'Contact 🗂️ ', data:{isMenu: true}
    }
    ,

  { path: 'contact-detail/:id', component: ContactDetail, title:'Contact-detail 📋'  },

  { path: 'contact-detail', component: ContactDetail, title:'Contact-detail 📋'  },

  { path: 'contact-email/:id', component: ContactEmail, title:'Contact-email 📋'  },
   {
        path:'contact-favoris', component: ContactFavoris , title:'Favoris ❤️ ', data:{isMenu: true}
    }
    ,
    { path: '**', redirectTo: '', pathMatch: 'full' }


 ];
