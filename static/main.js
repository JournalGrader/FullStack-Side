let dataIsRetrieved = false
function sendData(){

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/grade", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	data=JSON.stringify({
				ans:document.getElementById('answer').value,
				question:document.getElementById('question').value
	})
	xhr.onreadystatechange = function() { // Call a function when the state changes.
	    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			updateIframe()
	    }
	}
		console.log(data)
	xhr.send(data);
	dataIsRetrieved = true
	document.getElementById('Result').innerHTML = "<h3>Analysing...<br> Please wait</h3"
}
function updateIframe(){
	iframe = document.getElementsByTagName('iframe')[0]
	iframe.contentDocument.location.reload()
}
function updateResult(iframe){
	if(!dataIsRetrieved) return 0;
	data = iframe.contentDocument.body.innerHTML
	console.log(data)
	resultDiv = document.getElementById('Result')
	result = data.split('\n\n')[1].split('\n')
	colorGrade = result[1].split(' ')[2]
	resultDiv.innerHTML=`<center><h3> Color Grade : 
				<span style="color:${colorGrade}">
				${colorGrade}</h3></center>`
	resultDiv.innerHTML += `<center><b>${result[2]}</b></center>`
	numGrade = result[0].split(' ')[2]
	resultDiv.innerHTML += `<center><b>Quality Grade:${numGrade}</b></center>`
	data = data.split('\n\n')
	data.splice(0,2)
	data = data.join('<br>')
	data = data.split('\n')
	data = data.join('<br>')
	resultDiv.innerHTML += `<br><center><b>Here are more details</b></center>`
	resultDiv.innerHTML += `<br><center><div style="overflow:auto;height:200px;background-color:grey">${data}</div></center>`


}

//https://www.youtube.com/watch?v=KTR9xSBNBco&feature=share