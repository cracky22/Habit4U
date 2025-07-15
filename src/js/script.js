if (!storage.appConfig("get", "initialized") || storage.appData("get", "initialized") !== "true") {
    storage.appConfig("set", "initialized", "true");
    storage.appConfig("set", "version", "1.0.0");
    console.log("App initialized for the first time.");
} else {
    console.log("App already initialized.");
    storage.appConfig("set", "version", "1.0.0");
}

class Habit4u {
    loadData(for_which_tab) {
        if (for_which_tab === "ma-home") {
            console.log("Loading Home Tab");
            uiManager.renderHomeTab();
            hapticFeedback.vibrate(15);

        } else if (for_which_tab === "ma-add") {
            console.log("Loading Add Tab");
            uiManager.renderAddTab();
            hapticFeedback.vibrate(15);

        } else if (for_which_tab === "ma-stats") {
            console.log("Loading Stats Tab");
            uiManager.renderStatsTab();
            hapticFeedback.vibrate(15);

        } else if (for_which_tab === "ma-custom") {
            console.log("Loading Custom Tab");
            uiManager.renderCustomTab();
            hapticFeedback.vibrate(15);

        }
    }

}
const habit4u = new Habit4u();

function change_section(from, to) {
    // section
    document.getElementById(from).classList.remove("is-active");
    document.getElementById(to).classList.add("is-active");
    // tab
    const from_tab_id = from + "-tab";
    const to_tab_id = to + "-tab";
    document.getElementById(from_tab_id).classList.remove("is-active");
    document.getElementById(to_tab_id).classList.add("is-active");
    // autochange
    show_change(to_tab_id);
}

function show_change(element) {
    show_tabbar();
    // remove and add class to trigger animation
    setTimeout(() => {
        document.getElementById(element).classList.remove("autochange");
        document.getElementById(element).classList.add("autochange");
    }, 350);
    // remove class after 3 seconds
    setTimeout(() => {
        document.getElementById(element).classList.remove("autochange");
    }, 3000);
}

function show_tabbar() {
    document.querySelector(".mdl-layout__tab-bar-container").style.display = "block";
}
function hide_tabbar() {
    document.querySelector(".mdl-layout__tab-bar-container").style.display = "none";
}

// HapticFeedback class to handle vibration feedback
class HapticFeedback {
    vibrate(vibrate_ms) {
        if (navigator.vibrate) {
            navigator.vibrate(vibrate_ms);
        } else {
            console.warn("Vibration API is not supported on this device.");
        }
    }
}
const hapticFeedback = new HapticFeedback();