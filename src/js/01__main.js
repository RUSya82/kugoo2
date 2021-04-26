'use strict';

window, addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.header__burger'),
        menu = document.querySelector('.header__nav'),
        links = document.querySelector('.header__menu'),
        close = document.querySelector('.close');

    function openModal() {
        menu.classList.add('show');
        menu.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        menu.classList.remove('show');
        document.body.style.overflow = '';
    }

    burgerMenu.addEventListener('click', openModal);
    close.addEventListener('click', closeModal);
    links.addEventListener('click', closeModal);

    document.addEventListener('click', (e) => {
        if (e.target === menu) {
            closeModal();
        }
    });

    function animateMarquee(el, duration) {
        const innerEl = el.querySelector('.marquee__inner');
        const innerWidth = innerEl.offsetWidth;
        const cloneEl = innerEl.cloneNode(true);
        el.appendChild(cloneEl);

        let start = performance.now();
        let progress;
        let translateX;

        requestAnimationFrame(function step(now) {
            progress = (now - start) / duration;

            if (progress > 1) {
                progress %= 1;
                start = now;
            }

            translateX = innerWidth * progress;

            innerEl.style.transform = `translate3d(-${translateX}px, 0 , 0)`;
            cloneEl.style.transform = `translate3d(-${translateX}px, 0 , 0)`;
            requestAnimationFrame(step);
        });
    }

    const marquee1 = document.querySelector('#marquee1');

    animateMarquee(marquee1, 15000);

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}`);
        }

        return await res.json();
    };

    class Product {
        constructor(id, img, alt, title, subtitle, price, priceOld, text, credit, characteristics, orderFirst, orderLast, perentSelector) {
            this.id = id;
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.subtitle = subtitle;
            this.perent = document.querySelector(perentSelector);
            this.price = price;
            this.priceOld = priceOld;
            this.text = text;
            this.credit = credit;
            this.orderFirst = orderFirst;
            this.orderLast = orderLast;
            this.characteristics = characteristics;
        }


        render() {
            const element = document.createElement('div');
            element.classList.add('kugoo');

            element.innerHTML = `
          <div class="product__box" id=${this.id}>
            <div class="container">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-6 ${this.orderLast} col-xl-6 col-xxl-6">
                        <div class="product__block">
                            <img src=${this.img} alt=${this.alt} class="product__image">
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-6 ${this.orderFirst} col-xl-6 col-xxl-6">
                        <div class="product__info">
                            <h4 class="product__title">${this.title}</h4>
                            <span class="product__subtitle">${this.subtitle}</span>
                            <div class="product__page">
                                <span class="product__price">${this.price}</span>
                                <s class="product__price-old">${this.priceOld}</s>
                            </div>
                            <div class="product__characteristic">
                                <ul class="product__information">
                                    <li class="li product__desc">Вес: <span>${this.characteristics.weight}</span></li>
                                    <li class="li product__desc">Время зарядки: <span>${this.characteristics.chargingTime}</span></li>
                                    <li class="li product__desc">Дальность хода: <span>${this.characteristics.travelRange}</span></li>
                                    <li class="li product__desc">Мах. скорость: <span>${this.characteristics.machSpeed}/ч</span></li>
                                    <li class="li product__desc">Мах. нагрузка: <span>${this.characteristics.machLoad}</span></li>
                                    <li class="li product__desc">Диаметр колёс: <span>${this.characteristics.wheelDiameter}</span></li>
                                    <li class="li product__desc">Мощность мотора: <span>${this.characteristics.motorPower}</span></li>
                                    <li class="li product__desc">Ёмкость аккумулятора:  <span>${this.characteristics.batteryCapacity}</span></li>
                                    <li class="li product__desc">Опции: <span>${this.characteristics.options}</span></li>
                                </ul>
                            </div>
                            <div class="product__aside">
                                <p class="product__text"><strong>${this.title}</strong>${this.text}</p>
                            </div>
                            <div class="product__holder">
                                <button class="product__credit" data-subtitle="${this.title}" data-image="${this.img}" data-alt="${this.alt}" data-bs-toggle="modal" data-price="${this.credit}" data-bs-target="#exampleModalCredit" onclick="ym(76080295,'reachGoal','credit')";>В расрочку — от ${this.credit}</button>
                                <button class="button" data-bs-toggle="modal" data-subtitle="${this.title}" data-price="${this.price}" data-image="${this.img}"  data-alt="${this.alt}" data-bs-target="#exampleModalCheckout" onclick="ym(76080295,'reachGoal','buy')";>Купить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `;
            this.perent.append(element);
        }
    }

    //getResource(`http://localhost:3000/product`)
    getResource(`http://${window.location.hostname}/db.json`)
        .then(data => {
            data['product'].forEach(({id, img, alt, title, subtitle, price, priceOld, text, credit, characteristics, orderFirst, orderLast}) => {
                new Product(id, img, alt, title, subtitle, price, priceOld, text, credit, characteristics, orderFirst, orderLast, '.product').render();
            });
        });

    //getResource(`http://localhost:3000/expensive`)
    getResource(`http://${window.location.hostname}/db.json`)
        .then(data=> {
            data['expensive'] .forEach(({id, img, alt, title, subtitle, price, priceOld, text, credit, characteristics, orderFirst, orderLast}) => {
                new Product(id, img, alt, title, subtitle, price, priceOld, text, credit, characteristics, orderFirst, orderLast, '.expensive').render();
            });
        });


});