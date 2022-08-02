export default class UserInfo {
    constructor({userName, userJob, userAvatar}) {
        this._userName = document.querySelector(userName);
        this._userJob = document.querySelector(userJob);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        this.userData = {};
        this.userData['user-name'] = this._userName.textContent;
        this.userData['user-job'] = this._userJob.textContent;
        return this.userData;
    }

    setUserInfo(userData) {
        this._userName.textContent = userData['user-name'];
        this._userJob.textContent = userData['user-job'];
    }

    setUserAvatar(url) {
        this._userAvatar.src = url.userAvatar;
    }
}