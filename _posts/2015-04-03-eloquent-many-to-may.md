---
layout: post
title: Eloquent ManyToMany - Relacionamentos Muitos para Muitos
---

A relação de `N para M` que existe entre as tabelas de nomes `authors` e `books`, conforme demostrado figura abaixo:

![ManyToMany](http://i.imgur.com/WZmMPFT.png)

Para refletir isso no Laravel crie as seguintes classes que herdam do Eloquent (Model).

## Authors

```php
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Authors extends Model
{
    //Nome da tabela.
    protected $table      = 'authors';

    //Primary Key da Tabela.
    protected $primaryKey = 'id';

    //Item em um Array que são utilizados para preenchimento da informação.
    protected $fillable   = ['name'];

    //Deseja trabalhar ou não com campos created_at e updated_at do tipo timestamp nessa tabela.
    public  $timestamps   = false;

    //Relacionamento.
    public function books()
    {
        //    $this->belongsToMany('relacao', 'nome da tabela pivot', 'key ref. authors em pivot', 'key ref. books em pivot')
        return $this->belongsToMany('App\Books','booksauthors', 'authorid', 'bookid');
    }
}
```

## Books

```php
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    //Nome da tabela.
    protected $table      = 'books';

    //Primary Key da Tabela.
    protected $primaryKey = 'id';

    //Item em um Array que são utilizados para preenchimento da informação.
    protected $fillable   = ['title'];

    //Deseja trabalhar ou não com campos created_at e updated_at do tipo timestamp nessa tabela.
    public  $timestamps   = false;

    //Relacionamento.
    public function authors()
    {
        //    $this->belongsToMany('relacao', 'nome da tabela pivot', 'key ref. books em pivot', 'key ref. author em pivot')
        return $this->belongsToMany('App\Authors', 'booksauthors', 'bookid', 'authorid');
    }
}
```
___

## Codificando

### Inserir

```php
//Cria autor e cria o livro e anexa a esse autor pelo relacionamento;
$a = Authors::create(['name'=>'Dumond de Andrad']);
$a->books()->create(['title' => 'O Laravel']);

ou
//Cria autor, e criando dois livros
$a = Authors::create(['name'=>'Dumond de Andrad']);
$b1 = Books::create(['title'=>'O Conto']);
$b2 = Books::create(['title'=>'O Sasi']);

//anexando ao autor os dois livros
$a->books()->attach($b1);
$a->books()->attach($b2);

ou // anexando pelo id
$a->books()->attach($b1->id);
$a->books()->attach($b2->id);


```
### Alterar

_Alterar tabela muitos para muitos não é usual, só altera mesmo as tabelas de `Authors` e `Books`_

###Excluir
```php
//excluindo o item da relação, ou seja o Author e o Livro continuarão,
//somente o item da tabela centra será excluido
$a = Authors::find(2);
$b = Books::find(2);

$a->books()->detach($b);
//ou
$a->books()->detach($b->id);
```

### Listar
```php

//Listar os livros do autor de id = 2
$a = Authors::find(2);
var_dump($a->books);

//saída
[
    {
        "id":1,
        "title":"O Exemplo 1",
        "pivot":{"authorid":2,"bookid":1}
    },
    {
        "id":3,
        "title":"O Exemplo 2",
        "pivot":{"authorid":2,"bookid":3}
    }
]
```

## Observações:

Eu fiz os exemplos sempre do `Authors` para `Books`, mas, a volta funciona da mesma forma, ou seja, de `Books` para `Authors`

##Referências:

- [Eloquent Many To Many](http://laravel.com/docs/5.0/eloquent#many-to-many)

- [Eloquent Relationships](http://laravel.com/docs/5.0/eloquent#relationships)
