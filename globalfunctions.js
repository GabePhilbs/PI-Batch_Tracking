
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

//fill oput the array that will be printed
    let i = 0;
    while(i < arr2.length){
        arr3[i+1] = arr2[i];
    }


//clear sheet
    //e.g.
    //InvoicesSheet.getRange(1,1,1000,30).clearContent();
    printSheet.getRange(1,1,1000,30).clearContent();



//print array
    //e.g
    // InvoicesSheet.getRange(2,1,printArray.length,printArray[1].length).setValues(printArray);









}