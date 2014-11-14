<?php

class MapJSONUri{

    public static function decodeUriParam($value){
        $values = explode("=",  $value);
        
        $pair = new ArrayObject(array(), ArrayObject::ARRAY_AS_PROPS);
        $pair->key = $values[0];
        $pair->value = $values[1];
        return $pair;
    }
    
    public static function mapJSONToUriParams($data, $prefix = "", $call = 0){

        $map = [];

        if( is_array( $data ) ):

            for ( $ik = 0; $ik < count ($data); $ik++):
                $map[] = self::mapJSONToUriParams($data[$ik], $prefix . "[" . $ik . "]", $call + 1);
            endfor;

        elseif ( is_object ($data) ):
            
            foreach( $data as $k => $value):
                $sep = "";

                if ($prefix !== ""){
                    if ( substr($prefix, -1) !== "]"){
                        $sep = ":";
                    }
                }
                
                $map[] = self::mapJSONToUriParams($data->$k, $prefix . $sep . $k, $call + 1);
            endforeach;     

        else:
            $map[] = $prefix . "=" . $data;
        endif;

        return implode("&", $map);
    }    
 
    protected static function mapObjectKey($key, $value, $object){

        $indexOfObjectSep = strpos($key, ":");
        $indexOfArray = strpos($key, "["); 

        if (($indexOfObjectSep !== FALSE && $indexOfObjectSep < $indexOfArray) || ($indexOfObjectSep !== FALSE && $indexOfArray === FALSE)):

            $extractedKey = substr($key, 0, $indexOfObjectSep);
            $remainingKey = substr($key, $indexOfObjectSep + 1);

            echo "ObjectFirst: {{$extractedKey}}|{{$remainingKey}}\n";
            
            if ( !(property_exists($object, $extractedKey) ) ):
                $object[$extractedKey] = new ArrayObject(array(), ArrayObject::ARRAY_AS_PROPS);
            endif;
            
            if ( empty($remainingKey) ):
                $object[$extractedKey] = $value;
            else:
                return self::mapObjectKey($remainingKey, $value, $object[$extractedKey]);
            endif;

        elseif (($indexOfArray !== FALSE && $indexOfArray < $indexOfObjectSep) || ($indexOfArray !== FALSE && $indexOfObjectSep === FALSE)):

            $extractedKey = substr($key, 0, $indexOfArray);
            $remainingKey = substr($key, strpos($key, "]") + 1);
            
            echo "ArrayFirst: {{$extractedKey}}|{{$remainingKey}}\n";
            
            if ( !(property_exists($object, $extractedKey) ) ):
                $object[$extractedKey] = array();//new ArrayObject(array(), ArrayObject::ARRAY_AS_PROPS);
            endif;
            
            $index = (int) substr($key, $indexOfArray + 1, strpos($key, "]") - 1);
            
            echo "Index: {{$index}}\n";
            
            if ( !(array_key_exists($index, $object[$extractedKey])) ):
                $object[$extractedKey][$index] = new ArrayObject(array(), ArrayObject::ARRAY_AS_PROPS);
            endif;

            if ( empty($remainingKey) ):
                $object[$extractedKey][$index] = $value;
            else:
                return self::mapObjectKey($remainingKey, $value, $object[$extractedKey][$index]);
            endif;
        else:
            
            echo "K, V {{$key}}|{{$value}}\n";
            $object["$key"] = $value;
            
        endif;
    }
    
    public static function mapUriParamsToJSON($data, $object = NULL, $call = 0){
        
        if( !isset($object) ):
            $object = new ArrayObject(array(), ArrayObject::ARRAY_AS_PROPS);
        endif;
        
        if ($call === 0):
            #first call. split string into pairs
            $data = explode("&", urldecode($data));
            
            #decypher pair
            for ($i = 0; $i < count($data); $i++):
                self::mapUriParamsToJSON($data[$i], $object, $call + 1);
            endfor;        
        else:
            //decode string
            $pair = self::decodeUriParam($data);
        
            //build object recursively
            self::mapObjectKey($pair->key, $pair->value, $object);
        endif;

        return $object;
    }

}