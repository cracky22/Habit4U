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

    checkin() {
        console.log("Check-in action triggered");
        hapticFeedback.vibrate(15);
        setTimeout(() => {
            console.log("Check-in completed");
            // section
            document.getElementById("ma-add").classList.remove("is-active");
            document.getElementById("ma-home").classList.add("is-active");
            // tab
            document.getElementById("ma-add-tab").classList.remove("is-active");
            document.getElementById("ma-home-tab").classList.add("is-active");
        }, 1000);
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