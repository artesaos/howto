---
layout: post
title: Laravel 5 - Comandos Artisan - Básico
---

Nesse artigo, vou tratar do básico para criação de comandos que serão utilizados via terminal, `php artisan make:console`, vamos criar nosso comando HelloWorld, bem simples.

## Criando o Comando

O *Artisan* tem geradores pras tarefas mais rotineiras, criar migrations, models, controllers ... e comandos, então vamos criar nosso `HelloWorld`

```shell
php artisan make:console HelloWorld --command="hello"
```

Deve criar o arquivo `app/Console/Commands/HelloWorld.php`:

```php
<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class HelloWorld extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'hello';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Command description.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		//
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return [
			['example', InputArgument::REQUIRED, 'An example argument.'],
		];
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return [
			['example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null],
		];
	}

}
```

Feito isso, temos que registrar nosso comando em `app/Console/Kernel.php`, e adicionar a referencia para ele no array `$commands`, pra que ele apareça na lista de comandos do artisan:

```php
<?php
/**
 * The Artisan commands provided by your application.
 *
 * @var array
 */
protected $commands = [
    'App\Console\Commands\Inspire',
    'App\Console\Commands\HelloWorld', //nosso comando hello
];
```

Tudo que nosso comando precisa no arquivo  `app/Console/Commands/HelloWorld.php` é o método `fire()` que é o que torna nosso comando "executável" é nele que deve conter a lógica do nosso comando (me refiro ao fluxo, você ainda pode refatorar ele em novos métodos, sem problemas).

Os outros métodos, `getArguments` e `getOptions` são para configurar quais argumentos e opções nossa aplicação pode receber pela linha de comando. A diferença de um pra outro é que no `getArguments` o argumento tem posição fixa, ou seja, se tivessemos outros argumentos, eles deveriam ser inseridos na mesma ordem em cada chamada ao comando. Já o `getOption` não, nele podemos definir as opções e elas podem vir em qualquer posição, em pares `--chave=valor`.

No caso do código que vem gerado pelo *Artisan*, o argumento é `example` e também tem a opção `--example`, então teriamos as seguintes possibilidades de chamada ao nosso comando:

```shell
php artisan hello John
```

e lá na classe do nosso comando teriamos o argumento:

```php
<?php
$argExample = $this->input->getArgument('example')
```

e, se quizéssemos a option, fariamos:
```shell
php artisan hello --example=John
```

```php
<?php
$optExample = $this->input->getOption('example')
```

Para nosso estudo, vamos remover o método `getOption`,  e deixar apenas o `getArgument`, ficando assim:

```php
<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class HelloWorld extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'hello';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Comando que exibe uma mensagem de Hello.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		$name = $this->input->getArgument("name");

        $this->info("Hello {$name}!");
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return [
			['name', InputArgument::OPTIONAL, 'O nome que deverá ser exibido.', 'World'],
		];
	}
}

```

Observe nosso `getArguments`, ele define como deve ser nossos argumentos, então, defini que o nome é "name", que é opcional `InputArgument::OPTIONAL`, um texto de ajuda `'O nome que deverá ser exibido.'` e por fim, um valor padrão, caso não venha nenhum argumento da linha de comando `'World'`.

o atributo `$description` serve pra quando listamos os comandos artisan:
`php artisan`, aparecer ao lado do nome do nosso comando:

![Descrição do comando hello](http://i.imgur.com/QH6QISY.png)

já o texto de ajuda do nosso argumento, aparece em `php artisan help hello` :

![texto de ajuda do argumento name](http://i.imgur.com/XlfvDYX.png)

Feito isso, já podemos brincar com nosso comando:

`php artisan hello`
exibe: `Hello World!`.

`php arisan hello Artesão`
exibe: `Hello Artesão!`.

`php artisan hello "Vagner do Carmo"`
exibe: `Hello Vagner do Carmo!`

## Conclusão

Isso conclui mais um artigo sobre o básico do Laravel 5. Você pode baixar o código fonte usado nesse artigo em [Github](https://github.com/vluzrmos-blog/artisan-commands-basico) e também pode ver mais artigos sobre Laravel no [Laravel - Blog do Vluzrmos](http://blog.vluzrmos.com.br/category/laravel).
