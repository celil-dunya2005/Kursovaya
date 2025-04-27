// Тестовые данные о программах
const softwareProducts = [
    {
        id: '1',
        title: 'Антивирус Pro',
        description: 'Надежная защита от вирусов и вредоносных программ',
        category: 'Безопасность',
        image: './images/Antivirus2.svg'
    },
    {
        id: '2',
        title: 'Фото Редактор',
        description: 'Профессиональный редактор изображений с множеством функций',
        category: 'Графика и дизайн',
        image: './images/Photoshop.png'
    },
    {
        id: '3',
        title: 'Видео Конвертер',
        description: 'Быстрое конвертирование видео в различные форматы',
        category: 'Мультимедиа',
        image: './images/videokonverter.png'
    },
    {
        id: '4',
        title: 'Офисный Пакет',
        description: 'Полный набор офисных приложений для работы с документами',
        category: 'Офис',
        image: './images/Paket.jpg'
    },
    {
        id: '5',
        title: 'Браузер Турбо',
        description: 'Быстрый и безопасный веб-браузер, обеспечивающий приватность и защиту от угроз',
        category: 'Интернет',
        image: './images/Brauzer-removebg-preview.png'
    },
    {
        id: '6',
        title: 'Архиватор Плюс',
        description: 'Мощный инструмент для работы с архивами, обеспечивающий высокую степень сжатия',
        category: 'Утилиты',
        image: './images/Arxivator.png'
    }
];
// Инициализация поиска при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initRealTimeSearch();
});

/**
 * Инициализация поиска в реальном времени
 */
function initRealTimeSearch() {
    // Находим все поля поиска на странице
    const searchInputs = document.querySelectorAll('.search-input, .main-search-input');
    
    // Добавляем обработчики событий для каждого поля поиска
    searchInputs.forEach(input => {
        // Обработка ввода текста
        input.addEventListener('input', (e) => {
            const searchQuery = e.target.value.trim();
            performRealTimeSearch(searchQuery, input);
        });
        
        // Обработка нажатия Enter
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchQuery = input.value.trim();
                if (searchQuery) {
                    // Здесь можно добавить перенаправление на страницу с результатами поиска
                    console.log(`Выполняется поиск: ${searchQuery}`);
                }
            }
        });
        
        // Создаем контейнер для результатов поиска
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-container';
        resultsContainer.style.display = 'none';
        input.parentNode.appendChild(resultsContainer);
    });
    
    // Закрытие результатов поиска при клике вне поля ввода
    document.addEventListener('click', (e) => {
        const searchContainers = document.querySelectorAll('.search-results-container');
        const searchInputs = document.querySelectorAll('.search-input, .main-search-input');
        
        let clickedOnSearch = false;
        searchInputs.forEach(input => {
            if (input.contains(e.target) || input === e.target) {
                clickedOnSearch = true;
            }
        });
        
        if (!clickedOnSearch) {
            searchContainers.forEach(container => {
                container.style.display = 'none';
            });
        }
    });
    
    // Добавляем стили для результатов поиска
    addSearchStyles();
}

/**
 * Выполнение поиска в реальном времени
 * @param {string} query - Поисковый запрос
 * @param {HTMLElement} inputElement - Элемент поля ввода
 */
function performRealTimeSearch(query, inputElement) {
    // Находим контейнер для результатов поиска
    const resultsContainer = inputElement.parentNode.querySelector('.search-results-container');
    
    // Если запрос пустой, скрываем результаты
    if (!query) {
        resultsContainer.style.display = 'none';
        return;
    }
    
    // Фильтруем программы по запросу
    const results = softwareProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    // Отображаем результаты
    if (results.length > 0) {
        let html = '<ul class="search-results-list">';
        
        results.forEach(product => {
            html += `
                <li class="search-result-item">
                    <a href="software-details.html?id=${product.id}">
                        <div class="search-result-image">
                            <img src="${product.image || 'https://via.placeholder.com/50x50'}" alt="${product.title}">
                        </div>
                        <div class="search-result-info">
                            <div class="search-result-title">${product.title}</div>
                            <div class="search-result-category">${product.category}</div>
                        </div>
                    </a>
                </li>
            `;
        });
        
        html += '</ul>';
        resultsContainer.innerHTML = html;
    } else {
        // Если ничего не найдено, показываем сообщение
        resultsContainer.innerHTML = '<div class="search-no-results">Приложение не найдено</div>';
    }
    
    // Показываем контейнер с результатами
    resultsContainer.style.display = 'block';
}

/**
 * Добавление стилей для результатов поиска
 */
function addSearchStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Стили для контейнера поиска */
        .search-container {
            position: relative;
        }
        
        /* Стили для результатов поиска */
        .search-results-container {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: #fff;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            max-height: 400px;
            overflow-y: auto;
        }
        
        /* Темная тема для результатов поиска */
        .dark-theme .search-results-container {
            background-color: #1f2937;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        /* Стили для списка результатов */
        .search-results-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        /* Стили для элемента результата */
        .search-result-item {
            border-bottom: 1px solid #e5e7eb;
        }
        
        .dark-theme .search-result-item {
            border-bottom: 1px solid #374151;
        }
        
        .search-result-item:last-child {
            border-bottom: none;
        }
        
        .search-result-item a {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            text-decoration: none;
            color: #111827;
        }
        
        .dark-theme .search-result-item a {
            color: #f9fafb;
        }
        
        .search-result-item a:hover {
            background-color: #f3f4f6;
        }
        
        .dark-theme .search-result-item a:hover {
            background-color: #2d3748;
        }
        
        /* Стили для изображения результата */
        .search-result-image {
            width: 40px;
            height: 40px;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .search-result-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
        }
        
        /* Стили для информации о результате */
        .search-result-info {
            flex: 1;
        }
        
        .search-result-title {
            font-weight: 500;
            margin-bottom: 3px;
        }
        
        .search-result-category {
            font-size: 0.875rem;
            color: #6b7280;
        }
        
        .dark-theme .search-result-category {
            color: #9ca3af;
        }
        
        /* Стили для сообщения "не найдено" */
        .search-no-results {
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-weight: 500;
        }
        
        .dark-theme .search-no-results {
            color: #9ca3af;
        }
    `;
    
    document.head.appendChild(style);
}