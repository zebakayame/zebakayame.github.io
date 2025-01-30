const startingTime = 10
let time = startingTime * 60

let audio = new Audio('alarm.wav')



const count = document.getElementById("timer")
setInterval(updateTimer, 1000)
function updateTimer(){
	if(time >= 0){
		const minute = Math.floor(time/60)
		let second = time % 60
	
		second = second < 10 ? '0' + second : second
	
		count.innerHTML = minute + ":" +second
		time--
	}else{
		audio.play()
	}
}
