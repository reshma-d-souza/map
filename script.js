console.log("SCRIPT LOADED");

// === INITIAL POSITION ===
let xPos = window.innerWidth / 2;
let yPos = window.innerHeight / 2;

// === Get Elements ===
const dot = document.getElementById("blue-dot");
const permissionBtn = document.getElementById("permission-btn");

// ===============================
//   iPhone Permission Required
// ===============================
permissionBtn.addEventListener("click", () => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
        .then(response => {
            if (response === "granted") {
                startTracking();
                permissionBtn.style.display = "none";
            }
        })
        .catch(console.error);
    } else {
        // Android / PC doesn't need permission
        startTracking();
        permissionBtn.style.display = "none";
    }
});

// ===============================
//       START MOTION TRACK
// ===============================
function startTracking() {
    console.log("Tracking Started");

    window.addEventListener("deviceorientation", (event) => {
        if (!event.beta || !event.gamma) return;

        // event.gamma = left/right tilt → X axis
        // event.beta = forward/back tilt → Y axis

        xPos += event.gamma * 0.8; 
        yPos += event.beta * 0.5;

        // Limit movement inside screen
        xPos = Math.max(0, Math.min(window.innerWidth - 25, xPos));
        yPos = Math.max(0, Math.min(window.innerHeight - 25, yPos));

        // Apply to dot
        dot.style.left = xPos + "px";
        dot.style.top = yPos + "px";
    });
}
