/*!
 * 
 * jQuery Date Comparator BR Plugin
 * 
 * Version: v0.2.1
 * Author: Eduardo Santos Jr. <mr.eduardosantos@gmail.com>
 * Description: Plugin for Date comparation on Brasilian Format (dd/mm/yyyy)
 * 
 * 
 */
(function($){
    var methods = {
        'validaData' : function(str_data){
            var objData = new String(str_data);
            if(!objData.indexOf('/')){
                return false;
            }else if(objData.indexOf('/') == objData.lastIndexOf('/')){
                return false;
            }else if(objData.length != 10){                
                return false;
            }else{
                var DATA = objData.split("/");
                if(DATA.length != 3){
                    return false;
                }else{
                    if(parseInt(DATA[0]) == "NAN" || parseInt(DATA[1]) == "NAN" || parseInt(DATA[2]) == "NAN")
                        return false;
                    else if(DATA[0].length != 2 || DATA[1].length != 2 || DATA[2].length != 4)
                        return false;
                    else
                        return true;
                }
            }
        },
        '>': function(data1, data2){
            if(data1 > data2)
                return true;
            else
                return false;
        },
        '<' : function(data1, data2){
            if(data1 < data2)
                return true;
            else
                return false;
        },
        '>=' : function(data1, data2){
            if(data1 >= data2)
                return true;
            else
                return false;
        },
        '<=' : function(data1, data2){
            if(data1 <= data2)
                return true;
            else
                return false;
        },
        '=' : function(data1, data2){
            if(data1.toLocaleDateString() == data2.toLocaleDateString())
                return true;
            else
                return false;
        },
        'diff_days' : function(data1, data2){
            var diferenca = (Date.UTC(data1.getYear(),data1.getMonth(),data1.getDate(),0,0,0) - Date.UTC(data2.getYear(),data2.getMonth(),data2.getDate(),0,0,0));
            var dias = Math.abs((diferenca / 1000 / 60 / 60 / 24));
            var prefixo = (methods['>'](data1, data2) ? "" : methods['<'](data1, data2) ? "-" : "");
            return parseInt(prefixo+""+dias);
        }
    }
        
    $.fn.compareDate = function(input_date_2, condition){
        var input1 = (this.length == 1 ? $(this)[0] : this.selector);
        var input2 = (typeof input_date_2 == "string" ? input_date_2 : (!input_date_2.tagName ? $(input_date_2)[0] : input_date_2));
        
        var CONDICIONAIS = ['>', '<', '>=', '<=', '=', 'maior', 'menor', 'maiorigual', 'menorigual', 'igual', 'diff_dias'];
        if((input1.tagName !== "INPUT" && input1 != 'current_date') || (input2.tagName !== "INPUT" && input2 != "current_date")){
            alert('Deve-se passar os inputs das datas ou valores correspondentes de acordo com a documentação!!');
            return false;
        }else if(input1 == "current_date" && input2 == "current_date"){
            alert('Comparação entre duas datas usando a função current_date');
            return false;
        }else if(typeof condition !== "string"){
            alert('Deve-se passar uma string de comparação de acordo com a documentação!!');
            return false;
        }else{
            var condicional = false;
            $.each(CONDICIONAIS, function(key, value){
                if(value == condition){
                    condicional = true;
                    return false;//quebrando o loop
                }
            });
            
            if(!condicional){
                alert('O plugin não tem suporte a este condicional. Verifique os condicionais suportados na documentação!!');
                return false;
            }
        }
        /* CONVERTENDO COMPARADORES LITERAIS EM SIMBOLOS */
        if(condition == "maior")
            condition = ">";
        if(condition == "menor")
            condition = "<";
        if(condition == "maiorigual")
            condition = ">=";
        if(condition == "menorigual")
            condition = "<=";
        if(condition == "igual")
            condition = "=";
        /* FIM CONVERTENDO COMPARADORES LITERAIS EM SIMBOLOS */
        
        /* DEFININDO VALORES DOS IMPUTS DAS DATAS */
        var valor1 = null, valor2 = null;
        if(input1.tagName === "INPUT")
            valor1 = input1.value;
        if(input1 == "current_date")
            valor1 = input1;
        if(input2.tagName === "INPUT")
            valor2 = input2.value;
        if(input2 == "current_date")
            valor2 = input2;
        /* FIM DEFININDO VALORES DOS IMPUTS DAS DATAS */
        
        /* VALIDANDO DATA ANTES DE FAZER COMPARACAO */
        if(valor1 != 'current_date' && !methods['validaData'](valor1)){
            alert('Data1 não é uma data BR válida!!');
            return false;
        }
        if(valor2 != 'current_date' && !methods['validaData'](valor2)){
            alert('Data2 não é uma data BR válida!!');
            return false;
        }
        /* FIM VALIDANDO DATA ANTES DE FAZER COMPARACAO */
            
        /* DEFININDO VALORES REAIS DAS DATAS PARA COMPARACAO */
        var data1 = new Date(), data2 = new Date();
        data1.setHours(0,0,0,0); data2.setHours(0,0,0,0);
        var DATA = null;

        if(valor1 != "current_date"){
            DATA = valor1.split("/");
            data1.setFullYear(DATA[2], (parseInt(DATA[1]) - 1), DATA[0]);
        }
        if(valor2 != "current_date"){
            DATA = valor2.split("/");
            data2.setFullYear(DATA[2], (parseInt(DATA[1]) - 1), DATA[0]);
        }
        /* FIM DEFININDO VALORES REAIS DAS DATAS PARA COMPARACAO */
        
        return methods[condition](data1, data2);
    }
})(jQuery);