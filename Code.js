//get necessary sheets

var ss = SpreadsheetApp.getActiveSpreadsheet();
  //Input Sheets
  var A0Input = ss.getSheetByName('A0 Unapplied Payment');
  var A1Input = ss.getSheetByName('A1 Cloth Payment'); 
  var A2Input = ss.getSheetByName('A2 Production payment'); 
  var A3Input = ss.getSheetByName("A3 Shipping Payment"); 
  var A8Input = ss.getSheetByName("A8 Customs Payment"); 
  var B4Input = ss.getSheetByName("B4 Refund"); 
  var B5Input = ss.getSheetByName('B5 Batch'); 
  var C6Input = ss.getSheetByName('C6 Transfer');
  var C7Input = ss.getSheetByName('C7 Landing'); 
 

 //output sheets
  var A0Output = ss.getSheetByName('Balances A0 Unapplied Payment');
  var A1Output = ss.getSheetByName('Balances A1 Cloth Payment'); 
  var A2Output = ss.getSheetByName('Balances A2 Production payment'); 
  var A3Output = ss.getSheetByName('Balances A3 Shipping Payment'); 
  var A8Output = ss.getSheetByName('Balances A8 Customs Payment'); 
  var B4Output = ss.getSheetByName('Balances B4 Refund'); 
  var B5Output = ss.getSheetByName('Balances B5 Batch'); 


//object arrays
var A0Array =[];
var A1Array =[];
var A2Array =[];
var A3Array =[];
var A8Array =[];
var B4Array =[];
var B5Array =[];
var C6Array =[];
var C7Array =[];


//Part 3: Group Classes

class AsourceAccounts{
  constructor(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount){
  this.ID = ID;
  this.Group = "A"
  this.ExternalID1 = ExID1;
  this.ExternalID2 = ExID2;
  this.Date = Date;
  this.Description = Description;
  this.InitialBalance = 1.0 * InitialBalance;
  this.Transfers = 0.0;
  this.CurrentBalance = 1.0 * InitialBalance;
  this.Payee = Payee;
  this.BankAccount = BankAccount;

    }
    UpdateBalance(){
        this.CurrentBalance = this.InitialBalance + this.Transfers;

    }

}


//Parent classes, onefor each group

class BDestinationAccounts{
    constructor(ID,ExID1,ExID2,Date, Description){
        this.ID = ID;
        this.Group = "B"
        this.ExternalID1 = ExID1;
        this.ExternalID2 = ExID2;
        this.Date = Date;
        this.Description = Description;
        this.ClothPaid = 0.0;
        this.ProductionPaid = 0.0;
        this.ShippingPaid = 0.0;
        this.CustomsPaid = 0.0;
        this.Balance = 0.0;
        this.Cloths = 0;
      
          }
          UpdateBalance(){
              this.Balance = this.ClothPaid + this.ProductionPaid + this.ShippingPaid + this.CustomsPaid;
          }
          
    
}


class CTransactions{
    constructor(ID,ExID,Date){
        this.ID = ID;
        this.Group = "c";
        this.ExternalID1 = ExID;
        this.Date = Date;
    }
}

//Part 4: Type classes
//Child classes, one for each type. Production and shipping could use the parent classes
// because they have no specific properties or methods. However I decided that
// having all classes be type specific, except for two, would be confusing.



// A group child classes


// A0 Other deposits
class A0 extends AsourceAccounts{
    constructor(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount){
        super(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount)
        this.Type = 0;
       
    }
    
}


// A1 cloth deposits
class A1 extends AsourceAccounts{
    constructor(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount,Initialcloths){
        super(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount)
        this.Type = 1;
        this.Initialcloths = Initialcloths;
        this.ClothTransfers = 0;
        this.ClothBalance =  Initialcloths;
    }

    UpdateCloth(){

        this.ClothBalance = this.Initialcloths + this.ClothTransfers;

    }
}



// A2 production deposits
class A2 extends AsourceAccounts{
    constructor(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount){
        super(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount)
        this.Type = 2;
       
    }
    
}

// A3 shipping deposits
class A3 extends AsourceAccounts{
    constructor(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount){
        super(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount)
        this.Type = 3;
    }
}

// A8 customs deposits
class A8 extends AsourceAccounts{
    constructor(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount){
        super(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount)
        this.Type = 8;
    }
}

// B group child classes

// B4 refunds
class B4 extends BDestinationAccounts{
    constructor(ID,ExID1,ExID2,Date, Description,BankAccount){
        super(ID,ExID1,ExID2,Date, Description)
        this.Type = 4;
        this.BankAccount= BankAccount; //bankaccount should be the QBO number without the dash
    } 
    
}

// B5 batch
class B5 extends BDestinationAccounts{
    constructor(ID,ExID1,ExID2,Date, Description){
        super(ID,ExID1,ExID2,Date, Description)
        this.Type = 5;
        this.Landed = 0;
        this.LandedDate= "";
        this.LandedQuantity = 0;
        this.Cost= 0.0;
    } 

    UpdateCost(){
        if(this.Landed == 1){
            this.Cost = this.Balance/ this.LandedQuantity;

        }
    }
    
}


// C group child classes


// C6 transfer
class C6 extends CTransactions{
    constructor(ID,ExID,Date,OriginGroup,OriginType,OriginID,DestinationGroup,DestinationType,DestinationID, Amount, Cloths ){
        super(ID,ExID,Date)
        this.Type = 6;

        this.OriginGroup =OriginGroup;
        this.OriginType =OriginType;
        this.OriginID = OriginID;
        this.DestinationGroup = DestinationGroup;
        this.DestinationType = DestinationType;
        this.DestinationID = DestinationID;
        this.Amount = 1.0 * Amount;
        this.Cloths =  Cloths;
       
    }

    
    executeTransfer(){

        //INCREASE ORIGIN*****
        var targetArray="";

        switch(this.DestinationType){ //based on type we decide which array to access
            //object arrays
            case 0: targetArray = A0Array; break;
            case 1: targetArray = A1Array; break;
            case 2: targetArray = A2Array; break;
            case 3: targetArray = A3Array; break;
            case 4: targetArray = B4Array; break;
            case 5: targetArray = B5Array; break;
            case 8: targetArray = A8Array; break;
            default: throw new Error(" error on transaction id " + this.ID + " invalid destination type " + this.DestinationType); break;

        }

       

        if(this.DestinationGroup == "B"){ //group B will have (old 3 types of balances) 4 types of balances

            //selecting which balance will increase
            let toIncrease = "";
            switch(this.OriginType){
                case 1: toIncrease = "ClothPaid"; break;
                case 2: toIncrease =  "ProductionPaid"; break;
                case 3: toIncrease = "ShippingPaid" ; break;
                case 8: toIncrease = "CustomsPaid" ; break;
                default: throw new Error(" error on transaction id " + this.ID + " invalid origin type " + this.OriginType); break;

            
            }

            //find and increase the acount
            let index = targetArray.findIndex(x => x.ID === this.DestinationID)
            targetArray[index][toIncrease] = targetArray[index][toIncrease]+ this.Amount;
            
        
            if(this.Cloths != 0){
            targetArray[index].Cloths = targetArray[index].Cloths + this.Cloths;
            if(this.DestinationType == 1 ){ targetArray[index].UpdateCloth()}
        
            }

            //updates cost(per unit) of batch in case the landing was executed before this transfer
            if(this.DestinationType == 5){ targetArray[index].UpdateCost()}

            targetArray[index].UpdateBalance()

        

        }else if(this.DestinationGroup == "A"){ //if the destination is in group A, it only has one type of balance

            let index = targetArray.findIndex(x => x.ID === this.DestinationID)
            targetArray[index].Transfers = targetArray[index].Transfers + this.Amount;
        
            if(this.Cloths != 0){
            targetArray[index].ClothTransfers = targetArray[index].ClothTransfers + this.Cloths;
            targetArray[index].UpdateCloth()
        
            }
            
            targetArray[index].UpdateBalance()

        }else{console.log( this.ID + "transaction has invalid destination group" + this.DestinationGroup)}
      
       
       
        //DECREASE ORIGIN*****

        var originArray="";

        switch(this.OriginType){ //based on type we decide which array to access

        //object arrays
            case 0: originArray = A0Array; break;
            case 1: originArray = A1Array; break;
            case 2: originArray = A2Array; break;
            case 3: originArray = A3Array; break;
            case 8: originArray = A8Array; break;
            default: throw new Error(" error on transaction id " + this.ID + " invalid origin type " + this.OriginType); break;

        }


         if(this.OriginGroup == "A"){ //origin always has to be A

            let index = originArray.findIndex(x => x.ID === this.OriginID)
            originArray[index].Transfers = originArray[index].Transfers - this.Amount;
        
            if(this.Cloths != 0){
            originArray[index].ClothTransfers = originArray[index].ClothTransfers - this.Cloths;
            originArray[index].UpdateCloth()
        
            }
            originArray[index].UpdateBalance()
            

        }else{console.log( this.ID + "transaction has invalid origin group" + this.OriginGroup)}
    }



}
    


// C7 Landing
class C7 extends CTransactions{
    constructor(ID,ExID,Date,BatchID, QuantityLanded){
        super(ID,ExID,Date)
        this.Type = 7;

        this.BatchID = BatchID;
        this.QuantityLanded = QuantityLanded;


       
    }

    executeLanding(){
        //can only land batches, so we already know the array, type and group

        let index = B5Array.findIndex(x => x.ID === this.BatchID)

        //make sure we are dealing with an unlanded batch
        if(B5Array[index].Landed !=0){throw new Error(" error on lading " + this.ID+ " the batch " + this.BatchID + " has the following landing status: " + B5Array[index].Landed);
        }else{

            B5Array[index].Landed = 1;
            B5Array[index].LandedQuantity = this.QuantityLanded;
            B5Array[index].LandedDate = this.Date;
            B5Array[index].UpdateCost();

        }

        

    }
    
}

//Part 5: Main function
//main function
function mainFunction(){
//need a list of arguments for the constroctur to be used in importObjects
//basically just list the name of the arguments. Syntax has to match the spreadsheet labels
//it does not need to mach the key names, since they are determined by the order entered in the constructor
//still it is better if everything matches, because this can get confusing
//As I create a list of arguments, I use the import function to retrieve the data from the sheet

    let A0Arguments = ["ID","ExID1","ExID2","Date", "Description", "InitialBalance", "Payee", "BankAccount"];
    importObjects(A0Input,A0Arguments,A0,A0Array);
    let A1Arguments = ["ID","ExID1","ExID2","Date", "Description", "InitialBalance", "Payee", "BankAccount","Initialcloths"];
    importObjects(A1Input,A1Arguments,A1,A1Array);
    let A2Arguments = ["ID","ExID1","ExID2","Date", "Description", "InitialBalance", "Payee", "BankAccount"];
    importObjects(A2Input,A2Arguments,A2,A2Array);
    let A3Arguments = ["ID","ExID1","ExID2","Date", "Description", "InitialBalance", "Payee", "BankAccount"];
    importObjects(A3Input,A3Arguments,A3,A3Array);
    //added for customs
    let A8Arguments = ["ID","ExID1","ExID2","Date", "Description", "InitialBalance", "Payee", "BankAccount"];
    importObjects(A8Input,A8Arguments,A8,A8Array);
    //
    let B4Arguments = ["ID","ExID1","ExID2","Date", "Description","BankAccount"];
    importObjects(B4Input,B4Arguments,B4,B4Array);
    let B5Arguments = ["ID","ExID1","ExID2","Date", "Description"];
    importObjects(B5Input,B5Arguments,B5,B5Array);
    let C6Arguments = ["ID","ExID","Date","OriginGroup","OriginType","OriginID","DestinationGroup","DestinationType","DestinationID", "Amount", "Cloths"];
    importObjects(C6Input,C6Arguments,C6,C6Array);
    let C7Arguments = ["ID","ExID","Date","BatchID", "QuantityLanded"];
    importObjects(C7Input,C7Arguments,C7,C7Array);


    //at this point all object barrays should be populated
    //Now I execute the transfers
    let ja = 0
    while(ja < C6Array.length){C6Array[ja].executeTransfer(); ja++;};

    //now execute landings
    let jb = 0
    while(jb < C7Array.length){C7Array[jb].executeLanding(); jb++};


    //now we print the results to the respective sheets
    printObjects(A0Array,A0Output);
    printObjects(A1Array,A1Output);
    printObjects(A2Array,A2Output);
    printObjects(A3Array,A3Output);
    printObjects(A8Array,A8Output);
    printObjects(B4Array,B4Output);
    printObjects(B5Array,B5Output);



}

