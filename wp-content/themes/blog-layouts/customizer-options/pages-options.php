<?php
function blog_layouts_custom_pages($wp_customize)
{
    // Section
    $wp_customize->add_section('custom_theme_pages', array(
        'title' => __('Pages', 'blog-layouts'),
        'priority' => 30,
        'description' => __('Options for WordPress "Pages".', 'blog-layouts'),
    ));

    // Maximum width of the post
    $wp_customize->add_setting('maximum_width_of_pages', array(
        'default' => '70',
        'transport' => 'refresh',
        'sanitize_callback' => 'absint',
    ));

    $wp_customize->add_control('maximum_width_of_pages', array(
        'type' => 'range',
        'section' => 'title_tagline',
        'label' => __('Maximum width of pages', 'blog-layouts'),
        'section' => 'custom_theme_pages',
        'input_attrs' => array(
            'min' => 50,
            'max' => 150,
            'step' => 1,
        ),
    ));

    // Sidebar
    $wp_customize->add_setting('pages_sidebar', array(
        'default' => true,
        'transport' => 'refresh',
        'sanitize_callback' => 'blog_layouts_sanitize_checkbox',
    ));

    $wp_customize->add_control('pages_sidebar', array(
        'type' => 'checkbox',
        'label' => __('Show sidebar', 'blog-layouts'),
        'section' => 'custom_theme_pages',
    ));

    function pages_sidebar_active_callback($control)
    {
        return $control->manager->get_setting('pages_sidebar')->value();
    }

    // Sidebar Layout
    $wp_customize->add_setting('pages_sidebar_layout', array(
        'default' => 'social',
        'transport' => 'refresh',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    global $blog_layouts_sidebar_layouts;
    $wp_customize->add_control('pages_sidebar_layout', array(
        'type' => 'select',
        'section' => 'custom_theme_pages',
        'label' => __('Layout Sidebar', 'blog-layouts'),
        'choices' => $blog_layouts_sidebar_layouts,
        'active_callback' => 'pages_sidebar_active_callback',
    ));

    // Background color
    $wp_customize->add_setting('background_color_pages', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_hex_color',
    ));

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'pages_background_color', array(
        'label' => __('Background color', 'blog-layouts'),
        'section' => 'custom_theme_pages',
        'settings' => 'background_color_pages'
    )));
}
add_action('customize_register', 'blog_layouts_custom_pages');
