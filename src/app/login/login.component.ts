import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {GlobalHttpService} from "../service/global-http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private titleService: Title, private httpService: GlobalHttpService) {
    this.titleService.setTitle("登录低代码平台")
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  /**
   * 初始化form表单
   */
  initLoginForm() {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  /**
   * 提交表单
   */
  submitForm() {
    const url = "/login"
    const param = this.loginForm.getRawValue();
    this.httpService.postData(url, null, param).then(data => {
      console.log(data);
    })

  }


}
