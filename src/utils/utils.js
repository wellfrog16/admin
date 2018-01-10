const utils = {
    delay(times) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, times);
        });
    }
};

export default utils;
