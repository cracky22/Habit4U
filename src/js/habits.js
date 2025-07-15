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

    addHabit(name, description, color = "#2e3a87", type = "daily", targetCount = 1, unit = "") {
        const habit = {
            id: Date.now().toString(),
            name: name,
            description: description,
            color: color,
            type: type, // daily, multiple, weekly, quality
            targetCount: targetCount,
            unit: unit,
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

    checkinHabit(habitId, value = 1, quality = null, note = "") {
        const today = new Date().toISOString().split('T')[0];
        if (!this.checkins[today]) {
            this.checkins[today] = {};
        }
        
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) return;

        if (!this.checkins[today][habitId]) {
            this.checkins[today][habitId] = {
                entries: [],
                totalValue: 0,
                completed: false
            };
        }

        const entry = {
            timestamp: new Date().toISOString(),
            value: value,
            quality: quality,
            note: note
        };

        this.checkins[today][habitId].entries.push(entry);
        this.checkins[today][habitId].totalValue += value;
        
        // Check if target is reached
        if (habit.type === 'quality') {
            this.checkins[today][habitId].completed = true;
        } else {
            this.checkins[today][habitId].completed = 
                this.checkins[today][habitId].totalValue >= habit.targetCount;
        }

        this.saveCheckins();
    }

    getTodayCheckin(habitId) {
        const today = new Date().toISOString().split('T')[0];
        return this.checkins[today] && this.checkins[today][habitId] 
            ? this.checkins[today][habitId] 
            : null;
    }

    isCompletedToday(habitId) {
        const checkin = this.getTodayCheckin(habitId);
        return checkin ? checkin.completed : false;
    }

    getTodayProgress() {
        const today = new Date().toISOString().split('T')[0];
        const activeHabits = this.getHabits();
        const todayCheckins = this.checkins[today] || {};
        
        const completed = activeHabits.filter(habit => {
            const checkin = todayCheckins[habit.id];
            return checkin && checkin.completed;
        }).length;
        
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
            const completed = activeHabits.filter(habit => {
                const checkin = dayCheckins[habit.id];
                return checkin && checkin.completed;
            }).length;
            
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
            
            const checkin = this.checkins[dateString] && this.checkins[dateString][habitId];
            if (checkin && checkin.completed) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    getDiaryEntries(days = 7) {
        const entries = [];
        const today = new Date();
        
        for (let i = 0; i < days; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            
            const dayCheckins = this.checkins[dateString] || {};
            const dayEntries = [];
            
            Object.keys(dayCheckins).forEach(habitId => {
                const habit = this.habits.find(h => h.id === habitId);
                if (habit && dayCheckins[habitId].entries) {
                    dayCheckins[habitId].entries.forEach(entry => {
                        if (entry.note && entry.note.trim()) {
                            dayEntries.push({
                                habit: habit,
                                entry: entry,
                                time: new Date(entry.timestamp).toLocaleTimeString('de-DE', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                })
                            });
                        }
                    });
                }
            });
            
            if (dayEntries.length > 0) {
                entries.push({
                    date: dateString,
                    dateFormatted: date.toLocaleDateString('de-DE', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                    }),
                    entries: dayEntries.sort((a, b) => new Date(b.entry.timestamp) - new Date(a.entry.timestamp))
                });
            }
        }
        
        return entries;
    }
}

const habitManager = new HabitManager();