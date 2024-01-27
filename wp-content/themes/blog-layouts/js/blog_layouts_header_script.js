window.addEventListener("DOMContentLoaded", function () {

    // header mobile submenu toggle
    const header_submenu_toggle = document.querySelectorAll('.blog_layouts_submenu_toggle');

    for (const toggle of header_submenu_toggle) {
        toggle.addEventListener('click', toggleSubMenu);
        toggle.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                toggleSubMenu(event);
            }
        });
    }

    function toggleSubMenu(event) {
        event.stopPropagation();

        const toggleButton = event.target;
        const listItemContainer = toggleButton.parentElement;
        const listItem = listItemContainer.parentElement;
        const submenu = listItemContainer.parentElement.querySelector('.sub-menu');

        // close all open menus
        const allOpenMenus = document.querySelectorAll('.blog_layouts_submenu_open');
        const parentListItem = listItem.parentElement.parentElement;
        const isInOpenSubmenu = parentListItem.classList.contains('blog_layouts_submenu_open');

        if (!isInOpenSubmenu) {
            for (const menu of allOpenMenus) {
                if (menu === submenu.parentElement) continue;
                menu.classList.remove('blog_layouts_submenu_open');
            }
        }

        listItem.classList.toggle('blog_layouts_submenu_open');
    }

    const headerSearchIcon = document.querySelector('#blog_layouts_header_search_icon');

    const expandableSeachfield = this.document.querySelector('#blog_layouts_expandable_search_field')
    if (headerSearchIcon && expandableSeachfield) {
        headerSearchIcon.addEventListener('click', toggleSearch);
        headerSearchIcon.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                toggleSearch(event);
            }
        });

        window.addEventListener('click', closeSearchWhenOpen);
    }

    let searchOpen = false;

    function toggleSearch(event) {
        if(event.target === expandableSeachfield || expandableSeachfield.contains(event.target)) return;
        expandableSeachfield.classList.toggle('blog_layouts_header_search_open');
        searchOpen = !searchOpen;
        if (searchOpen) {
            const searchfield = expandableSeachfield.querySelector('.search-field');
            searchfield.focus();
            event.preventDefault();
        }
    }

    const mobileMenu = this.document.querySelector('#blog_layouts_header_mobile_menu');
    const mobileMenuToggleButton = this.document.querySelector('#blog_layouts_mobile_menu_toggle_button');
    if (mobileMenuToggleButton) mobileMenuToggleButton.addEventListener('click', toggleMobileMenu);
    const mobileMenuCloseButton = this.document.querySelector('#blog_layouts_mobile_menu_close_button');
    if(mobileMenuCloseButton) mobileMenuCloseButton.addEventListener('click', toggleMobileMenu);
    
    let headerMenuOpen = false;
    function toggleMobileMenu() {
        var header = document.querySelector('#blog_layouts_header');
        header.classList.toggle('blog_layouts_header_menu_open');
        headerMenuOpen = !headerMenuOpen;
        if(headerMenuOpen) mobileMenu.focus();
    }

    function closeSearchWhenOpen(event) {
        if (searchOpen) {
            const isInSearch = headerSearchIcon.parentElement.contains(event.target);
            if (!isInSearch && headerSearchIcon && searchOpen) {
                toggleSearch(event);
            }
        }

        if (headerMenuOpen) {
            const isInSidMenu = mobileMenu.contains(event.target);
            const isToggleButon = mobileMenuToggleButton.contains(event.target);
            if (!isInSidMenu && !isToggleButon) {
                toggleMobileMenu();
            }
        }
    }

    var material3Header = document.querySelector('.blog_layouts_material3_header');
    var fixedHeader = this.document.querySelector('.blog_layouts_fixed_header');
    if(material3Header && fixedHeader) {
        window.onscroll = function () {
          if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            material3Header.style.backgroundColor = "var(--blog_layouts_primary_variant_much_darker)"; // Hintergrundfarbe ändern
        } else {
            material3Header.style.backgroundColor = "transparent"; // Zurück zur Originalfarbe
          }
        };
    }

}, false);