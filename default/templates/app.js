/* global window */
import DefineMap from 'can-define/map/';
import route from 'can-route';
import 'can-route-pushstate';
import Session from '<%= pkgName %>/models/session';
import feathers from '<%= pkgName %>/models/feathers';

const AppViewModel = DefineMap.extend({

  /**
   * By default, viewModel attributes will not be serialized into the URL as
   * route attributes.
   */
  '*': {
    serialize: false
  },

  /**
   * Needed for routing to work.
   */
  route: '*',
  <% if(!ui){ %>
  /**
   * Test message to make sure something still renders
   * @type {Object}
   */
  message: {
    type: 'string',
    value: 'Hello, Feathers!'
  },
  <% } %>
  /**
   * The `sessionPromise` is needed on the SSR server to see if the current user
   * is authenticated before rendering.
   */
  sessionPromise: {
    value(){
      return new Session().save();
    }
  },

  /**
   * Uses whatever session data is available from Feathers JWT token, if
   * available. Because the token data is limited, a request is sent
   * to obtain the full session data.
   */
  session: {
    value() {
      this.sessionPromise.then(response => {
        this.session = response;
        return response;
      });
      let session = feathers.getSession();
      if (session) {
        session = new Session(session);
      }
      return session;
    }
  },

  /**
   * The `page` attribute determines which page-component is displayed.
   */
  page: {
    serialize: true,
    get(page, setPage){
      return this.routePage(page);
    }
  },
  <% if(ui && enableSignup){ %>
  /**
   * The auth page uses the subpage attribute to switch between the 'login'
   * view and the 'signup' view. We have to set serialize to true to allow the
   * auth routes to work.
   */
  subpage: {
    serialize: true
  },
  <% } %>
  /**
   * The `title` attribute is used in index.stache as the HTML title.
   */
  title: {
    value(){
      return '<%= pkgName %>';
    }
  },

  /**
   * `routePage` controls the pages that the current user can view.
   * If a non-authenticated user tries to access a private page, they will be
   * shown the login page. Also handles 404s.
   */
   routePage: function(page){
     let session = this.session;
     let pageConfig = {
       home: 'public',
       auth: 'public',
       login: 'public',
       signup: 'public',
       dashboard: 'private'
     };

     // IF THE USER IS LOGGED IN...
     if (session) {
       // Perform some custom logic for logged-in users if you want.

     // IF THE USER IS NOT LOGGED IN...
     } else {
       if (pageConfig[page] !== 'public') {
         page = 'login';
       }
     }

     // 404 if the page isn't in the config.
     if(!pageConfig[page]){
       page = 'four-oh-four';
     }

     return page;
   },

  /**
   * Logs the user out by destroying the session, which disposes of the JWT token.
   * It also clears localStorage to clear the caches used by can-connect.
   */
  logout() {
    this.session.destroy().then(() => {
      window.localStorage.clear();
      window.location.pathname = '/';
    });
  }
});

<% if(ui){ %>
route('/login', {page: 'auth', subpage: 'login'}); <% } if(ui && enableSignup){ %>
route('/signup', {page: 'auth', subpage: 'signup'}); <% } if(ui){ %>
route('/auth/failure', {page: 'auth', subpage: 'failure'});
<% }%>route('/:page', {page: 'home'});

export default AppViewModel;
