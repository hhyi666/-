//获取时间的函数
export const getTime = () => {
    //通过内置的构造函数Date解决
    let hour = new Date().getHours();
    let message = '';
    if (hour <= 9) {
        message = '早上';
    }
    else if (hour <= 14) {
        message = '上午';
    }
    else if (hour <= 18) {
        message = '下午';
    }
    else {
        message = '晚上';
    }
    return message;
};
