function ValidarCNPJ(executionContext) {
	if (executionContext != null && executionContext.getFormContext != null) {
		var formContext = executionContext.getFormContext();
		var cnpj = formContext.getAttribute("new_cnpj2").getValue();
		var multiplicador1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
		var multiplicador2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
		var isValid = true;


		if (cnpj !== null && cnpj !== "") {
			cnpj = cnpj.replace(/[^\d]+/g, '');
			var Soma;
			var Resto;
			Soma = 0;
			if (cnpj.length !== 14 ||
				cnpj === "00000000000000" ||
				cnpj === "11111111111111" ||
				cnpj === "22222222222222" ||
				cnpj === "33333333333333" ||
				cnpj === "44444444444444" ||
				cnpj === "55555555555555" ||
				cnpj === "66666666666666" ||
				cnpj === "77777777777777" ||
				cnpj === "88888888888888" ||
				cnpj === "99999999999999") {
				isValid = false;
			} else {
				isValid = true;

				for (i = 1; i <= 12; i++) Soma = Soma + parseInt(cnpj.substring(i - 0, i)) * (multiplicador1[i - 1]);
				Resto = (Soma % 11);

				if (Resto < 2) {
					Resto = 0;

				} else {
					Resto = 11 - Resto;
				}

				if (Resto !== parseInt(cnpj.substring(12, 13))) {
					isValid = false;
				} else {
					isValid = true;
				}

				Soma = 0;
				for (i = 1; i <= 13; i++) Soma = Soma + parseInt(cnpj.substring(i - 1, i)) * (multiplicador2[i - 1]);
				Resto = (Soma % 11);

				if (Resto < 2) {
					Resto = 0;

				} else {
					Resto = 11 - Resto;
				}
				if (Resto !== parseInt(cnpj.substring(13, 14))) {
					isValid = false;
				} else {
					isValid = true;
				}
			}
		}
		else {
			isValid = false;
		}

		if (isValid) {
			cnpj = cnpj.substring(0, 2) + '.' + cnpj.substring(2, 5) + '.' + cnpj.substring(5, 8) + '/' + cnpj.substring(8, 12) + '-' + cnpj.substring(12);
			cnpj = formContext.getAttribute("new_cnpj2").setValue(cnpj);
		} else {
			Xrm.Navigation.openAlertDialog({ errorCode: "Validaçao do CNPJ!", confirmButtonLabel: "OK", text: " CNPJ " + cnpj + " Inválido" }, { height: 100, width: 300 }).then(
				function success(result) {
					cnpj = formContext.getAttribute("new_cnpj2").setValue("");


				}
			);
		}
	}
}

