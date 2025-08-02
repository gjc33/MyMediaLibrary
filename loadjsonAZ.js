var path = window.location.pathname;
var page = path.split("/").pop();

fetch('AZList.json')
.then(function(response) {
	return response.json();
})
.then(function(data) {
	let  LibraryTotal = document.querySelector("#LibraryTotal");
	let allFilms = data.Films;

	document.getElementById("updated").innerHTML = `Updated: ${allFilms[0].Updated}`;
	//document.getElementById("info").innerHTML = `[${page}]`;

	LibraryTotal.innerHTML = `${Object.keys(allFilms).length} Titles`;

	let TabDataHere = document.querySelector(`#Tabs`);
	let t="";
	let ckd = "checked";

	const Alphabet = ["#ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

	for(a=0; a < (Alphabet[0].length); a++){
		ai = Alphabet[0].charAt(a);
		if(a > 0){ckd = ""};
		switch (true){
			case (a < 9): {
				t += `<input type='radio' id='tabToggle0${a+1}' name='tabs' value='${a + 1}' ${ckd}><label for='tabToggle0${a+1}'>${ai}</label>`;
				break;
			}
			default: {
				t += `<input type='radio' id='tabToggle${a+1}' name='tabs' value='${a + 1}' ${ckd}><label for='tabToggle${a+1}'>${ai}</label>`;
			}
		}
	}

	for(a=0; a < (Alphabet[0].length); a++){
		ai = Alphabet[0].charAt(a);

		if(a != 0){
			let AlphaFilms = allFilms.filter((AlphaData) => {
				if(AlphaData.Title.toUpperCase().startsWith(ai.toUpperCase())){return AlphaData}
			})

			var AlphaTitles = Object.keys(AlphaFilms).length;
			t += `<tab-content><p>[${AlphaTitles} Titles]</p><p>`;
			for(
				af of AlphaFilms
				){
				t+= `${af.Title}&nbsp;<sup>[${af.Categories}]</sup></br>`;
			}
			t += '</p></tab-content>';
		}
		else{
			let AlphaFilms = allFilms.filter((AlphaData) => {
				if(
					   AlphaData.Title.startsWith("0")
					|| AlphaData.Title.startsWith("1")
					|| AlphaData.Title.startsWith("2")
					|| AlphaData.Title.startsWith("3")
					|| AlphaData.Title.startsWith("4")
					|| AlphaData.Title.startsWith("5")
					|| AlphaData.Title.startsWith("6")
					|| AlphaData.Title.startsWith("7")
					|| AlphaData.Title.startsWith("8")
					|| AlphaData.Title.startsWith("9")
				){return AlphaData}
			})

			//AlphaTitles = AlphaTitles.sort(function(a, b){return a.Title - b.Title;});

			var AlphaTitles = Object.keys(AlphaFilms).length;
			t += `<tab-content><p>[${AlphaTitles} Titles]</p><p>`;
			for(af of AlphaFilms){
				t += `${af.Title}&nbsp;<sup>[${af.Categories}]</sup></br>`;
			}
			t += '</p></tab-content>';
		}
		//t += '</tab-content>';
	}
	
	TabDataHere.innerHTML = t;	
	
})
.catch(function(error) {
		document.getElementById("titles").innerHTML = error;
})