export default class UserInfo {
    constructor({userName, userJob}) {
        this._userName = document.querySelector(userName);
        this._userJob = document.querySelector(userJob);
    }

    getUserInfo() {
        this.data = {};
        this.data['user-name'] = this._userName.textContent;
        this.data['user-job'] = this._userJob.textContent;
        return this.data;
    }

    setUserInfo(data) {
        this._userName.textContent = data['user-name'];
        this._userJob.textContent = data['user-job'];
    }
}