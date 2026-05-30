import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from './shared/components/button/button';
import { Badge } from './shared/components/badge/badge';
import { Spinner } from './shared/components/spinner/spinner';
import { Tabs, TabItem } from './shared/components/tabs/tabs';
import { Pagination } from './shared/components/pagination/pagination';
import { Input } from './shared/components/input/input';
import { Select, SelectOption } from './shared/components/select/select';
import { Checkbox } from './shared/components/checkbox/checkbox';
import { Radio } from './shared/components/radio/radio';
import { Range } from './shared/components/range/range';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Button, Badge, Spinner, Tabs, Pagination, Input, Select, Checkbox, Radio, Range],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('sms-frontend');

  // ── Button playground ──────────────────────────────────────────────────────
  protected readonly isLoading = signal(false);
  protected readonly isDisabled = signal(false);

  protected onButtonClick(buttonName: string): void {
    console.log(`${buttonName} clicked!`);
  }

  protected toggleLoading(): void {
    this.isLoading.update(v => !v);
  }

  protected toggleDisabled(): void {
    this.isDisabled.update(v => !v);
  }

  // ── Tabs ───────────────────────────────────────────────────────────────────
  protected readonly activeTabId = signal('records');
  protected readonly tabsData = signal<TabItem[]>([
    { id: 'records',    label: 'Student Records' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'discipline', label: 'Discipline' },
    { id: 'legacy',     label: 'Legacy Data', disabled: true },
  ]);

  protected onTabChange(tabId: string): void {
    this.activeTabId.set(tabId);
  }

  // ── Pagination ─────────────────────────────────────────────────────────────
  protected readonly currentPage = signal(1);
  protected readonly totalPages = signal(12);

  protected onPageChange(pageNumber: number): void {
    this.currentPage.set(pageNumber);
  }

  // ── Form Inputs ────────────────────────────────────────────────────────────
  // 29. Text search input
  protected readonly searchValue = signal('');

  // 25. Enrollment Status select
  protected readonly enrollmentStatus = signal('enrolled');
  protected readonly enrollmentOptions = signal<SelectOption[]>([
    { value: 'enrolled',   label: 'Currently Enrolled' },
    { value: 'graduated',  label: 'Graduated' },
    { value: 'suspended',  label: 'Suspended' },
    { value: 'withdrawn',  label: 'Withdrawn' },
  ]);

  // 28. Lab Fees amount input
  protected readonly labFees = signal('');

  // 26. Checkbox & Radio
  protected readonly optInEmail   = signal(true);
  protected readonly selectedTerm = signal('termA');

  // 27. Grade Curve range
  protected readonly gradeCurve = signal(15);

  // 31. Error & Success state inputs
  protected readonly errorValue   = signal('invalid-entry@');
  protected readonly successValue = signal('Valid Entry');
}
