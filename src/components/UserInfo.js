export default class UserInfo {
    constructor({name, about, userAvatar}) {
        this._userName = document.querySelector(name);
        this._userJob = document.querySelector(about);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        this._userData = {
            userName: this._userName.textContent,
            userInfo: this._userJob.textContent,
        }
        return this._userData;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.about;
    }

    setUserAvatar(url) {
        console.log(url, 'suda');
        this._userAvatar.src = url.avatar;
        
    }
}