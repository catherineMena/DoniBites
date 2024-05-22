import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    if (this.isSidebarCollapsed) {
      sidebar?.classList.add('collapsed');
      content?.classList.add('expanded');
    } else {
      sidebar?.classList.remove('collapsed');
      content?.classList.remove('expanded');
    }
  }
}
