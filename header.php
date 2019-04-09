<!DOCTYPE html>
<html lang="en">
<head>
    <title><?php bloginfo('name'); ?></title>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">
    <script>

        var WPGLOBAL = {
            ENABLE_DEBUG: "<?php echo get_option('enable_debug'); ?>" === "true" ? true : true,
            IS_HOME: "<?php echo is_home(); ?>" ? true : false,
            IS_SEARCH: "<?php echo is_search(); ?>" ? true : false,
            IS_CATEGORY: "<?php echo is_category(); ?>" ? true : false,
            IS_ARCHIVE: "<?php echo is_archive(); ?>" ? true : false,
            IS_SINGLE: "<?php echo is_single(); ?>" ? true : false,
            IS_PAGE: "<?php echo is_page(); ?>" ? true : false,
            IS_FRONT_PAGE: "<?php echo is_front_page(); ?>" ? true : false,
            SITE_URL: "<?php echo site_url(); ?>",
			TEMPLATE_URI: "<?php echo get_template_directory_uri(); ?>"
        };

    </script>

    <?php wp_head(); ?>
</head>
<body>
    <div class="container" ng-app="LunaApp" ng-controller="LunaController as c">