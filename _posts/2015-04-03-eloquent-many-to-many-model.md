---
layout: post
title: Eloquent ManyToMany - Relacionamentos Muitos para Muitos com campos adicionais na tabela Pivot expondo a classe Model
tags: [eloquent, database, relacionamentos]
---

Nesse caso especifico, aonde existem além das chaves de relacionamentos, campos adicionais existe um forma criando um classe normal que herda da base Model tendo configurações diferenciadas para trabalhar com esse tipo de tabela.

Segue a mesma tabela abaixo

![ManyToMany](https://github.com/diasfulvio/howto/raw/master/images/N-M.png)

Para refletir isso no Laravel crie a classe `BooksAuthors` igual o código logo abaixo:

__BooksAuthors__

```PHP
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class BooksAuthors extends Model
{
    protected $table      = 'booksauthors';
    protected $primaryKey = ['bookid','authorid'];
    public $incrementing  = false;
    protected $fillable   = array('bookid','authorid','status');
    public  $timestamps   = false;

    public function author()
    {
        return $this->hasOne('App\Authors', 'id','authorid');
    }

    public function book()
    {
        return $this->hasOne('App\Books', 'id','bookid');
    }
}
```
As configurações `$incrementing` que determina que o dado da `primary key` seja auto icremento setado como `false` (porque, os campos dessa tabela não são auto incremento) e o `$fillable` colocando todos os campos referente tabela, para que se possa realizar as operações de CRUD.

Também foi colocado dois métodos que significam os métodos do relacionamento pela chave utilizando `hasOne` como mostrado no código acima. Isso é muito importante na hora da recuperação da informação de maneira prática.

##Codificando

###Inserir
Inserir de forma mais transparente:
```PHP
$booksAutors = BooksAuthors::firstOrCreate(['bookid' => 2, 'authorid'=> 2, 'status' =>1]);

```
###Alterar
Nesse caso a parte de alterar os dados da tabela Pivot seus campos adicionais seriam assim:

```PHP
$booksAutors = BooksAuthors::where('bookid', 2)
    ->where('authorid', 2)
    ->update(['status' => 0]);

//ou

 $booksAutors = BooksAuthors::where(function($query){
            $query->where('bookid',2);
            $query->where('authorid',2);
        })->update(['status' => 1]);

```

###Excluir
Excluindo o item da relação, ou seja o Author e o Livro continuarão, somente o item da tabela Pivot será excluido:
```PHP
BooksAuthors::where('bookid', 2)
    ->where('authorid', 2)
    ->delete();

//ou

BooksAuthors::where(function($query){
        $query->where('bookid',2);
        $query->where('authorid',2);
})->delete();
```

###Listar

```PHP
BooksAuthors::with(['book','author'])
    ->where('bookid','=',1)
    ->where('authorid','=',1)
    ->get()

//saída
[
    {
    "bookid": 1,
    "authorid": 1,
    "Status": 1,
    "book": {
        "id": 1,
        "title": "O Laravel"
        },
    "author": {
        "id": 1,
        "name": "Dumond de Andrad"
        }
    }
]
```
Nesse caso com método `with` você consegue recuperar os dados da relação, sendo assim fácil a recuperação das informações da relação.

##Referências:

- [Eloquent Many To Many](http://laravel.com/docs/5.0/eloquent#many-to-many)

- [Eloquent Relationships](http://laravel.com/docs/5.0/eloquent#relationships)
