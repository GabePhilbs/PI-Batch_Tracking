
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
    let n =0;
    while(n < arr2.length){

        let i = 0;
        while(i < arr1.length){
            arr3[n+1] = arr2[n][arr1[i]];
            i++;
        }
        n++;
    }


//clear sheet
    //e.g.
    //InvoicesSheet.getRange(1,1,1000,30).clearContent();
    //getRange paramenters (first row, first column, number of rows, number of coulumns)
    printSheet.getRange(1,1,1000,30).clearContent();



//print array
    //e.g
    // InvoicesSheet.getRange(2,1,printArray.length,printArray[1].length).setValues(printArray);
    printSheet.getRange(1,1,arr3.length,arr3[0].length).setValues(arr3);









}