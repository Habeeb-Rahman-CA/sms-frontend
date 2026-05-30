import { Component, computed, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
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
import { Modal } from './shared/components/modal/modal';
import { Offcanvas } from './shared/components/offcanvas/offcanvas';
import { Popover } from './shared/components/popover/popover';
import { Toast, ToastType } from './shared/components/toast/toast';
import { Table, TableColumn } from './shared/components/table/table';
import { FileUpload } from './shared/components/file-upload/file-upload';
import { Alert } from './shared/components/alert/alert';
import { Progress } from './shared/components/progress/progress';
import { Grid } from './shared/components/layout/grid';
import { Topbar, NavItem } from './shared/components/topbar/topbar';
import { Sidebar, SidebarNavGroup, SidebarNavItem, SidebarBottomItem } from './shared/components/sidebar/sidebar';
import { Dashboard } from './shared/components/dashboard/dashboard';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarBg: string;
  admissionNo: string;
  dob: string;
  gender: string;
  parentName: string;
  status: string;
  grade: string;
  section: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Button, Badge, Spinner, Tabs, Pagination, Input, Select, Checkbox, Radio, Range, Accordion, Carousel, Skeleton, Modal, Offcanvas, Popover, Toast, Table, FileUpload, Alert, Progress, Grid, Topbar, TitleCasePipe, Sidebar, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('sms-frontend');

  // ── Showcase page header nav ───────────────────────────────────────────────
  protected readonly showcaseNavItems = signal<NavItem[]>([
    { id: 'foundation', label: 'Foundation', icon: 'fa-solid fa-layer-group' },
    { id: 'components', label: 'Components', icon: 'fa-solid fa-cubes' },
    { id: 'guidelines', label: 'Guidelines', icon: 'fa-solid fa-book-open' },
  ]);
  protected readonly showcaseNavActive = signal('components');
  protected onShowcaseNavChange(id: string): void { this.showcaseNavActive.set(id); }

  // ── Showcase page sidebar nav ───────────────────────────────────────────────────
  protected readonly showcaseSidebarGroups = signal<SidebarNavGroup[]>([
    {
      label: 'Foundation',
      items: [
        { id: 'colors', label: 'Colors', icon: 'fa-solid fa-palette', href: '#colors' },
        { id: 'typography', label: 'Typography', icon: 'fa-solid fa-font', href: '#typography' },
      ],
    },
    {
      label: 'Dashboard',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-gauge', href: '#dashboard' },
      ],
    },
    {
      label: 'Components',
      items: [
        { id: 'buttons', label: 'Buttons', icon: 'fa-solid fa-square', href: '#buttons' },
        { id: 'badges', label: 'Badges & Labels', icon: 'fa-solid fa-tags', href: '#badges' },
        { id: 'spinners', label: 'Spinners', icon: 'fa-solid fa-arrows-spin', href: '#spinners' },
        { id: 'navs', label: 'Navs & Tabs', icon: 'fa-solid fa-compass', href: '#navs' },
        { id: 'pagination', label: 'Pagination', icon: 'fa-solid fa-list-ol', href: '#pagination' },
        { id: 'forms', label: 'Form Inputs', icon: 'fa-solid fa-square-poll-horizontal', href: '#forms' },
        { id: 'accordion', label: 'Accordion', icon: 'fa-solid fa-layer-group', href: '#accordion' },
        { id: 'carousel', label: 'Carousel', icon: 'fa-solid fa-film', href: '#carousel' },
        { id: 'skeleton', label: 'Skeleton', icon: 'fa-solid fa-ghost', href: '#skeleton' },
        { id: 'modal-offcanvas', label: 'Modal & Offcanvas', icon: 'fa-solid fa-window-restore', href: '#modal-offcanvas' },
        { id: 'table-directory', label: 'Table & Dataset', icon: 'fa-solid fa-table', href: '#table-directory' },
        { id: 'file-uploaders', label: 'File Uploaders', icon: 'fa-solid fa-file-arrow-up', href: '#file-uploaders' },
        { id: 'feedback-status', label: 'Feedback & Status', icon: 'fa-solid fa-circle-info', href: '#feedback-status' },
        { id: 'layout-containers', label: 'Layout & Containers', icon: 'fa-solid fa-grip', href: '#layout-containers' },
        { id: 'popover-toast', label: 'Popovers & Toasts', icon: 'fa-solid fa-message', href: '#popover-toast' },
        { id: 'topbar', label: 'Top Bar', icon: 'fa-solid fa-bars', href: '#topbar' },
        { id: 'sidebar', label: 'Sidebar', icon: 'fa-solid fa-sidebar', href: '#sidebar' },
      ],
    },
  ]);
  protected readonly showcaseSidebarActive = signal('buttons');
  protected onShowcaseSidebarClick(item: SidebarNavItem): void { this.showcaseSidebarActive.set(item.id); }

  protected readonly showcaseSidebarBottom = signal<SidebarBottomItem[]>([
    { id: 'github', label: 'GitHub v1.0.0', icon: 'fa-brands fa-github' },
  ]);

  // ── Demo sidebar (for the showcase section) ───────────────────────────────────
  protected readonly demoSidebarGroups = signal<SidebarNavGroup[]>([
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-gauge' },
        { id: 'classes', label: 'My Classes', icon: 'fa-solid fa-users-rectangle' },
        { id: 'attendance', label: 'Attendance', icon: 'fa-solid fa-circle-check' },
        { id: 'gradebook', label: 'Gradebook', icon: 'fa-solid fa-book-open', badge: 4 },
        { id: 'homework', label: 'Homework', icon: 'fa-solid fa-clipboard-list' },
      ],
    },
  ]);
  protected readonly demoSidebarActive = signal('dashboard');
  protected readonly demoSidebarBottom = signal<SidebarBottomItem[]>([
    { id: 'settings', label: 'Settings', icon: 'fa-solid fa-gear' },
    { id: 'signout', label: 'Sign Out', icon: 'fa-solid fa-arrow-right-from-bracket' },
  ]);
  protected onDemoSidebarClick(item: SidebarNavItem): void { this.demoSidebarActive.set(item.id); }

  protected onDemoSidebarBottomClick(item: SidebarBottomItem): void {
    this.triggerToast(`Clicked ${item.label} bottom menu item!`, 'info');
  }

  protected onShowcaseSidebarBottomClick(item: SidebarBottomItem): void {
    if (item.id === 'github') {
      window.open('https://github.com', '_blank');
    }
  }

  protected onDashboardActionClick(action: string): void {
    const actMap: Record<string, string> = {
      enroll: 'Register New Student',
      attendance: 'Log Daily Attendance',
      post: 'Broadcast New Announcement',
      report: 'Compile Term Report'
    };
    this.triggerToast(`Quick action triggered: ${actMap[action] || action}`, 'success');
  }

  // ── Button playground ──────────────────────────────────────────────────────
  protected readonly isLoading = signal(false);
  protected readonly isDisabled = signal(false);

  protected onButtonClick(buttonName: string): void { console.log(`${buttonName} clicked!`); }
  protected toggleLoading(): void { this.isLoading.update(v => !v); }
  protected toggleDisabled(): void { this.isDisabled.update(v => !v); }

  // ── Tabs ───────────────────────────────────────────────────────────────────
  protected readonly activeTabId = signal('records');
  protected readonly tabsData = signal<TabItem[]>([
    { id: 'records', label: 'Student Records' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'discipline', label: 'Discipline' },
    { id: 'legacy', label: 'Legacy Data', disabled: true },
  ]);
  protected onTabChange(tabId: string): void { this.activeTabId.set(tabId); }

  // ── Pagination ─────────────────────────────────────────────────────────────
  protected readonly currentPage = signal(1);
  protected readonly totalPages = signal(12);
  protected onPageChange(page: number): void { this.currentPage.set(page); }

  // ── Form Inputs ────────────────────────────────────────────────────────────
  protected readonly searchValue = signal('');
  protected readonly enrollmentStatus = signal('enrolled');
  protected readonly enrollmentOptions = signal<SelectOption[]>([
    { value: 'enrolled', label: 'Currently Enrolled' },
    { value: 'graduated', label: 'Graduated' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'withdrawn', label: 'Withdrawn' },
  ]);
  protected readonly labFees = signal('');
  protected readonly optInEmail = signal(true);
  protected readonly selectedTerm = signal('termA');
  protected readonly gradeCurve = signal(15);
  protected readonly errorValue = signal('invalid-entry@');
  protected readonly successValue = signal('Valid Entry');

  // ── Accordion ─────────────────────────────────────────────────────────────
  protected readonly accordionItems = signal<AccordionItem[]>([
    { id: 'integrity', title: 'Academic Integrity Policy', content: 'Oakhaven Academy maintains strict standards regarding plagiarism and academic honesty. Students found in violation of these policies may face disciplinary action including suspension or expulsion.' },
    { id: 'attendance', title: 'Attendance Requirements', content: 'Students are required to attend at least 85% of scheduled classes per term. Absences beyond this threshold must be supported by a medical certificate or formal parental notification.' },
    { id: 'fees', title: 'Fee Payment Schedule', content: 'All tuition and lab fees must be settled by the 10th of each month. Late payments attract a 2% monthly surcharge. Contact the Finance Office for installment plan arrangements.' },
  ]);

  // ── Carousel ──────────────────────────────────────────────────────────────
  protected readonly carouselSlides = signal<CarouselSlide[]>([
    { id: 'slide1', title: 'Annual Science Fair 2024', subtitle: 'Join us this Friday in the Main Hall for student exhibitions.' },
    { id: 'slide2', title: 'Inter-School Sports Day', subtitle: 'Registration open for track, field, and team events.' },
    { id: 'slide3', title: 'Parent-Teacher Conference', subtitle: 'Schedule your slot via the portal — limited availability.' },
  ]);

  // ── Modal ──────────────────────────────────────────────────────────────────
  protected readonly showModal = signal(false);
  protected readonly modalSchool = signal('');
  protected readonly modalSchoolOptions = signal<SelectOption[]>([
    { value: 'main', label: 'Main Campus' },
    { value: 'north', label: 'North Branch' },
    { value: 'south', label: 'South Branch' },
  ]);
  protected readonly modalParentId = signal('');
  protected readonly modalAdmission = signal('');
  protected readonly modalFirstName = signal('');
  protected readonly modalLastName = signal('');
  protected readonly modalDob = signal('');
  protected readonly modalGender = signal('Male');

  // ── Offcanvas & Table & Dataset Filters ─────────────────────────────────
  protected readonly showOffcanvas = signal(false);
  protected readonly ocStudentSearch = signal('');
  protected readonly ocSchool = signal('oakhaven');
  protected readonly ocSchoolOptions = signal<SelectOption[]>([
    { value: 'all', label: 'All Campuses' },
    { value: 'oakhaven', label: 'Oakhaven Senior Academy' },
    { value: 'central', label: 'Central High School' },
  ]);
  protected readonly ocYear = signal('2023-2024');
  protected readonly ocYearOptions = signal<SelectOption[]>([
    { value: 'all', label: 'All Years' },
    { value: '2023-2024', label: '2023-2024' },
    { value: '2022-2023', label: '2022-2023' },
  ]);
  protected readonly ocGrade = signal('grade10');
  protected readonly ocGradeOptions = signal<SelectOption[]>([
    { value: 'all', label: 'All Grades' },
    { value: 'grade10', label: 'Grade 10' },
    { value: 'grade11', label: 'Grade 11' },
    { value: 'grade12', label: 'Grade 12' },
  ]);
  protected readonly ocSection = signal('sectionB');
  protected readonly ocSectionOptions = signal<SelectOption[]>([
    { value: 'all', label: 'All Sections' },
    { value: 'sectionA', label: 'Section A' },
    { value: 'sectionB', label: 'Section B' },
    { value: 'sectionC', label: 'Section C' },
  ]);
  protected readonly ocGender = signal('all');
  protected readonly ocEnrollStatus = signal('all');
  protected readonly ocEnrollOptions = signal<SelectOption[]>([
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'on leave', label: 'On Leave' },
  ]);
  protected readonly ocDateFrom = signal('');
  protected readonly ocDateTo = signal('');

  // ── Toasts ────────────────────────────────────────────────────────────────
  protected readonly toasts = signal<ToastItem[]>([]);

  protected triggerToast(message: string, type: ToastType): void {
    const id = Math.random().toString(36).substring(2, 9);
    this.toasts.update(current => [...current, { id, message, type }]);
  }

  protected removeToast(id: string): void {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }

  // ── Data Table & Directory ────────────────────────────────────────────────
  protected readonly tableColumns = signal<TableColumn[]>([
    { key: 'admissionNo', label: 'Admission No', sortable: true, width: '160px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'dob', label: 'DOB', sortable: true, width: '130px' },
    { key: 'gender', label: 'Gender', sortable: true, width: '130px', align: 'center' },
    { key: 'parentName', label: 'Parent / Guardian', sortable: true },
    { key: 'status', label: 'Status', sortable: true, width: '130px', align: 'center' },
    { key: 'actions', label: 'Actions', sortable: false, width: '90px', align: 'center' },
  ]);

  protected readonly students = signal<StudentRecord[]>([
    { id: '1', name: 'Elena Williams', email: 'elena.williams@oakhaven.edu', initials: 'EW', avatarBg: '#a7f3d0', admissionNo: '#ADM-2023-001', dob: '12 May 2012', gender: 'Female', parentName: 'David Williams', status: 'Active', grade: 'grade10', section: 'sectionB' },
    { id: '2', name: 'Marcus Knight', email: 'marcus.knight@oakhaven.edu', initials: 'MK', avatarBg: '#e2e8f0', admissionNo: '#ADM-2023-042', dob: '28 Aug 2011', gender: 'Male', parentName: 'Sarah Knight', status: 'Active', grade: 'grade10', section: 'sectionB' },
    { id: '3', name: 'Sophia Jensen', email: 'sophia.jensen@oakhaven.edu', initials: 'SJ', avatarBg: '#c7d2fe', admissionNo: '#ADM-2022-119', dob: '04 Jan 2013', gender: 'Female', parentName: 'Michael Jensen', status: 'Pending', grade: 'grade11', section: 'sectionA' },
    { id: '4', name: 'Ryan Lee', email: 'ryan.lee@oakhaven.edu', initials: 'RL', avatarBg: '#a7f3d0', admissionNo: '#ADM-2023-088', dob: '15 Nov 2012', gender: 'Male', parentName: 'Karen Lee', status: 'On Leave', grade: 'grade10', section: 'sectionB' },
    { id: '5', name: 'Aisha Mahmood', email: 'aisha.mahmood@oakhaven.edu', initials: 'AM', avatarBg: '#e2e8f0', admissionNo: '#ADM-2023-205', dob: '22 Mar 2012', gender: 'Female', parentName: 'Zaid Mahmood', status: 'Active', grade: 'grade12', section: 'sectionC' },
  ]);

  protected readonly studentSearchQuery = signal('');

  protected readonly filteredStudents = computed(() => {
    let list = this.students();
    const query = this.studentSearchQuery().toLowerCase().trim() || this.ocStudentSearch().toLowerCase().trim();
    const status = this.ocEnrollStatus();
    const grade = this.ocGrade();
    const section = this.ocSection();
    const gender = this.ocGender();

    if (query) {
      list = list.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.admissionNo.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query)
      );
    }

    if (status !== 'all') {
      list = list.filter(s => s.status.toLowerCase() === status.toLowerCase());
    }

    if (grade !== 'all') {
      list = list.filter(s => s.grade === grade);
    }

    if (section !== 'all') {
      list = list.filter(s => s.section === section);
    }

    if (gender !== 'all') {
      list = list.filter(s => s.gender.toLowerCase() === gender.toLowerCase());
    }

    return list;
  });

  // Dynamic filter tags helpers
  protected getGradeLabel(): string {
    const g = this.ocGrade();
    if (g === 'grade10') return 'Grade 10';
    if (g === 'grade11') return 'Grade 11';
    if (g === 'grade12') return 'Grade 12';
    return '';
  }

  protected getSectionLabel(): string {
    const s = this.ocSection();
    if (s === 'sectionA') return 'Section A';
    if (s === 'sectionB') return 'Section B';
    if (s === 'sectionC') return 'Section C';
    return '';
  }

  protected clearGradeFilter(): void {
    this.ocGrade.set('all');
  }

  protected clearSectionFilter(): void {
    this.ocSection.set('all');
  }

  // ── Topbar showcase ────────────────────────────────────────────────────────
  protected readonly topbarNavItems = signal<NavItem[]>([
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-gauge' },
    { id: 'academics', label: 'Academics', icon: 'fa-solid fa-book-open' },
    { id: 'staff', label: 'Staff', icon: 'fa-solid fa-chalkboard-user' },
    { id: 'students', label: 'Students', icon: 'fa-solid fa-user-graduate', badge: 3 },
  ]);
  protected readonly topbarActiveNav = signal('dashboard');
  protected onTopbarNavChange(id: string): void { this.topbarActiveNav.set(id); }
}
