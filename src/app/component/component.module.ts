import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {NzResultModule} from "ng-zorro-antd/result";
/**
 * 公共组件声明的module
 */
@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    NzResultModule
  ]
})
export class ComponentModule { }
