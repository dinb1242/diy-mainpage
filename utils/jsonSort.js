function sortJson(data, key, type) {
    if (type == undefined) {
        type = "asc";
    }

    type = type.toLowerCase();
    
    return data.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        if (type == "desc") {
            return x > y ? -1 : x < y ? 1 : 0;
        } else if (type == "asc") {
            return x < y ? -1 : x > y ? 1 : 0;
        }
    });
};

export default sortJson;