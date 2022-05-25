//get necessary sheets

var ss = SpreadsheetApp.getActiveSpreadsheet();
  //Input Sheets
  var A1Input = ss.getSheetByName('Balances A1 Cloth Payment'); 
  var A2Input = ss.getSheetByName('Balances A2 Production payment'); 
  var A3Input = ss.getSheetByName('Balances A3 Shipping Payment'); 
  var B4Input = ss.getSheetByName('Balances B4 Refund'); 
  var B5Input = ss.getSheetByName('Balances B5 Batch'); 
  var C6Input = ss.getSheetByName('C6 Transfer');
  var C7Input = ss.getSheetByName('C7 Landing'); 
 

 //output sheets
  var A1Output = ss.getSheetByName('Balances A1 Cloth Payment'); 
  var A2Output = ss.getSheetByName('Balances A2 Production payment'); 
  var A3Output = ss.getSheetByName('Balances A3 Shipping Payment'); 
  var B4Output = ss.getSheetByName('Balances B4 Refund'); 
  var B5Output = ss.getSheetByName('Balances B5 Batch'); 


//object arrays
var A1Array =[];
var A2Array =[];
var A3Array =[];
var B4Array =[];
var B5Array =[];
var C6Array =[];
var C7Array =[];


//3 Group Classes

class AsourceAccounts{
  constructor(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount){
  this.ID = ID;
  this.Group = "A"
  this.ExternalID1 = ExID1;
  this.ExternalID2 = ExID2;
  this.Date = Date;
  this.Description = Description;
  this.InitialBalance = InitialBalance;
  this.Transfers = 0;
  this.CurrentBalance = InitialBalance;
  this.Payee = Payee;
  this.BankAccount = BankAccount;

    }
    UpdateBalance(){
        this.Balance = this.InitialBalance - this.Transfers;

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
        this.ClothPaid = 0;
        this.ProductionPaid = 0;
        this.ShippingPaid = 0;
        this.Balance = 0;
        this.Cloths = 0;
      
          }
          UpdateBalance(){
              this.Balance = this.ClothPaid + this.ProductionPaid + this.ShippingPaid;
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


//Child classes, one for each type. Production and shipping could use the parent classes
// because they have no specific properties or methods. However I decided that
// having all classes be type specific, except for two, would be confusing.



// A group child classes



// A1 cloth deposits
class A1 extends AsourceAccounts{
    constructor(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount,Initialcloths){
        super(ID,ExID1,ExID2,Date, Description, InitialBalance, Payee, BankAccount)
        this.Type = 1;
        this.Initialcloths =Initialcloths;
        this.ClothTransfers =0;
        this.ClothBalance= 0;
    }

    UpdateCloth(){

        this.ClothBalance = this.Initialcloths - this.ClothTransfers;

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
        this.Cost= 0;
    } 

    UpdateCost(){
        if(this.Landed == 1){
            this.cost = this.Balance/ this.LandedQuantity;

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
        this.Amount = Amount;
        this.Cloths = Cloths;
       
    }

    
    increaseDestination (){
        var targetArray="";

        switch(this.DestinationType){ //based on type we decide which array to access
            //object arrays
           case 1: targetArray = A1Array; break;
           case 2: targetArray = A2Array; break;
           case 3: targetArray = A3Array; break;
           case 4: targetArray = B4Array; break;
           case 5: targetArray = B5Array; break;
           default: console.log("error on transaction id" + this.ID + "invalid destination type" + this.DestinationType); break;

        }

       

        if(this.DestinationGroup = "B"){ //group B will have 3 types of balances

            //selecting which balance will increase
            let toIncrease = "";
            switch(this.OriginType){
                case 1: toIncrease = "ClothPaid"; break;
                case 2: toIncrease =  "ProductionPaid"; break;
                case 3: toIncrease = "ShippingPaid" ; break;}

            //find and increase the acount
            let index = targetArray.findIndex(x => x.ID === this.DestinationID)
            targetArray[index][toIncrease] = targetArray[index][toIncrease]+ this.Amount;
        
            if(this.ClothsclothIncrease != 0){
            targetArray[index].Cloths = targetArray[index].Cloths + this.Cloths;
            if(this.DestinationType == 1 ){ targetArray[index].UpdateCloth()}
        
            }
            targetArray[index].UpdateBalance();

            if(this.DestinationType == 5){ targetArray[index].UpdateCost()}





        }else if(this.DestinationGroup = "A"){ //if the destination is in group A, it only has one type of balance

            let index = targetArray.findIndex(x => x.ID === this.DestinationID)
            targetArray[index].Transfers = targetArray[index].Transfers + this.Amount;
        
            if(this.ClothsclothIncrease != 0){
            targetArray[index].Cloths = targetArray[index].ClothTransfers + this.Cloths;
            targetArray[index].UpdateCloth()
        
            }
            targetArray[index].UpdateBalance()
            

        }else{console.log( this.ID + "transaction has invalid destination group" + this.DestinationGroup)}
      }



      decreaseOrigin(){

        var targetArray="";

        switch(this.OriginType){ //based on type we decide which array to access
            //object arrays
           case 1: targetArray = A1Array; break;
           case 2: targetArray = A2Array; break;
           case 3: targetArray = A3Array; break;
           default: console.log("error on transaction id" + this.ID + "invalid origin type" + this.OriginType); break;

        }


         if(this.OriginGroup = "A"){ //origin always has to be A

            let index = targetArray.findIndex(x => x.ID === this.OriginID)
            targetArray[index].Transfers = targetArray[index].Transfers - this.Amount;
        
            if(this.ClothsclothIncrease != 0){
            targetArray[index].Cloths = targetArray[index].ClothTransfers + this.Cloths;
            targetArray[index].UpdateCloth()
        
            }
            targetArray[index].UpdateBalance()
            

        }else{console.log( this.ID + "transaction has invalid origin group" + this.OriginGroup)}
    }



}
    


// C7 Landing
class C7 extends CTransactions{
    constructor(ID,ExID,Date,BatchID, DateLanded, QuantityLanded){
        super(ID,ExID,Date)
        this.Type = 7;

        this.BatchID = BatchID;
        this.DateLanded = DateLanded;
        this.QuantityLanded =QuantityLanded


       
    }

    executeLanding(){

    }
    
}






//////// testing stuff

var batchIDFromSheet = 5000001;
var batchIDFromSheet2 = 5000002;

//var firstBatch = new B5(batchIDFromSheet,"AC105","","12/05/2022","");


function mainFunction(){
  B5Array[0]= new B5(batchIDFromSheet,"AC105","","12/05/2022","");
  B5Array[1]= new B5(batchIDFromSheet2,"AC105","","12/05/2022","");

  console.log(B5Array[0]);
  console.log(B5Array[1]);


  A2Array[0] = new A2(2000001,"","","","",500,"","")
  A2Array[1] = new A2(2000002,"","","","",400,"","")


  A1Array[0] = new A1(1000001,"","","","",1000,"","",500)
  A1Array[1] = new A1(1000002,"","","","",2000,"","",1000)
  
  
  someTransferA2 = new C6(6000001,"","","A",2,2000001,"B",5,5000002,100,0);
  someTransferA1 = new C6(6000001,"","","A",1,1000002,"B",5,5000002,500,250);

  someTransferA2.increaseDestination();
  someTransferA1.increaseDestination();




  console.log(B5Array[0]);
  console.log(B5Array[1]);


  
}



/// transfer  will have two methods: increaseDestination and decreaseOrigin
function increaseDestination (objID, increase, clothIncrease, targetArray, destinationGroup, destinationType){
  let index = targetArray.findIndex(x => x.ID === objID)
  targetArray[index].Balance = targetArray[index].Balance + increase;

  if(clothIncrease != 0){
    targetArray[index].Cloths = targetArray[index].Cloths + clothIncrease;
    if(destinationType == 1 ){ targetArray[index].UpdateCloth()}

  }
  if(destinationGroup == "A"){ targetArray[index].UpdateBalance()}
  if(destinationType == 5){ targetArray[index].UpdateCost()}

}














