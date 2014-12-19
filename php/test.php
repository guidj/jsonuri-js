<?php

include_once "map.json.uri.php";

$testData = json_decode('{
    "name": "John",
    "age": 31,
    "schools": [
        "School A & B", "School B & D", "School C &amp; AFG"
    ],
    "friends": [
        {
            "name": "Mary",
            "age": 27
        },{
            "name": "Susan",
            "age": 35
        }
    ],
    "family": {
        "parents": [
            {
                "relation": "father",
                "name": "Doe"
            },
            {
                "relation": "mother",
                "name": "Jane"
            }
        ],
        "siblings": [
            {
                "sister1": {
                    "name": "Ana",
                    "age": 26,
                    "children":[
                        "Eric", "Lane"
                    ]
                }
            }
        ]
    }
}');

#print_r($testData);
#print_r(MapJSONUri::decodeUriParam("urls=org.mozilla:en-US:official&client=firefox-a"));

$serializedData = MapJSONUri::mapJSONToUriParams($testData);
print_r("Serialized data:\n".$serializedData."\n");

$uriencodedData = urlencode($serializedData);
print_r("URI encoded data:\n".$uriencodedData."\n");

$recoveredData = MapJSONUri::mapUriParamsToJSON($uriencodedData);
echo "Recovered data:\n";
print_r($recoveredData);

$json = json_encode($recoveredData);
echo "JSON\n";
print_r($json);
echo "\n";

#print_r(json_encode($testData));
#echo "\n";


//if ("2" > "8"):
//    echo "2 is greater than 8\n";
//endif;
//
//if ("8" > "2"):
//    echo "8 is greater than 2\n";
//endif;
