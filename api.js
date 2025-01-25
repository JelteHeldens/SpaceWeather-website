let url = 'https://api.nasa.gov/insight_weather/?api_key=&feedtype=json&ver=1.0';

function loadAPI(){
	fetch(url)
	.then(res => res.json())
	.then(out => update(out))
	.catch(err => console.log(err));
}

function update(data){
	//console.log(data)
	let avSUM = 0;
	let c = 0;
	try {
		for (let key in data) {
			let av = data[key].AT.av;
			avSUM += av;
			c+=1;
			console.log(`Key: ${key}, AT average: ${av}`);
		}
	} catch (error) {
		console.warn("An error occurred, but it was ignored:", error);
	}
	document.getElementById("at").innerHTML = (((avSUM/c)-32)*(5/9)).toFixed(1)+"°C";
}
