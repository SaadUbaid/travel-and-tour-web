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
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
})(jQuery);


(function () {
    "use strict";

    var searchInput = document.getElementById('destinationSearchInput');
    var searchButton = document.getElementById('destinationSearchBtn');
    var searchMessage = document.getElementById('destinationSearchMessage');
    var searchResults = document.getElementById('destinationSearchResults');

    if (!searchInput || !searchButton || !searchMessage || !searchResults) {
        return;
    }

    var destinationCards = Array.prototype.slice.call(document.querySelectorAll('.package-item'));
    var destinationIndex = destinationCards.map(function (card) {
        var titleElement = card.querySelector('h5');
        var title = titleElement ? titleElement.textContent.trim() : '';
        return {
            card: card,
            title: title,
            normalizedTitle: title.toLowerCase()
        };
    }).filter(function (entry) {
        return entry.title.length > 0;
    });

    function setMessage(message, isError) {
        searchMessage.textContent = message;
        searchMessage.classList.toggle('text-warning', !!isError);
    }

    function clearResults() {
        searchResults.replaceChildren();
    }

    function clearHighlight() {
        destinationCards.forEach(function (card) {
            card.style.outline = '';
            card.style.outlineOffset = '';
        });
    }

    function focusDestination(entry) {
        clearHighlight();
        entry.card.style.outline = '3px solid #ffc107';
        entry.card.style.outlineOffset = '3px';
        entry.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setMessage('Showing result: ' + entry.title, false);
    }

    function getMatches(query) {
        return destinationIndex
            .map(function (entry) {
                var score = -1;
                if (entry.normalizedTitle.indexOf(query) === 0) {
                    score = 0;
                } else if (entry.normalizedTitle.indexOf(' ' + query) !== -1) {
                    score = 1;
                } else if (entry.normalizedTitle.indexOf(query) !== -1) {
                    score = 2;
                }

                if (score === -1) {
                    return null;
                }

                return {
                    entry: entry,
                    score: score
                };
            })
            .filter(function (item) {
                return item !== null;
            })
            .sort(function (a, b) {
                if (a.score !== b.score) {
                    return a.score - b.score;
                }
                return a.entry.title.localeCompare(b.entry.title);
            })
            .map(function (item) {
                return item.entry;
            });
    }

    function renderResults(matches) {
        clearResults();

        matches.forEach(function (entry) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'list-group-item list-group-item-action';
            button.textContent = entry.title;
            button.addEventListener('click', function () {
                focusDestination(entry);
            });
            searchResults.appendChild(button);
        });
    }

    function runSearch() {
        try {
            clearHighlight();
            setMessage('', false);
            clearResults();

            var rawQuery = searchInput.value || '';
            var query = rawQuery.trim().toLowerCase();

            if (!query) {
                setMessage('Please enter a destination name.', true);
                return;
            }

            var matches = getMatches(query);

            if (!matches.length) {
                setMessage('No matching destination found.', true);
                return;
            }

            renderResults(matches);
            setMessage(matches.length + ' destination(s) found. Select one to view.', false);
        } catch (error) {
            clearResults();
            setMessage('Search is temporarily unavailable. Please try again.', true);
            console.error('Destination search error:', error);
        }
    }

    searchButton.addEventListener('click', runSearch);
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            runSearch();
        }
    });
    searchInput.addEventListener('input', function () {
        if (!searchInput.value.trim()) {
            clearHighlight();
            clearResults();
            setMessage('', false);
        }
    });
})();

