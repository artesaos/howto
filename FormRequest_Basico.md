# Utilizando os Form Requests
Nesta versão, <code>~5.0</code>, o laravel veio com um recurso nativo para validação de dados recebidos via http (via formulário, ajax, etc) nesse artigo vou tratar as formas mais comuns de utilizá-los.

# Form Request

O primeiro passo é termos um controller pra nosso recurso, então vamos supor que trabalhemos com o formulário contato:

```
php artisan make:controller ContatoController --plain
```
Deve criar um controller para nosso formulário de contato, vamos adicionar os seguintes métodos:

```php
<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class ContatoController extends Controller {

	/**
	 * Mostra o formulário de contato
	 */
	public function getIndex()
	{
		return view('contato.index');
	}

	/**
	 * Trata o formulário de contato e mostra os dados
	 */
	public function postIndex(Request $request)
	{
		$data = $request->all();

        dd($data);
	}
}

```

Feito isso, vamos criar também a view que conterá o formulário html do contato, arquivo <code>resources/views/contato/index.blade.php</code>:
```html
@extends('app')

@section('content')

<form action="{{url('contato')}}" method="post" class="col-sm-12 form-horizontal" role="form">
    <div class="form-group">
        <legend>Formulário de Contato</legend>
    </div>

    <div class="form-group">
    	<label for="name" class="sr-only">Nome:</label>
    	<div class="col-sm-6">
    		<input type="text" name="name" id="contact_name" class="form-control" placeholder="Digite seu nome">
    	</div>
    </div>

    <div class="form-group">
    	<label for="email" class="sr-only">E-mail:</label>
    	<div class="col-sm-6">
    		<input type="email" name="email" id="contact_email" class="form-control" placeholder="Digite seu email">
    	</div>
    </div>

    <div class="form-group">
        <label for="message" class="sr-only">Mensagem:</label>
        <div class="col-sm-6">
            <textarea name="message" id="contact_message" class='form-control' rows="5" style="resize:none" placeholder="Digite sua mensagem..."></textarea>
        </div>
    </div>

    <input name="_token" type="hidden" value="{{csrf_token()}}"/>

    <div class="form-group">
        <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">Enviar</button>
        </div>
    </div>
</form>

@endsection
```
Observe que estou mandando também o token da sessão através do campo oculto _token, ele serve para o laravel não bloquear nossa requisição (resumidamente). Você pode ler mais sobre ele em [Laravel 5 - Token Mismatch Exception](http://blog.vluzrmos.com.br/laravel5-token-mismatch-exception).

Vamos definir também as rotas de acesso ao nosso formulário:
```php
//Arquivo: app/Http/routes.php
Route::controller("contato", "ContatoController");
```

Agora, se quisermos sabe quais foram as rotas criadas até o momento:
```
php artisan route:list
```
Ele deve mostrar que tem uma rota GET|HEAD <code>contato</code> e POST <code>contato</code> (que usaremos aqui), além das outras rotas já definidas. Se você notou, no nosso formulário eu já defini qual a rota que ele deve enviar os dados, no caso, POST <code>contato</code>.

Nosso formulário inicial será esse aqui:

![Formulário de Contato](http://i.imgur.com/6pwGcvu.png)


Se voce tentar utilizá-lo, já deve conseguir, ele deve mostrar uma saída dessa forma:
![Dump do formulário de contato](http://i.imgur.com/1HYp9Mq.png) 

E se verificou bem, esse formuário não tem nenhuma validação, nada impede que o usuário envie a informação sem nome, ou com um e-mail inválido ou mesmo sem o corpo da mensagem do contato.

# Criando o Form Request

```
php artisan make:request ContatoRequest
```

Por padrão, vai criar um FormRequest em <code>app/Http/Requests/ContatoRequest.php</code> que bloqueia qualquer tentativa de envio, com o método authorize, se tivessemos alguma regra de autorizização (ex.: o usuário ser admin, ou ser de um grupo de usuário em específio para poder enviar esse tipo de requisição, aí seria um bom lugar para fazer essa regra) retornar true significa que o usuário pode fazer esse tipo de Request. Então, vamos modificá-lo com as seguintes alterações:

```php
<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class ContatoRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true; //qualquer um pode usar esse tipo de Request
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'name'  => 'required|min:3|alpha', //obrigatório com pelomenos 3 caracteres alfabéticos
            'email' => 'required|email',//obrigatório e deve ser um email
            'message' => 'required|min:30'//obrigatório com pelo menos 30 caracteres
		];
	}

}

```

Feito isso, precisamos alterar o Request que utilizamos em nosso controller (ContatoController@postIndex) para esse novo request com nossa validação:
```php 
//arquivo: apapp/Http/Controllers/ContatoController.php
//Obs.: Você deve adicionar "use App\Http\Requests\ContatoRequest;" acima da definição da classe

   /**
     * Trata o formulário de contato e mostra os dados
     * @param ContatoRequest $request
     */
	public function postIndex(ContatoRequest $request)
	{
		$data = $request->all();

        dd($data);
	}

```

Feito isso, qualquer tentativa de enviar os dados de forma errada para o laravel, ele vai redirecionar de volta para o formulário com os erros salvos na sessão, então vamos editar um pouco nossa view <code>contato.index</code> pra mostrar essas mensagens de erro:

```html
@unless($errors->isEmpty())
    <ul>
    @foreach($errors->getMessages() as $error)
        <li>{{ $error[0] }}</li>
    @endforeach
    </ul>
@endunless
``` 
Basicamente, o que essas linhas fazem é percorrer nossa bolsa de mensagens de erros (<code>MessageBag</code>) e mostrar o primeiro erro (<code>$error[0]</code>) de cada campo.

Agora, se tentarmos inserir qualquer informação que não seja válida, o nosso ContatoRequest automaticamente vai redirecionar o usuário de volta para esse formulário e essas mensagens serão exibidas:

![Form com erros.](http://i.imgur.com/mdEktdc.png) 

## Ajax
Sem nenhum ajuste no formulário, ele poderia ser preenchido via ajax (<a href="http://blog.vluzrmos.com.br/laravel-5-ajax-token-mismatch-exception/" title="Laravel 5 – Ajax TokenMismatchException" target="_blank">Veja como configurar o token para requisições Ajax</a>), exemplo usando jQuery:

```javascript
$.ajax("contato", {
 
	type:"POST", 

	dataType:"json",
	
	data: {
	  name:"John",
	  email:"EmailErrado",
	  message:"Mensagem"
	},

	success:function(data){
		console.log(data);
	}

	error:function(data){
		console.log(error);
	}
});

//Omitindo o _token do formulário, veja como configurá-lo em http://blog.vluzrmos.com.br/laravel-5-ajax-token-mismatch-exception/
```

Os dados retornados pelo Laravel em caso de erros serão um objeto <b>JSON</b> que pode ser facilmente tratado:

```javascript
{
    "name":["The name must be at least 3 characters."],
    "email":["The email must be a valid email address."],
    "message":["The message must be at least 30 characters."]
}
``` 

# Conclusão

Esse foi o tutorial base para aprendizado das Form Requests, voce pode ler mais informações em:

[Laravel 5 Validation](http://laravel.com/docs/5.0/validation) 

E também pode usar pacotes para facilitar a construção dos formuálários e tradução das mensagens de erro:

* i18n dos arquivos lang [caouecs/laravel-lang](https://github.com/caouecs/Laravel-lang) 
* Html e Form facades [Illuminate/html](https://github.com/illuminate/html)
