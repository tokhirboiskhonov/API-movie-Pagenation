const findElement = (selector, node = document) => {
    return node.querySelector(selector);
}

function normalizeDate (dateFormat) {

    let date = new Date (dateFormat);
    let day = String(date.getDate()).padStart(2, 0);
    let month = String(date.getMonth() + 1).padStart(2, 0);
    let year = String(date.getFullYear()).padStart(2, 0);

    return (day + '.' + month + '.' + year);
}