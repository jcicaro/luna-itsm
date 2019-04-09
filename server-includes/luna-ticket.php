<?php

add_action('init', function() {
    register_post_type('ticket', array(
        'labels' => array(
            'name' => __('Tickets'),
            'singular_name' => __('Ticket'),
            'add_new' => __('Create Ticket'),
            'add_new_item' => __('Create New Ticket'),
            'edit_item' => __('Edit Ticket'),
            'search_items' => __('Search Tickets')
        ),
        'menu_position' => 5,
        'public' => true,
        'has_archive' => false,
        // 'register_meta_box_cb' => 'lil_meta_box_cb',
        'supports' => array('title', 'editor', 'thumbnail', 'comments')
    ));
});

add_action( 'wp_head', function() {
	acf_form_head();
}, 2); // priority is required for this to work, otherwise there will be an error on submit

// Add styles to TinyMCE body content
add_filter('tiny_mce_before_init', function( $mceInit ) {
	
	$styles = '@font-face { font-family: Lato; src: url(' . get_theme_file_uri() . '/fonts/lato-v14-latin-regular.ttf); }';
	$styles .= 'body.mce-content-body { \nfont-family: Lato, Arial, Helvetica, sans-serif; \n font-weight: normal; } ';

    if ( isset( $mceInit['content_style'] ) ) {
        $mceInit['content_style'] .= ' ' . $styles . ' ';
    } else {
        $mceInit['content_style'] = $styles . ' ';
    }
	
    return $mceInit;
});




 