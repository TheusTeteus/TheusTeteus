
function onEdit(){

    
var current_sheet = SpreadsheetApp.getActive().getSheetName();

if(current_sheet == "Página1"){

var active_cells = SpreadsheetApp.getActive().getSheetByName("Página1");
var row = active_cells.getActiveCell().getRow();
var column = active_cells.getActiveCell().getColumn();

if(row > 1 && column == 1){
  search_address();
}

}

}

function search_address() {
  
var current_sheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = current_sheet.getSheetByName("Página1");

var row = sheet.getActiveCell().getRow();

var post_code = sheet.getRange(row,1).getValue();

if(post_code == ""){
  sheet.getRange(row,2,1,6).clearContent();
  return false;
}
var post_code = post_code.replace(/\D/g, '');
var check_post_code = /^[0-9]{8}$/;

if(post_code != ""){

  if(check_post_code.test(post_code)){

    var url = "http://viacep.com.br/ws/" + post_code + "/json/";
    var comeback = UrlFetchApp.fetch(url);
    var json = comeback.getContentText();
    var data = JSON.parse(json);

    if(data.logradouro != null){

        guia.getRange(row,2).setValue(data.logradouro);
        guia.getRange(row,4).setValue(data.complemento);
        guia.getRange(row,5).setValue(data.bairro);
        guia.getRange(row,6).setValue(data.localidade);
        guia.getRange(row,7).setValue(data.uf);
        
    }

  }
}

}
