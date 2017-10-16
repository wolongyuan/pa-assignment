<?php

require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

$fileError = $_FILES['file']['error'];

if ($fileError > 0) {
	// $message = 'Error: ' . $fileError;
	// echo json_encode(array(
    //     'error' => true,
    //     'message' => $message
    //     ));
} else {
	$fileName =  time() . '_' . $_FILES['file']['name'];
	move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $fileName);
	
	// 	Get the content of spreadsheet
	$filePath = './uploads/' . $fileName;
	
	$inputFileType = \PhpOffice\PhpSpreadsheet\IOFactory::identify($filePath);
	$reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($inputFileType);
	$reader->setReadDataOnly(true);
	
	$spreadsheet = $reader->load($filePath);
	$worksheet = $spreadsheet->getActiveSheet();

	$data = array();
	foreach ($worksheet->getRowIterator() as $row) {
		$cellIterator = $row->getCellIterator();
		$rowArray = array();
		foreach ($cellIterator as $cell) {
			$rowArray[] = $cell->getValue();
		}
		$data[]=$rowArray;
	}
	echo json_encode(array(
        'data' => $data
        ));
}

?>