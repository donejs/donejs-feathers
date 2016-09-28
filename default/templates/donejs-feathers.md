# Full Stack DoneJS with FeathersJS

## The File Structure
The entire application structure is held within the `src/` folder. Let’s review its contents.

- `components/` - in this folder you’ll find the four main components, which are organized using the [modlet pattern](http://blog.bitovi.com/modlet-workflows/):
	- `page-home/` - the home page (this page)
	- `page-auth/` - which handles both the /login and /signup routes.
	- `page-four-oh-four/` - the 404 page.
	- `page-dashboard/` - which is a placeholder component as a starting place for your app.
	- `main-nav/` - The toolbar at the top of the home and auth pages.
- `img/` - contains the background and logo images.
- `less/` - is the place for additional global styles that deserve their own file. It currently contains responsive layout styles in `breakpoints.less`.
- `models/` - contains model definitions that help talk to the Feathers server.
	- `feathers.js` - defines the connection to one or more Feathers servers.
	- `session.js` - assists with logging the user in.
	- `signup.js` - helps sign up new users.
	- `fixtures/` - this is where you put [can-fixture](http://canjs.github.io/canjs/doc/can-fixture.html) files for setting up mock services.
- `test/` - contains application-level tests and imports other modules tests so they can all be run at together.
- `app.js` - contains the main application state and the routing definitions.
- `index.stache` - is the main entry point of the application. It’s equivalent to a typical index.html file, but uses the Stache templating engine. The `{{#switch page}}` block controls which of the page-components is visible based on the value of the `page` attribute in the application state.
- `styles.less` - contains the primary, global styles for the application.

## Customizing the Pages
To customize a page, you only need to edit the stache template and less styles in the corresponding component folder.

# Removing the Home page
If your application's home page is hosted on another server, you might want to remove the home page from the app. Here are the changes you’ll need to make:

- Make the `auth` page the default page by changing the `routePage` function in `app.js`. Change `val = 'home'` to `val='auth'`.
- Remove the three lines in `app.js` starting with `{{#case 'home'}}`.
- Delete the `components/page-home/` folder.

## Adding another page
If you want additional pages in your app, you’ll need to do the following.

- Use the [DoneJS generator](https://donejs.com/Apis.html#section=section_Generators) to create the page’s component modlet: `donejs add component components/page-about page-about`
- Edit `app.js`. Add the proper permissions to the `pagePermissions` object inside the `routePage` function.
- Edit `index.stache`. Add a `can-import` tag: `<can-import from="app-name/components/page-about" />` Then add a `{{#case 'about'}}` block to the `{{#switch page}}` statement:

```
{{#case 'about'}}
  <page-about></page-about>
{{/case}}
```

## Supporting more complex permissions
The `routePage` function in the `app.js` file might not be flexible enough for your use case. As with the rest of the generated site, feel free to change the code to suit your needs. Just keep in mind that the Server Side Rendering (SSR) server needs to use the asynchronous setter `setVal(val)`, and the client will use the returned `value`. That’s why you see both of those at the bottom of the routePage function:

```
if (setVal) {
  setVal(val);
}
return val;
```

Depending on how complex your business logic is, you may need to also modify the `session` attribute in that same file.

## Authentication
There are two possible routes (depending on if you opted to allow user signup) that will show the `auth` page: 
- `route('login', {page: 'auth', subpage: 'login'});`
- `route('signup', {page: 'auth', subpage: 'signup'});`

## Preparing for OAuth login

The [feathers-authentication](https://github.com/feathersjs/feathers-authentication) plugin includes the ability to login using OAuth providers like Facebook, GitHub, and more. OAuth involves redirecting the browser to the login provider, where the user will authorize (or decline authorization to) your app. Upon authorization by the user, the login provider will redirect back to a specific page in your app.

Feathers provides its own success/failure pages, server side, but we want to disable them so we can handle everything in our client-side code. To do this, we need to modify the environment configuration in the config/ folder on the Feathers server. It needs to include the first four attributes under "auth" in this example:

// config/default.json on the server
{
  "host": "localhost",
  "port": 3030,
  "nedb": "../data/",
  "public": "../public/",
  "auth": {

    "shouldSetupSuccessRoute": false,
    "shouldSetupFailureRoute": false,
    "successRedirect": "/dashboard",
    "failureRedirect": "/auth/failure",

    "token": {
      "secret": "FEATHERS_AUTH_SECRET"
    },
    "local": {},
    "github": {
      "clientID": "your github client id",
      "clientSecret": "your github client secret",
      "permissions": {
        "scope": []
      }
    }
  }
}
Now, when the user successfully logs in through any OAuth provider, they will be redirected to the /dashboard page. Failed OAuth logins will go to /auth/failure. Remember that you'll need to update the config for every environment where you plan to deploy.

## Customize the order of login buttons

The OAuth login providers (if you selected any) will show in the login component in the same order that they’re specified in the `page-auth.stache` file. The following example will show GitHub before Facebook:

```
<auth-component providers="github,facebook">
```

## Running without a Feathers server
If you haven't started development on your Feathers server, yet, you'll need to setup a fixture for the request to the `/auth/token` endpoint. If not, the SSR server will have to wait for the request to time out, which will cause the page to load slowly. To set this up, add the following lines to the `/models/fixtures/fixtures.js` file:

```
fixture("POST /auth/token", function(){
  return {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5MCwiX2lkIjoxMjM0NTY3ODkwLCJleHAiOjI5OTk5OTk5OTl9.QzMHMNufWOf1hvI9EixhtS1ckFNFYV_cV6Lfp7iCgt4"};
});
```

Now, add an import statement to the top of `app.js` to load the fixtures: 

```
import 'app-name/models/fixtures/';
```

This will create a mock response with a fake token, which will simulate a logged-in user. You can create your own, custom JWT object by going to [jwt.io](https://jwt.io) and customizing the payload data. At a minimum, you’ll need the following keys in your data:
```
{
  "id": 123,
  "_id": 123,
  "exp": 2999999999
}
```

Note that in the above payload data, the `exp` attribute represents the actual date when you want the token to expire. `new Date(exp * 1000)`. Also, the `id` property should match what you specified in the donejs-feathers generator (probably either `id` or `_id`).

Alternatively, you can simulate a failed login by returning an error in the fixture instead of an object.

## Getting Help
### DoneJS Resources
- [DoneJS Home Page](http://donejs.com)
- Read through the examples and docs on [donejs.com](donejs.com).
- Visit the [DoneJS room on Gitter](https://gitter.im/donejs/donejs).
- Read the [DoneJS forum](http://forums.donejs.com/)
- File an issue on GitHub. Before you file an issue, please check with us in the Gitter chat room. Since DoneJS comprises a lot of smaller modules, we can point you to the right repo.

### FeathersJS Resources
- [FeathersJS Home Page](http://feathersjs.com)
- Read the [Feathers Docs](https://docs.feathersjs.com)
- Join the [Feathers Slack](http://slack.feathersjs.com/)
- File an issue on GitHub. Feathers is also very modular, so you might want to check in Slack for the appropriate repo for your particular issue.

### UI/CSS Frameworks
The CSS Framework builds are provided as a convenience for getting up and running.  For UI framework support, visit the home page and utilize the community of the respective framework:
- [Bootstrap](http://getbootstrap.com/)
- [Foundation](http://foundation.zurb.com/)
- [Pure](http://purecss.io/)
- [Semantic UI](http://semantic-ui.com/)

> Desk background photo by unsplash.com/@dustinlee