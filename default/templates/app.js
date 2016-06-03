/* global window */
import $ from 'jquery';
import Map from 'can/map/';
import route from 'can/route/';
import 'can/map/define/';
import 'can/route/pushstate/';
import Session from '<%= pkgName %>/models/session';
import feathers from '<%= pkgName %>/models/feathers';

const AppViewModel = Map.extend({
  define: {

    /**
     * By default, viewModel attributes will not be serialized into the URL as
     * route attributes.
     */
    '*': {
      serialize: false
    },

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
     * available. Because the token data is usually limited, a request is sent
     * to obtain the full session data.
     */
    session: {
      value() {
        this.attr('sessionPromise').then(response => {
          this.attr('session', response);
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
     * The `page` attribute determines which page-component is displayed. When
     * loaded by the SSR server, it waits for the request to the session to resolve
     * before calling `routePage()` to run the auth-based page rules.  In the
     * browser, it can run synchronously.
     */
    page: {
      serialize: true,
      get(val, setVal){
        if (window.doneSsr) {
          this.attr('sessionPromise')
            .then(() => this.routePage(val, setVal))
            .catch(() => this.routePage(val, setVal));
        } else {
          return this.routePage(val);
        }
      }
    },
    <% if(includeBasicLayout){ %>
    /**
     * The auth page uses the subpage attribute to switch between the 'login'
     * view and the 'signup' view. We have to set serialize to true to allow the
     * auth routes, below, to work.
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
        return 'My DoneJS App';
      }
    }
  },

  /**
   * `routePage` controls the pages that the current user can view.
   *
   * This implementation changes what the user sees at '/' depending on if they're
   * logged in or not.  With no auth, they'll see the 'home' page and won't be
   * able to go to the 'dashboard' page.  With auth, they will see the 'dashboard'
   * page, but will still be able to see the home page by going to '/home'.
   */
  routePage: function(val, setVal){
    let session = this.attr('session');
    // If true, the page is public.
    let pagePermissions = {
      home: 'public',
      auth: 'public',
      dashboard: 'private'
    };
    // IF THE USER IS LOGGED IN...
    if (session) {
      if (window.location.pathname === '/') {
        val = 'dashboard';
      }
      // Show a 404 if the page doesn't exist.
      if(!pagePermissions[val]){
        val = 'four-oh-four';
      }

    // IF THE USER IS NOT LOGGED IN...
    } else {
      if (window.location.pathname === '/' || window.location.pathname === '/dashboard') {
        val = 'home';
      }
      // Show a 404 if the page doesn't exist or the user isn't authorized.
      if(!pagePermissions[val] || pagePermissions[val] !== 'public'){
        val = 'four-oh-four';
      }
    }
    if (setVal) {
      setVal(val);
    }
    return val;
  },

  /**
   * Logs the user out by destroying the session, which disposes of the JWT token.
   * It also clears the localStorage to clear the caches used by can-connect.
   */
  logout() {
    this.attr('session').destroy().then(() => {
      window.localStorage.clear();
      window.location.pathname = '/';
    });
  }
});

<% if(includeBasicLayout){ %>
route('login', {page: 'auth', subpage: 'login'});
route('signup', {page: 'auth', subpage: 'signup'});
route('login/:subpage');
<% }%>route(':page');

export default AppViewModel;
