<?php

    require_once(get_template_directory() . '/server-includes/luna-ticket.php');

    add_action('wp_enqueue_scripts', function() {
        
        wp_enqueue_style('font-awesome-css', get_template_directory_uri() . '/client-dependencies/font-awesome-4.7.0/css/font-awesome.min.css', array());

        wp_enqueue_style('bootstrap-css', get_template_directory_uri() . '/client-dependencies/bootstrap-4.0.0-dist/css/bootstrap.min.css', array());

        wp_enqueue_style('main', get_template_directory_uri() . '/client-public/css/main.css', false, rand(1, 100), 'all');

    });

    add_action('wp_enqueue_scripts', function() {
        $show_in_footer = true; // set this to true later, need wp_footer() in footer.php

        wp_enqueue_script('popper', get_template_directory_uri() . '/client-dependencies/popper/popper.min.js', array(), '1.14.6', $show_in_footer);

        wp_enqueue_script('bootstrap-js', get_template_directory_uri() . '/client-dependencies/bootstrap-4.0.0-dist/js/bootstrap.min.js', array('jquery'), '4.0.0', $show_in_footer);

        wp_enqueue_script('angular1', get_template_directory_uri() . '/client-dependencies/angular-1.7.7/angular.min.js', array(), '1.7.7', $show_in_footer);

        wp_enqueue_script('script', get_template_directory_uri() . '/client-public/js/main.js', array(), rand(1, 100), $show_in_footer);
    });

    // remove the 32px margin at the top
    add_action('get_header', function() {
        remove_action('wp_head', '_admin_bar_bump_cb');
    }); 

    // Remove admin bar on the front end
    add_filter('show_admin_bar', '__return_false');

    // enable featured image in posts
    add_theme_support('post-thumbnails');