let sfs = null;
let logDiv = null;

function init() {
    logDiv = document.querySelector("#log");
// Create configuration object
    const config = {};
    config.host = "127.0.0.1";
    config.port = 8080;
    config.zone = "MyZone";

    // Create SmartFox client instance
    sfs = new SFS2X.SmartFox(config);

    sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
    sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);
    sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
    sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, onRoomJoin, this);
    sfs.addEventListener(SFS2X.SFSEvent.USER_ENTER_ROOM, onUserEnterRoom, this);
    sfs.addEventListener(SFS2X.SFSEvent.USER_EXIT_ROOM, onUserExitRoom, this);

    sfs.connect();
    setTimeout(onLoginBtClick, 2000);
}

function onConnection(event) {
    if (!event.success) {
        alert("Ple ase check config values.\n Connection Failed")
    }
}

function onLoginError(event) {
    console.log("Login failure: " + event.errorMessage);
}

function onLoginBtClick() {
    // Perform login
    let uName = Math.random().toString(36).substr(2, 5);
    let isSent = sfs.send(new SFS2X.LoginRequest(uName));

    if (isSent) {
        logDiv.innerText += "Logged In \n";

    }
}

function onLogin(event) {
    let rooms = sfs.roomManager.getRoomList();
    logDiv.innerText += "Available Rooms \n";
    for (let room of rooms) {
        logDiv.innerText += (room.name + "\n");
    }
    sfs.send(new SFS2X.JoinRoomRequest(rooms[0]));
}

function onRoomJoin(event) {
    let users = sfs.lastJoinedRoom.getUserList();
    logDiv.innerText += "Available user in current room \n";

    for (let user of users) {
        logDiv.innerText += (user.name + "\n");
    }
}

function onUserEnterRoom(event) {
    logDiv.innerText += "New user " + event.user.name + " joined room. \n"
}

function onUserExitRoom(event) {
    logDiv.innerText += "user " + event.user.name + " left the room. \n"
}

