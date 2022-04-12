import { Component, OnInit } from "@angular/core";
import { CompleterService } from "ng2-completer";

import { DefaultEditor } from "./default-editor";

@Component({
  selector: "completer-editor",
  styleUrls: ["./completer-editor.component.scss"],
  template: `

    <ng2-completer
      [(ngModel)]="completerStr"
      [clearUnselected]="true"
      [dataService]="cell.getColumn().getConfig().completer.dataService"
      [minSearchLength]="
        cell.getColumn().getConfig().completer.minSearchLength || 0
      "
      [pause]="cell.getColumn().getConfig().completer.pause || 0"
      [placeholder]="
        cell.getColumn().getConfig().completer.placeholder || 'Start typing...'
      "
      (selected)="onEditedCompleter($event)"

    >
    </ng2-completer>


  `,
})
export class CompleterEditorComponent extends DefaultEditor implements OnInit {
  completerStr: string = "";

  constructor(private completerService: CompleterService) {
    super();
  }

  ngOnInit() {
    this.completerStr=this.cell.getValue();
    if (
      this.cell.getColumn().editor &&
      this.cell.getColumn().editor.type === "completer"
    ) {
      const config = this.cell.getColumn().getConfig().completer;
      if (config.remote && config.url) {
        config.dataService = this.completerService.remote(
          config.url,
        null,
          config.titleField
        );
        config.dataService.descriptionField(config.descriptionField);
      } else {
        config.dataService = this.completerService.local(
          config.data,
          config.searchFields,
          config.titleField
        );
        config.dataService.descriptionField(config.descriptionField);
      }


    }
  }

  onEditedCompleter(event:any): boolean {
    const config = this.cell.getColumn().getConfig().completer;
    if (config.remote && config.url) {
      this.cell.newValue = event.originalObject[config.valueField];
    }
    else {
      this.cell.newValue = event.title;
    }
    return false;
  }

}
