/* eslint-disable semi */
/* eslint-disable no-undef */

export const parseJson = <Type>(str: string | undefined = '{}') : Type => {
    let parsed = null;
    try{
        parsed = JSON.parse(str);
    }
    catch (error){
        console.log('Error parsing string to JSON' , str);
        console.log('Error details:' , error);

    }
    return parsed;
}


export const parseGroups = (str: string | undefined = '') => {
    
  return str.split(",");

}
