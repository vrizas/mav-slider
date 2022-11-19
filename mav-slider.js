function MavSlider(options) {
    const defaultStyling = {
        color: '#191919',
        slideWidth: '400px',  
    }
    const defaultConfig = {
        container: '#mavSlider',
        offset: 1,
        dotSize: 4,
        dotIndicator: true,
        skeleton: true,
        arrowPrev: `
        <svg xmlns='http://www.w3.org/2000/svg' height='16px' viewBox='0 0 24 24' width='16px' fill='${defaultStyling.color}'>
            <path d='M0 0h24v24H0V0z' fill='none' opacity='.87' />
            <path d='M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z'/>
        </svg>
        `,
        arrowNext: `
        <svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='16px' viewBox='0 0 24 24' width='16px' fill='${defaultStyling.color}'>
            <g><path d='M0,0h24v24H0V0z' fill='none' /></g>
            <g>
                <polygon points='6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12'/>
            </g>
        </svg>
        `,
        ajax: {},
    }

    const settings = { ...defaultStyling, ...defaultConfig, ...options, slideHeight: options ? options.slideHeight : null || options ? options.slideWidth : null || defaultStyling.slideWidth };

    const _this = this;
    const mavSlider = document.querySelector(settings.container);

    this.init = function () {
        const slideId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        mavSlider.classList.add('mavSlider', `mavSlider-${slideId}`);

        this.createContent();

        if(settings.ajax.url) {
            this.ajax(slideId);
        } else {
            this.styling(slideId);
            this.defineHandler();
        }
    }

    this.createContent = () => {
        let mavSliderContent = '';
        let slidesContent = '';
        let dotsContent = '';

        Array.prototype.forEach.call(mavSlider.children, element => {
            if (element.tagName === 'IMG') {
                const image = element.outerHTML;
                slidesContent += `
                <div class="mavSlider__slide">
                    ${image}
                </div>
                `;
                
                dotsContent += `
                <div class="mavSlider__dot">
                    ${image}
                </div>
                `;
            }
        });

        mavSliderContent = `
        <div class="mavSlider__slides">
            ${slidesContent}
        </div>
        <div class="mavSlider__controller">
            <div class="mavSlider__dots">
                ${dotsContent}
            </div>
            <button class="mavSlider__action prev" data-mavslider-button="prev">
                ${settings.arrowPrev}
            </button>
            <button class="mavSlider__action next" data-mavslider-button="next">
                ${settings.arrowNext}
            </button>
        </div>
        `;

        mavSlider.innerHTML = mavSliderContent;
    }

    this.styling = (sliderId) => {
        const firstSlide = mavSlider.querySelector('.mavSlider__slide');
        const firstDot = mavSlider.querySelectorAll('.mavSlider__dot')[0];
        const lastDot = mavSlider.querySelectorAll('.mavSlider__dot')[settings.dotSize - 1] || mavSlider.querySelectorAll('.mavSlider__dot')[mavSlider.querySelectorAll('.mavSlider__dot').length - 1];
        
        let css = `
            @media only screen and (min-width: ${settings.slideWidth}) {
                .mavSlider.mavSlider-${sliderId} {
                    width: ${settings.slideWidth};
                }

                .mavSlider-${sliderId} .mavSlider__slide img {
                    width: ${settings.slideWidth};
                }
            }
        `;
        
        const style = document.createElement('style');
        
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    
        document.querySelector('head').appendChild(style);

        if (settings.skeleton) {
            const images = mavSlider.querySelectorAll('img');
            images.forEach((image) => {
                image.classList.add('skeleton');
            });
        }

        const slides = mavSlider.querySelectorAll('.mavSlider__slide');
        slides.forEach((slide) => {
            slide.style.height = settings.slideHeight;
        });

        const dotImages = mavSlider.querySelectorAll('.mavSlider__dot img');
        dotImages.forEach((dotImage) => {
            dotImage.style.width = `calc((${settings.slideWidth} / ${settings.dotSize}) - 8px)`;
            dotImage.style.height = `calc((${settings.slideWidth} / ${settings.dotSize}) - 8px)`;
        });

        firstSlide.dataset.mavsliderSlideActive = true;
        firstDot.dataset.mavsliderDotActive = true;
        lastDot.dataset.mavsliderLastDot = true;
        if (settings.dotIndicator) firstDot.querySelector('img').style.border = `3px solid ${settings.color}`;

        const mavSliderActions = mavSlider.querySelectorAll('[data-mavslider-button]');
        mavSliderActions.forEach((action) => {
            const arrow = action.children[0].getBoundingClientRect();

            action.style.width = (arrow.width * 2) + 'px';
            action.style.height = (arrow.height * 2) + 'px';

            if (settings.dotSize >= mavSlider.querySelectorAll('.mavSlider__dot').length) {
                action.style.display = 'none';
                action.setAttribute('tab-index', '-1');
            }
        });
    } 

    this.defineHandler = () => {
        const dots = mavSlider.querySelectorAll('.mavSlider__dot');
        dots.forEach((dot) => {
            dot.addEventListener('mouseover', () => {
                const activeSlide = mavSlider.querySelector('[data-mavslider-slide-active');
                delete activeSlide.dataset.mavsliderSlideActive;

                const selectedDotIndex = [...mavSlider.querySelectorAll('.mavSlider__dot')].indexOf(dot);
            
                mavSlider.querySelectorAll('.mavSlider__slide')[selectedDotIndex].dataset.mavsliderSlideActive = true;
                
               mavSlider.querySelector('.mavSlider__slide').style.marginLeft = `${selectedDotIndex * -20}%`;
                
                const activeDot = mavSlider.querySelector('[data-mavslider-dot-active');
                if (settings.dotIndicator) activeDot.querySelector('img').style.border = '';
                delete activeDot.dataset.mavsliderDotActive;
            
                if (settings.dotIndicator) dot.querySelector('img').style.border = `3px solid ${settings.color}`;
                dot.dataset.mavsliderDotActive = true;
            });
        });
        
        const mavSliderActions = mavSlider.querySelectorAll('[data-mavslider-button]');
        mavSliderActions.forEach((action) => {
            action.addEventListener('click', () => {
                let offset = action.dataset.mavsliderButton === 'next' ? settings.offset : -settings.offset;
                const imageWidth = mavSlider.querySelector('.mavSlider__slide img').offsetWidth;
                const dotWidth = action.dataset.mavsliderButton === 'next' ? -(imageWidth / settings.dotSize) : (imageWidth / settings.dotSize);
                const dotSize = settings.dotSize;
                const dots = mavSlider.querySelectorAll('.mavSlider__dot');
                const lastDot = mavSlider.querySelector('[data-mavslider-last-dot]');
                const lastDotIndex = [...mavSlider.querySelectorAll('.mavSlider__dot')].indexOf(lastDot);
                let newIndex = lastDotIndex + offset;
            
                if (newIndex < dotSize - 1) {
                    lastDotIndex === dotSize - 1 ? newIndex = dots.length - 1 : newIndex = dotSize - 1;
                }
                if (newIndex >= dots.length) {
                    lastDotIndex === dots.length - 1 ? newIndex = dotSize - 1 : newIndex = dots.length - 1
                }

                offset = action.dataset.mavsliderButton === 'next' ? 1 : -1;
            
                delete lastDot.dataset.mavsliderLastDot;
                dots[newIndex].dataset.mavsliderLastDot = true;

                dots[0].style.marginLeft = `${(newIndex - dotSize + 1) * offset * dotWidth}px`;
            });
        });
    }

    this.ajax = async (slideId) => {
        const ajaxConfig = {};

        if (settings.ajax.type) ajaxConfig.method = settings.ajax.type;
        if (settings.ajax.data) ajaxConfig.body = JSON.stringify(settings.ajax.data);

        const ajaxMethod = {
            beforeSend: function() {
                if (settings.ajax.beforeSend) settings.ajax.beforeSend;
                
                if (settings.skeleton) {
                    const slidesContainer = mavSlider.querySelector('.mavSlider__slides');
                    const dotsContainer = mavSlider.querySelector('.mavSlider__dots');

                    slidesContainer.innerHTML = '';
                    dotsContainer.innerHTML = '';

                    slidesContainer.insertAdjacentHTML('afterbegin', `
                    <div class='mavSlider__slide'>
                        <img />
                    </div>     
                    `);
                    for (let i = 0; i < settings.dotSize - 1; i++) {
                        dotsContainer.insertAdjacentHTML('afterbegin', `
                        <div class='mavSlider__dot'>
                            <img />
                        </div>     
                        `);
                    }

                    _this.styling(slideId);
                }
            },
            success: function(response) {
                if (response.constructor != Array) {
                    throw new Error('response must be an array!')
                }

                if (!settings.ajax.srcImgLocator) {
                    throw new Error('srcImgLocator is undefined')
                }
                const slidesContainer = mavSlider.querySelector('.mavSlider__slides');
                const dotsContainer = mavSlider.querySelector('.mavSlider__dots');

                slidesContainer.innerHTML = '';
                dotsContainer.innerHTML = '';
                
                response.forEach((data) => {
                    slidesContainer.insertAdjacentHTML('afterbegin', `
                    <div class='mavSlider__slide'>
                        <img src="${data[settings.ajax.srcImgLocator]}" />
                    </div>     
                    `);
                    dotsContainer.insertAdjacentHTML('afterbegin', `
                    <div class='mavSlider__dot'>
                        <img src="${data[settings.ajax.srcImgLocator]}" />
                    </div> 
                    `); 
                });

                _this.styling(slideId);
                _this.defineHandler();
            },
            complete: function() {} || settings.ajax.complete,
        };

        function getImages() {
            ajaxMethod.beforeSend;
            return fetch.apply(this, arguments);
        }

        const response = await getImages(settings.ajax.url, ajaxConfig);
        const responseJson = await response.json()
        
        ajaxMethod.success(responseJson);
        ajaxMethod.complete;
    }

    this.init();
}

module.exports = MavSlider;