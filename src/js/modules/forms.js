import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          windows = document.querySelectorAll('[data-modal]');

    function closeAllModal() {
        windows.forEach(window => {
            window.style.display = 'none';
            document.body.style.overflow = '';
        })
    };
          
    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Пожалуйста, подождите!', 
        success: 'Спасибо! Скоро мы с вами свяжемся!', 
        error: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }, 
            body: data
        });

        return await res.text();
    };

    const cleaerInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.error)
                .finally(() => {
                    cleaerInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        closeAllModal();
                    }, 2000);
                });
        });
    });
};

export default forms;