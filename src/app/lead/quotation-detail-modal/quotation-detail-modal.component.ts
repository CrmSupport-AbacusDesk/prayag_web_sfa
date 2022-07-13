import { Component, Inject, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from 'src/app/dialog.component';

@Component({
  selector: 'app-quotation-detail-modal',
  templateUrl: './quotation-detail-modal.component.html'
})
export class QuotationDetailModalComponent implements OnInit {

  quotation_id: any;
  termsNcondition='';
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '10rem',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no',
    "toolbar": [
        ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
        ["fontName", "fontSize", "color"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
        ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
        
    ]
};
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public serve: DatabaseService,
    public dialog: DialogComponent,
    public dialog2: MatDialog

  ) {
    console.log(data);
    this.quotation_id = data['id'];
    this.termsNcondition = data['termsNcondition'];

    console.log(this.quotation_id);

    
  }

  ngOnInit() {

  }

  saveQuotation(TnC){
    console.log("save function");
    
    console.log(TnC);

    this.serve.fetchData({'quotation_id':this.quotation_id ,'term_condition':TnC}, "Lead/quotation_termsUpdate").subscribe((result => {
      console.log(result);
      this.dialog2.closeAll();

      
    }))

    // Lead/quotation_termsUpdate
    // quotation_id, term_condition
    

  }
  

 

  

 
}