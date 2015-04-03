# Eloquent

Relacionamentos Muitos para Muitos com mais campos na tabela segue a relação [Muitos para Muitos](https://github.com/artesaos/howto/blob/master/Eloquent_ManyToMany.md) com adição de um campo na tabela Pivot de nome `status` (a quantidade de campos é ilimitado, só foi colocado um como exmplo), como segue figura logo abaixo:

![1 para 1](https://github.com/diasfulvio/howto/blob/master/images/N-M-withpivot.png)

Para refletir isso no Laravel adicione após o `belongsToMany` o `->withPivot(['status'])` como código abaixo:

__Authors__

```PHP
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
        return $this->belongsToMany('App\Books','booksauthors', 'authorid', 'bookid')->withPivot(['status']);
    }
}
```

__Books__

```PHP
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
        return $this->belongsToMany('App\Authors', 'booksauthors', 'bookid', 'authorid')->withPivot(['status']);
    }
}
```

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
$a = Authors::find(2);
var_dump($a->books);

//saída
[
    {
        "id": 1,
        "title": "O Laravel",
        "pivot": {
            "authorid": 1,
            "bookid": 1,
            "status": 1
        }
    },
    {
        "id": 2,
        "title": "MVC",
        "pivot": {
            "authorid": 1,
            "bookid": 2,
            "status": 0
        }
    }
]
```

##Referências: 

- [Eloquent Many To Many](http://laravel.com/docs/5.0/eloquent#many-to-many)
    
- [Eloquent Relationships](http://laravel.com/docs/5.0/eloquent#relationships)
