

function ajax(json){
	var settings = {
		method:json.method || 'get',
		url:json.url || '',
		data:json.data || '',
		dataType:json.dataType || 'json',
		succ:json.succ||'',
		fail:json.fail||''
	};
	
	var xhr=new XMLHttpRequest();
	
	if(settings.method.toLowerCase() === 'get'){
		xhr.open('get',settings.url+'?'+settings.data+'&'+new Date().getTime(),true);
	}else{
		xhr.open('post',settings.url,true);
	}
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status>=200 && xhr.status<=299 || xhr.status===304){
				if( settings.succ && typeof settings.succ){
					if(settings.dataType.toLowerCase() === 'json'){
						settings.succ(eval('('+ xhr.responseText +')'));
					}else if(settings.dataType.toLowerCase() === 'xml'){
						settings.succ(xhr.responseXML);
					}else{
						settings.succ(xhr.responseText);
					}
				}
				
			}else{
				if( settings.fail && typeof settings.fail){
					settings.fail(xhr.status);
				}
			}
		}
	}
	
	if(settings.method.toLowerCase() === 'get'){
		xhr.send();
	}else{
		ajax.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');
		xhr.send(settings.data);
	}
	
	
	
	
}
