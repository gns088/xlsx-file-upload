import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xlsx-file-uploader';
  valueJson = {
    'Name': 'name',
    'RightKey': 'rightMask',
    'Icon': 'icon',
    'State': 'state',
    'Type': 'type',
    'Is quick': 'isQuick',
    'show in menu': 'showInMenu'
  };

  onSuccess(event) {
    console.log(event);
  }

  onError(event) {
    console.log(event);
  }

}
