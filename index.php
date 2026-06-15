<?php
// Step 4a: Start HTML minification buffer to shorten 'View Source' output
function clean_page_source($buffer) {
    $search = array(
        '/\s+/S',          // Compress sequential spaces
        '//s'  // Corrected regex to strip HTML comments
    );
    $replace = array(' ', '');
    return preg_replace($search, $replace, $buffer);
}
ob_start("clean_page_source");

// Step 4b: Set page variables
$page_title = "Ced | Portfolio";

// Step 4c: Assemble all modular partial segments using absolute paths
require_once __DIR__ . '/includes/header.php';

require_once __DIR__ . '/components/loaders.php';
require_once __DIR__ . '/components/navbar.php';
require_once __DIR__ . '/components/home.php';
require_once __DIR__ . '/components/projects.php';
require_once __DIR__ . '/components/about.php';
require_once __DIR__ . '/components/skills.php';
require_once __DIR__ . '/components/qualifications.php';
require_once __DIR__ . '/components/contact.php';

require_once __DIR__ . '/includes/footer.php';

// Step 4d: Flush clean minified output to screen
ob_end_flush();
?>