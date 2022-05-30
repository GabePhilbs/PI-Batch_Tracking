
//this function prints an array of ojects to a sheet, including a title row
//arr2 is the array of objects that will be printed
//printSheet is the sheet where it wil be printed
function printObjects(arr2,printSheet){
    arr1 = Object.keys(arr2[0]);

    arr3=[];
    arr3[0] = arr1;

    //sort arr2 by the ID key, can't sort arr3 directly, because it would mess up the title row

    arr2.sort((a, b) => {
        return a.ID - b.ID;
    });

    //fill output the array that will be printed
    //we loop through object array, then through key array, 
    //adding each property to the internal array
    let n = 0;
    while(n < arr2.length){

        //declare that the next element is an array
        //otherise you will feed the property  [i] to an undefined variable
        arr3[n+1] = [];

        let i = 0;
        while(i < arr1.length){
            arr3[n+1][i] = arr2[n][arr1[i]];
            i++;
        }
        n++;
    }


    //clear sheet
    //getRange paramenters (first row, first column, number of rows, number of coulumns)
    printSheet.getRange(1,1,1000,30).clearContent();

    //print array
    printSheet.getRange(1,1,arr3.length,arr3[0].length).setValues(arr3);

}


//imports data from a sheet and turns it into an object array
//needs a source sheet, an array to each add each row, and a class that will be used to create the objects
//also needs an array of orguments required for the cosntructor of the object

function importObjects(originSheet,argumentArray,objectClass,objectArray){

    let numberOfColumns = argumentArray.length;


   //find the last row of the sheet
    let lastRow = originSheet.getLastRow();
    //get the range and save on a temporary array of arrays. We will later reorder it to facilitate object creation
    let arrayFromSheet = originSheet.getRange(1,1, lastRow, numberOfColumns).getValues();

   

    // we discover the order of the properties on the constructor and save it on an array positionArray, so we don't have to redo the search for each row
    // e.g. positionArray[0] tells us which column of arrayFromSheet will be the first argument in the constructor
    let positionArray = [];

    //lets populate the position array
    let k = 0;
    while(k<argumentArray.lenght){
        let i =0;
        while(i<arrayFromSheet[0]){
            if(arrayFromSheet[0][i] == argumentArray[k]){positionArray.push(i)};

            i++;

        }

    }
    
    //now, we need to rearrange the values in this array so that they match the order in which
    //the object constructor must receive its keys
    let arrayForConstructor =[];

    //loop through the position array, getting data from the respective rows in the spreadsheet
    let n =0;
    
    while(n<arrayFromSheet.lenght){

        let thisObject =[];
        let i= 0;
        while(i<positionArray.lentgh){
            thisPosition = positionarray[i];
            thisObject.push(arrayFromSheet[n][position])
        }
       
    };


//each element of the outer array will become an object
// use the values for the inner array as parameters in the constructor
    // e.g. 
    //objectArray[n] = new objectClass(arrayFromSheet[n][i],...)







};