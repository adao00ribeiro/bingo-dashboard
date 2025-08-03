import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AclService } from '../services/acl.service';


@Directive({
  selector: '[aclIf]',
  standalone: true, // <-- Importante!
})
export class AclIfDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private acl: AclService
  ) {}

  @Input() set aclIf(role: string) {
    if (this.acl.hasRole(role)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
