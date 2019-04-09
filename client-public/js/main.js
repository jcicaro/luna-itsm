// Add class to acf_forms
(function ($) {
  let GLOBAL_ENABLE_DEBUG = WPGLOBAL.ENABLE_DEBUG;

  _log('Executed: acf.js');

  _log('GLOBAL_ENABLE_DEBUG in acf.js', GLOBAL_ENABLE_DEBUG);

  _log('WPGLOBAL', WPGLOBAL);

  let test = 'hello, es6...';

  _log(test);

  $('.acf-field').addClass('form-group');
  $('.acf-input select, .acf-input input').addClass('form-control');
  $('.button.button-primary').addClass('btn btn-primary'); // Helpers only below

  function _log() {
    if (GLOBAL_ENABLE_DEBUG) {
      console.log.apply(null, arguments);
    }
  }
})(jQuery);

(function () {
  console.log('Executed: main.js');
  angular.module("LunaApp", []).controller("LunaController", function ($scope, $http, $sce, $location) {
    var c = this;
    c.debug = WPGLOBAL.ENABLE_DEBUG || true;
    c.siteUrl = WPGLOBAL.SITE_URL;

    c.log = function () {
      if (c.debug) {
        console.log.apply(null, arguments);
      }
    };

    c.log('WPGLOBAL', WPGLOBAL);
    var siteHome = ''; // '/wp';

    c.showSpinner = false;
    c.searchText = '';
    c.categories = null;
    c.category = null;
    c.categoryId = null;
    c.page = null;
    c.posts = [];
    c.postsOffset = 0;
    c.totalPosts = 0;
    c.maxPostResults = 9;
    c.maxCategoryResults = 100;
    c.pathname = window.location.pathname;
    loadCtrlMethods();
    c.log('c.pathname', c.pathname); // Code below commented while developing templates
    // var fetchCatId = c.fetchCategoryId();
    // if (fetchCatId) {
    //     fetchCatId.then(function() {
    //         c.fetchPosts();
    //     });
    // }
    // else {
    //     if (!c.searchText) { c.fetchPage('luna-introduction'); }
    //     if (c.pathname === '/' || c.pathname === '/wp/') {
    //         c.fetchPosts();
    //     }
    // }
    // This function loads all the methods

    function loadCtrlMethods() {
      c.executeSearch = function () {
        c.log('Executed: c.executeSearch');
        c.postsOffset = 0;

        if (c.searchText.length > 0) {
          c.fetchPosts('posts');
        } else {
          c.fetchPosts('posts');
        }
      };

      c.isHomeLocation = function () {
        // if (c.pathname === '/' || c.pathname === '/wp/') {
        if (WPGLOBAL.IS_HOME || WPGLOBAL.IS_FRONT_PAGE) {
          return true;
        }

        return false;
      };

      c.fetchPosts = function (recordType
      /* 'posts', 'pages', etc */
      ) {
        c.log('Executed: c.fetchPosts');
        c.showSpinner = true;
        recordType = recordType || 'posts';
        var urlSuffix = '?_embed&per_page=' + c.maxPostResults;
        c.log('c.searchText', c.searchText);
        c.log('c.categoryId', c.categoryId);

        if (c.searchText.length > 0) {
          urlSuffix += '&search=' + encodeURIComponent(c.searchText);
        } else if (c.categoryId) {
          urlSuffix += '&categories=' + c.categoryId;
        } else {
          return;
        }

        if (c.postsOffset > 0) {
          urlSuffix += '&offset=' + c.postsOffset;
        }

        var url = c.siteUrl + '/wp-json/wp/v2/' + recordType + urlSuffix;
        c.log('url', url);
        return $http({
          method: 'GET',
          url: url
        }).then(function (response) {
          c.posts_status = response.status;
          c.posts = response.data;
          c.showSpinner = false;
          c.totalPosts = response.headers('x-wp-total');
          c.log('response', response);
          c.log('x-wp-total', response.headers('x-wp-total'));
          c.log('c.posts', c.posts);
          c.log('c.posts_status', c.posts_status);
        }, function (response, status, headers, config) {
          c.posts = response.data || [];
          c.posts_status = response.status;
          c.showSpinner = false;
          c.log('response', response);
          c.log('c.posts', c.posts);
          c.log('c.posts_status', c.posts_status);
        });
      };

      c.isNextVisible = function () {
        if (c.postsOffset + c.maxPostResults < c.totalPosts) {
          return true;
        }

        return false;
      };

      c.nextPosts = function () {
        if (c.isNextVisible()) {
          c.postsOffset += c.maxPostResults;
          c.fetchPosts();
        }

        c.log('c.postsOffset', c.postsOffset);
        c.log('c.totalPosts', c.totalPosts);
      };

      c.isPreviousVisible = function () {
        if (c.postsOffset > 0) {
          return true;
        }

        return false;
      };

      c.previousPosts = function () {
        if (c.postsOffset > 0) {
          c.postsOffset -= c.maxPostResults;
          c.fetchPosts();
        } // else if (c.postsOffset === 0) {
        //     c.postsOffset = 0;
        //     c.fetchPosts();
        // }


        c.log('c.postsOffset', c.postsOffset);
        c.log('c.totalPosts', c.totalPosts);
      };

      c.fetchPostFeaturedImgStyle = function (post) {
        if (post && post._embedded && post._embedded['wp:featuredmedia']) {
          return {
            'background-image': 'url(' + post._embedded['wp:featuredmedia'][0].source_url + ')'
          };
        }

        return {};
      };

      c.fetchPage = function (slug) {
        c.log('Executed: c.fetchPage');
        c.showSpinner = true;
        return $http({
          method: 'GET',
          url: c.siteUrl + '/wp-json/wp/v2/pages/?_embed&slug=' + slug
        }).then(function (response) {
          c.log('c.fetchPage', response.status);

          if (response.status === 200) {
            c.log('c.fetchPage', response.data);
            c.page = response.data[0];
            c.showSpinner = false;
          }
        }, function (response) {
          c.log('c.fetchPage: Request failed', response.status);
          c.showSpinner = false;
        });
      }; // c.fetchMenus = function(modelObj) {
      //     c.log('Executed: c.fetchMenus');
      //     c.showSpinner = true;
      //     return $http({ method: 'GET', url: '/wp-json/custom_routes/menu' }).
      //         then(function (response) {
      //             c.log('c.fetchMenus', response.status);
      //             if (response.status === 200) {
      //                 c.log('c.fetchMenus', response.data);
      //                 modelObj = response.data;
      //                 c.showSpinner = false;
      //             }
      //         }, function (response) {
      //             c.log('c.fetchMenus: Request failed', response.status);
      //             c.showSpinner = false;
      //         });
      // };


      c.fetchCategoryId = function () {
        var pathname = window.location.pathname;
        var catPathIndex = pathname.indexOf('/category/');
        var catStartIndex = catPathIndex + 10;
        c.log('catPathIndex', catPathIndex);

        if (catPathIndex >= 0) {
          c.categoryName = pathname.slice(catStartIndex, pathname.indexOf('/', catStartIndex));
          c.log('c.categoryName', c.categoryName);
          return c.fetchCategories();
        }

        return null;
      };

      c.fetchCategories = function () {
        c.log('Executed: c.fetchCategories');
        c.showSpinner = true;
        return $http({
          method: 'GET',
          url: c.siteUrl + '/wp-json/wp/v2/categories?per_page=' + c.maxCategoryResults
        }).then(function (response) {
          c.log('c.fetchCategories', response.status);

          if (response.status === 200) {
            c.log('c.fetchCategories', response.data);
            c.categories = response.data;
            c.category = c.categories.filter(function (cat) {
              return cat.name.toUpperCase() === c.categoryName.toString().toUpperCase();
            });
            c.categoryId = c.category.length > 0 ? c.category[0].id : null;
            c.showSpinner = false;
            c.log('c.categoryId', c.categoryId);
          }
        }, function (response) {
          c.log('c.fetchCategories: Request failed', response.status);
          c.showSpinner = false;
        });
      };

      c.trustAsHtml = function (htmlStr) {
        return $sce.trustAsHtml(htmlStr);
      };
    }
  }); // angular.module("LunaApp").
  // directive('testDirective', function () {
  //     return {
  //         restrict: 'A'
  //     };
  // });
})();