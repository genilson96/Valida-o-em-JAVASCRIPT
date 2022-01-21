

function ValidarCPF(executionContext) {
    if (executionContext != null && executionContext.getFormContext != null) {
        var formContext = executionContext.getFormContext();
        var cpf = formContext.getAttribute("new_cpf2").getValue();
        var isValid = true;

        if (cpf !== null && cpf !== "") {
            cpf = cpf.replace(/[^\d]+/g, '');
            var Soma;
            var Resto;
            Soma = 0;
            if (cpf.length !== 11 ||
                cpf === "00000000000" ||
                cpf === "11111111111" ||
                cpf === "22222222222" ||
                cpf === "33333333333" ||
                cpf === "44444444444" ||
                cpf === "55555555555" ||
                cpf === "66666666666" ||
                cpf === "77777777777" ||
                cpf === "88888888888" ||
                cpf === "99999999999") {
                isValid = false;
            }

            for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto === 10) || (Resto === 11)) Resto = 0;
            if (Resto !== parseInt(cpf.substring(9, 10))) {
                isValid = false;
            }

            Soma = 0;
            for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto === 10) || (Resto === 11)) { Resto = 0; }
            if (Resto !== parseInt(cpf.substring(10, 11))) {
                isValid = false;
            }
        }
        else {
            isValid = false;
        }

        if (isValid) {
            cpf = cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9);
            cpf = formContext.getAttribute("new_cpf2").setValue(cpf);
        } else {
            Xrm.Navigation.openAlertDialog({ errorCode: "Validaçao do CPF!", confirmButtonLabel: "OK", text: "CPF " + cpf + " Inválido" }, { height: 100, width: 300 }).then(
                function success(result) {
                    cpf = formContext.getAttribute("new_cpf2").setValue("");

                  
                }
            );
        }
    }
}



