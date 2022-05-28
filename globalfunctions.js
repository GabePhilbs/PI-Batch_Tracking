
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

            console.log(arr3[n+1]);
            console.log(arr2[n]);
            console.log(arr1[i])
            //arr2[n][arr1[i]]



        }
        n++;
    }


//clear sheet
    //e.g.
    //InvoicesSheet.getRange(1,1,1000,30).clearContent();
    //getRange paramenters (first row, first column, number of rows, number of coulumns)
    printSheet.getRange(1,1,1000,30).clearContent();

    console.log(arr1);
    console.log(arr2);
    console.log(arr3);
    console.log(arr3.length);
    console.log(arr3[0].length);

//print array
    //e.g
    // InvoicesSheet.getRange(2,1,printArray.length,printArray[1].length).setValues(printArray);
    printSheet.getRange(1,1,arr3.length,arr3[0].length).setValues(arr3);









}


//imports data from a sheet and turns it into an object array
//needs a source sheet, an array to each add each row, and
// a class that will be used to create the objects
function importObjects(originSheet,objectArray,objectClass){


//get the range and save on a temporary array of arrays
        //e.g. let tempArray = get range



//each element o=f the outer array will become an object
// use the values for the inner array as parameters in the constructor
    // e.g. 
    //objectArray[n] = new objectClass(tempArray[n][i],...)








};