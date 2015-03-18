var testData = {
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
};

(function() {

    var mappedData = mapJSONToUriParams(testData);
    console.log("Test Data:");
    console.log(testData);
    console.log("Converted format:");
    console.log(mappedData);
    console.log("URI encoded");
    var uriMappedData = encodeURIComponent(mappedData);
    console.log(uriMappedData);
    console.log("An attempt are restoration");
    var recoveredData = mapUriParamsToJSON(uriMappedData);
    console.log(recoveredData);

    //console.log("Original Data:");
    //console.log(testData);
    
    document.write("<h1>JSONURI: Example</h1>");
    document.write("<p>Check console and source code</p>");
    document.write("<h2>Test Data:</h2>");
    document.write("<p>" + JSON.stringify(testData) + "</p>");

    document.write("<h2>Serialized Data:</h2>");
    document.write("<p>" + mappedData + "</p>");

    document.write("<h2>URI Encoding:</h2>");
    document.write("<p>" + uriMappedData + "</p>");

    document.write("<h2>Recovered Data:</h2>");
    document.write("<p>" + JSON.stringify(recoveredData) + "</p>");
    
    


})();

