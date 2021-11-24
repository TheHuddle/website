import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'huddle-file-manager',
  templateUrl: './component.html',
  styleUrls: ['./component.sass']
})
export class FileManagerComponent {
  @Output() selectedFileId = new EventEmitter<any>();

  selectFile(id) {
    this.selectedFileId.emit(id)
  }
}
