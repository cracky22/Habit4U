class Habit4u {
    loadData(for_which_tab) {
        if (for_which_tab === "ma-home") {
            console.log("Loading Home Tab");
            hapticFeedback.vibrate(15);

        } else if (for_which_tab === "ma-add") {
            console.log("Loading Add Tab");
            hapticFeedback.vibrate(15);

        } else if (for_which_tab === "ma-stats") {
            console.log("Loading Stats Tab");
            hapticFeedback.vibrate(15);

        } else if (for_which_tab === "ma-custom") {
            console.log("Loading Custom Tab");
            hapticFeedback.vibrate(15);

        }
    }
}

const habit4u = new Habit4u();


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