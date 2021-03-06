export default function() {
  // Error page
  this.route('exception', { path: '/exception' });

  this.resource('about', { path: '/about' });

  // Topic routes
  this.resource('topic', { path: '/t/:slug/:id' }, function() {
    this.route('fromParams', { path: '/' });
    this.route('fromParamsNear', { path: '/:nearPost' });
  });
  this.resource('topicBySlug', { path: '/t/:slug' });
  this.route('topicUnsubscribe', { path: '/t/:slug/:id/unsubscribe' });

  this.resource('discovery', { path: '/' }, function() {
    // top
    this.route('top');
    this.route('topParentCategory', { path: '/c/:slug/l/top' });
    this.route('topCategoryNone', { path: '/c/:slug/none/l/top' });
    this.route('topCategory', { path: '/c/:parentSlug/:slug/l/top' });

    // top by periods
    Discourse.Site.currentProp('periods').forEach(period => {
      const top = 'top' + period.capitalize();
      this.route(top, { path: '/top/' + period });
      this.route(top + 'ParentCategory', { path: '/c/:slug/l/top/' + period });
      this.route(top + 'CategoryNone', { path: '/c/:slug/none/l/top/' + period });
      this.route(top + 'Category', { path: '/c/:parentSlug/:slug/l/top/' + period });
    });

    // filters
    Discourse.Site.currentProp('filters').forEach(filter => {
      this.route(filter, { path: '/' + filter });
      this.route(filter + 'ParentCategory', { path: '/c/:slug/l/' + filter });
      this.route(filter + 'CategoryNone', { path: '/c/:slug/none/l/' + filter });
      this.route(filter + 'Category', { path: '/c/:parentSlug/:slug/l/' + filter });
    });

    this.route('categories');

    // default filter for a category
    this.route('parentCategory', { path: '/c/:slug' });
    this.route('categoryNone', { path: '/c/:slug/none' });
    this.route('category', { path: '/c/:parentSlug/:slug' });

    // homepage
    this.route(Discourse.Utilities.defaultHomepage(), { path: '/' });
  });

  this.resource('group', { path: '/groups/:name' }, function() {
    this.route('members');
  });

  // User routes
  this.resource('users');
  this.resource('user', { path: '/users/:username' }, function() {
    this.resource('userActivity', { path: '/activity' }, function() {
      _.map(Discourse.UserAction.TYPES, (id, userAction) => {
        this.route(userAction, { path: userAction.replace('_', '-') });
      });
    });

    this.route('badges');
    this.route('notifications');
    this.route('flaggedPosts', { path: '/flagged-posts' });
    this.route('deletedPosts', { path: '/deleted-posts' });

    this.resource('userPrivateMessages', { path: '/messages' }, function() {
      this.route('mine');
      this.route('unread');
    });

    this.resource('preferences', function() {
      this.route('username');
      this.route('email');
      this.route('about', { path: '/about-me' });
      this.route('badgeTitle', { path: '/badge_title' });
      this.route('card-badge', { path: '/card-badge' });
    });

    this.resource('userInvited', { path: '/invited' }, function() {
      this.route('show', { path: '/:filter' });
    });
  });

  this.route('signup', {path: '/signup'});
  this.route('login', {path: '/login'});
  this.route('login-preferences');
  this.route('forgot-password', {path: '/password-reset'});
  this.route('faq', {path: '/faq'});
  this.route('tos', {path: '/tos'});
  this.route('privacy', {path: '/privacy'});
  this.route('guidelines', {path: '/guidelines'});

  this.route('new-topic', {path: '/new-topic'});
  this.route('new-message', {path: '/new-message'});

  this.resource('badges', function() {
    this.route('show', {path: '/:id/:slug'});
  });

  this.resource('queued-posts', { path: '/queued-posts' });

  this.route('full-page-search', {path: '/search'});
}
