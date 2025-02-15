document.addEventListener('DOMContentLoaded', function() {
    // Menü butonları
    const continueButton = document.getElementById('continue');
    const newGameButton = document.getElementById('newGame');
    const howToPlayButton = document.getElementById('howToPlay');
    const settingsButton = document.getElementById('settings');
    const exitButton = document.getElementById('exit');

    // Popup elementleri
    const exitPopup = document.getElementById('exitPopup');
    const settingsPopup = document.getElementById('settingsPopup');
    const createProfilePopup = document.getElementById('createProfilePopup');

    // Exit popup butonları
    const cancelExitButton = document.getElementById('cancelExit');
    const confirmExitButton = document.getElementById('confirmExit');

    // Settings popup butonları ve elementleri
    const cancelSettingsButton = document.getElementById('cancelSettings');
    const saveSettingsButton = document.getElementById('saveSettings');
    const brightnessSlider = document.getElementById('brightnessSlider');
    const musicSlider = document.getElementById('musicSlider');
    const effectsSlider = document.getElementById('effectsSlider');
    const languageSelect = document.getElementById('languageSelect');
    const fullscreenButton = document.getElementById('toggleFullscreen');

    // Profil oluşturma elementleri
    const profileNameInput = document.getElementById('profileName');
    const createProfileButton = document.getElementById('createProfile');
    const cancelProfileButton = document.getElementById('cancelProfile');
    const prevAvatarButton = document.getElementById('prevAvatar');
    const nextAvatarButton = document.getElementById('nextAvatar');
  
    // Yeni oyun ekranı ve geri dön butonu
    const gameScreen = document.getElementById('game-screen');
    const backButton = document.getElementById('backButton');
    const mainMenu = document.getElementById('main-menu');

    // Parlaklık ayarı için özel fonksiyon
    function updateBrightness(value) {
        document.documentElement.style.setProperty('--brightness', value + '%');
        localStorage.setItem('brightness', value);
        console.log('Parlaklık güncellendi:', value + '%');
    }

    // Parlaklık slider'ı için event listener
    if(brightnessSlider) {
        brightnessSlider.addEventListener('input', function() {
            updateBrightness(this.value);
            if(this.nextElementSibling) {
                this.nextElementSibling.textContent = this.value + '%';
            }
        });

        // Kayıtlı parlaklık değerini yükle
        const savedBrightness = localStorage.getItem('brightness');
        if(savedBrightness) {
            brightnessSlider.value = savedBrightness;
            updateBrightness(savedBrightness);
            if(brightnessSlider.nextElementSibling) {
                brightnessSlider.nextElementSibling.textContent = savedBrightness + '%';
            }
        }
    }

    // Menü buton event listener'ları
    if(continueButton) {
        continueButton.addEventListener('click', function() {
            console.log('Devam Et tıklandı');
        });
    }

    if(newGameButton) {
        newGameButton.addEventListener('click', function() {
            console.log('Yeni Oyun tıklandı');
            if(createProfilePopup) {
                createProfilePopup.style.display = 'flex';
                mainMenu.style.display = 'none';
            }
        });
    }

    if(howToPlayButton) {
        howToPlayButton.addEventListener('click', function() {
            console.log('Nasıl Oynanır tıklandı');
        });
    }

    if(settingsButton) {
        settingsButton.addEventListener('click', function() {
            console.log('Ayarlar tıklandı');
            if(settingsPopup) {
                settingsPopup.style.display = 'flex';
            }
        });
    }

    if(exitButton) {
        exitButton.addEventListener('click', function() {
            console.log('Çıkış tıklandı');
            if(exitPopup) {
                exitPopup.style.display = 'flex';
            }
        });
    }

    // Exit popup event listener'ları
    if(cancelExitButton) {
        cancelExitButton.addEventListener('click', function() {
            if(exitPopup) {
                exitPopup.style.display = 'none';
            }
        });
    }

    if(confirmExitButton) {
        confirmExitButton.addEventListener('click', function() {
            window.close();
        });
    }

    // Settings popup event listener'ları
    if(cancelSettingsButton) {
        cancelSettingsButton.addEventListener('click', function() {
            if(settingsPopup) {
                settingsPopup.style.display = 'none';
            }
        });
    }

    if(saveSettingsButton) {
        saveSettingsButton.addEventListener('click', function() {
            const settings = {
                brightness: brightnessSlider ? brightnessSlider.value : 100,
                musicVolume: musicSlider ? musicSlider.value : 80,
                effectsVolume: effectsSlider ? effectsSlider.value : 100,
                language: languageSelect ? languageSelect.value : 'tr'
            };

            // Parlaklık ayarını kaydet
            updateBrightness(settings.brightness);

            console.log('Ayarlar kaydedildi:', settings);
            if(settingsPopup) {
                settingsPopup.style.display = 'none';
            }
        });
    }

    // Diğer slider'lar için event listener'lar
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        if(slider && slider.id !== 'brightnessSlider') {
            slider.addEventListener('input', function() {
                if(this.nextElementSibling) {
                    this.nextElementSibling.textContent = this.value + '%';
                }
            });
        }
    });

    // Tam ekran butonu
    if(fullscreenButton) {
        fullscreenButton.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.error('Tam ekran hatası:', err);
                });
            } else {
                document.exitFullscreen().catch(err => {
                    console.error('Tam ekrandan çıkış hatası:', err);
                });
            }
        });
    }

    // Profil oluşturma event listener'ları
    let currentAvatarIndex = 1;
    const totalAvatars = 22;

    if(profileNameInput) {
        profileNameInput.addEventListener('input', validateProfileForm);
    }
    
    if(cancelProfileButton) {
        cancelProfileButton.addEventListener('click', function() {
            if(createProfilePopup) {
                createProfilePopup.style.display = 'none';
            }
            if(profileNameInput) {
                profileNameInput.value = '';
            }
            if(createProfileButton) {
                createProfileButton.disabled = true;
            }
            mainMenu.style.display = 'block';
        });
    }

    if(createProfileButton) {
        createProfileButton.addEventListener('click', function() {
            const profileData = {
                name: profileNameInput ? profileNameInput.value : '',
                avatar: `avatar${currentAvatarIndex}`
            };
            console.log('Profil oluşturuldu:', profileData);
            if(createProfilePopup) {
                createProfilePopup.style.display = 'none';
            }
            if(profileNameInput) {
                profileNameInput.value = '';
            }
            if(createProfileButton) {
                createProfileButton.disabled = true;
            }
            gameScreen.style.display = 'block';
        });
    }

    if(prevAvatarButton) {
        prevAvatarButton.addEventListener('click', function() {
            currentAvatarIndex--;
            if (currentAvatarIndex < 1) currentAvatarIndex = totalAvatars;
            updateAvatar();
        });
    }

    if(nextAvatarButton) {
        nextAvatarButton.addEventListener('click', function() {
            currentAvatarIndex++;
            if (currentAvatarIndex > totalAvatars) currentAvatarIndex = 1;
            updateAvatar();
        });
    }

    // ESC tuşu ile popupları kapatma
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if(exitPopup) exitPopup.style.display = 'none';
            if(settingsPopup) settingsPopup.style.display = 'none';
            if(createProfilePopup) createProfilePopup.style.display = 'none';
        }
    });

    // Popup overlay tıklama ile kapatma
    const popups = [exitPopup, settingsPopup, createProfilePopup];
    popups.forEach(popup => {
        if(popup) {
            popup.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                }
            });
        }
    });

    // Yardımcı fonksiyonlar
    function validateProfileForm() {
        const nameValue = profileNameInput ? profileNameInput.value.trim() : '';
        if(createProfileButton) {
            createProfileButton.disabled = nameValue.length < 3;
        }
    }

    function updateAvatar() {
        const avatarOption = document.querySelector('.avatar-option');
        if(avatarOption) {
            const avatarImg = avatarOption.querySelector('img');
            if(avatarImg) {
                avatarImg.src = `assets/images/avatars/avatar${currentAvatarIndex}.png`;
                avatarImg.alt = `Avatar ${currentAvatarIndex}`;
            }
        }
    }

    // Yeni oyun ekranı geri dön butonu
    if(backButton) {
        backButton.addEventListener('click', function() {
            gameScreen.style.display = 'none';
            mainMenu.style.display = 'block';
        });
    }
});

console.log('Menu.js yüklendi - ' + new Date().toISOString());