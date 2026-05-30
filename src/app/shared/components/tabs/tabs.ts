import { Component, input, output } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs {
  // Inputs using modern Angular signals
  readonly tabs = input.required<TabItem[]>();
  readonly activeId = input.required<string>();

  // Outputs using modern Angular signal outputs
  readonly tabChange = output<string>();

  // Trigger tab change if not disabled and not already active
  protected selectTab(tab: TabItem): void {
    if (!tab.disabled && tab.id !== this.activeId()) {
      this.tabChange.emit(tab.id);
    }
  }
}
