const modals = () => {

    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector), 
              windows = document.querySelectorAll('[data-modal]');
        
        function closeAllModal() {
            windows.forEach(window => {
                window.style.display = 'none';
                document.body.style.overflow = '';
            })
        };

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                closeAllModal();

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            });
        });

        close.addEventListener('click', () => {
            closeAllModal();
        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal && closeClickOverlay) {
                closeAllModal();
            }
        });
    };

    function showModalByTimer(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time)
    };  

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    // showModalByTimer('.popup', 60000);
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
};

export default modals;