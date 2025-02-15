document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingVideo = document.getElementById('loading-video');
    const mainMenu = document.getElementById('main-menu');

    // Video bittiğinde menüye geç
    function goToMainMenu() {
        loadingScreen.style.display = 'none';
        mainMenu.style.display = 'block';
    }

    // Video varsa ve yüklenebiliyorsa
    if (loadingVideo && loadingVideo.canPlayType) {
        // Video ayarları
        loadingVideo.muted = true;
        loadingVideo.autoplay = true;

        // Video olayları
        loadingVideo.addEventListener('ended', goToMainMenu);
        
        loadingVideo.addEventListener('timeupdate', () => {
            // Video sonuna yaklaştıysa menüye geç
            if (loadingVideo.currentTime >= loadingVideo.duration - 0.1) {
                goToMainMenu();
            }
        });

        // Otomatik oynatmayı dene
        const playPromise = loadingVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Otomatik oynatma başarısız olursa
                goToMainMenu();
            });
        }

        // Yedek olarak 5 saniye sonra menüye geç
        setTimeout(goToMainMenu, 5000);
    } else {
        // Video desteklenmiyorsa direkt menüye geç
        goToMainMenu();
    }
});