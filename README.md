#Map JSON to URI
 
This script helps you convert  a JSON/JavaScript object into an HTTP GET request parameters. The reverse is also possible, i.e. convert HTTP GET request parameters into a JSON/JavaScript object.


##Usage

```JavaScript
> var testData = {
    "name": "John",
    "age": 31,
    "schools": [
        "School A", "School B", "School C"
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

> var mappedString = mapJSONToUriParams(testData); //get non-encoded string
```

```URL
> console.log(mappedString);
name=John&age=31&schools[0]=School A&schools[1]=School B&schools[2]=School C&friends[0]name=Mary&friends[0]age=27&friends[1]name=Susan&friends[1]age=35&family:parents[0]relation=father&family:parents[0]name=Doe&family:parents[1]relation=mother&family:parents[1]name=Jane&family:siblings[0]sister1:name=Ana&family:siblings[0]sister1:age=26&family:siblings[0]sister1:children[0]=Eric&family:siblings[0]sister1:children[1]=Lane 
```

```JavaScript
> var URIString = encodeURIComponent(mappedString); //get encoded string
```

```URL
> console.log(URIString);
name%3DJohn%26age%3D31%26schools%5B0%5D%3DSchool%20A%26schools%5B1%5D%3DSchool%20B%26schools%5B2%5D%3DSchool%20C%26friends%5B0%5Dname%3DMary%26friends%5B0%5Dage%3D27%26friends%5B1%5Dname%3DSusan%26friends%5B1%5Dage%3D35%26family%3Aparents%5B0%5Drelation%3Dfather%26family%3Aparents%5B0%5Dname%3DDoe%26family%3Aparents%5B1%5Drelation%3Dmother%26family%3Aparents%5B1%5Dname%3DJane%26family%3Asiblings%5B0%5Dsister1%3Aname%3DAna%26family%3Asiblings%5B0%5Dsister1%3Aage%3D26%26family%3Asiblings%5B0%5Dsister1%3Achildren%5B0%5D%3DEric%26family%3Asiblings%5B0%5Dsister1%3Achildren%5B1%5D%3DLane
```

```JavaScript
> var restoredData = mapUriParamsToJSON(URIString); //takes encoded/non-encoded string
```


##Notes
The script was not designed to process HTML form data, specifically multi-value variables, i.e. from select attributes. Though if you convert the data to a JSON/JavaScript object, that should work.

 
Feel free to use it.

Cheers
