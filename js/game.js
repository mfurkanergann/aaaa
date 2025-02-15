document.addEventListener('DOMContentLoaded', function() {
    const files = document.querySelectorAll('.file');
    const tablet = document.getElementById('tablet');
    const backButton = document.getElementById('backButton');
    const mainMenu = document.getElementById('main-menu');
    const gameScreen = document.getElementById('game-screen');

    files.forEach(file => {
        file.addEventListener('click', function() {
            alert(`${file.id} tıklandı`);
        });
    });

    tablet.addEventListener('click', function() {
        alert('Tablet tıklandı');
    });

    backButton.addEventListener('click', function() {
        alert('Ana menüye dönülüyor');
        gameScreen.style.display = 'none';
        mainMenu.style.display = 'block';
    });
});