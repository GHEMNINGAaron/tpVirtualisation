function getOffset(currentPage, listPerPage){
    return (currentPage - 1) * [listPerPage]
}

function emptyOrRows(rows){
    return !rows ? [] : rows;
}

module.exports = {
    getOffset,
    emptyOrRows
}