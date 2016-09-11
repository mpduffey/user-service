"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var modal_service_1 = require('modules/modal/modal-service');
var UserService = (function () {
    function UserService(http, modal) {
        var _this = this;
        this.http = http;
        this.modal = modal;
        this.loggedIn = false;
        this.loginFields = [
            { name: "username", type: "STRING", defaultValue: "", custom: { label: "Username", labelAbove: false, controlType: "input", css: { input: { width: "200px" }, group: { display: "block", "margin-right": "1px", "margin-bottom": "5px" } } } },
            { name: "password", type: "STRING", defaultValue: "", custom: { label: "Password", labelAbove: false, css: { input: { width: "200px" }, group: { display: "block", "margin-right": "1px", "margin-bottom": "5px" } } } },
        ];
        this.loginForm = {
            submit: function (x) { console.log(x); },
            submitLabel: "Login",
            controls: [
                {
                    type: "fieldset",
                    name: "Login Group",
                    fields: [
                        { classField: this.loginFields[0] },
                        { classField: this.loginFields[1] }
                    ]
                }
            ]
        };
        this.loginObject = {
            fieldObject: this.loginFields,
            formObject: this.loginForm
        };
        this.launchLogin = function () {
            _this.modal.formObject = _this.loginObject;
            _this.modal.title = "Login";
            _this.modal.showModal = true;
        };
        this.loggedIn = !!localStorage.getItem('auth_token');
    }
    UserService.prototype.login = function (credentials) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/login', credentials, { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            if (res.success) {
                localStorage.setItem('auth_token', res.auth_token);
                _this.loggedIn = true;
            }
            return res.success;
        });
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
    };
    UserService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, (typeof (_a = typeof modal_service_1.ModalService !== 'undefined' && modal_service_1.ModalService) === 'function' && _a) || Object])
    ], UserService);
    return UserService;
    var _a;
}());
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map