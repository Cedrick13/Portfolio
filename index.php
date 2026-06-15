<?php
// Step 4a: Start HTML minification buffer to shorten 'View Source' output
function clean_page_source($buffer) {
    $search = array(
        '/\s+/S',       // Compress sequential spaces
        '//s' // Remove HTML developer comments
    );
    $replace = array(' ', '');
    return preg_replace($search, $replace, $buffer);
}
ob_start("clean_page_source");

// Step 4b: Set page variables
$page_title = "Ced | Portfolio";

// Step 4c: Assemble all modular partial segments
require_once 'includes/header.php';

require_once 'components/loaders.php';
require_once 'components/navbar.php';
require_once 'components/home.php';
require_once 'components/projects.php';
require_once 'components/about.php';
require_once 'components/skills.php';
require_once 'components/qualifications.php';
require_once 'components/contact.php';

require_once 'includes/footer.php';

// Step 4d: Flush clean minified output to screen
ob_end_flush();
?>