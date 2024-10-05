document.addEventListener('DOMContentLoaded', () => {
    const openMenuBtn = document.getElementById('openMenu');
    const closeMenuBtn = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');

    // Function to open the sidebar
    openMenuBtn.addEventListener('click', () => {
        sidebar.style.display = 'block';
    });

    // Function to close the sidebar
    closeMenuBtn.addEventListener('click', () => {
        sidebar.style.display = 'none';
    });
});


document.getElementById('openMenu').addEventListener('click', () => {
    console.log('open menu clicked');
})

console.log('header JS loaded');
