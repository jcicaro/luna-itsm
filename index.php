<?php get_header(); ?>

<?php

    $tickets = new WP_Query(array(
        'post_type' => 'ticket'
    ));

	if ($tickets->have_posts()) {
		
		while ($tickets->have_posts()) {
			$tickets->the_post(); ?>

			<div id="primary" class="content-area">
                <div id="content" class="site-content" role="main">

                        <?php 

                        $post_ID = get_the_ID();
                        $fields = get_field_objects($post_ID);
                        
                        acf_form(array(
                            'post_id'	=> $post_ID,
                            'post_title' => true,
                            'post_content' => true,
                            'submit_value'	=> 'Update the post!'
                        )); 
                        
                        ?>


                </div><!-- #content -->
            </div><!-- #primary -->

		<?php
		}
	}

get_footer(); ?>