$("#1 :checkbox").change(function() {
    let textAreaVal=$(".TextoArtigos").val();
    if($(this).prop("checked")==true){
      if(!textAreaVal.includes($(this).attr("id"))){
        textAreaVal += $(this).attr("id")+"\n";
    	}
    }
    else
    {
       if(textAreaVal.includes($(this).attr("id")))
       {
        textAreaVal = textAreaVal.replace($(this).attr("id")+"\n","");
       }
    }
   $(".TextoArtigos").val(textAreaVal);
});

$("#delacao-premiada").focusout(function() {
	var pena_txt = document.getElementById("pena");
		var penaReduzir = 0;
    
	if($("#delacao-premiada")[0].value != 0){
		if($("#delacao-premiada")[0].value < 100 && $("#delacao-premiada")[0].value > 0){
		penaReduzir = pena_txt.value * $(this).val() / 100;
		pena_txt.value = pena_txt.value - penaReduzir;
		} else{
			alert("Informe um valor válido entre 0 a 100%")
		}
	} else{
		$("#delacao-premiada").val(null);
		recalcularPena();
	}
});
$("#reu-confesso").change(function() {	
	var pena_txt = document.getElementById("pena");
		var penaReduzir = 0;

	if($("#reu-confesso")[0].checked === true){
		penaReduzir = pena_txt.value * $(this).val() / 100;
		pena_txt.value = pena_txt.value - penaReduzir;

	} else{
		recalcularPena();
	}
})
$("#reu-primario").change(function() {
	var pena_txt = document.getElementById("pena");

	if($("#reu-primario")[0].checked === true){
			$(".advogado")[0].style.display = 'block';
			$(".advogado-1")[0].style.display = 'block';
		} else{
			if ($("#advogado-constituido")[0].checked == true){
				pena_txt.value = pena_txt.value * 2;
				$("#advogado-constituido")[0].checked = false
			}
			if ($("#sem-advogado")[0].checked == true){
			$("#sem-advogado")[0].checked = false;
			
		}
		$(".advogado")[0].style.display = 'none';
			$(".advogado-1")[0].style.display = 'none';
			recalcularPena();
	}
});
$("#advogado-constituido").change(function() {
	var pena_txt = document.getElementById("pena");

	if($("#advogado-constituido")[0].checked === true){
		$(".advogado-1")[0].style.display = 'none';
		pena_txt.value = pena_txt.value * $("#advogado-constituido")[0].value / 100;
		
		} else{
			$(".advogado-1")[0].style.display = 'block';
			pena_txt.value = pena_txt.value * 2;
		}
});
function recalcularPena(){
	var pena_txt = document.getElementById("pena");

	var Pena = 0;
	var crimes = document.getElementsByName("crime");
		for (var i = 0; i < crimes.length; i++){
			if ( crimes[i].checked ) {
				var valores_crime = crimes[i].value.split("|");

				Pena += parseInt(valores_crime[0]);
				/*Condicional += parseInt(valores_crime[0])*4; */
				Condicional = "NÃO USAR";
			}
		}

		/* dinheiro sujo */
		var sujo = parseInt(document.getElementById("sujo").value);
		if(sujo > 0){
			var unidade_sujo = sujo / 10000;
			Pena += parseInt(unidade_sujo);
		}
		pena_txt.value = Pena;
}
$("#advogado-30").change(function() {
	var pena_txt = document.getElementById("pena");
	var penaReduzir = 0;
	if($("#advogado-30")[0].checked === true){
		penaReduzir = pena_txt.value * $("#advogado-30")[0].value / 100;
		pena_txt.value = pena_txt.value - penaReduzir;
	} else{
			recalcularPena();
		}
});
$("#sem-advogado").change(function() {
	var pena_txt = document.getElementById("pena");
	var penaReduzir = 0;
	if($("#sem-advogado")[0].checked === true){
		$(".advogado")[0].style.display = 'none';
		penaReduzir = pena_txt.value * $("#sem-advogado")[0].value / 100;
		pena_txt.value = pena_txt.value - penaReduzir;
	} else{
			$(".advogado")[0].style.display = 'block';

			recalcularPena();
		}
});

  $("#2 :checkbox").change(function() {
    let textAreaVal=$(".TextoArtigos").val();
    if($(this).prop("checked")==true){
      if(!textAreaVal.includes($(this).val())){
        textAreaVal += $(this).attr("id")+"\n";
      }

    }
    else{
       if(textAreaVal.includes($(this).attr("id"))){
        textAreaVal = textAreaVal.replace($(this).attr("id")+'\n',"");
      }
    }
   $(".TextoArtigos").val(textAreaVal);
});
			function calcular() {
				var Pena = 0;
				var Multa = 0;
				var Fianca = 0; 
				var Condicional =  "NÃO USAR"; 

				/* Crimes */
				var crimes = document.getElementsByName('crime');
				for (var i = 0; i < crimes.length; i++){
			        if ( crimes[i].checked ) {
			        	var valores_crime = crimes[i].value.split("|");

			        	Pena += parseInt(valores_crime[0]);
			        	Multa += parseInt(valores_crime[1]);
			        	Fianca += parseInt(valores_crime[2]); 
			        	/*Condicional += parseInt(valores_crime[0])*4; */
			        	Condicional = "NÃO USAR";
				    }
				}

				/* dinheiro sujo */
				var sujo = parseInt(document.getElementById("sujo").value);
				if(sujo > 0){
					var unidade_sujo = sujo / 4000;
					Pena += parseInt(unidade_sujo);
					if(sujo >= 100){
                        Multa += sujo / 100  * 50;
                    }
				}
				var pena_txt = document.getElementById("pena");
				pena_txt.value = Pena;
				var multa_txt = document.getElementById("multa");
				multa_txt.value = "R$" +Multa.toLocaleString('pt-BR', { minimumFractionDigits: 2});
				var fianca_txt = document.getElementById("fianca");
				if(isNaN(Fianca)){
					fianca_txt.value = "SEM FIANÇA";
				} else{
					fianca_txt.value = "R$" +Fianca.toLocaleString('pt-BR', { minimumFractionDigits: 2});
				}
				var condicional_txt = document.getElementById("condicional");
				condicional_txt.value = Condicional.toLocaleString('pt-BR', { minimumFractionDigits: 2});
			}
			function limpar(){
				var crimes = document.getElementsByName('crime');
				for (var i = 0; i < crimes.length; i++){
			        crimes[i].checked = false;
				}

				var drogas = document.getElementById("pena");
				drogas.value = 0;

				var sujo = document.getElementById("multa");
				sujo.value = 0;

				var sujo = document.getElementById("fianca");
				sujo.value = 0;


				document.getElementById("pena").value = "0";
				document.getElementById("multa").value = "0";
				document.getElementById("fianca").value = "0";
				
			}

			document.getElementById('thiago').addEventListener('click', function(){
				var text = document.getElementById('thiago-text');
				text.select();
				document.execCommand('copy');
				$("#copiado")[0].style.display = 'block'
				})