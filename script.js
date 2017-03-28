
window.addEventListener('load',function(){
	
	document.querySelector('input[name="id"]').value = GerarID();
	document.querySelector('input[name="nf"]').value = GerarID();
	
	
	document.querySelector('#additem').addEventListener('click',function(e){	

		// criar elementos
		var div = document.createElement('div');
		var item = document.createElement('select');
		var rcifrao = document.createElement('span');
		var preco = document.createElement('input');
		var btRemove = document.createElement('input');
		
		div.classList.add('item-div');	
		item.setAttribute('name','item');
		rcifrao.innerHTML = 'R$ '
		
		// atr preco
		preco.classList.add('item-preco');
		preco.setAttribute('type','text');
		preco.readOnly = true;
		preco.value = '0.00'	
		
		// option default no select
		var optDefault = document.createElement('option');
		optDefault.text = 'Selecione';
		optDefault.value = '';
		optDefault.disabled = true;
		optDefault.selected = true;
		
		// adicionar os produtos no select
		item.add(optDefault);
		for(var i = 0; i < produtos.length; i++){
			var opt = document.createElement('option');		
			opt.text = produtos[i].produto;
			opt.setAttribute('data-preco',produtos[i].valor);
			item.add(opt);
		}		
		
		item.addEventListener('change',function(e){ 
			preco.value = e.target.options[e.target.selectedIndex].getAttribute('data-preco');
			AtualizarValores();			
		});
		
		// botao e evento de remover
		btRemove.setAttribute('type','button');
		btRemove.value = 'Remover'
		btRemove.addEventListener('click',function(){ 
			div.remove(); 
			qtdItems--;
			AtualizarValores();
		});
		
		// appends 
		div.appendChild(item);
		div.appendChild(rcifrao);
		div.appendChild(preco);
		div.appendChild(btRemove);	
		document.querySelector('#items').appendChild(div);
		
		// incremento
		qtdItems++;
		AtualizarValores();
	});
	
});


var qtdItems = 0;

var produtos = [
	{produto: 'Bicicleta', valor: 250.99},
	{produto: 'Carrinho', valor: 45.99},
	{produto: 'Boneca', valor: 30.99},
	{produto: 'Zurg', valor: 180.99},
	{produto: 'Chewbakka', valor: 110.99},
	{produto: 'Trampulim', valor: 250.99},
	{produto: 'Urso de Pelucia', valor: 90.99},
	{produto: 'Pistola .38', valor: 3000.99},
];

function GerarID(){
	return Math.floor((Math.random() * 99999999) + 1);
}

function AtualizarValores(){
	document.querySelector('#items-qtd').innerHTML = qtdItems;	
	
	var total = 0;
	var precos = document.querySelectorAll('.item-preco');
		
	for(var i = 0; i < precos.length; i++){
		total += Number(precos[i].value);	
	}
	
	document.querySelector('input[name="total"]').value = total.toFixed(2);
	
	validarForm();
}

function validarForm(){
	var sbmtBtn = document.querySelector('input[type="submit"]');
	sbmtBtn.style.display = 'none';
	if(qtdItems > 0){
		sbmtBtn.style.display = 'block';
	}
}