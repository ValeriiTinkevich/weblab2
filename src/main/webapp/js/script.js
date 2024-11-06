function updateDateTime() {
    const now = new Date();

    const options = {
        timeZoneName: 'short'
    };

    const currentDateTime = now.toLocaleString(undefined, options);

    document.querySelector('#datetime').textContent = currentDateTime;
}

updateDateTime();
setInterval(updateDateTime, 1000);


var input = document.getElementById("xInput");
var errorTxt = document.getElementById("errorMessage");
const submitButton = document.getElementById("submitButton");

input.addEventListener("input", event => {
    const isValid = validateText(input.value);


    errorTxt.textContent = isValid ? "" : "Invalid input. Please enter a number between -5 and 3.";
    errorTxt.style.display = isValid ? "none" : "block";
    input.setCustomValidity(isValid ? "" : "Error");

    submitButton.disabled = !isValid;
});


function validateText(value) {
    return !isNaN(value) && value >= -5 && value <= 3;
}


$(document).ready(function () {

    let radio = 1;
    let pointsByR = {};
    let board = JXG.JSXGraph.initBoard("jxgbox", {
        boundingbox: [-6, 6, 6, -6],
        axis: true,
        defaultAxes: {
            x: {
                ticks: {
                    color: 'red',
                    drawZero: true,
                    label: {
                        color: 'red',
                        drawZero: true
                    }
                }
            },
            y: {
                ticks: {
                    color: 'red',
                    label: {
                        color: 'red'
                    }
                }
            }
        }
    });

    let graph1, graph2, graph3, i1, i2, i3;


    function redrawGraphs() {


        if (graph1) board.removeObject(graph1);
        if (i1) board.removeObject(i1);
        if (graph2) board.removeObject(graph2);
        if (i2) board.removeObject(i2);
        if (graph3) board.removeObject(graph3);
        if (i3) board.removeObject(i3);

        graph1 = board.create('functiongraph', [function (x) {
            return x + (radio / 2);
        }, -(radio / 2), 0]);

        i1 = board.create('integral', [[-(radio / 2), 0], graph1], {
            label: {visible: false},
            curveLeft: {
                visible: false
            },
            curveRight: {
                visible: false
            },
            baseRight: {
                visible: false
            },
            baseLeft: {
                visible: false
            },
            fillColor: 'blue',
        });

        graph2 = board.create('functiongraph', [function (x) {
            return -radio / 2
        }, -radio, 0]);
        i2 = board.create('integral', [[-radio, 0], graph2], {
            label: {visible: false},
            curveLeft: {
                visible: false
            },
            curveRight: {
                visible: false
            },
            baseRight: {
                visible: false
            },
            baseLeft: {
                visible: false
            },
            fillColor: 'blue',
        });

        graph3 = board.create('functiongraph', [function (x) {
            return Math.sqrt(radio * radio - x * x);
        }, 0, radio]);
        i3 = board.create('integral', [[0, radio], graph3], {
            label: {visible: false},
            curveLeft: {
                visible: false
            },
            curveRight: {
                visible: false
            },
            baseRight: {
                visible: false
            },
            baseLeft: {
                visible: false
            },
            fillColor: 'blue',
        });
        for (let r in pointsByR) {
            pointsByR[r].forEach(point => point.setAttribute({visible: false}));
        }


        if (pointsByR[radio]) {
            pointsByR[radio].forEach(point => point.setAttribute({visible: true}));
        }
    }


    redrawGraphs();

    $.ajax({
        url: "/controller",
        type: 'GET',
        success: function (response) {

            response.forEach(data => {
                const {x, y, r} = data;
                if (!pointsByR[r]) pointsByR[r] = [];


                if (!pointExists(x, y)) {
                    let point = board.create('point', [x, y], {
                        color: 'purple',
                        label: {visible: false}
                    });
                    pointsByR[r].push(point);
                    console.log(`Loaded point at: (${x}, ${y}) for radio: ${r}`);
                }
            });


            redrawGraphs();
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch points: ", error);
        }
    });

    $(".radioR").on("change", function () {
        radio = parseFloat($(this).val());
        redrawGraphs();
    });

    function pointExists(x, y) {
        if (!pointsByR[radio]) return false;

        for (let point of pointsByR[radio]) {
            if (Math.abs(point.X() - x) < 0.0001 && Math.abs(point.Y() - y) < 0.0001) {
                console.log(`Point exists at: (${point.X()}, ${point.Y()})`);
                return true;
            }
        }
        console.log(`No existing point found for: (${x}, ${y})`);
        return false;
    }


    var getMouseCoords = function (e, i) {
        var pos = board.getMousePosition(e, i);
        return new JXG.Coords(JXG.COORDS_BY_SCREEN, pos, board);
    }
    var handleDown = function (e) {
        var canCreate = true,
            i, coords;

        if (e[JXG.touchProperty]) {
            i = 0;
        }
        coords = getMouseCoords(e, i);


        if (pointExists(coords.usrCoords[1], coords.usrCoords[2])) {
            console.log(`Point already exists at: (${coords.usrCoords[1]}, ${coords.usrCoords[2]}), not sending request.`);
            return;
        }


        $.ajax({
            url: `/controller?x=${coords.usrCoords[1]}&y=${coords.usrCoords[2]}&r=${radio}`,
            type: "POST",
            success: function (response) {

                let point = board.create('point', [coords.usrCoords[1], coords.usrCoords[2]], {
                    color: 'purple',
                    label: {visible: false}
                })
                console.log("Point confirmed by server:", response);
                if (!pointsByR[radio]) pointsByR[radio] = [];
                pointsByR[radio].push(point);
                console.log(`Point added to pointsByR at (${coords.usrCoords[1]}, ${coords.usrCoords[2]}) for radio: ${radio}`);
            },
            error: function (xhr, status, error) {
                console.error("Failed to send point to server:", error);


                board.removeObject(point);
            }
        });
    };

    board.on('down', handleDown);

    $('#submitButton').click(function () {
        const x = $('#xInput').val();
        const yValues = [];
        $('input[name="checkbox"]:checked').each(function () {
            yValues.push($(this).val());
        });
        const r = $('input[name="R"]:checked').val();

        if (!x || yValues.length === 0 || !r) {
            $('#errorMessage').text('Please fill in all fields.').css('display', 'block');
            return;
        } else {
            $('#errorMessage').hide();
        }

        yValues.forEach(y => {
            const url = `/controller?x=${x}&y=${y}&r=${r}`;

            $.ajax({
                url: url,
                type: 'POST',
                success: function (response) {
                    console.log(response);
                    let x = response.x;
                    let y = response.y;
                    console.log(x, y);
                    let radio = response.r;


                    if (!pointExists(x, y)) {
                        var point = board.create('point', [x, y], {
                            color: 'purple',
                            label: {visible: false}
                        });
                        if (!pointsByR[radio]) pointsByR[radio] = [];
                        pointsByR[radio].push(point);
                        console.log(`Point created at: (${x}, ${y})`);
                    } else {
                        console.log(`Point at (${x}, ${y}) already exists, not creating.`);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Request failed: ", error);
                }
            });
        });
    });
});
