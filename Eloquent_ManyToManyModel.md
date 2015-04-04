# Eloquent

## Relacionamentos Muitos para Muitos com campos adicionais na tabela `Pivot` expondo a classe Model

Nesse caso especifico, aonde existem além das chaves de relacionamentos, campos adicionais existe um forma criando um classe normal que herda da base Model tendo configurações diferenciadas para trabalhar com esse tipo de tabela. 

Segue a mesma tabela abaixo

![1 para 1](https://github.com/diasfulvio/howto/blob/master/images/N-M-withpivot.png)

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
Inserir os dados da relação Pivot mais os campos adicionais que nesse caso exemplo é `status`:

```PHP
$book   = Books::find(2);
$author = Authors::find(1)->books()->attach($book, ['status' => 1]);

//ou

$book   = Books::find(2);
$author = Authors::find(1)->books()->attach($book->id, ['status' => 1]);
        
```
###Alterar
Nesse caso a parte de alterar os dados da tabela Pivot seus campos adicionais seriam assim:

```PHP
$author = Authors::find(1)->books()->updateExistingPivot(2, ['status' => 0]);

//ou

$book = Books::find(2);
$author = Authors::find(1)->books()->updateExistingPivot($book->id, ['status' => 0]);

```

###Excluir
Excluindo o item da relação, ou seja o Author e o Livro continuarão, somente o item da tabela Pivot será excluido:
```PHP
$a = Authors::find(2);
$b = Books::find(2);

$a->books()->detach($b);

//ou

$a->books()->detach($b->id);
```

###Listar
Listar os livros do autor de `id = 2`:

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

Perceba que nessa listagem todos os campos da tabela Pivot são visiveis para que possa ser recuperado.

##Referências: 

- [Eloquent Many To Many](http://laravel.com/docs/5.0/eloquent#many-to-many)
    
- [Eloquent Relationships](http://laravel.com/docs/5.0/eloquent#relationships)
