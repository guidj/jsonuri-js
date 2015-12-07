// Data
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

if (!library)
   var library = {};

library.json = {
   replacer: function(match, pIndent, pKey, pVal, pEnd) {
      var key = '<span class=json-key>';
      var val = '<span class=json-value>';
      var str = '<span class=json-string>';
      var r = pIndent || '';
      if (pKey)
         r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
      if (pVal)
         r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
      return r + (pEnd || '');
      },
   prettyPrint: function(obj) {
      var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
      return JSON.stringify(obj, null, 3)
         .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
         .replace(/</g, '&lt;').replace(/>/g, '&gt;')
         .replace(jsonLine, library.json.replacer);
      }
   };

(function() {

    document.getElementById("test-data").innerHTML = library.json.prettyPrint(testData);

    var mappedData = mapJSONToUriParams(testData);
    var recoveredData = mapUriParamsToJSON(mappedData, false);

    document.getElementById("serialized-data").innerHTML = mappedData.length > 10 ? mappedData.substring(0, 75) + "...": mappedData;
    document.getElementById("recovered-data").innerHTML = library.json.prettyPrint(recoveredData);
    console.log("Test Data:");
    console.log(testData);
    console.log("Converted format:");
    console.log(mappedData);
    console.log("An attempt are restoration");
    console.log(recoveredData);

})();
