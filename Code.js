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
        this.Balance = 0;
        this.Cloths = 0;
      
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
        if(this.Landed = 1){
            this.cost = this.Balance/ this.LandedQuantity;

        }
    }
    
}


// C group child classes
