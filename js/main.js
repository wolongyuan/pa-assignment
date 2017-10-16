(function ($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);

})(jQuery); // End of use strict

var multiSlider = document.getElementById('slider-multi');
var sliderValue = document.getElementById('multi-value');

var $TABLE = $('#editable');
var $HIDDENTABLE = $('#hiddentable');
var rowCnt = 10;
var isFirstTime = true;

for (var i = 0; i <= 2.01; i = i + 0.1) {
    var opt = document.createElement('option');
    opt.innerHTML = i.toFixed(2);
    sliderValue.add(opt);
}
sliderValue.value = 1.0;

noUiSlider.create(multiSlider, {
    start: [1],
    step: 0.1,
    range: {
        'min': [0],
        'max': [2]
    }
});

multiSlider.noUiSlider.on('update', function (values, handle) {
    sliderValue.value = values[handle];
    multiTable(sliderValue.value);
});

function selectValue(select) {
    multiSlider.noUiSlider.set(select.value);
}

// operations on table
// add
$('.table-add').click(function () {
    rowCnt++;
    var $clone = $HIDDENTABLE.find('tr').clone(true);
    $clone.find('th').html(rowCnt);
    $TABLE.append($clone);
    drawChart();
});
// remove
$('.table-remove').click(function () {
    rowCnt--;
    $(this).parents('tr').detach();
    sortId();
    drawChart();
});
// move up
$('.table-up').click(function () {
    var $row = $(this).parents('tr');
    if ($row.index() === 0) return; // Don't go above the header
    $row.prev().before($row.get(0));
    sortId();
});
// move down
$('.table-down').click(function () {
    var $row = $(this).parents('tr');
    if ($row.index() === rowCnt - 1) return;
    $row.next().after($row.get(0));
    sortId();
});

function sortId() {
    $TABLE.find('tbody').find('th').html(function (index, oldhtml) {
        return index + 1;
    });
}

jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

function getData() {
    var $rows = $TABLE.find('tr');
    var headers = [];
    var data = [];
    // Get the headers (add special header logic here)
    var $th = $($rows.shift()).find('th');
    headers.push($th.eq(1).text());
    headers.push($th.eq(2).text());
    data.push(headers);
    // Turn all existing rows into a loopable array
    $rows.each(function () {
        var $td = $(this).find('td');
        var h = [];
        h.push(Number($td.eq(0).text()));
        h.push(Number($td.eq(1).text()));
        data.push(h);
    });

    return data;
}

var initData = getData();

function multiTable(factor) {
    if (factor > 1.05 || factor < 0.95) {
        var data = initData.map((row, i) => i > 0 ? row.map((item, j) => j > 0 ? parseFloat((item * factor).toFixed(2)) :
            item) : row);
        displayData(data);
    } else if (isFirstTime) {
        isFirstTime = false;
    } else {
        var data = initData.slice();
        displayData(data);
    }
}

google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

$('#focus-detect').focusout(function () {
    drawChart();
});

function drawChart() {
    var rawData = getData();
    var data = google.visualization.arrayToDataTable(rawData);
    var titles = rawData.shift();
    maxX = Math.max.apply(null, rawData.map(function (e) {
        return e[0]
    }));
    maxY = Math.max.apply(null, rawData.map(function (e) {
        return e[1]
    }));

    var options = {
        title: titles[0] + ' vs. ' + titles[1] + ' comparison',
        hAxis: {
            title: titles[0],
            minValue: 0,
            maxValue: maxX
        },
        vAxis: {
            title: titles[1],
            minValue: 0,
            maxValue: maxY
        },
        legend: 'none'
    };
    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}

// upload file
$('form#form-upload').on('submit', function (e) {
    var fileData = $('#input-upload').prop('files')[0];
    var formData = new FormData();
    formData.append('file', fileData);
    $.ajax({
        url: "upload.php",
        type: "POST",
        dataType: 'json',
        data: formData,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            // hide the declare message
            $('#declare').hide();
            // display new data
            displayData(data['data'].slice(), true);
            // set value for initData
            initData = data['data'];
            // reset value for slider
            isFirstTime=true;
            multiSlider.noUiSlider.set(1.0);
        },
        error: function () {
            console.log(arguments);
        }
    });
    e.preventDefault();
});

// display uploaded file
function displayData(data, includeHeaders = false) {
    // remove all table body
    $TABLE.find('tbody tr').detach();

    // modify the table head
    var headers = data.shift();

    if (includeHeaders) {
        var $th = $TABLE.find('thead th');
        $th.eq(1).html(headers[0]);
        $th.eq(2).html(headers[1]);
    }

    // append the table body
    rowCnt = 0;
    data.forEach(function (row) {
        rowCnt++;
        var $clone = $HIDDENTABLE.find('tr').clone(true);
        $clone.find('th').html(rowCnt);
        var $td = $clone.find('td');
        $td.eq(0).html(row[0]);
        $td.eq(1).html(row[1]);
        $TABLE.append($clone);
    }, this);

    // replot
    drawChart();
}

// download excel file
function downloadFile() {
    $.ajax({
        url: 'download.php',
        type: 'POST',
        dataType: "text",
        data: {
            tableContent: getData()
        },
        success: function (response) {
            window.open(response, 'Download');
        },
        error: function () {
            console.log(arguments);
        }
    });
}