(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

})(jQuery);


/* ========================================================
   LIVE AUTOCOMPLETE SEARCH — Destination Search Bar
   ======================================================== */
(function () {
    "use strict";

    var searchInput = document.getElementById('destinationSearchInput');
    var searchButton = document.getElementById('destinationSearchBtn');
    var searchMsg = document.getElementById('destinationSearchMessage');
    var suggBox = document.getElementById('searchSuggestions');

    if (!searchInput) return;

    /* ── Complete destination list ── */
    var allDestinations = [
        { name: 'Hunza Valley', duration: '5+ Days', region: 'Gilgit-Baltistan' },
        { name: 'Skardu', duration: '5+ Days', region: 'Gilgit-Baltistan' },
        { name: 'Fairy Meadows', duration: '5+ Days', region: 'Gilgit-Baltistan' },
        { name: 'Bashu Valley', duration: '6 Days', region: 'Gilgit-Baltistan' },
        { name: 'Naltar Valley', duration: '2 Days', region: 'Gilgit-Baltistan' },
        { name: 'Attabad Lake', duration: '1 Day', region: 'Gilgit-Baltistan' },
        { name: 'Rakaposhi', duration: '2 Days', region: 'Gilgit-Baltistan' },
        { name: 'Gilgit', duration: '4 Days', region: 'Gilgit-Baltistan' },
        { name: 'Naran', duration: '3 Days', region: 'KPK' },
        { name: 'Swat Kalam', duration: '3 Days', region: 'KPK' },
        { name: 'Shogran', duration: '1 Day', region: 'KPK' },
        { name: 'Malam Jabba', duration: '1 Day', region: 'KPK' },
        { name: 'Sharan Forest', duration: '1 Day', region: 'KPK' },
        { name: 'Chitral', duration: '4 Days', region: 'KPK' },
        { name: 'Kashmir', duration: '3 Days', region: 'AJK' },
        { name: 'Neelum Valley', duration: '3 Days', region: 'AJK' },
        { name: 'Mushkpuri', duration: '1 Day', region: 'Punjab' }
    ];

    var activeIdx = -1;
    var currentMatches = [];

    /* Bold-highlight matching text */
    function highlight(text, query) {
        if (!query) return text;
        var safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return text.replace(new RegExp('(' + safe + ')', 'gi'), '<strong>$1</strong>');
    }

    function closeSuggestions() {
        if (suggBox) { suggBox.innerHTML = ''; suggBox.classList.remove('open'); }
        activeIdx = -1;
        currentMatches = [];
    }

    function setActive(idx) {
        var items = suggBox ? suggBox.querySelectorAll('.search-suggestion-item') : [];
        items.forEach(function (el, i) {
            el.classList.toggle('active', i === idx);
        });
        activeIdx = idx;
    }

    function renderSuggestions(matches, query) {
        if (!suggBox) return;
        suggBox.innerHTML = '';
        currentMatches = matches;

        if (!matches.length) {
            /* Show a "no results" hint */
            var noRes = document.createElement('div');
            noRes.className = 'search-suggestion-item no-results';
            noRes.innerHTML = '<i class="fa fa-search me-2"></i>No destinations found for "<strong>' + query + '</strong>"';
            suggBox.appendChild(noRes);
            suggBox.classList.add('open');
            return;
        }

        suggBox.classList.add('open');
        matches.forEach(function (dest, i) {
            var item = document.createElement('div');
            item.className = 'search-suggestion-item';
            item.setAttribute('role', 'option');
            item.innerHTML =
                '<span class="sugg-icon"><i class="fa fa-map-marker-alt"></i></span>' +
                '<span class="sugg-text">' + highlight(dest.name, query) + '</span>' +
                '<span class="sugg-meta">' + dest.region + ' &bull; ' + dest.duration + '</span>';
            item.addEventListener('mousedown', function (e) {
                e.preventDefault();
                searchInput.value = dest.name;
                closeSuggestions();
                goSearch(dest.name);
            });
            item.addEventListener('mouseenter', function () { setActive(i); });
            suggBox.appendChild(item);
        });
    }

    function goSearch(query) {
        if (!query) return;
        window.location.href = 'destination.html?q=' + encodeURIComponent(query);
    }

    /* Live search on every keystroke */
    searchInput.addEventListener('input', function () {
        var q = searchInput.value.trim().toLowerCase();
        activeIdx = -1;
        if (!q) { closeSuggestions(); return; }
        var matches = allDestinations.filter(function (d) {
            return d.name.toLowerCase().indexOf(q) !== -1;
        });
        renderSuggestions(matches, q);
    });

    /* Keyboard navigation ↑ ↓ Enter Escape */
    searchInput.addEventListener('keydown', function (e) {
        var items = suggBox ? suggBox.querySelectorAll('.search-suggestion-item:not(.no-results)') : [];
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive(Math.min(activeIdx + 1, items.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive(Math.max(activeIdx - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIdx >= 0 && currentMatches[activeIdx]) {
                searchInput.value = currentMatches[activeIdx].name;
                closeSuggestions();
                goSearch(currentMatches[activeIdx].name);
            } else {
                goSearch(searchInput.value.trim());
            }
        } else if (e.key === 'Escape') {
            closeSuggestions();
        }
    });

    /* Search button click */
    if (searchButton) {
        searchButton.addEventListener('click', function () {
            closeSuggestions();
            goSearch(searchInput.value.trim());
        });
    }

    /* Close on outside click */
    document.addEventListener('click', function (e) {
        if (searchInput && !searchInput.contains(e.target) &&
            (!suggBox || !suggBox.contains(e.target))) {
            closeSuggestions();
        }
    });

})();
