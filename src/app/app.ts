import { Component, signal } from '@angular/core';
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
import { Accordion, AccordionItem } from './shared/components/accordion/accordion';
import { Carousel, CarouselSlide } from './shared/components/carousel/carousel';
import { Skeleton } from './shared/components/skeleton/skeleton';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Button, Badge, Spinner, Tabs, Pagination, Input, Select, Checkbox, Radio, Range, Accordion, Carousel, Skeleton],
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
  protected readonly searchValue = signal('');
  protected readonly enrollmentStatus = signal('enrolled');
  protected readonly enrollmentOptions = signal<SelectOption[]>([
    { value: 'enrolled',  label: 'Currently Enrolled' },
    { value: 'graduated', label: 'Graduated' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'withdrawn', label: 'Withdrawn' },
  ]);
  protected readonly labFees = signal('');
  protected readonly optInEmail   = signal(true);
  protected readonly selectedTerm = signal('termA');
  protected readonly gradeCurve   = signal(15);
  protected readonly errorValue   = signal('invalid-entry@');
  protected readonly successValue = signal('Valid Entry');

  // ── Accordion ─────────────────────────────────────────────────────────────
  protected readonly accordionItems = signal<AccordionItem[]>([
    {
      id: 'integrity',
      title: 'Academic Integrity Policy',
      content: 'Oakhaven Academy maintains strict standards regarding plagiarism and academic honesty. Students found in violation of these policies may face disciplinary action including suspension or expulsion.',
    },
    {
      id: 'attendance',
      title: 'Attendance Requirements',
      content: 'Students are required to attend at least 85% of scheduled classes per term. Absences beyond this threshold must be supported by a medical certificate or formal parental notification.',
    },
    {
      id: 'fees',
      title: 'Fee Payment Schedule',
      content: 'All tuition and lab fees must be settled by the 10th of each month. Late payments attract a 2% monthly surcharge. Contact the Finance Office for installment plan arrangements.',
    },
  ]);

  // ── Carousel ──────────────────────────────────────────────────────────────
  protected readonly carouselSlides = signal<CarouselSlide[]>([
    {
      id: 'slide1',
      title: 'Annual Science Fair 2024',
      subtitle: 'Join us this Friday in the Main Hall for student exhibitions.',
    },
    {
      id: 'slide2',
      title: 'Inter-School Sports Day',
      subtitle: 'Registration open for track, field, and team events.',
    },
    {
      id: 'slide3',
      title: 'Parent-Teacher Conference',
      subtitle: 'Schedule your slot via the portal — limited availability.',
    },
  ]);
}
