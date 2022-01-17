import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ApiService } from '@services/api';
import { AssetsService } from '@services/assets';

@Component({
  selector: 'huddle-file-viewer',
  templateUrl: './component.html',
  styleUrls: ['./component.sass'],
})
export class FileViewerComponent implements OnInit {
  @Output() selectedFile = new EventEmitter<any>();

  selected = '';
  images: any = [];

  constructor(private api: ApiService, private assets: AssetsService) {}

  ngOnInit(): void {
    this.updateImages();
  }

  private makeImageComponentStruct(image) {
    return {
      id: image.id,
      src: this.assets.get(image.id),
    };
  }

  updateImages() {
    const url = 'files?filter[uploaded_by][_eq]=$CURRENT_USER';
    this.api.get(url).subscribe((result) => {
      this.images = result.data.map((image) =>
        this.makeImageComponentStruct(image)
      );
    });
  }

  select(id) {
    if (this.selected === id) {
      this.selected = '';
    } else {
      this.selected = id;
    }
  }

  emit() {
    this.selectedFile.emit(this.selected);
  }

  delete() {
    const url = `files/${this.selected}`;
    this.api.delete(url).subscribe(() => this.updateImages());
  }
}
