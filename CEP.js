function ValidarCEP(executionContext) {
	if (executionContext != null && executionContext.getFormContext != null) {
		var formContext = executionContext.getFormContext();
		var cep = formContext.getAttribute("address1_postalcode").getValue();
		var isValid = true;
		

		if (cep !== null && cep !== "") {
			cep = cep.replace(/[^\d]+/g, '');
			var Soma;
			var Resto;
			Soma = 0;
			if (cep.length !== 8 ||
				cep === "00000000" ||
				cep === "11111111" ||
				cep === "22222222" ||
				cep === "33333333" ||
				cep === "44444444" ||
				cep === "55555555" ||
				cep === "66666666" ||
				cep === "77777777" ||
				cep === "88888888" ||
				cep === "99999999") {
				isValid = false;
			}
			

		}
		else {
			isValid = false;
		}

		if (isValid) {
			cep = cep.substring(0, 5)  + '-' + cep.substring(5);
			cep = formContext.getAttribute("address1_postalcode").setValue(cep);
		} else {
			Xrm.Navigation.openAlertDialog({ errorCode: "Validaçao do CEP!", confirmButtonLabel: "OK", text: " CEP " + cep + " Inválido" }, { height: 100, width: 300 }).then(
				function success(result) {
					cep = formContext.getAttribute("address1_postalcode").setValue("");

				
				}
			);
		}
	}
}
    
