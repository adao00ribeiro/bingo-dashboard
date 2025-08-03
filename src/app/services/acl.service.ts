import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AclService {
  private roles: string[] = []; // Pode vir do login

  setUserRoles(roles: string[]) {
    this.roles = roles;
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  can(permission: string): boolean {
    // Exemplo: ['admin.access_users', 'admin.view_dashboard']
    return this.roles.includes(permission);
  }
}
