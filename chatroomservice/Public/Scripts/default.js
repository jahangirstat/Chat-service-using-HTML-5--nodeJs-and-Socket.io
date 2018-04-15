//$(document).ready(function () {
//            var socket;
//            $("#btnConnectUser").click(function () {
//                if ($('#txt').val().length == 0) {
//                    $(".errorUserEntry").show();
//                    return;
//                }
//                $('#topHead').hide();
//                $('#topNav').hide();
//                $("#connectedOption").hide();
//                $('#logo1').show();
//                $("#chatContainer").show();
//                socket = io.connect("http://localhost:8890");
//                socket.on("message", function (data) {
//                    $("#msg").append("<li><b>" + data.from + "</b>:" + data.content + "</li>");
//                });
//                socket.on('addimage', function (data) {
//                    console.log(data.content);
//                    var types = (data.content).toString().split(":")[1].split(";")[0];
//                    var imageType = /image.*/;
//                    if (types.match(imageType)) {
//                        $('#msg').append('<br/><b>' + data.from + ': </b>' +
//                            '<img width="120" height="120" style="border-radius:10px" src="' + data.content + '" />');
//                    }
//                    else {
//                        try {
//                            $('#msg').append('<br/><b>' + data.from + ': </b>' + '<a target="_blank" href="'
//                                + (data.content) +
//                            '">files:' + types + '</a>');
//                        }
//                        catch (ex) {
//                            console.log(ex.message);
//                        }
//                    }
//                    console.log(types);
//                })
//                socket.emit("adduser", $("#txt").val());
//                socket.on("updateUser", function (users) {
//                    $("#uselist").empty();
//                    for (var i = 0; i < users.length; i++) {
//                        $("#uselist").append("<li>" + users[i] + "</li>");
//                    }
//                })
//                $('#btnImageFile').on('change', function (e) {
//                    var file = e.originalEvent.target.files[0];
//                    var textType = /text.*/;
//                    var imageType = /image.*/;
//                    var reader = new FileReader();
//                    reader.onload = function (evt) {
//                        socket.emit('userImage', evt.target.result);
//                    };
//                    if (
//                        file.type.match(textType)) {
//                        reader.readAsText(file);
//                    }
//                    else if (file.type.match(imageType)) {
//                        reader.readAsDataURL(file);
//                    }
//                    else {}
//                })
//            });
//            $("#send").click(function () {
//                socket.emit("chat", $("#txt1").val());
//                $("#txt1").val('');
//                $("#txt1").focus();
//                return false;
//            });
//            $("#disconnect").click(function () {
//                socket.disconnect();
//                $("#chatContainer").hide();
//                $('#topHead').show();
//                $("#connectedOption").show();
//                #('#topNav').show();
//                $('#logo1').hide();
//                $("#txt").val('');
//                $("#txt").focus();
//				})
//        });