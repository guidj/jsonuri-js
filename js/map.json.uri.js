/*
 * guidj@bitbucket
 */

function decodeUriParam(value){
    var values = value.split("=");
    
    return {"key": decodeURIComponent(values[0]), "value": decodeURIComponent(values[1])};
}

function mapJSONToUriParams(data, prefix, call){
    
    prefix = typeof prefix !== 'undefined' ? prefix : "";
    call = typeof call !== 'undefined' ? call : 0;

    var map = [];
    
    if( Object.prototype.toString.call( data ) === '[object Array]' ) {

        for (var ik = 0; ik < data.length; ik++){
            map.push(mapJSONToUriParams(data[ik], prefix + "[" + ik + "]", call + 1));
        };
        
    }else if ( Object.prototype.toString.call( data ) === '[object Object]' ) {
        Object.keys(data).map(function(k){
            var sep = "";
            
            //not empty
            if (prefix !== ""){
                
                if (prefix.slice(-1) !== "]"){
                    sep = ":";
                }
            }
            
            map.push(mapJSONToUriParams(data[k], prefix + sep + k, call + 1));
        });      
        
    }else{
        map.push(prefix + "=" + data);
    }   
        
    return map.join("&");
}

function mapObjectKey(key, value, object){
    
    var indexOfObjectSep = key.indexOf(":");
    var indexOfArray = key.indexOf("["); 
    
    if ((indexOfObjectSep > -1 && indexOfObjectSep < indexOfArray) || (indexOfObjectSep > -1 && indexOfArray === -1)){
        
        var extractedKey = key.substr(0, indexOfObjectSep);
        var remainingKey = key.substr(indexOfObjectSep + 1);
        
        if (!(extractedKey in object)){
            object[extractedKey] = {};
        }
        
        if (remainingKey === ""){
            object[extractedKey] = value;
        }else{
            return mapObjectKey(remainingKey, value, object[extractedKey]);
        } 
        
    } else if ((indexOfArray > -1 && indexOfArray < indexOfObjectSep) || (indexOfArray > -1 && indexOfObjectSep === -1)){
        
        var extractedKey = key.substr(0, indexOfArray);
        var remainingKey = key.substr(key.indexOf("]") + 1);
        
        if (!(extractedKey in object)){
            object[extractedKey] = [];
        }
        
        var index = parseInt(key.substr(indexOfArray + 1, key.indexOf("]") - 1));
        
        if (!(index in object[extractedKey])){
            object[extractedKey][index] = {};
        }
        
        if (remainingKey === ""){
            object[extractedKey][index] = value;
        }else{
            return mapObjectKey(remainingKey, value, object[extractedKey][index]);
        }   
        
    }else{
        object[key] = value;
    }
}

function mapUriParamsToJSON(data, object, call){
    
    call = typeof call !== 'undefined' ? call : 0;
    object = typeof object !== 'undefined' ? object : {};
    
    if (call === 0){
        data = decodeURIComponent(data).split("&");
        
        for (var i = 0; i < data.length; i++){
            mapUriParamsToJSON(data[i], object, call + 1);
        }        
    }else{
        //decode data
        var pair = decodeUriParam(data);
        //build object recursively
        mapObjectKey(pair["key"], pair["value"], object);
    }

    return object;
}



