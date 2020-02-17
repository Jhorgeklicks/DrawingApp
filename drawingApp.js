$(document).ready(function () {
    $("#slider").slider({
        min: 2,
        max: 30,
        slide: function (event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
        }
    });



    // set painting or not
    var painting = false;
    // set painting or erazing
    var paint_or_eraze = "painting";
    // grabing the canvas id
    var canvas = document.getElementById("paint");
    // grabbing the canvax into the context variable
    var context = canvas.getContext("2d");
    // get the canvas container
    var container = $("#container");

    // mouse positioning
    var mouse = {
        x: 0,
        y: 0
    };

    // onload saved work from localStorage
    if (localStorage.getItem("imagecanvas") != null) {
        var img = new Image();
        img.onload = function () {
            context.drawImage(img, 0, 0);
        };
        img.src = localStorage.getItem("imagecanvas");
    }

    // set up the drawing parameters [ lineCap , lineWidth & lineJoin]
    context.lineWidth = 9;
    context.lineCap = "round";
    context.lineJoin = "round";

    // click inside the container
    container.mousedown(function (e) {
        painting = true;
        context.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;

        context.moveTo(mouse.x, mouse.y);



        // move the mouse while holding the mouse key
        container.mousemove(function (e) {
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;

            if (painting == true) {
                if (paint_or_eraze == "painting") {
                    // choose the color 
                    context.strokeStyle = $("#paintcolor").val();
                } else {
                    // this means we are erazing 
                    //set a white color for the erazer
                    $("#paint").css('cursor', "cell");
                    context.strokeStyle = "white";
                }
                // draw the line
                context.lineTo(mouse.x, mouse.y);
                context.stroke();
            }
        }); // mm ends here


        // stops the draw when the mouse up
        container.mouseup(function () {
            painting = false;
        });

        // stop drawing when the mouse leaves the container
        container.mouseleave(function () {
            painting = false;
        })

    });

    $("#reset").click(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        paint_or_eraze = "painting";
        $("#erase").removeClass("eraseMode");
        $("#paint").css('cursor', "crosshair");
    });

    $("#save").click(function () {
        if (typeof (localStorage) != null) {
            localStorage.setItem("imagecanvas", canvas.toDataURL());
        } else {
            alert("browser does not support localStorage");
        }
    });

    $("#erase").click(function () {
        if (paint_or_eraze == "painting") {
            paint_or_eraze = "erase";

        } else {
            paint_or_eraze == "painting";
        };
    });
    $("#erase").click(function () {
        $(this).toggleClass("eraseMode");
    });
    // change color input
    $("#paintcolor").change(function () {
        var col = $("#circle").css("background", $(this).val());
    });
    // setting the line width of the drawing stick
    $("#slider").slider({
        min: 2,
        max: 30,
        slide: function (event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value;
        }
    });

});









// var canvas = document.getElementById("paint");
//    var context = canvas.getContext('2d');


//  // draw a line
//    // set the begin pathinfo
//    context.beginPath();
//    // set the width of the line
//    context.lineWidth = 20;
//    // set the line color
//    context.strokeStyle = "teal";
//    //set cap to the line [ round, box ,butt]
//    context.lineCap = "round";
//    //set the line join style [ round, bevel, miter]
//    context.lineJoin = "round";
//    // set the position of the point
//    context.moveTo(50, 50);
//    // draw a straight line to the next position
//    context.lineTo(150, 150);
//    // draw another line
//    context.lineTo(10, 250)
//
//    // set the line visible
//    context.stroke();
