<?php
function clean_page_source($buffer) {
    $search = array(
        '/\s+/S',
        '//s'
    );
    $replace = array(' ', '');
    return preg_replace($search, $replace, $buffer);
}
ob_start("clean_page_source");

$page_title = "Ced | Portfolio";

// This points to api/includes/header.php
require_once __DIR__ . '/includes/header.php';

// These point to api/components/...
require_once __DIR__ . '/components/loaders.php';
require_once __DIR__ . '/components/navbar.php';
require_once __DIR__ . '/components/home.php';
require_once __DIR__ . '/components/projects.php';
require_once __DIR__ . '/components/about.php';
require_once __DIR__ . '/components/skills.php';
require_once __DIR__ . '/components/qualifications.php';
require_once __DIR__ . '/components/contact.php';

require_once __DIR__ . '/includes/footer.php';

ob_end_flush();
?>