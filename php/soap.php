<?php
$client = new SoapClient("http://apps.ezprints.com/service/2.0/ecommerce.asmx?WSDL", array('soap_version' => SOAP_1_2));
$address = array(
    'FirstName' => 'everright',
    'LastName' => 'chen',
    'Address1' => '1890 Beaver Ridge Circle',
    'Address2' => 'Suite A',
    'City' => 'Norcross',
    'ZipCode' => '30024',
    'StateProvinceCode' => 'GA',
    'CountryCode' => 'USA'
);

$addressToVerify = array('addressToVerify' => $address);
//print(json_encode($addressToVerify));
$res = $client->VerifyAddress($addressToVerify);
print_r($res);
//var_dump($client->__getFunctions());
?>
