function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function dynamicSortByFunctionName(functionName) {
    var sortOrder = 1;
    if(functionName[0] === "-") {
        sortOrder = -1;
        functionName = functionName.substr(1);
    }

    return function (a,b) {
        var result = (a[functionName]() < b[functionName]()) ? -1 : (a[functionName]() > b[functionName]()) ? 1 : 0;
        return result * sortOrder;
    }
}
module.exports.dynamicSortByFunctionName = dynamicSortByFunctionName;
