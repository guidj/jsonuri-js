var testData = {
    "name": "John",
    "age": 31,
    "profile": "http://profiles/professionals/who.cgi?id=269260&full=yes",
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
    
    //var testData = {img_url: "http://55.76.my/shop/wolthuis.aspx?productid=269260&size=medium"};
    var mappedData = mapJSONToUriParams(testData);
    console.log("Test Data:");
    console.log(testData);
    console.log("Converted format:");
    console.log(mappedData);
    console.log("An attempt are restoration");
    var recoveredData = mapUriParamsToJSON(mappedData);
    console.log(recoveredData);

    //console.log("Original Data:");
    //console.log(testData);
    
    document.write("<h1>JSONURI: Example</h1>");
    document.write("<p>Check console and source code</p>");
    document.write("<h2>Test Data:</h2>");
    document.write("<p>" + JSON.stringify(testData) + "</p>");

    document.write("<h2>Serialized Data:</h2>");
    document.write("<p>" + mappedData + "</p>");

    document.write("<h2>Recovered Data:</h2>");
    document.write("<p>" + JSON.stringify(recoveredData) + "</p>");


})();

