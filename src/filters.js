angular.module('oi.select')

.filter('oiSelectGroup', ['$sce', function($sce) {
    return function(label) {
        return $sce.getTrustedHtml(label);
    };
}])

.filter('oiSelectCloseIcon', ['$sce', function($sce) {
    return function(label) {
        var closeIcon = '<span class="close select-search-list-item_selection-remove">×</span>';

        return $sce.getTrustedHtml(label + closeIcon);
    };
}])

.filter('oiSelectHighlight', ['$sce', 'oiSelectEscape', function($sce, oiSelectEscape) {
    return function(label, query) {
        var html;

        if (label && (query.length > 0 || angular.isNumber(query))) {
            label = label.toString();
            query = oiSelectEscape(query.toString());

            html = label.replace(new RegExp(query, 'gi'), '<strong>$&</strong>');
        } else {
            html = label;
        }

        return $sce.getTrustedHtml(html);
    };
}])

.filter('oiSelectAscSort', ['oiSelectEscape', function(oiSelectEscape) {
    function ascSort(input, query, getLabel, options) {
        var i, j, isFound, output, output1 = [], output2 = [], output3 = [], output4 = [];

        if (query) {
            query = oiSelectEscape(String(query));

            for (i = 0, isFound = false; i < input.length; i++) {
                isFound = getLabel(input[i]).match(new RegExp(query, "i"));

                if (!isFound && options && (options.length || options.fields)) {
                    for (j = 0; j < options.length; j++) {
                        if (isFound) break;

                        isFound = String(input[i][options[j]]).match(new RegExp(query, "i"));
                    }
                }

                if (isFound) {
                    output1.push(input[i]);
                }
            }
            for (i = 0; i < output1.length; i++) {
                if (getLabel(output1[i]).match(new RegExp('^' + query, "i"))) {
                    output2.push(output1[i]);
                } else {
                    output3.push(output1[i]);
                }
            }
            output = output2.concat(output3);

            if (options && (options === true || options.all)) {
                inputLabel: for (i = 0; i < input.length; i++) {
                    for (j = 0; j < output.length; j++) {
                        if (input[i] === output[j]) {
                            continue inputLabel;
                        }
                    }
                    output4.push(input[i]);
                }
                output = output.concat(output4);
            }
        } else {
            output = [].concat(input);
        }

        return output;
    }

    return ascSort;
}])

.filter('none', function() {
    return function(input) {
        return input;
    };
});
