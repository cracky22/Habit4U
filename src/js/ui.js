class UIManager {
    constructor() {
        this.currentEditingHabit = null;
        this.selectedColor = '#4a90e2'; // Helleres Blau
        this.selectedType = 'daily';
        this.selectedQuality = 0;
    }

    renderCustomTab() {
        const habits = habitManager.getHabits();
        const customContent = document.querySelector('#ma-custom .page-content');
        
        customContent.innerHTML = `
            <div class="container">
                <div class="grid grid-desktop-2">
                    <!-- Gewohnheit hinzufügen -->
                    <div class="demo-card-event mdl-card mdl-shadow--2dp slide-in">
                        <div class="mdl-card__title">
                            <h4>Neue Gewohnheit</h4>
                        </div>
                        <div class="mdl-card__supporting-text">
                            <div class="form-group">
                                <label class="form-label">Name der Gewohnheit</label>
                                <input type="text" id="habit-name" class="form-input" placeholder="z.B. Meditieren, Sport, Lesen...">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Beschreibung (optional)</label>
                                <textarea id="habit-description" class="form-input form-textarea" placeholder="Warum ist diese Gewohnheit wichtig für dich?"></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Gewohnheitstyp</label>
                                <div class="radio-group">
                                    <label class="radio-option selected" data-type="daily">
                                        <input type="radio" name="habit-type" value="daily" checked>
                                        <div class="radio-option-content">
                                            <div class="radio-option-title">Täglich</div>
                                            <div class="radio-option-desc">Einmal pro Tag erledigen</div>
                                        </div>
                                    </label>
                                    <label class="radio-option" data-type="multiple">
                                        <input type="radio" name="habit-type" value="multiple">
                                        <div class="radio-option-content">
                                            <div class="radio-option-title">Mehrfach täglich</div>
                                            <div class="radio-option-desc">Zählbare Aktivität mit Tagesziel</div>
                                        </div>
                                    </label>
                                    <label class="radio-option" data-type="quality">
                                        <input type="radio" name="habit-type" value="quality">
                                        <div class="radio-option-content">
                                            <div class="radio-option-title">Qualitätsbewertung</div>
                                            <div class="radio-option-desc">Bewertung von 1-5 Sternen</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div id="target-settings" class="form-group">
                                <label class="form-label">Tagesziel</label>
                                <div style="display: flex; align-items: center; gap: 15px;">
                                    <div style="flex: 1;">
                                        <input type="range" id="habit-target" class="slider" min="1" max="20" value="1">
                                    </div>
                                    <span class="slider-value" id="target-value">1</span>
                                </div>
                                <div style="margin-top: 10px;">
                                    <input type="text" id="habit-unit" class="form-input" placeholder="Einheit (z.B. mal, Gläser, Minuten)" style="font-size: 12px;">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Farbe wählen</label>
                                <div class="color-picker">
                                    <div class="color-option selected" data-color="#4a90e2" style="background: #4a90e2;"></div>
                                    <div class="color-option" data-color="#4caf50" style="background: #4caf50;"></div>
                                    <div class="color-option" data-color="#ff9800" style="background: #ff9800;"></div>
                                    <div class="color-option" data-color="#e91e63" style="background: #e91e63;"></div>
                                    <div class="color-option" data-color="#9c27b0" style="background: #9c27b0;"></div>
                                    <div class="color-option" data-color="#00bcd4" style="background: #00bcd4;"></div>
                                    <div class="color-option" data-color="#795548" style="background: #795548;"></div>
                                    <div class="color-option" data-color="#607d8b" style="background: #607d8b;"></div>
                                </div>
                            </div>
                        </div>
                        <div class="mdl-card__actions mdl-card--border">
                            <button onclick="uiManager.addNewHabit();" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                Gewohnheit hinzufügen
                            </button>
                        </div>
                    </div>

                    <!-- Gewohnheiten Liste -->
                    <div>
                        <h5 style="color: white; margin-bottom: 20px;">Meine Gewohnheiten (${habits.length})</h5>
                        <div id="habits-list">
                            ${habits.length === 0 ? `
                                <div class="demo-card-event mdl-card mdl-shadow--2dp" style="background: rgba(255,255,255,0.05);">
                                    <div class="mdl-card__supporting-text" style="text-align: center; padding: 40px 20px;">
                                        <div style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;">📝</div>
                                        <h6 style="color: rgba(255,255,255,0.8); margin-bottom: 8px;">Noch keine Gewohnheiten</h6>
                                        <p style="color: rgba(255,255,255,0.6); font-size: 14px;">Erstelle deine erste Gewohnheit links im Formular</p>
                                    </div>
                                </div>
                            ` : habits.map(habit => `
                                <div class="demo-card-event mdl-card mdl-shadow--2dp slide-in" style="background: ${habit.color}; margin-bottom: 15px;">
                                    <div class="mdl-card__title">
                                        <h4>${habit.name}</h4>
                                    </div>
                                    <div class="mdl-card__supporting-text" style="color: rgba(255,255,255,0.9);">
                                        ${habit.description ? `<p style="margin-bottom: 12px; font-size: 14px; line-height: 1.4;">${habit.description}</p>` : ''}
                                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                                            <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 16px; font-size: 12px;">
                                                ${this.getHabitTypeLabel(habit.type)}
                                            </span>
                                            ${habit.type !== 'quality' ? `
                                                <span style="background: rgba(255,255,255,0.15); padding: 4px 12px; border-radius: 16px; font-size: 12px;">
                                                    Ziel: ${habit.targetCount}${habit.unit ? ' ' + habit.unit : ''}/Tag
                                                </span>
                                            ` : ''}
                                        </div>
                                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; opacity: 0.8;">
                                            <span>Serie: ${habitManager.getHabitStreak(habit.id)} Tage</span>
                                            <span>Erstellt: ${new Date(habit.createdAt).toLocaleDateString('de-DE')}</span>
                                        </div>
                                    </div>
                                    <div class="mdl-card__actions mdl-card--border">
                                        <div class="mdl-layout-spacer"></div>
                                        <button onclick="uiManager.deleteHabit('${habit.id}');" class="mdl-button mdl-js-button mdl-js-ripple-effect" style="color: #ff6b6b;">
                                            <i class="material-icons" style="font-size: 18px; margin-right: 4px;">delete</i>
                                            Löschen
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
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
                    colorOptions.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    this.selectedColor = option.dataset.color;
                });
            });

            // Habit type selection
            const radioOptions = document.querySelectorAll('.radio-option');
            const targetSettings = document.getElementById('target-settings');
            
            radioOptions.forEach(option => {
                option.addEventListener('click', () => {
                    radioOptions.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    
                    const input = option.querySelector('input[type="radio"]');
                    input.checked = true;
                    this.selectedType = input.value;
                    
                    if (input.value === 'quality') {
                        targetSettings.style.display = 'none';
                    } else {
                        targetSettings.style.display = 'block';
                        if (input.value === 'daily') {
                            document.getElementById('habit-target').value = '1';
                            document.getElementById('target-value').textContent = '1';
                        }
                    }
                });
            });

            // Target slider
            const targetSlider = document.getElementById('habit-target');
            const targetValue = document.getElementById('target-value');
            
            targetSlider.addEventListener('input', () => {
                targetValue.textContent = targetSlider.value;
            });
        }, 100);
    }

    renderAddTab() {
        const habits = habitManager.getHabits();
        const addContent = document.querySelector('#ma-add .page-content');
        
        if (habits.length === 0) {
            addContent.innerHTML = `
                <div class="container">
                    <div class="demo-card-event mdl-card mdl-shadow--2dp" style="max-width: 500px; margin: 0 auto;">
                        <div class="mdl-card__supporting-text" style="text-align: center; padding: 60px 40px;">
                            <div style="font-size: 64px; margin-bottom: 24px; opacity: 0.6;">🎯</div>
                            <h4 style="margin-bottom: 16px;">Keine Gewohnheiten vorhanden</h4>
                            <p style="color: rgba(255,255,255,0.8); margin-bottom: 24px; line-height: 1.5;">
                                Erstelle zuerst Gewohnheiten im "Custom" Tab, um mit dem Tracking zu beginnen.
                            </p>
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
            <div class="container">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h4 style="color: white; margin-bottom: 8px;">Heutige Check-ins</h4>
                    <p style="color: rgba(255,255,255,0.7); font-size: 14px;">
                        ${new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                </div>
                
                <div class="grid grid-desktop-auto">
                    ${habits.map(habit => {
                        const checkin = habitManager.getTodayCheckin(habit.id);
                        const isCompleted = habitManager.isCompletedToday(habit.id);
                        
                        return `
                            <div class="demo-card-event mdl-card mdl-shadow--2dp slide-in" style="background: ${habit.color}; ${isCompleted ? 'opacity: 0.8; transform: scale(0.98);' : ''}">
                                <div class="mdl-card__title">
                                    <h4>${habit.name} ${isCompleted ? '✅' : ''}</h4>
                                </div>
                                <div class="mdl-card__supporting-text" style="color: rgba(255,255,255,0.9);">
                                    ${habit.description ? `<p style="margin-bottom: 12px; font-size: 13px; opacity: 0.9;">${habit.description}</p>` : ''}
                                    
                                    <div style="background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; margin-bottom: 16px; font-size: 12px;">
                                        ${this.getHabitStatusText(habit, checkin)}
                                    </div>
                                    
                                    ${this.renderCheckinInterface(habit, checkin, isCompleted)}
                                </div>
                                <div class="mdl-card__actions mdl-card--border">
                                    <span style="color: rgba(255,255,255,0.7); font-size: 12px;">
                                        🔥 ${habitManager.getHabitStreak(habit.id)} Tage Serie
                                    </span>
                                    <div class="mdl-layout-spacer"></div>
                                    ${!isCompleted ? `
                                        <button onclick="uiManager.submitCheckin('${habit.id}');" 
                                                class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                            ${habit.type === 'quality' ? '⭐ Bewerten' : '✓ Check-in'}
                                        </button>
                                    ` : `
                                        <span style="color: #4caf50; font-weight: bold; display: flex; align-items: center; gap: 4px;">
                                            <span>✅</span> Erledigt
                                        </span>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    renderCheckinInterface(habit, checkin, isCompleted) {
        if (isCompleted) {
            return `
                <div style="text-align: center; padding: 20px; background: rgba(76, 175, 80, 0.2); border-radius: 12px; border: 1px solid rgba(76, 175, 80, 0.3);">
                    <div style="font-size: 32px; margin-bottom: 8px;">🎉</div>
                    <div style="color: #4caf50; font-weight: bold;">Heute bereits erledigt!</div>
                </div>
            `;
        }

        switch (habit.type) {
            case 'daily':
                return `
                    <div class="form-group">
                        <label class="form-label">Notiz (optional)</label>
                        <textarea id="note-${habit.id}" class="form-input form-textarea" placeholder="Wie war es heute? Was hast du dabei gedacht oder gefühlt?"></textarea>
                    </div>
                `;
            
            case 'multiple':
                return `
                    <div class="form-group">
                        <label class="form-label">Anzahl heute</label>
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                            <div style="flex: 1;">
                                <input type="range" id="count-${habit.id}" class="slider" min="1" max="${Math.max(habit.targetCount * 2, 10)}" value="1">
                            </div>
                            <span class="slider-value" id="count-value-${habit.id}">1</span>
                            <span style="color: rgba(255,255,255,0.8); font-size: 14px;">${habit.unit || 'mal'}</span>
                        </div>
                        <script>
                            document.getElementById('count-${habit.id}').addEventListener('input', function() {
                                document.getElementById('count-value-${habit.id}').textContent = this.value;
                            });
                        </script>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Notiz (optional)</label>
                        <textarea id="note-${habit.id}" class="form-input form-textarea" placeholder="Wie fühlst du dich dabei? Was war besonders?"></textarea>
                    </div>
                `;
            
            case 'quality':
                return `
                    <div class="form-group">
                        <label class="form-label">Wie gut war es heute?</label>
                        <div class="quality-stars" id="quality-${habit.id}">
                            ${[1,2,3,4,5].map(star => `
                                <span class="quality-star" data-value="${star}">★</span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Wie fühlst du dich dabei?</label>
                        <textarea id="note-${habit.id}" class="form-input form-textarea" placeholder="Beschreibe deine Erfahrung, Gefühle oder Gedanken..."></textarea>
                    </div>
                `;
        }
    }

    getHabitStatusText(habit, checkin) {
        if (!checkin) {
            if (habit.type === 'quality') {
                return '⭐ Noch nicht bewertet heute';
            } else {
                return `🎯 Ziel: ${habit.targetCount}${habit.unit ? ' ' + habit.unit : ''} - Noch nicht erledigt`;
            }
        }

        if (habit.type === 'quality') {
            const lastEntry = checkin.entries[checkin.entries.length - 1];
            return `⭐ Bewertet mit ${lastEntry.quality} von 5 Sternen`;
        } else {
            const percentage = Math.round((checkin.totalValue / habit.targetCount) * 100);
            return `📊 Fortschritt: ${checkin.totalValue}/${habit.targetCount}${habit.unit ? ' ' + habit.unit : ''} (${percentage}%)`;
        }
    }

    getHabitTypeLabel(type) {
        switch (type) {
            case 'daily': return '📅 Täglich';
            case 'multiple': return '🔢 Mehrfach';
            case 'quality': return '⭐ Qualität';
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
            <div class="container">
                <div class="grid grid-desktop-2">
                    <!-- Tagesfortschritt -->
                    <div class="demo-card-event mdl-card mdl-shadow--2dp slide-in">
                        <div class="mdl-card__title">
                            <h4>Heute - ${today}</h4>
                        </div>
                        <div class="mdl-card__supporting-text" style="text-align: center;">
                            <div class="progress-circle" style="--progress: ${progress.percentage}%;">
                                <div class="progress-text">${progress.percentage}%</div>
                            </div>
                            <div style="color: rgba(255,255,255,0.9); margin-bottom: 20px; font-size: 16px;">
                                <strong>${progress.completed}</strong> von <strong>${progress.total}</strong> Gewohnheiten erledigt
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress.percentage}%;"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-top: 20px; gap: 10px;">
                                <button onclick="change_section('ma-home', 'ma-add');" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" style="flex: 1;">
                                    📝 Check-ins
                                </button>
                                <button onclick="change_section('ma-home', 'ma-stats');" class="mdl-button mdl-js-button mdl-js-ripple-effect" style="color: white; flex: 1;">
                                    📊 Statistiken
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Gewohnheiten Übersicht -->
                    <div>
                        <h5 style="color: white; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                            <span>📋</span> Heutige Gewohnheiten
                        </h5>
                        <div style="max-height: 400px; overflow-y: auto;">
                            ${habits.length === 0 ? 
                                `<div class="habit-item" style="justify-content: center; text-align: center; padding: 40px 20px;">
                                    <div>
                                        <div style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;">🎯</div>
                                        <p style="color: rgba(255,255,255,0.7);">Keine Gewohnheiten vorhanden</p>
                                        <button onclick="change_section('ma-home', 'ma-custom');" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" style="margin-top: 12px;">
                                            Gewohnheiten erstellen
                                        </button>
                                    </div>
                                </div>` :
                                habits.map(habit => {
                                    const isCompleted = habitManager.isCompletedToday(habit.id);
                                    const checkin = habitManager.getTodayCheckin(habit.id);
                                    
                                    return `
                                        <div class="habit-item slide-in">
                                            <div class="habit-color" style="background: ${habit.color};"></div>
                                            <div class="habit-info">
                                                <div class="habit-name">${habit.name}</div>
                                                <div class="habit-status">
                                                    ${this.getHabitStatusText(habit, checkin)}
                                                </div>
                                            </div>
                                            <div class="habit-check" style="color: ${isCompleted ? '#4caf50' : 'rgba(255,255,255,0.3)'};">
                                                ${isCompleted ? '✅' : '⭕'}
                                            </div>
                                        </div>
                                    `;
                                }).join('')
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderStatsTab() {
        const weeklyStats = habitManager.getWeeklyStats();
        const habits = habitManager.getHabits();
        const diaryEntries = habitManager.getDiaryEntries(7);
        const statsContent = document.querySelector('#ma-stats .page-content');
        
        const totalHabits = habits.length;
        const avgCompletion = weeklyStats.length > 0 ? 
            Math.round(weeklyStats.reduce((sum, day) => sum + day.percentage, 0) / weeklyStats.length) : 0;

        statsContent.innerHTML = `
            <div class="container">
                <div class="grid grid-desktop-2">
                    <!-- Wochenübersicht -->
                    <div class="demo-card-event mdl-card mdl-shadow--2dp slide-in">
                        <div class="mdl-card__title">
                            <h4>📊 Wochenübersicht</h4>
                        </div>
                        <div class="mdl-card__supporting-text">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                                <div style="text-align: center; padding: 16px; background: rgba(76, 175, 80, 0.2); border-radius: 12px;">
                                    <div style="font-size: 28px; font-weight: bold; color: #4caf50;">${totalHabits}</div>
                                    <div style="color: rgba(255,255,255,0.8); font-size: 12px;">Gewohnheiten</div>
                                </div>
                                <div style="text-align: center; padding: 16px; background: rgba(33, 150, 243, 0.2); border-radius: 12px;">
                                    <div style="font-size: 28px; font-weight: bold; color: #2196f3;">${avgCompletion}%</div>
                                    <div style="color: rgba(255,255,255,0.8); font-size: 12px;">Ø Erfüllung</div>
                                </div>
                            </div>
                            
                            <div class="stats-chart">
                                <h6 style="color: white; margin-bottom: 15px;">Letzte 7 Tage:</h6>
                                ${weeklyStats.map(day => {
                                    const color = day.percentage === 100 ? '#4caf50' : 
                                                 day.percentage >= 75 ? '#8bc34a' :
                                                 day.percentage >= 50 ? '#ff9800' : 
                                                 day.percentage >= 25 ? '#ff5722' : '#f44336';
                                    
                                    return `
                                        <div class="chart-bar">
                                            <div class="chart-label">${day.dayName}</div>
                                            <div class="chart-bar-bg">
                                                <div class="chart-bar-fill" style="background: ${color}; width: ${day.percentage}%;"></div>
                                            </div>
                                            <div class="chart-value">${day.completed}/${day.total}</div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Gewohnheiten-Serien -->
                    ${habits.length > 0 ? `
                        <div class="demo-card-event mdl-card mdl-shadow--2dp slide-in">
                            <div class="mdl-card__title">
                                <h4>🔥 Gewohnheiten-Serien</h4>
                            </div>
                            <div class="mdl-card__supporting-text">
                                <div style="max-height: 300px; overflow-y: auto;">
                                    ${habits.map(habit => {
                                        const streak = habitManager.getHabitStreak(habit.id);
                                        return `
                                            <div class="habit-item">
                                                <div class="habit-color" style="background: ${habit.color};"></div>
                                                <div class="habit-info">
                                                    <div class="habit-name">${habit.name}</div>
                                                    <div class="habit-status">${this.getHabitTypeLabel(habit.type)}</div>
                                                </div>
                                                <div style="text-align: right;">
                                                    <div style="color: #4caf50; font-weight: bold; font-size: 18px;">${streak}</div>
                                                    <div style="color: rgba(255,255,255,0.6); font-size: 11px;">Tage</div>
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- Tagebuch-Einträge -->
                ${diaryEntries.length > 0 ? `
                    <div class="demo-card-event mdl-card mdl-shadow--2dp slide-in" style="margin-top: 20px;">
                        <div class="mdl-card__title">
                            <h4>📖 Tagebuch-Einträge</h4>
                        </div>
                        <div class="mdl-card__supporting-text">
                            <div style="max-height: 500px; overflow-y: auto;">
                                ${diaryEntries.map(day => `
                                    <div class="diary-entry">
                                        <div class="diary-date">${day.dateFormatted}</div>
                                        ${day.entries.map(entry => `
                                            <div class="diary-item">
                                                <div class="diary-habit-color" style="background: ${entry.habit.color};"></div>
                                                <div class="diary-content">
                                                    <div class="diary-habit-name">${entry.habit.name}</div>
                                                    <div class="diary-note">${entry.entry.note}</div>
                                                    <div class="diary-meta">
                                                        <span class="diary-time">${entry.time}</span>
                                                        ${entry.entry.quality ? `
                                                            <span class="diary-quality">${'★'.repeat(entry.entry.quality)}${'☆'.repeat(5-entry.entry.quality)}</span>
                                                        ` : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                `).join('')}
                            </div>
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
            nameInput.classList.add('error');
            setTimeout(() => nameInput.classList.remove('error'), 3000);
            return;
        }

        // Add loading state
        const button = event.target;
        button.classList.add('loading');
        button.textContent = 'Wird hinzugefügt...';

        setTimeout(() => {
            habitManager.addHabit(name, description, this.selectedColor, this.selectedType, target, unit);
            
            // Clear inputs
            nameInput.value = '';
            descriptionInput.value = '';
            targetInput.value = '1';
            document.getElementById('target-value').textContent = '1';
            unitInput.value = '';
            
            // Reset selections
            this.selectedColor = '#4a90e2';
            this.selectedType = 'daily';
            
            // Success feedback
            button.classList.remove('loading');
            button.classList.add('success');
            button.textContent = '✓ Hinzugefügt!';
            
            setTimeout(() => {
                button.classList.remove('success');
                button.textContent = 'Gewohnheit hinzufügen';
                this.renderCustomTab();
            }, 1500);
            
            hapticFeedback.vibrate(15);
        }, 500);
    }

    deleteHabit(habitId) {
        const habit = habitManager.getHabits().find(h => h.id === habitId);
        if (!habit) return;
        
        if (confirm(`Möchtest du "${habit.name}" wirklich löschen?\n\nAlle Daten und Check-ins gehen dabei verloren.`)) {
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
                // Highlight stars to show they need to be selected
                const stars = document.querySelectorAll(`#quality-${habitId} .quality-star`);
                stars.forEach(star => {
                    star.style.color = '#ff5722';
                    setTimeout(() => star.style.color = 'rgba(255,255,255,0.3)', 1000);
                });
                return;
            }
            quality = parseInt(selectedStar.dataset.value);
        }

        // Add loading state
        const button = event.target;
        button.classList.add('loading');
        button.textContent = 'Wird gespeichert...';

        setTimeout(() => {
            habitManager.checkinHabit(habitId, value, quality, note);
            
            // Success feedback
            button.classList.remove('loading');
            button.classList.add('success');
            button.textContent = '✓ Gespeichert!';
            
            hapticFeedback.vibrate(15);
            
            setTimeout(() => {
                this.renderAddTab();
                this.renderHomeTab();
                change_section("ma-add", "ma-home");
            }, 1000);
        }, 500);
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
        
        hapticFeedback.vibrate(10);
    }
});

// Add smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);
});