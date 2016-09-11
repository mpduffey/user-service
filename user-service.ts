import {Injectable}			from '@angular/core';
import {Http, Headers}	from '@angular/http';
import {ModalService}		from 'modules/modal/modal-service';

@Injectable()

export class UserService {
	private loggedIn = false;
	loginFields = [
		{name: "username", type: "STRING", defaultValue: "", custom: {label: "Username", labelAbove: false, controlType: "input", css: {input: {width: "200px"}, group: {display: "block", "margin-right": "1px", "margin-bottom": "5px"}}}},
		{name: "password", type: "STRING", defaultValue: "", custom: {label: "Password", labelAbove: false, css: {input: {width: "200px"}, group: {display: "block", "margin-right": "1px", "margin-bottom": "5px"}}}},
	];
  loginForm = {
    submit:     	function(x){console.log(x)},
		submitLabel:	"Login",
    controls:   	[
      {
        type: "fieldset",
        name: "Login Group",
        fields: [
          {classField: this.loginFields[0]},
          {classField: this.loginFields[1]}
        ]
      }
		]
	};
	loginObject = {
		fieldObject:		this.loginFields,
		formObject:			this.loginForm
	};

	constructor(private http: Http, private modal:ModalService) {
		this.loggedIn = !!localStorage.getItem('auth_token');
	}

	login(credentials) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post('/login', credentials, {headers})
			.map(res => res.json())
			.map((res) => {
				if (res.success) {
					localStorage.setItem('auth_token', res.auth_token);
					this.loggedIn = true;
				}

				return res.success;
			});
	}
	logout() {
		localStorage.removeItem('auth_token');
		this.loggedIn = false;
	}
	isLoggedIn() {
		return this.loggedIn;
	}
	launchLogin = () => {
		this.modal.formObject = this.loginObject;
		this.modal.title = "Login";
		this.modal.showModal = true;
	}
}