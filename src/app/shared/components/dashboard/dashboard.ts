import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DashboardActivity {
  id: string;
  type: 'info' | 'warning' | 'success' | 'danger';
  title: string;
  time: string;
  description: string;
}

export interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  colorVar: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  readonly actionClick = output<string>();

  protected readonly metrics = signal<DashboardMetric[]>([
    {
      title: 'Total Students',
      value: '1,248',
      change: '+4.2% from last month',
      isPositive: true,
      icon: 'fa-solid fa-user-graduate',
      colorVar: '--success-500'
    },
    {
      title: 'Average Attendance',
      value: '94.8%',
      change: '+1.5% from last week',
      isPositive: true,
      icon: 'fa-solid fa-calendar-check',
      colorVar: '--primary-500'
    },
    {
      title: 'Pending Invoices',
      value: '12',
      change: '-2 from yesterday',
      isPositive: true, // Decreasing pending invoices is positive!
      icon: 'fa-solid fa-file-invoice-dollar',
      colorVar: '--warning-500'
    },
    {
      title: 'Active Alerts',
      value: '3',
      change: '+1 new alert today',
      isPositive: false, // Increasing alerts is negative!
      icon: 'fa-solid fa-triangle-exclamation',
      colorVar: '--danger-500'
    }
  ]);

  protected readonly recentActivities = signal<DashboardActivity[]>([
    {
      id: '1',
      type: 'success',
      title: 'Tuition Settled',
      time: '10 mins ago',
      description: 'Parent of Sarah Jenkins settled Term 2 registration fees.'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Health Clearance Form Pending',
      time: '1 hour ago',
      description: '35 students have pending health clearance forms for field trip.'
    },
    {
      id: '3',
      type: 'info',
      title: 'Class Announcement Posted',
      time: '3 hours ago',
      description: 'Mrs. Davis posted a new reminder for Grade 10 Science project.'
    },
    {
      id: '4',
      type: 'danger',
      title: 'Critical System Update',
      time: '5 hours ago',
      description: 'Database migration completed. Backup successfully verified.'
    }
  ]);

  protected readonly selectedMetricIndex = signal<number | null>(null);

  protected onActionClick(action: string): void {
    this.actionClick.emit(action);
  }

  protected selectMetric(index: number): void {
    this.selectedMetricIndex.set(this.selectedMetricIndex() === index ? null : index);
  }
}
