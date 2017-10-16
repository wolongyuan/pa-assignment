<?php
ini_set('display_errors', 1);
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
$spreadsheet = new Spreadsheet();
$arrayData = $_POST['tableContent'];
// echo $arrayData[0][0];
// $test = array(array(1,2), array(3,4), array(5,6));
$spreadsheet->getActiveSheet()
	->fromArray(
		$arrayData,  // The data to set
		NULL,        // Array values with this value will not be set
		'A1'         // Top left coordinate of the worksheet range where
	);

$writer = new Xlsx($spreadsheet);
$filePath = 'downloads/' . time() . '_' . 'result.xlsx';
$writer->save($filePath);
echo $filePath;
?>
