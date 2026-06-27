import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar, SidebarNavGroup, SidebarBottomItem, SidebarNavItem } from '../../../shared/components/sidebar/sidebar';
import { Topbar, NavItem } from '../../../shared/components/topbar/topbar';
import { Badge } from '../../../shared/components/badge/badge';
import { Progress } from '../../../shared/components/progress/progress';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, Sidebar, Topbar, Badge, Progress, Button],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  // ── Topbar ───────────────────────────────────────────────────────────────
  readonly topNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'academics', label: 'Academics' },
    { id: 'staff',     label: 'Staff' },
    { id: 'students',  label: 'Students' },
  ];

  protected readonly activeNav = signal('dashboard');

  // ── Sidebar ──────────────────────────────────────────────────────────────
  readonly sidebarNavGroups: SidebarNavGroup[] = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard',  icon: 'fa-solid fa-gauge' },
        { id: 'academics', label: 'Academics',  icon: 'fa-solid fa-book-open' },
        { id: 'staff',     label: 'Staff',      icon: 'fa-solid fa-chalkboard-user' },
        { id: 'students',  label: 'Students',   icon: 'fa-solid fa-user-graduate' },
        { id: 'finances',  label: 'Finances',   icon: 'fa-solid fa-wallet' },
      ],
    },
  ];

  readonly sidebarBottomItems: SidebarBottomItem[] = [
    { id: 'settings', label: 'Settings', icon: 'fa-solid fa-gear' },
    { id: 'logout',   label: 'Logout',   icon: 'fa-solid fa-arrow-right-from-bracket' },
  ];

  protected readonly activeSidebarItem = signal('dashboard');

  // ── Stat cards ───────────────────────────────────────────────────────────
  readonly statCards = [
    {
      label: 'TOTAL STUDENTS',
      value: '850',
      trend: '+2% from last month',
      trendUp: true,
      icon: 'fa-solid fa-user-group',
      iconColor: 'blue',
    },
    {
      label: 'FACULTY ATTENDANCE',
      value: '98%',
      trend: '— Stable performance',
      trendUp: null,
      icon: 'fa-solid fa-shield-halved',
      iconColor: 'teal',
    },
    {
      label: 'STUDENT ATTENDANCE',
      value: '94%',
      trend: '↘ -1% Alert today',
      trendUp: false,
      icon: 'fa-solid fa-triangle-exclamation',
      iconColor: 'red',
    },
    {
      label: 'ACTIVE CLASSES',
      value: '42',
      trend: 'In session now',
      trendUp: null,
      icon: 'fa-solid fa-address-card',
      iconColor: 'blue',
    },
  ];

  // ── Faculty table ─────────────────────────────────────────────────────────
  readonly facultyRows = [
    { initials: 'DR', name: 'Dr. Elena Rodriguez', title: 'Head of Science',   dept: 'Physics / Biology',    status: 'PRESENT',  statusClass: 'present',  workload: 85 },
    { initials: 'MK', name: 'Marcus Kinsley',      title: 'Head of Arts',      dept: 'History / Philosophy', status: 'IN CLASS', statusClass: 'in-class', workload: 69 },
    { initials: 'SP', name: 'Sarah Patel',         title: 'Head of Commerce',  dept: 'Economics / Stats',    status: 'REMOTE',   statusClass: 'remote',   workload: 45 },
  ];

  // ── Chart bars (Academic Performance) ────────────────────────────────────
  readonly chartBars = [
    { dept: 'Science',  score: 78 },
    { dept: 'Arts',     score: 65 },
    { dept: 'Commerce', score: 82 },
  ];

  // ── Urgent actions ────────────────────────────────────────────────────────
  readonly urgentActions = [
    {
      icon: 'fa-solid fa-person-walking-arrow-right',
      type: 'absence',
      title: 'Unexplained Absence',
      desc: 'Julian V. (Grade 10) missed 3 consecutive morning sessions.',
      action: 'CONTACT PARENT',
    },
    {
      icon: 'fa-solid fa-file-lines',
      type: 'leave',
      title: 'Pending Leave Request',
      desc: 'Mr. Thompson (History) requested sick leave for Feb 14-16.',
      actionApprove: 'APPROVE',
      actionDeny: 'DENY',
    },
    {
      icon: 'fa-solid fa-calendar-days',
      type: 'event',
      title: "Founders' Day Gala",
      desc: 'Upcoming event in 48 hours. Finalize logistics with Vendor X.',
      action: 'VIEW SCHEDULE',
    },
  ];

  // ── Quick actions ─────────────────────────────────────────────────────────
  readonly quickActions = [
    { label: 'Register Student', icon: 'fa-solid fa-user-plus' },
    { label: 'Faculty Meeting',  icon: 'fa-solid fa-people-group' },
    { label: 'Monthly Report',   icon: 'fa-solid fa-file-circle-check' },
  ];

  protected onSidebarItemClick(item: SidebarNavItem): void {
    this.activeSidebarItem.set(item.id);
  }

  protected onNavChange(id: string): void {
    this.activeNav.set(id);
  }
}
