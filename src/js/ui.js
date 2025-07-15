class UIManager {
    constructor() {
        this.currentEditingHabit = null;
    }

    renderCustomTab() {
        const habits = habitManager.getHabits();
        const customContent = document.querySelector('#ma-custom .page-content');
        
        customContent.innerHTML = `
            <div style="max-width: 400px; margin: 0 auto;">
                <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 100%; height: auto; margin-bottom: 20px;">
                    <div class="mdl-card__title">
                        <h4>Neue Gewohnheit hinzufügen</h4>
                    </div>
                    <div class="mdl-card__supporting-text">
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%; margin-bottom: 10px;">
                            <input class="mdl-textfield__input" type="text" id="habit-name" style="color: white;">
                            <label class="mdl-textfield__label" for="habit-name" style="color: rgba(255,255,255,0.7);">Name der Gewohnheit</label>
                        </div>
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%; margin-bottom: 15px;">
                            <textarea class="mdl-textfield__input" type="text" rows="3" id="habit-description" style="color: white;"></textarea>
                            <label class="mdl-textfield__label" for="habit-description" style="color: rgba(255,255,255,0.7);">Beschreibung (optional)</label>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label style="color: rgba(255,255,255,0.7); font-size: 12px;">Farbe wählen:</label>
                            <div style="display: flex; gap: 10px; margin-top: 5px;">
                                <div class="color-option" data-color="#2e3a87" style="width: 30px; height: 30px; background: #2e3a87; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                                <div class="color-option" data-color="#4caf50" style="width: 30px; height: 30px; background: #4caf50; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                                <div class="color-option" data-color="#ff9800" style="width: 30px; height: 30px; background: #ff9800; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                                <div class="color-option" data-color="#e91e63" style="width: 30px; height: 30px; background: #e91e63; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                                <div class="color-option" data-color="#9c27b0" style="width: 30px; height: 30px; background: #9c27b0; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <button onclick="uiManager.addNewHabit();" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                            Gewohnheit hinzufügen
                        </button>
                    </div>
                </div>

                <div id="habits-list">
                    ${habits.map(habit => `
                        <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 100%; height: auto; margin-bottom: 15px; background: ${habit.color};">
                            <div class="mdl-card__title">
                                <h4>${habit.name}</h4>
                            </div>
                            ${habit.description ? `<div class="mdl-card__supporting-text" style="color: rgba(255,255,255,0.8);">${habit.description}</div>` : ''}
                            <div class="mdl-card__actions mdl-card--border">
                                <span style="color: rgba(255,255,255,0.7); font-size: 12px;">Serie: ${habitManager.getHabitStreak(habit.id)} Tage</span>
                                <div class="mdl-layout-spacer"></div>
                                <button onclick="uiManager.deleteHabit('${habit.id}');" class="mdl-button mdl-js-button mdl-js-ripple-effect" style="color: #ff6b6b;">
                                    Löschen
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Color selection functionality
        setTimeout(() => {
            const colorOptions = document.querySelectorAll('.color-option');
            let selectedColor = '#2e3a87';
            
            colorOptions.forEach(option => {
                option.addEventListener('click', () => {
                    colorOptions.forEach(opt => opt.style.border = '2px solid transparent');
                    option.style.border = '2px solid white';
                    selectedColor = option.dataset.color;
                });
            });
            
            // Select first color by default
            colorOptions[0].style.border = '2px solid white';
            
            // Store selected color for later use
            this.selectedColor = selectedColor;
            
            // Update selected color when clicked
            colorOptions.forEach(option => {
                option.addEventListener('click', () => {
                    this.selectedColor = option.dataset.color;
                });
            });
        }, 100);
    }

    renderAddTab() {
        const habits = habitManager.getHabits();
        const addContent = document.querySelector('#ma-add .page-content');
        
        if (habits.length === 0) {
            addContent.innerHTML = `
                <div class="demo-card-event mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title mdl-card--expand">
                        <h4>Keine Gewohnheiten vorhanden</h4>
                    </div>
                    <div class="mdl-card__supporting-text" style="color: rgba(255,255,255,0.8);">
                        Erstelle zuerst Gewohnheiten im "Custom" Tab.
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <button onclick="change_section('ma-add', 'ma-custom');" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                            Gewohnheiten erstellen
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        addContent.innerHTML = `
            <div style="max-width: 400px; margin: 0 auto;">
                ${habits.map(habit => {
                    const isChecked = habitManager.isCheckedToday(habit.id);
                    return `
                        <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 100%; height: auto; margin-bottom: 15px; background: ${habit.color}; ${isChecked ? 'opacity: 0.7;' : ''}">
                            <div class="mdl-card__title">
                                <h4>${habit.name} ${isChecked ? '✓' : ''}</h4>
                            </div>
                            ${habit.description ? `<div class="mdl-card__supporting-text" style="color: rgba(255,255,255,0.8);">${habit.description}</div>` : ''}
                            <div class="mdl-card__actions mdl-card--border">
                                <span style="color: rgba(255,255,255,0.7); font-size: 12px;">Serie: ${habitManager.getHabitStreak(habit.id)} Tage</span>
                                <div class="mdl-layout-spacer"></div>
                                <button onclick="uiManager.checkinHabit('${habit.id}');" 
                                        class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                                        ${isChecked ? 'disabled style="opacity: 0.5;"' : ''}>
                                    ${isChecked ? 'Erledigt' : 'Check-in'}
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    renderHomeTab() {
        const progress = habitManager.getTodayProgress();
        const habits = habitManager.getHabits();
        const homeContent = document.querySelector('#ma-home .page-content');
        
        const today = new Date().toLocaleDateString('de-DE', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        homeContent.innerHTML = `
            <div style="max-width: 400px; margin: 0 auto;">
                <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 100%; height: auto; margin-bottom: 20px;">
                    <div class="mdl-card__title">
                        <h4>Heute - ${today}</h4>
                    </div>
                    <div class="mdl-card__supporting-text">
                        <div style="text-align: center; margin: 20px 0;">
                            <div style="font-size: 48px; font-weight: bold; color: ${progress.percentage === 100 ? '#4caf50' : '#ffffff'};">
                                ${progress.percentage}%
                            </div>
                            <div style="color: rgba(255,255,255,0.8); margin-top: 10px;">
                                ${progress.completed} von ${progress.total} Gewohnheiten erledigt
                            </div>
                        </div>
                        <div style="background: rgba(255,255,255,0.1); border-radius: 10px; height: 8px; margin: 15px 0;">
                            <div style="background: #4caf50; height: 100%; border-radius: 10px; width: ${progress.percentage}%; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <button onclick="change_section('ma-home', 'ma-add');" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                            Check-ins machen
                        </button>
                        <div class="mdl-layout-spacer"></div>
                        <button onclick="change_section('ma-home', 'ma-stats');" class="mdl-button mdl-js-button mdl-js-ripple-effect" style="color: white;">
                            Statistiken
                        </button>
                    </div>
                </div>

                <div style="margin-top: 20px;">
                    <h5 style="color: white; margin-bottom: 15px;">Heutige Gewohnheiten:</h5>
                    ${habits.length === 0 ? 
                        '<p style="color: rgba(255,255,255,0.7); text-align: center;">Keine Gewohnheiten vorhanden</p>' :
                        habits.map(habit => {
                            const isChecked = habitManager.isCheckedToday(habit.id);
                            return `
                                <div style="display: flex; align-items: center; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px; margin-bottom: 8px;">
                                    <div style="width: 20px; height: 20px; border-radius: 50%; background: ${habit.color}; margin-right: 15px;"></div>
                                    <span style="color: white; flex: 1;">${habit.name}</span>
                                    <span style="color: ${isChecked ? '#4caf50' : 'rgba(255,255,255,0.5)'}; font-size: 18px;">
                                        ${isChecked ? '✓' : '○'}
                                    </span>
                                </div>
                            `;
                        }).join('')
                    }
                </div>
            </div>
        `;
    }

    renderStatsTab() {
        const weeklyStats = habitManager.getWeeklyStats();
        const habits = habitManager.getHabits();
        const statsContent = document.querySelector('#ma-stats .page-content');
        
        const totalHabits = habits.length;
        const avgCompletion = weeklyStats.length > 0 ? 
            Math.round(weeklyStats.reduce((sum, day) => sum + day.percentage, 0) / weeklyStats.length) : 0;

        statsContent.innerHTML = `
            <div style="max-width: 400px; margin: 0 auto;">
                <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 100%; height: auto; margin-bottom: 20px;">
                    <div class="mdl-card__title">
                        <h4>Wochenübersicht</h4>
                    </div>
                    <div class="mdl-card__supporting-text">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                            <div style="text-align: center;">
                                <div style="font-size: 24px; font-weight: bold; color: #4caf50;">${totalHabits}</div>
                                <div style="color: rgba(255,255,255,0.8); font-size: 12px;">Gewohnheiten</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 24px; font-weight: bold; color: #2196f3;">${avgCompletion}%</div>
                                <div style="color: rgba(255,255,255,0.8); font-size: 12px;">Ø Erfüllung</div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 20px;">
                            <h6 style="color: white; margin-bottom: 15px;">Letzte 7 Tage:</h6>
                            ${weeklyStats.map(day => `
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <div style="width: 40px; color: rgba(255,255,255,0.8); font-size: 12px;">${day.dayName}</div>
                                    <div style="flex: 1; background: rgba(255,255,255,0.1); border-radius: 4px; height: 20px; margin: 0 10px; overflow: hidden;">
                                        <div style="background: ${day.percentage === 100 ? '#4caf50' : day.percentage > 50 ? '#ff9800' : '#f44336'}; height: 100%; width: ${day.percentage}%; transition: width 0.3s ease;"></div>
                                    </div>
                                    <div style="width: 50px; color: white; font-size: 12px; text-align: right;">${day.completed}/${day.total}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                ${habits.length > 0 ? `
                    <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 100%; height: auto;">
                        <div class="mdl-card__title">
                            <h4>Gewohnheiten-Serien</h4>
                        </div>
                        <div class="mdl-card__supporting-text">
                            ${habits.map(habit => `
                                <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    <div style="display: flex; align-items: center;">
                                        <div style="width: 16px; height: 16px; border-radius: 50%; background: ${habit.color}; margin-right: 12px;"></div>
                                        <span style="color: white;">${habit.name}</span>
                                    </div>
                                    <span style="color: #4caf50; font-weight: bold;">${habitManager.getHabitStreak(habit.id)} Tage</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    addNewHabit() {
        const nameInput = document.getElementById('habit-name');
        const descriptionInput = document.getElementById('habit-description');
        const name = nameInput.value.trim();
        const description = descriptionInput.value.trim();
        
        if (!name) {
            alert('Bitte gib einen Namen für die Gewohnheit ein.');
            return;
        }

        const color = this.selectedColor || '#2e3a87';
        habitManager.addHabit(name, description, color);
        
        // Clear inputs
        nameInput.value = '';
        descriptionInput.value = '';
        
        // Re-render the custom tab
        this.renderCustomTab();
        
        hapticFeedback.vibrate(15);
        console.log('Neue Gewohnheit hinzugefügt:', name);
    }

    deleteHabit(habitId) {
        if (confirm('Möchtest du diese Gewohnheit wirklich löschen? Alle Daten gehen verloren.')) {
            habitManager.deleteHabit(habitId);
            this.renderCustomTab();
            hapticFeedback.vibrate(15);
        }
    }

    checkinHabit(habitId) {
        if (habitManager.isCheckedToday(habitId)) {
            return; // Already checked in today
        }
        
        habitManager.checkinHabit(habitId);
        this.renderAddTab();
        this.renderHomeTab();
        hapticFeedback.vibrate(15);
        
        console.log('Check-in completed for habit:', habitId);
        
        // Auto-switch to home after a short delay
        setTimeout(() => {
            change_section("ma-add", "ma-home");
        }, 800);
    }
}

const uiManager = new UIManager();