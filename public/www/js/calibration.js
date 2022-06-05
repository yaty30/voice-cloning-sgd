var PointCalibrate = 0;
var CalibrationPoints = {};
var calibrated = false;
const words = [
	"Good Morning",
	"Good Afternoon",
	"YES", "NO"
]

/**
 * Clear the canvas and the calibration button.
 */
function ClearCanvas() {
	// $(".Calibration").hide();
	var canvas = document.getElementById("plotting_canvas");
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Show the instruction of using calibration at the start up screen.
 */
function PopUpInstruction() {
	ClearCanvas();
	swal({
		title: "Calibration",
		text: "Please click on each of the 9 points on the screen. You must click on each point 5 times till it goes yellow. This will calibrate your eye movements.\n\n *The data of your facial recognition and eye tracking will be collected and stored for further study use.",
		buttons: {
			cancel: false,
			confirm: true
		}
	}).then(isConfirm => {
		ShowCalibrationPoint();
	});

}
/**
  * Show the help instructions right at the start.
  */
function helpModalShow() {
	$('#helpModal').modal('show');
}

// function updatePosition(e) {
// 	const style = $("#webgazerGazeDot")
// 	var slideTransform = $('#webgazerGazeDot').attr('style').split(';');
// 	slideTransform = $.map(slideTransform, function (style) {
// 		style = style.trim();
// 		if (style.startsWith('transform:translate3d')) {
// 			var match = style.match(/transform:translate3d\((.+)px,(.+)px,(.+)px\)/);
// 			var value = parseInt(match[1]);
// 			var newValue = value + 100;
// 			console.log(newValue);
// 			return 'transform:translate3d(' + newValue + 'px, 0px, 0px)';
// 		}
// 		return style;
// 	});

// 	var len = slideTransform.length
// 	var res = slideTransform[len - 2].match(/\(([^)]+)\)/)[1]
// 	var resArr = res.split(", ").map(x => x.replaceAll("px", ""))

// 	// console.log(resArr)

// 	$("#pointX").html(resArr[0])
// 	$("#pointY").html(resArr[1])

// 	return true
// }

function getPosition(id) {
	let el = document.getElementById(id)
	let rect = el.getBoundingClientRect();

	return {
		x: [rect.left + window.scrollX, rect.left + window.scrollX + rect.width],
		y: [rect.top + window.scrollY, rect.top + window.scrollY + rect.height]
	}
}

let x, y = 0

let btn0x, btn0y, btn1x, btn1y,
	btn2x, btn2y, btn3x, btn3y = undefined

let over = false
let hoverIndex = -1

const collectButtonPosition = () => {
	btn0x = getPosition("btn_0").x
	btn0y = getPosition("btn_0").y

	btn1x = getPosition("btn_1").x
	btn1y = getPosition("btn_1").y

	btn2x = getPosition("btn_2").x
	btn2y = getPosition("btn_2").y

	btn3x = getPosition("btn_3").x
	btn3y = getPosition("btn_3").y

	console.log(btn3x)
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function postToServer(requestURL, body) {
	$.ajax({
		url: requestURL,
		data: JSON.stringify(body),
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success: function (returnData) {
			console.log(returnData);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log(xhr.status);
			console.log(thrownError);
		}
	}).then(() =>
		$("#fetchHistory").text("1")
	);
}

function getFromServer(requestURL) {
	return $.ajax({
		url: requestURL,
		type: 'GET',
		dataType: 'json',
		success: function (res) {
			return res
		}
	});
}

let markers = [false, false, false, false]
let marker = -1
let counter = 0

const setCounter = (status) => {
	counter <= 4 && status ? counter += 0.5 : counter = 0
}

const setSelectedButton = (i) => {
	$("#selectedButtonWord").html(words[i])
	$("#selectedButtonIndex").html(i)
}

function comparePosition(parmaX, parmaY, btnX, btnY) {
	const valX = parmaX > btnX[0] && parmaX < btnX[1]
	const valY = parmaY > btnY[0] && parmaY < btnY[1]

	return valX && valY
}

function setSelectedButtonIndex(index) {
	if (marker === index) {
		if (index > -1) {
			setSelectedButton(index)
			setCounter(true)

			if (counter >= 3.5) {
				markers[index] === false && marker === index && postToServer(
					"http://localhost:5000/postWord",
					[
						{
							"word": words[index],
							"currentVoice": $("#currentVoice").text(),
							"voiceID": +$("#voiceID").text(),
							"volume": +$("#volume").text(),
							"speechRate": +$("#speechRate").text()
						}
					]
				)
				markers[index] = true
			}

		} else {
			$("#selectedButtonIndex").html(index)
			$("#selectedButtonWord").html("")
			markers[0] = false
			markers[1] = false
			markers[2] = false
			markers[3] = false
			setCounter(false)
		}
	} else {
		setCounter(false)
	}

	marker = index
	// console.log(counter)
}

function clearSelectedButtonIndex() {
	$("#selectedButtonIndex").html(-1)
}

const getParmaPosition = () => {
	webgazer.getCurrentPrediction()
		.then(res => {
			x = res.x
			y = res.y
			$("#pointX").html(x)
			$("#pointY").html(y)
			$("#positionX").html(x.toFixed(4))
			$("#positionY").html(y.toFixed(4))
		}).then(pos => {
			if ($("#ismenuopened").text() === "false") {
				if (comparePosition(x, y, btn0x, btn0y)) {
					setSelectedButtonIndex(0)
				} else if (comparePosition(x, y, btn1x, btn1y)) {
					setSelectedButtonIndex(1)
				} else if (comparePosition(x, y, btn2x, btn2y)) {
					setSelectedButtonIndex(2)
				} else if (comparePosition(x, y, btn3x, btn3y)) {
					setSelectedButtonIndex(3)
				} else {
					setSelectedButtonIndex(-1)
				}
			}
		})
}


/**
 * Load this function when the index page starts.
* This function listens for button clicks on the html page
* checks that all buttons have been clicked 5 times each, and then goes on to measuring the precision
*/


$(document).ready(function () {
	ClearCanvas();

	helpModalShow();
	$("#buttonBody").hide();
	$("#homeElements").hide();
	$("#uploadElement").hide()
	// $('body').append(localStorage.getItem('done'))

	// collectButtonPosition()
	// let saved_data = localStorage.getItem("dataLabel");

	// if ($("#isuploaded").text() === "false") {
	// 	window.setInterval(function () {
	// 		if ($("#isuploaded").text() === "true") {
	// 			$("#uploadElement").hide()

	// 			$("#buttonBody").show();
	// 			$('body').append(localStorage.getItem('done'))
	// 			$("#homeElements").show();
	// 			$('#accurancyStatus').html(precision_measurement + "%");
	// 		}
	// 	}, 500)
	// }

	// console.log(webgazer.())


	$(".close_and_load").click(function () {
		$.ajax({
			url: "http://localhost:5000/getCalibrationData",
			type: 'GET',
			dataType: 'json',
			success: function (res) {
				console.log(res)
			}
		}).then(() => {
			webgazer.loadData(saved_data)
		})

	})


	$(".Calibration").click(function () { // click event on the calibration buttons
		var id = $(this).attr('id');

		if (!CalibrationPoints[id]) { // initialises if not done
			CalibrationPoints[id] = 0;
		}
		CalibrationPoints[id]++; // increments values

		if (CalibrationPoints[id] == 5) { //only turn to yellow after 5 clicks
			$(this).css('background-color', 'yellow');
			$(this).prop('disabled', true); //disables the button
			PointCalibrate++;
		} else if (CalibrationPoints[id] < 5) {
			//Gradually increase the opacity of calibration points when click to give some indication to user.
			var opacity = 0.2 * CalibrationPoints[id] + 0.2;
			$(this).css('opacity', opacity);
		}

		//Show the middle calibration point after all other points have been clicked.
		if (PointCalibrate == 8) {
			$("#Pt5").show();
		}

		if (PointCalibrate >= 9) { // last point is calibrated
			//using jquery to grab every element in Calibration class and hide them except the middle point.
			$(".Calibration").hide();
			$("#Pt5").show();

			// clears the canvas
			var canvas = document.getElementById("plotting_canvas");
			canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

			// notification for the measurement process
			swal({
				title: "Calculating measurement",
				text: "Please don't move your mouse & stare at the middle dot for the next 5 seconds. This will allow us to calculate the accuracy of our predictions.",
				closeOnEsc: false,
				allowOutsideClick: false,
				closeModal: true
			}).then(isConfirm => {

				// makes the variables true for 5 seconds & plots the points
				$(document).ready(function () {
					store_points_variable(); // start storing the prediction points

					sleep(5000).then(() => {
						stop_storing_points_variable(); // stop storing the prediction points
						var past50 = webgazer.getStoredPoints(); // retrieve the stored points
						var precision_measurement = calculatePrecision(past50);
						var accuracyLabel = "<a>Accuracy | " + precision_measurement + "%</a>";
						document.getElementById("Accuracy").innerHTML = precision_measurement + "%"; // Show the accuracy in the nav bar.

						var dataarr = [
							webgazer.getStoredPoints(),
							precision_measurement
						]

						postToServer(
							"http://localhost:5000/calibrationData", dataarr
						)

						swal({
							title: "Your accuracy measure is " + precision_measurement + "%",
							allowOutsideClick: false,
							buttons: {
								cancel: "Recalibrate",
								confirm: true,
							}
						}).then(isConfirm => {
							if (isConfirm) {
								ClearCanvas();
								$("#Pt5").hide()

								window.setInterval(function () {
									getParmaPosition()
								}, 350)

								window.setInterval(function() {
									if($("#ismenuopened").text() === "true") {
										webgazer.pause()
										$("#webgazerGazeDot").hide()
									} else {
										webgazer.resume()
										$("#webgazerGazeDot").show()
									}
								}, 500)

								$("#buttonBody").show();
								$('body').append(localStorage.getItem('done'))
								$("#homeElements").show();
								$('#accurancyStatus').html(precision_measurement + "%");
								// $("#uploadElement").show()

								collectButtonPosition()
								delay(800).then(x => {
									$("#iscomplete").html("true")
									completeCalibration = true
								})

							} else {
								//use restart function to restart the calibration
								document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
								// webgazer.clearData();
								ClearCalibration();
								ClearCanvas();
								completeCalibration = false
								ShowCalibrationPoint();
								$("#iscomplete").html("false")
								$("#buttonBody").hide();
								$("#buttonBody").css("z-index", "999");
								$("#homeElements").hide();
								$('#notCalibrated').show();
							}
						});
					});
				});
			});
		}
	});
	// window.setInterval(function (e) {
	// }, 100);
});

function ShowCalibrationPoint() {
	$(".Calibration").show();
	$(".mainPanel").show();

	$("#Pt5").hide(); // initially hides the middle button
}


function ClearCalibration() {
	// Clear data from WebGazer
	$(".Calibration").css('background-color', 'red');
	$(".Calibration").css('opacity', 0.2);
	$(".Calibration").prop('disabled', false);

	CalibrationPoints = {};
	PointCalibrate = 0;
	calibrated = false;
}

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}
