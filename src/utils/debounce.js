export const debounceFunction = (func, delay) => {
    let timer;
    return function () {
        let self = this;
        let args = arguments;

        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(self, args)
        }, delay)
    }
}
