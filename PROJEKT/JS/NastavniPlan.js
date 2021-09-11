var allClassesEndPoint = "http://www.fulek.com/VUA/SUPIT/GetNastavniPlan";
var detailedInformationEndpoint = "http://www.fulek.com/VUA/supit/GetKolegij/";
var head = '<tr><th>Kolegij</th><th>ECTS</th><th>Sati</th><th>P</th><th>V</th><th>Tip</th></tr>';
var ectsUkupno = 0;
var satiUkupno = 0;
var foot = '<tr><td>Ukupno</td><td id="ectsUkupno2">' + ectsUkupno + '</td><td id="satiUkupno2">' + satiUkupno + '</td></tr>'


$.getJSON(allClassesEndPoint, function (data) {

    var podaci = [];    
    for (var i = 0, len = data.length; i < len; i++) {
        podaci.push({ "label": data[i].label, "value": data[i].value })
    };

    $("#upisi").autocomplete({
        minLength: 1,
        source: podaci,
        select: function (event, ui) {
            event.preventDefault();
            $(this).val(ui.item.label);
            $("#upisiID").val(ui.item.value);
        }    
    });

    $("#dodaj").one('click', function () {
        $('thead').append(head);
        $('tfoot').append(foot);
    });

    $("#dodaj").click(function () {
        var detailedEndPoint = detailedInformationEndpoint + $("#upisiID").val();
        $.getJSON(detailedEndPoint, function (classInfo) {
            $('tbody').append(`<tr id="red" class="item"><td>${classInfo.kolegij}</td><td class="ectsBroj">${classInfo.ects}</td><td class="satiBroj">${classInfo.sati}</td><td>${classInfo.predavanja}</td><td>${classInfo.predavanja}</td><td>${classInfo.tip}</td>
            <td><button class="obrisi">X</button></td></tr>`)
            ectsUkupno += classInfo.ects;
            satiUkupno += classInfo.sati;
            $("#ectsUkupno2").empty();
            $("#ectsUkupno2").append(ectsUkupno)
            $("#satiUkupno2").empty();
            $("#satiUkupno2").append(satiUkupno)

        });
    });

    $(document).on('click', '.obrisi', function () {
        var detailedEndPoint = detailedInformationEndpoint + $("#upisiID").val();
        $.getJSON(detailedEndPoint, function (classInfo) {
            ectsUkupno -= classInfo.ects;
            satiUkupno -= classInfo.sati;
            $("#ectsUkupno2").empty();
            $("#ectsUkupno2").append(ectsUkupno)
            $("#satiUkupno2").empty();
            $("#satiUkupno2").append(satiUkupno)
        });
        $(this).parents('tr').remove();
    });

});