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

$( document ).ready(function(){
    
    console.log("Original Data:");
    console.log(testData);
    var mappedData = mapJSONToUriParams(testData);
    console.log("Converted format:");
    console.log(mappedData);
    console.log("URI format");
    var uriMappedData = encodeURIComponent(mappedData);
    console.log(uriMappedData);
    console.log("An attempt are restoration");
    var recoveredData = mapUriParamsToJSON(uriMappedData);
    console.log(recoveredData);
    
    //console.log("Recovered Data:");
    //mapUriParamToJSON(r);
    //console.log(decodeUriParam("q=stress%20test%20cpu%20linux"));
    
    $.get("stream/actions/actions.json",function(data, status){
        
        $("#data").empty();
        
        for (var i = 0; i < 1; i++){
           var url = mapJSONToUriParams(data[i]);
           $("#data").append("<p>Session: " + data[i]["session_id"] + ", <br/> Serialized: " + url.length + " characters<br/>" + url + "<p>Encoded:" +  encodeURIComponent(url).length + " characters</br>"+ encodeURIComponent(url) +"</p>");
           
           //console.log(url);
        }
    });
});