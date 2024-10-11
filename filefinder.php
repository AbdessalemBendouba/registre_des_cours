<?php
function getPdfPaths($folderPath) {
    $pdfPaths = [];
  
    if (is_dir($folderPath)) {
      $files = scandir($folderPath);
      foreach ($files as $file) {
        if ($file != '.' && $file != '..' && pathinfo($file, PATHINFO_EXTENSION) === 'pdf') {
          $pdfPaths[] = $folderPath . '/' . $file;
        }
      }
    }
  
    return json_encode($pdfPaths);
}

$coursesPdfPaths = getPdfPaths('pdf/courses');
$tdPdfPaths = getPdfPaths('pdf/TD');

header('Content-Type: application/json');
echo json_encode($pdfPaths);
/*echo json_encode(['courses' => $coursesPdfPaths, 'TD' => $tdPdfPaths]);*/
?>