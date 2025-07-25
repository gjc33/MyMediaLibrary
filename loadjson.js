var path = window.location.pathname;
var page = path.split("/").pop();

fetch('WebDB.json')
.then(function(response) {
	return response.json();
})
.then(function(data) {
	let  LibraryTotal = document.querySelector("#LibraryTotal");
	let allFilms = data.Films;

	LibraryTotal.innerHTML = `${Object.keys(allFilms).length} Titles`;

	let Categories = allFilms.map(Cats => Cats.Category);
	
	var lookup = {};
	var UniqueCat = [""];
	for(Cat of Categories){
		if(!(Cat in lookup)){
				lookup[Cat] = 1;
				UniqueCat.push(Cat);
		}
	}
	UniqueCat.shift()
	UniqueCat.sort();
	//document.getElementById("info").innerHTML = `[GJC]${UniqueCat.toString()}`;

	let TabDataHere = document.querySelector(`#Tabs`);
	let t="";
	let ckd = "checked";

	if(page != "A.html"){
		let ti = 0;
		for(Cat of UniqueCat){
			ti++;
			if(ti >1){ckd = ""};
			if(ti != 0){ t += `<input type='radio' id='tabToggle0${ti}' name='tabs' value='${ti}'  ${ckd}/><label for='tabToggle0${ti}'>${Cat}</label>`;};
		}

		for(Cat of UniqueCat){
			let CatFilms = allFilms.filter((CatData) => {
				if (Cat === "") {return CatData}
				else if (CatData.Category.includes(Cat)){
					return CatData
				}				
			})
			
			var CatTitles = Object.keys(CatFilms).length;
					
			if(page == 'D.html'){t += `<tab-content></br><p>[${CatTitles} Titles]</p></br><div class='table'><div class='row'>`};
			if(page == 'M.html'){t += `<tab-content></br><p>[${CatTitles} Titles]</p></br><ul class='list'>`};
			for(cf of CatFilms){
				if(page == 'D.html'){t+= `<div class='cell'><a href='${cf.Desktop}${cf.MovieFile}'><img loading='lazy' src='${cf.CoverArt}'></a></br>${cf.Title}</div>`};
				if(page == 'M.html'){t+= `<li class='item'><div class='content'><a href='${cf.Mobile}${cf.MovieFile}'><img loading='lazy' src='${cf.CoverArt}'></a></br>${cf.Title}</div></li>`};
			}
			if(page == 'D.html'){t += `</div></div></tab-content>`};
			if(page == 'M.html'){t+= `</ul></tab-content>`};
		}
	}
	else {
		const Alphabet = ["#ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

		for(a=0; a < (Alphabet[0].length); a++){
			ai = Alphabet[0].charAt(a);
			if(a > 0){ckd = ""};
			switch (true){
				case (a < 10): {
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
					if(AlphaData.Title.startsWith(ai)){return AlphaData}
				})

				var AlphaTitles = Object.keys(AlphaFilms).length;
				t += `<tab-content><p>[${AlphaTitles} Titles]</p><p>`;
				for(
					af of AlphaFilms
					){
					t+= `${af.Title}&nbsp;<sup>[${af.Category}]</sup></br>`;
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
					t += `${af.Title}&nbsp;<sup>[${af.Category}]</sup></br>`;
				}
				t += '</p></tab-content>';
			}
			//t += '</tab-content>';
		}
	}
	
	TabDataHere.innerHTML = t;	
	
	})
	.catch(function(error) {
		document.getElementById("titles").innerHTML = error;
})