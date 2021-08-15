import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit, AfterViewInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.settingsService.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme);
  }

}
