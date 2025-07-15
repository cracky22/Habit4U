class UIManager {
    constructor() {
        this.currentEditingHabit = null;
        this.selectedColor = '#2e3a87';
        this.selectedType = 'daily';
    }

    renderCustomTab() {
        const habits = habitManager.getHabits();
        const customContent = document.querySelector('#ma-custom .page-content');
        
        customContent.innerHTML = `
            <div style="max-width: 450px; margin: 0 auto; padding: 0 15px;">
                <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 90%; height: auto; margin: 0 auto 20px auto;">
                    <div class="mdl-card__title">
                        <h4>Neue Gewohnheit hinzufügen</h4>
                    </div>
                    <div class="mdl-card__supporting-text">
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%; margin-bottom: 10px;">
                            <input class="mdl-textfield__input" type="text" id="habit-name" style="color: white;">
                            <label class="mdl-textfield__label" for="habit-name" style="color: rgba(255,255,255,0.7);">Name der Gewohnheit</label>
                        </div>
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%; margin-bottom: 15px;">
                            <textarea class="mdl-textfield__input" type="text" rows="2" id="habit-description" style="color: white;"></textarea>
                            <label class="mdl-textfield__label" for="habit-description" style="color: rgba(255,255,255,0.7);">Beschreibung (optional)</label>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <label style="color: rgba(255,255,255,0.7); font-size: 12px;">Gewohnheitstyp:</label>
                            <div style="margin-top: 8px;">
                                <label class="habit-type-option" style="display: block; margin-bottom: 8px; cursor: pointer;">
                                    <input type="radio" name="habit-type" value="daily" checked style="margin-right: 8px;">
                                    <span style="color: white;">Täglich (einmal pro Tag)</span>
                                </label>
                                <label class="habit-type-option" style="display: block; margin-bottom: 8px; cursor: pointer;">
                                    <input type="radio" name="habit-type" value="multiple" style="margin-right: 8px;">
                                    <span style="color: white;">Mehrfach täglich (zählbar)</span>
                                </label>
                                <label class="habit-type-option" style="display: block; margin-bottom: 8px; cursor: pointer;">
                                    <input type="radio" name="habit-type" value="quality" style="margin-right: 8px;">
                                    <span style="color: white;">Qualitätsbewertung (1-5 Sterne)</span>
                                </label>
                            </div>
                        </div>

                        <div id="target-settings" style="margin-bottom: 15px;">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 60%; display: inline-block; margin-right: 10px;">
                                <input class="mdl-textfield__input" type="number" id="habit-target" value="1" min="1" style="color: white;">
                                <label class="mdl-textfield__label" for="habit-target" style="color: rgba(255,255,255,0.7);">Ziel pro Tag</label>
                            </div>
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 35%; display: inline-block;">
                                <input class="mdl-textfield__input" type="text" id="habit-unit" placeholder="mal" style="color: white;">
                                <label class="mdl-textfield__label" for="habit-unit" style="color: rgba(255,255,255,0.7);">Einheit</label>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <label style="color: rgba(255,255,255,0.7); font-size: 12px;">Farbe wählen:</label>
                            <div style="display: flex; gap: 10px; margin-top: 8px; flex-wrap: wrap;">
                                <div class="color-option" data-color="#2e3a87" style="width: 30px; height: 30px; background: #2e3a87; border-radius: 50%; cursor: pointer; border: 2px solid white;"></div>
                                <div class="color-option" data-color="#4caf50" style="width: 30px; height: 30px; background: #4caf50; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                                <div class="color-option" data-color="#ff9800" style="width: 30px; height: 30px; background: #ff9800; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                                <div class="color-option" data-color="#e91e63" style="width: 30px; height: 30px; background: #e91e63; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                                <div class="color-option" data-color="#9c27b0" style="width: 30px; height: 30px; background: #9c27b0; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                                <div class="color-option" data-color="#00bcd4" style="width: 30px; height: 30px; background: #00bcd4; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                                <div class="color-option" data-color="#795548" style="width: 30px; height: 30px; background: #795548; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                                <div class="color-option" data-color="#607d8b" style="width: 30px; height: 30px; background: #607d8b; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
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
                        <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 90%; height: auto; margin: 0 auto 15px auto; background: ${habit.color};">
                            <div class="mdl-card__title">
                                <h4>${habit.name}</h4>
                            </div>
                            <div class="mdl-card__supporting-text" style="color: rgba(255,255,255,0.8);">
                                ${habit.description ? `<p style="margin-bottom: 8px;">${habit.description}</p>` : ''}
                                <div style="font-size: 12px; opacity: 0.9;">
                                    <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 12px; margin-right: 8px;">
                                        ${this.getHabitTypeLabel(habit.type)}
                                    </span>
                                    ${habit.type !== 'quality' ? `
                                        <span>Ziel: ${habit.targetCount}${habit.unit ? ' ' + habit.unit : ''}/Tag</span>
                                    ` : ''}
                                </div>
                            </div>
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

        this.setupCustomTabEventListeners();
    }

    setupCustomTabEventListeners() {
        setTimeout(() => {
            // Color selection
            const colorOptions = document.querySelectorAll('.color-option');
            colorOptions.forEach(option => {
                option.addEventListener('click', () => {
                    colorOptions.forEach(opt => opt.style.border = '2px solid transparent');
                    option.style.border = '2px solid white';
                    this.selectedColor = option.dataset.color;
                });
            });

            // Habit type selection
            const typeOptions = document.querySelectorAll('input[name="habit-type"]');
            const targetSettings = document.getElementById('target-settings');
            
            typeOptions.forEach(option => {
                option.addEventListener('change', () => {
                    this.selectedType = option.value;
                    if (option.value === 'quality') {
                        targetSettings.style.display = 'none';
                    } else {
                        targetSettings.style.display = 'block';
                        if (option.value === 'daily') {
                            document.getElementById('habit-target').value = '1';
                            document.getElementById('habit-unit').value = '';
                        }
                    }
                });
            });
        }, 100);
    }

    renderAddTab() {
        const habits = habitManager.getHabits();
        const addContent = document.querySelector('#ma-add .page-content');
        
        if (habits.length === 0) {
            addContent.innerHTML = `
                <div style="max-width: 450px; margin: 0 auto; padding: 0 15px;">
                    <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 90%; margin: 0 auto;">
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
                </div>
            `;
            return;
        }

        addContent.innerHTML = `
            <div style="max-width: 450px; margin: 0 auto; padding: 0 15px;">
                ${habits.map(habit => {
                    const checkin = habitManager.getTodayCheckin(habit.id);
                    const isCompleted = habitManager.isCompletedToday(habit.id);
                    
                    return `
                        <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 90%; height: auto; margin: 0 auto 15px auto; background: ${habit.color}; ${isCompleted ? 'opacity: 0.8;' : ''}">
                            <div class="mdl-card__title">
                                <h4>${habit.name} ${isCompleted ? '✓' : ''}</h4>
                            </div>
                            <div class="mdl-card__supporting-text" style="color: rgba(255,255,255,0.8);">
                                ${habit.description ? `<p style="margin-bottom: 8px;">${habit.description}</p>` : ''}
                                <div style="font-size: 12px; margin-bottom: 10px;">
                                    ${this.getHabitStatusText(habit, checkin)}
                                </div>
                                ${this.renderCheckinInterface(habit, checkin, isCompleted)}
                            </div>
                            <div class="mdl-card__actions mdl-card--border">
                                <span style="color: rgba(255,255,255,0.7); font-size: 12px;">Serie: ${habitManager.getHabitStreak(habit.id)} Tage</span>
                                <div class="mdl-layout-spacer"></div>
                                ${!isCompleted ? `
                                    <button onclick="uiManager.submitCheckin('${habit.id}');" 
                                            class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                        ${habit.type === 'quality' ? 'Bewerten' : 'Check-in'}
                                    </button>
                                ` : `
                                    <span style="color: #4caf50; font-weight: bold;">Erledigt</span>
                                `}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    renderCheckinInterface(habit, checkin, isCompleted) {
        if (isCompleted) {
            return '<div style="color: #4caf50; font-weight: bold;">Heute bereits erledigt!</div>';
        }

        switch (habit.type) {
            case 'daily':
                return `
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%;">
                        <textarea class="mdl-textfield__input" rows="2" id="note-${habit.id}" style="color: white;"></textarea>
                        <label class="mdl-textfield__label" for="note-${habit.id}" style="color: rgba(255,255,255,0.7);">Notiz (optional)</label>
                    </div>
                `;
            
            case 'multiple':
                return `
                    <div style="margin-bottom: 10px;">
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 60%; display: inline-block; margin-right: 10px;">
                            <input class="mdl-textfield__input" type="number" id="count-${habit.id}" value="1" min="1" style="color: white;">
                            <label class="mdl-textfield__label" for="count-${habit.id}" style="color: rgba(255,255,255,0.7);">Anzahl</label>
                        </div>
                        <span style="color: rgba(255,255,255,0.8);">${habit.unit || 'mal'}</span>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%;">
                        <textarea class="mdl-textfield__input" rows="2" id="note-${habit.id}" style="color: white;"></textarea>
                        <label class="mdl-textfield__label" for="note-${habit.id}" style="color: rgba(255,255,255,0.7);">Notiz (optional)</label>
                    </div>
                `;
            
            case 'quality':
                return `
                    <div style="margin-bottom: 15px;">
                        <label style="color: rgba(255,255,255,0.7); font-size: 12px; display: block; margin-bottom: 8px;">Wie gut war es heute?</label>
                        <div id="quality-${habit.id}" style="display: flex; gap: 5px;">
                            ${[1,2,3,4,5].map(star => `
                                <span class="quality-star" data-value="${star}" style="font-size: 24px; cursor: pointer; color: rgba(255,255,255,0.3);">★</span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%;">
                        <textarea class="mdl-textfield__input" rows="2" id="note-${habit.id}" style="color: white;"></textarea>
                        <label class="mdl-textfield__label" for="note-${habit.id}" style="color: rgba(255,255,255,0.7);">Wie fühlst du dich dabei?</label>
                    </div>
                `;
        }
    }

    getHabitStatusText(habit, checkin) {
        if (!checkin) {
            if (habit.type === 'quality') {
                return 'Noch nicht bewertet heute';
            } else {
                return `Ziel: ${habit.targetCount}${habit.unit ? ' ' + habit.unit : ''} - Noch nicht erledigt`;
            }
        }

        if (habit.type === 'quality') {
            const lastEntry = checkin.entries[checkin.entries.length - 1];
            return `Bewertet mit ${lastEntry.quality} Sternen`;
        } else {
            return `Fortschritt: ${checkin.totalValue}/${habit.targetCount}${habit.unit ? ' ' + habit.unit : ''}`;
        }
    }

    getHabitTypeLabel(type) {
        switch (type) {
            case 'daily': return 'Täglich';
            case 'multiple': return 'Mehrfach';
            case 'quality': return 'Qualität';
            default: return 'Unbekannt';
        }
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
            <div style="max-width: 450px; margin: 0 auto; padding: 0 15px;">
                <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 90%; height: auto; margin: 0 auto 20px auto;">
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
                            const isCompleted = habitManager.isCompletedToday(habit.id);
                            const checkin = habitManager.getTodayCheckin(habit.id);
                            
                            return `
                                <div style="display: flex; align-items: center; padding: 12px; background: rgba(255,255,255,0.1); border-radius: 8px; margin-bottom: 8px;">
                                    <div style="width: 20px; height: 20px; border-radius: 50%; background: ${habit.color}; margin-right: 15px;"></div>
                                    <div style="flex: 1;">
                                        <span style="color: white; display: block;">${habit.name}</span>
                                        <span style="color: rgba(255,255,255,0.6); font-size: 12px;">
                                            ${this.getHabitStatusText(habit, checkin)}
                                        </span>
                                    </div>
                                    <span style="color: ${isCompleted ? '#4caf50' : 'rgba(255,255,255,0.5)'}; font-size: 18px;">
                                        ${isCompleted ? '✓' : '○'}
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
        const diaryEntries = habitManager.getDiaryEntries(5);
        const statsContent = document.querySelector('#ma-stats .page-content');
        
        const totalHabits = habits.length;
        const avgCompletion = weeklyStats.length > 0 ? 
            Math.round(weeklyStats.reduce((sum, day) => sum + day.percentage, 0) / weeklyStats.length) : 0;

        statsContent.innerHTML = `
            <div style="max-width: 450px; margin: 0 auto; padding: 0 15px;">
                <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 90%; height: auto; margin: 0 auto 20px auto;">
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
                    <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 90%; height: auto; margin: 0 auto 20px auto;">
                        <div class="mdl-card__title">
                            <h4>Gewohnheiten-Serien</h4>
                        </div>
                        <div class="mdl-card__supporting-text">
                            ${habits.map(habit => `
                                <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    <div style="display: flex; align-items: center;">
                                        <div style="width: 16px; height: 16px; border-radius: 50%; background: ${habit.color}; margin-right: 12px;"></div>
                                        <div>
                                            <span style="color: white; display: block;">${habit.name}</span>
                                            <span style="color: rgba(255,255,255,0.6); font-size: 11px;">${this.getHabitTypeLabel(habit.type)}</span>
                                        </div>
                                    </div>
                                    <span style="color: #4caf50; font-weight: bold;">${habitManager.getHabitStreak(habit.id)} Tage</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${diaryEntries.length > 0 ? `
                    <div class="demo-card-event mdl-card mdl-shadow--2dp" style="width: 90%; height: auto; margin: 0 auto;">
                        <div class="mdl-card__title">
                            <h4>Tagebuch-Einträge</h4>
                        </div>
                        <div class="mdl-card__supporting-text">
                            ${diaryEntries.map(day => `
                                <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                    <h6 style="color: #4caf50; margin-bottom: 10px;">${day.dateFormatted}</h6>
                                    ${day.entries.map(entry => `
                                        <div style="margin-bottom: 8px; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
                                            <div style="display: flex; align-items: center; margin-bottom: 4px;">
                                                <div style="width: 12px; height: 12px; border-radius: 50%; background: ${entry.habit.color}; margin-right: 8px;"></div>
                                                <span style="color: white; font-size: 12px; font-weight: bold;">${entry.habit.name}</span>
                                                <span style="color: rgba(255,255,255,0.5); font-size: 11px; margin-left: auto;">${entry.time}</span>
                                            </div>
                                            <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 0; padding-left: 20px;">${entry.entry.note}</p>
                                            ${entry.entry.quality ? `<div style="padding-left: 20px; margin-top: 4px;">
                                                <span style="color: #ffc107; font-size: 12px;">${'★'.repeat(entry.entry.quality)}${'☆'.repeat(5-entry.entry.quality)}</span>
                                            </div>` : ''}
                                        </div>
                                    `).join('')}
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
        const targetInput = document.getElementById('habit-target');
        const unitInput = document.getElementById('habit-unit');
        
        const name = nameInput.value.trim();
        const description = descriptionInput.value.trim();
        const target = this.selectedType === 'quality' ? 1 : parseInt(targetInput.value) || 1;
        const unit = this.selectedType === 'quality' ? '' : unitInput.value.trim();
        
        if (!name) {
            alert('Bitte gib einen Namen für die Gewohnheit ein.');
            return;
        }

        habitManager.addHabit(name, description, this.selectedColor, this.selectedType, target, unit);
        
        // Clear inputs
        nameInput.value = '';
        descriptionInput.value = '';
        targetInput.value = '1';
        unitInput.value = '';
        
        // Reset selections
        this.selectedColor = '#2e3a87';
        this.selectedType = 'daily';
        
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

    submitCheckin(habitId) {
        const habit = habitManager.getHabits().find(h => h.id === habitId);
        if (!habit) return;

        let value = 1;
        let quality = null;
        const note = document.getElementById(`note-${habitId}`)?.value.trim() || '';

        if (habit.type === 'multiple') {
            value = parseInt(document.getElementById(`count-${habitId}`).value) || 1;
        } else if (habit.type === 'quality') {
            const selectedStar = document.querySelector(`#quality-${habitId} .quality-star.selected`);
            if (!selectedStar) {
                alert('Bitte wähle eine Bewertung aus.');
                return;
            }
            quality = parseInt(selectedStar.dataset.value);
        }

        habitManager.checkinHabit(habitId, value, quality, note);
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

// Event delegation for quality stars
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('quality-star')) {
        const container = e.target.parentElement;
        const stars = container.querySelectorAll('.quality-star');
        const value = parseInt(e.target.dataset.value);
        
        stars.forEach((star, index) => {
            if (index < value) {
                star.style.color = '#ffc107';
                star.classList.add('selected');
            } else {
                star.style.color = 'rgba(255,255,255,0.3)';
                star.classList.remove('selected');
            }
        });
    }
});