class HabitManager {
    constructor() {
        this.habits = this.loadHabits();
        this.checkins = this.loadCheckins();
    }

    loadHabits() {
        const habits = storage.appData("get", "habits");
        return habits ? JSON.parse(habits) : [];
    }

    saveHabits() {
        storage.appData("set", "habits", JSON.stringify(this.habits));
    }

    loadCheckins() {
        const checkins = storage.appData("get", "checkins");
        return checkins ? JSON.parse(checkins) : {};
    }

    saveCheckins() {
        storage.appData("set", "checkins", JSON.stringify(this.checkins));
    }

    addHabit(name, description, color = "#2e3a87") {
        const habit = {
            id: Date.now().toString(),
            name: name,
            description: description,
            color: color,
            createdAt: new Date().toISOString(),
            isActive: true
        };
        this.habits.push(habit);
        this.saveHabits();
        return habit;
    }

    deleteHabit(habitId) {
        this.habits = this.habits.filter(habit => habit.id !== habitId);
        // Auch alle Checkins für diese Gewohnheit löschen
        Object.keys(this.checkins).forEach(date => {
            if (this.checkins[date][habitId]) {
                delete this.checkins[date][habitId];
            }
        });
        this.saveHabits();
        this.saveCheckins();
    }

    getHabits() {
        return this.habits.filter(habit => habit.isActive);
    }

    checkinHabit(habitId) {
        const today = new Date().toISOString().split('T')[0];
        if (!this.checkins[today]) {
            this.checkins[today] = {};
        }
        this.checkins[today][habitId] = {
            timestamp: new Date().toISOString(),
            completed: true
        };
        this.saveCheckins();
    }

    isCheckedToday(habitId) {
        const today = new Date().toISOString().split('T')[0];
        return this.checkins[today] && this.checkins[today][habitId];
    }

    getTodayProgress() {
        const today = new Date().toISOString().split('T')[0];
        const activeHabits = this.getHabits();
        const todayCheckins = this.checkins[today] || {};
        
        const completed = activeHabits.filter(habit => todayCheckins[habit.id]).length;
        const total = activeHabits.length;
        
        return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
    }

    getWeeklyStats() {
        const stats = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            
            const dayCheckins = this.checkins[dateString] || {};
            const activeHabits = this.getHabits();
            const completed = activeHabits.filter(habit => dayCheckins[habit.id]).length;
            
            stats.push({
                date: dateString,
                dayName: date.toLocaleDateString('de-DE', { weekday: 'short' }),
                completed: completed,
                total: activeHabits.length,
                percentage: activeHabits.length > 0 ? Math.round((completed / activeHabits.length) * 100) : 0
            });
        }
        
        return stats;
    }

    getHabitStreak(habitId) {
        let streak = 0;
        const today = new Date();
        
        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            
            if (this.checkins[dateString] && this.checkins[dateString][habitId]) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }
}

const habitManager = new HabitManager();